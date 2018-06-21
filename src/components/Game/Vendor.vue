<template>
  <div id="vendor">
    <game class="games dl" v-for="(item, idx) in games" :key="idx" :game="item" :param="$route.params" :gamesOfVendor="gamesOfVendor"></game>
    <loading :loading="loading" v-if="loading"></loading>
    <span v-else-if="!games.length" class="error-all"></span>
  </div>
</template>

<script>
  import Game from "@/components/Shared/Game.vue";
  import Loading from "@/components/Shared/Loading.vue";

  export default {
    props: {
      menuDatas: {
        type: Array
      }
    },
    data() {
      return {
        games: [],
        loading: true,
        disabled: true,
        game: {
          code: "",
          params: ""
        },
        wallet: {}
      };
    },
    components: {
      Game,
      Loading
    },
    watch: {
      $route(to, from) {
        if (this.$route.params.code) {
          this.fetchData();
        }
      }
    },
    async mounted() {
      if (this.$route.params.code === "all") {
        this.loading = true;
        this.games = await this.$store.dispatch("getAllPlatformGames");
        this.loading = false;
        return;
      }
      if (this.$route.params.code) {
        this.fetchData();
      }
    },
    methods: {
      fetchData() {
        this.loading = true;
        let { code, taxonomyId } = this.$route.params;
        this.vendorWallet(code);
        // q_recommeded_at_present: 1 值为1时是推荐游戏
        // q_taxonomy_id_eq: 2        值为对应的taxonomy的id 此时查询结果为对应分类下的游戏列表
        let params = taxonomyId ? { q_taxonomy_id_eq: taxonomyId } : {}; // { q_recommended_at_present: 1 }
        this.game.code = code;
        this.game.params = params;
        this.gamesOfVendor();
      },
      vendorWallet(code) {
        this.api
          .getVendorWallet(code)
          .then(res => {
            this.wallet = res.data || "";
            this.disabled = res.data.transfer_locked_at || false;
          })
          .catch(() => {
            this.loading = false;
          });
      },
      gamesOfVendor() {
        this.loading = true;
        this.api
          .getGamesOfVendor(this.game.code, this.game.params)
          .then(({ data }) => {
            this.loading = false;
            if (!this.wallet.maintain_at) {
              this.games = data.items.length ? data.items[0].games : [];
            }
          })
          .catch(() => {
            this.loading = false;
          });
      }
    }
  };
</script>

<style lang="scss">
  #vendor {
    .el-button {
      border: none;
      background-color: initial;
      height: 20px;
      line-height: 20px;
      padding: 0px;
      width: 100%;
      color: #f8e71c;
      span {
        display: inline-block;
        width: 98%;
        padding-right: 5px;
        vertical-align: middle;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:hover {
        color: #f8e71c;
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import '../../assets/stylesheets/public';

  button:disabled {
    opacity: 0.2;
  }
  .games,
  .block {
    vertical-align: top;
  }
  .block {
    width: 489px;
    height: 186px;
    background-color: $color-purple;
    position: relative;
    margin-right: 21px;
    .content {
      position: absolute;
      top: 36%;
      left: 10px;
      right: 10px;
      text-align: center;
    }
    .img {
      width: 48px;
      height: 48px;
      margin-right: 10px;
    }
    .txt {
      color: $color-yellow2;
      p {
        font-size: $font-h1;
      }
    }
    .title {
      color: $color-white;
      span {
        font-size: $font-h;
      }
    }
  }
</style>
