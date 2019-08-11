<!-- 组件的模板 -->
<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <!-- 栅格系统 -->
    <el-row>
      <el-col :span="12">
        <el-form label-width="120px">
          <el-form-item label="编号 : ">{{userForm.id}}</el-form-item>
          <el-form-item label="手机 : ">{{userForm.mobile}}</el-form-item>
          <el-form-item label="媒体名称 : ">
            <el-input v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍 : ">
            <el-input type="textarea" :rows="3" v-model="userForm.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱 : ">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveUserInfo">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-upload class="avatar-uploader" :http-request="myUpload" action="" :show-file-list="false">
          <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p style="text-align:center;font-size:14px">修改头像</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<!-- 组件的 JavaScript -->
<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: null,
        name: null,
        intro: null,
        email: null,
        photo: null,
        mobile: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    myUpload (result) {
      // 选择图片后 触发此函数 选择的结果就是results
      // axios + formdata 进行上传
      const formData = new FormData()
      formData.append('photo', result.file)
      this.$http.patch('user/photo', formData).then(res => {
        // 上传头像成功
        this.$message.success('修改头像成功')
        // 预览功能
        this.userForm.photo = res.data.data.photo
        // 同步本地存储
        store.setUser({ photo: this.userForm.photo })
        // 同步home组件
      })
    },
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userForm = data
    },
    // 保存用户信息
    async saveUserInfo () {
      // patch请求类型做修改 局部修改
      // put 请求类型做修改，完整修改
      await this.$http.patch('user/profile', {
        // 按照后台提交数据
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('保存设置成功')
      // 当你刷新页面的时候，home组件使用的是本地存储的数据，更新本地存储
      store.setUser({ name: this.userForm.name })
      eventBus.$emit('updateName', this.userForm.name)
      eventBus.$emit('updatePhoto', this.userForm.photo)
    }
  }
}
</script>

<!-- 组件的样式 -->
<style lang="less" scoped>
</style>
