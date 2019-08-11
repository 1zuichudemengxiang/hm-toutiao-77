<!-- 组件的模板 -->
<template>
    <div class='container'>
        A组件
    </div>
</template>

<!-- 组件的 JavaScript -->
<script>
import eventBus from './eventBus.js'
export default {
  data () {
    return {
      mag: ''
    }
  },
  created () {
    eventBus.$on('b2a', (data) => {
      this.msg = data
    })
  }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
</style>
