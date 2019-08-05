<!-- 组件的模板 -->
<template>
    <div class="container">
        <div class="header">header</div>
        <div class="content">
            <!-- 默认插槽 -->
            <slot name="content" :msg="msg"></slot>
            <slot name="footer"></slot>
        </div>
        <div class="footer">footer</div>
    </div>
</template>

<!-- 组件的 JavaScript -->
<script>
export default {
  name: '',
  data () {
    return {
      msg: '作用域插槽'
    }
  }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
</style>
