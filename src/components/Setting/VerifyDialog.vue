<template lang="html">
  <div class="mask-layer">
    <div class="dialog" v-if="verify.number && verify.number === 5">
      <p class="title">邮箱验证<span class="hand fr" @click="close()">+</span></p>
      <div class="content">
        <p class="txt">{{ profile.email }}</p>
        <div class="code">
          <input type="text" class="dl" placeholder="请输入验证码" v-model="code"/>
          <button class="button hand plain-blue dl" :disabled="disabled" v-if="!disabled" @click="getEmailCode()">获取验证码</button>
          <span class="button plain-gray dl" v-else>请查看邮箱</span>
        </div>
        <p class="info">点击左侧按钮获取电子邮箱验证码</p>
        <!--disabled="disabled"-->
        <button class="hand submit" :disabled="!code && submitDisabled" @click="email()">进行验证</button>
      </div>
    </div>
    <div class="dialog" v-else="verify.number && verify.number === 6">
      <p class="title">手机号验证<span class="hand fr" @click="close()">+</span></p>
      <div class="content">
        <p class="txt">{{ profile.mobile }}</p>
        <div class="code">
          <input type="text" class="dl" placeholder="请输入验证码" v-model="code"/>
          <button class="button hand plain-blue dl" :disabled="disabled" v-if="!disabled" @click="getMobileCode()">获取验证码</button>
          <span class="button plain-gray dl" v-else>{{ count }}秒</span>
        </div>
        <p class="info">点击左侧按钮获取手机号验证码</p>
        <!--disabled="disabled"-->
        <button class="hand submit" :disabled="!code && submitDisabled" @click="mobile()">进行验证</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["verify", "profile", "fetchProfile"],
  data() {
    return {
      disabled: false,
      submitDisabled: true,
      code: "",
      count: 60
    };
  },
  methods: {
    close() {
      this.verify.flag = false;
    },
    getEmailCode() {
      this.disabled = true;
      this.api.postEmailVerifyCode(this.profile.email).then(() => {
        this.$message({
          message: "已发送验证码，请注意查收",
          type: "info"
        });
      }).catch(() => {
        this.disabled = false;
      });
    },
    getMobileCode() {
      this.disabled = true;
      let time = setInterval(() => {
        this.count--;
        if (this.count === 0) {
          this.disabled = false;
          this.count = 60;
          window.clearInterval(time);
        }
      }, 1000);
      this.api.postMobileVerifyCode(this.profile.mobile).then(() => {
        this.$message({
          message: "已发送验证码，请注意查收",
          type: "info"
        });
      }).catch(() => {
        this.disabled = false;
      });
    },
    email() {
      if (!this.code) {
        this.$message({
          message: "验证码不能为空",
          type: "warning"
        });
        return;
      }
      this.submitDisabled = false;
      this.api.emailCreate(this.profile.email, this.code).then(() => {
        this.submitDisabled = false;
        this.fetchProfile();
        this.close();
        this.$message({
          message: "邮箱验证成功",
          type: "success"
        });
      }).catch(() => {
        this.submitDisabled = true;
      });
    },
    mobile() {
      if (!this.code) {
        this.$message({
          message: "验证码不能为空",
          type: "warning"
        });
        return;
      }
      this.submitDisabled = false;
      this.api.mobileCreate(this.profile.mobile, this.code).then(() => {
        this.submitDisabled = false;
        this.fetchProfile();
        this.close();
        this.$message({
          message: "手机号验证成功",
          type: "success"
        });
      }).catch(() => {
        this.submitDisabled = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.mask-layer {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2001;
}
.dialog {
  position: absolute;
  top: 20%;
  left: 30%;
  width: 600px;
  background-color: $color-gray4;
  border-radius: 5px;
  .title {
    width: 100%;
    @include line-height(50px);
    color: $color-gray;
    font-size: $font-h4;
    padding: 0px 10px;
    font-weight: bold;
    background-color: $color-white;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    .fr {
      color: $color-gray3;
      font-weight: bold;
      font-size: $font-h;
      transform: rotate(45deg);
    }
  }
}
.content {
  padding: 20px;
  width: 80%;
  margin: 10px auto;
  .submit {
    width: 180px;
    padding: 12px 0px;
    text-align: center;
    background-color: $color-red9;
    color: $color-white;
    border-radius: 5px;
    margin: 0px auto;
    margin-top: 30px;
    border: none;
    display: block;
  }
  button:disabled {
    background-color: $color-gray7;
    opacity: 1;
  }
  .txt {
    color: $color-gray;
    font-size: $font-h4;
    margin-bottom: 10px;
    padding: 0px 10px;
  }
  .info {
    color: $color-gray5;
    padding-top: 5px;
    padding-left: 5px;
  }
  .code {
    input {
      width: 300px;
      @include line-height(40px);
      border: $px solid $color-white2;
      border-radius: 3px;
      padding: 0px 10px;
    }
    .plain-gray {
      background-color: $color-gray3;
    }
    .plain-blue {
      background-color: $color-blue2;
    }
    .button {
      padding: 10px 25px;
      color: $color-white;
      border-radius: 5px;
      margin-left: 10px;
      border: none;
    }
  }
}
</style>
