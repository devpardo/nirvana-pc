<template lang="html">
  <div>
    <div class="order dl" v-for="item in withdrawals">
      <div class="order-header">
        <div class="header-left dl">
          <p class="status">
            <span>订单状态: </span>
            <span class="blue" v-if="item.status === 'status_created'">订单已提交，正在等待受理...</span>
            <span class="blue" v-else-if="item.status === 'status_pended'">订单已接受，正在审核...</span>
            <span class="blue" v-else-if="item.status === 'status_checked'">订单审核通过，正在出款操作...</span>
            <span class="blue" v-else-if="item.status === 'status_processing'">正在出款...</span>
            <span class="green" v-else-if="item.status === 'status_completed'">出款成功，请核实...</span>
            <span class="red failed" v-else-if="item.status === 'status_failed'" @click="goToDesc(item.bill_no)">取款失败，请点击交易记录查看详情</span>
          </p>
          <p><span>订单编号: </span><span>{{ item.bill_no }}</span></p>
          <!--<p><span>点击查看: </span><span>请查看您的银行帐号</span></p>-->
        </div>
        <span class="button hand fr dl" v-if="item.status === 'status_created'" @click="cancel(item.id)">取消</span>
      </div>
      <div class="order-footer" v-for="i in item.status_footprints">
        <p class="record">
          <span class="footer-left dl" v-if="i.after.status === 'status_created'"><span class="info dl"></span><span>订单已提交，正在等待受理</span></span>
          <span class="footer-left dl" v-else-if="i.after.status === 'status_pended'"><span class="info dl"></span><span>订单已接受，正在审核</span></span>
          <span class="footer-left dl" v-else-if="i.after.status === 'status_checked'"><span class="info dl"></span><span>订单审核通过，正在出款操作</span></span>
          <span class="footer-left dl" v-else-if="i.after.status === 'status_processing'"><span class="info dl"></span><span>正在出款</span></span>
          <span class="footer-left dl" v-else-if="i.after.status === 'status_completed'"><span class="success dl"></span><span>出款成功，感谢您的耐心等候</span></span>
          <span class="footer-left dl" v-else-if="i.after.status === 'status_succeeful'"><span class="success dl"></span><span>支付成功，感谢您的耐心等候</span></span>
          <span class="footer-left dl" v-else-if="i.after.status === 'status_canceled'"><span class="done dl"></span><span>您已取消订单</span></span>
          <span class="footer-left dl" v-else-if="i.after.status === 'status_expired'"><span class="done dl"></span><span>您的订单已过期</span></span>
          <span class="footer-left dl" v-else-if="i.after.status === 'status_failed'"><span class="error dl"></span><span>出款失败</span></span>
          <span class="footer-right dl">{{ i.created_at | date }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import "@/libs/filters";

  export default {
    props: ["withdrawals", "cancelOrder"],
    methods: {
      cancel(id) {
        this.cancelOrder(id);
      },
      goToDesc(item) {
        this.$router.push({ name: "BalanceHistories", query: { q: item } });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .order {
    background-color: $color-white;
    padding: 10px 0px;
    width: 400px;
    vertical-align: top;
    margin-bottom: 15px;
    margin-right: 10px;
    p {
      padding: 3px 0px;
    }
    .order-header {
      padding: 10px;
      border-bottom: $px solid $color-gray4;
      color: $color-gray;
    }
    .status {
      span {
        font-size: $font-h4;
        &:first-of-type {
          color: $color-gray;
          font-weight: bold;
        }
      }
      .blue {
        color: $color-blue2;
        font-size: $font-h5;
      }
    }
    .header-left {
      width: 82%;
      word-break: break-all;
    }
    .button {
      padding: 3px 15px;
      border: $px solid $color-blue2;
      border-radius: 5px;
      color: $color-blue2;
    }
  }
  .order-footer {
    padding: 10px;
    color: $color-gray10;
    p {
      padding: 5px 0px;
    }
    .footer-left {
      width: 65%;
      .success {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: $color-green;
        position: relative;
        vertical-align: top;
        margin-right: 10px;
        &:after {
          content: "";
          width: 3px;
          height: 8px;
          border-bottom: 2px solid $color-white;
          border-right: 2px solid $color-white;
          position: absolute;
          transform: rotate(45deg);
          left: 6px;
          top: 2px;
        }
      }
      .error {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: $color-red1;
        position: relative;
        vertical-align: top;
        margin-right: 10px;
        &:after {
          content: "+";
          color: $color-white;
          font-size: $font-h1;
          position: absolute;
          transform: rotate(45deg);
          left: 4px;
          bottom: -5px;
        }
      }
      .info {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: $px solid $color-blue2;
        position: relative;
        vertical-align: top;
        margin-right: 10px;
        &:after {
          content: "";
          width: 10px;
          height: 10px;
          background-color: $color-blue2;
          border-radius: 50%;
          position: absolute;
          left: 2.18px;
          bottom: 1.88px;
        }
      }
      .done {
        width: 16px;
        height: 16px;
        background-color: $color-gray6;
        border-radius: 50%;
        vertical-align: top;
        margin-right: 10px;
      }
    }
    .footer-right {
      width: 32%;
    }
  }
  .footer-left,
  .footer-right {
    vertical-align: top;
    word-break: break-all;
  }
  .green {
    color: $color-green;
  }
  .red {
    color: $color-red1;
  }

  .failed {
    cursor: pointer;
  }
</style>
