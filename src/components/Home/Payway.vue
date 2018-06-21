<template lang="html">
  <div class="pay-way">
    <p class="title">
      <span class="weight">支付方式</span>
      <span class="withdraw-button hand" @click="withdraw()">快捷提款通道</span>
    </p>
    <p class="time">
      <span class="first">
        <span class="fa">{{ clock }}</span>
        <span>平均充值时间:</span>
        <span class="red"><span>2</span>分钟</span>
      </span>
      <span>
        <span class="fa">{{ clock }}</span>
        <span>平均提款时间:</span>
        <span class="red"><span>5</span>分钟</span>
      </span>
    </p>
    <div class="content">
      <div class="ways">
        <span class="way way5 hand dl" @click="deposit()">
          <span class="image img5 img5-5 dl"></span>
        </span>
        <span class="way way6 hand dl" @click="deposit()">
          <span class="image img6 img6-6 dl"></span>
        </span>
        <span class="way way7 hand dl" @click="deposit()">
          <span class="image img7 img7-7 dl"></span>
        </span>
        <span class="way way8 hand dl" @click="deposit()">
          <span class="image img8 img8-8 dl"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clock: this.$fontawesome("clock-o")
    };
  },
  methods: {
    deposit() {
      this.$router.push({ name: "Deposit" });
    },
    withdraw() {
      this.$router.push({ name: "Withdraw" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.pay-way {
  width: 100%;
  height: 250px;
  background-color: $color-blue8;
  padding: 10px 20px;
  .title {
    color: $color-white;
    margin: 10px 0 20px 0;
    span { 
      font-size: $font-h;
      }
    .weight {
      font-weight: bold;
    }
    .withdraw-button {
      font-size: $font-h4;
      padding: 10px 40px;
      background-color: $color-yellow13;
      color: $color-blue9;
      border-radius: 20px;
      float: right;
    }
  }
  .content {
    padding: 10px 0px;
    .pay-img {
      width: 366px;
      height: 75px;
    }
    .ways {
      .img5 {
        background: url("../../assets/images/home-wepay-white.png");
        background-size: 100% 100%;
      }
      .way5 {
        &:hover {
          .img5-5 {
            background: url("../../assets/images/home-wepay-green.png");
            background-size: 100% 100%;
          }
        }
      }
      .img6 {
        background: url("../../assets/images/home-alipay-white.png");
        background-size: 100% 100%;
      }
      .way6 {
        &:hover {
          .img6-6 {
            background: url("../../assets/images/home-alipay-blue.png");
            background-size: 100% 100%;
          }
        }
      }
      .img7 {
        background: url("../../assets/images/home-onlinepay-white.png");
        background-size: 100% 100%;
      }
      .way7 {
        &:hover {
          .img7-7 {
            background: url("../../assets/images/home-onlinepay-cyan.png");
            background-size: 100% 100%;
          }
        }
      }
      .img8 {
        background: url("../../assets/images/home-offlinepay-white.png");
        background-size: 100% 100%;
      }
      .way8 {
        &:hover {
          .img8-8 {
            background: url("../../assets/images/home-offlinepay-orange.png");
            background-size: 100% 100%;
          }
        }
      }
    }
    .img2, .img4 {
      position: relative;
      bottom: 1px;
    }
  }
  .way {
    width: 86px;
    &:not(:last-of-type) {
      margin-right: 2px;
    }
    .image {
      width: 86px;
      height: 86px;
    }
    .dl {
      vertical-align: middle;
    }
    span {
      border-radius: 4px;
    }
  }
  .img {
    width: 30px;
    height: 27px;
  }
  .img1 {
    width: 31px;
    height: 31px;
    position: relative;
    bottom: 2px;
  }
  .img2 {
    width: 31px;
    height: 23px;
  }
  .img3 {
    width: 30px;
    height: 31px;
    position: relative;
    bottom: 2px;
  }
  .time {
    padding: 10px 0px;
    border-bottom: $px solid $color-blue9;
    span { 
      color: $color-white 
    }
    .first { 
      padding-right: 20px 
    }
    .fa { 
      font-size: $font-h4 
    }
    .red { 
      color: $color-yellow13; 
      span { 
        padding-right: $px; 
        color: $color-yellow13; 
        font-size: $font-h2; 
      } 
    }
  }
}
</style>
