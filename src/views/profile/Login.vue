<template>
    <div>
        <nav-bar>
            <template v-slot:default>用户登录</template>
        </nav-bar>

        <div style="margin-top:50px;">
            <div style="text-align:center;">
                
            </div>
        </div>

        <van-form @submit="onSubmit">
            <van-field
                v-model="email"
                name="电子邮箱"
                label="电子邮箱"
                placeholder="电子邮箱"
                :rules="[{ required: true, message: '请填写电子邮箱' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />           
            <div style="margin: 16px;">
                <div class="link-login"
                @click="$router.push({path:'/register'})">
                    注册
                </div>
                <van-button round block type="info" color="#42bbaa" native-type="submit">提交</van-button>
            </div>
        </van-form>

    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import {login} from "@/network/user"
import { Toast,Notify } from 'vant';
import {ref,reactive, toRefs} from "vue"
import {useRouter} from 'vue-router'
export default {
    name:"Login",
    components:{
        NavBar,
    },
    setup(){
        const router=useRouter()

        const userinfo=reactive({
            email:'',
            password:'',
        })

        const onSubmit=()=>{
            login(userinfo),then(res=>{
                // 将token保存到本地window.localStorage
                window.localStorage.setItem('token',res.access_token)

                this.$toast.success('登录成功')

                userinfo.email=''
                userinfo.password=''

                setTimeout(()=>{
                    router.go(-1)
                },500)
            })
        }

        return {
            ...toRefs(userinfo),
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