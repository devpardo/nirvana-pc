<template lang="html">
  <div class="profile-module">
    <p class="title-h1">
      <span>编辑个人资料</span>
    </p>
    <div class="user-profile" v-loading="loading" id="profile-editor">
      <p class="title padding">个人资料</p>
      <div class="profile">
        <p class="row">
          <span class="name dl">用户名</span>
          <span class="info dl">
            <input v-model="profile.username" class="dl" disabled="disabled" />
          </span>
        </p>
        <p class="row">
          <span class="name dl">我的头像</span>
          <span class="info dl">
            <span class="img dl">
              <img :src="profile.photo" width="100%" height="100%" />
            </span>
            <span class="edit hand dl fr" @click="uploadFile()">变更</span>
          </span>
        </p>
        <p class="row">
          <span class="name dl">出生年月日</span>
          <span class="info dl">
            <el-date-picker ref="input4" v-model='profile.birthday' :disabled='birthdayFlag' type="date" placeholder="出生日期(仅能变更一次)"
              :picker-options="pickerOptions0"></el-date-picker>
            <button class="hand edit dl fr" @click="editInfo(4)" :disabled="birthdayFlag">变更
              <i>（仅一次）</i>
            </button>
            <span ref="done4" class="done hand fr" style="display: none" @click="updateProfile(4)">点击完成</span>
          </span>
        </p>
        <p class="row">
          <span class="name dl">真实姓名</span>
          <span class="info dl">
            <input v-model="profile.realname" class="dl" disabled="disabled" placeholder="此项编辑完成后不能更改" />
            <button class="hand edit dl fr" @click="editProfile(1)" :disabled="realnameFlag">变更
              <i>（仅一次）</i>
            </button>
          </span>
        </p>
        <p class="row">
          <span class="name dl">性别</span>
          <span class="info dl">
            <input :value="profile.gender ? '女' : '男'" class="dl" disabled="disabled" />
            <span class="hand edit dl fr" @click="editProfile(2)">变更</span>
          </span>
        </p>
        <p class="row">
          <span class="name dl">个性签名</span>
          <span class="info dl">
            <input v-model="profile.desc" class="dl" disabled="disabled" />
            <span class="hand edit dl fr" @click="editProfile(3)">变更</span>
          </span>
        </p>
        <p class="title">联系方式</p>
        <p class="row">
          <span class="name dl">电子邮箱</span>
          <span class="info dl">
            <input ref="input5" v-model="profile.email" class="dl" disabled="disabled" />
            <span class="verified fr dl" v-if="profile.email && profile.email_confirmed_at">已验证
              <i class="fa">{{ check }}</i>
            </span>
            <!-- <span class="hand edit dl fr" v-else-if="!profile.email_confirmed_at" @click="editProfile(5)">变更</span> -->
            <span class="button fr hand dl" @click="verifyInfo(5)" v-if="profile.email && !profile.email_confirmed_at">立即验证</span>
          </span>
        </p>
        <p class="row">
          <span class="name dl">手机号码</span>
          <span class="info dl">
            <input ref="input6" v-model="profile.mobile" class="dl" disabled="disabled" />
            <span class="verified fr dl" v-if="profile.mobile && profile.mobile_confirmed_at">已验证
              <i class="fa">{{ check }}</i>
            </span>
            <span class="hand edit dl fr" v-else-if="!profile.mobile_confirmed_at" @click="editProfile(6)">变更</span>
            <span ref="done6" class="button fr hand dl" @click="verifyInfo(6)" v-if="profile.mobile && !profile.mobile_confirmed_at">立即验证</span>
          </span>
        </p>
        <p class="title">账户安全</p>
        <p class="row">
          <span class="name dl">登录密码</span>
          <span class="info dl">
            <input ref="input5" placeholder="******" class="dl" disabled="disabled" />
            <span class="hand edit dl fr" @click="editProfile(7)">变更</span>
          </span>
        </p>
      </div>
      <upload-file v-if="upload.flag" :upload="upload" :refresh="refresh"></upload-file>
      <verify-dialog v-if="verify.flag" :verify="verify" :profile="profile" :fetchProfile="fetchProfile"></verify-dialog>
      <profile-edit :profile="profile" v-if="profile.editFlag" :updateProfile="updateProfile"></profile-edit>
    </div>
  </div>
</template>

<script>
  import cookie from "@/libs/cookie";
  import UploadFile from "@/components/Setting/UploadFile.vue";
  import VerifyDialog from "@/components/Setting/VerifyDialog.vue";
  import ProfileEdit from "@/components/Setting/ProfileEdit.vue";
  import { dateFilter } from "@/libs/filters";
  import { regularExpression } from "@/libs/utils.js";

  export default {
    data() {
      return {
        lock: this.$fontawesome("lock"),
        signOut: this.$fontawesome("sign-out"),
        edit: this.$fontawesome("edit"),
        check: this.$fontawesome("check"),
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e7;
          }
        },
        upload: {
          flag: false
        },
        verify: {
          flag: false,
          number: ""
        },
        profile: {
          editFlag: false,
          editStyle: "",
          mobile: "",
          mobile_confirmed_at: "",
          email: "",
          email_confirmed_at: "",
          desc: "",
          photo: "",
          gender: "",
          birthday: "",
          realname: ""
        },
        birthdayFlag: false,
        realnameFlag: false,
        loading: false
      };
    },
    mounted() {
      this.fetchProfile();
    },
    components: { UploadFile, VerifyDialog, ProfileEdit },
    methods: {
      uploadFile() {
        this.upload.flag = true;
      },
      editProfile(n) {
        this.profile.editStyle = n; // 1: 真实姓名 2：性别 3: 个性签名  5: 邮箱 6: 手机 7：修改密码
        this.profile.editFlag = true;
      },
      verifyInfo(n) {
        if (!this.test(n)) {
          return;
        }
        this.verify.number = n;
        this.verify.flag = true;
      },
      test(n) {
        if (n === 5) {
          if (!this.profile.email) {
            this.$message({
              message: "邮箱不能为空",
              type: "warning"
            });
            return;
          }
          if (!regularExpression("email", this.profile.email)) {
            this.$message({
              message: "邮箱格式不对",
              type: "warning"
            });
            return;
          }
        } else if (n === 6) {
          if (!this.profile.mobile) {
            this.$message({
              message: "手机号不能为空",
              type: "warning"
            });
            return;
          }
          if (!regularExpression("mobile", this.profile.mobile)) {
            this.$message({
              message: "手机格式不对",
              type: "warning"
            });
            return;
          }
        }
        return true;
      },
      refresh() {
        history.go(0);
      },
      async fetchProfile() {
        try {
          this.loading = true;
          const res = await this.api.getProfile();
          this.profile.mobile = res.data.mobile;
          this.profile.email = res.data.email;
          this.profile.mobile_confirmed_at = res.data.mobile_confirmed_at;
          this.profile.email_confirmed_at = res.data.email_confirmed_at;
          this.profile.desc = res.data.desc;
          this.profile.username = res.data.username;
          this.profile.photo = res.data.aws_url;
          if (res.data.gender !== null) {
            this.profile.gender = res.data.gender; // 0: 男 / 1: 女
          }
          this.profile.birthday = res.data.birthday;
          if (res.data.birthday) {
            this.birthdayFlag = true;
          }
          this.profile.realname = res.data.realname;

          this.realnameFlag = !!res.data.realname;
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }
      },
      editInfo(n) {
        if (n === 4) {
          if (this.birthdayFlag) {
            this.$message({
              message: "仅能编辑一次，不能再次编辑",
              type: "info"
            });
            return;
          }
        }
        let ele = "done" + n;
        if (this.$refs[ele].style.display === "inline-block") {
          this.$refs[ele].style.display = "none";
        } else if (this.$refs[ele].style.display === "none") {
          this.$refs[ele].style.display = "inline-block";
        }
      },
      async updateProfile(n) {
        // 1: 真实姓名 2：性别 3: 个性签名  5: 邮箱 6: 手机 7：修改密码
        let ob = {};
        if (n === 3) {
          if (!this.profile.desc) {
            this.$message({
              message: "签名不能为空",
              type: "warning"
            });
            return;
          }
          ob = {
            desc: this.profile.desc
          };
        } else if (n === 1) {
          if (!this.profile.realname) {
            this.$message({
              message: "真实姓名不能为空",
              type: "warning"
            });
            return;
          }
          ob = {
            realname: this.profile.realname
          };
        } else if (n === 2) {
          ob = {
            gender: this.profile.gender
          };
        } else if (n === 4) {
          if (!this.profile.birthday) {
            this.$message({
              message: "出生日不能为空",
              type: "warning"
            });
            return;
          }
          ob = {
            birthday: dateFilter(this.profile.birthday, "yyyy-MM-dd")
          };
        } else if (n === 5) {
          if (this.profile.email && this.profile.email_confirmed_at) {
            this.$message({
              message: "邮箱已验证，不能再次编辑",
              type: "info"
            });
            return;
          } else {
            if (!this.test(n)) {
              return;
            }
          }
          ob = {
            email: this.profile.email
          };
        } else if (n === 6) {
          if (this.profile.mobile && this.profile.mobile_confirmed_at) {
            this.$message({
              message: "手机号已验证，不能再次编辑",
              type: "info"
            });
            return;
          } else {
            if (!this.test(n)) {
              return;
            }
          }
          ob = {
            mobile: this.profile.mobile
          };
        }
        this.loading = true;
        try {
          await this.api.updateProfile(ob);
          if (n === 3) {
            this.refresh();
          } else if (n === 4) {
            await this.fetchProfile(); // 其它可不请求api新数据 因为修改时已改变本地数据
          }
          await this.fetchProfile();
          this.$message({
            message: "信息保存完毕",
            type: "success"
          });
        } catch (error) {
          if (n === 4) {
            this.profile.birthday = "";
          }
          this.$message({
            message: "信息保存失败",
            type: "error"
          });
          console.log(error);
        } finally {
          this.loading = false;
        }
      },
      async logOut() {
        try {
          let token = cookie.get("accessToken");
          await this.api.logOut(token);

          this.$store.dispatch("removeUserInfo");
          cookie.remove("accessToken");
          this.$router.push({ name: "Home" });
          this.$message({
            message: "已退出",
            type: "info"
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  input:disabled {
    opacity: 0.8;
  }
  .profile-module {
    width: 1000px;
    margin: 20px auto;
    .title-h1 {
      color: $color-white;
      margin-bottom: 20px;
      span {
        font-size: $font-h;
        &:first-of-type {
          font-weight: bold;
          padding-right: 3px;
        }
        &:last-of-type {
          font-weight: bold;
        }
      }
    }
  }
  .user-profile {
    background-color: $color-blue9;
    padding-bottom: 50px;
    .title {
      padding: 15px 40px;
      text-align: left;
      color: $color-yellow13;
      font-size: $font-h4;
      font-weight: bold;
      background-color: rgba($color-white, 0.1);
    }
    .padding {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      border-bottom: none;
    }
    .profile {
      .row {
        padding: 15px 10px;
        margin: 0px 40px;
        text-align: left;
        border-bottom: $px solid $color-blue8;
        input {
          border: none;
          outline: none;
          width: 420px;
          color: $color-white;
          background-color: $color-blue9;
          font-weight: bold;
          margin-top: 10px;
        }
        .radio {
          margin: 0px 10px;
          margin-top: 5px;
        }
        .done {
          width: 120px;
          @include line-height(36px);
          border-radius: 25px;
          background-color: $color-blue2;
          color: $color-white;
          text-align: center;
          font-size: $font-h5;
          margin-right: 10px;
        }
        .img {
          width: 50px;
          height: 50px;
          img {
            border-radius: 50%;
          }
        }
        span,
        input {
          vertical-align: middle;
        }
        .name {
          width: 20%;
          color: $color-white;
          font-weight: bold;
        }
        .info {
          width: 78%;
          .button,
          .verified,
          .edit {
            width: 120px;
            @include line-height(36px);
            text-align: center;
            border-radius: 25px;
          }
          .button {
            background-color: $color-yellow13;
            color: $color-blue9;
          }
          .verified {
            border: 2px solid $color-yellow13;
            color: $color-yellow13;
            position: relative;
            line-height: 36px;
            i {
              color: $color-yellow13;
              position: absolute;
              right: 10px;
              top: 10px;
            }
          }
          .edit {
            border: 2px solid $color-white;
            color: $color-white;
            font-weight: bold;
            outline: none;
            background-color: $color-blue9;
            i {
              font-size: $font-h5;
              font-style: normal;
              font-weight: normal;
              color: $color-gray3;
            }
          }
        }
      }
    }
  }
</style>
