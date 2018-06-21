<template>
  <div class="casino">
    <div class="casino-header">
    </div>
    <div class="content-container">
      <div class="content">
        <div class="casino-box" v-for="(item, index) of casinos" :key="index">
          <img :src="item.banner" alt="" class="img-casino" @click.self.stop="open(item.code)">
          <div class="casino-box-details">
            <div :class="`casino-title-${item.color}`"> {{ item.title }}</div>
            <div class="casino-desc">
              <p>{{ item.desc1 }}</p>
              <p>{{ item.desc2 }}</p>
            </div>
            <div class="casino-button">
              <button class="btn btn-casino" @click.self.stop="open(item.code)">{{ item.button_name }}</button>
            </div>
            <div class="casino-links">
              <button class="btn-links" v-for="(casinoLink, index) of item.casinoLinks" :key="index" @click.self.stop="launch(casinoLink.gid)">
                {{casinoLink.name}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    data() {
      return {
        loading: false,
        casinos: [
          {
            id: "1",
            banner: "/static/casino/banner1.png",
            title: "AG国际厅",
            desc1: "95%百家乐客户力荐平台",
            desc2: "6大特点、赢钱机会绝不错过",
            color: "orange",
            button_name: "AG百家乐国际厅",
            code: "ag",
            gid: "G2017091873109900311",
            game_type: "live_casino",
            casinoLinks: [
              {
                name: "龙虎",
                gid: "G2017091874704010311",
                taxonomyId: 13,
                code: "ag"
              },
              {
                name: "骰宝",
                gid: "G2017091886779010311",
                taxonomyId: 9,
                code: "ag"
              },
              {
                name: "牛牛",
                gid: "G2017091857723010311",
                taxonomyId: 14,
                code: "ag"
              }
            ]
          },
          {
            id: "2",
            banner: "/static/casino/banner2.png",
            title: "太阳城贵宾厅",
            desc1: "玩家可听到荷官对话",
            desc2: "游戏品种多，画面贴近实地赌场",
            color: "yellow",
            button_name: "SUNBET百家乐",
            code: "tgp",
            gid: "G2018051854704932501",
            game_type: "live_casino",
            casinoLinks: [
              {
                name: "龙虎",
                gid: "G2018051825614932501",
                taxonomyId: 13,
                code: "tgp"
              },
              {
                name: "骰宝",
                gid: "G2018051825344932501",
                taxonomyId: 9,
                code: "tgp"
              },
              {
                name: "牛牛",
                gid: "G2018051856837932501",
                taxonomyId: 14,
                code: "tgp"
              }
            ]
          }
        ],
        Detail: {}
      };
    },
    computed: {
      ...mapGetters(["auth"]),
      loginFlag: function() {
        return this.$store.state.sundry.loginFlag;
      }
    },
    methods: {
      debug() {
        alert("dsadas");
      },
      launch(gid) {
        //this.load.flag = true;
        this.api
          .postLaunch(gid)
          .then(res => {
            if (res.data && res.data.game_url) {
              window.open(res.data.game_url);
            } else {
              this.$message({
                message: "获取链接失败",
                type: "warning"
              });
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
        // if (this.Detail.maintain_at || !this.Detail.enabled) { return; }
        // this.load.flag = true;
        if(!this.auth) {
          this.$store.dispatch("setLoginFlag", true);
          this.$router.push({name: "Home"});
        }
        else {
          this.api
          .launchCasino(gid)
          .then(res => {
            console.log('----- result: ', res);
            if (res.data && res.data.launch_url) {
              window.open(res.data.launch_url);
            } else {
              this.$message({
                message: "获取链接失败",
                type: "warning"
              });
            }
            // this.load.flag = false;
          })
          .catch(() => {
            // this.load.flag = false;
            this.$message({
              message: "获取链接失败",
              type: "warning"
            });
          });
        }
      }
    }
  };
</script>

<style  lang="scss" scoped>
  @import "../assets/stylesheets/public";

  .casino {
    font-family: "Microsoft Yahei";
    min-width: $min-width;
    margin-top: 95px;
    background-color: $color-blue8;
    .casino-header {
      display: inline-block;
      width: 100%;
      height: 320px;
      background-image: url("/static/casino/header.png");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .content-container {
      // background-color: $color-blue9;
      width: 100%;
      margin-top: -4px;
    }

    .content {
      width: $min-width;
      margin: 0px auto;
      padding: 20px 0 20px 20px;
      .casino-box {
        display: inline-block;
        background-color: #010421;
        width: 49%;
        overflow: auto;
        &:nth-child(1) {
          margin-right: 20px;
        }
        .img-casino {
          float: left;
        }
        &:hover {
          cursor: pointer;
        }
        .casino-box-details {
          width: 40%;
          display: inline-block;
          padding: 10px 29px;

          .casino-title-orange {
            color: white;
            font-size: 22px;
            margin-bottom: 10px;
          }
          .casino-title-orange:after {
            content: "";
            display: block;
            width: 40%;
            padding-top: 10px;
            border-bottom: 3px solid #ff6600;
          }
          .casino-title-yellow {
            color: white;
            font-size: 22px;
            margin-bottom: 10px;
          }
          .casino-title-yellow:after {
            content: "";
            display: block;
            width: 40%;
            padding-top: 10px;
            border-bottom: 3px solid #f0b221;
          }
          .casino-desc {
            color: #767677;
            p {
              margin: 5px 0;
              font-size: 12px;
            }
          }
          .casino-button {
            button.btn.btn-casino {
              border: 1px solid #4bbafd;
              background: transparent;
              color: white;
              margin: 15px 0 10px;
              border-radius: 4px;
              padding: 10px;
              width: 184px;
              font-size: 14px;
              cursor: pointer;
            }
          }
          .casino-links {
            button.btn-links {
              border: 1px solid #e89a3f;
              background: transparent;
              color: white;
              padding: 7px 13px;
              border-radius: 4px;
              margin: 0 2px;
              font-size: 13px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
