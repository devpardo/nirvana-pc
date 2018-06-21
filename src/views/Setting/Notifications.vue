<template lang="html">
  <div class="notification">
    <p class="title-h1"><span>消息公告</span></p>
    <p class="menu">
      <span v-for="(item, n) in menuDatas" @click="changeShow(n)">
        <i></i><span class="span hand" :class="{ 'active': currentIndex === n }">{{ item }}</span>
        <span v-if="n === 1 && unreadNotificationCount" class="notify-number">
          <!--99<sup>+</sup>-->
          <span class="red">{{ unreadNotificationCount }}</span>
        </span>
      </span>
      <i></i>
      <span class="all-delete hand fr" v-if="currentIndex === 1 && notifications && notifications.length" @click="deleteAll()">一键删除</span>
    </p>
    <div class="blocks">
      <div v-if="currentIndex === 0">
        <div v-if="announcements && announcements.length">
          <div class="block" v-for="announcement in announcements">
            <img src="../../assets/images/yt-avatar.png" width="44" height="44" />
            <span class="info dl">
              <p class="h5"><span>公告</span><span>{{ announcement.created_at }}</span></p>
              <p class="h4">{{ announcement.title }}</p>
              <p class="content">{{ announcement.content }}</p>
              <p class="by">---亚太娱乐运营团队</p>
            </span>
          </div>
        </div>
        <div v-else-if="!loading" class="error-all"></div>
      </div>
      <div v-if="currentIndex === 1">
        <div v-if="notifications && notifications.length">
          <div class="block" v-for="notification in notifications">
            <img src="../../assets/images/yt-avatar.png" width="44" height="44" />
            <span class="info dl">
              <p class="h5"><span>消息</span><span>{{ notification.created_at }}</span><button class="hand fr" @click="handleDeleteNotify(notification.id)">删除</button></p>
              <p class="h4">{{ notification.title }}</p>
              <p class="content">{{ notification.content }}</p>
              <p class="by">---亚太娱乐运营团队</p>
            </span>
          </div>
        </div>
        <div v-else-if="!loading" class="error-all"></div>
      </div>
      <div v-if="currentIndex === 2">
        <div>
          <div class="block" v-for="(promotion, index) in promotions">
            <img src="../../assets/images/yt-avatar.png" width="44" height="44" />
            <span class="info dl">
              <p class="h5"><span>活动</span></p>
              <p class="content hand" @click="goPromotions(index)">{{ promotion }}<a>点击查看</a></p>
              <p class="by">---亚太娱乐运营团队</p>
            </span>
          </div>
        </div>
      </div>
    </div>
    <loading :loading="loading" v-if="loading"></loading>
  </div>
</template>

<script>
import Loading from "@/components/Shared/Loading.vue";

export default {
  data() {
    return {
      notifications: "",
      announcements: "",
      loading: true,
      currentIndex: 0,
      menuDatas: ["官方公告", "我的消息", "最新活动"],
      promotions: [
        "诚意亚太十重礼 千万奖金乐不停",
        "亚太打虎攻略 四重礼包玩转千款老虎机",
        "豪情亚太百家乐 30%高额红利保你过三关",
        "亚太鱼雷发射 金鲨巨龙绝不漏网",
        "亚太极乐宝典 签到抽奖福利好礼不打烊"
      ]
    };
  },
  computed: {
    unreadNotificationCount() {
      return this.$store.state.sundry.unreadNotificationCount;
    }
  },
  mounted() {
    this.getAnnouncements();
  },
  components: { Loading },
  methods: {
    changeShow(n) {
      this.currentIndex = n;
      if (n === 0) {
        this.getAnnouncements();
      } else if (n === 1) {
        this.readAll();
        this.getNotifications();
      }
    },
    goPromotions(n) {
      this.$router.push({ name: "Activity", params: { category: n } });
    },
    readAll() {
      this.api.postNotifyReadAll().then(res => {
        this.$store.commit("UNREAD_NOTIFICATION_COUNT", 0);
      });
    },
    deleteAll() {
      let _this = this;
      this.$confirm("您确定要删除【我的消息】全部信息?", "确认删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _this.api.postNotifyDestroyAll().then(() => {
          this.getNotifications();
          this.$message({
            type: "success",
            message: "删除成功"
          });
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    },
    detail(notificationId) {
      this.$router.push({name: "NotificationDetail", params: {notificationId}});
    },
    getAnnouncements() {
      this.loading = true;
      this.api.getAnnouncement().then((res) => {
        this.announcements = res.data.items;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    getNotifications() {
      this.loading = true;
      this.api.getNotifications().then((res) => {
        this.notifications = res.data.items;
        this.$store.commit("UNREAD_NOTIFICATION_COUNT", res.data.unread_count);
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    handleDeleteNotify(id) {
      let _this = this;
      this.$confirm("您确定要删除此条消息?", "确认删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _this.api.deleteNotify(id).then(() => {
          this.getNotifications();
          this.$message({
            type: "success",
            message: "删除成功"
          });
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.menu {
  padding: 10px 0px;
  padding-right: 85px;
  border-bottom: 3px solid $color-yellow13;
  margin: 20px 0px;
  .red {
    background-color: $color-yellow1;
    color: $color-white;
    border-radius: 50%;
    padding: 1px 5px;
  }
  .notify-number {
    position: relative;
    right: 43px;
    top: -8px;
  }
  .all-delete {
    background-color: $color-yellow13;
    color: $color-white;
    padding: 5px 15px;
    border-radius: 15px;
  }
  .span {
    color: $color-white;
    font-size: $font-h4;
    font-weight: bold;
    padding: 0px 40px;
  }
  .active {
    color: $color-yellow13;
  }
  i {
    font-style: normal;
    display: inline-block;
    width: $px;
    height: 10px;
    background-color: $color-blue9;
  }
}
.title-h1 {
  color: $color-white;
  margin-bottom: 20px;
  span {
    font-size: $font-h;
    &:first-of-type {
      font-weight: bold;
      padding-right: 3px;
    }
    &:last-of-type {
      font-weight: bold;
    }
  }
}
.error-all {
  display: block;
  margin: 10px auto;
}
.notification {
  width: $min-width;
  margin: 0 auto;
  padding-right: 20px;
}
.blocks {
  background-color: $color-blue9;
  padding: 30px 40px;
  padding-bottom: 100px;
  .block {
    border-bottom: $px solid $color-blue8;
    padding-bottom: 10px;
    margin-bottom: 20px;
    img {
      vertical-align: top;
    }
    .info {
      padding-left: 20px;
      width: 90%;
      p {
        padding-bottom: 10px;
      }
      .h5 {
        color: $color-yellow13;
        span {
          &:first-of-type
          {
            font-weight: bold;
            font-size: $font-h4;
            padding-right: 30px;
          }
        }
        button {
          background-color: $color-yellow13;
          border: none;
          color: $color-blue9;
          border-radius: 10px;
          padding: 2px 15px;
        }
      }
      .h4 {
        color: $color-white;
        font-size: $font-h4;
        font-weight: bold;
      }
      .content {
        color: $color-white;
        a {
          margin-left: 10px;
          color: $color-yellow13;
          font-size: $font-h5;
          font-weight: normal;
          padding: 5px 20px;
          border: $px solid $color-yellow13;
          border-radius: 20px;
          &:hover {
            color: $color-blue9;
            background-color: $color-yellow13;
          }
        }
      }
      .by {
        color: $color-gray3;
      }
    }
  }
}
</style>
