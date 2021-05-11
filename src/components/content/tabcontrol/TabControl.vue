<template>
    <div class="tab-control">
        <div @click="itemClick(index)"
        v-for="(item,index) in titles" :key="index" 
        class="tab-control-item"
        :class="{active:index==currentIndex}">
        <!-- 选到哪一个，哪一个变active -->
            <span >{{item}}</span>
        </div>
        <!-- <div class="tab-control-item active">
            <span>新书</span>
        </div>
        <div class="tab-control-item">
            <span>精选</span>
        </div> -->
    </div>
</template>
<script>
import {ref} from "vue"
export default {
    name:'TabControl',
    props:{
        titles:Array,
    },
    setup(props,{emit}){
        let currentIndex=ref(0)
        const itemClick=(index)=>{
            currentIndex.value=index
            emit('tab-click',index)
        }
        return {
            currentIndex,
            itemClick
        }
    }
}
</script>

<style scoped lang="scss">
.tab-control{
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background-color: #ffffff;
    width: 100%;
    z-index: 10;

    position: sticky;
    top: 44px;

    .tab-control-item{
        flex: 1;
        span{
            padding: 5px;
        }
    }
    .active{
        color: var(--color-tint);
        span{
            border-bottom: 3px solid var(--color-tint);
        }
    }
}
</style>