<template lang="html">
  <div class="profile">
    <profile-header></profile-header>
    <div class="profile-body">
      <div class="body-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHeader from "@/components/Setting/ProfileHeader.vue";
export default {
  data() {
    return {
    };
  },
  components: { ProfileHeader }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.profile {
  margin-top: 95px;
  width: 100%;
  padding-bottom: 20px;
  background-color: $color-blue8;
  .profile-body {
    width: 100%;
    margin: 0 auto;
    background-color: $color-blue8;
    .body-main {
      padding: 20px 0 0 20px;
      width: $min-width;
      margin: 0 auto;
    }
  }
}
</style>
