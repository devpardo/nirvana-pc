<template lang="html">
  <div class="nav-menu" id="nav">
    <div class="nav-item" v-for="(item, n) in menuDatas">
      <p class="title hand" :class="{ 'title-bg': titleFlag[n] }" @click="changeShow(n)">
        <span class="img dl" v-if="menuFlags[n]"><img src="~assets/images/ag-active.png" width="100%" height="100%"/></span>
        <span class="img dl" v-else><img src="~assets/images/ag.png" width="100%" height="100%"/></span>
        MG大厅{{ item.title }}
      </p>
      <ul class="nav_js" v-show="menuFlags[n]">
        <li v-for="m in item.arr" ref='li' @click="changeItem($event)" :id="m">热门游戏{{ m }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["menuFlags", "menuDatas"],
  data() {
    return {
      titleFlag: Array.from(this.menuFlags)
    };
  },
  methods: {
    // menuFlags titleFlag 都是通过第一层数据的长度去执行
    changeShow(n) {
      this.$set(this.menuFlags, n, !this.menuFlags[n]);
      this.titleFlag.forEach((item, index) => {
        if (index === n) {
          this.$set(this.titleFlag, index, true);
        } else {
          this.$set(this.titleFlag, index, false);
        }
      });
    },
    // li上面的id必须唯一
    changeItem(ob) {
      this.$refs.li.forEach((item, index) => {
        if (this.$refs.li[index].id === ob.target.id) {
          this.$refs.li[index].className = "li";
        } else {
          this.$refs.li[index].className = "";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

#nav {
  .title-bg {
    background-color: $color-red1;
    color: $color-white;
    position: relative;
    &:after {
      content: '';
      width: 8px;
      height: 8px;
      font-size: $font-h1;
      border-bottom: $px solid $color-white;
      border-right: $px solid $color-white;
      transform: rotate(45deg);
      font-size: $font-h4;
      position: absolute;
      top: 16px;
      right: 10px;
    }
  }
  .li {
    background-color: $color-gray13;
    &:after {
      content: '';
      width: 5px;
      height: 5px;
      border-top: $px solid $color-gray5;
      border-right: $px solid $color-gray5;
      transform: rotate(45deg);
      font-size: $font-h4;
      position: absolute;
      top: 16px;
      right: 10px;
    }
  }
}
.nav-menu {
  width: 208px;
  .nav-item {
    background-color: $color-blue8;
    margin-bottom: 5px;
  }
  .title {
    border-left: 4px solid $color-red2;
    font-size: $font-h3;
    color: $color-gray12;
    width: 100%;
    padding: 0px 10px;
    @include line-height(46px);
    &:hover {
      position: relative;
      background-color: $color-red1;
      color: $color-white;
      position: relative;
      &:after {
        content: '';
        width: 8px;
        height: 8px;
        font-size: $font-h1;
        border-bottom: $px solid $color-white;
        border-right: $px solid $color-white;
        transform: rotate(45deg);
        font-size: $font-h4;
        position: absolute;
        top: 16px;
        right: 10px;
      }
    }
  }
  .img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    position: relative;
    top: 9px;
  }
  li {
    @include line-height(40px);
    color: $color-gray10;
    padding: 0px 10px;
    cursor: pointer;
    position: relative;
    &:hover {
      background-color: $color-gray13;
      &:after {
        content: '';
        width: 5px;
        height: 5px;
        border-top: $px solid $color-gray5;
        border-right: $px solid $color-gray5;
        transform: rotate(45deg);
        font-size: $font-h4;
        position: absolute;
        top: 16px;
        right: 10px;
      }
    }
  }
}
</style>
