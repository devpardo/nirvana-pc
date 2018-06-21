<template>
  <div class="mask-layer" v-if="value">
    <div id="download" class="download-bg">
      <div class="download-header gradient">
        <div class="title">
          <i class="fa fa-download"></i> 下载中心</div>
        <span class="download-close hand" @click="close">+</span>
      </div>
      <div class="download-content">
        <div class="download-icon">
          <a href="https://s3.ap-northeast-2.amazonaws.com/yt8/%E4%BA%9A%E5%A4%AA+Setup+1.0.0.exe">
            <div class="content">
              <img src="~assets/images/computer.png">
              <p>电脑客户端</p>
            </div>
          </a>
        </div>
        <div class="download-icon">
          <div class="content">
            <img src="~assets/images/android-qr.png" height="100px" width="100px">
            <p><i class="fa fa-android"></i> 安卓手机客户端</p>
          </div>
        </div>
        <div class="download-icon">
          <div class="content">
            <img src="~assets/images/ios0404.png" height="100px" width="100px">
            <p><i class="fa fa-apple"></i> 苹果手机客户端</p>
          </div>
        </div>
        <div class="download-icon"></div>
        <div class="download-icon">
          <div class="content">
            <a href="http://www.baidu.com/link?url=_RRHzKbojzklnWkZ248ML9ou2qtFlK26zPf4orqBZGntA1KdER0RpEcYR3REzntLnImTGly-EfdgEZsoE6eqgEt2zbkErFScxARbj6rxWN7&wd=&eqid=bc30038b00023e3e0000000658730674
">
              <img src="~assets/images/IE.png">
              <p>IE10浏览器</p>
            </a>

          </div>
        </div>
        <div class="download-icon">
          <div class="content">
            <a href="https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7BA7FBB644-34BE-1D9B-36CF-31D43FFC12FA%7D%26lang%3Den%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26brand%3DCHBD%26installdataindex%3Ddefaultbrowser/update2/installers/ChromeSetup.exe
">
              <img src="~assets/images/google.png">
              <p>谷歌浏览器</p>
            </a>
          </div>
        </div>
        <div class="download-icon">
          <div class="content">
            <a href="http://www.baidu.com/link?url=L937ngzMpiyN2gOl_iy9jpFoU8oTtbYT3Fgp0CRJNzy1NjCuhDHoWfTnp1mxjPZJb_w6tQfoT3xxnWve6pjBixeC0f2zCYyiPYDnfP69T6q&wd=&eqid=af0cb05d000182700000000659a6a4c9">
              <img src="~assets/images/firefox.png">
              <p>火狐浏览器</p>
            </a>
          </div>
        </div>
        <div class="download-icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NoticeDownload",
    props: {
      value: {
        type: Boolean
      }
    },
    methods: {
      close() {
        this.$emit("input", false);
      }
    }
  };
</script>

<style scoped>
  .mask-layer {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2000;
  }

  .download-bg {
    margin: 0 auto;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #122250;
    height: 475px;
    width: 820px;
    border-radius: 5px;
  }

  .download-bg .download-header {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    /* background-color: #1A1E5F; */
    height: 40px;
    margin: 0 auto;
    padding: 10px 20px;
    position: relative;
  }

  .gradient {
    background-color: rgba(13, 15, 48, 0.6);
    /* IE9, iOS 3.2+ */
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxsaW5lYXJHcmFkaWVudCBpZD0idnNnZyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIwJSIgeTE9IjEwMCUiIHgyPSIwJSIgeTI9IjAlIj48c3RvcCBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMiIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzFhMWU1ZiIgc3RvcC1vcGFjaXR5PSIxIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjdnNnZykiIC8+PC9zdmc+);
    background-image: -webkit-gradient(
      linear,
      0% 100%,
      0% 0%,
      color-stop(0, rgba(0, 0, 0, 0.2)),
      color-stop(1, rgb(26, 30, 95))
    );
    /* Android 2.3 */
    background-image: -webkit-repeating-linear-gradient(
      bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgb(26, 30, 95) 100%
    );
    /* IE10+ */
    background-image: repeating-linear-gradient(
      to top,
      rgba(0, 0, 0, 0.2) 0%,
      rgb(26, 30, 95) 100%
    );
    background-image: -ms-repeating-linear-gradient(
      bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgb(26, 30, 95) 100%
    );
  }

  .download-bg .download-header .title {
    text-align: left;
    font-size: 15px;
    line-height: 25px;
    color: #fbd56f;
  }

  .download-bg .download-header .download-close {
    position: absolute;
    right: 16px;
    top: 0;
    font-size: 28px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    color: #fbd56f;
  }

  .download-bg .download-content {
    border-radius: 5px;
    padding: 20px;
  }

  .download-icon {
    background-color: #2a3862;
    border-radius: 5px;
    margin: 15px;
    height: 160px;
    width: 160px;
    display: inline-block;
    vertical-align: middle;
  }

  .download-icon .content {
    margin: 14px;
  }

  .download-icon p {
    color: #fff;
    font-size: 16px;
  }

  a {
    text-decoration: none;
  }
</style>
