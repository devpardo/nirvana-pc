<template lang="html">
  <div class="profile-header" id="profile-header">
    <div class="header-body">
      <div class="body-left dl">
        <span class="img dl"><img :src="auth.aws_url" width="100%" height="100%"/></span>
        <span class="brief dl">
          <p>
            <span class="name dl">
              {{ auth.username || '无' }}
            </span>
            <span class="level">
            LV.{{ auth.level_before_type_cast || 0 }}
            </span>
          </p>
          <p class="sign">
            <!--<span class="fa">{{ edit }}</span>-->
            <span class="dl" v-if="auth.desc">{{ auth.desc }}</span>
            <span class="dl" v-else>该用户很懒，还没留下个性签名</span>
          </p>
          <p>
            <span class="fa" :class="{ 'white' : $route.name === 'Profile' }">
              {{ license }}
            </span>
            <span class="hand space" :class="{ 'white' : $route.name === 'Profile' }" @click="goProfile()">
              个人资料
            </span>
            <span class="fa" :class="{ 'white' : $route.name === 'Banks' }">
              {{ card }}
            </span>
            <span class="hand" :class="{ 'white' : $route.name === 'Banks' }" @click="goBank()">
              我的银行卡
            </span>
          </p>
        </span>
      </div>
      <p class="hr dl"></p>
      <div class="body-center dl">
        <p class="intro">
          主账户余额
          <span class="fa fr hand" @click="fetchProfile('fresh')">
            {{ refresh }}
          </span>
        </p>
        <p class="balance">
          <span class="icon dl">￥</span>
          <span class="money hand dl">
            <el-tooltip effect="dark" :content="'主账户余额: ￥' + auth.main_wallet" placement="top-start">
              <span v-loading="loading">{{ auth.main_wallet || '--' }}</span>
            </el-tooltip>
          </span>
        </p>
        <!--<p class="info"><span class="fa">{{ exclamation }}</span>如若金额显示不全，请将鼠标放在金额数字上查看主账户余额</p>-->
        <p>
          <span class="button dl hand" @click="deposit()">充值</span><span class="button dl hand" @click="withdraw()">提款</span>
        </p>
      </div>
      <p class="hr dl"></p>
      <div class="body-right dl">
        <span v-for="(item, index) in list" @click="go(item.routeName)" :class="{ 'active': $route.meta.name === item.routeName }">
          <p class="fa" v-if="index === 0">{{ bank }}</p>
          <p class="fa" v-else-if="index === 1">{{ list_alt }}</p>
          <p class="fa" v-else-if="index === 2">{{ heart }}</p>
          <p class="fa" v-else-if="index === 3">
            <img src="../../assets/images/VIP-ICO-reg.png" width="30" height="30" v-if="$route.meta.name === item.routeName"/>
            <img v-else src="../../assets/images/VIP-ICO-active.png" width="30" height="30"/>
          </p>
          <p class="fa" v-else-if="index === 4">{{ envelope }}</p>
          <p>{{ item.title }}</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        edit: this.$fontawesome("edit"),
        license: this.$fontawesome("drivers-license-o"),
        card: this.$fontawesome("credit-card-alt"),
        refresh: this.$fontawesome("refresh"),
        bank: this.$fontawesome("bank"),
        list_alt: this.$fontawesome("list-alt"),
        heart: this.$fontawesome("heart"),
        envelope: this.$fontawesome("envelope-square"),
        exclamation: this.$fontawesome("exclamation-circle"),
        list: [
          {
            title: "查看账户",
            routeName: "Account"
          },
          {
            title: "交易记录",
            routeName: "BalanceHistories"
          },
          {
            title: "我的收藏",
            routeName: "Likes"
          },
          {
            title: "VIP特权",
            routeName: "MemberVip"
          },
          {
            title: "我的消息",
            routeName: "Notifications"
          }
        ],
        loading: true
        // profile: {}
      };
    },

    computed: {
      ...mapGetters(["auth"])
    },
    methods: {
      go(name = "Account") {
        console.log(name);
        this.$router.push({ name });
        // switch (n) {
        //   case 0:
        //     this.$router.push({ name: "Account" });
        //     break;
        //   case 1:
        //     this.$router.push({ name: "BalanceHistories" });
        //     break;
        //   case 2:
        //     this.$router.push({ name: "Likes" });
        //     break;
        //   case 3:
        //     this.$router.push({ name: "MemberVip" });
        //     break;
        //   case 4:
        //     this.$router.push({ name: "Notifications" });
        //     break;
        //   default:
        //     this.$router.push({ name: "Account" });
        // }
      },
      goProfile() {
        this.$router.push({ name: "Profile" });
      },
      deposit() {
        this.$router.push({ name: "Deposit" });
      },
      withdraw() {
        this.$router.push({ name: "Withdraw" });
      },
      goBank() {
        this.$router.push({ name: "Banks" });
      },
      async fetchProfile(flag) {
        try {
          this.loading = true;
          await this.$store.dispatch("getAuth");
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }
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
    }
  };
</script>

<style lang="scss">
  @import "../../assets/stylesheets/public";
  #profile-header {
    .el-loading-mask {
      background-color: $color-blue9;
    }
  }
</style>
<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .profile-header {
    width: 100%;
    background-color: $color-blue9;
    .header-body {
      width: $min-width;
      margin: 0px auto;
      padding: 20px 0 20px 20px;
      .hr {
        vertical-align: middle;
        width: 2px;
        height: 130px;
        background-color: $color-blue8;
        box-shadow: inset 1px 0px rgba(0, 0, 0, 0.6);
      }
      .body-left {
        max-width: 282px;
        margin-right: 30px;
      }
      .img {
        width: 67px;
        height: 67px;
        vertical-align: middle;
        img {
          border-radius: 50%;
        }
      }
    }
    .brief {
      padding-left: 10px;
      vertical-align: middle;
      .sign {
        width: 200px;
        vertical-align: middle;
      }
      p {
        padding-bottom: 10px;
      }
      span {
        color: $color-yellow13;
      }
      .fa {
        padding-right: 5px;
      }
      .name {
        font-size: $font-h1;
        color: $color-white;
        padding-right: 10px;
        max-width: 155px;
        @extend .overflow;
        vertical-align: middle;
      }
      .space {
        padding-right: 20px;
      }
      .level {
        padding: 1px 12px;
        border: 2px solid $color-yellow13;
        color: $color-yellow13;
        vertical-align: middle;
        border-radius: 20px;
      }
      .white {
        color: $color-white;
      }
      .yellow13 {
        color: $color-yellow13;
      }
    }
  }
  .body-center {
    margin: 0px 30px;
    vertical-align: middle;
    width: 23%;
    .intro {
      color: $color-white;
      font-weight: bold;
      vertical-align: bottom;
      .fa {
        color: $color-yellow13;
        padding: 5px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
    .info {
      padding-top: 10px;
      font-size: $font-h5;
      font-weight: normal;
      .fa {
        color: $color-yellow13;
        padding-right: 5px;
      }
      color: $color-yellow13;
    }
    .balance {
      color: $color-yellow13;
      .icon {
        padding-bottom: 6px;
        font-size: $font-h2;
      }
    }
    .money {
      vertical-align: bottom;
      span {
        font-size: $font-large;
      }
      font-weight: bold;
      width: 82%;
      word-break: break-all;
      @extend .overflow;
    }
    .button {
      font-weight: bold;
      background-color: $color-yellow13;
      color: $color-blue9;
      width: 120px;
      @include line-height(30px);
      border-radius: 15px;
      margin-top: 5px;
      margin-right: 20px;
      text-align: center;
    }
    .alert {
      color: $color-yellow13;
      padding-top: 10px;
      max-width: 356px;
      @include overflow-line(2);
    }
  }
  .body-right {
    vertical-align: middle;
    .active {
      color: $color-yellow13;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        bottom: -53px;
        right: 48px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid $color-blue8;
      }
    }
    .fa {
      font-size: 30px;
      padding-bottom: 10px;
    }
    span {
      display: inline-block;
      width: 110px;
      text-align: center;
      font-size: $font-h4;
      color: rgba($color-white, 0.5);
      cursor: pointer;
      position: relative;
      margin-left: 2px;
    }
  }
</style>
