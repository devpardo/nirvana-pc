<template lang="html">
  <div class="body" v-loading="load.flag" :element-loading-text="load.txt">
    <div class="game-detail">
      <div class="title">
        <span class="crumbs fl">
          <span @click="goVendor(Detail.vendor.category, Detail.vendor.code)">{{ Detail.vendor && Detail.vendor.name }}场馆</span><i>-</i><span>{{ Detail.name }}</span>
        </span>
        <span class="fr">
          <button class="button hand dl" @click="goVendor(Detail.vendor.category, Detail.vendor.code)">返回{{ Detail.vendor && Detail.vendor.name }}游戏列表</button>
        </span>
      </div>
      <div class="game-info">
        <div class="game">
          <span class="img dl"><img :src="Detail.image_url" width="100%" height="100%"/></span>
          <span class="game-intro dl">
            <p class="game-title">
              <span class="game-name">{{ Detail.name }}</span>
              <span class="game-tag dl">{{ Detail.vendor && Detail.vendor.ename || '无' }}</span>
              <span class="fr">
                <span class="hand fa" v-if="Detail.liked"  @click="unlike(Detail)">{{ heartFull }}</span>
                <span class="hand fa" v-else @click="like(Detail)">{{ heart }}</span>
              </span>
            </p>
            <p class="game-txt">
              {{ Detail.ename || '无' }}
            </p>
            <button class="star-button hand" @click="open(Detail.gid)" :disabled="Detail.maintain_at || !Detail.enabled">开始</button>
            <p class="fix" v-if="Detail.maintain_at && Detail.enabled"><span class="fa">{{ circle }}</span>正在维修</p>
            <p class="fix" v-if="Detail.maintain_at && !Detail.enabled"><span class="fa">{{ circle }}</span>已下架</p>
            <p class="fix" v-if="Detail.vendor && Detail.vendor.transfer_locked_at"><span class="fa">{{ circle }}</span>{{ Detail.vendor.transfer_locked_text || '账户已锁' }}</p>
          </span>
          <span class="fr">
            <span class="balance dl">当前场馆余额: ￥{{ Detail.vendor && Detail.vendor.sub_wallet || '0' }}</span>
            <button class="button hand dl" @click="transferSub()" :disabled="Detail.maintain_at || !Detail.enabled || (Detail.vendor && Detail.vendor.transfer_locked_at)">转入</button>
          </span>
        </div>
        <div class="game-screenshot" v-if="Detail.images && Detail.images.length">
          <div class="title-h1">
            <span class="h1">游戏截图</span>
          </div>
          <content-slide :images="Detail.images"></content-slide>
        </div>
        <div class="intro">
          <div class="title-h1">
            <span class="h1">游戏介绍</span>
          </div>
          <p class="intro-txt">
            {{ Detail.desc || '无' }}
          </p>
        </div>
        <div class="intro">
          <div class="title-h1">
            <span class="h1">小编推荐</span>
          </div>
          <p class="intro-txt">
            {{ Detail.recommended_desc || '无' }}
          </p>
        </div>
      </div>
    </div>
    <transfer-sub v-if="transfer.subFlag" :transfer="transfer"></transfer-sub>
  </div>
</template>

<script>
  import ContentSlide from "@/components/Shared/ContentSlide.vue";
  import TransferSub from "@/components/Shared/TransferSub.vue";

  export default {
    data() {
      return {
        heart: this.$fontawesome("heart-o"),
        heartFull: this.$fontawesome("heart"),
        circle: this.$fontawesome("exclamation-circle"),
        load: {
          flag: false,
          txt: "游戏加载中"
        },
        transfer: {
          subFlag: false,
          subMainFlag: false,
          mainFlag: false,
          mainBodyFlag: false,
          code: "",
          name: "",
          method: this.gameDetail
        },
        Detail: {}
      };
    },
    components: {
      ContentSlide,
      TransferSub
    },
    watch: {
      "$route.query": {
        handler({ gid }) {
          if (gid) {
            this.launch(gid, { redirect: "/casino"});
          }
        },
        immediate: true
      }
    },
    created() {
      this.gameDetail();
    },
    methods: {
      gameDetail() {
        let gid = this.$route.params.gid || this.$route.params.detail_gid;
        this.api.getGameDetail(gid).then(res => {
          this.Detail = res.data;
          if (this.Detail) {
            this.transfer.code = this.Detail.vendor && this.Detail.vendor.code;
            this.transfer.name = this.Detail.vendor && this.Detail.vendor.name;
          }
        });
      },
      like(game) {
        this.api.postLike(game.gid).then(() => {
          //        this.gameDetail()
          this.$set(game, "liked", true);
          this.$message({
            message: "添加收藏成功",
            type: "success"
          });
        });
      },
      unlike(game) {
        this.api.postUnlike(game.gid).then(() => {
          this.$set(game, "liked", false);
          this.$message({
            message: "取消收藏成功",
            type: "success"
          });
        });
      },
      goVendor(category, code) {
        if (code) {
          if (category) {
            let n = category.split("category_");
            if (n.length === 2) {
              this.$router.push({ path: `/${n[1]}/${code}` });
            }
          } else {
            this.$message({
              message: "该平台目前未有分类, 不能进入相关平台",
              type: "info"
            });
          }
        } else {
          this.$router.push({ name: "Vendor" });
        }
      },
      transferSub() {
        if (!this.transfer.code) {
          this.$message({
            message: "数据获取中, 请稍候再试",
            type: "info"
          });
          return;
        }
        this.transfer.subFlag = true;
        this.transfer.subMainFlag = true;
      },
      launch(gid, redirect) {
        this.load.flag = true;
        this.api
          .postLaunch(gid)
          .then(res => {
            if (res.data && res.data.game_url) {
              // window.open(res.data.game_url);
              //alert(res.data.game_url);

              window.location = res.data.game_url
            } else {
              this.$message({
                message: "获取链接失败",
                type: "warning"
              });
            }
            this.load.flag = false;
            if(redirect) {
              this.$router.push(redirect.path)
            }
          })
          .catch(() => {
            this.load.flag = false;
            this.$message({
              message: "获取链接失败",
              type: "warning"
            });
          });
      },
      open(gid) {
        if (this.Detail.maintain_at || !this.Detail.enabled) {
          return;
        }
        this.launch(gid);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .body {
    padding: 20px 0 20px 20px;
  }
  .title-h1 {
    .h1 {
      font-size: $font-h3;
      color: $color-yellow13;
    }
    color: $color-gray10;
    padding-bottom: 10px;
    text-align: left;
    position: relative;
    .sign {
      width: 100px;
      height: 2px;
      background-color: $color-red2;
      position: absolute;
      left: 0px;
      bottom: 0px;
      &:before {
        content: "";
        border-bottom: 5px solid $color-red2;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
        position: absolute;
        bottom: 2px;
        left: 47px;
      }
    }
  }
  .intro {
    margin: 0 auto;
    .intro-txt {
      color: $color-white;
      padding: 10px 0;
      text-align: justify;
    }
  }
  .game-screenshot,
  .intro {
    padding: 20px 0;
    border-bottom: $px solid $color-blue9;
  }
  .game-detail {
    margin: 0 auto;
    width: $min-width;
    background-color: $color-blue8;
    .title {
      padding: 0px 40px;
      @include line-height(60px);
      border-bottom: $px solid $color-blue9;
      .crumbs {
        color: $color-white;
        max-width: 50%;
        @extend .overflow;
        span {
          cursor: pointer;
          font-size: $font-h3;
        }
        i {
          font-style: normal;
          color: $color-gray6;
          padding: 0px 5px;
        }
      }
      .fr {
        .button {
          padding: 5px 40px;
          background-color: $color-blue8;
          border: 2px solid $color-yellow13;
          color: $color-yellow13;
          border-radius: 40px;
        }
      }
    }
    .game-info {
      padding: 20px 40px;
    }
    .game {
      padding-bottom: 20px;
      border-bottom: $px solid $color-blue9;
      .img {
        width: 134px;
        height: 134px;
        img {
          border-radius: 5px;
        }
      }
      .game-title {
        padding-top: 5px;
        .fr {
          margin-left: 30px;
          margin-top: 4px;
          max-width: 50%;
          @extend .overflow;
          .fa {
            color: $color-red2;
            font-weight: bold;
            font-size: $font-h2;
          }
        }
      }
      .balance {
        color: $color-yellow13;
        font-size: $font-h3;
      }
      .button {
        padding: 5px 40px;
        color: $color-blue9;
        background-color: $color-yellow13;
        border: 0;
        border-radius: 20px;
        margin-left: 20px;
      }
    }
    .game-name {
      font-size: $font-h2;
      color: $color-white;
      padding-right: 10px;
    }
    .game-tag {
      font-size: $font-h4;
      color: $color-blue9;
      background-color: $color-yellow13;
      padding: 0px 10px;
      border-radius: 5px;
    }
    .game-txt {
      padding: 10px 0px;
      color: $color-white;
      font-size: $font-h4;
    }
    .game-intro {
      max-width: 100%;
      vertical-align: top;
      padding-left: 20px;
    }
    .star-button {
      padding: 8px 40px;
      background-color: $color-yellow13;
      color: $color-blue9;
      text-align: center;
      border: 0;
      border-radius: 30px;
    }
    .fix {
      padding: 10px 0px;
      font-size: $font-h4;
      color: $color-yellow1;
      .fa {
        color: $color-red;
        padding-right: 5px;
        font-size: $font-h4;
      }
    }
  }
</style>
