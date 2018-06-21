<template lang="html">
  <div class="body">
    <div class="main">
      <p class="title">忘记密码</p>
      <div class="main-body">
        <p class="info">请输入您登录用的电子邮箱或手机号码，系统将为您发送包含验证码的邮件或短信。</p>
        <p class="info">验证通过后，系统将允许您重新设定密码。</p>
        <div class="fill-in" v-if="active">
          <p class="input-title">通过注册邮箱找回</p>
          <input type="email" placeholder="邮箱地址" v-model="email.email"/>
          <div>
            <input class="dl code-txt" type="text" placeholder="验证码" v-model="email.code"/>
            <input v-if="emailCodeFlag" class="dl get-code hand" type="button" value="点击获取" @click="sendEmailResetCode()"/>
            <span v-else class="code-seconds">{{ count.email }}秒后重新获取</span>
          </div>
        </div>
        <div class="fill-in" v-if="!active">
          <p class="input-title">通过注册手机号找回</p>
          <input type="number" placeholder="11位大陆手机号码" v-model="mobile.mobile"/>
          <div>
            <input class="dl code-txt" type="text" placeholder="验证码" v-model="mobile.code"/>
            <input v-if="mobileCodeFlag" class="dl get-code hand" type="button" value="点击获取" @click="sendMobileResetCode()"/>
            <span v-else class="code-seconds">{{ count.mobile }}秒后重新获取</span>
          </div>
        </div>
        <div class="fill-in" v-if="email.code || mobile.code">
          <input type="password" placeholder="新密码(字数在6~12之间)" v-model="password.password"/>
          <input type="password" placeholder="确认新密码(字数在6~12之间)" v-model="password.rePassword"/>
        </div>
        <div class="fill-button">
          <span class="button fill-yellow1 hand dl" @click="send()">提交验证码</span>
          <span class="button fill-yellow2 hand dl" @click="byPhone()" v-if="active">通过手机号码找回</span>
          <span class="button fill-yellow2 hand dl" @click="byEmail()" v-else>通过电子邮箱找回</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { regularExpression } from "@/libs/utils.js";
import cookie from "@/libs/cookie";

export default {
  data() {
    return {
      active: true,
      left: this.$fontawesome("angle-left"),
      externalLink: this.$fontawesome("external-link"),
      emailCodeFlag: true,
      mobileCodeFlag: true,
      count: {
        email: 60,
        mobile: 60
      },
      profile: "",
      password: {
        password: "",
        rePassword: ""
      },
      email: {
        email: "",
        code: "",
        password: ""
      },
      mobile: {
        mobile: "",
        code: "",
        password: ""
      }
    };
  },
  mounted() {
  },
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
    byEmail() {
      this.active = true;
    },
    byPhone() {
      this.active = false;
    },
    send() {
      if (this.active) {
        this.resetPasswordViaEmail();
      } else {
        this.resetPasswordViaMobile();
      }
    },
    sendMobileResetCode() {
      if (!regularExpression("mobile", this.mobile.mobile)) {
        this.$message({
          message: "手机格式不对",
          showClose: true,
          type: "error"
        });
        return;
      }
      this.api.sendMobileResetCode({ "mobile": this.mobile.mobile }).then((res) => {
        this.mobileCodeFlag = false;
        let mobileTime = setInterval(() => {
          this.count.mobile --;
          if (this.count.mobile === 0) {
            this.mobileCodeFlag = true;
            this.count.mobile = 60;
            window.clearInterval(mobileTime);
          }
        }, 1000);
        this.$message({
          message: "已发送验证码，请注意接收",
          type: "info"
        });
      }).catch((error) => {
        console.log(error);
      });
    },
    testPassword() {
      if (this.password.password !== this.password.rePassword) {
        this.$message({
          message: "两次密码不一致",
          showClose: true,
          type: "error"
        });
        return false;
      }
      if (!regularExpression("password", this.password.password)) {
        this.$message({
          message: "设置密码不符合要求",
          showClose: true,
          type: "error"
        });
        return false;
      }
      return true;
    },
    resetPasswordViaMobile() {
      if (this.mobile.mobile === "" || this.mobile.code === "" || this.password.password === "") {
        this.$message({
          message: "必填字段不能为空",
          showClose: true,
          type: "error"
        });
        return;
      }
      if (this.testPassword()) {
        this.mobile.password = this.password.password;
      } else {
        return;
      }
      this.api.resetPasswordViaMobile(this.mobile).then((res) => {
        this.$message({
          message: "修改密码成功",
          type: "success"
        });
        this.logOut();
      }).catch((error) => {
        console.log(error);
      });
    },
    logOut() {
      let token = cookie.get("accessToken");
      this.api.logOut(token).then(() => {
        this.$store.dispatch("removeUserInfo");
        cookie.remove("accessToken");
        this.$router.push({ name: "Home" });
        this.$store.dispatch("setLoginFlag", true);
        this.$message({
          message: "请重新登录",
          type: "info"
        });
      }).catch((error) => {
        console.log(error);
      });
    },
    sendEmailResetCode() {
      if (!regularExpression("email", this.email.email)) {
        this.$message({
          message: "邮箱格式不对",
          showClose: true,
          type: "error"
        });
        return;
      }
      this.api.sendEmailResetCode({ "email": this.email.email }).then((res) => {
        this.emailCodeFlag = false;
        let emailTime = setInterval(() => {
          this.count.email --;
          if (this.count.email === 0) {
            this.emailCodeFlag = true;
            this.count.email = 60;
            window.clearInterval(emailTime);
          }
        }, 1000);
        this.$message({
          message: "已发送验证码，请注意接收",
          type: "info"
        });
      }).catch((error) => {
        console.log(error);
      });
    },
    resetPasswordViaEmail() {
      if (this.email.email === "" || this.email.code === "" || this.password.password === "") {
        this.$message({
          message: "必填字段不能为空",
          showClose: true,
          type: "error"
        });
        return;
      }
      if (this.testPassword()) {
        this.email.password = this.password.password;
      } else {
        return;
      }
      this.api.resetPasswordViaEmail(this.email).then((res) => {
        this.$message({
          message: "修改密码成功",
          type: "success"
        });
        this.logOut();
      }).catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/public';

.body {
  padding-top: 50px;
  padding-bottom: 100px;
}
.head {
  @include line-height(50px);
  padding: 0px 10px;
  background-color: $color-red;
  text-align: center;
  color: $color-white;
  position: fixed;
  width: 100%;
  z-index: 30;
  .fl, .fr {
    line-height: inherit;
  }
  .fl {
    font-size: $font-h;
  }
}
.mint-header .re-button {
  overflow: visible;
}
.button {
  width: 200px;
  margin: 10px auto;
  padding: 10px 40px;
  text-align: center;
  border-radius: 25px;
}
.fill-red {
  background-color: $color-red9;
  color: $color-white;
  margin-right: 20px;
}
.fill-yellow1 {
  background-color: $color-yellow13;
  color: $color-blue9;
  margin-right: 20px;
}
.fill-yellow2 {
  border: 2px solid $color-yellow13;
  color: $color-yellow13;
}
.fill-white {
  background-color: $color-white;
  color: $color-red9;
  border: $px solid $color-red9;

}
.forgot {
  text-align: center;
  color: $color-blue1;
  .fa {
    position: relative;
    top: 2px;
    left: 2px;
  }
}
.main {
  width: 680px;
  margin: 0px auto;
  padding-bottom: 20px;
  .title {
    text-align: center;
    color: $color-white;
    font-size: $font-h;
    margin-bottom: 20px;
  }
  .dl {
    display: inline-block;
  }
  .code-txt {
    width: 455px;
  }
  .code-seconds {
    padding: 10px;
    border: $px solid $color-blue3;
    background: $color-gray7;
    color: $color-white;
    border-radius: 5px;
    width: 140px;
  }
  .get-code {
    padding: 10px;
    background-color: $color-blue2;
    border: $px solid $color-blue3;
    color: $color-white;
    border-radius: 5px;
    width: 140px;
  }
  input {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px 15px;
    border: $px solid $color-gray11;
    border-radius: 5px;
  }
}
.main-body {
  width: 100%;
  background-color: $color-blue9;
  border: 10px solid $color-blue8;
  border-radius: 10px;
  margin: 0px auto;
  padding: 30px;
  .info {
    color: $color-white;
    text-align: left;
    &:last-of-type {
      margin-bottom: 20px;
    }
  }
  .fill-button {
    text-align: center;
  }
  .fill-in {
    .input-title {
      color: $color-white;
      padding: 0px 10px;
      margin-bottom: 10px;
      @include line-height(12px);
      text-align: left;
      border-left: 4px solid $color-yellow13;
    }
  }
}
</style>
