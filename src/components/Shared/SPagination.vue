<template lang="html">
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="q.page"
      :page-sizes="[10, 20, 50, 100, 200]"
      :page-size="q.per_page"
      :layout="layout"
      :total="paginateMeta.total_count">
    </el-pagination>
  </div>
</template>

<script>
import { Pagination } from "element-ui";

export default {
  name: "SPagination",
  props: {
    q: {
      type: Object
    },
    paginateMeta: {
      type: Object
    },
    pushRouter: {
      type: Function
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    }
  },
  components: {
    "el-pagination": Pagination
  },
  methods: {
    handleSizeChange(val) {
      this.q.per_page = val;
      this.handleRouter();
    },
    handleCurrentPageChange(val) {
      this.q.page = val;
      this.handleRouter();
    },
    handleRouter() {
      if (this.pushRouter) {
        this.pushRouter();
      } else {
        this.$router.push({ query: { ...this.$route.query, ...this.q } });
      }
    }
  },
  mounted() {
    const paramQuery = this.$route.query;
    this.q.page = paramQuery.page && parseInt(paramQuery.page) || 1;
    this.q.per_page = paramQuery.per_page && parseInt(paramQuery.per_page) || 10;
  }
};
</script>

<style lang="css">
</style>
