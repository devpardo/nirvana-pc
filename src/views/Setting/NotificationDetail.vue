<template lang="html">
  <div class="notification">
    <div class="title-h1">
      <span class="h1" v-if="$route.name === 'AnnouncementDetail'">我的公告</span>
      <span class="h1" v-else-if="$route.name === 'NotificationDetail'">我的消息</span>
      <span class="sign dl"></span>
      <span class="fr hand" @click="go()" v-if="$route.name === 'NotificationDetail'"><span class="fa">{{ back }}</span><span>返回</span></span>
    </div>
    <div class="content" v-if="detail">
      <p class="title">{{ detail.title }}</p>
      <p class="h2">尊敬的用户:</p>
      <pre class="info">{{ detail.content }}</pre>
      <p class="date">{{ detail.created_at }}</p>
    </div>
    <loading :loading="loading" v-else-if="loading"></loading>
  </div>
</template>

<script>
import Loading from "@/components/Shared/Loading.vue";

export default {
  data() {
    return {
      back: this.$fontawesome("mail-reply"),
      detail: "",
      loading: true
    };
  },
  mounted: function() {
    this.fetchData();
  },
  components: { Loading },
  methods: {
    go() {
      this.$router.push({ name: "Notifications" });
    },
    fetchData() {
      if (this.$route.name === "AnnouncementDetail") {
        if (this.$route.params.announcementId) {
          this.loading = true;
          this.api.getAnnouncementDetail(this.$route.params.announcementId).then((res) => {
            this.detail = res.data;
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
        }
      } else if (this.$route.name === "NotificationDetail") {
        if (this.$route.params.notificationId) {
          this.loading = true;
          this.api.getNotifyDetail(this.$route.params.notificationId).then((res) => {
            this.detail = res.data;
            this.handleNotifyRead(this.$route.params.notificationId);
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
        }
      }
    },
    handleNotifyRead(id) {
      this.api.postNotifyRead(id).then((res) => {
      }).catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.notification {
  width: 1200px;
  background-color: $color-white;
  margin: 0 auto;
}
.title-h1 {
  .h1 {
    font-size: $font-h1;
  }
  padding-bottom: 10px;
  border-bottom: $px solid $color-gray8;
  text-align: left;
  padding: 0px 10px;
  padding-top: 20px;
  padding-bottom: 10px;
  position: relative;
  .sign {
    width: 100px;
    height: 2px;
    background-color: $color-red2;
    position: absolute;
    left: 0px;
    bottom: 0px;
    &:before {
      content: '';
      border-bottom: 5px solid $color-red2;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      position: absolute;
      bottom: 2px;
      left: 47px;
    }
  }
}
.content {
  padding: 20px;
  padding-bottom: 100px;
  .title {
    font-size: $font-h1;
    text-align: center;
  }
  .h2, .info, .date {
    font-size: $font-h4;
  }
  .h2 {
    text-align: left;
  }
  .date {
    text-align: right;
  }
  .info {
    text-align: justify;
    width: 80%;
    margin: 20px auto;
    white-space:pre-wrap;
  }
}
</style>
