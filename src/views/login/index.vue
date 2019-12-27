<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">刷脸支付后台登录系统</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="account"
          v-model="loginForm.account"
          class="name-input"
          placeholder="用户名"
          name="account"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            class="password-input"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-checkbox v-model="checked" class="remember" style="color:#a0a0a0;"><span style="color: #a4d6ef;font-size: 18px;">记住密码</span></el-checkbox>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登 录</el-button>

    </el-form>

    <!-- <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog> -->
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { validUsername } from '@/utils/validate'
// import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  // components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        account: 'admin',
        password: '123456'
      },
      checked: true,
      loginRules: {
        account: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log(route)
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.account === '') {
      this.$refs.account.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      Cookies.get('Admin-Token')
      // this.$router.push({ path: '/'})
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              // this.$router.push({ path: this.redirect })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        console.log('cur:' + cur)
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" >
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#64b5dd;
$cursor: #64b5dd;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .name-input{
    background: url(../../assets/img/login-icon-1.png) no-repeat 2px center;
  }
  .password-input{
    background: url(../../assets/img/login-icon-2.png) no-repeat 2px center;
  }
  .el-input {
    display: block;
    height: 60px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 63px;
      color: $light_gray;
      height: 100%;
      font-size: 20px;
      caret-color: $cursor;

      &:-webkit-autofill {
        -webkit-text-fill-color: $cursor !important;
      }
      &::-webkit-input-placeholder {
        color: $light_gray;
      }
      &::-moz-placeholder {
        color: $light_gray;
      }
      &:-ms-input-placeholder {
        color: $light_gray;
      }
      &:-moz-placeholder {
        color: $light_gray;
      }
    }
  }

  .el-form-item {
    border: 1px solid #134b7e;
    background: #012336;
    color: #454545;
    width: 100%;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background:url(../../assets/img/login-bg.png) no-repeat center/cover;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-width: 1200px;

  .login-form {
    position: relative;
    // width: 590px;
    max-width: 100%;
    padding-left: 400px;
    // padding: 160px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .form-content{
    margin-left: 62px;
    width: 500px;
    margin-top: 48px;
  }
  .el-button{
    width: 100%;
    background: #093c66;
    border-radius: 0;
    border: none;
    line-height: 60px;
    padding: 0;
    font-size: 24px;
    color: #64b5dd;
  }
  .el-checkbox{
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .remember >>>.el-checkbox__inner{
    background-color: #124671;
    border: none;
    border-radius: 0;
  }
  .remember >>>.el-checkbox__input.is-checked .el-checkbox__inner::after{
    height: 10px;
    left: 3px;
    top: 0px;
    width: 6px;
  }
  .remember >>>.el-checkbox__input.is-checked .el-checkbox__inner{
    background-color: #124671;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;
    height: 126px;
    width: 586px;
    background: url(../../assets/img/login-title.png) no-repeat center/cover;

    .title {
      font-size: 36px;
      color: #97e3f4;
      text-align: center;
      font-weight: normal;
      line-height: 126px;
      margin: 0 auto;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 16px;
    color: #77c6d8;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
    &{
      background:#001a2b;
      min-width: 100%;
      .login-form{
        padding: 0;
        width: 100%;
      }
      .title-container {
        position: relative;
        height: 80px;
        width: 100%;
        background: url(../../assets/img/login-title.png) no-repeat ;
        background-size: 100%;
        .title {
          font-size: 26px;
          line-height: 80px;
          margin: 0 auto;
        }
      }
      .form-content{
        width: 100%;
        padding: 0 20px;
        margin: 60px 0;
      }
      .el-input{
        width: 100%;
        height: 47px;
        background-size: 45px 45px;
      }
      .el-checkbox{
        margin-bottom: 120px;
      }
      .el-button{
        line-height: 45px;
        font-size: 18px;
      }
      .show-pwd {
        top: 7px;
      }
    }
  }
}
</style>
