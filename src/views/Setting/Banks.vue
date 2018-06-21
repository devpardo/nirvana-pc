<template lang="html">
  <div class="banks-block">
    <p class="title-h1"><span>我的银行卡</span></p>
    <div class="bank-body" v-if="banks && banks.items && banks.items.length">
      <p class="title">已绑定银行卡</p>
      <div class="banks">
        <span class="bank hand dl" v-for="(item, index) in banks.items">
          <p class="name"><span class="icon dl"><img :src="item.bank.image_url" width="100%" height="100%"/></span>{{ item.bank.name || '无' }}</p>
          <p class="number"><span>**** **** **** {{ item.no.slice(-4) }}</span><span>储蓄卡</span></p>
          <p>
            <span class="owner">{{ item.realname.slice(0, 1) }}**</span>
            <!--<span class="delete hand" @click="deleteBank(item.id)">删除</span>-->
          </p>
          <!--<p class="owner">{{ item.realname.slice(0, 1) }}**</p>
          <p class="delete hand" @click="deleteBank(item.id)">删除</p>-->
        </span>
        <span class="add_bank hand dl" @click="addBank()">
          <p class="fa">{{ plus_circle }}</p>
          <p>新增银行卡</p>
        </span>
      </div>
    </div>
    <loading :loading="loading" v-if="loading"></loading>
    <div v-else-if="!banks.items.length">
      <span class="add_bank hand dl" @click="addBank()">
        <p class="fa">{{ plus_circle }}</p>
        <p>新增银行卡</p>
      </span>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Shared/Loading.vue";

export default {
  data() {
    return {
      plus_circle: this.$fontawesome("plus-circle"),
      banks: "",
      loading: true
    };
  },
  mounted() {
    this.getBanks();
  },
  components: { Loading },
  methods: {
    getBanks() {
      this.banks = [];
      this.loading = true;
      this.api.getBankCards().then((res) => {
        this.banks = res.data;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    addBank() {
      this.$router.push({ name: "AddBank" });
    },
    deleteBank(id) {
      let _this = this;
      this.$confirm("确认解绑此银行卡?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _this.api.deleteBank(id).then(() => {
          _this.getBanks();
          _this.$message({
            type: "success",
            message: "已解绑"
          });
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
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
.banks-block {
  width: 100%;
  margin: 0 auto;
  .add_bank {
    vertical-align: top;
    width: 240px;
    height: 100px;
    border: $px dotted $color-white;
    text-align: center;
    color: $color-gray7;
    padding-top: 30px;
    border-radius: 5px;
    .fa {
      font-size: $font-h;
      padding-bottom: 5px;
    }
  }
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
.bank-body {
  background-color: $color-blue9;
  min-height: 500px;
  padding: 30px 40px;
  .title {
    color: $color-yellow13;
    font-size: $font-h4;
    font-weight: bold;
  }
}
.banks {
  margin-top: 10px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  .bank {
    vertical-align: top;
    width: 240px;
    height: 100px;
    padding: 10px 20px;
    margin-bottom: 10px;
    margin-right: 10px;
    background-color: $color-white;
    border-radius: 5px;
    p {
      padding-bottom: 10px;
    }
    .name {
      font-weight: bold;
      color: $color-gray;
    }
    .number {
      span {
        color: $color-gray3;
        &:first-of-type {
          padding-right: 10px;
        }
      }
    }
    .owner {
      color: $color-gray3;
      }
    .delete {
      font-size: $font-h5;
      float: right;
      color: $color-blue2;
      text-align: right;
      text-decoration: underline;
    }
  }
  .icon {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
