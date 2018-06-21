<template lang="html">
  <div class="nav-menu" id="nav">
    <p class="title"><span>活动中心</span></p>
    <p class="menu">
      <span v-for="(item, n) in menuDatas" @click="changeShow(n)"><i></i><span class="span hand" :class="{ 'active': menuFlags[n] }">{{ item.title }}</span></span>
      <i></i>
    </p>
  </div>
</template>

<script>
export default {
  props: ["menuFlags", "menuDatas", "ob"],
  methods: {
    // menuFlags titleFlag 都是通过第一层数据的长度去执行
    changeShow(n) {
      this.menuFlags.forEach((item, index) => {
        if (index === n) {
          this.$set(this.menuFlags, index, true);
        } else {
          this.$set(this.menuFlags, index, false);
        }
      });
      this.ob.category = n;
      this.$router.push({ name: "Activity", params: { category: n } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.nav-menu {
  .title {
    span {
      color: $color-white;
      font-size: $font-h;
      &:first-of-type {
        font-weight: bold;
        padding-right: 10px;
      }
    }
  }
  .menu {
    padding: 10px 0px;
    border-bottom: 2px solid $color-yellow13;
    margin: 10px 0px;
    .span {
      color: $color-white;
      font-size: $font-h4;
      font-weight: bold;
      padding: 0px 40px;
    }
    .active {
      color: $color-yellow13;
    }
    i {
      font-style: normal;
      display: inline-block;
      width: $px;
      height: 10px;
      background-color: $color-blue8;
    }
  }
}
</style>
