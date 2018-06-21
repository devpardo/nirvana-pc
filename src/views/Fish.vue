<template>
  <div class="fishing">
    <div class="holder">
      <div class="container">
        <div class="fishing-enter">
          <a href="javascript:void(0)" @click="open(gid)">
            <img src="/static/fishing-button.png" alt="" class="btn-fishing">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: "Fish",
  data () {
    return {
      gid: "G2017091899861110311"
    }
  },
  methods: {
    open(gid) {
      // if (this.Detail.maintain_at || !this.Detail.enabled) { return; }
      // this.load.flag = true;
      this.api.postLaunch(gid).then((res) => {
        if (res.data && res.data.game_url) {
          window.open(res.data.game_url);
        } else {
          this.$message({
            message: "获取链接失败",
            type: "warning"
          });
        }
        // this.load.flag = false;
      }).catch(() => {
        // this.load.flag = false;
        this.$message({
          message: "获取链接失败",
          type: "warning"
        });
      });
    }
  }
}
</script>

<style  lang="scss" scoped>
@import '../assets/stylesheets/public';
  .fishing{
    background-image: url('../assets/images/fishing-bg.jpg');
    background-position: center;
    background-size: cover;
    height: 701px;
    margin-top: 95px;
    position: relative;
    .holder {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      .container {
        margin-left: auto;
        margin-right: auto;
        padding-left: 15px;
        padding-right: 15px;
      }
      .btn-fishing {
        width: 240px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
      }
    }
  }
  @media (max-width: 1024px) {
    .fishing{
      width: 1280px;
    }
  }


</style>
