<template lang="html">
  <div>
    <div class="nav-menu">
      <ul>
        <li class="nav-item" v-for="(item, n) in menuDatas" :class="{ 'red': menuFlags[n], 'border-top': n === 0 }">
          <span @click="menuToggle(n)">
            <h3>{{ item.title }}</h3>
            <i class="fa fa-chevron-down" v-if="menuStateChecker(n)"></i>
            <i class="fa fa-chevron-right" v-else></i>
          </span>
          <ul class="menu" ref="menu" :style="{'display': menuStateChecker(n) ? 'block' : 'none'}">
            <li v-for="sub in item.sub">
              <router-link :to="`/footer_info/${sub.id}`">{{sub.title}}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["menuFlags", "menuDatas", "ob"],
  data() {
    return {
      menuIndexState: []
    };
  },
  mounted() {
    for (let i = 0, m = this.$refs.menu; i < m.length; i++) {
      this.menuIndexState.push(i);
    }
  },
  methods: {
    menuToggle(index) {
      let _c = false;
      let _m = this.menuIndexState.sort(function(a, b) {
        return a - b;
      });
      for (let i = 0; i < _m.length; i++) {
        if (_m[i] === index) {
          _c = true;
          _m.splice(i, 1);
          break;
        }
      }

      if (!_c) {
        this.menuIndexState.push(index);
      }
    },
    menuStateChecker(index) {
      if (this.menuIndexState.includes(index)) return true;
      return false;
    },
    changeShow(n) {
      this.menuFlags.forEach((item, index) => {
        if (index === n) {
          this.$set(this.menuFlags, index, true);
        } else {
          this.$set(this.menuFlags, index, false);
        }
      });
      this.ob.category = n;
      this.$router.push({ name: "FooterInfo", params: { category: n } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.nav-menu {
  padding-right: 20px;

  .nav-item {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid $color-blue9;

    span {
      font-size: $font-h3;
      color: $color-white;
      cursor: pointer;
      position: relative;
      display: block;

      h3 {
        font-size: $font-h3;
        margin-bottom: 10px;
      }

      .fa {
        display: inline-block;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        font-weight: lighter;
      }
    }

    .menu {
      li {
        padding: 5px 10px;
        a {
          text-decoration: none;
          color: rgba($color-white, .5);
        }
        a.router-link-exact-active {
          color: $color-yellow13;
        }
      }

    }

  }
}


</style>
