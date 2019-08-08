<!-- 组件的模板 -->
<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><slot></slot></el-breadcrumb-item>
    </el-breadcrumb>
</template>

<!-- 组件的 JavaScript -->
<script>
export default {
  name: 'MyBread',
  data () {
    return {}
  }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
</style>
