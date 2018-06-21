<template lang="html">
  <div class="vendor-account dl" :class="`vendor-${item.code.toLowerCase()}`">
    <div class="title">
      <h3 class="label">{{ item.label }}平台</h3>
      <span class="img dl" v-if="item.code === 'PT'"><img src="../../assets/images/balance/PT.png"/></span>
      <span class="img dl" v-else-if="item.code === 'MGS'"><img src="../../assets/images/balance/MG.png"/></span>
      <span class="img dl" v-else-if="item.code === 'AG'"><img src="../../assets/images/balance/AG.png"/></span>
      <span class="img dl" v-else-if="item.code === 'PNG'"><img src="../../assets/images/balance/PNG.png"/></span>
      <span class="img dl" v-else-if="item.code === 'DT'"><img src="../../assets/images/balance/DT.png"/></span>
      <span class="img dl" v-else-if="item.code === 'KG'"><img src="../../assets/images/balance/KUMA.png"/></span>
      <span class="img dl" v-else-if="item.code === 'PG'"><img src="../../assets/images/balance/PG.png"/></span>
      <span class="img dl" v-else-if="item.code === 'TGP'"><img src="../../assets/images/balance/TGP.png"/></span>
      <span class="img dl" v-else-if="item.code === 'GG'"><img src="../../assets/images/balance/GG.png"/></span>
      <span class="img dl" v-else-if="item.code === 'IBC'"><img src="../../assets/images/balance/SB.png"/></span>
      <span class="img dl" v-else-if="item.code === 'DG'"><img src=""/></span>
    </div>
    <div class="v-body">
      <div class="account">
        <p class="v-label">账户余额</p>
        <p v-if="loading" class="loading"><span class="e-loading" v-loading="loading"></span></p>
        <p class="amount-holder" v-else-if="item.code"><span class="weight v-amount">{{ amount }}</span></p>
      </div>

      <div class="button">
        <a class="hand dl tin" :class="{ 'opacity': item.locked_at }" @click="transferSub()">
          <i class="tin-icon"></i> 转入
        </a>
        <a class="hand dl tout" :class="{ 'opacity': item.locked_at }" @click="transferMain()">
          <i class="tout-icon"></i> 转出
        </a>
      </div>

      <p v-if="item.locked_text" class="locked"><span class="fa">{{ warning }}</span>暂无法使用此平台转账功能，原因如下：{{ item.locked_text }}</p>
    </div>
    <transfer-sub v-if="transfer.subFlag" :transfer="transfer" :key="item.code"></transfer-sub>
    <transfer-main v-if="transfer.mainFlag" :transfer="transfer" :key="item.code"></transfer-main>
  </div>
</template>

<script>
  import TransferSub from "@/components/Shared/TransferSub.vue";
  import TransferMain from "@/components/Shared/TransferMain.vue";

  export default {
    props: {
      item: {
        type: Object
      },
      fetchProfileAmount: {
        type: null
      }
    },
    data() {
      return {
        loading: true,
        rotate_right: this.$fontawesome("rotate-right"),
        rotate_left: this.$fontawesome("rotate-left"),
        warning: this.$fontawesome("warning"),
        transfer: {
          subFlag: false,
          subMainFlag: false,
          mainBodyFlag: false,
          mainFlag: false,
          code: this.item.code,
          name: this.item.label,
          method: this.fetchProfileAmount
        },
        subWallets: [],
        amount: 0
      };
    },
    components: { TransferSub, TransferMain },
    computed: {
      locked() {
        return !!this.item.locked_at;
      }
      // image() {
      //   const images = {
      //     PT: "pt-ico-d.png",
      //     MGS: "mg-ico-d.png",
      //     AG: "ag-ico-d.png",
      //     PNG: "png-ico-d.png",
      //     GG: "gg-ico-d.png",
      //     DT: "dt-ico-d.png",
      //     KG: "avkm-ico-d.png",
      //     DG: "dg-ico-d.png",
      //     IBC: "dg-ico-d.png"
      //   };
      //   const image = images[this.item.code];
      //   return `~assets/images/${image}`;
      // }
    },
    methods: {
      transferSub() {
        if (this.locked) return;
        this.transfer.subFlag = true;
        this.transfer.subMainFlag = true;
      },
      transferMain() {
        if (this.locked) return;
        this.transfer.mainFlag = true;
        this.transfer.mainBodyFlag = true;
      },
      async getVendorAmount() {
        try {
          this.loading = true;
          const { data } = await this.api.getVendorAmount(this.item.code);
          this.amount = +data.amount || 0;
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }
      }
    },
    async mounted() {
      await this.getVendorAmount();

      //this.amount = this.item.amount;
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .e-loading {
    top: 30px;
    left: 10px;
  }
  .opacity {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .locked {
    padding-top: 10px;
    color: #ffebae;
    font-weight: normal;
    font-size: 8pt;
    .fa {
      padding-right: 5px;
      color: #e27f13;
    }
  }
  .vendor-account {
    &.vendor-pt {
      background-image: url('../../assets/images/balance/bg/PT.png');
    }
    &.vendor-kg {
      background-image: url('../../assets/images/balance/bg/AV.png');
    }
    &.vendor-dt {
      background-image: url('../../assets/images/balance/bg/DT.png');
    }
    &.vendor-dg {
      background-image: url('../../assets/images/balance/bg/SB.png');
    }
    &.vendor-mgs {
      background-image: url('../../assets/images/balance/bg/MG.png');
    }
    &.vendor-png {
      background-image: url('../../assets/images/balance/bg/PNG.png');
    }
    &.vendor-ag {
      background-image: url('../../assets/images/balance/bg/AG.png');
    }
    &.vendor-gg {
      background-image: url('../../assets/images/balance/bg/GG.png');
    }
    &.vendor-tgp {
      background-image: url('../../assets/images/balance/bg/TGP.png');
    }
    &.vendor-pg {
      background-image: url('../../assets/images/balance/bg/PG.png');
    }
    &.vendor-ibc {
      background-image: url('../../assets/images/balance/bg/SB.png');
    }
    background: #0b0e2f;
    background-repeat: no-repeat;
    background-position: 110px 90px;
    width: calc(100%/4 - 20px);
    margin: 10px;
    margin-bottom: 20px;
    vertical-align: top;

    .title {
      height: 48px;
      width: 100%;
      background-color: $color-blue9;
      position: relative;
      border-bottom: 1px solid #ba9222;
      line-height: 48px;
      padding: 0 10px;
      .label {
        float: right;
        color: #fff;
        font-weight: normal;
      }
      .img {
        float: left;
        height: 100%;
        img {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .v-body {
      padding: 8px 16px;
    }
    .account {
      word-break: break-all;
      .loading {
        width: 100px;
        height: 50px;
        margin-bottom: 22px;
      }
      .amount-holder {
        margin-bottom: 22px;
      }
      .v-label {
        color: #fff;
        font-weight: normal;
        margin-bottom: 18px;
      }
      .v-amount {
        font-size: $font-large;
        color: #f8d983;
        font-weight: normal;
        &::before {
          content: "￥";
          font-size: 14px;
        }
      }
    }
    .button {
      text-align: center;
      margin-bottom: 5px;
      i {
        padding-right: 3px;
      }
      a {
        width: 110px;
        @include line-height(30px);
        color: $color-black;
        background-color: $color-yellow13;
        text-align: center;
        font-weight: normal;
        &.tin {
          border-top-left-radius: $border-radius-circle;
          border-bottom-left-radius: $border-radius-circle;
          .tin-icon {
            background-image: url('../../assets/images/balance/tin_normal.png');
            height: 12px;
            width: 16px;
            display: inline-block;
            background-repeat: no-repeat;
          }
        }
        &.tout {
          border-top-right-radius: $border-radius-circle;
          border-bottom-right-radius: $border-radius-circle;
          .tout-icon {
            background-image: url('../../assets/images/balance/tout_normal.png');
            height: 12px;
            width: 16px;
            display: inline-block;
            background-repeat: no-repeat;
          }
        }
        &:hover {
          background-color: #ba9222;
          color: #fff;
          .tout-icon {
            background-image: url('../../assets/images/balance/tout_hover.png');
          }
          .tin-icon {
            background-image: url('../../assets/images/balance/tin_hover.png');
          }
        }
      }
    }
  }
</style>
