<template lang="html">
  <div id="home">
    <el-carousel :interval="8000">
      <el-carousel-item v-for="(suggest, idx) in suggests" :key="idx">
        <div class="block hand" @click="go(extractHostname(suggest.link))">
          <!--<img :src="suggest.image_url" width="100%" height="100%">-->
          <!-- <pre>{{ extractHostname(suggest.link) }}</pre> -->
          <div class="image" :style="{ backgroundImage: 'url(' + suggest.image_url + ')' }"></div>
          <div class="info">
            <div class="info-bg">
              <p>{{ suggest.title }}</p>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <home-announcement></home-announcement>
  </div>
</template>

<script>
import HomeAnnouncement from "@/components/Home/HomeAnnouncement.vue";

export default {
  components: {
    HomeAnnouncement
  },
  data: function() {
    return {
      suggests: []
    };
  },
  created: function() {
    this.api.getSuggests().then((res) => {
      this.suggests = res.data;
    });
  },
  methods: {
    go(url) {
      window.location.href = url;
    },
    extractHostname(url) {
      var hostname;
      var loc;
      var newloc;

        // console.log('REGEX ',url.replace(/(^\w+:|^)\/\//, ''));
        // find & remove protocol (http, ftp, etc.) and get hostname
      hostname = url.split("/")[2];
      if (url.indexOf("://") > -1) {
        hostname = url.split("/")[2];
      } else {
        hostname = url.split("/")[0];
      }
        // find & remove port number
      hostname = hostname.split(":")[0];
        // find & remove "?"
      hostname = hostname.split("?")[0];

        // console.log('Hostname: ',url);
        // console.log('Location: ',window.location.href);

      loc = url.replace(/(^\w+:|^)\/\//, "");
      newloc = loc.replace(hostname + "/", window.location.href);

      console.log("Host: ", hostname);
      console.log("New ", newloc);
      return newloc;
    }

  }
};
</script>

<style lang="scss">
#home {
  .el-carousel__indicators {
    width: 1280px;
    bottom: 5px;
    text-align: right;
  }
  .el-carousel__container {
    display: inline-block;
    width: 100%;
    height:320px;
  }
  .el-carousel__arrow {
    z-index: 30; // the highest level in home
  }
}
</style>
<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.el-carousel {
  display: inline-block;
  width: 100%;
  height: 320px;
  overflow: hidden;
  .block {
    position: relative;
    width: 100%;
    height: 320px;
    .info {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 0px 10px;
      width: 100%;
      @include line-height(40px);
      color: $color-white;
      p { font-size: $font-h4; @extend .overflow; }
      bottom: 0px;
      right: 0px;
      left: 0px;
    }
    .info-bg {
      width: $min-width;
      margin: 0 auto;
      text-align: left;
      padding-left: 20px;
    }
    .image {
      width: 100%;
      height: 100%;
      background-position: center center;
    }
  }
}
.el-carousel__item {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
