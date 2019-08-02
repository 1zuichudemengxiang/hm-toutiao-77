// 定义router对象 导出给main.js使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则配置
  // name的作用给当前路由规则去别名
  routes: [
    {
      path: '/login', name: 'login', component: Login
    },
    {
      path: '/', name: 'home', component: Home
    }
  ]
})
export default router
