<template lang="html">
  <div class="body">
    <div class="vendor-home">
      <p class="title-h1"><span>游戏平台</span></p>
      <div class="vendor-bgs">
        <div class="game hand dl" v-for="item in vendors" @click="goVendors(item.category, item.code)" :id="item.code">

          <img class="game-bg" v-if="item.code === 'KG'" src="../assets/images/vendor/AV.jpg" width="100%" height="100%">
          <img class="game-bg" v-else-if="item.code === 'DT'" src="../assets/images/vendor/DT.jpg" width="100%" height="100%">
          <img class="game-bg" v-else-if="item.code === 'DG'" src="../assets/images/vendor/DG.jpg" width="100%" height="100%">
          <img class="game-bg" v-else-if="item.code === 'PT'" src="../assets/images/vendor/PT.jpg" width="100%" height="100%">
          <img class="game-bg" v-else-if="item.code === 'MGS'" src="../assets/images/vendor/MG.jpg" width="100%" height="100%">
          <img class="game-bg" v-else-if="item.code === 'PNG'" src="../assets/images/vendor/PNG.jpg" width="100%" height="100%">
          <img class="game-bg" v-else-if="item.code === 'AG'" src="../assets/images/vendor/AG.jpg" width="100%" height="100%">
          <img class="game-bg" v-else-if="item.code === 'GG'" src="../assets/images/vendor/GG.jpg" width="100%" height="100%">
          <img class="game-bg" v-else-if="item.code === 'IBC'" src="../assets/images/vendor_list/IBC.jpg" width="100%" height="100%">
          <img class="game-bg" v-else-if="item.code === 'TGP'" src="../assets/images/vendor_list/SUNBET.jpg" width="100%" height="100%">
          <img class="game-bg" v-else-if="item.code === 'PG'" src="../assets/images/vendor_list/PG.jpg" width="100%" height="100%">

          <div class="info">
            <span v-if="item.code === 'PT'"><img src="../assets/images/pt-ico-w.png" width="120" height="40"/></span>
            <span v-else-if="item.code === 'MGS'"><img src="../assets/images/mg-ico-w.png" width="120" height="40"/></span>
            <span v-else-if="item.code === 'AG'"><img src="../assets/images/ag-ico-w.png" width="120" height="40"/></span>
            <span v-else-if="item.code === 'PNG'"><img src="../assets/images/png-ico-w.png" width="120" height="40"/></span>
            <span v-else-if="item.code === 'GG'"><img src="../assets/images/gg-ico-w.png" width="120" height="40"/></span>
            <span v-else-if="item.code === 'DT'"><img src="../assets/images/dt-ico-w.png" width="120" height="40"/></span>
            <span v-else-if="item.code === 'KG'" class="av"><img src="../assets/images/avkm-ico-w.png" width="120" height="40"/></span>
            <span v-else-if="item.code === 'DG'" class="dg"><img src="../assets/images/dg-ico-w.png" width="120" height="40"/></span>

            <template>
                <p v-if="item.code === 'KG'">平台奖池：¥222232</p>
                <p v-if="item.code === 'DT'">平台奖池：¥379498</p>
                <p v-if="item.code === 'DG'">平台奖池：¥212212</p>
                <p v-if="item.code === 'PT'">平台奖池：¥484627</p>
                <p v-if="item.code === 'MGS'">平台奖池：¥639488</p>
                <p v-if="item.code === 'PNG'">平台奖池：¥481179</p>
                <p v-if="item.code === 'AG'">平台奖池：¥815494</p>
                <p v-if="item.code === 'GG'">平台奖池：¥168872</p>
                <p v-if="item.code === 'IBC'">平台奖池：¥2894561</p>
                <p v-if="item.code === 'TGP'">平台奖池：¥586420</p>
                <p v-if="item.code === 'PG'">平台奖池：¥871254</p>
            </template>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vendors: []
    };
  },
  async created() {
    await this.getVendors();
    if(this.$store.getters.auth) {
      await this.getVendorAmounts()
    }
  },
  methods: {
    async getVendors() {
      const {data} = await this.api.getVendors()
      this.vendors = data.items.map(vendor => {
        return vendor
      })
    },
    async getVendorAmounts() {
      this.vendors = await Promise.all(this.vendors.map(async vendor => {
        const { data } = await this.api.getVendorAmount(vendor.code)
        vendor.money = data.amount
        return vendor;
      }));
    },
    goVendors(category, code) {
      if (code) {

        if(code === 'IBC') {
          this.$router.push({name: "Sports"});
          return
        }

        if (category) {
          category = category.split("category_")[1];
          this.$router.push({path: `/${category}/${code}`});
        } else {
          this.$message({
            message: "该平台目前未有分类",
            type: "info"
          });
        }
      } else {
        this.$router.push({ name: "Vendor" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/public';

.vendor-home {
  width: $min-width;
  margin: 0 auto;
  padding: 20px 0 0 20px;
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
}
.vendor-bgs {
  .game {
    width: 300px;
    height: 300px;
    position: relative;
    vertical-align: top;
    margin-right: 15px;
    margin-bottom: 15px;
    &:hover {
      transform: scale(1.03);
      cursor: pointer;
    }
    .game-bg {
      position: absolute;
      top: 0px;
      bottom: 0px;
      right: 0px;
      left: 0px;
      width: 100%;
    }
    .info {
      position: absolute;
      bottom: 20px;
      right: 20px;
      left: 20px;
      span {
        margin-left: -20px;
      }
      .av {
        margin-left: -40px;
      }
      .dg {
        margin-left: -35px;
      }
      p {
        &:first-of-type {
          color: $color-white;
          padding-bottom: 20px;
        }
        &:last-of-type {
          color: $color-yellow1;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

