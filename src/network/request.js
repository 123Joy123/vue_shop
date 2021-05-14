import axios from 'axios'
import { Notify } from 'vant'

export function request(config){
    const instance=axios.create({
        baseURL:'https://api.shop.eduwork.cn/',
        timeout:5000
    })

    //请求拦截
    instance.interceptors.request.use(config=>{
        //需要认证的接口在此处设置
        return config
    },err=>{

    })


    //响应拦截

    instance.interceptors.response.use(res=>{
        return res.data ? res.data:res
    },err=>{
        //用不成
        Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])
        // console.log(err.response.data)
    })

    return instance(config)
}