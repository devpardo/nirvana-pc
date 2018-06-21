<template>
  <div class="bodylogin">
    <div class="content">
      <h3>登录</h3>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" @submit.native.prevent="login('loginForm')">
        <el-form-item label="" prop="login">
          <el-input v-model="loginForm.login" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" class="pull-right">登录</el-button>
          <router-link to="/join">
            <el-button>注册</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Form, Button, FormItem, Input } from "element-ui";
import cookie from "../libs/cookie";
import validators from "@/libs/validators";

export default {
  components: {
    "el-button": Button,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-input": Input
  },
  data() {
    return {
      loginForm: {
        login: "",
        password: "",
        grant_type: "password"
      },
      rules: {
        login: [
          validators.required({ message: "用户名不能为空" })
        ],
        password: [
          validators.required({ message: "密码不能为空" })
        ]
      }
    };
  },
  methods: {
    login(formName) {
      try {
        localStorage.setItem("test", "test");
      } catch (e) {
        alert("您正处于无痕浏览模式，无法传递数据，请更换浏览模式再登录，谢谢！");
        return;
      }
      localStorage.removeItem("test");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('fasdfasdfsadfasd',this.api);
          this.api.loginUser(this.loginForm).then((res) => {
            cookie.set("accessToken", res.data.access_token, {path: "/"});
            this.api.getProfile().then((res) => {
              let user = res.data;
              window.localStorage.user = JSON.stringify(user);
              this.$store.dispatch("setUserInfo", user);
              let redirect = decodeURIComponent(this.$route.query.redirect || "/");
              this.$router.push({path: redirect});
              this.$message({
                message: "登录成功",
                type: "success"
              });
            });
          });
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@import '../assets/stylesheets/public';

.login {
  .content {
    background-color: #eceef1;
    -webkit-border-radius: 7px;
    -moz-border-radius: 7px;
    -ms-border-radius: 7px;
    -o-border-radius: 7px;
    border-radius: 7px;
    width: 400px;
    margin: 40px auto 10px auto;
    padding: 30px;
    padding-top: 10px;
    overflow: hidden;
    position: relative;
    h3 {
      color: #4db3a5;
      text-align: center;
      font-size: 28px;
      font-weight: 400 !important;
    }
  }
}
</style>
