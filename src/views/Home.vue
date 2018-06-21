<template>
  <div class="home" id="home">
    <notice-download v-model="modal.download" style="z-index: 1000"></notice-download>
    <!--轮播图相关-->
    <carousel class="carousel"></carousel>
    <!--中部内容板块-->
    <div class="content-container">
      <div class="content">
        <!--亿万总奖池与充值方式-->
        <div class="static-module">
          <vendor-carousel class="vendor-img dl"></vendor-carousel>
          <vendor class="vendor dl"></vendor>
          <payway class="pay dl"></payway>
        </div>
        <!--活动-->
        <!--<div class="activities">-->
        <!--<activity></activity>-->
        <!--</div>-->
        <!--游戏-->
        <!--<p class="hr"/>-->
        <div class="games">
          <pool-bonus class="bonus dl"></pool-bonus>
          <announcement class="dl"></announcement>
          <game class="dl"></game>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Carousel from "@/components/Home/Carousel.vue";
  import VendorCarousel from "@/components/Home/VendorCarousel.vue";
  import PoolBonus from "@/components/Home/PoolBonus.vue";
  import Payway from "@/components/Home/Payway.vue";
  import Activity from "@/components/Home/Activity.vue";
  import Vendor from "@/components/Home/Vendor.vue";
  import Announcement from "@/components/Home/Announcement.vue";
  import Game from "@/components/Home/Game.vue";
  import NoticeDownload from "@/components/Shared/NoticeDownload.vue";

  export default {
    name: "home",
    components: {
      Carousel,
      VendorCarousel,
      PoolBonus,
      Payway,
      Activity,
      Vendor,
      Announcement,
      Game,
      NoticeDownload
    },
    data() {
      return {
        modal: {
          download: false,
          promotion: false
        },
        promos: []
      };
    },
    async mounted() {
      this.$root.$on("notice-download", val => {
        this.modal.download = val;
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import "../assets/stylesheets/public";

  .home {
    min-width: $min-width;
    margin-top: 95px;
    background-color: $color-blue8;
    /*padding-bottom: 80px;*/
    .carousel {
      position: relative;
      display: inline-block;
      width: 100%;
      height: auto;
    }
    .content-container {
      background-color: $color-blue9;
      width: 100%;
      margin-top: -4px;
    }
    .content {
      width: $min-width;
      margin: 0px auto;
      padding: 20px 0 20px 20px;
      .hr {
        margin-top: 20px;
        width: 100%;
        height: $px;
        background-color: $color-blue8;
      }
    }
    .static-module {
      margin-bottom: 20px;
      .vendor-img {
        width: 250px;
        vertical-align: top;
      }
      .vendor {
        width: 584px;
        margin-right: 20px;
        margin-left: -5px;
        vertical-align: top;
      }
      .pay {
        width: 406px;
        margin-left: -4px;
      }
    }
    .activities {
      width: $min-width;
      margin: 40px auto;
    }
    .games {
      width: $min-width;
      margin-bottom: 20px;
      .bonus {
        vertical-align: top;
        width: 407px;
      }
    }
  }
</style>
