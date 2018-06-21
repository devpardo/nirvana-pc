<template>
  <div class="aside-container">

    <div class="aside-item" @click="showPromo">
      <div class="aside-holder promo-trigger">
        <img src="/static/trigger.png" alt="">
        <span class="aside-holder-text">最新</span>
      </div>
    </div>

    <div v-if="auth" class="aside-item" @click="gotoCoupons">
      <div class="aside-holder coupon">
        <img src="/static/coupon.png" alt="">
        <span class="aside-holder-text">优惠</span>
        <span class="badge" v-if="hasCoupons"></span>
      </div>
    </div>

    <div v-if="auth" class="aside-item" @click="gotoRebates">
      <div class="aside-holder rebate">
        <img src="/static/rebate.png" alt="">
        <span class="aside-holder-text">返水</span>
        <span class="badge" v-if="hasRebates"></span>
      </div>
    </div>

    <div v-if="auth" class="aside-item" @click="gotoTask">
      <div class="aside-holder task">
        <img src="/static/task.png" alt="">
        <span class="aside-holder-text">任务</span>
        <span class="badge" v-if="hasQuests"></span>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "AsideLeft",
    data() {
      return {
        count: null
      };
    },
    computed: {
      ...mapGetters(["auth"]),
      hasRebates() {
        return !!(this.count && this.count.unreceived_rebates_count);
      },
      hasQuests() {
        return !!(this.count && this.count.unreceived_quests_count);
      },
      hasCoupons() {
        // return !!(this.count && this.count.coupons_count &&);
        return !!(this.count && this.count.unread_coupons_count);
      }
    },
    methods: {
      gotoRebates() {
        this.$router.push({ name: "Rebate" });
      },
      gotoCoupons() {
        // if (!this.hasCoupons) return;
        this.$router.push({ name: "Coupon" });
      },
      gotoTask() {
        this.$router.push({ name: "Award" });
      },
      showPromo() {
        this.$store.commit("SET_MODAL", {
          key: "promo",
          value: true
        });
      }
    },
    async mounted() {
      const { data } = await this.api.getNotificationsCount();
      this.count = data;
      console.log(data);
    }
    // async mounted() {
    //   //await this.$store.dispatch("subscribeRebates");
    //   const { items: platforms, rebates_received } = await this.$store.dispatch(
    //     "getRebates"
    //   );
    //   this.rebates.items = platforms.reduce((rebates, platform) => {
    //     rebates.push(...platform.rebates);
    //     // console.log(platform);
    //     return rebates;
    //   }, []);
    //   this.rebates.received = rebates_received;
    //   const { items: coupons } = await this.$store.dispatch("getCoupons");
    //   this.coupons = coupons;
    // }
  };
</script>

<style lang="sass" scoped>

  .aside
    &-container
      position: fixed;
      top: 60%;
      left: 0;
      z-index: 2000;

    &-item
      position: relative;
      width: 50px;
      height: 50px
      text-align: center;
      display: table;
      color: #ffffff;
      margin-bottom: 5px;

    &-holder
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      display: table-cell;
      vertical-align: middle;
      cursor: pointer;
      img, span
        margin: 0 auto
        display: block

      img
        width: 20px

      .aside-holder-text
        font-weight: initial;
        font-size: 9pt;

    &-holder.promo-trigger
      background: #00adf5

    &-holder.coupon
      background: #F0B012

    &-holder.rebate
      background: #6721BF

    &-holder.task
      background: #00ABBB

  .badge
    position: absolute;
    top: 3px;
    right: 10px;
    background: #FF0033
    color: white;
    border-radius: 50%
    height: 10px;
    width: 10px;
    font-size: 7px;
    line-height: 10px;
</style>
