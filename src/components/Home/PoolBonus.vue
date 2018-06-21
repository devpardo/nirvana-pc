<template>
  <div class="pool-bonus">
    <!--<span class="fr">当前在线人数: {{ pool.onlines || '88666' }}人</span>-->
    <div class="jackpot">
      <div class="title">
        <span class="logo">
          <span class="dl"><img src="../../assets/images/mwico-w.png" width="100%" height="100%"/></span>
          <span>亚太大奖池</span>
        </span>
        <span class="fr">当前在线 : {{ pool.onlines || '100' }}人</span>
      </div>
      <div class="container">
        <span class="icon dl">￥</span>
        <vm-counter class="dl" :number="baseAmount" :delay-each="100" height="48">
          <template slot-scope="{number, index}">
            <span class="number">{{number}}</span>
            <span class="dot" v-if="index === 6">.</span>
          </template>
        </vm-counter>
      </div>
    </div>
  </div>
</template>

<script>
import "@/components/Shared/counter";
import SPagination from "../Shared/SPagination";
export default {
  components: {SPagination},
  data() {
    return {
      pool: "",
      baseAmount: 0,
      intervalTime: "",
      maxAmount: 988888888,
      base: 510612620,
      animatedNumber: 0
    };
  },
  created: function() {
    this.api.getRecords().then((res) => {
      this.pool = res.data;
    });
  },
  mounted() {
    this.baseAmount = this.base;
    this.intervalTime = setInterval(() => {
      var temp = this.baseAmount;
      temp = temp + Math.ceil(Math.random() * 100);
      if (temp >= this.maxAmount) {
        temp = this.base;
      }
      this.baseAmount = temp;
    }, 3000);
//    var temp = parseFloat(this.baseAmount.toString().replace(/,/g, ''))
//    temp = (temp + Math.ceil(Math.random() * 100)).toString()
//    if (temp >= this.maxAmount) {
//      temp = this.base
//    }
//    var tempArr = temp.split('')
//    tempArr.forEach((value, index) => {
//      if (value !== this.baseAmount[index]) {
//        if (this.baseAmount[index] < value) {
//        }
//      }
//    })
  },
  beforeDestroy() {
    window.clearInterval(this.intervalTime);
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.pool-bonus {
  width: 100%;
  border: 2px solid $color-blue8;
  margin-right: 20px;
}
.jackpot {
  .title {
    @include line-height(50px);
    background-color: rgba($color-black, .1);
    padding: 0px 15px;
    .logo {
      span { font-size: $font-h; color: $color-white; vertical-align: middle }
      .dl { width: 36px; height: 36px; vertical-align: middle; margin-right: 10px; }
    }
    .fr { color: $color-white; padding-top: 6px; }
  }
}
.container {
  height: 100%;
  padding: 20px 10px;
  padding-bottom: 42px;
  background-color: $color-blue8;
  color: $color-yellow13;
  .dot { color: $color-yellow13; font-size: 50px; }
  .dl, .number {
    font-weight: bold;
    font-size: 50px;
  }
  .number {

  }
}
</style>
