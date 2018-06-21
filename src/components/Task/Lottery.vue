<template lang="html">
  <div class="lottery">
    <div class="lottery-wheel">
      <div class="wheel">
        <div class="runner">
          <div class="gb-wheel">
            <section class="gb-wheel-container lottery_js" id="container">
              <div class="gb-wheel-content" :class="{ 'gb-wheel-run': wheel.runFlag }" :style="{ transform: 'rotate(' + (wheel.count * 3600 - wheel.endCount * 360)  + 'deg)' }">
                <ul class="gb-wheel-line">
                  <li v-for="(item, index) in wheel.awards" class="gb-wheel-litem" :style="{ transform: 'rotate(' + (index * wheel.copies + wheel.copies / 2) + 'turn)' }"></li>
                </ul>
                <div class="gb-wheel-list">
                  <div class="gb-wheel-item" v-for="(v, ind) in wheel.awards">
                    <div class="gb-wheel-icontent" :style="{ transform: 'rotate(' + (ind * wheel.copies) + 'turn)' }">
                      <p class="gb-wheel-itext">
                        {{ v.name }}
                      </p>
                      <p class="gb-wheel-iicon">
                        <i><img :src="v.aws_url" width="100%" height="100%"/></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn">
                <a href="javascript:;" class="gb-wheel-btn" @click="handleLottery()"></a>
              </div>
            </section>
          </div>
          <p class="info">您还有<span class="yellow">{{ playTimes }}</span>次抽奖机会</p>
        </div>
      </div>
      <div class="rule">
        <span class="h1 dl">活动规则: </span>
        <span class="text dl">
          <p>1. 每次抽奖需消耗50亚太币。</p>
        </span>
      </div>
      <div class="rule">
        <span class="h1 dl">奖励规则: </span>
        <span class="text dl">
          <p>1.【现金】奖励由系统自动派发，请在主账户中查收或交易记录中查询详情。</p>
          <p>2.【现金】奖励提款需要完成5倍投注流水（所有平台通用，不限制游戏）。</p>
          <p>3.【亚太币】奖励由系统自动派发，请在<span class="yellow hand" @click="coin()">【我的亚太币】</span>中查收或亚太币记录中查询详情。</p>
          <p>4.【优惠券】奖励将以优惠券形式由系统自动派发到<span class="yellow hand" @click="coupon()">【我的优惠券】</span>中，您可以在游戏平台转账时选择并使用。如有疑问，请联系在线客服。</p>
        </span>
      </div>
    </div>
    <award :awards="awards" v-show="awards.flag"></award>
  </div>
</template>

<script>
import { transitionRun } from "@/libs/utils.js";
import Award from "@/components/Setting/Award.vue";

export default {
  data() {
    return {
      tempPlayTime: 0,
      playTimes: 0,
      lock: "",
      lockCount: 0,
      getAwardsFlag: "",
      awards: {
        txt: "",
        flag: false
      },
      wheel: {
        count: 0,
        endCount: "", // 决定在哪个区域停住
        copies: "",
        runFlag: false,
        noIntegral: false,
        awards: []
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  components: { Award },
  methods: {
    coin() {
      this.$router.push("coin");
    },
    coupon() {
      this.$router.push("coupon");
    },
    fetchData() {
      this.api.getLotteries().then((res) => {
        if (res.data && res.data.items.length > 0) {
          this.wheel.awards = res.data.items;
          this.wheel.copies = 1 / res.data.items.length;

          this.playTimes = res.data.play_times || 0;
          if (res.data.play_times) {
            this.wheel.noIntegral = true;
          } else {
            this.wheel.noIntegral = false;
          }
        }
      });
    },
    getAwards() {
      this.getAwardsFlag = false;
      this.api.postLotteries().then((res) => {
        if (res.data) {
          if (this.wheel.awards && this.wheel.awards.length > 0) {
            let len = this.wheel.awards.length;
            for (let a = 0; a < len; a++) {
              if (this.wheel.awards[a].id === res.data.id) {
                this.wheel.endCount = a / this.wheel.awards.length;
                break;
              }
            }
            this.awards.txt = res.data.name;
            this.tempPlayTime = res.data.play_times;
            this.wheel.count = this.wheel.count + 2; // 此transform转的值一定要放在控制的后面，不然触发不了。
            this.getAwardsFlag = true;
          }
        }
      });
    },
    handleLottery() {
      this.lockCount ++; // 一把锁
      if (this.lockCount === 1) {
        this.lock = true; // 点进来便会被锁住
      }
      let transitionRunEve = transitionRun();
      let obElement = document.getElementsByClassName("lottery_js")[0];
      if (transitionRunEve) {
        obElement.addEventListener(transitionRunEve, () => {
          if (this.getAwardsFlag) {
            this.lockCount = 0;
            this.lock = false;
            this.playTimes = this.tempPlayTime;
            this.awards.flag = true;
          }
        });
      }
      if ((this.lockCount > 1) && this.lock) {
        return;
      }
      if (!this.wheel.awards) {
        this.$message({
          message: "无奖品，不能转",
          type: "info"
        });
        return;
      }
      if (!this.wheel.noIntegral) {
        this.$message({
          message: "您的积分不足，不能参与抽奖",
          type: "info"
        });
        return;
      }
      if (this.wheel.awards) {
        if (this.playTimes === 0) {
          this.$message({
            message: "您已无抽奖机会",
            type: "info"
          });
          return;
        } else {
          this.playTimes --;
          this.wheel.runFlag = true;
          this.getAwards();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.red {
  color: $color-red;
}
.yellow {
  color: $color-yellow13;
}
.lottery {
  background-color: $color-blue8;
  margin-left: 20px;
  .lottery-wheel {
    width: 100%;
    padding: 20px;
    padding-bottom: 50px;
    .wheel {
      background: rgba(69, 166, 255, 0.1);
      background-size: 100% 100%;
      padding: 10px 20px;
    }
    .runner {
      width: 98%;
      height: 450px;
      margin: 0 auto;
      background: url("../../assets/images/lottry-bg.png") no-repeat;
      background-size: 100% 100%;
      .info {
        text-align: center;
        color: $color-white;
        font-size: $font-h1;
        margin: 10px auto;
        margin-top: 20px;
        .red, .yellow {
          font-size: $font-h1;
        }
      }
    }
  }
}
.rule {
  text-align: left;
  padding-top: 20px;
  .h1 {
    color: $color-white;
    font-size: $font-h4;
    font-weight: bold;
    vertical-align: top;
  }
  .text {
    padding-left: 10px;
    vertical-align: middle;
    max-width: 90%;
    .red {
      color: $color-red9;
    }
  }
  p {
    color: $color-white;
    @include line-height(20px);
  }
}
.gb-wheel {
  margin: 0 auto;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 27px solid $color-white;
}
.gb-wheel-container {
  position: relative;
  top: 0px;
  left: 0px;
}
.gb-wheel-container ul,
.gb-wheel-container li,
.gb-wheel-container p {
  margin: 0;
  padding: 0
}
.gb-wheel-container ul,
.gb-wheel-container li {
  list-style: none
}
.gb-wheel-container {
  margin: 0 auto;
  position: relative;
  width: 325px;
  height: 325px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid $color-red4;
}
.gb-wheel-content {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 2;
  width: 315px;
  height: 315px;
  border-radius: inherit;
  border: 6px solid $color-yellow6;
  background-color: $color-yellow7;
}
.gb-wheel-content:before {
  content: ' ';
  position: absolute;
  left: -$px;
  top: -$px;
  z-index: -1;
  width: 305px;
  height: 305px;
  border-radius: inherit;
  border: $px solid $color-red4;
}
.gb-wheel-list {
  position: absolute;
  left: 0;
  top: 0;
  width: inherit;
  height: inherit;
  z-index: 30
}
.gb-wheel-line {
  position: absolute;
  left: 8px;
  top: 0;
  width: inherit;
  height: inherit;
  z-index: 28
}
.gb-wheel-litem {
  position: absolute;
  left: 144px;
  top: 0px;
  width: 1px;
  height: 134px;
  background-color: $color-yellow8;
  overflow: hidden;
  -webkit-transform-origin: 50% 165px;
  transform-origin: 50% 153px;
}
.btn {
  width: 100px;
  height: 96px;
  border-radius: 50%;
  background-color: $color-red5;
  z-index: 29;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -48px;
}
.gb-wheel-btn {
  position: absolute;
  left: 50%;
  top: 42%;
  z-index: 29;
  width: 90px;
  height: 100px;
  margin-left: -45px;
  margin-top: -50px;
  background: url("../../assets/images/lotspin.png");
  background-size: 100% 100%;
}
.gb-wheel-run {
  transition: transform 6s ease-in-out
}
// list
.gb-wheel-item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: $color-yellow9;
  p {
    font-size: $font-h3;
  }
  font-weight: bold;
}
.gb-wheel-icontent {
  position: relative;
  display: block;
  padding-top: 11px;
  margin: 0 auto;
  text-align: center;
  transform-origin: 49% 149px;
}
.gb-wheel-itext {
  font-weight: lighter;
  transform: scale(0.8);
}
.gb-wheel-iicon {
  i {
    margin-top: 5px;
    width: 30px;
    height: 30px;
    display: inline-block;
    img {
      border-radius: 5px;
    }
  }
}
</style>
