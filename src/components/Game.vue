<template lang="html">
  <router-view :key="routeKey"></router-view>
</template>

<script>
export default {
  computed: {
    routeKey() {
      return `${this.$route.path.match("slot|live_casino|fishing")}`;
    }
  }
};
</script>

<style lang="scss">
</style>
