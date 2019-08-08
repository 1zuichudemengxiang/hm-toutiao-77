<!-- 组件的模板 -->
<template>
    <el-select :value="value" @change="fn" placeholder="请选择">
        <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
    </el-select>
</template>

<!-- 组件的 JavaScript -->
<script>
// 清空频道选中的数据
// watch: {
//   'reqParams.channel_id': function (newValue, oldValue) {
//     if (newValue === '') {
//       this.reqParams.channel_id = null
//     }
//   }
// },
// 注意：当你清空内容的时候，值为空字符，处理成null数据
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      //   myValue: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      console.log(data)
      this.channelOptions = data.channels
    },
    fn (val) {
      if (val === '') val = null
      this.$emit('input', val)
    }
  }

}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
</style>
