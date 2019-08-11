<!-- 组件的模板 -->
<template>
    <div class='container'>
        <el-card>
            <div slot="header">
                <my-bread>粉丝管理</my-bread>
            </div>
            <!-- tab组件 -->
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="粉丝列表" name="list">
                    <div class="fans-list">
                        <div class="fans-item" v-for="item in fansList" :key="item.id.toString()">
                            <el-avatar style="width:80px;height:80px" :src="item.photo"></el-avatar>
                            <p style="font-size:12px">{{item.name}}</p>
                            <el-button size="mini" plain type="primary">+关注</el-button>
                        </div>
                    </div>
                    <!-- 分页 -->
                    <el-pagination style="margin-top:20px" v-if="total > reqParams.per_page" background
                        layout="prev, pager, next" :total="total" :page-size="reqParams.per_page"
                        :current-page="reqParams.page" @current-change="changePager"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="粉丝画像" name="photo">
                    <div ref="dom" style="width:880px;height:700px">

                    </div>
                </el-tab-pane>
            </el-tabs>

        </el-card>
    </div>
</template>

<!-- 组件的 JavaScript -->
<script>

import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'list',
      reqParams: {
        page: 1,
        per_page: 20
      },
      fansList: [],
      total: 0
    }
  },
  created () {
    this.getFansList()
    this.initBar()
  },
  mounted () {
    this.initBar()
  },
  methods: {
    //   初始化柱状图
    initBar () {
      // 获取dom必须在组件渲染完毕后
      const dom = this.$refs.dom
      const myChart = echarts.init(dom)
      const options = {
        title: {
          text: '浏览器占比变化',
          subtext: '纯属虚构',
          top: 10,
          left: 10
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,250,0.2)'
        },
        legend: {
          type: 'scroll',
          bottom: 10,
          data: (function () {
            var list = []
            for (var i = 1; i <= 28; i++) {
              list.push(i + 2000 + '')
            }
            return list
          })()
        },
        visualMap: {
          top: 'middle',
          right: 10,
          color: ['red', 'yellow'],
          calculable: true
        },
        radar: {
          indicator: [
            { text: 'IE8-', max: 400 },
            { text: 'IE9+', max: 400 },
            { text: 'Safari', max: 400 },
            { text: 'Firefox', max: 400 },
            { text: 'Chrome', max: 400 }
          ]
        },
        series: (function () {
          var series = []
          for (var i = 1; i <= 28; i++) {
            series.push({
              name: '浏览器（数据纯属虚构）',
              type: 'radar',
              symbol: 'none',
              lineStyle: {
                width: 1
              },
              emphasis: {
                areaStyle: {
                  color: 'rgba(0,250,0,0.3)'
                }
              },
              data: [
                {
                  value: [
                    (40 - i) * 10,
                    (38 - i) * 4 + 60,
                    i * 5 + 10,
                    i * 9,
                    i * i / 2
                  ],
                  name: i + 2000 + ''
                }
              ]
            })
          }
          return series
        })()
      }
      myChart.setOption(options)
    },
    async getFansList () {
      const { data: { data } } = await this.$http.get('followers', {
        params: this.reqParams
      })
      this.fansList = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    }
  }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
    .fans-item {
        text-align: center;
        width: 120px;
        height: 170px;
        border: 1px dashed #ddd;
        display: inline-block;
        margin-right: 60px;
        margin-bottom: 20px;
        padding-top: 15px;
    }
</style>
