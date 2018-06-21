<template>
  <div class="register" id="register">
    <div class="content">
      <p class="title">修改密码<span class="fr hand" @click="go()"><span class="fa">{{ back }}</span><span>返回</span></span></p>
      <el-form :model="passwordForm" :rules="rules" ref="passwordForm" @submit.native.prevent="change('passwordForm')">
        <el-form-item label="" prop="current_password">
          <el-input class="red" type="password" v-model="passwordForm.current_password" placeholder="旧密码(字数在6~12之间)"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input class="red" type="password" v-model="passwordForm.password" placeholder="密码(字数在6~12之间)"></el-input>
        </el-form-item>
        <el-form-item label="" prop="rePassword">
          <el-input class="red" type="password" v-model="passwordForm.rePassword" placeholder="确认密码(字数在6~12之间)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" class="pull-right" :disabled="disabled">确认并重新登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Form, Button, FormItem, Input, Checkbox } from "element-ui";
import validators from "@/libs/validators";
import cookie from "@/libs/cookie";

export default {
  components: {
    "el-button": Button,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-input": Input,
    "el-checkbox": Checkbox
  },
  data() {
    return {
      back: this.$fontawesome("mail-reply"),
      disabled: false,
      passwordForm: {
        current_password: "",
        password: "",
        rePassword: ""
      },
      rules: {
        current_password: [
          { validator: validators.value.limitValue(6, 12, "密码"), trigger: "blur" }
        ],
        password: [
          { validator: validators.value.limitValue(6, 12, "密码"), trigger: "blur" }
        ],
        rePassword: [
          { validator: validators.value.limitValue(6, 12, "密码"), trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    go() {
      this.$router.push({ name: "Profile" });
    },
    rule() {
      this.$router.push({ name: "Rule" });
    },
    logOut() {
      let token = cookie.get("accessToken");
      this.api.logOut(token).then(() => {
        this.$store.dispatch("removeUserInfo");
        cookie.remove("accessToken");
        this.$router.push({name: "Home"});
        this.$store.dispatch("setLoginFlag", true);
        this.$message({
          message: "已退出，请重新登录",
          type: "info"
        });
      }).catch((error) => {
        this.disabled = false;
        console.log(error);
      });
    },
    change(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if ((this.passwordForm.rePassword !== this.passwordForm.password) && (this.passwordForm.rePassword)) {
            this.$message({
              message: "两次密码不一致",
              type: "error"
            });
            return;
          }
          this.disabled = true;
          this.api.updatePassword(this.passwordForm).then(() => {
            this.$message({
              message: "修改密码成功，请重新登录",
              type: "success"
            });
            this.logOut();
          }).catch((error) => {
            this.disabled = false;
            console.log(error);
          });
        }
      });
    }
  }
};
</script>

<style>
  #register .el-button span{
    font-size: 16px;
  }
</style>
<style lang='scss' scoped>
@import '../../assets/stylesheets/public';

.register {
  .content {
    width: 526px;
    margin: 0px auto;
    padding: 15px 10px;
    background-color: $color-white;
    .title {
      font-size: $font-h;
      text-align: center;
      padding-bottom: 15px;
      border-bottom: $px solid $color-gray8;
    }
    .el-form {
      width: 350px;
      padding-top: 30px;
      margin: 0px auto;
    }
    .red {
      &:before {
        content: '*';
        color: $color-red;
        position: absolute;
        left: -2px;
      }
    }
    .el-input {
      width: 349px;
      padding: 10px;
    }
    .rule {
      margin: 10px auto;
      text-align: center;
      span {
        color: $color-blue;
      }
    }
    .pull-right {
      width: 349px;
      margin: 0px auto;
      padding: 15px 0px;
      background-color: $color-red;
      color: $color-white;
      border: none;
    }
  }
}
</style>
