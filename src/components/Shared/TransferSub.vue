<template lang="html">
  <div>
    <div class="mask-layer" v-if="transfer.subMainFlag">
      <div class="transfer" id="transfer">
        <p class="title"><span class="hand fl">转入 至 {{ transfer.name }}平台</span><span class="hand fr" @click="close()">×</span></p>
        <div class="account">
          <div class="account-bg">
            <div class="main clearfix">
              <span class="dl fl">
                <p class="gray">主账户余额</p>
                <p class="money"><span class="e-loading" v-loading="subLoading" v-if="subLoading"></span><span v-else>￥<span class="size-30">{{ wallet && wallet.main_wallet || '0' }}</span></span></p>
              </span>
              <span class="fa dl">{{ arrow_right }}</span>
              <span class="dl fr">
                <p class="gray">{{ transfer.name }}平台余额</p>
                <p class="money"><span class="e-loading" v-loading="subLoading" v-if="subLoading"></span><span v-else>￥<span class="size-30">{{ wallet && wallet.sub_wallet || '0' }}</span></span></p>
              </span>
            </div>
            <div class="input">
              <p class="number"><span>转账金额</span><i>￥</i><input type="text" :value="amount" @input="changeAmount($event)" placeholder="请输入转账金额"/></p>
              <p class="info"><span class="fa">{{ info }}</span><span>此次转账每笔金额至少为：¥1.0 。</span></p>
            </div>
            <!-- <div class="warning-message" v-if="warningMessage">
              {{warningMessage}}
            </div> -->
            <span class="adjustment-loading" v-loading="adjustmentLoading" v-if="adjustmentLoading && coupons.items && coupons.items.length > 1"></span>

            <div v-if="wallet.adjustments && !adjustmentLoading && coupons.items && coupons.items.length > 1" class="adjustments">
              <h5>此次转账金额享受优惠详情:</h5>
              <p v-if="wallet.adjustments.adjustments_label">{{ wallet.adjustments.adjustments_label }}</p>
              <p>总金额: <span class="red">{{ parseInt(wallet.total_amount) }} = {{ wallet.base_amount }} + {{ parseInt(wallet.promo_amount) }}</span></p>
            </div>

            <div class="coupon" v-if="coupons.items && coupons.items.length > 1">
              <p class="h3">选择优惠转账</p>
              <div class="coupon-item">

                <template  v-for="(item, index) in coupons.items">
                <span ref='coupon' :class="{ 'border-active': item.id === currentId, 'opacity': !item.able }" @click="setCoupon(index, item.id, item.able)">{{ item.promotion_name }}
                  <p v-if="!item.able">不适用于此平台</p>
                </span>

                <div class="text-warning" v-if="errMsg && item.id === currentId">{{ errMsg }}</div>
                </template>
              </div>
            </div>
          </div>
          <div class="buttons">
            <button class="hand button-submit button-yellow" @click="submit()" :disabled="disabled || !amount">确认转账</button>
            <button class="hand button-submit button-gray" @click="close()" :disabled="disabled || !amount">取消操作</button>
          </div>
        </div>
      </div>
    </div>
    <error :errorObj="errorObj" v-if="errorObj.flag"></error>
    <success :successObj="successObj" v-if="successObj.flag"></success>
  </div>
</template>

<script>
  import Error from "@/components/Shared/Error.vue";
  import Success from "@/components/Shared/Success.vue";
  import { positiveInteger } from "@/libs/utils.js";

  export default {
    props: ["transfer"],
    data() {
      return {
        info: this.$fontawesome("exclamation-circle"),
        arrow_right: this.$fontawesome("arrow-right"),
        errorObj: {
          flag: false,
          title: "转入"
        },
        successObj: {
          flag: false,
          title: "转入",
          info: "恭喜您支付成功"
        },
        errMsg: null,
        currentId: 0,
        amount: "",
        disabled: false,
        subLoading: true,
        adjustmentLoading: true,
        wallet: {},
        coupons: {},
        warningMessage: ""
      };
    },
    components: { Error, Success },
    async created() {
      await this.loadTransfer(this.transfer.code);
      await this.getCoupons();
    },
    methods: {
      async setCoupon(n, id, able) {
        this.errMsg = "";
        //this.errMsg = null;
        if (!able) {
          return;
        }
        if (this.amountTest()) {
          return;
        }
        this.currentId = id;
        await this.calculatePromoCode();
      },
      close() {
        this.transfer.subFlag = false;
      },
      handle() {
        if (this.coupons.items && this.coupons.items.length > 1) {
          this.coupons.items.forEach((item, index) => {
            this.$set(this.coupons.items[index], "able", true); // 全设置为可用
            if (this.coupons.items[index].promotion_vendors) {
              let arr = this.coupons.items[index].promotion_vendors.split(",");
              let flag = false;
              let len = arr.length;
              for (let i = 0; i < len; i++) {
                if (arr[i] === this.transfer.code) {
                  flag = true;
                  break;
                }
              }
              if (!flag) {
                this.$set(this.coupons.items[index], "able", false);
              }
            }
          });
        }
      },
      async changeAmount(event) {
        this.errMsg = "";
        this.amount = event.target.value;
        if (this.coupons && this.coupons.items && this.coupons.items.length) {
          if (this.currentId) {
            this.adjustmentLoading = true;
            await this.resetTransfer(true);
          }
        }

        await this.calculatePromoCode();
      },
      amountTest() {
        this.warningMessage = "";
        if (!parseFloat(this.amount)) {
          //this.warningMessage = "转账金额不能为空";
          this.$message({
            message: "转账金额不能为空",
            type: "warning"
          });
          return true;
        }
        if (!positiveInteger(parseFloat(this.amount))) {
          this.$message({
            message: "请您输入整数，去掉小数点",
            type: "warning"
          });
          return true;
        }
        if (parseFloat(this.amount) < 1) {
          this.$message({
            message: "转账金额最小为￥1",
            type: "warning"
          });
          return true;
        }
        if (parseFloat(this.amount) > parseFloat(this.wallet.main_wallet)) {
          this.$message({
            message: "转账金额不能大于主账户金额",
            type: "warning"
          });
          return true;
        }
      },
      async submit() {
        if (this.amountTest()) {
          return;
        }
        let sub = {};
        if (this.currentId) {
          sub = {
            users_coupon_id: this.currentId,
            base_amount: this.amount
          };
        } else {
          sub = {
            base_amount: this.amount
          };
        }
        this.disabled = true;
        this.$message({
          message: "转账中...",
          type: "info"
        });
        try {
          await this.api.postTransferSub(this.transfer.code, sub)
          await this.loadTransfer(this.transfer.code);
          this.transfer.method(this.transfer.code);
          this.amount = "";
          this.disabled = false;
          this.$message({
            message: "转账成功！",
            type: "success"
          });
        } catch (error) {
          this.errorObj.flag = true;
        }
      },
      async loadTransfer(code, flag) {
        this.wallet = {};
        // flag代表是手动输入时清空重新加载数据
        const { data } = await this.api.getLoadTransfer(code)

          this.wallet = data;
          console.log('--------------------------------------',data);
          if (data && data.base_amount && !flag) {
            //this.amount = res.data.base_amount;
          }
          // this.currentId = res.data.users_coupon_id || 0;
          this.adjustmentLoading = false;
          this.subLoading = false;
          this.disabled = false;
      },
      async getCoupons() {
        const { data } = await this.api.getCoupons()
          this.coupons = data;
          this.coupons.items.unshift({ id: 0, promotion_name: "不使用优惠" });
          this.handle();
      },
      async resetTransfer(flag) {
        await this.api.postResetTransferAdjustment(this.transfer.code)
          await this.loadTransfer(this.transfer.code, flag);
      },

      async calculatePromoCode() {
        this.errMsg = ""
        this.disabled = true;
        this.adjustmentLoading = true;
        console.log(this.amount);
        if (!this.currentId) {
          await this.resetTransfer();
        } else if (this.currentId) {
            let ob = {
              users_coupon_id: this.currentId,
              base_amount: this.amount
            };

            try {
              await this.api.postApplyPromoCode(this.transfer.code, ob)
              await this.loadTransfer(this.transfer.code);
              this.disabled = false;
            } catch (error) {
              this.adjustmentLoading = false;
              console.dir(error);
              this.errMsg = error.response.data.message;
            }
              // this.api
              // .postApplyPromoCode(this.transfer.code, ob)
              // .then(() => {
              //   this.loadTransfer(this.transfer.code);
              //   this.disabled = false;
              // })
              // .catch((err) => {
              //   this.adjustmentLoading = false;
              //   console.dir(err);

              //   this.errMsg = err.response.data.message;
              // });
          }

      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .text-warning {
    background: #ffd3d3;
    color: $color-red1;
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #fea0a0;
    border-radius: 5px;
  }

  .warning-message {
    padding: 10px;
    color: $color-yellow13;
  }
  #transfer {
    .opacity {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  button:disabled {
    opacity: 0.3;
  }
  .adjustment-loading {
    margin: 10px;
    margin-top: 30px;
    display: inline-block;
  }
  .e-loading {
    top: 25px;
    left: 75px;
  }
  .mask-layer {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2001;
    .transfer {
      border-radius: 5px;
      z-index: 38;
      position: absolute;
      width: 500px;
      top: 10%;
      left: 35%;
      background-color: $color-blue8;
      .title {
        @include line-height(50px);
        padding: 0px 20px;
        .fl {
          font-size: $font-h4;
          font-weight: bold;
          color: $color-white;
        }
        .fr {
          font-size: $font-h;
          color: $color-white;
          font-weight: bold;
        }
      }
    }
  }
  .account {
    background-color: $color-blue9;
    padding: 20px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .account-bg {
      background-color: $color-blue8;
      padding: 20px;
    }
    .main {
      width: 100%;
      .fa {
        color: $color-yellow13;
        font-size: $font-h1;
        padding-top: 25px;
      }
    }
    .fl,
    .fr {
      width: 200px;
      text-align: center;
      word-break: break-all;
    }
    .gray {
      color: $color-white;
      padding-bottom: 10px;
    }
    .money {
      span {
        font-size: $font-h4;
        color: $color-yellow13;
        font-weight: bold;
      }
      .size-30 {
        font-size: $font;
      }
    }
  }
  .input {
    text-align: left;
    margin-top: 20px;
    padding-top: 20px;
    border-top: $px solid $color-blue9;
    .info {
      color: $color-white;
      font-size: $font-h5;
      font-weight: normal;
      padding-top: 5px;
      .fa {
        color: $color-yellow13;
        font-size: $font-h4;
        padding-right: 5px;
      }
    }
    .number {
      color: $color-gray3;
      position: relative;
      span {
        color: $color-white;
        font-size: $font-h4;
        font-weight: bold;
        display: block;
      }
      input {
        margin-top: 10px;
        border: $px solid $color-blue6;
        border-radius: 4px;
        background-color: $color-blue9;
        width: 100%;
        @include line-height(45px);
        padding: 0px 10px;
        padding-left: 40px;
        color: $color-yellow13;
      }
      i {
        font-style: normal;
        position: absolute;
        top: 43px;
        left: 15px;
        font-size: $font-h4;
      }
    }
  }
  .buttons {
    margin: 20px auto;
    margin-bottom: 0px;
    text-align: center;
    .button-submit {
      padding: 10px 60px;
      text-align: center;
      border-radius: 25px;
      border: none;
      margin-right: 20px;
    }
    .button-yellow {
      background-color: $color-yellow13;
      color: $color-blue9;
      &:hover {
        background-color: $color-yellow12;
      }
    }
    .button-gray {
      padding: 8px 60px;
      background-color: $color-blue9;
      border: 2px solid $color-yellow13;
      color: $color-yellow13;
      &:hover {
        background-color: $color-yellow13;
        color: $color-blue9;
      }
    }
  }
  .coupon {
    margin-top: 20px;
    padding-top: 10px;
    border-top: $px solid $color-blue9;
    .h3 {
      color: $color-white;
      font-size: $font-h4;
      font-weight: bold;
      padding: 10px 0px;
    }
    .coupon-item {
      max-height: 200px;
      overflow-y: scroll;
      span {
        color: $color-gray3;
        width: 100%;
        padding: 10px;
        text-align: center;
        border: $px solid $color-gray3;
        margin-bottom: 10px;
        margin-right: 10px;
        display: inline-block;
        cursor: pointer;
      }
      .border-active {
        border: $px solid $color-yellow13;
        color: $color-yellow13;
        font-weight: bold;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          border-bottom: 10px solid $color-yellow13;
          top: -1.3px;
          right: -7px;
          transform: rotate(45deg);
        }
        &:before {
          content: "";
          position: absolute;
          z-index: 1;
          top: 1px;
          right: 2px;
          width: 2px;
          height: 4px;
          display: inline-block;
          border-right: $px solid $color-blue9;
          border-bottom: $px solid $color-blue9;
          transform: rotate(45deg);
        }
      }
    }
  }
  .adjustments {
    margin-top: 20px;
    padding-left: 10px;
    color: $color-yellow;
    p {
      padding: 3px 0px;
      &:first-of-type {
        color: $color-yellow13;
      }
      &:last-of-type {
        span {
          background: #a1ffc4;
          color: #0d8a07;
          margin-bottom: 10px;
          padding: 3px 5px;
          border: 1px solid #04903d;
          border-radius: 5px;
          font-size: .8em;
        }
        span::after {
          content: "\5143";
        }
      }
    }
  }
</style>
