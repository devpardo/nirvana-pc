<template lang="html">
  <div id="transfer">
    <div class="mask-layer">
      <div class="transfer">
        <p class="title"><span class="hand fl">转入 至 主账户</span><span class="hand fr" @click="close()">×</span></p>
        <div class="account">
          <div class="account-bg">
            <div class="main clearfix">
              <span class="dl fl">
                <p class="gray">{{ transfer.name }}场馆</p>
                <p class="money"><span class="e-loading" v-loading="mainLoading" v-if="mainLoading"></span><span v-else>￥<span class="size-30">{{ wallet && wallet.sub_wallet || '0' }}</span></span></p>
              </span>
               <span class="fa dl">{{ arrow_right }}</span>
              <span class="dl fr">
                <p class="gray">主账户</p>
                <p class="money"><span class="e-loading" v-loading="mainLoading" v-if="mainLoading"></span><span v-else>￥<span class="size-30">{{ wallet && wallet.main_wallet || '0' }}</span></span></p>
              </span>
            </div>
            <div class="input">
              <p class="number"><span>转账金额</span><i>￥</i><input type="text" v-model="amount" placeholder="请输入转账金额"/></p>
              <p class="info"><span class="fa">{{ info }}</span><span>此次转账每笔金额至少为：¥1.0 。</span></p>
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
          title: "转出"
        },
        successObj: {
          flag: false,
          title: "转出",
          info: "恭喜您转账成功"
        },
        disabled: false,
        mainLoading: true,
        amount: "",
        wallet: {}
      };
    },
    components: { Error, Success },
    computed: {
      amountFloat() {
        return parseFloat(this.amount);
      },
      hasAmount() {
        return !!this.amountFloat;
      },
      isAmountPositive() {
        return positiveInteger(this.amountFloat);
      },
      isAmountInRange() {
        return this.amountFloat > 0;
      },
      isAmountLessThanMainWallet() {
        return this.amountFloat <= parseFloat(this.wallet.main_wallet);
      }
    },
    methods: {
      close() {
        this.transfer.mainFlag = false;
      },
      async submit() {
        if (!this.hasAmount) {
          this.$message({
            message: "转账金额不能为空",
            type: "warning"
          });
          return;
        }
        if (!this.isAmountPositive) {
          this.$message({
            message: "请您输入整数，去掉小数点",
            type: "warning"
          });
          return;
        }
        if (!this.isAmountInRange) {
          this.$message({
            message: "转账金额最小为￥1",
            type: "warning"
          });
          return;
        }
        if (parseFloat(this.amount) > parseFloat(this.wallet.sub_wallet)) {
          this.$message({
            message: "转账金额不能大于场馆金额",
            type: "warning"
          });
          return;
        }
        let main = {
          base_amount: this.amount
        };
        this.disabled = true;
        this.$message({
          message: "转账中...",
          type: "info"
        });
        try {
          await Promise.all([
            this.api.postTransferMain(this.transfer.code, main),
            this.loadTransfer(this.transfer.code),
            this.transfer.method(this.transfer.code)
          ]);
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
      async loadTransfer(code) {
        try {
          this.mainLoading = true;
          console.log(code);
          const { data } = await this.api.getLoadTransfer(code);

         console.log(data, code);

          this.wallet = data;
        } catch (error) {
          console.dir(error);
        } finally {
          this.mainLoading = false;
        }
      }
    },
    async mounted() {
      console.log(this.transfer.code);
      await this.loadTransfer(this.transfer.code);
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  button:disabled {
    opacity: 0.3;
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
    background: rgba(0, 0, 0, 0.5);
    z-index: 2001;
    .transfer {
      border-radius: 5px;
      z-index: 38;
      position: fixed;
      width: 500px;
      top: 20%;
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
    padding: 0px 20px;
    padding-top: 20px;
    border-top: $px solid $color-blue9;
    .info {
      color: $color-white;
      font-size: $font-h5;
      padding-top: 5px;
      .fa {
        color: $color-yellow13;
        font-size: $font-h3;
        padding-right: 5px;
      }
    }
    .number {
      color: $color-white;
      position: relative;
      span {
        font-size: $font-h4;
        font-weight: bold;
        display: block;
      }
      input {
        margin-top: 10px;
        border: $px solid $color-blue6;
        width: 100%;
        @include line-height(45px);
        padding: 0px 10px;
        padding-left: 40px;
        border-radius: 4px;
        background-color: $color-blue9;
        color: $color-yellow13;
      }
      i {
        font-style: normal;
        color: $color-gray3;
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
</style>
