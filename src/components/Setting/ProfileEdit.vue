<template lang="html">
  <div class="editBg">
    <div class=editBox>
      <p class="title">
        <span v-if="profile.editStyle === 2">编辑我的性别</span>
        <span v-else-if="profile.editStyle === 3">编辑个性签名</span>
        <span v-else-if="profile.editStyle === 1">编辑我的真实姓名</span>
        <span v-else-if="profile.editStyle === 7">变更登录密码</span>
        <span v-else-if="profile.editStyle === 5">编辑电子邮箱</span>
        <span v-else-if="profile.editStyle === 6">编辑手机号码</span>
        <span class="hand fr" @click="close()">+</span>
      </p>
      <div class="box">
        <div v-if="profile.editStyle === 2">
          <p class="gender hand" @click="changeGender(0)"><span class="fa">{{ mars }}</span><span>男性</span><span class="fa check fr" v-if="current === 0">{{ check }}</span></p>
          <p class="gender hand" @click="changeGender(1)"><span class="fa">{{ venus }}</span><span>女性</span><span class="fa check fr" v-if="current === 1">{{ check }}</span></p>
        </div>
        <div v-else-if="profile.editStyle === 3">
          <textarea placeholder="不能超过50个字符" v-model="sign"></textarea>
        </div>
        <div v-else-if="profile.editStyle === 1">
          <input class="input" placeholder="此项编辑确定后不能更改" v-model="name"/>
        </div>
        <div v-else-if="profile.editStyle === 5">
          <input class="input" placeholder="请输入新的邮箱地址" v-model="email"/>
        </div>
        <div v-else-if="profile.editStyle === 6">
          <input class="input" placeholder="请输入新的手机号码" v-model="mobile"/>
        </div>
        <div v-else-if="profile.editStyle === 7">
          <input class="input" placeholder="旧的登录密码(字数在6~12之间)" v-model="oldPassword"/>
          <input class="input" placeholder="新的登录密码(字数在6~12之间)" v-model="newPasswod"/>
          <input class="input" placeholder="确认登录密码(字数在6~12之间)" v-model="rePassword"/>
        </div>
      </div>
      <button class="button hand" :disabled="current === ''" @click="ok()" v-if="profile.editStyle === 2">确定</button>
      <button class="button hand" :disabled="!sign" @click="ok()" v-else-if="profile.editStyle === 3">确定</button>
      <button class="button hand" :disabled="!name" @click="ok()" v-else-if="profile.editStyle === 1">确定</button>
      <button class="button hand" :disabled="!email" @click="ok()" v-else-if="profile.editStyle === 5">确定</button>
      <button class="button hand" :disabled="!mobile" @click="ok()" v-else-if="profile.editStyle === 6">确定</button>
      <button class="button hand" :disabled="!oldPassword || !newPasswod || !rePassword || passwordFlg" @click="change()" v-else-if="profile.editStyle === 7">确定</button>
    </div>
  </div>
</template>

<script>
import cookie from "@/libs/cookie";

export default {
  props: ["profile", "updateProfile"],
  data() {
    return {
      mars: this.$fontawesome("mars"),
      venus: this.$fontawesome("venus"),
      check: this.$fontawesome("check"),
      current: this.profile.gender, // 重新赋值 是为了与父页面数据分割开
      sign: this.profile.desc,
      name: this.profile.realname,
      email: this.profile.email,
      mobile: this.profile.mobile,
      oldPassword: "",
      newPasswod: "",
      rePassword: "",
      passwordFlg: false
    };
  },
  methods: {
    close() {
      this.profile.editFlag = false;
    },
    changeGender(n) {
      this.current = n;
    },
    ok() {
      this.profile.gender = this.current;
      this.profile.desc = this.sign;
      this.profile.realname = this.name;
      this.profile.email = this.email;
      this.profile.mobile = this.mobile;
      this.updateProfile(this.profile.editStyle);
      this.close();
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
    verify(value) {
      let len = value.length;
      if (len) {
        if (len < 6 || len > 12) {
          this.$message({
            message: "密码字数格式不对",
            type: "error"
          });
          return false;
        }
      } else {
        this.$message({
          message: "密码不能为空",
          type: "error"
        });
        return false;
      }
      return true;
    },
    change() {
      if (!this.verify(this.newPasswod)) { return; }
      if (!this.verify(this.rePassword)) { return; }
      if (!this.verify(this.oldPassword)) { return; }
      if ((this.newPasswod !== this.rePassword) && (this.newPasswod)) {
        this.$message({
          message: "两次密码不一致",
          type: "error"
        });
        return;
      }
      this.passwordFlg = true;
      let passwordForm = {
        current_password: this.oldPassword,
        password: this.newPasswod
      };
      this.api.updatePassword(passwordForm).then(() => {
        this.$message({
          message: "修改密码成功，请重新登录",
          type: "success"
        });
        this.logOut();
      }).catch((error) => {
        this.passwordFlg = false;
        this.$message({
          message: "修改密码失败",
          type: "error"
        });
        console.log(error);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.editBg {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .editBox {
    position: fixed;
    width: 500px;
    top: 180px;
    left: 35%;
    background-color: $color-blue9;
    border-radius: 6px;
    padding-bottom: 25px;
    .title {
      width: 100%;
      @include line-height(50px);
      color: $color-white;
      font-size: $font-h4;
      padding: 0px 20px;
      font-weight: bold;
      background-color: $color-blue8;
      border-top-right-radius: 6px;
      border-top-left-radius: 6px;
      .fr {
        color: $color-white;
        font-weight: bold;
        font-size: $font-h;
        transform: rotate(45deg);
      }
    }
    .box {
      padding: 30px 20px;
      padding-bottom: 0px;
      margin: 0px auto;
      textarea {
        width: 460px;
        height: 150px;
        background-color: $color-white;
        border-radius: 4px;
        display: block;
        margin: 0 auto;
        margin-bottom: 15px;
        border: none;
        padding: 15px;
      }
    }
    .gender {
      width: 300px;
      @include line-height(45px);
      border: $px solid $color-blue6;
      background-color: $color-blue8;
      margin: 0px auto;
      margin-bottom: 20px;
      padding: 0px 15px;
      border-radius: 25px;
      color: $color-white;
      font-weight: bold;
      span { font-size: $font-h4; }
      .fa {
        font-weight: bold;
        padding-right: 10px;
      }
      .check {
        color: $color-yellow13;
        padding-top: 15px;
      }
    }
    .button {
      width: 200px;
      display: block;
      @include line-height(40px);
      background-color: $color-yellow13;
      text-align: center;
      color: $color-blue9;
      outline: none;
      border: none;
      margin: 0px auto;
      border-radius: 20px;
    }
    button:disabled {
      opacity: .5;
    }
    .input {
      width: 450px;
      @include line-height(45px);
      border-radius: 4px;
      background-color: $color-blue8;
      color: $color-white;
      display: block;
      border: none;
      margin: 0 auto;
      padding: 0px 20px;
      margin-bottom: 15px;
      &::placeholder {
        color: $color-white;
      }
    }
  }
}
</style>
