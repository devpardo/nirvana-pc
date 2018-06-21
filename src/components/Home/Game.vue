<template lang="html">
  <div class="game">
    <p class="title">
      <span class="weight">游戏大赢家</span>
    </p>
    <loading v-if="loading" :loading="loading"></loading>
    <div class="container" v-if="records.length">
      <div class="container-carousel" :class="{ 'transition': top !== 0 }" v-carousel="{vueObj: this}">
        <div class="content li hand" v-for="record in records" @click="detail(record.gid)">
          <span class="img dl">
            <img :src="record.image_url" width="100%" height="100%"/>
          </span>
          <span class="info dl">恭喜玩家{{ record.username }}在游戏<span class="yellow">{{ record.game }}</span>中获得<span class="yellow">{{ record.amount }}</span>元大奖！</span>
          <span class="fa fr">{{ angleRight }}</span>
        </div>
      </div>
    </div>
    <div v-else-if="!loading" class="no-data">
      暂未有相关记录
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Shared/Loading.vue";
import Vue from "vue";

export default {
  data() {
    return {
      angleRight: this.$fontawesome("angle-right"),
      records: [],
      loading: true,
      top: 0
    };
  },
  created: function() {
    this.api.getRecords().then((res) => {
      this.records = res.data.items;
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  },
  components: {
    Loading
  },
  directives: {
    carousel: {
      bind: (el, binding) => {
        Vue.nextTick(() => {
          // el 对应上面的scroll绑定的el el.scrollHeight - el.scrollTop - el.clientHeight
          let scrollTop = el.clientHeight - 90; // 90为父亲高度
          let tempTop = 0;
          function getInterval() {
            el.intervalTime = setInterval(() => {
              tempTop = -90 + tempTop;
              if (-tempTop > scrollTop) {
                el.style.top = 0 + "px";
                tempTop = 0;
              } else {
                el.style.top = tempTop + "px";
              }
              binding.value.vueObj.top = tempTop;
            }, 4000);
          }
          getInterval();

          el.addEventListener("mouseover", () => {
            window.clearInterval(el.intervalTime);
            el.intervalTime = null;
          });
          el.addEventListener("mousemove", () => {
            if (el.intervalTime !== null) {
              return;
            }
            getInterval();
          });
        });
      },
      unbind: (el) => {
        window.clearInterval(el.intervalTime);
      }
    }
  },
  methods: {
    detail(id) {
      this.$router.push({ name: "Detail", params: { detail_gid: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.game {
  width: 406px;
  height: 180px;
  background-color: $color-blue8;
  margin-left: -4px;
  padding: 10px 20px;
  .title {
    padding-top: 10px;
    margin-bottom: 10px;
    color: $color-white;
    .weight {
      font-weight: bold;
    }
    span {
      font-size: $font-h;
    }
  }
  .container {
    height: 90px;
    overflow: hidden;
    position: relative;;
    background-color: rgba($color-white, .1);
    .yellow {
      color: $color-yellow;
    }
    .container-carousel {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
    }
    .transition {
      transition-property: top;
      transition-duration: 200ms;
      transition-timing-function: ease-in-out;
    }
    .content {
      height: 90px;
      padding: 10px;
      // border-bottom: $px solid $color-white3;
      .img {
        width: 68px;
        height: 68px;
        vertical-align: middle;
        img {
          border-radius: 8px;
        }
      }
      .info {
        width: 75%;
        padding: 0px 10px;
        vertical-align: middle;
        color: $color-white;
      }
      .fa {
        font-size: $font-h1;
        color: $color-gray7;
        position: relative;
        top: 24px;
      }
    }
  }
}
</style>
