<template lang="html">
  <div class="coin">
    <div class="coin-block dl">
      <div class="img">
        <img :src="auth.aws_url" width="112px" height="112px"/>
      </div>
      <p class="hr"></p>
      <div class="current-coin">
        <p class="h5">当前亚太币<span class="fa fr hand" @click="fetchData('fresh')">{{ refresh }}</span></p>
        <p class="number" v-if="data && data.points < 999999">{{ data.points || '--' }}</p>
        <p class="number" v-else-if="data">999999<span class="super">+</span></p>
      </div>
      <div class="coins-record">
        <span class="dl"><p>已消耗</p><p class="number">{{ data.used_points || '--' }}</p></span>
        <span class="dl"><p>总获取</p><p class="number">{{ (data.used_points + data.points) || '--' }}</p></span>
      </div>
      <p class="hr"></p>
      <div class="coin-store">
        <span class="fa dl">{{ shopping }}</span>
        <span class="store dl">
          <p>亚太商城</p>
          <p>即将上线，敬请期待！</p>
        </span>
      </div>
      <p class="hr"></p>
    </div>
    <div class="coin-intro dl">
      <div class="txt dl">
        <div>
          <p class="request">什么是亚太币？</p>
          <p class="response">
            <span class="circle fa">{{ question }}</span>
            <span class="dl">亚太币是亚太娱乐独有的一种虚拟货币，所有注册的亚太娱乐会员将可通过任务或活动等多种方式及途径获得。</span>
          </p>
          <p class="response">
            <span class="circle fa">{{ question }}</span>
            <span class="dl">亚太币可用于参与<span class="yellow hand" @click="Lottery()">【亚太大转盘】</span>抽奖活动，并可在即将推出上线的【亚太商城】中兑换各种丰富奖品。</span>
          </p>
          <p class="response">
            <span class="circle fa">{{ question }}</span>
            <span class="dl"><span class="in-block">新用户可通过完成【邮箱认证】、【手机认证】、【每日签到】等任务获得相应的亚太币奖励。</span><span class="in-block">另外每次进行充值，系统将按照1%的比例赠送亚太币。</span></span>
          </p>
        </div>
      </div>
      <div class="coin-table" id="coin-table">
        <p class="h1">亚太币记录</p>
        <coin-table :points="data && data.items"></coin-table>
        <loading :loading="loading" v-if="loading"></loading>
        <div v-else-if="data.items && !data.items.length" class="error-all"></div>
        <s-pagination :q="q" :paginateMeta="paginateMeta"></s-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import CoinTable from "@/components/Task/Table.vue";
import Loading from "@/components/Shared/Loading.vue";
import SPagination from "@/components/Shared/SPagination";
// mixin
import query from "@/components/Shared/mixins/query";
import indexBase from "@/components/Shared/mixins/indexBase";
import { mapGetters } from "vuex";

export default {
  mixins: [query, indexBase],
  data() {
    return {
      question: this.$fontawesome("question-circle"),
      refresh: this.$fontawesome("refresh"),
      shopping: this.$fontawesome("shopping-cart"),
      // userAvatar: this.$store.state.user.aws_url
      loading: true,
      points: {}
    };
  },
  components: { CoinTable, Loading, SPagination },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData(flag) {
      this._fetchData(this.api.getPoints(this.q));
      if (flag === "fresh") {
        this.$message({
          message: "已刷新到最新亚太币数据，请不要频繁刷新",
          type: "warning"
        });
      }
    },
    Lottery() {
      this.$router.push("Lottery");
    }
  },
  computed: {
    ...mapGetters(["auth"])
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.error-all {
  display: block;
  margin: 10px auto;
}
.coin-block {
  width: 250px;
  min-height: 757px;
  background-color: $color-blue8;
  padding: 10px;
  .hr {
    width: 210px;
    height: 1.7px;
    background-color: $color-blue9;
    margin: 0 auto;
    box-shadow: inset 0px 1px rgba(0, 0, 0, 0.6);
  }
  .img {
    margin: 10px auto;
    text-align: center;
    padding-bottom: 10px;
    img {
      border: 5px solid $color-white;
      border-radius: 50%;
    }
  }
  .coin-store {
    color: rgba($color-white, .5);
    padding: 15px 10px;
    .fa {
      font-size: $font-large;
      vertical-align: middle;
    }
    .store {
      padding-left: 10px;
      vertical-align: middle;
      p {
        &:first-of-type {
          font-size: $font-h4;
          font-weight: bold;
        }
      }
    }
  }
  .current-coin {
    padding: 15px 10px;
    .number {
      font-size: $font-large1;
      color: $color-yellow13;
    }
    .h5 {
      color: $color-white;
      margin-top: 10px;
      .fa {
        color: $color-yellow13;
        padding: 5px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
    .super {
      vertical-align: super;
      font-size: $font-h;
    }
  }
}
.coins-record {
  padding: 15px 10px;
  padding-top: 0px;
  color: $color-white;
  .dl {
    width: 45%;
    vertical-align: top;
  }
  span {
    p {
      &:last-of-type {
        font-size: $font-h;
        font-weight: bold;
        @extend .break-word;
      }
    }
    .number {
        color: $color-yellow13;
      }
  }

}
.coin-intro {
  margin-left: 15px;
  vertical-align: top;
  width: 990px;
  .txt {
    padding: 20px 10px;
    padding-left: 30px;
    background-color: $color-blue8;
    width: 100%;
    vertical-align: top;
    p {
      margin-bottom: 15px;
    }
    .fa {
      padding-right: 5px;
    }
    .request {
      color: $color-yellow13;
      font-size: $font-h;
      font-weight: bold;
    }
    .response {
      color: $color-white;
      .circle {
        color: $color-yellow13;
        font-size: $font-h4;
      }
      .dl {
        vertical-align: top;
      }
      .red {
        color: $color-red9;
      }
      .yellow {
        color: $color-yellow13;
      }
      .in-block {
        display: block;
      }
    }
  }
}
.coin-table {
  margin-top: 20px;
  background-color: $color-blue8;
  padding: 30px;
  .h1 {
    color: $color-yellow13;
    font-size: $font-h;
    font-weight: bold;
  }
}
</style>
