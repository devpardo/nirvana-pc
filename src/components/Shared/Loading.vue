<template lang="html">
  <div class="loading" v-loading="loading" element-loading-text="正在加载中">
  </div>
</template>

<script>
export default {
  props: ["loading"]
};
</script>

<style lang="scss" scoped>
.loading {
  padding: 50px 0px;
}
</style>
