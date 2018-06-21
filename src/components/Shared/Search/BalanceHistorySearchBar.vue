<template>
  <div class="balance" id="balance">
    <p class="title">请选择筛选类型</p>
    <div v-for="search in searches">
      <div class="classify" v-if="search.key === 'q_balance_type_eq'">
        <span class="name">交易分类:</span>
        <span class="hand dl" :class="{'bg-red': q[search.key] == 'balance_deposit'}" @click="q[search.key] = 'balance_deposit'">充值</span>
        <span class="hand dl" :class="{'bg-red': q[search.key] == 'balance_withdraw'}" @click="q[search.key] = 'balance_withdraw'">提款</span>
        <span class="hand dl" :class="{'bg-red': q[search.key] == 'balance_rebate'}" @click="q[search.key] = 'balance_rebate'">返水</span>
        <span class="hand dl" :class="{'bg-red': q[search.key] == 'balance_bonus'}" @click="q[search.key] = 'balance_bonus'">奖金</span>
        <span class="hand dl" :class="{'bg-red': q[search.key] == 'balance_transfer_main'}" @click="q[search.key] = 'balance_transfer_main'">转出</span>
        <span class="hand dl" :class="{'bg-red': q[search.key] == 'balance_transfer_sub'}" @click="q[search.key] = 'balance_transfer_sub'">转入</span>
      </div>
      <div class="classify" v-if="search.key === 'q_status_eq'">
        <span class="name">交易状态:</span>
        <span class="hand dl" :class="{'bg-red': q[search.key] == 'status_processing'}" @click="q[search.key] = 'status_processing'">处理中</span>
        <span class="hand dl" :class="{'bg-red': q[search.key] == 'status_completed'}" @click="q[search.key] = 'status_completed'">已完成</span>
        <span class="hand dl" :class="{'bg-red': q[search.key] == 'status_failed'}" @click="q[search.key] = 'status_failed'">失败</span>
      </div>
      <div class="classify" v-if="search.key === 'range_created'">
        <p class="title">请选择筛选日期</p>
        <range-picker v-model="q[search.key]" placeholder="选择时间范围"></range-picker>
        <span class="button search hand" @click="goSearch">搜索</span>
        <span class="button bg-white hand" @click="clear()">清空</span>
      </div>
    </div>
  </div>
</template>

<script>
import RangePicker from "@/components/Shared/Picker/RangePicker";
export default {
  props: ["q", "searches"],
  methods: {
    goSearch() {
      this.searches.forEach((item) => {
        if (item.control === "range-date") {
          if (this.q[item.key] && this.q[item.key].length && this.q[item.key][0]) {
            this.q[item.key1] = this.q[item.key][0];
            this.q[item.key2] = this.q[item.key][1];
          } else {
            this.q[item.key1] = "";
            this.q[item.key2] = "";
          }
          delete this.q[item.key];
        }
      });

      let query = Object.assign({}, this.$route.query, this.q, {time: new Date().getTime()});
      this.$router.push({ query });
    },
    clear() {
      this.$router.push({query: {}});
    }
  },
  components: {
    RangePicker
  }
};
</script>

<style lang="scss" scoped>
@import '../../../assets/stylesheets/public';

.balance {
  margin: 0px auto;
  .title {
    font-size: $font-h4;
    font-weight: bold;
    color: $color-yellow13;
    padding-bottom: 10px;
  }
  .classify {
    padding-bottom: 10px;
    .name {
      color: $color-white;
      padding-right: 10px;
      font-weight: bold;
    }
    .dl {
      padding: 5px 30px;
      color: $color-white;
      border: $px solid $color-white;
      margin-right: 10px;
      opacity: .5;
    }
  }
}
.el-date-editor {
  margin-right: 10px;
}
.search {
  background-color: $color-yellow13;
  color: $color-blue9;
}
.button {
  padding: 8px 40px;
  text-align: center;
  display: inline-block;
  font-size: $font-h4;
  @include spacing(3px);
  border-radius: 5px;
  opacity: .7;
  &:hover {
    opacity: 1;
  }
}
.bg-white {
  margin-left: 10px;
  padding: 6px 40px;
  border: 2px solid $color-yellow13;
  color: $color-yellow13;
  opacity: .7;
  &:hover {
    background-color: $color-yellow13;
    color: $color-blue9;
    opacity: 1;
  }
}
#balance {
  .bg-red {
    color: $color-yellow13;
    border: $px solid $color-yellow13;
    position: relative;
    opacity: 1;
    &:after {
      content: '';
      position: absolute;
      top: -1px;
      right: -4px;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      border-bottom: 5px solid $color-yellow;
      transform: rotate(45deg);
    }
  }
}
</style>
