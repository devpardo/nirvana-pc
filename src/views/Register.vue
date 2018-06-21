<template>
  <div class="body register" id="register">
    <div class="content">
      <p class="title">创建一个亚太账号</p>
      <el-form :model="registerForm" :rules="rules" ref="registerForm" @submit.native.prevent="login('registerForm')">
        <div class="form-title">
          <p>亚太带您畅游游戏新时代！</p>
          <p>请在以下列表正确填写您的个人信息，完善的注册资料便于您能及时收到更多更新的优惠信息以及奖金红利！</p>
        </div>
        <el-form-item label="" prop="username">
          <span class="input-title title-red dl">用户名</span>
          <el-input v-model="registerForm.username" placeholder="7~12个字符，不含标点或特殊字符"></el-input>
        </el-form-item>
        <el-form-item label="" prop="email">
          <span class="input-title title-red dl">电子邮箱</span>
          <el-input class="red" type="email" v-model="registerForm.email" placeholder="电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <span class="input-title title-red dl">密码</span>
          <el-input class="red" type="password" v-model="registerForm.password" :placeholder="passwordPlaceholder"></el-input>
        </el-form-item>
        <!--<div class="test-code">-->
        <!--<el-form-item prop="_rucaptcha" class="captcha dl">-->
        <!--<el-input class="red" type="text" v-model="registerForm._rucaptcha" placeholder="验证码"></el-input>-->
        <!--</el-form-item>-->
        <!--<span class="captcha-image dl">-->
        <!--<span class="fa" @click="refreshCode()">{{ refresh }}</span>-->
        <!--<img :src="imgUrl" :alt="imgUrl" width="100%" height="100%"/>-->
        <!--</span>-->
        <!--</div>-->
        <el-form-item label="" prop="rePassword">
          <span class="input-title title-red dl">确认密码</span>
          <el-input class="red" type="password" v-model="registerForm.rePassword" placeholder="必须与密码相一致"></el-input>
        </el-form-item>
        <el-form-item label="" prop="mobile">
          <span class="input-title title-red dl">手机号码</span>
          <el-input class="red" type="mobile" v-model="registerForm.mobile" placeholder="11位大陆手机号码"></el-input>
        </el-form-item>
        <div class="mobile-code">
          <el-form-item label="" prop="code" class="captcha dl">
            <el-input class="red" v-model="registerForm.code" placeholder="手机验证码"></el-input>
          </el-form-item>
          <button class="dl" :disabled="disabled" @click="getPhoneCode()">
            <span v-if="disabled">{{ baseCount }} 秒后重试</span>
            <span class="hand" v-else>点击获取</span>
          </button>
        </div>
        <div class="choose-block">
          <el-form-item label="">
            <span class="input-title title-gray dl">微信号</span>
            <el-input v-model="registerForm.wechat" placeholder="可不填"></el-input>
            <p class="wechat">
              <span class="fa">{{ exclamation }}</span>完善填写微信号可帮助您及时接收更多更丰富的优惠信息。</p>
          </el-form-item>
          <el-form-item label="">
            <span class="input-title title-gray dl">邀请码</span>
            <el-input v-model="registerForm.channel_code" :placeholder="channelCode || '亚太官方发放的邀请码，可不填'" :disabled="!!channelCode"></el-input>
          </el-form-item>
        </div>
        <p class="rule" @click="agree(1)">
          <span class="fa hand" :class="{ 'fa-yellow': checked.age }">{{ check }}</span>我已年满十八（18）周岁。</p>
        <p class="rule" @click="agree(2)">
          <span class="fa hand" :class="{ 'fa-yellow': checked.rule }">{{ check }}</span>我已阅读并同意亚太娱乐所规定的
          <span class="hand" @click="rule()">《亚太娱乐服务及隐私协议》。</span>
        </p>
        <div class="submit">
          <el-form-item>
            <el-button native-type="submit" class="pull-right">提交注册信息</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { Form, Button, FormItem, Input, Checkbox } from "element-ui";
  import validators from "@/libs/validators";
  import cookie from "@/libs/cookie";
  import { mapGetters } from "vuex";
  import * as storage from "../libs/storage";
  import { debounce } from "@/libs/utils";
  export default {
    components: {
      "el-button": Button,
      "el-form": Form,
      "el-form-item": FormItem,
      "el-input": Input,
      "el-checkbox": Checkbox
    },
    data() {
      const limits = {
        min: 6,
        max: 12
      };
      // const passwordLimit = validators.value.limitValue(
      //   limits.min,
      //   limits.max,
      //   "密码"
      // );
      const passwordLimitMessage = `密码长度不得小于${limits.min}个字符或大于${
        limits.max
      }个字符。`;
      const passwordLimit = (rule, value, callback) => {
        if (!this.isPasswordInLimit) {
          callback(new Error(passwordLimitMessage));
        }
      };
      const passwordValidator = (...args) => {
        const [, , callback] = args;
        passwordLimit(...args);
        if (!this.isPasswordSame) {
          callback(new Error("确认密码必须与密码相一致"));
        }
      };
      const debouncedCheckUnique = debounce(this.api.checkUser, 300);

      const checkUniqueValidator = type => async (rule, value, callback) => {
        try {
          const { msg, message } = await debouncedCheckUnique(type, value).then(
            res => res.data
          );
          console.log(msg, message);
        } catch (error) {
          console.dir(error);
          const { response } = error;
          if (response) {
            callback(new Error(response.data.message));
          }
        }
      };
      return {
        passwordLimit: { ...limits },
        isQuery: false,
        registerForm: {
          username: "",
          email: "",
          password: "",
          rePassword: "",
          channel_code: "",
          mobile: "",
          code: "",
          wechat: ""
        },
        checked: {
          age: true,
          rule: true
        },
        imgUrl: process.env.API_ROOT + "/v1/users/captcha",
        refresh: this.$fontawesome("refresh"),
        exclamation: this.$fontawesome("exclamation-circle"),
        check: this.$fontawesome("check-square-o"),
        disabled: false,
        baseCount: 60,
        rules: {
          username: [
            {
              validator: validators.value.limitValue(7, 12, "用户名"),
              trigger: "blur"
            },
            {
              validator: checkUniqueValidator("username")
            }
          ],
          email: [
            {
              validator: validators.email({ message: "邮箱格式不正确" })
            },
            {
              validator: checkUniqueValidator("email")
            }
          ],
          password: [
            {
              validator: passwordLimit,
              trigger: "blur"
            }
          ],
          rePassword: [
            {
              validator: passwordValidator,
              trigger: "blur"
            }
          ],
          code: [validators.required({ message: "手机验证码不能为空" })],
          mobile: [
            validators.required({ message: "手机号不能为空" }),
            { validator: validators.phoneValidator, trigger: "blur" },
            {
              validator: checkUniqueValidator("mobile")
            }
          ]
        }
      };
    },
    computed: {
      ...mapGetters(["channelCode"]),
      passwordPlaceholder() {
        return `${this.passwordLimit.min}~${this.passwordLimit.max}个字符`;
      },
      isPasswordNotEmpty() {
        return this.registerForm.password && this.registerForm.rePassword;
      },
      isPasswordSame() {
        return (
          this.isPasswordNotEmpty &&
          this.registerForm.password === this.registerForm.rePassword
        );
      },
      isPasswordInLimit() {
        return this.isInPasswordRange("password");
      }
    },
    mounted() {
      // if (window.localStorage.channel_code) {
      //   this.registerForm.channel_code = window.localStorage.channel_code;
      // }
      this.registerForm.channel_code = this.channelCode;
    },
    methods: {
      isInPasswordRange(field) {
        const length = this.registerForm[field].toString().length;

        const { min, max } = this.passwordLimit;

        return length >= min && length <= max;
      },
      rule() {
        this.$router.push({ name: "Rule" });
      },
      agree(n) {
        if (n === 1) {
          this.checked.age = !this.checked.age;
        } else if (n === 2) {
          this.checked.rule = !this.checked.rule;
        }
      },
      refreshCode() {
        this.imgUrl = `${
          process.env.API_ROOT
        }/v1/users/captcha?rnd=${Math.random()}`;
      },
      getPhoneCode() {
        if (!this.registerForm.mobile) {
          this.$message({
            message: "手机号不能为空",
            type: "error"
          });
          return;
        }
        this.disabled = true;
        let time = setInterval(() => {
          this.baseCount = this.baseCount - 1;
          if (this.baseCount <= 0) {
            window.clearInterval(time);
            this.baseCount = 60;
            this.disabled = false;
          }
        }, 1000);
        this.api.mobileCaptcha({ mobile: this.registerForm.mobile }).then(() => {
          this.$message({
            message: "验证码已发送，请注意查收",
            type: "success"
          });
        });
      },
      async login(formName) {
        let isValid = true;
        try {
          console.log(formName);
          if (!this.checked.age) {
            this.$message({
              message: "如若您已满18岁，请点亮选项。",
              type: "warning"
            });
            return;
          }
          if (!this.checked.rule) {
            this.$message({
              message: "如若您阅读并同意《亚太娱乐服务及隐私协议》，请点亮选项。",
              type: "warning"
            });
            return;
          }
          console.log("HEY");
          this.$refs[formName].validate(async valid => {
            console.log(valid);
            if (!valid) {
              this.$message({
                message: "一個或多個註冊字段無效",
                type: "error"
              });
              return;
            }
            isValid = valid;
          });
          if (!isValid) return;
          if (!this.isPasswordSame) {
            this.$message({
              message: "两次密码不一致",
              type: "error"
            });
            return;
          }
          // this.registerForm.rePassword = "";

          const { data } = await this.api.registeredUser(this.registerForm);
          cookie.set("accessToken", data.access_token, { path: "/" });
          const res = await this.api.getProfile();
          await this.$store.dispatch("setLoginFlag", false);
          let user = res.data;
          window.localStorage.user = JSON.stringify(user);
          this.$root.$emit("auth-login");
          await this.$store.dispatch("setUserInfo", user);
          let redirect = decodeURIComponent(this.$route.query.redirect || "/");
          this.$router.push({ path: redirect });
          if (this.registerForm.channel_code) storage.remove("utm_source");
          this.$message({
            message: "注册成功",
            type: "success"
          });
        } catch (error) {
          // this.$message({
          //   message: error.message,
          //   type: "error"
          // });
          console.log(error);
          this.refreshCode();
        }
      }
    }
  };
</script>

<style lang='scss'>
  @import "../assets/stylesheets/public";
  #register {
    .mobile-code {
      padding-left: 11rem;
      .el-form-item__error {
        left: 10%;
      }
      .el-input {
        width: 200px;
        vertical-align: middle;
      }
    }
    .el-form-item__error {
      left: 170px;
      color: #d9534f;
      position: relative;
      &:after,
      &:before {
        position: absolute;
      }
      &:after {
        top: 4px;
        left: -20px;
        content: "";
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 14px solid #d9534f;
        border-radius: 3px;
      }
      &:before {
        top: 7px;
        left: -14px;
        z-index: 1;
        content: "!";
        color: $color-blue9;
        font-weight: bold;
        transform: scale(0.7);
      }
    }
  }
</style>
<style lang='scss' scoped>
  @import "../assets/stylesheets/public";

  #register {
    button:disabled {
      opacity: 0.5;
    }
  }
  .dl {
    display: inline-block;
  }
  .mobile-code {
    //margin-left: 150px;
    .captcha {
      width: 190px;
    }
    button {
      margin-left: 10px;
      background-color: $color-blue2;
      @include line-height(40px);
      border: none;
      border-radius: 5px;
      color: $color-white;
      vertical-align: top;
      margin-left: 20px;
      &:disabled {
        color: $color-white;
        opacity: 1;
      }
    }
  }
  .test-code {
    .captcha {
      width: 120px;
    }
    .captcha-image {
      vertical-align: middle;
      width: 200px;
      height: 70px;
      border: $px solid $color-gray4;
      position: relative;
      .fa {
        color: $color-gray3;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: $font-h4;
      }
    }
  }
  .register {
    padding-top: 20px;
    .wechat {
      //padding-left: 26%;
      color: $color-yellow12;
      @include line-height(20px);
      margin-bottom: 10px;
      .fa {
        padding-right: 6px;
      }
    }
    .content {
      width: 680px;
      margin: 0px auto;
      padding: 15px 10px;
      .title {
        font-size: $font-h;
        text-align: center;
        padding-bottom: 15px;
        width: 100%;
        color: $color-white;
      }
      .el-form {
        width: 100%;
        padding: 30px 40px;
        background-color: $color-blue9;
        border: 10px solid $color-blue8;
        border-radius: 10px;
        margin: 0px auto;
        .input-title {
          color: $color-white;
          padding: 0px 10px;
          width: 150px;
          @include line-height(12px);
          text-align: left;
        }
        .title-red {
          border-left: 4px solid $color-yellow13;
        }
        .title-gray {
          border-left: 4px solid $color-white;
        }
        .form-title {
          padding-bottom: 20px;
          p {
            &:first-of-type {
              font-size: $font-h4;
              color: $color-white;
              padding-bottom: 5px;
            }
            &:last-of-type {
              font-size: $font-h5;
              font-weight: normal;
              color: rgba($color-white, 0.5);
            }
          }
        }
      }
      .el-input {
        width: 400px;
        font-size: $font-h5;
        @include line-height(40px);
      }
      .rule {
        padding-top: 10px;
        text-align: left;
        color: $color-white;
        font-weight: bold;
        .hand {
          color: $color-yellow13;
        }
        .fa {
          font-size: $font-h2;
          color: rgba($color-white, 0.5);
          padding-right: 10px;
          vertical-align: middle;
        }
        .fa-red {
          color: $color-red9;
        }
        .fa-yellow {
          color: $color-yellow13;
        }
      }
    }
  }
  .choose-block {
    border-top: $px solid $color-gray7;
    border-bottom: $px solid $color-gray7;
    padding: 20px 0px;
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .submit {
    margin: 30px auto;
    width: 100%;
    .pull-right {
      float: none;
      display: block;
      margin: 0 auto;
      width: 200px;
      padding: 13px 0px;
      background-color: $color-yellow13;
      color: $color-blue9;
      border: none;
      outline: none;
      border-radius: 25px;
    }
  }
</style>
