<template lang="html">
  <div class="coupon">
    <span class="img dl"><img src="~assets/images/coupon-code.png" width="213" height="151"/></span>
    <div class="coupon-right dl">
      <div class="coupon-header">
        <p class="title-h1">优惠券</p>
        <div class="txt">
          <div>
            <p class="request"><span class="circle fa">{{ question }}</span>什么是优惠券？</p>
            <p class="response">优惠券是指【亚太娱乐】定期推出的优惠礼券，使用后将获得相应的优惠奖金或信息。</p>
          </div>
          <div>
            <p class="request"><span class="circle fa">{{ question }}</span>使用方法及获取途径</p>
            <p class="response">1. 领取优惠券后，用户需在优惠券有效期间及指定平台内根据内容获取奖励。</p>
            <p class="response">2. 用户在转账至优惠券指定平台时，选择该券并完成转账，即使用成功，所获奖金将自动添加到主账户中。</p>
            <p class="response">3. 优惠券可在<span class="yellow hand" @click="Lottery()">【亚太大抽奖】</span>、<span class="yellow hand" @click="Award()">【我的任务】</span>及各种线下活动兑换码中获取。</p>
          </div>
        </div>
        <div class="input">
          <p class="number"><input v-model="code" placeholder="输入兑换码"/><span class="button hand dl" @click="couponCode()">兑换</span></p>
        </div>
        <p class="info"><span class="fa">{{ exclamation }}</span>关注亚太公众号，即可随时订阅最新优惠资讯，更有机会领取更多优惠券。</p>
      </div>
      <p class="break"></p>
      <p class="title-h1">我的优惠券</p>
      <div class="coupon-footer">
        <div v-if="!coupons.length && !loading" class="error-all"></div>
        <loading :loading="!coupons.length && loading" v-if="!coupons.length  && loading"></loading>
        <div class="list dl" v-for="item in coupons">
          <div class="txt">
            <span class="dl"><img src="../../assets/images/coupon.png" width="100%" height="100%"></span>
            <span class="title dl">
              <p class="h5">{{ item.promotion_name || '无' }}</p>
              <p class="h6">{{ item.promotion_desc || '无' }}</p>
            </span>
          </div>
          <div class="vendors">
            <span class="expired"><span class="weight">适用平台: </span></span>
            <span class="vendor-name" v-if="item.promotion_vendors && item.promotion_vendors.split(',').length">
              <span v-for="(it, index) in item.promotion_vendors.split(',')">{{ it || '无' }}<span v-if="index !== item.promotion_vendors.split(',').length - 1">、</span></span>
            </span>
            <span class="vendor-name" v-else>全部</span>
            <p class="expired"><span class="weight">适用期限:</span> {{ item.expired_at | date('yyyy-MM-dd H:m:s') }}</p>
            <p class="active-button">已激活</p>
            <p class="tooth"><i v-for="i in 23"></i></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "@/libs/filters";
  import Loading from "@/components/Shared/Loading.vue";

  export default {
    data() {
      return {
        coupons: "",
        code: "",
        loading: true,
        question: this.$fontawesome("question-circle"),
        exclamation: this.$fontawesome("exclamation-circle")
      };
    },
    async mounted() {
      await this.getCoupons();
    },
    components: { Loading },
    methods: {
      async getCoupons() {
        try {
          this.loading = true;
          const { data } = await this.api.getCoupons();
          if (data.items && data.items.length) {
            this.coupons = data.items;
            await this.api.markCouponsAsRead();
          }
        } catch (error) {
        } finally {
          this.loading = false;
        }
      },
      couponCode() {
        if (!this.code) {
          this.$message({
            message: "优惠码不能为空",
            type: "error"
          });
          return;
        }
        this.api.postCouponCode({ code: this.code }).then(() => {
          this.$message({
            message: "领取优惠券成功",
            type: "success"
          });
          this.getCoupons();
        });
      },
      Lottery() {
        this.$router.push("lottery");
      },
      Award() {
        this.$router.push({ name: "Award" });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .error-all {
    display: block;
    margin: 10px auto;
  }
  .coupon {
    background-color: $color-blue8;
    padding: 30px 20px;
    .coupon-right {
      vertical-align: top;
      padding-left: 30px;
      width: 80%;
      .title-h1 {
        font-size: $font-h;
        color: $color-yellow13;
        font-weight: bold;
      }
      .break {
        width: 100%;
        height: $px;
        background-color: $color-gray7;
        margin: 20px 0px;
      }
    }
    .coupon-header {
      width: 100%;
      .txt {
        margin-top: 10px;
        p {
          margin-bottom: 6px;
        }
        .fa {
          padding-right: 5px;
        }
        .request {
          color: $color-white;
          font-weight: bold;
        }
        .circle {
          color: $color-yellow13;
        }
        .response {
          padding-left: 13px;
          color: $color-white;
          .red {
            color: $color-red9;
          }
          .yellow {
            color: $color-yellow13;
          }
        }
      }
      .input {
        vertical-align: middle;
        width: 400px;
        position: relative;
        margin: 0px 10px;
        margin-top: 20px;
        .button {
          position: absolute;
          right: 3px;
          top: 3px;
          width: 80px;
          @include line-height(30px);
          background-color: $color-yellow13;
          color: $color-blue9;
          text-align: center;
          border-radius: 20px;
        }
        input {
          width: 100%;
          @include line-height(36px);
          padding-right: 87px;
          padding-left: 15px;
          border-radius: 20px;
          outline: none;
          border: $px solid $color-yellow13;
          background-color: $color-blue9;
        }
      }
      .info {
        padding-top: 6px;
        padding-left: 10px;
        color: $color-yellow12;
        font-weight: bold;
        .fa {
          padding-right: 5px;
        }
      }
    }
  }
  .coupon-footer {
    margin-top: 10px;
    .vendors {
      padding: 10px;
      position: relative;
      .weight {
        font-weight: bold;
      }
      .vendor-name {
        color: $color-yellow13;
      }
      .active-button {
        width: 240px;
        @include line-height(36px);
        background-color: $color-yellow13;
        color: $color-blue9;
        text-align: center;
        border-radius: 20px;
        margin: 20px auto;
        opacity: 0.5;
      }
      .tooth {
        position: absolute;
        bottom: -4px;
        left: 2px;
        right: 0px;
        i {
          display: inline-block;
          border-right: 6px solid transparent;
          border-left: 6px solid transparent;
          border-bottom: 6px solid $color-yellow13;
        }
      }
    }
    .list {
      width: 300px;
      background-color: $color-blue9;
      border: 8px solid $color-yellow13;
      margin-right: 12px;
      border-bottom-width: 20px;
      border-radius: 10px;
      vertical-align: top;
      position: relative;
      &:before,
      &:after {
        content: "";
        width: 15px;
        height: 15px;
        background-color: $color-yellow13;
        border-radius: 50%;
        position: absolute;
        top: 45%;
      }
      &:before {
        left: -7.5px;
      }
      &:after {
        right: -7.5px;
      }
    }
    .expired {
      color: $color-white;
      padding-top: 5px;
    }
    .txt {
      padding: 10px;
      border-bottom: $px solid $color-yellow13;
      position: relative;
      &:after {
        position: absolute;
        content: "";
        top: -2px;
        right: -7px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid $color-yellow13;
        transform: rotate(45deg);
      }
      img {
        width: 36px;
        height: 36px;
      }
      .title {
        vertical-align: top;
        padding-left: 5px;
        width: 83%;
      }
      .h5,
      .h6 {
        @extend .break-word;
      }
      .h5 {
        color: $color-yellow13;
        font-size: $font-h4;
        font-weight: bold;
        padding-bottom: 5px;
      }
      .h6 {
        color: $color-white;
      }
    }
  }
</style>
