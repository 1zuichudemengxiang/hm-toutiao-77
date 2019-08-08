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
          <!-- 使用自己的组件 -->
          <my-channel v-model='reqParams.channel_id'></my-channel>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="dateArr" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期" @change="changeDate" value-format="yyyy-mm-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>

      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">
        根据筛选条件共查询到{{total}}条结果
      </div>

      <!-- 表格组件 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- <img :src="scope.row.cover.images[0]" alt=""> -->
            <el-image :src="scope.row.cover.images[0]" fit="contain" style="width:120px">
              <div slot="error">
                <img src="../../assets/images/error.gif" fit="contain" style="width:120px" alt="">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title">
        </el-table-column>
        <el-table-column label="状态" prop="img">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate">
        </el-table-column>
        <el-table-column label="操作" prop="img">
          <template slot-scope="scope">
            <el-button plain type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
            <el-button plain type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页组件 -->
      <div style="text-align: center;margin-top:30px">
        <!-- @current-change="changePager" 页面改变事件-->
        <!-- 更新过数据后，当前页码也需要修改 选中对应的按钮 current-page -->
        <el-pagination background layout="prev,pager,next" :total="total" :page-size="reqParams.per_page"
          @current-change="changePager" :current-page="reqParams.page">

        </el-pagination>
      </div>
    </el-card>
    <!-- <my-test> -->
    <!-- <div slot="content" slot-scope="scope">哈哈哈{{scope.msg}}</div> -->
    <!-- <template v-slot:content="scope">哈哈哈{{scope.msg}}</template> -->
    <!-- <div slot="footer">么么哒</div> -->
    <!-- </my-test> -->
  </div>
</template>

<!-- 组件的 JavaScript -->
<script>
import MyBread from '@/components/my-bread'
export default {
  components: { MyBread },
  data () {
    return {
      // 筛选项表单数据，提交给后台参数
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 总页码
        page: 1,
        // 每页多少数据
        per_page: 20
      },
      // 频道下拉选项数据
      channelOptions: [],
      // 日期数据
      dateArr: [],
      // 文章列表
      articles: [],
      total: 0
    }
  },
  // 清空频道选中的数据
  // watch: {
  //   'reqParams.channel_id': function (newValue, oldValue) {
  //     if (newValue === '') {
  //       this.reqParams.channel_id = null
  //     }
  //   }
  // },
  created () {
    // 获取频道下拉选项数据
    // this.getChannelOptions()
    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    // 编辑功能
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 删除函数
    del (id) {
      // 弹出确认框，点击确认后，发删除请求，响应成功更新数据列表
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        await this.$http.delete(`articles/${id}`)
        // 这两句代码没有执行，上面一句代码报错，没有抛出这个错误
        this.$message.success('删除文章成功')
        this.getArticles()
      }).catch(() => { })
    },
    // 日期选择后的事件
    changeDate (dateArr) {
      // 严谨一些，清空数据考虑在内
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选函数
    search () {
      // 筛选双向绑定 拿着对应的数据发送请求即可，注意:重新筛选后页码为第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    // 从后台拿频道数据
    // async getChannelOptions () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   console.log(data)
    //   this.channelOptions = data.channels
    // },
    // 从后台拿列表数据
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      console.log(data)
      this.articles = data.results
      this.total = data.total_count
    },
    // 改变分页事件对应函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    }
  }
  //   data () {
  //     return {}
  //   }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
  .el-card {
    margin-bottom: 30px
  }
</style>
