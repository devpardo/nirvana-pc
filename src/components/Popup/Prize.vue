<template lang="html">
  <div>
    <div v-if="flags.index">
      <div class="prize hand" @click="go()">
        <img src="./images/redenvelope.png" width="100%" height="100%"/>
        <span class="img hand" @click.stop="flags.index = false"><img src="./images/web_close.png" width="100%" height="100%"/></span>
      </div>
    </div>
    <div class="prize-mask" v-if="flags.prize || flags.win || flags.unfortunately">
      <index v-if="flags.prize" :flags="flags" class="content"></index>
      <win v-if="flags.win" class="content" :flags="flags"></win>
      <unfortunately v-if="flags.unfortunately" class="content" :flags="flags"></unfortunately>
    </div>
  </div>
</template>

<script>
import Index from "@/components/Popup/Index.vue";
import Win from "@/components/Popup/Winning.vue";
import Unfortunately from "@/components/Popup/Unfortunately.vue";

export default {
  data() {
    return {
      flags: {
        index: true,
        prize: false,
        win: false,
        unfortunately: false,
        redPacket: ""
      }
    };
  },
  components: { Win, Unfortunately, Index },
  computed: {
    email: function() {
      return this.$store.state.user.email;
    }
  },
  methods: {
    go() {
      if (this.email) {
        this.flags.prize = true;
      } else {
        this.$message({
          message: "请您先登录，才能参与抢红包哦",
          type: "info"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.prize-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  .content {
    position: fixed;
    top: 5%;
    left: 40%;
  }
}
.prize {
  width: 136px;
  height: 159px;
  position: relative;
  z-index: 40;
  .img {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 15px;
    height: 15px;
    display: inline-block;
  }
}
</style>
