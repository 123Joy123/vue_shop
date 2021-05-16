<template>
    <div class="create-order">
        <nav-bar>
            <template v-slot:default>订单预览</template>
        </nav-bar>

        <div class="address-wrap">
            <div class="name">
                <span>名字</span>
                <span>电话</span>
            </div>
            <div class="address">
                详细地址信息
            </div>
            <van-icon class="arrow" name="arrow" />
        </div>
        <div class="good">
            <div class="good-item" v-for="(item,index) in cartList" :key="index">
                <div class="good-img">
                    <img :src="item.goods.cover_url" alt="">
                </div>
                <div class="good-desc">
                    <div class="good-title">
                        <span>{{item.goods.title}}</span>
                        <span>x{{item.num}}</span>
                    </div>
                    <div class="good-btn">
                        <div class="price"><small>￥</small>{{item.goods.price}}.00</div>
                    </div>
                </div>
            </div>
        </div>

        <van-submit-bar class="submit-all" :price="total*100" button-text="生成订单" @submit="handleCreateOrder">
            商品金额
        </van-submit-bar>

        <van-popup closeable :close-on-click-overlay="false" v-model:show="showPay" position="bottom" :style="{height:'30%'}" @close="close">
          <div :style="{width:'90%',margin:'0 auto',padding:'50px 0'}">
              <van-button :style="{marginBottom:'10px'}" block color="#1989fa" @click="goTo">
                  支付宝支付
              </van-button>
              <van-button :style="{marginBottom:'10px'} " block color="#4fc08d" @click="goTo">
                  微信支付
              </van-button>
          </div>  
          <!-- <img :src="aliyun" alt=""> -->


        </van-popup>
    </div>
</template>

<script>
import {reactive,onMounted,toRefs,computed} from 'vue'
import NavBar from "@/components/common/navbar/NavBar"
import {getOrderPreview,createOrder,payOrder,payOrderStatus,getOrderList,getOrderDetail,confirmOrder,viewExpress,} from "@/network/order"
import {useRouter,useRoute} from 'vue-router'
import { Toast } from 'vant'
export default {
    components:{
        NavBar,
    },
    setup() {
        const router=useRouter()
        const route=useRoute()
        const state=reactive({
            cartList:[],
            address:{},
            showPay:false,
            orderNo:'',
            aliyun:'',
        })

        const init=()=>{
            Toast.loading('加载中...')
            getOrderPreview().then(res=>{
                // console.log(res);
                state.address=res.address
                state.cartList=res.carts
                Toast.clear()

            })
        }

        onMounted(()=>{
            init()
        })

        const goTo=()=>{
            Toast.success("支付成功")
            router.push({path:'/home'})
        }

        const handleCreateOrder=()=>{
            const params={
                address_id:'1'
            }
            createOrder(params).then(res=>{
                Toast.success('提交成功')

                state.showPay=true
                // state.orderNo=res.id

                //用不成
                // payOrder(state.orderNo,{type:'aliyun'}).then(res=>{
                //     // state.aliyun=res.qr_code_url
                //     console.log(res);
                // })
            })

        }

        const close=()=>{
            
        }

        const total=computed(()=>{
            let sum=0
            state.cartList.forEach(item=>{
                sum+=parseInt(item.num) * parseFloat(item.goods.price)
            })
            return sum
        })

        return {
            goTo,
            handleCreateOrder,
            close,
            ...toRefs(state),
            total,
        }
    },
}
</script>

<style lang="scss" scoped>
.create-order{
    background: #f9f9f9;
    .address-wrap{
        text-align: left;
        margin-bottom: 20px;
        background: #fff;
        position: relative;
        margin-top: 44px;
        font-size: 14px;
        padding: 15px;
        color: #222333;
        .name,.address{
            margin: 10px 0;
        }
        .arrow{
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
        }
        // &::before{
        //     position: absolute;
        //     right: 0;
        //     bottom: 0;
        //     left: 0;
        //     height: 2px;
        //     background-size: 80px;
        //     content: '';
        //     background: #fff;
        // }
    }
    .good{
        margin-bottom: 120px;
    }
    .good-item{
        padding: 10px;
        background: #fff;
        display: flex;
        .good-img{
            img{
                width: 100px;
                height: auto;
            }
        }
        .good-desc{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
            padding: 20px;
            .good-title{
                display: flex;
                justify-content: space-between;
            }
            .good-btn{
                display: flex;
                justify-content: space-between;
                .price{
                    font-size: 16px;
                    color: red;
                    line-height: 28px;
                }
                .van-icon-delete{
                    font-size: 20px;
                    margin-top: 4px;
                }
            }
        }
        
        
    }
    .pay-wrap{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        padding: 10px;
        padding-bottom: 50px;
        border-top: 1px solid #e9e9e9;
        >div{
            display: flex;
            justify-content: space-between;
            padding: 0 5%;
            margin: 10px 0;
            font-size: 14px;
            span:oth-child(2){
                color: red;
                font-size: 18px;
            }
        }
        .pay-btn{
            position: fixed;
            bottom: 7px;
            right: 0;
            left: 0;
            width: 90%;
            margin: 0 auto;
        }
    }

}

.submit-all{
    margin-bottom: 50px;
    z-index: 9 i !important;
}
</style>