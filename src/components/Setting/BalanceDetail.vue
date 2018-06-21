<template lang="html">
  <div class="mask-layer">
    <div class="balance" v-if="balanceDetail.data">
      <p class="title">交易详情<span class="close hand fr" @click="close()">+</span></p>
      <div class="content">
        <div class="content-detail">
          <p><span class="name">交易号:</span><span class="info yellow">{{ balanceDetail.data.bill_no || '无' }}</span></p>
          <p><span class="name">交易日期:</span><span class="info">{{ balanceDetail.data.created_at | date }}</span></p>
          <p>
            <span class="name">交易状态:</span>
            <span class="info" v-if="balanceDetail.data.status === 'status_created'">新建</span>
            <span class="info" v-else-if="balanceDetail.data.status === 'status_checked'">检查通过</span>
            <span class="info" v-else-if="balanceDetail.data.status === 'status_processing'">处理中</span>
            <span class="info" v-else-if="balanceDetail.data.status === 'status_pended'">待支付，等待中</span>
            <span class="info" v-else-if="balanceDetail.data.status === 'status_completed'">已完成</span>
            <span class="info" v-else-if="balanceDetail.data.status === 'status_succeeful'">支付成功</span>
            <span class="info" v-else-if="balanceDetail.data.status === 'status_failed'">失败</span>
            <span class="info" v-else-if="balanceDetail.data.status === 'status_canceled'">取消</span>
            <span class="info" v-else-if="balanceDetail.data.status === 'status_expired'">过期</span>
          </p>
          <p>
            <span class="name">交易方式:</span>
            <span class="info" v-if="balanceDetail.data.balance_type === 'balance_deposit'">充值</span>
            <span class="info" v-else-if="balanceDetail.data.balance_type === 'balance_withdraw'">提款</span>
            <span class="info" v-else-if="balanceDetail.data.balance_type === 'balance_rebate'">返水</span>
            <span class="info" v-else-if="balanceDetail.data.balance_type === 'balance_bonus'">奖金</span>
            <span class="info" v-else-if="balanceDetail.data.balance_type === 'balance_transfer_main'">转出</span>
            <span class="info" v-else-if="balanceDetail.data.balance_type === 'balance_transfer_sub'">转入</span>
          </p>
          <p v-if="balanceDetail.data.base_amount && parseFloat(balanceDetail.data.base_amount)"><span class="name">金额:</span><span class="info bold">{{ balanceDetail.data.base_amount || '无' }}</span></p>
          <p v-if="balanceDetail.data.total_amount && parseFloat(balanceDetail.data.promo_amount)"><span class="name">优惠金额:</span><span class="info bold">{{ balanceDetail.data.promo_amount || '无' }}</span></p>
          <p v-if="balanceDetail.data.total_amount && parseFloat(balanceDetail.data.total_amount)"><span class="name">总金额:</span><span class="info bold">{{ balanceDetail.data.total_amount || '无' }}</span></p>
          <p v-if="balanceDetail.data.order && balanceDetail.data.order.remark"><span class="name">备注:</span><span class="info">{{ balanceDetail.data.order.remark || '无' }}</span></p>
          <p v-if="balanceDetail.data.manual_adjustment"><span class="name">信息描述:</span><span class="info">{{ balanceDetail.data.manual_adjustment.label || '无' }}</span></p>
          <div v-if="balanceDetail.data.transfer">
            <p>
              <span class="name">交易平台:</span><span class="info">{{ balanceDetail.data.transfer.vendor_name || '无' }}</span>
            </p>
            <p v-if="balanceDetail.data.transfer.promotion_name">
              <span class="name">优惠名字:</span><span class="info">{{ balanceDetail.data.transfer.promotion_name || '无' }}</span>
            </p>
            <div v-if="balanceDetail.data.transfer.adjustments">
              <h4>优惠附加信息</h4>
              <div v-for="item in balanceDetail.data.transfer.adjustments">
                <p>
                  <span class="name">优惠说明:</span><span class="info">{{ item.label || '无' }}</span>
                </p>
                <p>
                  <span class="name">交易货币:</span><span class="info">{{ item.adjustable.currency || '无' }}</span>
                </p>
              </div>
            </div>
            <div v-if="balanceDetail.data.transfer.wager">
              <h4>wager</h4>
              <p>
                <span class="name">锁定时间:</span><span class="info">{{ balanceDetail.data.transfer.wager.locked_at | date }}</span>
              </p>
              <p>
                <span class="name">已完成金额:</span><span class="info bold">{{ balanceDetail.data.transfer.wager.wager_amount || '无' }}</span>
              </p>
              <p>
                <span class="name">投注需求金额:</span><span class="info bold">{{ balanceDetail.data.transfer.wager.wager_requirement || '无' }}</span>
              </p>
            </div>
          </div>
        </div>
        <div v-if="balanceDetail.data.order && balanceDetail.data.order.footprints">
          <task-tree :orders="balanceDetail.data.order.footprints" :status="balanceDetail.data.order.status" class="balanceDetail"></task-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/libs/filters";
import TaskTree from "@/components/Setting/TaskTree.vue";

export default {
  props: ["balanceDetail"],
  components: { TaskTree },
  methods: {
    close() {
      this.balanceDetail.flag = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

h4 {
  font-size: $font-h4;
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
  overflow: scroll;
}
.balance {
  position: absolute;
  top: 20%;
  left: 30%;
  width: 600px;
  background-color: $color-blue9;
  border-radius: 5px;
  .title {
    padding: 15px 10px;
    padding-left: 20px;
    width: 100%;
    text-align: left;
    font-size: $font-h4;
    font-weight: bold;
    color: $color-white;
    position: relative;
    .close {
      color: $color-white;
      font-size: $font;
      transform: rotate(45deg);
      position: relative;
      bottom: 15px;
    }
  }
}
.content {
  padding: 20px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: $color-blue8;
  .content-detail, .balanceDetail {
    background-color: $color-blue9;
    padding: 20px;
  }
  .balanceDetail {
    margin-top: 10px;
  }
  h4 {
    color: rgba($color-white, .5);
  }
  p {
    padding-bottom: 15px;
  }
  .name {
    text-align: left;
    width: 30%;
    color: rgba($color-white, .5)
  }
  .info {
    text-align: right;
    width: 68%;
    color: $color-white;
  }
  .bold {
    font-weight: bold;
  }
  .yellow {
    color: $color-yellow12;
  }
  span {
    color: $color-gray3;
    display: inline-block;
    vertical-align: top;
  }
}
</style>
