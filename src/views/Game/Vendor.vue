<template>
  <div class="body vendors">
    <!--<carousel></carousel>-->
    <div class="vendor-game">
      <nav-menu class="dl" :menuDatas="menuDatas" @customClickVendorHead="customClickVendorHead" @changeActiveTax="changeActiveTax"></nav-menu>
      <vendor class="vendor dl" :key="$route.path" :menu-datas="menuDatas"></vendor>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/Vendor/Carousel.vue";
import NavMenu from "@/components/Shared/NavMenu.vue";
import Vendor from "@/components/Game/Vendor.vue";

export default {
  data() {
    return {
      menuDatas: []
    };
  },
  components: {
    Carousel,
    NavMenu,
    Vendor
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let params = {q_category_eq: `category_${this.$route.params.game}`};
      this.api.getVendors(params).then(({ data }) => {
        this.menuDatas = data.items;
        if (data.items.length && !this.$route.params.code) {
          this.$router.push({path: `/${this.$route.params.game}/${data.items[0].code}`});
        }
      });
    },
    changeActiveTax(taxonomy, vendor) {
      this.$router.push({path: `/${this.$route.params.game}/${vendor.code}/${taxonomy.id}`});
    },
    customClickVendorHead(vendor) {
      this.$router.push({path: `/${this.$route.params.game}/${vendor.code}`});
    }
  }

};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.vendor-game {
  width: $min-width;
  padding: 20px 0 0 20px;
  margin: 0 auto;
  .vendor {
    vertical-align: top;
    width: 80%;
    margin-left: -4px;
  }
}
</style>
