<template>
  <div class="announcements">
    <ul class="title">
      <li ref="announcements" :class="{'border-red': currTab == 'announcements'}" @click="currTab = 'announcements'">活动公告</li>
      <li ref="promotions"    :class="{'border-red': currTab == 'promotions'}"    @click="currTab = 'promotions'">优惠活动</li>
      <span class="fr more hand" @click="more()">MORE<span class="fa">{{ plus_square }}</span></span>
    </ul>
    <div class="content" v-if="currTab == 'announcements'">
      <p v-for="(item,index) in announcements" :key='index' class="hand" @click="more()">
        <span class="txt dl">{{ item.title }}</span>
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
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        plus_square: this.$fontawesome("plus-square"),
        announcements: [],
        currTab: "announcements",
        currentIndex: 0
      };
    },
    created: function() {
      this.api.getAnnouncement().then((res) => {
        this.announcements = res.data.items;
      });
    },
    mounted() {
      this.$refs["announcements"].className = "border-red";
    },
    methods: {
      more() {
        this.$router.push({ name: "Notifications" });
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

<style lang="scss" scoped>
  @import '../../assets/stylesheets/public';

  .announcements {
    overflow: hidden;
    vertical-align: top;
    width: 406px;
    height: 180px;
    margin-left: -4px;
    margin-right: 20px;
    color: $color-white;
    font-size: $font-h4;
    background-color: $color-blue8;
    padding: 10px 20px;
    padding-bottom: 68px;
    .title {
      width: 100%;
      li {
        padding: 10px 20px;
        display: inline-block;
        cursor: pointer;
        &:hover {
          border-bottom: 2px solid $color-yellow13;
        }
      }
      .border-red {
        border-bottom: 2px solid $color-yellow13;
        color: $color-yellow13;
      }
      span {
        margin-top: 8px;
      }
      .more {
        color: $color-white;
        padding-top: 5px;
        font-size: $font-h5;
        transform: scale(.8);
      }
      .fa {
        padding-left: 5px;
        color: $color-yellow13;
      }
    }
    .content {
      padding: 10px 0;
      overflow-y: scroll;
      height: 100%;
      width: 100%;
      p {
        padding-bottom: 6px;
        &:hover {
          color: $color-yellow13;
        }
      }
      .txt {
        width: 63%;
        @extend .overflow;
      }
    }
  }
</style>
