// 存储信息d的时候
// 1.约定信息的key是什么，hm-toutiao-77-ures
// 2.存储的信息是什么 用户信息对象，字符串格式json
const KEY = 'hm-toutiao-77-user'
export default {
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.getItem(KEY)
  }
}
