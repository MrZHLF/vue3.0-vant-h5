# vue3.0-h5-template
- 基于vue3.0全家桶 + vant3.0 +scss + rem适配方案 + axios封装，构建H5模板脚手架

### 版本要求
- `vue cli`版本需要node 8.9 或者更高的版本。或者你可以使用`nvm`来切换node版本
- 本案例中，node版本的是12.15.0

### 启动项目
 ```
  git clone https://github.com/MrZHLF/vue3.0-vant-h5.git

  cd vue3.0-vant-h5

  npm install 或者使用 cnpm 切换到淘宝镜像

  cnpm run serve
 ```

 ### 简介
 - 关注公众号: 回复 “加群”，即可加入前端交流群 或者搜索 ``` 攻程狮小周 ```
 - 项目博客地址 ```https://blog.csdn.net/Govern66/article/details/110178890```
 <p>
  <img src="/src/assets/images/qrcode_for_gh_5ddc08b3a52c_344.jpg" width="256" style="display:inline;">
</p>

 ### 目录

 ```
  |———— public index.html文件
  |———— src
  |     |———— api        #api接口请求
  |     |———— assets     #资源目录
  |     |———— components #公共组件封装
  |     |———— config     #环境变量配置
  |     |———— layout     #主目录
  |     |———— router     #路由
  |     |———— store      #状态管理
  |     |———— util       #工具类
  |     |———— views      #组件以及页面文件目录
  |     |———— App.vue    #项目入口文件
  |     |———— main.js    #项目核心文件
  |———— .env.development #本地环境配置
  |———— .env.production.js #正式环境配置
  |———— postcss.config   #PostCSS 配置
  |———— babel.config.js  #babel常用配置
  |———— vue.config.js    #vue常用配置项
  |———— package.json     #项目配置文件
  |———— README.md        #项目的说明文档，markdown 格式
```
### ✅ 路由 vue-router
vue3.0和vue2.0路配置大差不差，但是在页面获取name,path,params,query需要单独处理一下

```javascript
  import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('./../layout/index.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive:false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue')
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('@/views/Detail.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

```
#### 页面中获取params参数
- useRoute 获取当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数，query对象等。
- useRoute 是全局路由的实例，是router构造方法的实例。
``` javascript
  import { ref } from 'vue'
  import { useRoute,useRoute } from 'vue-router'
  export default {
    setup () {
      const route = useRoute() 
      let currentId = ref(0)
      currentId = route.params.id //路由跳转id
      return {
        currentId
      }
    }
  }
```

### ✅ vuex状态管理
- vuex用法差不大，只是使用的时候，需要引入一下

`main.js` 引入

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
createApp(App).use(store).mount('#app')

```

store文件
``` javascript
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

```

使用
```html
<template>
  <div>
    <van-button type="danger" @click="handleBtn">vuex按钮</van-button>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { getUser } from './../api/home'
export default {
  setup () {
    const msg = ref('vue3.0全家桶+vant+axios+rem')
    const store = useStore()
    const name = computed(() => store.state.userNmae)
    const handleBtn = () =>{
      store.commit('getUserNmae', 'Vue')
    }
    return {
      msg,
      name,
      handleBtn
    }
  }
}
</script>

```

### ✅ 配置多环境变量

`package.json` 里的 `scripts` 配置 `serve` `build`，通过 `--mode xxx` 来执行不同环境

- 通过 `npm run serve` 启动本地 , 执行 `development`
- 通过 `npm run build` 打包正式 , 执行 `production`

```javascript
"scripts": {
  "serve": "vue-cli-service serve --open",
  "build": "vue-cli-service build",
}
```

##### 配置介绍

&emsp;&emsp;以 `VUE_APP_` 开头的变量，在代码中可以通过 `process.env.VUE_APP_` 访问。  
&emsp;&emsp;比如,`VUE_APP_ENV = 'development'` 通过`process.env.VUE_APP_ENV` 访问。  
&emsp;&emsp;除了 `VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量`NODE_ENV` 和`BASE_URL`

在项目根目录中新建`.env.*`

- .env.development 本地开发环境配置

```bash
NODE_ENV='development'
# must start with VUE_APP_
VUE_APP_ENV = 'development'

```

- .env.production 正式环境配置

```bash
 NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_ENV = 'production'
```

这里我们并没有定义很多变量，只定义了基础的 VUE_APP_ENV `development``production`  
变量我们统一在 `src/config/env.*.js` 里进行管理。

这里有个问题，既然这里有了根据不同环境设置变量的文件，为什么还要去 config 下新建三个对应的文件呢？  
**修改起来方便，不需要重启项目，符合开发习惯。**

config/index.js

```javascript
// 根据环境引入不同配置 process.env.NODE_ENV
const config = require('./env.' + process.env.VUE_APP_ENV)
module.exports = config
```

配置对应环境的变量，拿本地环境文件 `env.development.js` 举例，用户可以根据需求修改

```javascript
// 本地环境配置
module.exports = {
  title: 'vue3.0-h5',
  baseApi: 'https://test.xxx.com/api', // 本地api请求地址
}
```

根据环境不同，变量就会不同了

```javascript
// 根据环境不同引入不同baseApi地址
import { baseApi } from '@/config'
console.log(baseApi)
```

### ✅ rem 适配方案 

不用担心，项目已经配置好了 `rem` 适配, 下面仅做介绍：

Vant 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，推荐使用以下两个工具:

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 `postcss` 插件，用于将单位转化为 `rem`
- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 `rem` 基准值

##### PostCSS 配置

下面提供了一份基本的 `postcss` 配置，可以在此配置的基础上根据项目需求进行修改

```javascript
// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList:['*'],
      selectorBlackList :['html'],
      minPixelValue :1.5,
      mediaQuery:false,
      exclude:'common',
    }
  }
}
```

### ✅ VantUI 组件按需加载
- babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。

#### 安装插件

```bash
npm i babel-plugin-import -D
```

在`babel.config.js` 设置

```javascript
// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]
module.exports = {
  presets: [['@vue/cli-plugin-babel/preset']],
  plugins
}
```

#### 使用组件

用哪个引入哪个，无需在页面里重复引用

```javascript
// 按需全局引入 vant组件
import { createApp } from 'vue';
import { Button } from 'vant';

const app = createApp();
app.use(Button);
```

### ✅ Sass 全局样式
- 创建vue项目的时候，选择SCSS
```html
<style lang="scss">
  /* global styles */
</style>

<style lang="scss" scoped>
  /* local styles */
</style>
```
#### scss资源文件目录
```bash
├── assets
│   ├── scss
│   │   ├── index.scss               # 全局通用样式
│   │   ├── mixin.scss               # 全局mixin
│   │   └── variables.scss           # 全局变量
|   |   └── reset.scss               # 全局重置样式
```


### ✅ Axios 封装及接口管理

`utils/request.js` 封装 axios ,开发者需要根据后台接口做修改。

- `service.interceptors.request.use` 里可以设置请求头，比如设置 `token`
- `config.hideloading` 是在 api 文件夹下的接口参数里设置，下文会讲

```javascript
import axios from 'axios'
import { baseApi } from './../config'



const service = axios.create({
  baseURL: baseApi,
  withCredentials: false,
  timeout: 5000
})

// request拦截器 request interceptor
service.interceptors.request.use(config => {
  return config
},error => {
  console.log(error);
  return Promise.reject(error)
})


// respone拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if(res.status && res.status !== 200) {
    return Promise.reject(res)
  } else {
    return Promise.resolve(res)
  }
},error =>{
  return Promise.reject(error)
})
export default service
```

#### 接口管理 
在`src/api` 文件夹下统一管理接口
- 你可以建立多个模块对接接口, 比如 `home.js` 里是首页的接口这里讲解 `getUser.js`
```javascript
import request from './../util/request.js'

export function getUser() {
  return request({
    url: '/users',
    method: 'get'
  })
}
```

#### 如何调用

```javascript
// 请求接口
import { getUser } from '@/api/home'

const params = { user: 'sunnie' }
getUser().then((res) => {
  
}).catch((error)=>{})
```

### ✅ Webpack 4 vue.config.js 基础配置

如果你的 `Vue Router` 模式是 hash

```javascript
publicPath: './',
```

```javascript
module.exports = {
  publicPath: './', // 署应用包时的基本 URL。 vue-router hash 模式使用
  //  publicPath: '/app/', // 署应用包时的基本 URL。  vue-router history模式使用
  outputDir: 'dist', //  生产环境构建文件的目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: !IS_PROD,
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: 9527, // 端口号
    open: false, // 启动后打开浏览器
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    }
    // ...
  }
}
```

### ✅ 配置 alias 别名 

```javascript
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack:(config)=>{
    config.resolve.alias
    .set('@', resolve('src'))
    .set('assets', resolve('src/assets'))
    .set('api', resolve('src/api'))
    .set('views', resolve('src/views'))
    .set('components', resolve('src/components'))
  }
}
```

### ✅ 配置 proxy 跨域 

如果你的项目需要跨域设置，你需要打来 `vue.config.js` `proxy` 注释 并且配置相应参数

<u>**!!!注意：你还需要将 `src/config/env.development.js` 里的 `baseApi` 设置成 '/'**</u>

```javascript
module.exports = {
  devServer: {
    // ....
    proxy: {
      //配置跨域
      '/api': {
        target: 'https://test.xxx.com', // 接口的域名
        // ws: true, // 是否启用websockets
        changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
```

### ✅ 去掉 console.log
```javascript
// 获取 VUE_APP_ENV 非 NODE_ENV，测试环境依然 console
const IS_PROD = ['production', 'prod'].includes(process.env.VUE_APP_ENV)
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]
// 去除 console.log
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { useBuiltIns: 'entry' }]],
  plugins
}
```


如果感觉可以，帮我点一下星星