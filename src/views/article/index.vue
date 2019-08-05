<!-- 组件的模板 -->
<template>
    <div>
        内容管理
    </div>
</template>

<!-- 组件的 JavaScript -->
<script>
export default {
  created () {
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => {
      console.log(res.data)
    })
  }
  //   name: '',
  //   data () {
  //     return {}
  //   }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
</style>
