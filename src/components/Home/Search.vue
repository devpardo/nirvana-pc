<template lang="html">
  <div class="search" :class="[ searchValue ? 'width-1' : 'width' ]">
   <input placeholder="搜索游戏名、游戏平台" v-model="searchValue"/>
   <span class="grey dl fa hand" :class="[ searchValue ? 'yellow' : 'grey' ]" @click="goSearch()">{{ fa_search }}</span>
   <span class="remove dl fa hand" v-if="searchValue" @click="close()">{{ remove }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fa_search: this.$fontawesome("search"),
      remove: this.$fontawesome("remove"),
      searchValue: ""
    };
  },
  watch: {
    "$route"(newRoute) {
      if (newRoute.name === "SearchResult") {
        this.searchValue = newRoute.query.searchText;
      }
    }
  },
  methods: {
    close() {
      this.$router.push({ name: "SearchResult", query: {random: Math.random()} });
    },
    goSearch() {
      this.$router.push({ name: "SearchResult", query: Object.assign({}, this.$route.query, { searchText: this.searchValue, random: Math.random() }) });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.search {
  position: relative;
  input {
    padding: 10px 20px;
    width: 100%;
    border-radius: 20px;
    outline: none;
    border: $px solid $color-blue8;
    @include line-height(40px);
  }
  .fa {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: $font-h1;
  }
  .remove {
    font-size: $font-h1;
    color: $color-gray7;
    position: absolute;
    top: 15px;
    right: 50px;
  }
  .grey {
    color: $color-gray3;
  }
  .red {
    color: $color-red9;
  }
  .yellow {
    color: $color-yellow13;
  }
}
.width {
  width: 360px;
  input {
    padding-right: 40px;
  }
}
.width-1 {
  width: 360px;
  input {
    padding-right: 70px;
  }
}
</style>
