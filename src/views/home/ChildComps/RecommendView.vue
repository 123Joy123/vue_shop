<template>
    <div class="recommend">
        <div class="recommend-item" v-for="item in recommends.slice(0,4)" :key="item.id">
            <!-- click.prevent取消默认方法 -->
            <a href="" @click.prevent="goDetail(item.id)">
                <img :src="item.cover_url" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
        <!-- <div class="recommend-item">
            <a href="">
                <img src="@/assets/images/bookcover.png" alt="">
            </a>
            <div>sdfasdf</div>
        </div>
        <div class="recommend-item">
            <a href="">
                <img src="@/assets/images/bookcover.png" alt="">
            </a>
            <div>sdfasdf</div>
        </div>
        <div class="recommend-item">
            <a href="">
                <img src="@/assets/images/bookcover.png" alt="">
            </a>
            <div>sdfasdf</div>
        </div>
        <div class="recommend-item">
            <a href="">
                <img src="@/assets/images/bookcover.png" alt="">
            </a>
            <div>sdfasdf</div>
        </div> -->
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
    name:'RecommendView',
    props:{
        recommends:Array,
    },
    setup(){
        const router=useRouter()
        const goDetail=(id)=>{
            router.push({path:'/detail',query:{id}})
        }
        return {
            goDetail
        }
    }
}
</script>
<style scoped lang="scss">
.recommend{
    width: 100%;
    display: flex;
    text-align: center;
    padding: 15px 0 30px;
    border-bottom:8px solid #eee;
    font-size: 12px;
}
.recommend-item{
    flex:1;
    img {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
    }
} 

</style>