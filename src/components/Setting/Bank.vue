<template lang="html">
  <div v-if="banksObj.banks.length" class="banks">
    <div class="bank hand dl" :class="{ 'active': banksObj.currentBank === item.id }" v-for="(item, index) in banksObj.banks" @click="currentIndex(item.id)">
      <span class="img dl"><img :src="item.image_url" width="100%" height="100%"/></span>
      <span class="txt dl">{{ item.name }}</span>
    </div>
  </div>
  <div v-else class="error-all">
  </div>
</template>

<script>
export default {
  props: ["banksObj"],
  data() {
    return {
      angleDown: this.$fontawesome("angle-down")
    };
  },
  methods: {
    currentIndex(id) {
      this.banksObj.currentBank = id;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.error-all {
  display: block;
  margin: 10px auto;
}
.banks {
  margin-top: 10px;
  padding-right: 20px;
  .active {
    border: $px solid $color-blue2;
    position: relative;
    opacity: 1;
    &:after {
      content: '';
      position: absolute;
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-bottom: 10px solid $color-blue2;
      top: -2px;
      right: -7px;
      transform: rotate(45deg);
    }
    &:before {
      content: '';
      position: absolute;
      z-index: 1;
      top: 1px;
      right: 2px;
      width: 2px;
      height: 4px;
      display: inline-block;
      border-right: $px solid $color-white;
      border-bottom: $px solid $color-white;
      transform: rotate(45deg);
    }
  }
}
.bank {
  min-width: 190px;
  @include line-height(45px);
  border: $px solid $color-white;
  font-weight: bold;
  background-color: $color-white;
  text-align: center;
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 0px 20px;
  opacity: .5;
  text-align: left;
  .img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    position: relative;
    bottom: 4px;
    img {
      border-radius: 50%;
    }
  }
  .txt {
    color: $color-blue9;
    text-align: left;
    padding-left: 5px;
  }
}
</style>
