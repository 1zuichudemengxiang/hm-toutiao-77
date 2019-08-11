<!-- 组件的模板 -->
<template>
    <div class='container'>
        B组件
        <button @click="fn"></button>
    </div>
</template>

<!-- 组件的 JavaScript -->
<script>
import eventBus from './eventBus.js'
export default {
  data () {
    return {
      msg: '点击B在A组件显示'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('d2a', this.msg)
    }
  }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
</style>
