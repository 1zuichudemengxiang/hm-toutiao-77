// 定义router对象 导出给main.js使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则配置
  // name的作用给当前路由规则取别名
  routes: [
    {
      path: '/login', name: 'login', component: Login
    },
    {
      path: '/',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/', name: 'welcome', component: Welcome
        },
        {
          path: '/article', name: 'welcome', component: Article
        }

      ]
    },
    // 处理404
    {
      path: '*', name: '404', component: NotFound
    }
  ]
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断是否是登录路由  判断是否登录  放行
  if (to.path !== '/login' && !store.getUser().token) {
    return next('/login')
  }
  next()
})
export default router
