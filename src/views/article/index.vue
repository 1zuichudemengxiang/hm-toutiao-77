<!-- 组件的模板 -->
<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="100px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option v-for="item in channelOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="dateArr" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>

      </el-form>
    </el-card>
    <my-test>
      <!-- <div slot="content" slot-scope="scope">哈哈哈{{scope.msg}}</div> -->
      <template v-slot:content="scope">哈哈哈{{scope.msg}}</template>
      <div slot="footer">么么哒</div>
    </my-test>
  </div>
</template>

<!-- 组件的 JavaScript -->
<script>
import MyTest from '@/components/my-test'
import MyBread from '@/components/my-bread'
export default {
  components: { MyTest, MyBread },
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null
      },
      channelOptions: [{ value: 1, label: 'js' }],
      dateArr: []
    }
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
