<template>
    <div class="container">
        <el-card class="my-card">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form :model="loginForm" :rules="loginRules" status-icon ref="loginForm">
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:330px;margin:30px 18px 20px 0">
                    </el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
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
export default {
  data () {
    // 2.在return前执行这个校验函数，正确的话执行callback这个回调函数
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号格式不对'))
      callback()
    }
    return {
      // 表单数据
      loginForm: {
        mobile: '13111111111',
        code: '246810'
      },
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
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then(result => {
            this.$router.push('/').catch(() => {
              this.$message.errer('手机号或者验证码错误')
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

    ;

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
