<template lang="html">
  <div class="nav-menu" id="nav">
    <!-- <div class="nav-item" v-if="$route.params.game === 'slot'" :class="{activeTabAllGames: $route.params.code === 'all'}">
      <div class="title hand" @click="showAllGames">
        <div class="platform">
          <span class="platform-name">All</span>
        </div>
      </div>
    </div> -->
    <div class="nav-item" :class="{'padding-bottom': vendor.$spread}" v-for="vendor in menuDatas">
      <div class="title hand" @click="changeActiveVendor(vendor)">
        <div class="platform">
          <span class="platform-name">{{ vendor.name }}平台</span>
        </div>
      </div>
      <ul class="list nav_js" v-show="vendor.$spread">
        <div class="list-top">
          <!--v-if 不能在menu item反复打开关闭时启动Loading 故用v-show代替-->
          <p class="vendor-balance">平台余额</p>
          <p :class="{ 'loading-padding': vendor.loading }">￥<span><span class="e-loading" v-loading="vendor.loading" v-show="vendor.loading"></span><span class="money" v-show="!vendor.loading">{{vendor.wallet || '0.0'}}</span></span></p>
          <div class="buttons">
            <div>
              <button class="hand" @click="transferSub(vendor)" :class="{ 'active': transfer.subFlag}" :disabled="vendor.disabled"><span class="fa">{{ rotateRight }}</span>转入</button>
              <button class="hand" @click="transferMain(vendor)" :class="{ 'active': transfer.mainFlag}" :disabled="vendor.disabled"><span class="fa">{{ rotateLeft }}</span>转出</button>
            </div>
            <div class="warning" v-if="vendor.transfer_locked_text">
              <span class="fa">{{ warning }}</span>暂无法使用此平台转账功能，原因如下：{{ vendor.transfer_locked_text }}
            </div>
            <div class="warning" v-else-if="vendor.maintain_at">
              <span class="fa">{{ warning }}</span>{{vendor.name}}正在维护中，十分抱歉，具体恢复时间请联系在线客服
            </div>
          </div>
        </div>
        <li v-for="tax in vendor.taxonomies" @click="changeActiveTax(tax, vendor)" :class="{'li': tax.id == $route.params.taxonomyId}">{{ tax.name }}</li>
      </ul>
    </div>
    <div class="vendor-button hand" @click="vendorHome()"><span class="fa">{{ th_large }}</span>返回大厅</div>
    <transfer-sub v-if="transfer.subFlag" :transfer="transfer"></transfer-sub>
    <transfer-main v-if="transfer.mainFlag" :transfer="transfer"></transfer-main>
  </div>
</template>

<script>
  import TransferSub from "@/components/Shared/TransferSub.vue";
  import TransferMain from "@/components/Shared/TransferMain.vue";

  export default {
    components: {
      TransferSub,
      TransferMain
    },
    props: ["menuDatas"],
    data() {
      return {
        activeVendor: null,
        activeTax: null,
        wallet: {},
        currentVendor: "",
        transfer: {
          subFlag: false,
          subMainFlag: false,
          mainFlag: false,
          mainBodyFlag: false,
          code: "",
          name: "",
          method: this.regetDatas
        },
        rotateRight: this.$fontawesome("rotate-right"),
        rotateLeft: this.$fontawesome("rotate-left"),
        warning: this.$fontawesome("warning"),
        th_large: this.$fontawesome("th-large")
      };
    },
    watch: {
      menuDatas(newVal, oldVal) {
        this.activeTax = null;
        newVal.forEach(vendor => {
          if (vendor.code === this.$route.params.code) {
            this.$set(vendor, "$spread", true);
            this.currentVendor = vendor;
            this.vendorWallet(vendor);
            this.activeVendor = vendor;
          }
        });
      },
      activeVendor(newVendor, oldVendor) {
        this.$emit("changeActiveVendor", newVendor);
      }
    },
    methods: {
      async showAllGames() {
        this.$router.push({ name: "Vendor", params: { code: "all" } });
      },
      vendorHome() {
        this.$router.push({ name: "VendorHome" });
      },
      regetDatas(code) {
        if (this.currentVendor) {
          this.vendorWallet(this.currentVendor);
        } else {
          this.$message({
            message: "数据获取中止，请刷新页面重新获取",
            type: "warning"
          });
          return;
        }
      },
      vendorWallet(vendor) {
        this.$set(vendor, "loading", true);
        this.transfer.name = vendor.name;
        this.api
          .getVendorWallet(vendor.code)
          .then(res => {
            this.wallet = res.data || "";
            this.$set(vendor, "wallet", res.data.sub_wallet);
            this.$set(
              vendor,
              "disabled",
              res.data.transfer_locked_at || res.data.maintain_at || false
            );
            this.$set(vendor, "loading", false);
            if (res.data.transfer_locked_at) {
              this.$set(vendor, "transfer_locked_at", res.data.transfer_locked_at);
              this.$set(
                vendor,
                "transfer_locked_text",
                res.data.transfer_locked_text
              );
            }
          })
          .catch(() => {
            this.$set(vendor, "loading", false);
          });
      },
      transferSub(vendor) {
        if (vendor.maintain_at) {
          this.$message({
            message: "场馆正在维修",
            type: "warning"
          });
          return;
        }
        if (vendor.transfer_locked_at) {
          return;
        }
        this.transfer.name = vendor.name;
        this.transfer.code = vendor.code;
        this.transfer.subFlag = true;
        this.transfer.subMainFlag = true;
      },
      transferMain(vendor) {
        if (vendor.maintain_at) {
          this.$message({
            message: "场馆正在维修",
            type: "warning"
          });
          return;
        }
        if (vendor.transfer_locked_at) {
          return;
        }
        this.transfer.name = vendor.name;
        this.transfer.code = vendor.code;
        this.transfer.mainFlag = true;
        this.transfer.mainBodyFlag = true;
      },
      changeActiveVendor(vendor) {
        this.currentCode = vendor.code;
        this.activeVendor = vendor;
        this.$emit("customClickVendorHead", vendor);
        this.activeTax = null;
        this.$set(this.activeVendor, "$spread", !this.activeVendor["$spread"]);
        this.vendorWallet(vendor);
      },
      changeActiveTax(tax, vendor) {
        this.activeVendor = vendor;
        this.activeTax = tax;
        this.$emit("changeActiveTax", tax, vendor);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/stylesheets/public';
  .activeTabAllGames {
    border-right: 4px solid $color-yellow13 !important;
  }
  #nav {
    .li {
      background-color: rgba($color-white, $alpha: 0.1);
      color: $color-yellow13;
      font-weight: bold;
      width: 100%;
      position: relative;
      &:after {
        position: absolute;
        right: 0px;
        top: 15px;
        content: '';
        border-right: 8px solid $color-blue8;
        border-top: 6px solid rgba($color-white, $alpha: 0);
        border-bottom: 6px solid rgba($color-white, $alpha: 0);
      }
    }
    .loading-padding {
      padding: 10px;
    }
  }
  .vendor-button {
    margin-top: 10px;
    width: 250px;
    @include line-height(40px);
    text-align: center;
    border: 2px solid $color-white;
    color: $color-white;
    border-radius: 20px;
    opacity: 0.7;
    .fa {
      padding-right: 5px;
    }
    &:hover {
      opacity: 1;
    }
  }
  .nav-menu {
    width: 250px;
    .nav-item {
      background-color: $color-blue8;
      border: 2px solid $color-blue8;
      margin-bottom: 5px;
      border-radius: 5px;
      color: $color-yellow13;
    }
    .padding-bottom {
      padding-bottom: 10px;
    }
    .title {
      padding: 10px 20px;
      .platform-name {
        font-size: $font-h4;
        vertical-align: middle;
      }
    }
    .list {
      padding-bottom: 10px;
      background-color: $color-blue9;
      color: $color-white;
      .list-top {
        padding: 10px 20px;
        .vendor-balance {
          font-weight: bold;
        }
        .e-loading {
          margin: 10px 0px;
        }
        .warning {
          padding-top: 10px;
          color: $color-yellow13;
          .fa {
            font-size: $font-h4;
            padding-right: 6px;
          }
        }
      }
      li {
        @include line-height(40px);
        padding: 0px 20px;
        cursor: pointer;
      }
      .money {
        font-size: $font-h;
        @extend .break-word;
        color: $color-yellow13;
      }
      .buttons {
        margin-top: 10px;
        padding-bottom: 10px;
        border-bottom: $px solid $color-blue9;
        .fa {
          padding-right: 6px;
        }
        .active {
          background-color: $color-yellow13;
          color: $color-white;
        }
        button {
          padding: 5px 0px;
          color: $color-blue8;
          background-color: $color-yellow13;
          border: 0;
          border-radius: 20px;
          width: 95px;
          margin-right: 5px;
          outline: none;
          &:hover {
            background-color: $color-yellow12;
          }
        }
      }
    }
  }
</style>
