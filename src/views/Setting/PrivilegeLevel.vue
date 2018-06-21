<template lang="html">
  <div>
    <p class="h1">会员等级说明<span class="fr hand" @click="go()"><span class="fa">{{ back }}</span><span>返回</span></span></p>
    <div class="privilege-level">
      <p class="title layout"><span>会员等级</span><span>晋级条件</span><span>会员特权</span></p>
      <div>
        <p class="layout">
          <span class="red">Lv.1</span><span>月总流水≥500000</span>
          <span class="dl">
            <ul>
              <li>白银转盘</li>
              <li>更高返水</li>
              <li>VIP礼券</li>
              <li>优先提款</li>
              <li>生日礼金</li>
            </ul>
          </span>
        </p>
        <p class="layout">
          <span class="red">Lv.2</span><span>月总流水≥2000000</span>
          <span class="dl">
            <ul>
              <li>黄金转盘</li>
              <li>更高返水</li>
              <li>VIP礼券</li>
              <li>优先提款</li>
              <li>生日礼金</li>
              <li>节日礼物</li>
              <li>专属客服</li>
            </ul>
          </span>
        </p>
        <p class="layout">
          <span class="red">Lv.3</span><span>月总流水≥5000000</span>
          <span class="dl">
            <ul>
              <li>黄金转盘</li>
              <li>更高返水</li>
              <li>VIP礼券</li>
              <li>优先提款</li>
              <li>生日礼金</li>
              <li>节日礼物</li>
              <li>专属客服</li>
              <li>免费手机流量</li>
            </ul>
          </span>
        </p>
        <p class="layout">
          <span class="red">Lv.4</span><span>月总流水≥10000000</span>
          <span class="dl">
            <ul>
              <li>钻石转盘</li>
              <li>更高返水</li>
              <li>VIP礼券</li>
              <li>闪电提款</li>
              <li>生日礼金</li>
              <li>节日礼物</li>
              <li>专属客服</li>
              <li>免费手机流量</li>
            </ul>
          </span>
        </p>
        <p class="layout">
          <span class="red">Lv.5</span><span>月总流水≥50000000</span>
          <span class="dl">
            <ul>
              <li>钻石转盘</li>
              <li>更高返水</li>
              <li>VIP礼券</li>
              <li>闪电提款</li>
              <li>生日礼金</li>
              <li>节日礼物</li>
              <li>专属客服</li>
              <li>免费手机流量</li>
              <li>欧洲双人游</li>
            </ul>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      back: this.$fontawesome("mail-reply")
    };
  },
  methods: {
    go() {
      this.$router.push({ name: "MemberVip" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

ul {
  text-align: center;
  li {
    padding: 5px 0px;
  }
}
.h1 {
  padding: 15px 0px;
  font-size: $font-h2;
  font-weight: bold;
  text-align: center;
}
.dl {
  display: inline-block;
}
.red {
  color: $color-red;
}
.privilege-level {
  background-color: $color-white;
  p {
    margin: 0px;
  }
  .title {
    padding: 10px 0px;
    color: $color-gray5;
  }
  .layout {
    span {
      display: inline-block;
      vertical-align: middle;
      width: 26%;
      text-align: center;
      word-wrap: break-word;
      padding: 5px;
      &:first-of-type {
        width: 20%;
        padding: 0px;
      }
      &:last-of-type {
        width: 42%;
        padding: 0px;
      }
    }
    border-bottom: $px solid $color-gray8;
  }
}
</style>
