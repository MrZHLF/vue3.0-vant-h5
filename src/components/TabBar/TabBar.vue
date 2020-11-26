<template>
  <div>
    <van-tabbar fixed route v-model="active" @change="handleChange">
      <van-tabbar-item v-for="(item,index) in data" :to="item.to" :key="index" :icon="item.icon">{{item.title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits:['chang'],
  setup (props,context) {
    console.log(props.data,'props');
    const active = ref(0)
    const handleChange = (value) => {
      context.emit('chang', value)
    }
    return {
      active,
      handleChange
    }
  }
}
</script>

<style lang="scss" scoped>

</style>