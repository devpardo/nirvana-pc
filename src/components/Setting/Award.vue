<template lang="html">
  <div>
    <div class="privileges">
    <p class="title"></p>
      <div class="fill-in">
        <div v-if="awards && awards.txt">
          <span class="img"><img src="~assets/images/congra-image.png" width="100%" height="100%"/></span>
          <div class="content">
            <p>恭喜您获得{{ awards.txt }}</p>
          </div>
        </div>
        <div v-else class="no-data">无数据</div>
        <p class="ok hand" @click="closed()">OK</p>
      </div>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>

<script>
  export default {
    props: ["awards"],
    methods: {
      closed() {
        this.awards.flag = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .privileges {
    position: fixed;
    top: 40%;
    left: 45%;
    z-index: 3000;
    background-color: $color-blue8;
    border-radius: 5px;
    min-width: 400px;
    .title {
      height: 36px;
      background-color: $color-blue9;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .content {
      p {
        font-size: $font-h4;
        color: $color-white;
      }
    }
  }
  .fill-in {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 20px 10px;
    .img {
      position: absolute;
      top: -194px;
      z-index: 1;
      left: 40px;
      max-width: 400px;
      max-height: 300px;
    }
    .ok {
      background-color: $color-yellow13;
      color: $color-blue8;
      padding: 8px;
      width: 60%;
      margin: 0px auto;
      margin-top: 20px;
      border-radius: 10px;
    }
  }
  .mask-layer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $color-black;
    opacity: 0.5;
    z-index: 2001;
  }
</style>
