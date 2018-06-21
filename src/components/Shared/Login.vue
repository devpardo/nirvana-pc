<template lang="html">
  <div class="mask-layer">
    <div class="login-bg" id="login">
      <div class="login-header">
        <img src="../../assets/images/ytlogo.png" width="100%" height="100%"/>
        <span class="login-close hand" @click="close()">+</span>
      </div>
      <el-form class="el-form" :model="loginForm" :rules="rules" ref="loginForm" @submit.native.prevent="login('loginForm')">
        <el-form-item prop="login" class="form-input">
          <el-input v-model="loginForm.login" placeholder=" 用户名/电子邮箱/手机号码"></el-input>
          <span class="fa input-icon">{{ userIcon }}</span>
        </el-form-item>
        <el-form-item class="form-input" prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" type="password" auto-complete="off"></el-input>
          <span class="fa input-icon">{{ lock }}</span>
        </el-form-item>
        <p class="forget"><span class="fr hand" @click="forPassword()">忘记密码<span class="fa">{{ key }}</span></span></p>
        <el-form-item>
          <el-button class="button submit hand" native-type="submit" :disabled="loading">
            {{ loading ? '请稍候...' : '立即登录'}}
          </el-button>
        </el-form-item>
        <p></p>
        <el-form-item class="button register hand clearfix" @click.native="register()">
          注册新用户
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import cookie from "../../libs/cookie";

  export default {
    props: ["enter"],
    data() {
      return {
        lock: this.$fontawesome("lock"),
        userIcon: this.$fontawesome("user"),
        key: this.$fontawesome("key"),
        loading: false,
        loginForm: {
          login: "",
          password: "",
          grant_type: "password"
        },
        rules: {
          login: [
            {
              required: true,
              message: "请输入用户名或电子邮箱或手机号码",
              trigger: "blur"
            }
          ],
          password: [{ required: true, message: "请输入密码", trigger: "blur" }]
        }
      };
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            try {
              this.loading = true;
              // this.loginForm.password = btoa(this.loginForm.password)
              await this.$store.dispatch("login", this.loginForm);
              this.close();
              this.$message({
                message: "登录成功",
                type: "success",
                showClose: true
              });
              this.$router.push({ name: "Home" });
              await this.$store.dispatch("getWallets");
            } catch (error) {
              console.log(error);
              this.$message({
                message: error.message,
                type: "error",
                showClose: true
              });
            } finally {
              this.loading = false;
            }
          }
        });
      },
      close() {
        this.$store.dispatch("setLoginFlag", false);
        this.enter && (this.enter.login = false);
      },
      register() {
        this.$store.dispatch("setLoginFlag", false);
        this.enter && (this.enter.login = false);
        this.enter && (this.enter.register = true);
        this.$router.push({ name: "Join" });
      },
      forPassword() {
        this.$store.dispatch("setLoginFlag", false);
        this.enter && (this.enter.login = false);
        this.$router.push({ name: "ForgetPassword" });
      }
    }
  };
</script>

<style lang="scss">
  @import "../../assets/stylesheets/public";

  #login {
    .el-form-item__error {
      color: #df701f;
    }
    .el-input__inner {
      background-color: rgba($color-black, $alpha: 0.7);
      border-color: rgba($color-black, $alpha: 0.5);
      color: $color-white;
      height: 45px;
      line-height: 45px;
      padding-left: 35px;

      &::placeholder {
        color: $color-blue8;
      }
    }
    .el-button span {
      font-size: 14px;
    }
  }
</style>
<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .mask-layer {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
  }
  .login-bg {
    position: fixed;
    // top: 20%;
    // left: 40%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: $color-blue8;
    height: 400px;
    width: 500px;
    padding: 10px;
    border-radius: 5px;
    .el-form {
      background-color: $color-blue9;
      border-radius: 5px;
      margin-top: 10px;
      padding: 20px;
      .form-input {
        position: relative;
        .input-icon {
          position: absolute;
          color: $color-blue8;
          font-size: $font-h3;
          left: 15px;
          top: 14px;
        }
      }
    }
    .login-header {
      width: 120px;
      margin: 0 auto;
      position: relative;
      .login-close {
        position: absolute;
        left: 280px;
        top: -10px;
        font-size: $font;
        transform: rotate(45deg);
        color: rgba($color-white, 0.5);
      }
    }
    .button {
      width: 100%;
      padding: 1px 0px;
      text-align: center;
      border-radius: 20px;
    }
    .submit {
      margin-top: 10px;
      background-color: $color-yellow13;
      color: $color-blue9;
      padding: 12px 10px;
      border: none;
    }
    .register {
      border: $px solid $color-yellow13;
      color: $color-yellow13;
    }
    .forget {
      color: $color-yellow13;
      line-height: normal;
      height: 20px;
      .fa {
        padding-left: 5px;
        vertical-align: middle;
      }
    }
  }
</style>
