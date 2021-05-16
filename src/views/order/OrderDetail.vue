<template>
    <div class="order-detail-box">
        <nav-bar>
            <template v-slot:default>订单详情</template>
        </nav-bar>
        <div class="order-status">
            <div class="status-item">
                <label>订单状态：</label>
                <span>已支付</span>
            </div>
            <div class="status-item">
                <label>订单编号：</label>
                <span>11111111</span>
            </div>
            <div class="status-item">
                <label>下单时间：</label>
                <span>2021-05-23 01：01：01</span>
            </div>
            <van-button style="margin-bottom:10px;" color="#1baeae" block>去支付</van-button>
            <van-button block>确认订单</van-button>
        </div>
        <div class="order-price">
            <div class="price-item">
                <label>商品金额：</label>
                <span>999.00</span>
            </div>
            <div class="price-item">
                <label>派送方式：</label>
                <span>普通快递</span>
            </div>
        </div>

        <van-card
            num="10"
            price="99.99"
            desc="全场包邮"
            title="<dafa>dafa"
            thumb=""
         />

         <div style="width:100%;height:50px;">

         </div>

         <van-popup closeable :close-on-click-overlay="false" v-model:show="showPay" position="bottom" :style="{height:'40%'}">
          <div :style="{width:'90%',margin:'0 auto',padding:'50px 0'}">
              <van-button :style="{marginBottom:'10px'}" block color="#1989fa" @click="goTo">
                  支付宝支付
              </van-button>
              <van-button :style="{marginBottom:'10px'} " block color="#4fc08d" @click="goTo">
                  微信支付
              </van-button>
          </div>  
        </van-popup>

    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from "@/components/common/navbar/NavBar"
import { Toast,Dialog } from 'vant'
export default {
    name:'OrderDetail',
    components:{
        NavBar,
    },
    setup() {
        const route=useRoute()
        const router=useRouter()
        const state=reactive({

        })

        onMounted(()=>{

        })

        return {
            ...toRefs(state),
        }
    },
}
</script>

<style lang="scss" scoped>

</style>