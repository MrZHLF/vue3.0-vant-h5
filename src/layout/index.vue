<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="state.tabBar" @chang="handleChange"></TabBar>
    </div>
  </div>
</template>

<script>
import { ref, reactive  } from 'vue'
import TabBar from './../components/TabBar/TabBar'
export default {
  name: 'AppLayout',
  components: {
    TabBar
  },
  setup () {
    const state = reactive({
      tabBar: [
        {
          title: '首页',
          to: {
            name: 'Home'
          },
          icon: 'home-o'
        },
        {
          title: '我的',
          to: {
            name: 'About'
          },
          icon: 'user-o'
        }
      ]
    })
    const handleChange = (value) => {
      console.log(value);
    }
    return {
      state,
      handleChange
    }
  }
}
</script>

<style lang="scss" scoped>

</style>