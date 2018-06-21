<template lang="html">
  <div v-loading="loading">
    <p class="title-h1"><span>提款中心</span></p>
    <div class="withdraw">
      <select-option class="bottom" :banks="banks" :currentBank.sync="currentBank" :addBank="addBank"></select-option>
      <div class="withdraw-input">
        <p class="way-title">提款金额</p>
        <p class="input"><span>￥</span><input type="text" v-model="payment_amount" placeholder="请输入提款金额"/></p>
        <p class="yellow">主账户余额: ￥{{ profile.main_wallet || '0' }}</p>
        <p class="info"><span class="fa">{{ exclamation }}</span>每笔提款金额需大于或者等于￥100</p>
      </div>
      <button class="hand submit" @click="submit()" :disabled="!payment_amount">确定并提交</button>
      <p class="info"><span class="fa">{{ exclamation }}</span>每天可提款 <span class="yellow">{{ profile.maximum_daily_withdraw_times || '0' }}</span> 次，提款总额度为<span class="yellow">￥{{ profile.maximum_daily_withdraw_amount || '0' }}</span>。您今天已提款 <span class="yellow">{{ profile.already_daily_withdraw_times || '0' }}</span> 次，共计<span class="yellow">￥{{ profile.already_daily_withdraw_amount || '0' }}</span>。</p>
      <error :errorObj="errorObj" v-if="errorObj.flag"></error>
      <success :successObj="successObj" v-if="successObj.flag"></success>
    </div>
    <order-block class="margin" :withdrawals="withdrawals" :cancelOrder="cancelOrder"></order-block>
  </div>
</template>

<script>
import OrderBlock from "@/components/Setting/OrderBlock.vue";
import SelectOption from "@/components/Setting/SelectOption.vue";
import Error from "@/components/Shared/Error.vue";
import Success from "@/components/Shared/Success.vue";

export default {
  data() {
    return {
      exclamation: this.$fontawesome("exclamation-circle"),
      radio: 1,
      errorObj: {
        flag: false,
        title: "提款"
      },
      successObj: {
        flag: false,
        title: "提款",
        info: "恭喜您充值成功"
      },
      profile: "",
      payment_amount: "",
      loading: false,
      banks: {},
      withdrawals: {},
      currentBank: {}
    };
  },
  mounted() {
    this.fetchProfile();
    this.getCards();
    this.fetchWithdrawals();
  },
  components: { OrderBlock, Error, Success, SelectOption },
  methods: {
    cancelOrder(id) {
      let _this = this;
      this.$confirm("您确定要取消此订单?", "确认取消", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        _this.api.postCancelOrder(id).then(() => {
          this.fetchWithdrawals();
          this.fetchProfile();
          this.loading = false;
          this.$message({
            type: "success",
            message: "成功取消订单"
          });
        }).catch((error) => {
          this.loading = false;
          this.errorObj.flag = true;
          console.log(error);
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    },
    submit() {
      if (!this.payment_amount) {
        this.$message({
          message: "请输入充值金额",
          type: "warning"
        });
        return false;
      } else if (this.payment_amount < 100) {
        this.$message({
          message: "输入金额最小为100",
          type: "warning"
        });
        return false;
      }
      if (!this.currentBank.id) {
        this.$message({
          message: "请选择储蓄卡",
          type: "warning"
        });
        return false;
      }
      if ((parseFloat(this.payment_amount)) > (parseFloat(this.profile.maximum_daily_withdraw_amount) - parseFloat(this.profile.already_daily_withdraw_amount))) {
        this.$message({
          message: "输入金额不符合充值限额",
          type: "warning"
        });
        return false;
      }
      let _this = this;
      this.$confirm("确认提现?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.loading = true;
        let obj = {
          payment_amount: this.payment_amount,
          payment_method_id: "1",
          bank_card_id: this.currentBank.id,
          realname: this.profile.realname,
          desc: ""
        };
        _this.api.withdraw(obj).then((res) => {
          this.fetchWithdrawals();
          this.fetchProfile();
          this.$message({
            type: "success",
            message: "提现处理开始,请耐心等候"
          });
          this.payment_amount = "";
          this.loading = false;
        }).catch((error) => {
          this.errorObj.flag = true;
          this.loading = false;
          console.log(error);
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
      // this.successObj.flag = true
    },
    addBank() {
      this.$router.push({ name: "AddBank" });
    },
    fetchProfile() {
      this.api.getProfile().then((res) => {
        this.profile = res.data;
      });
    },
    getCards() {
      this.api.getBankCards().then((res) => {
        this.banks = res.data;
        if (this.banks && this.banks.items && this.banks.items.length) {
          this.currentBank = this.banks.items[0];
        }
      });
    },
    fetchWithdrawals() {
      this.api.getWithdrawals().then((res) => {
        this.withdrawals = res.data && res.data.items;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

button:disabled {
  opacity: .5;
}
.blue {
  color: $color-blue2;
  padding-top: 10px;
}
.yellow {
  color: $color-yellow13;
  padding-top: 10px;
}
.margin {
  padding-top: 30px;
  margin: 0px auto;
  width: $min-width;
}
.add {
  width: 200px;
  margin: 20px auto;
  color: $color-blue4;
  font-size: $font-h3;
}
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
.withdraw {
  margin: 20px auto;
  padding: 30px 40px;
  width: $min-width;
  background-color: $color-blue9;
  .way-title {
    padding-bottom: 10px;
    vertical-align: middle;
    color: $color-yellow13;
    font-size: $font-h4;
    font-weight: bold;
  }
  .info {
    padding-top: 10px;
    .fa {
      color: $color-yellow13;
      padding-right: 5px;
      font-size: $font-h3;
    }
    color: $color-white;
  }
  .withdraw-input {
    border-bottom: $px solid $color-blue8;
    padding-bottom: 20px;
    margin-bottom: 20px;
    .input {
      width: 400px;
      @include line-height(45px);
      position: relative;
      span {
        font-size: $font-h4;
        color: $color-white;
        margin: 3px 15px;
        position: absolute;
      }
      input {
        width: 100%;
        height: 100%;
        border: $px solid $color-blue6;
        outline: none;
        font-size: $font-h2;
        color: $color-yellow13;
        font-weight: bold;
        padding-left: 35px;
        background-color: $color-blue8;
        border-radius: 4px;
        &::placeholder {
          color: $color-white;
          font-size: $font-h4;
        }
      }
    }
  }
}
.submit {
  padding: 10px 80px;
  border: none;
  outline: none;
  text-align: center;
  font-weight: bold;
  background-color: $color-yellow13;
  color: $color-blue9;
  border-radius: 20px;
}
</style>
