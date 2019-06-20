<template>
  <div class="fullscreen">
    <div class="home-login-box">
      <div style="text-align: center">
        <img src="../assets/logo.png" alt="" class="logo">
      </div>
      <p class="text-tips">你好，欢迎登陆</p>
      <form action="" class="login-form">
        <div class="m-list-group">
          <div class="m-list-group-item">
            <label>
              <input type="text" placeholder="请输入手机号" class="m-input" v-model="loginForm.telephoneNumber">
            </label>
          </div>
          <div class="m-list-group-item">
            <label>
              <input type="password" placeholder="请输入8-16位密码" class="m-input" v-model="loginForm.password">
            </label>
          </div>
          <div class="m-list-group-item">
            <label>
              <input type="text" placeholder="请输入6位验证码" class="m-input" v-model="verificationCode">
            </label>
            <el-button type="primary" round size="mini" @click="sendCode()" v-if="canClick===true">{{btnContent}}</el-button>
          </div>
        </div>
        <button class="m-btn sub select-none" @click.prevent="doLogin()" v-loading="isLoging">登陆</button>
      </form>
    </div>
  </div>
</template>
<script>
  import * as api from '../api/admin/api'
  import qs from 'querystring'
  export default {
    name: 'login',
    data () {
      let telephoneNumberPattern = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
      return {
        loginForm:{
          telephoneNumber: '',
          password: ''
        },
        isLoging: false,
        btnContent: '发送验证码',
        totalTime: 60,
        canClick: true,
        verificationCode: '',
        token: '',
        key: 'TGElMjB5b2hkYSUyMHN0YXNlbGxh'
      }
    },
    methods: {
      doLogin: function () {
        let token = this.key + this.loginForm.telephoneNumber + this.verificationCode
        if (token === this.token) {
          let queryParam=qs.stringify(this.loginForm)
          api.adminLogin(queryParam).then((response) => {
            if (response.success===true) {
              this.$message({
                message: '登录成功!',
                type: 'success'
              })
              this.$store.commit('setState', response)
              this.$router.push({path:'/'})
            }
          })
        }
      },
      sendCode: function () {
        console.log(this.$store)
        api.sendCode(this.loginForm.telephoneNumber).then((response) => {
          console.log(response)
          if (response.success === true) {
            this.token = response.token
            this.$message({
              message: '验证码已发送!',
              type: 'success'
            })
            if (!this.canClick) return
            this.canClick = false
            this.btnContent = this.totalTime + 's后重试'
            let clock = window.setInterval(() => {
              this.totalTime--
              this.btnContent = this.totalTime + 's后重试'
              if (this.totalTime <= 0) {
                window.clearInterval(clock)
                this.btnContent = '重新发送'
                this.totalTime = 60
                this.canClick = true
              }
            }, 1000)
          } else {
            this.$message({
              message: '验证码发送失败，请刷新后重试!',
              type: 'error'
            })
          }
        })
      },
      validateTelephoneNumber: function (rule, value, callback) {
        if (!this.pattern.test(value)) {
          return callback(new Error('请输入11位有效的手机号'))
        } else {
          callback()
        }
      }
    }
  }
</script>
<style type="text/css">
  .m-list-group {
    border-radius: 3px;
    padding: 0;
    margin: 0 0 20px;
  }

  .m-list-group .m-list-group-item {
    position: relative;
    display: block;
    padding: 6px 10px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #e7ecee;
  }

  .m-list-group .m-list-group-item:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .fullscreen {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .home-login-box {
    position: relative;
    width: 330px;
    margin: 0 auto;
    padding: 0px 15px;
  }

  .home-login-box .logo {
    max-width: 40%;
    margin-bottom: 30px;
  }

  .home-login-box .text-tips {
    text-align: center;
    color: #909DB7;
  }

  .home-login-box .m-input {
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    box-sizing: border-box;
  }

  .home-login-box .m-btn {
    font-size: 18px;
    width: 100%;
    color: #fff;
    background-color: #36c1fa;
    display: inline-block;
    padding: 10px 12px;
    margin-bottom: 5px;
    line-height: 1.42857143;
    text-align: center;
    cursor: pointer;
    outline: none;
    border-radius: 2px;
    border: 1px solid #36c1fa;
    box-sizing: border-box;
    text-decoration: none;
  }

  .home-login-box .m-btn.m-btn-text {
    background: #fff;
    color: #36C1FA;
  }

  .home-login-box .m-btn:hover {
    background-color: #2DB7F5;
  }

  .home-login-box .m-btn.m-btn-text:hover {
    background-color: #F4F5F5;
  }

  .home-login-box .m-btn:active {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    .home-login-box {
      width: auto;
    }
  }
</style>
