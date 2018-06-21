<template lang="html">
  <div class="table" id="balance">
    <p class="title" v-if="balance && balance.flag">交易记录</p>
    <p class="th">
      <span class="th-1">交易号</span>
      <span class="th-2">创建日期</span>
      <span class="th-3">交易方式</span>
      <span class="th-4">转账说明</span>
      <span class="th-5">总金额</span>
      <span class="th-6">交易状态</span>
      <span class="th-7">详情</span>
    </p>
    <div class="tbody" v-if="balance && balance.items && balance.items.length">
      <p v-for="(item, index) in balance.items" :class="{ 'hover': index === current }">
        <span class="td-1">{{ item.bill_no || '无' }}</span>
        <span class="td-2">{{ item.created_at | date }}</span>
        <span v-if="item.balance_type === 'balance_deposit'" class="td-3">充值</span>
        <span v-else-if="item.balance_type === 'balance_withdraw'" class="td-3">提款</span>
        <span v-else-if="item.balance_type === 'balance_rebate'" class="td-3">返水</span>
        <span v-else-if="item.balance_type === 'balance_bonus'" class="td-3">奖金</span>
        <span v-else-if="item.balance_type === 'balance_transfer_main'" class="td-3">转出</span>
        <span v-else-if="item.balance_type === 'balance_transfer_sub'" class="td-3">转入</span>
        <span class="td-3" v-else>无描述</span>
        <span class="td-4">{{ item.label || '无' }}</span>
        <span class="td-5">{{ item.total_amount || '无' }}</span>
        <span v-if="item.status === 'status_created'" class="td-6">新建</span>
        <span v-else-if="item.status === 'status_checked'" class="td-6">检查通过</span>
        <span v-else-if="item.status === 'status_processing'" class="td-6">处理中</span>
        <span v-else-if="item.status === 'status_pended'" class="td-6">待支付，等待中</span>
        <span v-else-if="item.status === 'status_completed'" class="td-6">已完成</span>
        <span v-else-if="item.status === 'status_succeeful'" class="td-6">支付成功</span>
        <span v-else-if="item.status === 'status_failed'" class="td-6">失败</span>
        <span v-else-if="item.status === 'status_canceled'" class="td-6">取消</span>
        <span v-else-if="item.status === 'status_expired'" class="td-6">过期</span>
        <span class="td-6" v-else>无状态</span>
        <span class="fa hand click td-7" @click="detail(item.bill_no, index)">{{search}}</span>
      </p>
      <p class="more-tag" v-if="balance && balance.flag"><span class="more hand fr" @click="more()">查看更多...</span></p>
    </div>
    <loading :loading="load.flag" v-if="load.flag"></loading>
    <div v-else-if="balance.items && !balance.items.length" class="error-all"></div>
    <balance-detail v-if="balanceDetail.flag && balance && balance.items && balance.items.length" :balanceDetail="balanceDetail"></balance-detail>
  </div>
</template>

<script>
import BalanceDetail from "@/components/Setting/BalanceDetail.vue";
import Loading from "@/components/Shared/Loading.vue";
import "@/libs/filters.js";

export default {
  props: ["balance", "load"],
  data() {
    return {
      search: this.$fontawesome("search"),
      balanceDetail: {
        flag: false,
        data: ""
      },
      current: ""
    };
  },
  components: { BalanceDetail, Loading },
  methods: {
    detail(no, index) {
      this.current = index;
      this.balanceDetail.flag = true;
      this.api.getBalancehistory(no).then((res) => {
        this.balanceDetail.data = res.data;
      });
    },
    more() {
      this.$router.push({ name: "BalanceHistories" });
    }
  },
  watch: {
    "$route.query": {
      handler(val) {
        console.log(val, this.balance);
        // && this.balance && this.balance.items && this.balance.items.length
        if (val && val.q) {
          // const index = this.balance.items.findIndex( item => item.bill_no === val.q)
          this.balanceDetail.flag = true;
          this.api.getBalancehistory(val.q).then((res) => {
            this.balanceDetail.data = res.data;
          });
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.error-all {
  display: block;
  margin: 25px auto;
  bottom: 17px;
}
.table {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  .title {
    color: $color-white;
    font-size: $font-h1;
    padding: 20px 10px;
    text-align: left;
    font-weight: bold;
  }
  .th {
    background-color: rgba($color-white, .3);
    color: $color-white;
    .th-1 {
      width: 200px;
    }
    .th-2 {
      width: 200px;
    }
    .th-3 {
      width: 100px;
    }
    .th-4 {
      width: 200px;
    }
    .th-5 {
      width: 100px;
    }
    .th-6 {
      width: 200px;
    }
    .th-7 {
      width: 150px;
    }
    span {
      display: inline-table;
      font-size: $font-h4;
    }
    padding: 0;
    @include line-height(45px);
    font-weight: bold;
  }
  .tbody {
    background-color: rgba($color-white, .1);
    color: $color-white;
    .td-1 {
      width: 200px;
    }
    .td-2 {
      width: 200px;
    }
    .td-3 {
      width: 100px;
    }
    .td-4 {
      width: 200px;
    }
    .td-5 {
      width: 100px;
    }
    .td-6 {
      width: 200px;
    }
    .td-7 {
      width: 150px;
    }
    span {
      display: inline-block;
      padding: 10px 0px;
      border-right: $px solid rgba($color-white, .3);
      font-weight: normal;
    }
    .click {
      border-right: none;
      color: $color-white;
    }
    p {
      border-bottom: $px solid rgba($color-white, .3);
      border-left: $px solid rgba($color-white, .3);
      border-right: $px solid rgba($color-white, .3);
      &:nth-child(2n) {
        background-color: rgba($color-white, .2);
      }
    }
    .more {
      color: $color-blue3;
    }
  }
}
</style>
