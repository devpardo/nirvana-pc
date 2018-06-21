<template lang="html">
  <div class="mask-layer">
    <div class="bill-content">
      <p class="title">
        <span>您的订单已成功提交！</span><span class="hand fr" @click="close()">×</span>
      </p>

      <div class="content">
        <div class="bg-white">
          <p class="h1">
            <template v-if="wechat.type === 'wxpay'">
              <span v-if="wechat.opt.match('好友转账')">
                扫码加好友，您转账微信客服来协助
                <i class="sr-only">wxpay friend transfer</i>
              </span>

              <span v-else>
                微信扫码成功率 <span class="red">100% 单笔10元 - 10000元</span>
                <!-- <br/>（本页面只支持<span class="green">微信扫码</span>入款） -->
                <i class="sr-only">wxpay qr code</i>
              </span>
            </template>

            <template v-else-if="wechat.type === 'alipay'">
              <span v-if="wechat.opt.match('好友转账')">
                扫码加好友，您转账支付宝客服来协助
                <i class="sr-only">alipay</i>
              </span>

              <span v-else>
                支付宝扫码成功率 <span class="red">100% 单笔10元 - 10000元</span>
                <br/>（本页面只支持<span class="blue">支付宝扫码</span>入款）
                <i class="sr-only">wxpay qr code</i>
                <p class="sr-only">alipay qr scan</p>
              </span>
            </template>
          </p>

          <div class="pay-info">
            <template v-if="wechat.type === 'wxpay'">
              <p v-if="wechat.opt.match('好友转账')">
                <span class="red">注意：</span>为了给您体验多样的微信客服服务风格，客服微信号会不定期更换，转账前请提交充值订单，并获取确认最新的微信好友二维码，转账请认准亚太微信客服，谨防假冒。<br/>
                <span class="red">特别提醒：</span> 成功添加好友后，请提供您的用户名，以便转账后客服为你快速完成额度添加。感谢您对亚太娱乐的支持！
                <i class="sr-only">wxpay friend transfer</i>
              </p>

              <p v-else>
                <span class="red">注意：</span>
                每次付款请扫描最新入款二维码，保存的二维码请勿二次使用！ <br/>
                <!-- <span class="red">特别提醒：</span>
                会员支付时，一定要备注页面提供的交易备注码，如无备注或备注错误，系统将无法为您即时入款，请各位会员配合。感谢您对亚太娱乐的支持！ -->
                <i class="sr-only">wxpay qr code</i>
              </p>
            </template>

            <template v-else-if="wechat.type === 'alipay'">
              <p v-if="wechat.opt.match('好友转账')">
                <span class="red">注意：</span>为了给您体验多样的支付宝客服服务风格，客服支付宝账号会不定期更换，转账前请提交充值订单，并获取确认最新的支付宝好友二维码，转账请认准亚太支付宝客服，谨防假冒。<br/>
                <span class="red">特别提醒：</span> 成功添加好友后，请提供您的用户名，以便转账后客服为你快速完成额度添加。感谢您对亚太娱乐的支持！
                <i class="sr-only">alipay</i>
              </p>

              <p v-else>
                <span class="red">注意：</span>
                每次付款请扫描最新入款二维码，保存的二维码请勿二次使用！ <br/>
                <span class="red">特别提醒：</span>
                会员支付时，一定要备注页面提供的交易备注码，如无备注或备注错误，系统将无法为您即时入款，请各位会员配合。感谢您对亚太娱乐的支持！
                <p class="sr-only">alipay qr scan</p>
              </p>
            </template>

          </div>
        </div>

        <div class="demo-img">
          <span class="pay dl">
            <img :src="wechat.img" width="160px" height="160px"/>
            <p>转账金额：<span class="red">{{ wechat.amount || '--' }}</span></p>
            <p v-if="wechat.type === 'alipay'">交易备注码：<span class="red">{{ wechat.code.slice(-4) || '--' }}</span></p>
            <p v-else></p>
          </span>

          <span class="dl">
            <!-- <img v-if="wechat.type === 'alipay' && wechat.opt.match('好友转账')" src="../../assets/images/deposit-scr.png" width="240px" height="260px"/>
            <img v-else-if="wechat.type === 'wxpay' && wechat.opt.match('好友转账')" src="../../assets/images/deposit-scr.png" width="240px" height="260px"/>
            <img v-else-if="wechat.type === 'wxpay' && wechat.opt.match('微信扫码')" src="../../assets/images/wechat-demo.png" width="240px" height="260px"/> -->

            <template v-if="wechat.type === 'wxpay'">
              <img v-if="wechat.opt.match('好友转账')" src="../../assets/images/deposit-scr.png" width="240px" height="260px">
              <img v-else src="../../assets/images/wechat-demo.png" width="240px" height="260px">
            </template>

            <template v-else-if="wechat.type === 'alipay'">
              <img v-if="wechat.opt.match('好友转账')" src="../../assets/images/deposit-scr.png" width="240px" height="260px">
              <img v-else src="../../assets/images/alipay-demo.png" width="240px" height="260px">
            </template>

          </span>
        </div>

        <template v-if="wechat.type === 'wxpay'">
          <p v-if="wechat.opt.match('好友转账')">
            <span class="blue fa">{{ exclamation_circle }}</span>
            若款项未及时到账，请及时联系<span class="green">在线客服</span>进行咨询协助。
            <i class="sr-only">wxpay friend transfer</i>
          </p>

          <p v-else>
            <span class="red fa">{{ exclamation_circle }}</span>
            <span class="red">扫码后，请按照右图所示填写【转账金额】后转账，系统将会在30秒内完成支付。
            </span>
            <br/>
            <span class="blue fa">{{ exclamation_circle }}</span>
            若款项未及时到账，请及时联系<span class="green">在线客服</span>进行咨询协助
          </p>
        </template>

        <template v-else-if="wechat.type === 'alipay'">
          <p v-if="wechat.opt.match('好友转账')">
            <span class="blue fa">{{ exclamation_circle }}</span>
            若款项未及时到账，请及时联系<span class="blue">在线客服</span>进行咨询协助
            <i class="sr-only">alipay</i>
          </p>

          <p v-else>
            <span class="red fa">{{ exclamation_circle }}</span>
            <span class="red">扫码后，请按照右图所示填写【转账金额】及【交易备注码】后转账，系统将会在30秒内完成支付。
            </span>
            <br/>
            <span class="blue fa">{{ exclamation_circle }}</span>
            若款项未及时到账，请及时联系<span class="blue">在线客服</span>进行咨询协助
            <p class="sr-only">alipay qr scan</p>
          </p>
        </template>
        <button class="submit hand" @click="close()">已完成支付</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["wechat"],
  data() {
    return {
      exclamation_circle: this.$fontawesome("exclamation-circle")
    };
  },
  methods: {
    close() {
      this.wechat.flag = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.mask-layer {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 2001;
}
.bill-content {
  position: absolute;
  width: 600px;
  height: auto;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: $color-white3;
  border-radius: 5px;
  .title {
    @include line-height(50px);
    background-color: $color-white;
    width: 100%;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding: 0px 15px;
    span { font-size: $font-h4; }
    color: $color-gray;
    font-weight: bold;
    .fr {
      color: $color-gray3;
      font-size: $font-h;
    }
  }
  .content {
    padding: 12px 20px;
    .submit {
      width: 200px;
      @include line-height(40px);
      background-color: $color-blue2;
      color: $color-white;
      border-radius: 25px;
      margin: 10px auto;
      display: block;
      outline: none;
    }
    .info {
      color: $color-gray;
      font-weight: bold;
      padding-bottom: 5px;
      .fa {
        font-size: $font-h4;
        padding-right: 5px;
      }
    }
    .red {
      color: $color-red1;
    }
    .green {
      color: $color-green3;
    }
    .blue {
      color: $color-blue2;
    }
    .demo-img {
      padding: 10px 50px;
      padding-top: 20px;
      .dl {
        vertical-align: top;
      }
      .pay {
        padding-right: 52px;
        p {
          color: $color-gray;
          @extend .break-word;
          width: 155px;
          .red {
            font-size: $font-h;
            padding-left: 3px;
            font-weight: bold;
          }
        }
      }
    }
    .bg-white {
      background-color: $color-white;
      padding: 12px 20px;
      .h1 {
        font-size: $font-h1;
        color: $color-gray;
        text-align: center;
        font-weight: bold;
        span { font-size: $font-h1; }
      }
      .pay-info {
        font-weight: bold;
        color: $color-gray;
        padding-top: 10px;
        .h3 {
          font-size: $font-h4;
          span {
            font-size: $font-h4;
          }
        }
      }
    }
  }
}
</style>
