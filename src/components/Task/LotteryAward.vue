<template lang="html">
  <div class="lottery-award">
    <p class="h1">抽奖记录</p>
    <div class="block-container">
      <div class="block dl" v-for="i in 10">
        <span class="img dl"><img src="../../assets/images/demo/exotic-fruit-demo.png" width="100%" height="100%"/></span>
        <span class="info dl">
          <p class="title">免费抽奖1次</p>
          <p class="content">亚太币目前可以参加亚太大轮盘抽奖活动，100%中中奖率！</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.lottery-award {
  padding: 30px 20px;
  .h1 {
    color: $color-gray10;
    font-size: $font-h1;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: $px solid $color-gray6;
    position: relative;
    &:before {
      position: absolute;
      content: '';
      bottom: -2px;
      height: 3px;
      width: 120px;
      background-color: $color-red1;
    }
  }
}
.block-container {
  padding: 20px 0px;
  .block {
    width: 320px;
    background-color: $color-white;
    padding: 20px;
    margin-right: 15px;
    margin-bottom: 15px;
    .img {
      width: 119px;
      height: 80px;
      vertical-align: top;
    }
    .info {
      padding-left: 10px;
      vertical-align: top;
      width: 56%;
      .title {
        color: $color-yellow2;
        font-size: $font-h4;
        padding-bottom: 10px;
      }
      .content {
        color: $color-gray5;
        text-align: justify;
      }
    }
  }
}
</style>
