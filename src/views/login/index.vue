<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt="">
      <el-form :model="loginForm" :rules="loginRules" status-icon ref="loginForm">
        <!-- 给整体表单加动态:model是为了之后提交表单的时候双向绑定数据，为了方便。:rules（rules英文翻译，就是规则的意思，一般都是在登录页面，表单提交的时候会用到这规则这个东西）是为了给表单校验规则数据的一个功能，是一个以对象的模式写到
        status-icon是为了给用户更好的体验，每个框后面有对勾和×号，ref是为了下面获取两个表单所有的值让你后发送请求到后台之前确认一下表单里面是否有值，如果有值的话再发送请求-->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          <!-- placeholder是占位符，占位文字的意思 -->
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:330px;margin:30px 18px 20px 0">
          </el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 动态属性value绑定为ture就是默认勾选，因为用户也得必须同意这个东西 -->
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    // 2.在return前执行这个校验函数，正确的话执行callback这个回调函数
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号格式不对'))
      callback()
    }
    return {
      // 表单数据
      // 如果说
      loginForm: {
        mobile: '13111111111',
        code: '246810'
      },
      // 所有表单数据的值一定要写在data里面，return里面，校验规则也要写在return里面
      // 表单校验规则数据
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 1.自定义校验规则，先申明个函数
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 给登录按钮绑定一个点击事件的方法，写在methods里面，下一步就是获取两个输入框的值，然后如果有的话，就是发送请求到后端（看接口文档。发送的地址是什么，然后把参数（this.loginForm）跟到地址括号后面，then如果有值的话，那就跳转到首页。home页。path里面写/就行）
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then(res => {
            // res 响应对象 包含响应体
            // res.data
            // 存储用户信息
            store.setUser(res.data.data)
            // 跳转去首页
            this.$router.push('/').catch(() => {
              this.$message.error('手机号或者验证码错误')
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  }

  .my-card {
    width: 500px;
    height: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    img {
      display: block;
      width: 200px;
      height: 50px;
      margin: 0 auto 50px;
    }
  }
</style>
