<template lang="html">
  <div class="foot">
    <div class="foot-1">
      <div class="content">
        <span class="intro hand"><span class="fa">{{ chevron }}</span><span @click="goInfo(0)">关于我们</span></span>
        <span class="intro hand"><span class="fa">{{ chevron }}</span><span @click="goInfo(2)">常见问题</span></span>
        <span class="intro hand"><span class="fa">{{ chevron }}</span><span @click="goInfo(8)">政策及条款</span></span>
        <span class="intro hand"><span class="fa">{{ chevron }}</span><span @click="goInfo(2)">网站地址</span></span>
        <span class="fr">Copyright ©2018 yt8.com</span>
      </div>
    </div>
    <div class="foot-2">
      <div class="content">
        <span>合作平台:
          <span class="img dl"><img src="../../assets/images/pt-ico-w.png" width="100%" height="100%"/></span>
          <span class="img1 dl"><img src="../../assets/images/mg-ico-w.png" width="100%" height="100%"/></span>
          <span class="img2 dl"><img src="../../assets/images/ag-ico-w.png" width="100%" height="100%"/></span>
          <span class="img3 dl"><img src="../../assets/images/gg-ico-w.png" width="100%" height="100%"/></span>
          <span class="img4 dl"><img src="../../assets/images/dt-ico-w.png" width="100%" height="100%"/></span>
          <span class="img5 dl"><img src="../../assets/images/png-ico-w.png" width="100%" height="100%"/></span>
          <span class="img6 dl"><img src="../../assets/images/dg-ico-w.png" width="100%" height="100%"/></span>
          <span class="img7 dl"><img src="../../assets/images/avkm-ico-w.png" width="100%" height="100%"/></span>
          <span class="img9 dl"><img src="../../assets/images/footer/18.png" width="100%" height="100%"/></span>
        </span>
        <span class="fr">PT游戏是由PT TransPacific PAGCOR在的授权下部署</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chevron: this.$fontawesome("chevron-circle-right")
    };
  },
  methods: {
    goInfo(n) {
      this.$router.push({ name: "FooterInfo", params: { list: n } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.foot {
  /*position: fixed;*/
  /*z-index: 36;*/
  /*bottom: 0px;*/
  /*right: 0px;*/
  /*left: 0px;*/
  color: $color-white;
  width: 100%;
  .foot-1 {
    @include line-height(50px);
    background-color: $color-blue7;
    .content {
      width: $min-width;
      margin: 0 auto;
      .intro {
        margin-right: 15px;
        .fa { font-size: $font-h4; padding-right: 5px; }
      }
    }
  }
  .foot-2 {
    @include line-height(54px);
    background-color: $color-blue9;
    .content {
      width: $min-width;
      margin: 0 auto;
      img { vertical-align: middle; }
      .dl {
        margin-left: 0;
      }
      .fr {
        img {
          margin-bottom: 3px;
        }
      }
      .img, .img1, .img2, .img3, .img4, .img5, .img6, .img7, .img8 {
        width: 100px;
      }
      .img9 {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>

