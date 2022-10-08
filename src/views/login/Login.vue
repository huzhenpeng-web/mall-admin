<template>
  <!-- 登录页面 -->
  <div class="login">
    <div class="box">
      <div class="login-box" v-show="!isShow">
        <!-- 标题 -->
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp" leave-active-class="animate__zoomOut" appear>
          <p class="title">LOGIN</p>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp" leave-active-class="animate__zoomOut" appear>
          <!-- 登录表单 -->
          <div class="loginForm" @keyup.enter="login">
            <el-form :rules="loginFormRules" ref="loginFormRef" :model="loginForm">
              <el-form-item prop="username">
                <el-input ref="loginFocus" v-model="loginForm.username" clearable placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" show-password clearable placeholder="请输入密码"></el-input>
              </el-form-item>
            </el-form>
            <div class="save">
              <!-- 记住我 -->
              <el-checkbox v-model="checked">记住我</el-checkbox>
              <a @click.prevent="login" class="btn">登录</a>
            </div>
          </div>
        </transition>
      </div>
      <!-- 注册表单-->
      <div class="register-box" v-show="isShow">
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp" leave-active-class="animate__zoomOut" appear>
          <p>欢迎注册</p>
        </transition>
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp" leave-active-class="animate__zoomOut" appear>
          <el-form ref="registerFormRef" :model="registerForm">
            <el-form-item>
              <el-input v-model="registerForm.username" clearable placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="registerForm.password" show-password clearable placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
        </transition>
        <a @click.prevent="register" class="btn">注册</a>
      </div>
      <!-- 信息提示区域 -->
      <div :class="[{message:isShow === false},{message2:isShow === true}]">
        <!-- <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp" leave-active-class="animate__zoomOut" appear> -->
        <div class="login-message" v-show="!isShow">
          <p>学习商城后台管理系统</p>
          <button class="btn" @click="isShow = true">还没有账户?点击注册</button>
        </div>
        <!-- </transition> -->
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp" leave-active-class="animate__zoomOut" appear>
          <div class="register-message" v-show="isShow">
            <!-- 欢迎注册 -->
            <p>学习商城后台管理系统</p>
            <button class="btn" @click="isShow = false">已有账户?点击登录</button>
          </div>
        </transition>
      </div>
    </div>
    <!-- 视频背景 -->
    <div class="video-container">
      <video src="@/assets/video/video.mp4" autoplay muted loop></video>
    </div>
  </div>
</template>

<script>
import '@/assets/css/login.css'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      // 注册表单
      registerForm: {
        username: '',
        password: ''
      },
      // 控制显示登录还是注册
      isShow: false,
      // 下次登录免密
      checked: true
    }
  },
  methods: {
    ...mapMutations({ saveLoginStatus: 'SET_LOGINSTATUS' }),
    // 登录
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return this.$message.warning('请填入完整的信息')
        this.saveLoginStatus(true)
        this.$router.replace('/dashboard')
      })
    },
    // 注册
    register() {}
  },
  created() {
    this.saveLoginStatus(false)
  },
  mounted() {
    // 自动获取用户名输入框焦点
    this.$refs.loginFocus.focus()
  }
}
</script>

<style lang="less" scoped>
@color: rgb(4, 112, 107);

/deep/ .el-input__inner {
  height: 30px;
  border: 1px solid @color;
  border-radius: 13px;

  &:focus {
    border: 2px solid @color;
  }
}

.save {
  display: flex;
  flex-direction: column;
  position: relative;
  .el-checkbox {
    position: absolute;
    left: 10px;
    top: -10px;
    color: @color;
  }
}
</style>
