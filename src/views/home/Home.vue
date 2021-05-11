<template>
    <div>
        <nav-bar>
            <template v-slot:default>图书兄弟</template>
        </nav-bar>
        <div class="banners">
            <img src="" alt="">
        </div>

        <recommend-view :recommends="recommends"></recommend-view>
        <!-- tabclick是这个组件里自定义的事件，tabClick是传过来的 -->
        <tab-control @tabclick="tabClick" :titles="['畅销','新书','精选']"></tab-control>

    </div>
</template>

<script>
// 路径必须用双引号
import NavBar from "@/components/common/navbar/NavBar"
import RecommendView from "./ChildComps/RecommendView"
import TabControl from "@/components/content/tabcontrol/TabControl"
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

        const tabClick=(index)=>{

        }

        return {
            recommends,
            tabClick,
        }
    },
    components:{
        NavBar,
        RecommendView,
        TabControl,
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