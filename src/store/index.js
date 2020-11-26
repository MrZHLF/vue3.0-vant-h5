import { createStore } from 'vuex'

export default createStore({
  state: {
    userNmae: "vue3.0开发H5模板"
  },
  mutations: {
    getUserNmae(state,data) {
      state.userNmae = data
    }
  },
  actions: {
  },
  modules: {
  }
})
