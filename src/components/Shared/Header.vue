<template lang="html">
<div>
  <div class="header-bar">
    <div class="bar-main" >
      <div class="bar-1">
        <span class="logo dl fl"></span>
        <search class="margin-left dl"></search>
        <div class="user fr dl" v-if="auth">
          <span class="main-wallet">余额 ￥ {{ auth.main_wallet }}</span>
          <span class="points">亚太币 {{ auth.points }}</span>
          <span class="hand fa icon" @click="goProfile()">{{ userIcon }}</span>
          <span class="user-name dl hand" @click="goProfile()">
            <span>{{ auth.username }}</span>
          </span>
          <badge class="h-badge dl"></badge>
          <span class="sign-out hand" @click="logOut()"><span class="fa">{{ signOut }}</span><span>退出</span></span>
        </div>
        <div v-else class="enter fr">
          <span class="hand loginbtn" :class="{ 'button': enter.login }"@click="login()">登录</span>
          <span class="hand signbtn" :class="{ 'button': enter.register && $route.name === 'Join' }" @click="register()">注册</span>
        </div>
      </div>
      <div class="menu dl">
        <ul class="menu-ul">
          <li class="menu-li hand" v-for="(item, index) in barTitles" @click="goBar(item)" @mouseenter="goBar(item, 'hover')" @mouseleave="goBar(item, 'hover')" :class="{ 'opacity': item.index === $route.meta.index || item.routeName === $route.name || item.routePath === $route.path || item.pathReg && item.pathReg.test($route.path), 'after': item.index === 'task' }">
            <a v-if="item.index === 'slot'" @click.stop="goAll(item.index)">
              {{ item.title }}
            </a>

            <a v-else>
              {{ item.title }}
            </a>

            <ul class="list" v-if="item.arr && item.arr.length && item.flag">
              <li v-for="v in item.arr" @click.stop="goVendors(item.index, v.code)">{{ v.name }}平台</li>
            </ul>
          </li>
        </ul>
      </div>
      <login v-if="loginFlag"></login>
    </div>
  </div>
  <chat class="chat"></chat>
</div>
</template>

<script>
  import Login from "@/components/Shared/Login.vue";
  import Chat from "@/components/Shared/Chat.vue";
  import Badge from "@/components/Shared/Badge.vue";
  import Search from "@/components/Home/Search";
  import cookie from "@/libs/cookie";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        // profile: null,
        loading: false,
        headerBar: "",
        barTitles: [
          {
            title: "首页",
            routeName: "Home",
            index: "home"
          },
          {
            title: "亚太电游",
            routePath: "/slot",
            pathReg: /^\/slot/,
            index: "slot",
            arr: [
              //   {
              //   name: 'All',
              //   code: 'all'
              // },
              {
                name: "PT",
                code: "PT"
              },
              {
                name: "MG",
                code: "MGS"
              },
              {
                name: "PNG",
                code: "PNG"
              },
              {
                name: "DT",
                code: "DT"
              },
              {
                name: "Kuma",
                code: "KG"
              },
              {
                name: "PG",
                code: "PG"
              }
            ]
          },
          // {
          //   title: "亚太真人视讯",
          //   routePath: "/live_casino",
          //   pathReg: /^\/live_casino/,
          //   index: "live_casino"
          //   // arr: [
          //   //   {
          //   //     name: "AG",
          //   //     code: "AG"
          //   //   },
          //   //   {
          //   //     name: "DG",
          //   //     code: "DG"
          //   //   }
          //   // ]
          // },
          // {
          //   title: "全民捕鱼",
          //   routePath: "/fishing",
          //   pathReg: /^\/fishing/,
          //   index: "fishing"
          //   // arr: [
          //   //   {
          //   //     name: "GG",
          //   //     code: "GG"
          //   //   }
          //   // ]
          // },
          {
            title: "亚太真人",
            routePath: "/casino",
            index: "casino",
          },
          {
            title: "亚太捕鱼",
            routePath: "/fish",
            index: "fish",
          },
          {
            title: "亚太体育",
            routePath: "/sports",
            index: "sports",
          },
          {
            title: "优惠活动",
            routeName: "Activity",
            index: "activity"
          },
          {
            title: "福利中心",
            routeName: "Award",
            index: "task"
          },
          {
            title: "个人中心",
            routeName: "Account",
            index: "profile"
          }
        ],
        userIcon: this.$fontawesome("user-circle"),
        mobile: this.$fontawesome("mobile"),
        signOut: this.$fontawesome("sign-out"),
        enter: {
          login: false,
          register: true
        }
      };
    },
    watch: {
      "$route.name": function() {
        let routeName = this.$route.name;
        switch (routeName) {
          case "Home":
            this.headerBar = true;
            break;
          default:
            this.headerBar = false;
        }
      }
    },
    computed: {
      ...mapGetters(["auth"]),
      loginFlag: function() {
        return this.$store.state.sundry.loginFlag;
      },
      userName: function() {
        return this.$store.state.user.username;
      }
    },
    components: { Login, Chat, Search, Badge },
    methods: {
      login() {
        this.$store.dispatch("setLoginFlag", !this.loginFlag);
        this.enter.register = false;
        this.enter.login = true;
      },
      register() {
        this.$router.push({ name: "Join" });
        this.enter.login = false;
        this.enter.register = true;
      },
      goAll(idx) {
        this.$router.push({ path: `/${idx}/all` });
      },
      goVendors(category, code) {
        //console.log("ASFSA", category, code);
        if (code) {
          if (category) {
            this.$router.push({ path: `/${category}/${code}` });
            // if (category === "category_slot") {
            //   this.$router.push({ path: `/${category}/${code}` });
            // } else {
            //   this.$router.push({ path: `/${category}/all` });
            // }
          } else {
            this.$message({
              message: "该平台目前未有分类",
              type: "info"
            });
          }
        } else {
          this.$router.push({ name: "Vendor" });
        }
      },
      logOut() {
        let token = cookie.get("accessToken");
        this.api
          .logOut(token)
          .then(() => {
            this.$store.dispatch("removeUserInfo");
            cookie.remove("accessToken");
            this.$router.push({ name: "Home" });
            //        this.$store.dispatch('setLoginFlag', true)
            this.profile = null;
            this.$message({
              message: "已退出",
              type: "info"
            });
          })
          .catch(error => {
            console.log(error);
          });
      },
      goBar(item, flag) {
        if (flag === "hover") {
          if (item.index !== "slot"
            // item.index !== "slot" &&
            // item.index !== "live_casino" &&
            // item.index !== "fishing"
          ) {
            return false;
          }
        }
        if (item.arr && item.arr.length) {
          let code = "";
          if (item.index === "slot") {
            this.$set(this.barTitles[2], "flag", false);
            this.$set(this.barTitles[3], "flag", false);
            code = "PT";
          } else if (item.index === "live_casino") {
            this.$set(this.barTitles[1], "flag", false);
            this.$set(this.barTitles[3], "flag", false);
            code = "AG";
          } else if (item.index === "fishing") {
            this.$set(this.barTitles[1], "flag", false);
            this.$set(this.barTitles[2], "flag", false);
            code = "GG";
          }
          this.$set(item, "flag", !item.flag);
          if (flag !== "hover") {
            this.$router.push({ path: `/${item.index}/${code}` });
          }
          return false;
        }
        this.$set(this.barTitles[1], "flag", false);
        this.$set(this.barTitles[2], "flag", false);
        this.$set(this.barTitles[3], "flag", false);
        if (item.routeName) {
          if (item.routeName === "Activity") {
            this.$router.push({ name: item.routeName, params: { category: 0 } });
          } else {
            this.$router.push({ name: item.routeName });
          }
        } else {
          this.$router.push({ path: item.routePath });
        }
      },
      goProfile() {
        this.$router.push({ name: "Account" });
      },
      fetchProfile(flag) {
        this.api
          .getProfile()
          .then(res => {
            this.profile = res.data;
            this.loading = false;
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
          });
        if (flag === "fresh") {
          this.$message({
            message: "已刷新到最新主账户余额，请不要频繁刷新",
            type: "warning"
          });
        }
      }
    },
    async mounted() {
      await this.fetchProfile();
      this.$root.$on("auth-login", async val => {
        await this.fetchProfile();
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .chat {
    position: fixed;
    z-index: 39;
    bottom: 20%;
    right: 0px;
  }
  .header-bar {
    position: fixed;
    background-color: $color-blue6;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 1000;
    width: 100%;
    min-width: $min-width;
    .bar-main {
      height: 95px;
    }
    .bar-1 {
      @include line-height(50px);
      width: $min-width;
      margin: 0 auto;
      padding-left: 20px;
      .logo {
        width: 132px;
        height: 42px;
        background: url("../../assets/images/ytlogo.png") no-repeat;
        background-size: 100% 100%;
        margin: 4px 0;
      }
      .margin-left {
        margin-left: 200px;
      }
      .enter {
        color: $color-yellow13;
        span {
          font-size: $font-h3;
          &:first-of-type {
            margin-right: 10px;
          }
        }
        .button {
          font-size: $font-h3;
          background-color: $color-yellow13;
          padding: 8px 40px;
          border-radius: 20px;
          color: $color-blue6;
          text-align: center;
        }
        .signbtn {
          background-color: $color-yellow13;
          padding: 8px 40px;
          border-radius: 20px;
          color: $color-blue6;
          &:hover {
            opacity: 0.7;
          }
        }
        .loginbtn {
          border: 2px solid $color-yellow13;
          padding: 6px 40px;
          border-radius: 20px;
          &:hover {
            opacity: 0.7;
          }
        }
      }
      .user {
        padding-left: 20px;
        .main-wallet {
          color: $color-white;
          margin-right: 15px;
        }
        .points {
          color: $color-white;
          margin-right: 15px;
        }
        .icon {
          font-size: $font-h3;
          color: $color-white;
        }
        .h-badge {
          padding-left: 20px;
        }
        .user-name {
          vertical-align: top;
          font-weight: bold;
          color: $color-white;
          max-width: 120px;
          @extend .overflow;
        }
      }
      .sign-out {
        padding-left: 20px;
        span {
          color: $color-yellow13;
          &:first-of-type {
            font-size: $font-h4;
            padding-right: 3px;
          }
          &:last-of-type {
            font-size: $font-h4;
          }
        }
      }
      .money {
        padding-left: 20px;
        span {
          display: inline-block;
          &:first-of-type,
          &:last-of-type {
            vertical-align: top;
            max-width: 96px;
            @extend .overflow;
          }
          &:first-of-type {
            color: $color-black;
            font-size: $font-h4;
            padding-right: 3px;
          }
          &:last-of-type {
            color: $color-gray;
            font-weight: bold;
          }
        }
      }
    }
  }
  .menu {
    width: 100%;
    background-color: $color-blue7;
    .menu-ul {
      width: $min-width;
      height: 45px;
      margin: 0 auto;
      padding-left: 20px;
      .after {
        &:after {
          position: absolute;
          top: 13px;
          right: -5px;
          display: inline-block;
          content: "最新";
          color: $color-blue6;
          font-size: $font-h5;
          transform: scale(0.8);
          background-color: $color-yellow13;
          padding: 0px 5px;
          border-radius: 3px;
          @include line-height(18px);
        }
      }
    }
    .menu-li {
      cursor: pointer;
      display: inline-block;
      color: $color-white;
      font-size: $font-h3;
      padding: 10px 30px;
      text-align: center;
      opacity: 0.8;
      position: relative;
    }
    .opacity {
      opacity: 1;
      border-bottom: 2px solid $color-yellow13;
    }
    .list {
      position: absolute;
      z-index: 2;
      right: 11%;
      background-color: $color-blue7;
      width: 100px;
      padding: 20px 10px 10px 10px;
      text-align: center;
      .bg-li {
        background-color: $color-yellow13;
      }
      li {
        padding: 0px;
        width: 100%;
        cursor: pointer;
        @include line-height(26px);
        margin-bottom: 10px;
        &:hover {
          background-color: $color-yellow13;
          color: $color-blue6;
          border-radius: 20px;
        }
      }
    }
  }
</style>
