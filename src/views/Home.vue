<template>
  <div>
    <van-button type="danger" @click="handleBtn">vuex按钮</van-button>
    <h1>{{name}}</h1>
    <p>{{msg}}</p>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <router-link :to="`/detail/${item.id}`">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { getUser } from './../api/home'
export default {
  setup () {
    const msg = ref('vue3.0全家桶+vant+axios+rem')
    const list = ref([])
    const store = useStore()
    getUser().then((res) => {
      console.log(res,'re');
      list.value = res
    })
    const name = computed(() => store.state.userNmae)
    const handleBtn = () =>{
      store.commit('getUserNmae', 'Vue')
    }
    return {
      msg,
      list,
      name,
      handleBtn
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