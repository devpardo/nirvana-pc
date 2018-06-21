<template lang="html">
  <div>
    <p class="title-h1"><span>充值中心</span></p>
    <div class="deposit" id="deposit" v-loading="loading">
      <div class="deposit-input" v-show="currentItem.payment_type !== 'payment_offline' || currentMoney.bank_no || currentMoney.payment_type === 'payment_offline_wxpay' || currentMoney.payment_type === 'payment_offline_alipay'">
        <p class="way-title">充值金额</p>
        <p class="input"><span>￥</span><input type="number" v-model="payment.payment_amount" placeholder="请输入充值金额"/><span v-if="currentMoney.promo_rate != 0.0" class="deposit-rebate"> 可获得 {{ rebate }} 元返利红包。</span></p>
        <p class="info"><span class="fa">{{ exclamation }}</span>此次充值每笔限额为: ￥{{ currentMoney.input_amount_min || '--' }} ~ ￥{{ currentMoney.input_amount_max || '--' }}</p>

        <p class="info note" @click="showHint = true">
          <span class="fa">{{ exclamation }}</span>微信、支付宝如何转账银行卡
        </p>

      </div>
      <div class="pay-way">
        <p class="way-title">充值方式</p>
        <span class="pay-button hand dl" :class="{ 'active': index === currentIndex }" v-for="(item, index) in profile.payment_method_categories" @click="choice(index, item)"><span class="icon dl"><img :src="item.image_url" width="100%" height="100%"/></span>{{ item.name || '无' }}</span>
        <div class="radios margin-top" id="radio">
          <p class="way-title">支付通道</p>
          <el-radio-group v-model="currentItem.radio" v-if="currentItem.payment_methods && currentItem.payment_methods.length">
            <el-radio class="radio" v-for="(i, n) in currentItem.payment_methods" :key='n' :label="n" @click.native="getLimitMoney(i, n)">{{ i.name }}</el-radio>
          </el-radio-group>
          <div v-else class="no-data">
            无支付方式
          </div>
          <div v-show="currentItem.payment_type === 'payment_offline'">
            <div v-if="currentMoney.bank_no" class="banks">
              <div class="block dl">
                <p class="bank-style">您的银行帐号</p>
                <div class="bank_block bank_gray dl">
                  <div class="bank">
                    <p><i>银行名称: </i><span><input v-model="bank.user_bank_name" placeholder="必填"/></span></p>
                    <p><i>银行卡号: </i><span><input v-model="bank.user_bank_no" placeholder="输入银行卡后四位(选填)"/></span></p>
                    <p><i>持卡人姓名: </i><span><input v-model="bank.realname" placeholder="必填"/></span></p>
                  </div>
                </div>
              </div>
              <span class="arrow_right dl fa">{{ arrow_right }}</span>
              <div class="block dl">
                <p class="bank-style">官方银行帐号</p>
                <div class="bank_block bank_red">
                  <!--<img :src="currentMoney.image_url" width="24" height="24"/>-->
                  <p class="bank_icon">{{ currentMoney.bank_name || '无' }}</p>
                  <div class="bank">
                    <p><i>银行名称: </i><span>{{ currentMoney.bank_name || '无' }}</span></p>
                    <p><i>银行卡号: </i><span>{{ currentMoney.bank_no || '无' }}</span></p>
                    <p><i>持卡人姓名: </i><span>{{ currentMoney.bank_realname || '无' }}</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="GRImg" v-else-if="currentMoney.payment_type !== 'payment_offline_wxpay' && currentMoney.payment_type !== 'payment_offline_alipay'">
              <img :src="currentMoney.image_url" width="150" height="150"/>
              <p class="info"><span class="fa">{{ exclamation }}</span>完成支付后，请联系在线客服进行额度添加。</p>
            </div>
          </div>
        </div>
        <div class="radios" id="radio1" v-if="currentItem.payment_methods && currentItem.payment_methods.length && currentItem.payment_methods[0].payment_type === 'payment_online_bank'">
          <el-radio-group v-model="currentBanks[0].radio" v-if="currentBanks && currentBanks.length">
            <el-radio class="radio" v-for="(v, ind) in currentBanks" :key='ind' :label="ind" @click.native="banksRadio(ind)">{{ v.name }}</el-radio>
          </el-radio-group>
        </div>
        <div v-show="(currentItem.payment_type !== 'payment_offline') || currentMoney.bank_no || currentMoney.payment_type === 'payment_offline_wxpay' || currentMoney.payment_type === 'payment_offline_alipay'" class="submit-block">
          <button class="hand submit" @click="submit()" :disabled="!payment.payment_amount">确认并提交</button>
          <p v-if="currentMoney.bank_no" class="info"><span class="fa">{{ exclamation }}</span>请使用ATM或柜台转账等方式完成转账后，填写上述信息并确认提交即可完成转账支付。</p>
          <p v-else class="info"><span class="fa">{{ exclamation }}</span>支付页面将以弹出页面方式显示，请在提交订单前将您的浏览器拦截设置为【允许】。</p>
        </div>
      </div>
      <error :errorObj="errorObj" v-if="errorObj.flag"></error>
      <success :successObj="successObj" v-if="successObj.flag"></success>
      <wechat-bill v-if="wechat.flag" :wechat="wechat"></wechat-bill>
    </div>

    <deposit-modal :showHint.sync="showHint"/>
  </div>
</template>

<script>
  import Error from "@/components/Shared/Error.vue";
  import Success from "@/components/Shared/Success.vue";
  import WechatBill from "@/components/Setting/WechatBill.vue";
  import DepositModal from "@/components/Setting/DepositModal.vue";

  export default {
    data() {
      return {
        showHint: false,
        exclamation: this.$fontawesome("exclamation-circle"),
        arrow_right: this.$fontawesome("arrow-right"),
        errorObj: {
          flag: false,
          title: "充值"
        },
        successObj: {
          flag: false,
          title: "充值",
          info: "恭喜您充值成功"
        },
        payment: {
          payment_amount: "",
          payment_method_id: ""
        },
        bank: {
          realname: "",
          user_bank_no: "",
          user_bank_name: ""
        },
        wechat: {
          flag: false,
          img: "",
          amount: "",
          code: "",
          type: "",
          opt: ""
        },
        profile: "",
        currentIndex: 0,
        currentItem: "",
        currentMoney: "",
        currentBanks: "",
        loading: false
      };
    },
    mounted() {
      this.fetchProfile();
    },
    components: { Error, Success, WechatBill, DepositModal },
    methods: {
      submit() {
        if (
          !this.profile ||
          !this.profile.payment_method_categories ||
          !this.profile.payment_method_categories.length
        ) {
          this.$message({
            message: "您目前的账户层级不能拥有任何充值方式",
            type: "warning"
          });
          return false;
        }
        if (!this.payment.payment_amount) {
          this.$message({
            message: "请输入充值金额",
            type: "warning"
          });
          return false;
        }
        if (
          parseFloat(this.payment.payment_amount) >
            parseFloat(this.currentMoney.input_amount_max) ||
          parseFloat(this.payment.payment_amount) <
            parseFloat(this.currentMoney.input_amount_min)
        ) {
          this.$message({
            message: "输入金额不符合充值限额",
            type: "warning"
          });
          return false;
        }
        if (!this.currentMoney.id) {
          this.$message({
            message: "通道出现问题，请刷新重试或者联系客服",
            type: "info"
          });
          return false;
        } else {
          if (this.currentMoney.banks && this.currentMoney.banks.length) {
            let index = this.currentMoney.banks[0].radio;
            this.payment.payment_method_id = this.currentMoney.banks[index].id;
          } else {
            this.payment.payment_method_id = this.currentMoney.id;
          }
          if (this.currentMoney.payment_type === "payment_offline_bank") {
            if (!this.bank.realname || !this.bank.user_bank_name) {
              this.$message({
                message: "请完善【您的银行帐号】必填信息",
                type: "warning"
              });
              return false;
            }
            if (this.bank.user_bank_no && this.bank.user_bank_no.length !== 4) {
              this.$message({
                message: "若要输入银行卡号，请输入【银行卡号后四位】",
                type: "info"
              });
              return false;
            }
            this.payment.realname = this.bank.realname;
            this.payment.user_bank_no = this.bank.user_bank_no;
            this.payment.user_bank_name = this.bank.user_bank_name;
          }
        }
        let _this = this;
        let confirmInfo = "";
        if (this.currentMoney.payment_type === "payment_offline_bank") {
          confirmInfo = "将提交所填信息, 是否继续?";
        } else {
          confirmInfo = "将前往充值, 是否继续?";
        }
        this.$confirm(confirmInfo, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.loading = true;
            _this.api
              .deposit(this.payment)
              .then(res => {
                // this.successObj.flag = true
                if (this.currentMoney.payment_type === "payment_offline_bank") {
                  this.$message({
                    type: "success",
                    message: "您的银行账号信息提交成功！相关客服会做后续处理"
                  });
                  this.bank.realname = "";
                  this.bank.user_bank_no = "";
                  this.bank.user_bank_name = "";
                } else if (
                  this.currentMoney.payment_type === "payment_offline_wxpay" ||
                  this.currentMoney.payment_type === "payment_offline_alipay"
                ) {
                  this.wechat.flag = true;
                  this.wechat.img = this.currentMoney.image_url;
                  this.wechat.opt = this.currentMoney.name;
                  // console.log(this.currentMoney.name);
                  if (
                    this.currentMoney.payment_type === "payment_offline_wxpay"
                  ) {
                    this.wechat.type = "wxpay";
                  } else if (
                    this.currentMoney.payment_type === "payment_offline_alipay"
                  ) {
                    this.wechat.type = "alipay";
                  }
                  if (res.data.id) {
                    this.api.getOrder(res.data.id).then(respone => {
                      this.wechat.amount = respone.data.payment_amount || "";
                      this.wechat.code = respone.data.bill_no || "";
                    });
                  } else {
                    this.$message({
                      type: "error",
                      message: "获取微信支付账单失败，请重试或联系客服"
                    });
                  }
                } else {
                  window.open(
                    `http://13.124.248.111/payments/gateway/${
                      res.data.payment_method
                    }/${res.data.bill_no}`
                  );
                }
                this.payment.payment_amount = "";
                this.loading = false;
              })
              .catch(error => {
                this.errorObj.flag = true;
                this.loading = false;
                console.log(error);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      },
      choice(index, methods) {
        this.currentIndex = index;
        this.currentItem = methods;
        this.currentItem.radio = 0;
        if (
          this.currentItem.payment_methods[0].banks &&
          this.currentItem.payment_methods[0].banks.length
        ) {
          this.currentBanks = this.currentItem.payment_methods[0].banks;
          this.$set(this.currentBanks[0], "radio", 0); // 第二层radio
        }
        if (
          this.currentItem.payment_methods &&
          this.currentItem.payment_methods.length
        ) {
          this.currentMoney = this.currentItem.payment_methods[0];
        }
      },
      getLimitMoney(item, index) {
        this.currentMoney = item;
        this.currentItem.radio = index;
        if (
          this.currentItem.payment_methods[index] &&
          this.currentItem.payment_methods[index].banks
        ) {
          this.currentBanks = this.currentItem.payment_methods[index].banks;
          this.$set(this.currentBanks[0], "radio", 0); // 第二层radio
        }
      },
      banksRadio(n) {
        this.currentBanks[0].radio = n;
        // this.$set(this.currentBanks[0], 'radio', n)
      },
      fetchProfile() {
        this.api.getProfile().then(res => {
          this.profile = res.data;
          if (
            this.profile &&
            this.profile.payment_method_categories &&
            this.profile.payment_method_categories.length &&
            this.profile.payment_method_categories[0].payment_methods.length
          ) {
            this.currentItem = this.profile.payment_method_categories[0];
            this.currentItem.radio = 0;
            if (
              this.currentItem.payment_methods &&
              this.currentItem.payment_methods.length
            ) {
              this.currentMoney = this.currentItem.payment_methods[0];
              if (
                this.currentMoney.payment_type &&
                this.currentMoney.payment_type === "payment_online_bank"
              ) {
                if (this.currentMoney.banks && this.currentMoney.banks.length) {
                  this.currentBanks = this.currentMoney.banks;
                  this.$set(this.currentBanks[0], "radio", 0);
                }
              }
            }
          }
        });
      }
    },
    computed: {
      rebate() {
        if (!this.currentMoney) {
          return "";
        } else {
          return (
            this.payment.payment_amount * this.currentMoney.promo_rate
          ).toFixed(2);
        }
      }
    }
  };
</script>

<style lang="scss">
  @import "../../assets/stylesheets/public";
  #radio,
  #radio1 {
    .el-radio + .el-radio {
      margin-left: 0px;
    }
    .el-radio__label {
      font-size: $font-h4;
      color: $color-white;
      font-weight: bold;
    }
  }
</style>
<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  button:disabled {
    opacity: 0.5;
  }
  #deposit {
    .active {
      border: $px solid $color-yellow13;
      color: $color-yellow13;
      position: relative;
      opacity: 1;
      &:after {
        content: "";
        position: absolute;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;
        border-bottom: 10px solid $color-yellow13;
        top: -2px;
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
    .el-radio-group {
      .radio {
        width: auto;
        padding-right: 50px;
      }
    }
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
  .deposit {
    margin: 20px auto;
    padding: 30px 40px;
    width: $min-width;
    background-color: $color-blue9;
    .way-title {
      padding-bottom: 15px;
      vertical-align: middle;
      color: $color-yellow13;
      font-size: $font-h4;
      font-weight: bold;
    }
    .info.note {
      color: $color-yellow13;
      cursor: pointer;
      display: inline;
    }
    .info {
      padding-top: 10px;
      .fa {
        font-size: $font-h3;
        color: $color-yellow13;
        padding-right: 5px;
      }
      color: $color-white;
    }
    .deposit-input {
      border-bottom: $px solid $color-blue8;
      padding-bottom: 20px;
      margin-bottom: 20px;
      color: $color-yellow13;
      .input {
        width: 400px;
        @include line-height(45px);
        position: relative;
        span {
          font-size: $font-h4;
          color: $color-white;
          margin: 3px 0 0 10px;
          position: absolute;
        }
        input {
          background-color: $color-blue8;
          width: 100%;
          height: 100%;
          border: $px solid $color-blue6;
          border-radius: 4px;
          outline: none;
          font-size: $font-h2;
          color: $color-yellow13;
          font-weight: bold;
          padding-left: 30px;
          &::placeholder {
            color: $color-white;
            font-size: $font-h4;
          }
        }
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .deposit-rebate {
          color: $color-yellow13;
          position: absolute;
          top: 0;
          right: 5px;
        }
      }
    }
  }

  .pay-way {
    .GRImg {
      border-top: $px solid $color-blue8;
      padding-top: 20px;
    }
    .banks {
      border-top: $px solid $color-blue8;
      padding: 20px 0px;
      .arrow_right {
        font-size: $font-h1;
        color: $color-yellow13;
        vertical-align: middle;
        padding: 0px 50px;
        padding-top: 25px;
      }
      .block {
        width: 360px;
        vertical-align: middle;
        .bank-style {
          text-align: center;
          color: $color-gray3;
          font-size: $font-h4;
          font-weight: bold;
          padding-bottom: 10px;
        }
      }
      .bank_block {
        width: 100%;
        padding: 20px;
        padding-top: 50px;
        border-radius: 10px;
        position: relative;
        .bank_icon {
          position: absolute;
          top: 15px;
          right: 20px;
          color: $color-white;
          img {
            vertical-align: middle;
            margin-right: 10px;
          }
        }
      }
      .bank_gray {
        background-color: $color-gray18;
      }
      .bank_red {
        background-color: $color-red13;
      }
      .bank {
        background-color: $color-white;
        width: 320px;
        border-radius: 5px;
        padding: 20px 10px;
        padding-bottom: 0px;
        margin: 0 auto;
        p {
          padding-bottom: 15px;
          color: $color-gray3;
          i {
            font-style: normal;
            display: inline-block;
            width: 25%;
            text-align: right;
            margin-right: 5px;
          }
          span {
            display: inline-block;
            width: 73%;
            vertical-align: top;
            word-wrap: break-word;
            text-align: justify;
            color: $color-gray;
            font-weight: bold;
            border-bottom: $px solid $color-gray7;
            padding-bottom: 5px;
            padding-left: 5px;
            input {
              width: 100%;
              border: none;
              outline: none;
            }
          }
        }
      }
    }
    .pay-button {
      padding: 0px 30px;
      @include line-height(45px);
      border: $px solid $color-white;
      font-weight: bold;
      color: $color-white;
      text-align: center;
      margin-bottom: 10px;
      margin-right: 20px;
      opacity: 0.7;
    }
  }
  .margin-top {
    margin-top: 20px;
  }
  .radios {
    border-top: $px solid $color-blue8;
    margin-bottom: 0px;
    padding-top: 20px;
    .radio {
      width: 24%;
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .icon {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 5px;
    margin-top: -10px;
  }
  .submit-block {
    border-top: $px solid $color-blue8;
    padding-top: 20px;
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
