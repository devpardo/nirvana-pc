<template lang="html">
  <div v-if="flag">
    <div class="audio">
      <p><span @click="close()" class="hand fr dl">+</span></p>
      <video width="384" height="216" controls="controls" :poster=img>
        <source src="../../assets/images/audio/audio-2018.mp4" type="video/mp4">
        您的浏览器不支持 video 标签。
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true,
      img: require("../../assets/images/audio/cover.png")
    };
  },
  components: {
  },
  mounted() {
//    if (sessionStorage.getItem('AudioFlag') === 'false') {
//      this.flag = false
//    } else {
//      this.flag = true
//    }
  },
  methods: {
    close() {
      this.flag = false;
//      sessionStorage.setItem('AudioFlag', 'false')
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.audio {
  position: fixed;
  z-index: 50;
  top: 200px;
  left: 40%;
  p {
    background-color: $color-gray;
    height: 36px;
    line-height: 32px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    span {
      font-size: $font;
      color: $color-white;
      transform: rotate(45deg);
    }
  }
}
</style>
