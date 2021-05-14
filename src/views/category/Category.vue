<template>
    <div>
        <nav-bar>
            <template v-slot:default>商品分类</template>
        </nav-bar>

        <div id="mainbox">
            <div class="ordertab">
                <van-tabs v-model:active="activeTab" @click="tabClick">
                    <van-tab title="销量排序"></van-tab>
                    <van-tab title="价格排序"></van-tab>
                    <van-tab title="评论排序"></van-tab>
                </van-tabs>
            </div>

            <van-sidebar class="leftmenu" v-model="active">
                <van-collapse v-model="activeName" accordion>
                    <van-collapse-item 
                    v-for="item in categories" :key="item.id"
                    :title="item.name" 
                    :name="item.name">
                        
                            <van-sidebar-item
                            v-for="child in item.children" :key="child.id"
                            :title="child.name"
                            @click="getGoods(child.id)" />
                        
                    </van-collapse-item>
                </van-collapse>
            </van-sidebar>

            <div class="goodslist">
                <div class="content">
                    <van-card
                        v-for="item in showGoods" :key="item.id"
                        @click="itemClick(item.id)"
                        :num="item.comments_count"
                        :tag="item.comments_count>=0 ? '流行': ''"
                        :price="item.price"
                        :desc="item.update_at"
                        :title="item.title"
                        :thumb="item.cover_url"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import {ref,reactive,onMounted,computed} from 'vue'
import {getCategory,getCategoryGoods} from "@/network/category"
import {useRouter} from 'vue-router'
export default {
    name:'Category',
    components:{
        NavBar,
    },
    setup(){
        let active=ref(0)
        let categories=ref([])
        let activeName=ref(1)
        let activeTab=ref(1)
        let currentOrder=ref('sales')
        let currentCid=ref(0)

        const router=useRouter()
        const itemClick=(id)=>{
            router.push({path:'/detail',query:{id}})
        }

        //数据模型
        const goods=reactive({
            sales:{page:1,list:[]},
            price:{page:1,list:[]},
            comments_count:{page:1,list:[]},
        })

        const init=()=>{
            getCategoryGoods('sales',currentCid.value).then(res=>{
                goods.sales.list=res.goods.data
            })
            getCategoryGoods('price',currentCid.value).then(res=>{
                goods.price.list=res.goods.data
            })
            getCategoryGoods('comments_count',currentCid.value).then(res=>{
                goods.comments_count.list=res.goods.data
            })
        }

        const showGoods=computed(()=>{
            console.log(goods[currentOrder.value].list)
            return goods[currentOrder.value].list
        })

        onMounted(()=>{
            getCategory().then(res=>{
                categories.value=res.categories
                // console.log(res)

                //默认排序方法
                getCategoryGoods('sales',currentCid.value).then(res=>{
                goods.sales.list=res.goods.data
                // console.log("sales_list:"+goods.sales.list)
                // console.log("goods.data:"+res.goods.data)
                })
            })
        })

        const tabClick=(index)=>{
            
            let orders=['sales','price','comments_count']
            currentOrder.value=orders[index]

            getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
                goods[currentOrder.value].list=res.goods.data
            })
            console.log("index:"+orders[index])

        }

        const getGoods=(cid)=>{
            currentCid.value=cid
            console.log("cid:"+cid)
            // init()
            getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
                goods[currentOrder.value].list=res.goods.data
            })
        }

        

        return {
            active,
            categories,
            activeName,
            activeTab,
            tabClick,
            currentOrder,
            currentCid,
            getGoods,
            goods,
            showGoods,
            itemClick,
        }
    }
}
</script>

<style scoped lang="scss">
#mainbox{
    margin-top: 45px;
    display: flex;
    .ordertab{
        // background: red;
        height: 50px;
        flex: 1;
        float: right;
        z-index: 9;
        position: fixed;
        top: 45px;
        right: 0;
        left: 130px;
    }
    .leftmenu{
        position: fixed;
        top: 95px;
        left: 0;
        // background: green;
        width: 130px;
    }
    .goodslist{
        flex:1;
        // background: blue;
        position: absolute;
        top: 100px;
        left: 130px;
        right: 0;
        height: 100vh;
        padding: 10px;
        text-align: left;
    }

}

</style>