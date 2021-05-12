<template>
    <div class="backTop" @click="backtop"></div>
</template>

<script>
export default {
    name:"BackTop",
    setup(props,{emit}){
        return {
            backtop:()=>{
                emit('b-top')
            }
        }
    }
}
</script>

<style scoped>
.backTop{
    width: 40px;
    height: 40px;
    padding: 20px;
    position: fixed;
    bottom: 80px;
    right: 30px;
    z-index: 20;
    border-radius: 50%;
    background: #fcfcfc url("../../../assets/images/up.png") no-repeat 0/40px 40px;
}
</style>