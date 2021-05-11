<template>
    <div>
        <nav-bar>
            <template v-slot:default>图书兄弟</template>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
export default {
    name:'Home',
    components:{
        NavBar,
    }
}
</script>

<style scoped>

</style>