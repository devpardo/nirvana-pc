<template lang="html">
  <div class="chat">
    <div class="chat-shrink hand" v-show="!chatInfo && !chat" @click="toggleInfo()">
      <p class="comments fa">{{ comments }}</p>
      <p class="title">联系我们</p>
    </div>

    <div class="chat-middle" v-show="chatInfo && !chat">
      <span class="chat-middle-left hand dl" @click="toggleInfo()">
        <p class="comments fa">{{ comments }}</p>
        <p class="title">点击收起</p>
      </span>
      <span class="chat-middle-right dl">
        <!-- <p class="line hand" @click="toggle()" v-if="email"> -->
        <p class="line hand" @click="liveChat()">
          <span class="fa">{{ comments }}</span><span>在线客服</span>
        </p>
        <!--<span class="fa">{{ qq }}1852531034</span>-->
        <p class="line hand"><a target="_blank" href="https://wpa.qq.com/msgrd?v=3&uin=1852531034&site=qq&menu=yes"><img border="0" src="https://wpa.qq.com/pa?p=2:1852531034:51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a></p>
        <p class="call-center" v-if="!!auth" @click="!auth ? '' : $root.$emit('showCallCenter',true)"><span class="fa">{{ phone }}</span>电话回拨</p>
        <p class="line"><span class="fa">{{ phone }}</span>15681142673</p>
        <div class="code">
          <p>扫码加好友</p>
          <p>订阅最新资讯</p>
          <img src="../../assets/images/wechat.jpg" width="100" height="100"/>
        </div>
      </span>
      <!--<span class="chat-middle-right dl">-->
        <!--<p class="line hand" @click="toggle()" v-if="email">-->
          <!--<span class="fa">{{ comments }}</span><span>在线客服</span>-->
          <!--<span v-if="unreadMessageCount && unreadMessageCount <= 99">-->
            <!--<span class="super more dl">{{ unreadMessageCount }}</span>-->
          <!--</span>-->
          <!--<span v-if="unreadMessageCount && unreadMessageCount > 99">-->
            <!--<span class="super more dl">99<span class="super">+</span></span>-->
          <!--</span>-->
        <!--</p>-->
        <!--<p class="line"><span class="fa">{{ qq }}</span>(暂无)</p>-->
        <!--<p class="line"><span class="fa">{{ phone }}</span>15681142673</p>-->
        <!--<div class="code">-->
          <!--<p>扫码加好友</p>-->
          <!--<p>订阅最新资讯</p>-->
          <!--<img src="../../assets/images/wechat.jpg" width="100" height="100"/>-->
        <!--</div>-->
      <!--</span>-->
    </div>

    <div class="chat-unfold" v-show="chat">
      <span class="chat-unfold-left hand dl" @click="close()">
        <p class="comments fa">{{ call }}</p>
        <p class="title">点击收起</p>
      </span>
      <p class="head">
        <span class="title fl"><span class="fa">{{ comments }}</span>亚太客服</span>
        <span class="close fa hand dl fr" @click="toggle()">{{ expand }}</span>
      </p>
      <div class="chat-content">
        <div class="chat-info" v-scroll="chatLines" @scroll="viewScroll($event)">
          <p class="more-data no-more hand" v-if="noMoreMessages">没有更多数据了</p>
          <p class="more-data more hand" v-else><span @click="fetchNexPageChatLine()">点击加载更多</span></p>
          <div v-for="message in chatLines" v-if="message.cate != 'cate_object'">
            <div class="left" v-if="!isSelf(message)">
              <p class="date"><span>{{ message.created_at | date('yyy-MM-dd HH:mm:ss') }}</span></p>
              <p class="margin-bottom">{{ message.sender && message.sender.nickname }}: </p>
              <span class="img top dl"><img width="100%" height="100%" :src="message.sender && message.sender.aws_url" /></span>
              <span class="info green dl">{{ message.content || '[]' }}</span>
            </div>
            <div class="right" v-else>
              <p class="date margin-bottom"><span>{{ message.created_at | date('yyy-MM-dd HH:mm:ss') }}</span></p>
              <span class="info blue dl">{{ message.content || '[]' }}</span>
              <span class="img top dl"><img width="100%" height="100%" :src="userAvatar" /></span>
            </div>
          </div>
          <div class="clearfix" id="scroll"></div>
        </div>
      </div>
      <div class="chat-input">
        <textarea class="dl" v-model="chatContent" @click="focus()"/>
        <button class="button hand fa dl" :disabled="!currentChat || !currentCustomer" @click="handleSentMessage">{{ plane }}</button>
      </div>
      <div class="align_center fa">{{ align_center }}</div>
    </div>

    <div class="hand download" @click="toggleDownloadModal()">
      <p class="comments fa">{{ download }}</p>
      <p class="title">下载中心</p>
    </div>

  </div>
</template>

<script>
  import Vue from "vue";
  import "@/libs/filters";
  import { mapState, mapGetters } from "vuex";

  export default {
    data() {
      return {
        window: this.$fontawesome("window-maximize"),
        call: this.$fontawesome("volume-control-phone"),
        comments: this.$fontawesome("comments"),
        download: this.$fontawesome("download"),
        qq: this.$fontawesome("qq"),
        phone: this.$fontawesome("phone"),
        expand: this.$fontawesome("expand"),
        plane: this.$fontawesome("paper-plane"),
        align_center: this.$fontawesome("align-center"),
        chatInfo: false,
        chat: false,
        topStatus: "",
        onlineCustomers: [],
        currentCustomer: null,
        userAvatar: this.$store.state.user.aws_url,
        chatContent: "",
        chatLines: [],
        query: {
          page: 0,
          per_page: 10
        },
        chatLinePaginateMeta: null
      };
    },
    computed: {
      ...mapState({
        currentChat: state => state.chat.currentChat,
        cable: state => state.chat.cable
      }),
      ...mapGetters(["auth"]),
      noMoreMessages() {
        return (
          this.chatLinePaginateMeta &&
          (this.chatLinePaginateMeta.total_pages === this.query.page ||
            this.chatLinePaginateMeta.total_pages === 0)
        );
      },
      chatLoading: function() {
        return !this.noMoreMessages;
      },
      unreadMessageCount() {
        return (
          this.$store.state.chat.currentChat &&
          this.$store.state.chat.currentChat.user_unread_count
        );
      },
      email: function() {
        return this.$store.state.user.email;
      }
    },
    watch: {
      onlineCustomers(newVal) {
        this.updateChatAdmin();
      },
      currentChat(newVal, oldVal) {
        if (newVal && !oldVal) {
          this.updateChatAdmin();
          this.fetchNexPageChatLine();
        }
      },
      chat(newVal) {
        newVal && this.$store.dispatch("makeAllChatMessageRead");
      }
    },
    methods: {
      liveChat() {
        let { username } = this.$store.state.user;
        let info = encodeURIComponent(`userID=123&name=${username}&memo=`);
        window.open(
          `https://szzero.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=941750&configID=57299&jid=7182627055&s=1&info=${info}`,
          "_blank",
          `height=550,width=800,top=${(screen.height - 550) /
            2},left=${(screen.width - 800) /
            2},toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no`
        );
      },
      toggleInfo() {
        this.chatInfo = !this.chatInfo;
      },
      toggleDownloadModal() {
        this.$root.$emit("notice-download", true);
      },
      toggle() {
        this.chat = !this.chat;
        this.toggleInfo();
      },
      close() {
        this.chat = false;
        this.chatInfo = false;
      },
      fetchChat() {
        this.api
          .getOwnChat()
          .then(res => {
            this.$store.commit("SET_CHAT", res.data);
          })
          .catch(error => console.log(error));
      },
      fetchOnlineAdmins() {
        this.api
          .getOnlineCustomers()
          .then(res => {
            this.onlineCustomers = res.data.customers;
          })
          .catch(error => console.log(error));
      },
      fetchNexPageChatLine() {
        this.query.page += 1;
        this.api.getChatLines(this.currentChat.id, this.query).then(res => {
          this.chatLinePaginateMeta = res.data.paginate_meta;
          this.chatLines = res.data.chat_lines
            .reverse()
            .concatUniq(this.chatLines, "id");
          //        this.$nextTick(() => {
          //          console.log('--------=')
          //          document.getElementById('scroll').scrollIntoView(true)
          //        }, 3000)
          // 建立消息订阅
          if (this.query.page === 1) {
            var that = this;
            let query = this.$route.query;
            this.ory =
              this.cable &&
              this.cable.subscriptions &&
              this.cable.subscriptions.create(
                { channel: "ChatLinesChannel", chat_id: that.currentChat.id },
                {
                  connected() {
                    if (query && query.type) {
                      setTimeout(() => {
                        this.sendMessage(
                          JSON.stringify({
                            type: query.type,
                            typeId: query.typeId
                          }),
                          "cate_object"
                        );
                      }, 1000);
                    }
                  },
                  received(data) {
                    that.chatLines.push(data);
                    if (this.chat) {
                      this.mark_chat_line_read(data);
                    }
                  },
                  sendMessage(message, cate = "cate_text") {
                    this.perform("send_message", {
                      message,
                      cate,
                      chat_id: that.currentChat.id,
                      receiver_id: that.currentChat.user_id
                    });
                  },
                  mark_chat_line_read(data) {
                    this.perform("mark_chat_line_read", {
                      chat_line_id: data.id
                    });
                  }
                }
              );
          }
        });
      },
      handleSentMessage() {
        if (this.chatContent.match(/^\s*$/)) {
          this.$message({
            message: "不能发送空白消息",
            type: "error"
          });
          return;
        } else {
          this.ory && this.ory.sendMessage(this.chatContent);
          this.chatContent = "";
        }
      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      isSelf(message) {
        return message.sender_id === this.currentChat.user.id;
      },
      loadTop() {
        if (this.noMoreMessages) {
          this.$refs.loadmore.onTopLoaded();
          return;
        }
        this.fetchNexPageChatLine();
      },
      focus() {
        document.getElementById("scroll").scrollIntoView(true);
      },
      updateChatAdmin() {
        if (this.currentChat && this.onlineCustomers.length) {
          let exist = false;
          this.onlineCustomers.forEach(customer => {
            if (customer.id === this.currentChat.admin_id) {
              this.currentCustomer = customer;
              exist = true;
            }
          });
          if (!exist) {
            let randomIndex = parseInt(
              Math.random() * this.onlineCustomers.length
            );
            let currentCustomer = this.onlineCustomers[randomIndex];
            this.api
              .updateChatInfo({ admin_id: currentCustomer.id })
              .then(res => {
                this.currentCustomer = currentCustomer;
              });
          }
        }
      },
      viewScroll(event) {
        let el = event.target;
        el.nowScrollBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      }
    },
    mounted() {
      if (this.currentChat) {
        this.fetchNexPageChatLine();
      } else {
        this.fetchChat();
      }
      this.fetchOnlineAdmins();
    },
    beforeDestroy() {
      this.cable && this.cable.subscriptions.remove(this.ory);
    },
    directives: {
      scroll: {
        componentUpdated: function(el) {
          Vue.nextTick(function() {
            // el 对应上面的scroll绑定的el
            if (el.nowScrollBottom < 100 || !el.nowScrollBottom) {
              document.getElementById("scroll").scrollIntoView(true);
            } else {
              el.scrollTop = `${el.scrollHeight -
                el.clientHeight -
                el.nowScrollBottom}`;
            }
          });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .clearfix {
    height: $px;
  }
  .chat {
    .download,
    .chat-shrink,
    .chat-middle-left,
    .chat-unfold-left {
      color: $color-blue6;
      width: 36px;
      height: 120px;
      text-align: center;
      padding: 10px;
      background-color: $color-yellow13;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      .comments {
        font-size: $font-h3;
      }
    }
    .download {
      margin-top: 10px;
      position: absolute;
      right: 0;
    }
    .chat-middle-left {
      position: absolute;
      right: 140px;
    }
    .chat-middle-right {
      width: 140px;
      padding: 10px;
      background-color: $color-yellow13;
      color: $color-blue6;
      border-bottom-left-radius: 5px;
      .line {
        padding: 10px 0px;
        .super {
          vertical-align: super;
        }
        .more {
          padding: 0px 4px;
          background-color: $color-white;
          color: $color-red9;
          border-radius: 50%;
          margin-left: 2px;
        }
        .fa {
          font-size: $font-h3;
          padding-right: 5px;
        }
        border-bottom: $px solid $color-yellow;
      }
      .call-center{
        padding: 10px 0px;
        cursor: pointer;
        border-bottom: $px solid $color-yellow;
        .fa {
          font-size: $font-h3;
          padding-right: 5px;
        }
      }
      .code {
        padding: 10px 0px;
        text-align: center;
        img {
          margin-top: 10px;
          margin-right: 10px;
        }
      }
    }
    .chat-unfold-left {
      position: absolute;
      right: 400px;
    }
    .chat-unfold {
      width: 400px;
      padding: 0px 10px;
      background-color: $color-red9;
      border-bottom-left-radius: 8px;
      .head {
        width: 100%;
        height: 42px;
        line-height: 48px;
        padding-right: 10px;
        color: $color-white;
        .title {
          .fa {
            font-size: $font-h3;
            padding-right: 5px;
          }
        }
        .close {
          font-size: $font-h3;
          padding-top: 18px;
        }
      }
      .chat-content {
        padding: 20px 10px;
        background-color: $color-white;
        border-radius: 5px;
        height: 350px;
        .date {
          color: $color-gray5;
        }
      }
      .chat-info {
        height: 300px;
        overflow-y: scroll;
        .margin-bottom {
          margin-bottom: 6px;
        }
        .left,
        .right {
          color: $color-black;
          margin-top: 10px;
          width: 100%;
        }
        .img {
          width: 40px;
          height: 40px;
        }
        .top {
          vertical-align: middle;
        }
        .more-data {
          text-align: center;
          margin: 10px auto;
        }
        .no-more {
          color: $color-gray3;
        }
        .more {
          color: $color-black;
        }
        .left {
          text-align: left;
        }
        .right {
          text-align: right;
          padding-right: 10px;
        }
        .green {
          background-color: $color-green;
          margin-left: 10px;
          &:before {
            left: -5px;
            border-right: 5px solid $color-green;
          }
        }
        .blue {
          margin-right: 15px;
          background-color: $color-blue4;
          color: $color-white;
          &:before {
            right: -5px;
            border-left: 5px solid $color-blue4;
          }
        }
        .info {
          padding: 5px 15px;
          border-radius: 5px;
          max-width: 288px;
          vertical-align: top;
          position: relative;
          text-align: justify;
          @extend .break-word;
          &:before {
            position: absolute;
            content: "";
            border-top: 4px solid transparent;
            border-bottom: 4px solid transparent;
            top: 33%;
          }
        }
      }
    }
    .chat-input {
      margin-top: 10px;
      position: relative;
      textarea,
      .button {
        vertical-align: middle;
      }
      textarea {
        width: 380px;
        height: 45px;
        border-radius: 5px;
        padding-right: 30px;
        border: $px solid $color-gray7;
      }
      .button {
        position: absolute;
        right: 10px;
        bottom: 10px;
        margin-left: 10px;
        color: $color-blue;
        padding: 0px;
        font-size: $font-h;
        border: none;
      }
    }
    .align_center {
      text-align: center;
      color: $color-white;
      padding: 10px 0px;
    }
  }
</style>
