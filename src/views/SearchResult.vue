<template lang="html">
  <div class="body">
    <div class="search-module">
      <p class="title-h1"><span>搜索结果</span></p>
      <div class="search-content">
        <p class="result">已为您找到 {{paginateMeta.total_count || 0}} 个<span class="value">"{{ searchText }}"</span><span class="close hand" @click="resetSearch" v-if="searchItems.length">撤销搜索</span></p>
        <p class="query">
          <span class="key hand dl" v-for="item in searchItems"><i class="dl" @click="toggleSearchItem(item)">+</i><span>{{item.name}}</span></span>
        </p>
        <div class="results">
          <div class="results-left dl">
            <div class="choice">
              <p class="title">筛选平台</p>
              <ul>
                <li v-for="vendor in vendors" class="hand" @click="toggleSearchItem(vendor)"><span class="fa grey" :class="{yellow: vendor['isCheck']}">{{ check }}</span><span class="grey-1" :class="{yellow: vendor['isCheck']}">{{vendor.name}}</span></li>
              </ul>
            </div>
            <div class="choice">
              <p class="title">筛选类型</p>
              <ul>
                <li v-for="label in vendorsLabels" class="hand" @click="toggleSearchItem(label)"><span class="fa grey" :class="{yellow: label['isCheck']}">{{ check }}</span><span class="grey-1" :class="{yellow: label['isCheck']}">{{label.name}}</span></li>
              </ul>
            </div>
          </div>
          <div class="results-right dl">
            <game v-for="(game, id) in items" :key="id" :game="game" class="dl"></game>
            <loading :loading="loading" v-if="loading"></loading>
            <div v-else-if="items && !items.length" class="error-all"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Game from "@/components/Shared/Game.vue";
import Loading from "@/components/Shared/Loading.vue";
import query from "@/components/Shared/mixins/query";
import indexBase from "@/components/Shared/mixins/indexBase";
export default {
  mixins: [query, indexBase],
  data() {
    return {
      searchText: this.$route.query.searchText,
      check: this.$fontawesome("check-square"),
      vendors: [],
      vendorsLabels: [],
      searchItems: []
    };
  },
  computed: {
    calcQ() {
      let q = {q_vendor_id_in: [], q_tags_name_in: [], q_name_cont: this.searchText, per_page: 200};
      this.searchItems.forEach(item => {
        if (item.id) {
          q.q_vendor_id_in.push(item.id);
        } else {
          q.q_tags_name_in.push(item.name);
        }
      });
      return q;
    }
  },
  methods: {
    fetchData() {
      this._fetchData(this.api.getGames(this.calcQ));
    },
    fetchVendors() {
      this.api.getVendors().then(res => {
        this.vendors = res.data.items;
      });
    },
    fetchVendorLabels() {
      this.api.getVendorsLabels().then(res => {
        this.vendorsLabels = res.data.items;
      });
    },
    toggleSearchItem(item) {
      this.$set(item, "isCheck", !item["isCheck"]);
      if (item["isCheck"]) {
        this.searchItems.push(item);
      } else {
        this.searchItems.remove(item);
      }
      this.$router.push({query: Object.assign(this.q, this.calcQ)});
    },
    resetSearch() {
      this.searchItems.forEach(item => {
        item["isCheck"] = false;
      });
      this.searchItems = [];
      this.$router.push({query: Object.assign(this.q, this.calcQ)});
    }
  },
  mounted() {
    this.fetchVendors();
    this.fetchVendorLabels();
  },
  components: { Game, Loading }
};
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/public';

.error-all {
  margin: 0 auto;
  display: block;
}
.search-module {
  width: $min-width;
  padding: 20px 0 0 20px;
  margin: 20px auto;
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
  .search-content {
    background-color: $color-blue8;
    padding: 20px;
    .result, .value {
      color: $color-white;
      font-size: $font-h4;
      font-weight: lighter;
    }
    .close {
      background-color: $color-yellow13;
      color: $color-blue9;
      padding: 3px 15px;
      padding-left: 5px;
      border-radius: 3px;
      margin-left: 20px;
      &:before {
        content: '+';
        color: $color-blue9;
        font-weight: bold;
        padding-right: 5px;
        font-size: $font-h1;
        display: inline-block;
        transform: rotate(-45deg);
      }
    }
    .query {
      background-color: $color-blue9;
      width: 100%;
      padding: 10px 20px;
      margin: 20px auto;
      .key {
        color: $color-yellow13;
        font-weight: bold;
        border: 2px solid $color-yellow13;
        padding: 4px 20px;
        padding-left: 5px;
        border-radius: 30px;
        vertical-align: middle;
        margin-right: 10px;
        span {
          vertical-align: middle;
        }
        i {
          vertical-align: middle;
          color: $color-blue9;
          background-color: $color-yellow13;
          font-weight: bold;
          font-size: $font-h1;
          font-style: normal;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          line-height: 17px;
          margin-right: 10px;
          text-align: center;
          transform: rotate(45deg);
        }
      }
    }
  }
}
.results {
  width: 100%;
  .results-left {
    width: 200px;
    margin-right: 10px;
    .choice {
      padding: 10px 0px;
      .title {
        font-size: $font-h3;
        font-weight: bold;
        color: $color-white;
        width: 100%;
        position: relative;
        &:after {
          position: absolute;
          right: 0px;
          top: 5px;
          display: inline-block;
          content: '';
          width: 8px;
          height: 8px;
          border-right: 2px solid $color-white;
          border-bottom: 2px solid $color-white;
          transform: rotate(45deg);
        }
      }
    }
    ul {
      padding: 20px 0px;
      border-bottom: $px solid $color-blue9;
      li {
        padding-bottom: 10px;
        .fa {
          font-size: $font-h3;
          padding-right: 10px;
        }
        .grey {
          color: $color-white;
        }
        .grey-1 {
          color: $color-white;
        }
        .red {
          color: $color-red9;
        }
        .yellow {
          color: $color-yellow13;
        }
        span {
          font-size: $font-h4;
        }
      }
    }
  }
  .results-right {
    width: 1000px;
    vertical-align: top;
  }
}
</style>
