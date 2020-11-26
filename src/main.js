import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 移动端适配
import 'lib-flexible/flexible.js';

// 引入全局样式
import '@/assets/scss/index.scss';

// 全局引入按需引入UI库 vant
import { Button, Tabbar, TabbarItem   } from 'vant'

createApp(App).use(store).use(router).use(Button).use(Tabbar).use(TabbarItem).mount('#app')