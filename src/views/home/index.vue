<template>
    <el-container class="wrapper">
        <!-- 这个是整体的菜单的大盒子，动态元素宽度，是element-ui提供的，如果再其他地方肯定不能用，默认为false的时候，即是展开状态，也就是宽度为200px -->
        <el-aside :width="isCollapse?'64px':'200px'">
            <div class="logo" :class="{minLogo:isCollapse}"></div>
            <!-- minLogin（添加了一个小图片。为了切换的时候效果，想覆盖原来的背景图），是一个动态类绑定的类名。如果为false的话，-->
            <el-menu :collapse=isCollapse :collapse-transition="false" :default-active="$route.path"
                background-color="#002033" text-color="#fff" active-text-color="#ffd04b" router>
                <!-- 是否使用vue-router的模式，启用该模式会在激活导航时以index作为path进行路由跳转，获取当前地址栏的路径，设置给default-active路径和菜单的index的值一致 -->
                <el-menu-item index="/">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/article">
                    <i class="el-icon-document"></i>
                    <span slot="title">内容管理</span>
                </el-menu-item>
                <el-menu-item index="/image">
                    <i class="el-icon-picture"></i>
                    <span slot="title">素材管理</span>
                </el-menu-item>
                <el-menu-item index="/publish">
                    <i class="el-icon-s-promotion"></i>
                    <span slot="title">发布文章</span>
                </el-menu-item>
                <el-menu-item index="/comment">
                    <i class="el-icon-chat-dot-round"></i>
                    <span slot="title">评论管理</span>
                </el-menu-item>
                <el-menu-item index="/fans">
                    <i class="el-icon-present"></i>
                    <span slot="title">粉丝管理</span>
                </el-menu-item>
                <el-menu-item index="/setting">
                    <i class="el-icon-setting"></i>
                    <span slot="title">个人设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <span class="el-icon-s-fold" @click="toggleMenu()">
                </span>
                <span class="text">江苏传智播客科技教育有限公司</span>
                <el-dropdown class='my-dropdown'>
                    <span class="el-dropdown-link">
                        <img src="../../assets/images/avatar.jpg" alt="">
                        爱的主打歌
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人设置</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data () {
    return {

      isCollapse: false
      // 这里是第一步，写isCollapse，确定左边菜单展开还是收起，默认为false，是展开
    }
  },
  methods: {
    // 给点击切换的按钮添加一个事件，如果是展开的话就收起，收起的话就展开
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style scoped lang="less">
    .wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;

        .el-aside {
            background-color: #002033;
        }

        .el-header {
            border-bottom: 1px solid #ddd;
            line-height: 60px;

            .el-icon-s-fold {
                font-size: 24px;
                vertical-align: middle;
            }

            .text {
                vertical-align: middle;
                padding-left: 10px;
            }

            .my-dropdown {
                float: right;
                vertical-align: middle;

                img {
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                }
            }

            .el-dropdown-link {
                font-weight: 700px
            }
        }

        .logo {
            width: 100%;
            height: 60px;
            background: #002244 url('../../assets/images/logo_admin.png') no-repeat center/140px auto;
        }

        .minLogo {
            background-image: url('../../assets/images/logo_admin_01.png');
            background-size: 38px auto;
        }

        .el-menu {
            border-right: none;
        }
    }
</style>
