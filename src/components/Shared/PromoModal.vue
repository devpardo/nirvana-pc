<template>
  <div class="mask-layer" v-if="value">
    <div class="promo-modal">
      <span class="download-close hand" @click="close">
        <i class="fa fa-close fa-lrg"></i>
      </span>
      <tabs ref="tabs">
        <tab v-for="(promo, index) of promos" :key="index" :name="promo.title" :id="`promo-${index}`">
          <a :href="promo.link">
            <img :src="promo.image_url">
          </a>
        </tab>
      </tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PromoModal",
    props: {
      value: {
        type: Boolean
      },
      promos: {
        type: Array,
        // default: () => {
        //   return [
        //     {
        //       title: "加载促销 ...",
        //       link: "/",
        //       // image_url:
        //       //   "https://nirvanaph.s3.ap-northeast-2.amazonaws.com/3f8hJA4Ak28r8Q5WrQjsSW4kds19DCBN.png",
        //       // icon_url:
        //       //   "https://nirvanaph.s3.ap-northeast-2.amazonaws.com/oDatRVq9YsRDvmxvtYzT9oDHCBq2sQGD.png"
        //     }
        //   ]
        // }
      }
    },
    data() {
      return {
        // promos: [
        //   {
        //     title: "加载促销 ...",
        //     link: "/",
        //     // image_url:
        //     //   "https://nirvanaph.s3.ap-northeast-2.amazonaws.com/3f8hJA4Ak28r8Q5WrQjsSW4kds19DCBN.png",
        //     // icon_url:
        //     //   "https://nirvanaph.s3.ap-northeast-2.amazonaws.com/oDatRVq9YsRDvmxvtYzT9oDHCBq2sQGD.png"
        //   }
        // ]
      };
    },
    methods: {
      close() {
        this.$emit("input", false);
      }
    },
    async mounted() {

      await this.$nextTick();

      const arr = Array.from(this.$refs.tabs.$el.children[0].children);

      for (let i = 0; i < this.promos.length; i++) {
        let el = this.$refs.tabs.$el.children[0].children[i]
        el.style.width = `${100/this.promos.length}%`
      }
    }
  };
</script>

<style scoped>
  .fa-lrg {
    font-size: 21px;
  }
  .mask-layer {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 3000;
  }

  .promo-modal {
    margin: 0 auto;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #122250;
    height: 680px;
    width: 625px;
    border-radius: 5px;
  }

  .promo-modal /deep/ .tabs-component-tabs {
    position: absolute;
    top: 0;
    width: 100%;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    opacity: .8;
  }

  .promo-modal /deep/ .tabs-component .tabs-component-panels {
    border-radius: 15px;
  }

  .promo-modal /deep/ .tabs-component .tabs-component-panels img {
    width: 100%;
    height: auto;
    display: block;
  }

  .promo-modal .download-header {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    /* background-color: #1A1E5F; */
    height: 40px;
    margin: 0 auto;
    /* padding: 10px 20px; */
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

  .promo-modal .download-header .title {
    text-align: left;
    font-size: 15px;
    line-height: 25px;
    color: #fbd56f;
  }


  .promo-modal .download-header .download-close {
    position: absolute;
    right: -35px;
    top: -9px;
    font-size: 48px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    color: hsl(0, 0%, 100%);
    font-family: Arial, Helvetica, sans-serif;
  }

  span.download-close.hand {
    position: absolute;
    right: -30px;
    top: 0;
    font-size: 30px;
    color: hsl(0, 0%, 100%);
  }
  .promo-modal .download-content {
    border-radius: 5px;
    /* padding: 20px; */
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

  li.tabs-component-tab.is-active {
    float: left;
    background: hsl(0, 100%, 50%);
    text-decoration: none;
  }

</style>
