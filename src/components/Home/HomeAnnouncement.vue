<template>
  <div class="content">

    <div class="notifications-list" v-if="announcementFlag && announcement">

      <span class="icon">
        <i class="fa fa-volume-off"></i>
      </span>

      <ul class="notification-marquee">
        <li>
          <marquee>
            <a>{{ announcement.content }}</a>
          </marquee>
        </li>
      </ul>

      <a class="close" @click="closeTicker()">
        <span>+</span>
      </a>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "HomeAnnouncement",
    data() {
      return {
        announcement: null,
        announcementFlag: false
      };
    },
    async mounted() {
      await this.fetchHomeAnnouncements();
    },
    directives: {
      scroll: {
        bind: (el) => {
          Vue.nextTick(() => {
            let scrollWidth = screen.width - 40
            let tempWidth = scrollWidth
            function getInterval () {
              el.widthIntervalTime = setInterval(() => {
                tempWidth = -1 + tempWidth
                if (tempWidth < -el.clientWidth) {
                  el.style.left = scrollWidth + 'px'
                  tempWidth = scrollWidth
                } else {
                  el.style.left = tempWidth + 'px'
                }
              }, 20)
            }
            if (el.clientWidth > scrollWidth) {
              el.style.left = scrollWidth + 'px'
              getInterval()
            }
          })
        },
        unbind: (el) => {
          if (el.widthIntervalTime) {
            window.clearInterval(el.widthIntervalTime)
          }
        }
      }
    },
    methods: {
      async fetchHomeAnnouncements() {
        const res = await this.api.getHomeAnnouncement();
        this.announcementFlag = true;
        this.announcement = res.data.announcement;
      },
      closeTicker() {
        this.announcementFlag = false;
      },
      goToActivity(idx) {
        this.$router.push({ name: "Activity", params: { category: idx } });
      }
    }
  };
</script>

<style lang="sass" scoped>

@import "../../assets/stylesheets/public.scss";

=keyframes($name)
  @-webkit-keyframes #{$name}
    @content
  @-moz-keyframes #{$name}
    @content
  @-ms-keyframes #{$name}
    @content
  @keyframes #{$name}
    @content

.content
  background-color: $color-yellow6
  .notifications-list
    position: relative
    display: block
    margin: 0 auto
    width: 1280px
    background-color: $color-yellow6
    padding: 12px 0 12px 12px
    overflow: hidden
    box-sizing: border-box;

    .icon
      position: absolute
      background-color: $color-yellow6
      height: 100%
      width: 40px
      top: 0
      left: 0
      z-index: 2
      text-align: center
      padding-top: 12px
      i
        font-size: 16pt;


    .notification-marquee
      height: 20px
      white-space: nowrap

      li
        display: inline-block
        margin-right: 20px
      marquee
        cursor: pointer
        color: $color-blue7
        text-decoration: none
        display: block
        width: 1280px

    .notification-marquee:hover
      animation-play-state: paused

    .close
      display: block
      text-align: center
      cursor: pointer
      position: absolute
      color: #4A4A4A
      right: 0
      top: 0
      height: 100%
      width: 30px;
      background: $color-yellow6;
      span
        display: block
        height: 20px
        width: 20px
        transform: rotate(45deg)
        font-size: 16pt
        text-transform: initial
        margin-top: -6px
        margin-left: 15px

+keyframes(marquee)
  0%
    transform: translate(0, 0)
  100%
    transform: translate(-100%, 0)


</style>
