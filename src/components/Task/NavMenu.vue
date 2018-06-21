<template lang="html">
  <div class="nav-menu" id="nav">
    <p class="title"><span>福利中心</span></p>
    <p class="menu">
      <span v-for="(item, n) in menuDatas" @click="changeRouter(item)">
        <i></i>
        <a class="span hand" :class="{ 'active': item.routeName == $route.name }">
          <span class="relative">
            {{ item.title }} <span class="badge" v-if="(item.routeName == 'Award' && count && count.unreceived_quests_count) || (item.routeName == 'Rebate' && count && count.unreceived_rebates_count)"></span>
          </span>
        </a>
      </span>
      <i></i>
    </p>
  </div>
</template>

<script>
export default {
  props: ["menuDatas"],
  data() {
    return {
      count: null
    };
  },
  methods: {
    changeRouter(item) {
      this.$router.push({name: item.routeName});
    }
  },
  async mounted() {
    const {data} = await this.api.getNotificationsCount();
    this.count = data;
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.relative {
  position: relative;
}

.badge {
  display: block;
  height: 10px;
  width: 10px;
  background: red;
  position: absolute;
  border-radius: 50%;
  top: 0;
  right: -8px;
}

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
