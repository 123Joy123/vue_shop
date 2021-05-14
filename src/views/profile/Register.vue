<template>
    <div>
        <nav-bar>
            <template v-slot:default>用户注册</template>
        </nav-bar>

        <div style="margin-top:50px;">
            <div style="text-align:center;">
                
            </div>
        </div>

        <van-form @submit="onSubmit">
            <van-field
                v-model="userinfo.name"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="userinfo.password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                v-model="userinfo.password_confirmation"
                type="password"
                name="确认密码"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true, message: '请填写一致密码' }]"
            />
            <van-field
                v-model="userinfo.email"
                name="电子邮箱"
                label="电子邮箱"
                placeholder="电子邮箱"
                :rules="[{ required: true, message: '请填写电子邮箱' }]"
            />
            <div style="margin: 16px;">
                <div class="link-login"
                    @click="$router.push({path:'/login'})">
                        登录
                </div>
                <van-button round block type="primary" color="#42bbaa" native-type="submit">提交</van-button>
            </div>
        </van-form>

    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import {register} from "@/network/user"
import { Toast,Notify } from 'vant';
import {ref,reactive, toRefs} from 'vue'
import {useRouter} from 'vue-router'
export default {
    name:"Register",
    components:{
        NavBar,
    },
    setup(){
        const router=useRouter()

        const userinfo=reactive({
            name:'',
            password:'',
            password_confirmation:'',
            email:'',
        })

        const onSubmit=()=>{
            register(userinfo),then(res=>{
                console.log(res)

                // if(res.status=='201'){
                //     Toast.success('注册成功')
                //     setTimeout(()=>{
                //         router.push({path:'/login'})
                //     },1000)
                // }
                //清空一下密码栏
                userinfo.password_confirmation=''
                userinfo.password=''
            })
        }

        return {
            // ...toRefs(userinfo),
            userinfo,
            onSubmit,
        }
    }
}
</script>

<style scoped>
.link-login{
    font-size: 14px;
    margin-bottom: 20px;
    color:#42b983;
    display: inline-block;
    text-align: left;
    /* float: left; */
}
</style>