<template lang="html">
  <div v-loading="bodyLoading" class="banks">
    <p class="title-h1"><span>新增银行卡</span><span>Add</span></p>
    <div class="add_bank">
      <div class="block">
        <p class="title">选择银行</p>
        <loading :loading="loading" v-if="loading"></loading>
        <bank :banksObj="banksObj" v-else-if="flag"></bank>
        <p class="hand fr" @click="toggle()"><span v-if="flag">收起列表</span><span v-else>展开列表</span></p>
      </div>
      <div class="input">
        <span class="cell dl"><span class="name">银行卡号</span><input placeholder="必填" v-model="bank.no"/></span>
        <span class="cell dl"><span class="name">银行支行</span><input placeholder="可不填" v-model="bank.desc"/></span>
        <span class="cell dl"><span class="name">持卡人姓名</span><input :disabled="realnameFlag" placeholder="必填" v-model="bank.realname"/></span>
        <button class="button hand" :disabled="!bank.no || !bank.realname" @click="addBanks()">确认并提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import Bank from "@/components/Setting/Bank.vue";
import Loading from "@/components/Shared/Loading.vue";
import { regularExpression } from "@/libs/utils.js";

export default {
  data() {
    return {
      paginate: {
        page: 1,
        per_page: 100
      },
      banksObj: {
        banks: [],
        currentBank: ""
      },
      bank: {
        no: "",
        realname: "",
        bank_id: "",
        desc: "",
        is_primary: true
      },
      loading: true,
      bodyLoading: false,
      realnameFlag: false,
      flag: true
    };
  },
  components: { Bank, Loading },
  mounted() {
    this.fetchProfile();
    this.banks();
  },
  methods: {
    toggle() {
      this.flag = !this.flag;
    },
    fetchProfile() {
      this.api.getProfile().then((res) => {
        this.bank.realname = res.data.realname;
        if (res.data.realname) {
          this.realnameFlag = true;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    banks() {
      this.loading = true;
      this.api.getBanks(this.paginate).then((res) => {
        this.banksObj.banks = res.data && res.data.items;
        this.loading = false;
      });
    },
    addBanks() {
      if (!this.bank.no || !this.bank.realname) {
        this.$message({
          message: "必填字段不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.banksObj.currentBank) {
        this.$message({
          message: "请选择银行",
          type: "warning"
        });
        return;
      } else {
        this.bank.bank_id = this.banksObj.currentBank;
      }
      if (!regularExpression("bank", this.bank.no)) {
        this.$message({
          message: "银行卡号格式错误",
          type: "warning"
        });
        return;
      }
      this.bodyLoading = true;
      this.api.postBankCards(this.bank).then(() => {
        this.bank.no = "";
        this.bank.realname = "";
        this.bank.bank_id = "";
        this.bank.desc = "";
        this.$message({
          type: "success",
          message: "银行卡添加成功，可在银行账户查看"
        });
        this.bodyLoading = false;
        this.$router.back();
      }).catch(() => {
        this.bodyLoading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.banks {
  width: 1260px;
  margin: 0 auto;
}
.add_bank {
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
      font-weight: lighter;
    }
  }
}
.input {
  padding: 20px 0px;
  width: 100%;
  .name {
    color: $color-white;
    font-size: $font-h4;
    padding-right: 10px;
    font-weight: bold;
    padding-bottom: 10px;
    display: block;
  }
  .cell {
    margin-right: 100px;
    padding-bottom: 20px;
  }
  input {
    width: 400px;
    padding: 0px 10px;
    @include line-height(45px);
    border: $px solid $color-blue6;
    background-color: $color-blue8;
    border-radius: 4px;
    color: $color-white;
    &::placeholder {
      color: $color-white;
    }
    &:disabled {
      color: rgba($color-white, .5);
      font-weight: bold;
    }
  }
  .button {
    display: block;
    padding: 10px 80px;
    background-color: $color-yellow13;
    text-align: center;
    color: $color-blue9;
    border-radius: 20px;
    border: none;
    &:disabled {
      opacity: .7;
    }
  }
}
.block {
  border-bottom: $px solid $color-blue8;
  padding-bottom: 70px;
  .title {
    font-size: $font-h4;
    color: $color-yellow13;
  }
  .fr {
    width: 100%;
    margin-top: 20px;
    text-align: center;
    font-size: $font-h5;
    font-weight: normal;
    color: $color-white;
    span {
    padding: 5px 20px;
    border: 2px solid $color-white;
    border-radius: 20px;
    opacity: .5;
    &:hover {
      opacity: 1;
    }
    }
  }
}
</style>
