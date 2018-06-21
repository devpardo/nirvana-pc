<template lang="html">
  <div class="privilege">
    <p><span class="title">我的特权</span></p>
    <div class="blocks" v-if="level">
      <div class="item" v-if="parseFloat(level) >= 1">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/vip-rebate.png"/></p>
        <div class="txt">VIP返水</div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 1">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/birthday.png"/></p>
        <div class="txt">会员尊享生日礼金</div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 1">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/vip-coupon.png"/></p>
        <div class="txt">红利优惠券</div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 1 && parseFloat(level) < 2">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/spin-sliver.png"/></p>
        <div class="txt">白银抽奖盘</div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 2  && parseFloat(level) < 3">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/spin-gold.png"/></p>
        <div class="txt">黄金抽奖盘</div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 1  && parseFloat(level) <= 3">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/vip-services.png"/></p>
        <div class="txt">优先提款服务</div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 3">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/spin-diamond.png"/></p>
        <div class="txt">钻石抽奖盘</div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 4">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/vip-services.png"/></p>
        <div class="txt">极速提款服务</div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 5">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/eurTrip.png"/></p>
        <div class="txt">免费欧洲双人游</div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 2">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/gift.png"/></p>
        <div class="txt">会员尊享节日礼物</div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 3">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/free-4G.png"/></p>
        <div class="txt">免费手机流量</div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 2">
        <p class="img"><img width="100%" height="100%" src="../../assets/images/vip-cs.png"/></p>
        <div class="txt">专属客服</div>
      </div>
    </div>
    <p v-else class="no-data">您暂时未有任何特权</p>
  </div>
</template>

<script>
export default {
  props: ["level"]
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.privilege {
  padding: 20px;
  border-top: $px solid $color-blue8;
  margin: 20px auto;
  margin-top: 50px;
  .title {
    font-size: $font-h;
    font-weight: bold;
    color: $color-yellow13;
  }
}
.blocks {
  margin-top: 5px;
  .item {
    width: 150px;
    text-align: center;
    border: 10px solid $color-yellow13;
    border-radius: 5px;
    display: inline-block;
    margin-top: 15px;
    margin-left: 15px;
    vertical-align: top;
    background-color: $color-blue8;
  }
  .img {
    width: 100%;
    height: 90px;
    display: block;
  }
  .txt {
    background-color: $color-yellow13;
    padding: 5px 0px;
    color: $color-blue8;
    font-weight: bold;
  }
}
</style>
