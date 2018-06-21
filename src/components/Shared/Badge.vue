<template lang="html">
  <div class="badge">
    <span>
      <span class="envelope hand fa" @click="message(1)">{{ envelope }}</span>
      <span class="number hand dl" v-if="unreadTotalCount">{{ unreadTotalCount }}</span>
      <!--<span class="number dl">99<sup>+</sup></span>-->
      <!--<span class="message" v-show="flag">
        <ul>
          <li @click="message(1)" class="hand">我的消息<span class="yellow2" v-if="unreadNotificationCount">{{unreadNotificationCount}}<sup v-if="unreadNotificationCount > 99">+</sup></span></li>
          <li @click="message()">
            <p>客服来信<span class="yellow2" v-if="unreadMessageCount">{{ unreadMessageCount || 0 }}</span><span class="yellow2" v-if="unreadMessageCount > 99">99<sup>+</sup></span></p>
            <p class="yellow"><span class="fa">{{ info_circle }}</span>请点击右下的【联系我们】查看客服信息</p>
          </li>
        </ul>
      </span>-->
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      envelope: this.$fontawesome("envelope"),
      info_circle: this.$fontawesome("info-circle"),
      flag: false
    };
  },
  computed: {
    unreadMessageCount() {
      return this.$store.state.chat.currentChat && this.$store.state.chat.currentChat.user_unread_count;
    },
    unreadNotificationCount() {
      return this.$store.state.sundry.unreadNotificationCount;
    },
    unreadTotalCount() {
      return this.unreadMessageCount + this.unreadNotificationCount;
    }
  },
  methods: {
    toggle() {
      this.flag = !this.flag;
    },
    getNotificationsUnreadCount() {
      this.api.getNotificationsUnreadCount().then(res => {
        this.$store.commit("UNREAD_NOTIFICATION_COUNT", res.data.unread_count);
      });
    },
    message(n) {
      this.toggle();
      if (n) { this.notifications(); }
    },
    notifications() {
      this.$router.push({ name: "Notifications" });
    }
  },
  mounted() {
    this.getNotificationsUnreadCount();
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.badge {
  position: relative;
  .message {
    position: absolute;
    top: 40px;
    left: -2px;
    line-height: normal;
    width: 120px;
    background-color: rgba(0, 0, 0, 0.7);
    color: $color-white;
    padding: 10px;
    border: $px solid rgba(0, 0, 0, 0.7);
    &:before {
      position: absolute;
      top: -8px;
      left: 22px;
      content: '';
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 8px solid rgba(0, 0, 0, 0.7);
    }
    li {
      padding: 10px 0px;
      .yellow {
        color: $color-yellow1;
        padding-top: 3px;
      }
      &:first-of-type {
        border-bottom: $px solid $color-white3;
      }
      .red {
        background-color: $color-red9;
        color: $color-white;
        border-radius: 50%;
        padding: 1px 5px;
        font-weight: bold;
        margin: 0px 4px;
      }
      .yellow2 {
        background-color: $color-yellow13;
        color: $color-blue9;
        border-radius: 50%;
        padding: 1px 5px;
        font-weight: bold;
        margin: 0px 4px;
      }
      .fa {
        padding-right: 3px;
        font-size: $font-h4;
        vertical-align: middle;
      }
    }
  }
  .envelope {
    font-size: $font-h4;
    color: $color-white;
  }
  .number {
    font-size: $font-h5;
    text-align: center;
    position: relative;
    top: -8px;
    right: 5px;
    background-color: $color-yellow13;
    padding: 0px 4px;
    border-radius: 20px;
    line-height: normal;
    color: $color-blue9;
    font-weight: bold;
  }
}
</style>
