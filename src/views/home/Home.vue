<template>
    <div id="home">
        <nav-bar>
            <template v-slot:default>图书兄弟</template>
        </nav-bar>

        <tab-control v-show="isTabFixed"
        @tab-click="tabClick" :titles="['畅销','新书','精选']"></tab-control>

        <div class="wrapper">
            <div class="content">
                <div ref="banref">
                    <div class="banners">
                    <img src="" alt="">
                    </div>
                    <recommend-view :recommends="recommends"></recommend-view>
                </div>
                
                <!-- tabclick是这个组件里自定义的事件，tabClick是传过来的 -->
                <tab-control @tab-click="tabClick" :titles="['畅销','新书','精选']"></tab-control>

                <goods-list :goods="showGoods"></goods-list>
            </div>
        </div>

        <back-top @b-top="bTop" v-show="isTabFixed"></back-top>
    </div>
</template>

<script>
// 路径必须用双引号
import NavBar from "@/components/common/navbar/NavBar"
import RecommendView from "./ChildComps/RecommendView"
import TabControl from "@/components/content/tabcontrol/TabControl"
import GoodsList from "@/components/content/goods/GoodsList"
import BackTop from "@/components/common/backtop/BackTop"
import {getHomeAllData,getHomeGoods} from "@/network/home.js"
import {ref,reactive,onMounted, computed,watchEffect,nextTick} from 'vue'
import BetterScroll from 'better-scroll'
export default {
    name:'Home',
    setup(){
        let isTabFixed=ref(false)
        let banref=ref(null)
        const recommends=ref([])
        const goods=reactive({
            sales:{page:1,list:[]},
            recommend:{page:1,list:[]},
            new:{page:1,list:[]},
        })

        let currentType=ref('sales')
        // 选项卡常用计算属性
        const showGoods=computed(()=>{
            return goods[currentType.value].list;
        })

        let bscroll=reactive({})

        onMounted(()=>{
            getHomeAllData().then(res=>{
                // console.log(res.goods)
                recommends.value=res.goods.data
            })

            getHomeGoods('sales').then(res=>{
                // console.log(res)
                goods.sales.list=res.goods.data
            })
            getHomeGoods('recommend').then(res=>{
                // console.log(res)
                goods.recommend.list=res.goods.data
            })
            getHomeGoods('new').then(res=>{
                // console.log(res)
                goods.new.list=res.goods.data
            })

            // console.log(goods)

            bscroll=new BetterScroll(document.querySelector('.wrapper'),{
                probeType:3,//那个插件的属性，不管就行
                click:true,
                pullUpLoad:true
            })
            //触发滚动事件
            bscroll.on('scroll',(position)=>{
                //获取ban和recommend那俩的固定高度
                console.log(banref.value.offsetHeight)
                // console.log(position.y)

                isTabFixed.value=(-position.y)>banref.value.offsetHeight
            })
            
            //上拉加载数据
            bscroll.on('pullingUp',()=>{
                console.log("上拉加载更多")
                const page=goods[currentType.value].page+1
                getHomeGoods(currentType.value,page).then(res=>{
                    goods[currentType.value].list.push(...res.goods.data)
                    goods[currentType.value].page+=1
                })

                //展示加载完的数据
                bscroll.finishPullUp()
                //重新计算高度
                bscroll.refresh()
            })
        })

        const tabClick=(index)=>{
            let types=['sale','new','recommend']
            currentType.value=types[index]
            nextTick(()=>{
                //重新计算高度
                bscroll && bscroll.refresh()
            })
        }

        watchEffect(()=>{
            nextTick(()=>{
                //重新计算高度
                bscroll && bscroll.refresh()
            })
        })

        const bTop=()=>{
            // 500是时间，能有个缓冲效果
            bscroll.scrollTo(0,0,500)
        }

        return {
            recommends,
            tabClick,
            goods,
            showGoods,
            isTabFixed,
            banref,
            bTop,
        }
    },
    components:{
        NavBar,
        RecommendView,
        TabControl,
        GoodsList,
        BackTop,
    },
}
</script>

<style scoped>
.banners{
    width: 100%;
    height: auto;
    margin-top: 45px;
    /* 防止被标题栏挡住 */
}
#home{
    height: 100vh;
    position: relative;
}
.wrapper{
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
    /* background-color: red; */
}
</style>