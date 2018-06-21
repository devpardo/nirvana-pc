<template lang="html">
  <div class="body">
    <div class="activity">
      <nav-menu :menuDatas="menuDatas" :menuFlags="menuFlags" :ob="ob"></nav-menu>
      <div class="activity-content">
        <activity-content :ob="ob"></activity-content>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from "@/components/Activity/NavMenu.vue";
import ActivityContent from "@/components/Activity/ActivityContent.vue";

export default {
  data() {
    return {
      ob: {
        category: this.$route.params.category || 0
      },
      menuDatas: [
        {title: "全部"},
        {title: "亚太电游"},
        {title: "亚太真人视讯"},
        {title: "全民捕鱼"},
        {title: "其他"}
      ],
      menuFlags: [true, false, false, false, false, false]
    };
  },
  components: {
    NavMenu,
    ActivityContent
  },
  mounted() {
    if (this.ob.category <= 4) {
      this.menuFlags[0] = false;
      this.$set(this.menuFlags, this.ob.category, true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.activity {
  width: $min-width;
  padding: 20px 0 0 20px;
  margin: 0 auto;
  padding-bottom: 20px;
}
</style>
