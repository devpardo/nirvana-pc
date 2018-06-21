<template lang="html">
  <div id="vendors">
    <el-carousel :interval="3000">
      <el-carousel-item v-for="(banner, idx) in banners" :key="idx">
        <img :src="banner.image_url" width="100%" height="100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      banners: []
    };
  },
  created: function() {
    this.api.getBannersOfVendor().then((res) => {
      let { data } = res;
      this.banners = data.items;
    });
  }
};
</script>

<style lang="scss">
#vendors {
  .el-carousel__container {
    display: inline-block;
    width: 100%;
    height: 0px;
    padding-bottom: 16%;
  }
}
</style>
<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

</style>
