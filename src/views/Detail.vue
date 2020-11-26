<template>
  <div>
    详情id为:{{currentId}}
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup () {
    const route = useRoute()
    console.log(route,'route');
    let currentId = ref(0)
    currentId = route.params.id //路由跳转id
    return {
      currentId
    }
  }
}
</script>

<style lang="scss" scoped>

</style>