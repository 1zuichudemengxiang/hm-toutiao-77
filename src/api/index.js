// 配置一个aixos 导出一配置号的axios
import axios from 'axios'
import store from '@/store'

// 进行配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 给每次的请求头加一个token
axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}

// 进行导出
export default axios
