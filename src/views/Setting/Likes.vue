<template lang="html">
  <div>
    <p class="title-h1"><span>我的收藏</span></p>
    <game class="dl" v-for="(game, id) in likes" :key="id" :game="game" :handleLike="handleLike"></game>
    <loading :loading="loading" v-if="loading"></loading>
    <div v-else-if="likes && !likes.length" class="error-all"></div>
  </div>
</template>

<script>
import Game from "@/components/Shared/Game.vue";
import Loading from "@/components/Shared/Loading.vue";

export default {
  data() {
    return {
      loading: true,
      exclamation: this.$fontawesome("exclamation-circle"),
      likes: ""
    };
  },
  mounted() {
    this.handleLike();
  },
  components: { Game, Loading },
  methods: {
    handleLike() {
      this.loading = true;
      this.api.getLikeGames().then((res) => {
        this.likes = res.data.items;
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
        console.log(error);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.error-all {
  display: block;
  margin: 10px auto;
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
