<template lang="html">
  <div>
    <div class="lottery-block dl">
      <div class="img">
        <img :src="auth.aws_url" width="112px" height="112px"/>
      </div>
      <p class="hr"></p>
      <div class="current-coin">
        <p class="h5">当前亚太币<span class="fa fr hand" @click="fetchData('fresh')">{{ refresh }}</span></p>
        <p class="number" v-if="points < 999999">{{ points || '0' }}</p>
        <p class="number" v-else>999999<span class="super">+</span></p>
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
    <lottery-wheel class="width dl"></lottery-wheel>
  </div>
</template>

<script>
import LotteryWheel from "@/components/Task/Lottery.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      question: this.$fontawesome("question-circle"),
      refresh: this.$fontawesome("refresh"),
      shopping: this.$fontawesome("shopping-cart"),
      userAvatar: this.$store.state.user.aws_url,
      points: 0
    };
  },
  components: { LotteryWheel },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData(flag) {
      this.api.getPoints().then((res) => {
        this.points = res.data && res.data.points;
        if (flag === "fresh") {
          this.$message({
            message: "已刷新到最新亚太币数据，请不要频繁刷新",
            type: "warning"
          });
        }
      });
    }
  },
  computed: {
    ...mapGetters(["auth"])
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.width {
  width: 78%;
  vertical-align: top;
}
.lottery-block {
  width: 250px;
  min-height: 680px;
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
</style>
