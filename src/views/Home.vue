<template>
  <div>
    <h1>{{msg}}</h1>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getUser } from './../api/home'
export default {
  setup () {
    const msg = ref('vue3.0开发H5模板')
    const list = ref([])
    getUser().then((res) => {
      console.log(res,'re');
      list.value = res
    })
    return {
      msg,
      list
    }
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    display: block;
    font-size: 38px;
    text-align: center;
    padding: 20px 0;
  }
  ul {
    li {
      display: block;
      font-size: 20px;
      padding: 20px 0;
      text-align: center;
    }
  }
</style>