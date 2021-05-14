import axios from 'axios'
import { Notify, Toast } from 'vant'
import router from '../router'

export function request(config){
    const instance=axios.create({
        baseURL:'https://api.shop.eduwork.cn/',
        timeout:5000
    })

    //请求拦截
    instance.interceptors.request.use(config=>{
        //需要认证的接口在此处设置
        const token=window.localStorage.getItem('token')
        if(token){
            config.headers.Authorization=' Bearer'+token
        }
        return config
    },err=>{

    })


    //响应拦截

    instance.interceptors.response.use(res=>{
        return res.data ? res.data:res
    },err=>{
        //未登录授权的情况
        if(err.response.status=='401'){
            Toast.fail('请先登录')
            router.push({path:'/login'})
        }

        //错误信息提示
        Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])
        // console.log(err.response.data)
    })

    return instance(config)
}