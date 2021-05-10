<template>
  <div class="home">
    
  </div>
</template>

<script>
// @ is an alias to /src

import {onMounted} from 'vue'
import {getHomeAllData} from '../network/home'
export default {
  name: 'Home',
  components: {
    
  },
  setup(){
    onMounted(()=>{
      // console.log('111111111')
      getHomeAllData().then(res=>{
        console.log(res)
      }).catch(err=>{

      })
    })
  }
}
</script>
