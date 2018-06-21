<template>
  <div class="container" id="home">
    <div class="platform-container">
      <div class="platform">
        <div class="vendors dl">
          <div v-for="(vendor, idx) in vendors" class="vendor hand" :class="{'active': currentIndex == idx}" @click="curRecommonedGames = vendor.games; currentIndex = idx">
            <span class="img dl"><img :src="vendor.image_url" width="100%" height="100%"/></span>
            <div class="txt dl">
              <p>{{vendor.name}}平台</p>
              <p>{{vendor.desc}}</p>
            </div>
          </div>
          <loading v-if="!vendors || !vendors.length" :loading="!vendors || !vendors.length"></loading>
        </div>
        <div class="games dl">
          <p class="title">推荐游戏</p>
          <div class="list">
            <span class="game hand dl" v-for="game in curRecommonedGames" @click="gameDetail(game.gid)">
              <p class="img">
                <img :src="game.image_url" width="100%" height="100%" />
              </p>
              <p class="txt">{{game.name}}</p>
            </span>
            <loading v-if="!curRecommonedGames || !curRecommonedGames.length" :loading="!curRecommonedGames || !curRecommonedGames.length"></loading>
          </div>
        </div>
        <div class="announcements dl">
          <p class="title">
            <span ref="announcements" :class="{'border-red': currTab == 'announcements'}" @click="currTab = 'announcements'">活动公告</span>
            <span ref="promotions"    :class="{'border-red': currTab == 'promotions'}"    @click="currTab = 'promotions'">优惠活动</span>
          </p>
          <div class="content" v-if="currTab == 'announcements'">
            <p v-for="item in announcements" @click="goAnnouncementDetail(item.id)">
              <span class="img dl"></span>
              <span class="txt hand dl">{{ item.title }}</span>
              <span class="dl fr">{{ item.created_at }}</span>
            </p>
            <p v-for="item in announcements" @click="goAnnouncementDetail(item.id)">
              <span class="img dl"></span>
              <span class="txt hand dl">{{ item.title }}</span>
              <span class="dl fr">{{ item.created_at }}</span>
            </p>
          </div>
          <div class="content" v-else>
            <p @click="goPromotions(0)">
              <span class="img dl"></span>
              <span class="txt hand dl">诚意亚太十重礼 千万奖金乐不停</span>
            </p>
            <p @click="goPromotions(1)">
              <span class="img dl"></span>
              <span class="txt hand dl">亚太打虎攻略 四重礼包玩转千款老虎机</span>
            </p>
            <p @click="goPromotions(2)">
              <span class="img dl"></span>
              <span class="txt hand dl">豪情亚太百家乐 30%高额红利保你过三关</span>
            </p>
            <p @click="goPromotions(3)">
              <span class="img dl"></span>
              <span class="txt hand dl">亚太鱼雷发射 金鲨巨龙绝不漏网</span>
            </p>
            <p @click="goPromotions(4)">
              <span class="img dl"></span>
              <span class="txt hand dl">亚太极乐宝典 签到抽奖福利好礼不打烊</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Shared/Loading.vue";

export default {
  name: "home",
  data() {
    return {
      vendors: [],
      curRecommonedGames: [],
      announcements: [],
      promotions: [],
      currTab: "announcements",
      currentIndex: 0
    };
  },
  components: {
    Loading
  },
  created: function() {
    this.api.getRecommend().then((res) => {
      let { data } = res;
      this.vendors = data;
      this.curRecommonedGames = data[0].games;
    });
    this.api.getAnnouncement().then((res) => {
      this.announcements = res.data.items;
    });
    this.api.getPromotions().then((res) => {
      this.promotions = res.data.items;
    });
  },
  mounted() {
    this.$refs["announcements"].className = "border-red";
  },
  methods: {
    gameDetail(gid) {
      this.$router.push({ name: "GameDetail", params: { gid, game: "slot" } });
    },
    goAnnouncementDetail(id) {
      this.$router.push({ name: "AnnouncementDetail", params: { announcementId: id } });
    },
    goPromotions(n) {
      this.$router.push({ name: "Activity", params: { category: n } });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #home {
    .el-loading-mask {
      background-color: transparent;
    }
  }
</style>
<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.container {
  width: 100%;
}
.info-container {
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 15%;
}
.info-bg {
  width: $min-width;
  margin: 0 auto;
  text-align: left;
}
.info {
  .announcement {
    color: $color-white;
    font-size: $font-large;
    padding-bottom: 5px;
    padding-right: 180px;
    width: 487px;
    @include overflow-line(2);
    border-bottom: $px solid $color-white;
  }
  .txt {
    color: $color-white;
    font-size: $font-h4;
    width: 456px;
    margin: 20px 0px;
    @include overflow-line(3)
  }
  .detail {
    background-color: $color-red;
    width: 140px;
    @include line-height(50px);
    border-radius: 15px;
    color: $color-white;
    text-align: center;
    font-size: $font-h4;
  }
}
.platform-container {
  height: 46%;
  width: 100%;
  position: absolute;
  bottom: 0px;
  z-index: 10;
  .platform {
    width: $min-width;
    height: 100%;
    margin: 0 auto;
  }
  .vendors, .games, .announcements {
    overflow: hidden;
    vertical-align: top;
  }
  .vendors {
    background-color: $color-gray1;
    width: 200px;
    height: 100%;
    .active {
      background-color: $color-black;
      & {
        border-left: 3px solid $color-red;
      }
    }
    .vendor {
      width: 100%;
      padding: 10px;
      &:hover {
        background-color: $color-black;
        & {
          border-left: 3px solid $color-red;
        }
      }
      .img {
        width: 40px;
        height: 40px;
        img {
          border-radius: 5px;
        }
      }
      .txt {
        padding-left: 10px;
        padding-top: 2px;
        vertical-align: top;
        width: 72%;
      }
    }
    .txt p {
      @extend .overflow;
      &:first-of-type {
        color: $color-white;
      }
      &:last-of-type {
        color: $color-gray3;
      }
    }
  }
  .games {
    background: rgba(0, 0, 0, 0.7);
    width: 662px;
    height: 100%;
    margin-left: -4px;
    .title {
      width: 662px;
      font-size: $font-h4;
      color: $color-white;
      padding: 10px 15px;
      padding-bottom: 5px;
      border-bottom: $px solid rgba(255, 255, 255, 0.2);
    }
    .list {
      padding: 10px 25px;
      padding-bottom: 50px;
      height: 100%;
      overflow-y: scroll;
    }
    .game {
      text-align: center;
      margin-left: 10px;
      margin-bottom: 10px;
      width: 76px;
      vertical-align: top;
    }
    .img {
      width: 68px;
      height: 68px;
      img {
        border-radius: 6px;
      }
    }
    .txt {
      padding-top: 5px;
      color: $color-white;
      width: 100%;
      @include overflow-line(2);
    }
  }
  .announcements {
    width: 410px;
    height: 100%;
    margin-left: -4px;
    color: $color-gray7;
    font-size: $font-h4;
    background-color: $color-gray1;
    .title {
      background-color: $color-gray2;
      width: 410px;
      span {
        padding: 12px 20px;
        display: inline-block;
        cursor: pointer;
      }
      .border-red {
        background: $color-black;
        border-bottom: 3px solid $color-red;
      }
    }
    .content {
      padding: 10px;
      padding-bottom: 50px;
      overflow-y: scroll;
      height: 100%;
      p {
        padding-bottom: 6px;
        &:hover {
          color: $color-red;
        }
      }
      .txt {
        width: 63%;
        @extend .overflow;
      }
      .img {
        width: 16px;
        height: 15px;
        margin-right: 10px;
      }
    }
  }
}
</style>
