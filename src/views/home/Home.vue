<template>
    <div>
        <nav-bar>
            <template v-slot:default>图书兄弟</template>
        </nav-bar>
        <div class="banners">
            <img src="" alt="">
        </div>

        <recommend-view :recommends="recommends"></recommend-view>

    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import RecommendView from "./ChildComps/RecommendView"
import {getHomeAllData} from "@/network/home.js"
import {ref,onMounted} from 'vue'
export default {
    name:'Home',
    setup(){
        const recommends=ref([])
        onMounted(()=>{
            getHomeAllData().then(res=>{
                console.log(res.goods)
                recommends.value=res.goods.data
            }).catch(err=>{

            })
        })

        return {
            recommends
        }
    },
    components:{
        NavBar,
        RecommendView,
    }
}
</script>

<style scoped>
.banners{
    width: 100%;
    height: auto;
    margin-top: 45px;
    /* 防止被标题栏挡住 */
}
</style>