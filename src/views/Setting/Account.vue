<template lang="html">
  <div>
    <p class="title-h1">
      <span>平台账户</span>
      <!-- <a href="#wepay-offline-modal" class="modal-btn" >账户</a> -->
    </p>
    <vendor-account :item="item" v-for="(item, index) in wallets" :key="index" :fetchProfileAmount="fetchProfileAmount" :load="load"></vendor-account>
    <div v-if="!wallets.length && !load.flag" class="error-all"></div>
    <loading :loading="!wallets.length && load.flag" v-if="!wallets.length && load.flag"></loading>
  </div>
</template>

<script>
import VendorAccount from "@/components/Setting/VendorAccount.vue";
import Loading from "@/components/Shared/Loading.vue";
import { mapGetters } from "vuex";

export default {
  components: { VendorAccount, Loading },
  data() {
    return {
      q: {
        per_page: 10,
        page: 1
      },
      load: {
        flag: true
      }
    };
  },
  computed: {
    ...mapGetters(["wallets"])
  },
  methods: {
    async fetchProfileAmount() {
      try {
        this.load.flag = true;
        await this.$store.dispatch("getWallets");
      } catch (error) {
        console.log(error);
      } finally {
        this.load.flag = false;
      }
    }
  },
  async mounted() {
    await this.fetchProfileAmount();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/stylesheets/public";

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
  bottom: 20px;
}
.modal-btn {
  text-decoration: none;
  color: inherit;
}
p {
  span {
    color: #ffffff;
  }
}
</style>
