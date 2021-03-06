// 封装一个插件
// 注册所有components下的组件为全局组件
import MyBread from '@/components/my-bread'
import MyTest from '@/components/my-test'
// 全局注册频道组件完毕
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'
// vue插件，暴漏一个对象，对象中有一个选项，install 安装的意思
export default {
  install (Vue) {
    // 安装函数，当vue.use(使用插件)，install被调用
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
  }
}
