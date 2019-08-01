import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// @是一个路径别名，src路径别名 在vue-cli创建的项目下才可是呀
import router from '@/router'

Vue.use(ElementUI)
// 控制台提示信息，开发环境来提示，详细一些
Vue.config.productionTip = false

// main.js的职责
// 1.导入项目所需要依赖的资源（js包，css文件 其他资源）
// 2.创建一个根实例
// 新建一个根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
