<template lang="html">
  <div class="body">
    <div class="task">
      <nav-menu :menuDatas="menuDatas"></nav-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavMenu from "@/components/Task/NavMenu.vue";

export default {
  data() {
    return {
      menuDatas: [{
        title: "我的任务",
        routeName: "Award"
      }, {
        title: "我的亚太币",
        routeName: "Coin"
      }, {
        title: "每日抽奖",
        routeName: "Lottery"
      }, {
        title: "我的返水",
        routeName: "Rebate"
      }, {
        title: "我的优惠卷",
        routeName: "Coupon"
      }],
      name: "Award"
    };
  },
  components: {
    NavMenu
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.task {
  padding: 20px 0px;
  width: $min-width;
  margin: 0 auto;
}
</style>
