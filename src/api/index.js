// 配置一个aixos 导出一配置好的axios
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONBig from 'json-bigint'

// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [
  (data) => {
    // data此时就是后端的原始数据
    try {
      return JSONBig.parse(data)
    } catch (e) {
      return data
    }
  }
]
// 给每次的请求头加一个token
// 下面这段代码只会执行一次
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 请求拦截器，在每次请求之前，做某些事情
axios.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
},
// 错误处理
(error) => {
  return Promise.reject(error)
})

// 响应拦截器：在每次响应后，做某些事情
axios.interceptors.response.use((res) => {
  // 成功的时候做一些事情
  return res
}, (err) => {
  // 失败的时候做一些事情
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})
// 进行导出
export default axios
