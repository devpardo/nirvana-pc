<template lang="html">
  <div>
    <p class="title">已绑定银行卡</p>
    <div class="banks" v-if="banks && banks.items && banks.items.length">
      <span class="bank hand dl" :class="{ 'active': index === currentIndex }" v-for="(item, index) in banks.items" @click="toggle(item, index)">
        <p class="name"><span class="icon dl"><img :src="item.bank.image_url" width="100%" height="100%"/></span>{{ item.bank.name || '无' }}</p>
        <p class="number"><span>**** **** **** {{ item.no.slice(-4) }}</span><span>储蓄卡</span></p>
      </span>
      <span class="add_bank hand dl" @click="addBank()">
        <p class="fa">{{ plus_circle }}</p>
        <p>新增银行卡</p>
      </span>
    </div>
    <div v-else class="banks">
      <span class="add_bank hand dl" @click="addBank()">
        <p class="fa">{{ plus_circle }}</p>
        <p>新增银行卡</p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["banks", "currentBank", "addBank"],
  data() {
    return {
      angleDown: this.$fontawesome("angle-down"),
      plus_circle: this.$fontawesome("plus-circle"),
      flag: false,
      currentIndex: 0
    };
  },
  methods: {
    toggle(item, n) {
      this.$emit("update:currentBank", item);
      this.currentIndex = n;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.title {
  color: $color-yellow13;
  font-size: $font-h4;
  font-weight: bold;
}
.add_bank {
  vertical-align: top;
  width: 250px;
  height: 75px;
  border: $px dotted $color-white;
  text-align: center;
  color: $color-white;
  padding-top: 13px;
  .fa {
    font-size: $font-h;
    padding-bottom: 5px;
  }
}
.banks {
  margin-top: 10px;
  border-bottom: $px solid $color-blue8;
  padding-bottom: 20px;
  margin-bottom: 20px;
  .bank {
    vertical-align: top;
    padding: 10px 20px;
    padding-right: 50px;
    border: $px solid $color-gray7;
    margin-bottom: 10px;
    margin-right: 10px;
    background-color: $color-gray9;
    .name {
      font-weight: bold;
      color: $color-gray;
    }
    .number {
      padding-top: 10px;
      span {
        color: $color-gray3;
        &:first-of-type {
          padding-right: 10px;
        }
      }
    }
  }
  .icon {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 10px;
  }
  .active {
    border: $px solid $color-blue2;
    color: $color-gray;
    position: relative;
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
</style>
