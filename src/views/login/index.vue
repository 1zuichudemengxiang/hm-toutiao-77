<template>
    <div class="container">
        <el-card class="my-card">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-input class="phone" v-model="input" placeholder="请输入手机号"></el-input>
        </el-card>
    </div>
</template>

<script>
export default {}
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
        height: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        img {
            display: block;
            width: 200px;
            height: 50px;
            margin: 0 auto;
        }

        .phone {
            display: block;
            margin: 60px auto;
            width: 420px;
        }

    }
</style>
