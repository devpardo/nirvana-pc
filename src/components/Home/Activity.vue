<template lang="html">
  <div class="activity">
    <div class="block hand dl" v-for="i in 4">
      <p class="title">勇夺签到王</p>
      <p class="content">最高3888元签到奖金</p>
      <p class="button">查看详情</p>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.activity {
  width: $min-width;
}
.block {
  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%);
  color: $color-white;
  width: 300px;
  height: 130px;
  padding: 20px 10px;
  margin-right: 17px;
  &:hover {
    border-left: 3px solid $color-red;
  }
  .title { font-size: $font-h }
  .content { font-size: $font-h4; padding-bottom: 10px; }
  .button {
    width: 80px;
    line-height: 20px;
    height: 21px;
    border-radius: 10px;
    border: $px solid $color-white;
    text-align: center;
  }
}
</style>
