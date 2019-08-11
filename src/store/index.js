// 存储信息d的时候
// 1.约定信息的key是什么，hm-toutiao-77-ures
// 2.存储的信息是什么 用户信息对象，字符串格式json
const KEY = 'hm-toutiao-77-user'
export default {
  setUser (user) {
    // 存储信息到sessionStotage
    // 现在实现，给什么存什么，完整替换
    // 预期实现。局部修复一个属性信息
    const localUser = this.getUser()
    const nowUser = { ...localUser, ...user }
    window.sessionStorage.setItem(KEY, JSON.stringify(nowUser))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.getItem(KEY)
  }
}
