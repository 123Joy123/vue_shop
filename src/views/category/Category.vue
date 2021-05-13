<template>
    <div>
        <nav-bar>
            <template v-slot:default>商品分类</template>
        </nav-bar>

        <div id="mainbox">
            <div class="ordertab">

            </div>

            <van-sidebar class="leftmenu" v-model="active">
                <van-collapse v-model="activeName" accordion>
                    <van-collapse-item 
                    v-for="item in categories" :key="item.id"
                    :title="item.name" 
                    :name="item.name">
                        
                            <van-sidebar-item
                            v-for="child in item.children" :key="child.id"
                            :title="child.name" />
                        
                    </van-collapse-item>
                </van-collapse>
            </van-sidebar>

            <div class="goodslist">

            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import {ref,reactive,onMounted} from 'vue'
import {getCategory} from "@/network/category"
export default {
    name:'Category',
    components:{
        NavBar,
    },
    setup(){
        let active=ref(0)
        let categories=ref([])
        let activeName=ref(1)

        onMounted(()=>{
            getCategory().then(res=>{
                categories.value=res.categories
                console.log(res)
            })
        })

        return {
            active,
            categories,
            activeName,
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
        width: 100%;
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
    }

}

</style>