<template lang="html">
  <div class="vendor">
    <ul>
      <li v-for="(vendor, idx) in vendors" class="hand" :class="{'active': currentIndex == idx}" @click="curRecommonedGames = vendor.games; currentIndex = idx">
       {{ vendor.name }}平台
      </li>
      <span class="fr more hand" @click="vendorHome()">MORE<span class="fa">{{ plus_square }}</span></span>
    </ul>
    <div class="list" ref="list" :key="currentIndex">
      <span class="game hand dl" v-for="(game,index) of curRecommonedGames" :key="index" @click="gameDetail(game.gid)">
        <p class="img">
          <img :src="game.image_url" width="100%" height="100%" />
        </p>
        <p class="txt">{{game.name}}</p>
      </span>
      <loading v-if="!curRecommonedGames || !curRecommonedGames.length" :loading="!curRecommonedGames || !curRecommonedGames.length"></loading>
    </div>
  </div>
</template>

<script>
  import PerfectScrollbar from "perfect-scrollbar";
  import Loading from "@/components/Shared/Loading.vue";

  export default {
    data() {
      return {
        plus_square: this.$fontawesome("plus-square"),
        vendors: [],
        curRecommonedGames: [],
        currentIndex: 0,
        ps: null
      };
    },
    components: {
      Loading
    },
    created: function() {
      this.fetchData();
    },
    async mounted() {
      await this.$nextTick();
      this.ps = new PerfectScrollbar(this.$refs.list, {
        minScrollbarLength: 20
      });
    },
    beforeDestroy() {
      if (this.ps) {
        this.ps.destroy();
      }
    },

    methods: {
      gameDetail(gid) {
        this.$router.push({ name: "GameDetail", params: { gid, game: "slot" } });
      },
      vendorHome() {
        this.$router.push({ name: "VendorHome" });
      },
      fetchData() {
        this.api.getRecommend().then(res => {
          let { data } = res;

          this.vendors = data;
          if (this.vendors.length) {
            this.vendors = this.vendors.slice(0, 5);
          }
          this.curRecommonedGames = data[0].games;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .vendor {
    width: 100%;
    height: 250px;
    background-color: $color-blue8;
    overflow: hidden;
    padding: 10px 20px;
    .active {
      color: $color-yellow13;
      border-bottom: 2px solid $color-yellow13;
    }
    ul {
      border-bottom: $px solid $color-blue9;
      .more {
        color: $color-white;
        font-size: $font-h5;
        padding-top: 16px;
        transform: scale(0.8);
      }
      .fa {
        padding-left: 5px;
        color: $color-yellow13;
      }
    }
    li {
      display: inline-block;
      color: $color-white;
      text-align: center;
      padding: 10px 20px;
      &:hover {
        border-bottom: 2px solid $color-yellow13;
      }
    }
    .list {
      padding-top: 10px;
      height: 90%;
      overflow-y: scroll;
      .game {
        margin: 0 0 10px 10px;
        width: 67px;
        vertical-align: top;
      }
      .img {
        width: 67px;
        height: 67px;
        img {
          border-radius: 6px;
          &:hover {
            transform: scale(1.05);
          }
        }
      }
      .txt {
        font-size: $font-h5;
        padding-top: 2px;
        color: rgba(255, 255, 255, 0.8);
        width: 100%;
        @extend .overflow;
      }
    }
  }
</style>
