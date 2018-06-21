<template lang="html">
  <div>
    <div class="game hand dl" @click="gameDetail(game.gid)">
      <div class="img">
        <img :src="game.image_url" width="100%" height="100%"/>
        <div class="mask-layer layer hand">
          <span v-if="game.tag_list.length > 3">
            <span class="tag dl" v-for="item in game.tag_list.slice(0, 3)">{{ item }}</span>
          </span>
          <span v-else>
            <span class="tag dl" v-for="item in game.tag_list">{{ item }}</span>
          </span>
        </div>
        <div class="mask-layer-1 layer hand">
          <span class="heart full hand fa fr" v-if="game.liked" @click.stop="unlike(game)">{{ heartFull }}</span>
          <span class="heart un-full hand fa fr" v-else @click.stop="like(game)">{{ heart }}</span>
          <p class="desc">{{ game.desc }}</p>
        </div>
      </div>
      <div class="footer">
        <p class="info">
          <span class="txt dl">{{ game.name }}</span>
          <span class="tag fr dl">{{ game.vendor_name }}</span>
        </p>
        <p>
          <star :starsData="game.star_rank"></star>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "@/components/Shared/Star.vue";

export default {
  props: ["game", "param", "gamesOfVendor", "handleLike"],
  data() {
    return {
      heart: this.$fontawesome("heart-o"),
      heartFull: this.$fontawesome("heart")
    };
  },
  components: { Star },
  methods: {
    gameDetail(gid) {
      if (this.param) {
        this.$router.push({ name: "GameDetail", params: { code: this.param.code, taxonomyId: this.param.taxonomyId, gid: gid } });
      } else {
        this.$router.push({ name: "GameDetail", params: { gid } });
      }
    },
    like(game) {
      this.api.postLike(game.gid).then(() => {
        this.$set(game, "liked", true); // 可以减少请求
//        if (this.gamesOfVendor) {
//          this.gamesOfVendor()
//        }
        this.$message({
          message: "添加收藏成功",
          type: "success"
        });
      });
    },
    unlike(game) {
      this.api.postUnlike(game.gid).then(() => {
        this.$set(game, "liked", false); // 可以减少请求
//        if (this.gamesOfVendor) {
//          this.gamesOfVendor()
//        }
        if (this.handleLike) { // for 收藏
          this.handleLike();
        }
        this.$message({
          message: "取消收藏成功",
          type: "success"
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.game {
  width: 200px;
  padding: 10px;
  &:hover {
    animation: opacity 0.2s ease-in;
    background-color: rgba($color-white, 0.2);
    border-radius: 6px;
  }
  .img {
    width: 100%;
    height: 180px;
    position: relative;
    img { border-radius: 5px; }
    &:hover {
      .mask-layer {
        display: none;
      }
      .mask-layer-1 {
        background-color: rgba(0, 0, 0, 0.5);
        display: block;
        z-index: 2001;
      }
    }
  }
  .layer {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    padding: 0px 10px;
    padding-top: 10px;
    border-radius: 5px;
    width: 100%;
    transition: background-color .5s ease-in;
  }
  .mask-layer {
    background-color: transparent;
    .tag {
      padding: 2px 10px;
      margin-bottom: 6px;
      background-color: rgba($color-blue8, 0.7);
      color: $color-white;
      margin-right: 5px;
      border-radius: 5px;
      white-space: nowrap;
    }
  }
  .mask-layer-1 {
    display: none;
    .heart {
      padding: 5px;
      background-color: $color-white;
      border-radius: 2px;
    }
    .full {
      color: $color-red;
    }
    .un-full {
      color: $color-gray;
    }
    .desc {
      color: $color-white;
      position: absolute;
      max-height: 150px;
      bottom: 10px;
      right: 10px;
      left: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .footer {
    width: 100%;
    min-height: 53px;
    padding-top: 5px;
    .info {
      width: 100%;
    }
    .action {
      padding-top: 10px;
      padding-bottom: 5px;
    }
    .txt {
      color: $color-white;
      font-weight: bold;
      width: 73%;
      @extend .overflow;
    }
    .tag {
      color: $color-blue8;
      background-color: $color-yellow13;
      padding: 0px 5px;
      border-radius: 3px;
      overflow: hidden;
      white-space: nowrap;
      max-width: 22%;
      vertical-align: top;
    }
  }
}
@keyframes opacity {
  0% { opacity: 0 }
  50% { opacity: 0.5 }
  100% { opacity: 1 }
}
</style>
