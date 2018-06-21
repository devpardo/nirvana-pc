<template>
  <div>
    <p class="title-h1"><span>交易记录</span></p>
    <div class="bg-color">
      <balance-history-search-bar :q="q" :searches="searches"></balance-history-search-bar>
      <banlance-table :balance="data" :load="load"></banlance-table>
      <s-pagination :q="q" :paginateMeta="paginateMeta"></s-pagination>
    </div>
  </div>
</template>

<script>
import BalanceHistorySearchBar from "@/components/Shared/Search/BalanceHistorySearchBar";
import BanlanceTable from "@/components/Setting/Table.vue";
import SPagination from "@/components/Shared/SPagination";
// mixin
import query from "@/components/Shared/mixins/query";
import indexBase from "@/components/Shared/mixins/indexBase";
export default {
  mixins: [query, indexBase],
  data() {
    return {
      load: {
        flag: true
      },
      searches: [{
        key: "q_balance_type_eq"
      }, {
        key: "q_status_eq"
      }, {
        control: "range-date",
        key: "range_created",
        key1: "q_created_at_gteq",
        key2: "q_created_at_lteq"
      }]
    };
  },
  watch: {
    loading(val) {
      this.load.flag = val;
    }
  },
  methods: {
    fetchData() {
      this._fetchData(this.api.getBalanceHistories(this.q));
    }
  },
  mounted() {
//    this.fetchBalance()
  },
  components: {
    BanlanceTable,
    BalanceHistorySearchBar,
    SPagination
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.error-all {
  margin: 10px auto;
  display: block;
}
.bg-color {
  background-color: $color-blue9;
  padding: 30px 40px;
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
</style>
