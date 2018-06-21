<template>
  <div id="app">
    <!--<prize class="prize-all"></prize>-->
    <promo-modal v-if="promos.length" :value="promoModalValue" @input="onClosePromoModal" :promos="promos"></promo-modal>
    <notice-download v-model="modal.download"></notice-download>
    <call-center :show-call-center="showCallCenter"></call-center>
    <aside-left></aside-left>
    <p-header v-if="$route.name !== 'Notice'"></p-header>
    <router-view :style="{ 'min-height': minHeight + 'px' }" :key="routeKey"></router-view>
    <p-footer v-if="$route.name !== 'Notice'"></p-footer>
  </div>
</template>

<script>
  import PHeader from "@/components/Shared/Header.vue";
  import PFooter from "@/components/Shared/Footer.vue";
  import Prize from "@/components/Popup/Prize.vue";
  import AsideLeft from "@/components/Shared/AsideLeft.vue";
  import CallCenter from "@/components/Popup/CallCenter.vue";
  import NoticeDownload from "@/components/Shared/NoticeDownload.vue";
  import PromoModal from "@/components/Shared/PromoModal.vue";

  import { mapGetters } from "vuex";
  export default {
    name: "app",
    components: {
      PHeader,
      PFooter,
      Prize,
      AsideLeft,
      CallCenter,
      NoticeDownload,
      PromoModal
    },
    data() {
      return {
        minHeight: 0,
        showCallCenter: false,
        modal: {
          download: false,
          promotion: false
        },
        promos: []
      };
    },
    computed: {
      ...mapGetters(["auth"]),
      routeKey() {
        return `${this.$route.params.code}&${this.$route.query.random}`;
      },
      promoModalValue() {
          return this.$store.getters.modal("promo");
      }
    },
    watch: {
      "$route.query"(val) {
        if (!val) return;
        const { utm_source } = val;
        if (!utm_source) return;
        document.cookie = `utm_source=${utm_source}`;
        if (this.$route.name !== "Home") return;
        this.$router.push({ name: "Join", query: { utm_source } });
      },

      $route: "openPromoModal"

    },
    methods: {
      async onShowCallCenter(event) {
        this.showCallCenter = event;
        await this.api.requestCallback();
      },
      onClosePromoModal(value) {
        console.log(value);
        this.$store.commit("SET_MODAL", {
          key: "promo",
          value
        });
      },
      openPromoModal() {
        if(this.$route.name === "Home") {
          this.$store.commit("SET_MODAL", {
            key: "promo",
            value: true
          });
        }
      }

    },
    // async created() {
    //   if (this.auth) {
    //     await this.$store.dispatch("getWallets");
    //   }
    // },
    async mounted() {
      this.minHeight = window.screen.height - window.screen.height * 0.3 || 800;
      this.$root.$on("showCallCenter", this.onShowCallCenter);
      this.$root.$on("notice-download", val => {
        this.modal.download = val;
      });
      this.$root.$on("promo-modal", val => {
        this.modal.promotion = val;
      });

      const { data } = await this.api.getHomePopSuggests();
      this.promos = data;
      //await this.$nextTick();
      if (!this.promos.length) {
        return;
      }

      this.openPromoModal()



      // if (!localStorage.getItem("promo")) {
      //   this.$store.commit("SET_MODAL", {
      //     key: "promo",
      //     value: true
      //   });
      //   localStorage.setItem("promo", true);
      // } else {
      //   this.$store.commit("SET_MODAL", {
      //     key: "promo",
      //     value: false
      //   });
      // }
    }
  };
</script>

<style lang="scss">
  @import "assets/stylesheets/FontAwesome/font-awesome.min.css";
  @import "assets/stylesheets/base";

  .prize-all {
    position: fixed;
    z-index: 51;
    top: 50%;
    left: 0px;
  }
  .error-all {
    margin: 10px;
    width: 152px;
    height: 120px;
    background: url("assets/images/data-0.png") no-repeat;
    display: inline-block;
    position: relative;
    &:after {
      content: "请求数据为空";
      position: absolute;
      bottom: -26px;
      left: 36px;
      font-style: italic;
      font-size: 14px;
      color: #d6d6d6;
    }
  }
</style>
