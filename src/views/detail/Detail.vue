<template>
    <div>
        <nav-bar>
            <template v-slot:default>商品详情:{{id}}</template>
        </nav-bar>

        <van-image style="margin-top:50px" width="100%" :src="detail.cover_url" />

        <van-card style="text-align:left"
            :num="detail.stock"
            :price="detail.price+'.00'"
            :desc="detail.description"
            :title="detail.title"
            >
            <template #tags>
                <van-tag plain type="danger">新书</van-tag>
                <van-tag plain type="danger">推荐</van-tag>
            </template>
            <template #footer>
               <van-button type="warning" @click="handleAddCart">加入购物车</van-button>
                <van-button type="danger" @click="goToCart">立即购买</van-button>
            </template>
        </van-card>

    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import {useRoute} from 'vue-router'
import {ref,onMounted, reactive,toRefs} from 'vue'
import {getDetail} from "@/network/detail"
import {addCart} from "@/network/shoppingcar"
import { Toast } from 'vant'
export default {
    name:'Detail',
    components:{
        NavBar,
    },
    setup(){
        const route=useRoute()
        let id=ref(0)
        //接收id
        id.value=route.query.id

        let book=reactive({
            detail:{},
            like_goods:[],
        })

        onMounted(()=>{
            id.value=route.query.id
            getDetail(id.value).then(res=>{
                book.detail=res.goods
                book.like_goods=res.like_goods
            })
        })

        //添加购物车
        const handleAddCart=()=>{
            console.log('addCart')
            addCart({goods_id:book.detail.id,num:1}).then(res=>{
                if(res.status=='204' || res.status=='201'){
                    Toast.success('添加成功')
                }
            })
        }

        //立即购买
        const goToCart=()=>{
            console.log('buy')
        }

        return {
            id,
            ...toRefs(book),
            handleAddCart,
            goToCart,
        }
    }
}
</script>

<style scoped>

</style>