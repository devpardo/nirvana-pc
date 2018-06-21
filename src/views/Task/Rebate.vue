<template lang="html">
  <div>
    <!-- <pre style="background: #e3e3e3; padding: 20px;">{{ rebates.items }}</pre> -->

    <div class="rebate" v-if="rebates.items && rebates.items.length">
      <div class="rebate-left dl">
        <div class="rebate-logo">
          <img src="~assets/images/ytrebate-logo.png" width="120" height="33" />
        </div>
        <p class="hr"></p>
        
        <div class="vendor-tag hand" :class="{ 'triangle': index === currentSelected, 'no-select': rebate.rule }" v-for="(item, index) in rebates.items" @click="choiceVendor(index, item)">
          <span class="txt dl relative" :class="{ 'yellow': index === currentSelected }">{{ item.vendor_name || '--'}}平台 <i class="badge" v-if="item.rebates.length"></i> </span>
           <p class="hr"></p>
        </div>
        <!--<p class="link hand" @click="rule()"><span class="fa">{{ question }}</span>返水规则</p>-->
      </div>
      <rebate-rule v-if="rebate.rule" :rebate="rebate" class="rebate-rule dl"></rebate-rule>
      <div class="rebate-right dl" v-else>
        <p class="title height">
          <span class="number">{{ tempRebate.vendor_name || '--' }}平台</span>
          <span class="all f-yellow hand dl fr" @click="setRebatesCompleted()" v-if="rebates.rebates_unreceived">一键领取</span>
          <span class="all f-grey hand dl fr" v-else>无返水</span>
          <span class="link hand rule" @click="rule()"><span class="fa">{{ question }}</span> 返水规则</span>
        </p>
        <p class="title margin-bottom">
          <span class="current">今日流水额: <span class="yellow">￥{{ tempRebate.compute_amount || '0.0' }}</span></span>
          <span class="fr"><span v-for="(v, index) in searchKey" :class="{ 'border-color': index === currentDay }" @click="setSearchKey(v, index)">{{ v }}</span></span>
        </p>
        <div v-if="tempRebate.rebates && tempRebate.rebates.length">
          <div class="table dl" v-for="i in tempRebate.rebates">
            <span class="date dl">
              <p>{{ i.rebate_at | day }}</p>
              <p>{{ i.rebate_at | date }}</p>
            </span>
            <span class="record dl">
              <p>
                <span class="padding-right">产生流水数:</span>
                <span>
                  ￥{{ i.bet_amount || '--' }}
                  <el-tooltip effect="dark" :content="'实际流水: ￥' + i.valid_bet_amount + '; ' + '扣除流水: ￥' + i.wager_requirement + '; '+ '有效流水: ￥' + i.compute_amount" placement="top-start">
                    <span class="question hand fa">{{ question }}</span>
                  </el-tooltip>
                </span>
              </p>
              <p>
                <span class="padding-right">可领返水:</span><span class="yellow">￥{{ i.real_payment_amount || '--' }}</span>
                <!--<span class="button t-yellow hand dl fr" @click="receivedRebate(i)" v-if="i.status === 'status_approved'">立即领取</span>
                <span class="button grey dl fr" v-if="i.status === 'status_completed'">返水已领</span>-->
              </p>
            </span>
            <span>
              <span class="button t-yellow hand dl" @click="receivedRebate(i)" v-if="i.status === 'status_approved'">立即领取</span>
              <span class="button grey dl" v-if="i.status === 'status_completed'">返水已领</span>
            </span>
          </div>
        </div>
        <p class="no-data" v-if="tempRebate.rebates && !tempRebate.rebates.length">查询为空</p>
      </div>
    </div>
    <div v-else>
      <loading :loading="loading" v-if="loading"></loading>
      <div v-else class="error-all"></div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Shared/Loading.vue";
import RebateRule from "@/components/Task/RebateRule.vue";

export default {
  data() {
    return {
      searchKey: ["最近3天", "最近7天", "最近30天"],
      currentSelected: 0,
      question: this.$fontawesome("question-circle"),
      currentDay: "",
      q: {
        q_rebate_at_gteq: "",
        q_vendor_id_eq: ""
      },
      rebates: {},
      rebate: {
        rule: false
      },
      vendor_id: "",
      loading: true,
      tempRebate: {}
    };
  },
  components: { Loading, RebateRule },
  async mounted() {
    await this.fetchRebates();
  },
  methods: {
    rule() {
      this.rebate.rule = !this.rebate.rule;
    },
    choiceVendor(index, item) {
      if (this.rebate.rule) { return; }
      this.currentDay = "";
      this.currentSelected = index;
      this.tempRebate = item;
      this.computedDate(1);
      // this.serchRebates(this.q)
    },
    setSearchKey(value, n) {
      this.currentDay = n;
      if (value === "最近3天") {
        this.computedDate(3);
      } else if (value === "最近7天") {
        this.computedDate(7);
      } else {
//        delete this.q.q_created_at_gt
//        this.q.q_vendor_id_eq = this.tempRebate.vendor_id
        this.computedDate(30);
      }
      this.serchRebates(this.q);
    },
    computedDate(day) {
      let nowDate = new Date();
      nowDate.setHours(23, 59, 59, 999);
      let beforeDate = new Date(nowDate.getTime() - 1000 * 60 * 60 * 24 * day);
      this.q.q_rebate_at_gteq = beforeDate.getFullYear() + "-" + (beforeDate.getMonth() + 1) + "-" + beforeDate.getDate();
      this.q.q_vendor_id_eq = this.tempRebate.vendor_id;
    },
    fetchRebates() {
      this.loading = true;
      if (this.rebates) { this.rebates.length = 0; }
      this.api.getRebates().then((res) => {
        this.rebates = res.data || {};
        if (this.rebates.items && this.rebates.items.length) {
          this.tempRebate = this.rebates.items[0];
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    serchRebates(q) {
      this.api.getSearchRebates(q).then((res) => {
        this.tempRebate.rebates = res.data.items || "";
        this.api.getRebates().then((res) => {
          this.rebates.rebates_unreceived = res.data.rebates_unreceived;
        });
      });
    },
    receivedRebate(obItem) {
      this.api.postReceiveRebate(obItem.id).then((res) => {
        Object.assign(obItem, res.data);
        this.$message({
          message: "领取完毕",
          type: "success"
        });
      });
    },
    setRebatesCompleted() {
      this.api.postSetRebatesCompleted().then(() => {
        this.fetchRebates();
        this.$message({
          message: "全部返水领取完毕",
          type: "success"
        });
      });
    }
  },
  filters: {
    date(v) {
      if (!v) return "--";
      let arr = v.split("-");
      if (arr.length === 3) {
        return arr[0] + "-" + arr[1];
      } else {
        return "--";
      }
    },
    day(v) {
      if (!v) return "--";
      let arr = v.split("-");
      if (arr.length === 3) {
        return arr[2];
      } else {
        return "--";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';
.relative {
  position: relative;
}

.badge {
  display: block;
  height: 10px;
  width: 10px;
  background: red;
  position: absolute;
  border-radius: 50%;
  top: 10px;
  right: -8px;
}

.error-all {
  display: block;
  margin: 20px auto;
}
.rebate {
  .hr {
    width: 210px;
    height: 1.7px;
    background-color: $color-blue9;
    margin: 0 auto;
    box-shadow: inset 0px 1px rgba(0, 0, 0, 0.6);
  }
}
.red {
  color: $color-red9;
}
.yellow {
  color: $color-yellow13;
}
.rebate-left {
  width: 240px;
  height: 680px;
  background-color: $color-blue8;
  padding: 10px;
  position: relative;
  .link {
    position: absolute;
    bottom: 20px;
    left: 0px;
    right: 0px;
    text-align: center;
    color: rgba($color-white, .5);
    font-size: $font-h4;
    .fa {
      font-size: $font-h3;
      padding-right: 7px;
    }
  }
  .rebate-logo {
    text-align: center;
    padding: 10px 0px;
  }
  .vendor-tag {
    color: rgba($color-white, .5);
    width: 100%;
    text-align: center;
    .txt {
      padding: 15px 0px;
      font-size: $font-h4;
    }
    .white {
      color: $color-white;
    }
    .yellow {
      color: $color-yellow13;
    }
  }
  .no-select {
    cursor: not-allowed;
  }
  .triangle {
    position: relative;
    &:after {
      position: absolute;
      right: -10px;
      top: 16px;
      content: '';
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid $color-yellow13;
    }
  }
}
.rebate-rule {
  width: 1039px;
  margin-left: -4px;
  vertical-align: top;
}
.rebate-right {
  vertical-align: top;
  background-color: $color-blue8;
  border: $px solid $color-yellow13;
  margin-left: -4px;
  padding: 30px 40px;
  width: 1039px;
  height: 680px;
  overflow-y: scroll;
  .all {
    width: 120px;
    @include line-height(30px);
    text-align: center;
    border-radius: 20px;
    color: $color-white;
  }
  .margin-bottom {
    margin-bottom: 20px;
  }
  .height {
    @include line-height(50px);
  }
  .f-yellow {
    background-color: $color-yellow12;
  }
  .f-grey {
    background-color: $color-gray3;
  }
  .title {
    padding-right: 20px;
    .current {
      color: $color-white;
      font-weight: bold;
    }
    .number {
      color: $color-yellow13;
      font-size: $font-h;
      font-weight: bold;
      span {
        font-size: $font-h3;
        &:first-of-type {
          padding-right: 20px;
        }
      }
    }
    .fr {
      span {
        color: $color-white;
        margin-left: 15px;
        padding: 5px 15px;
        cursor: pointer;
      }
      .border-color {
        border-bottom: 2px solid $color-yellow13;
        color: $color-red9;
        font-weight: bold;
      }
    }
    .rule {
      color: $color-yellow13;
      border: 2px solid $color-yellow13;
      border-radius: 20px;
      margin-right: 20px;
      padding: 0 30px;
      line-height: 27px;
      float: right;
      &:hover {
        background-color: $color-yellow13;
        color: $color-blue8;
      }
      .fa {
        font-size: $font-h4;
      }
    }
  }
}
.table {
  border: $px solid $color-yellow13;
  border-left: 5px solid $color-yellow13;
  background-color: $color-blue9;
  border-radius: 4px;
  padding: 10px;
  width: 48%;
  &:nth-child(2n + 1) {
    margin-right: 20px;
  }
  .blue {
    color: $color-blue;
  }
  .gray {
    color: $color-gray5;
  }
  .date {
    width: 80px;
    background-color: rgba($color-white, .1);
    padding: 10px;
    vertical-align: top;
    position: relative;
    p {
      font-weight: bold;
      text-align: center;
      &:first-of-type {
        color: $color-yellow13;
        font-size: $font-h2;
      }
      &:last-of-type {
        color: $color-white;
      }
    }
  }
  .record {
    color: $color-white;
    text-align: center;
    width: 250px;
    padding: 0 10px;
    .question {
      color: $color-yellow13;
    }
    p {
      text-align: left;
      line-height: 32px;
      &:first-of-type {
        border-bottom: $px solid $color-white3;
      }
    }
    .yellow {
      color: $color-yellow13;
      font-size: $font-h4;
    }
    .grey {
      background-color: $color-gray5;
      color: $color-white;
    }
    .t-yellow {
      border: $px solid $color-yellow13;
      color: $color-yellow12;
      &:hover {
        color: $color-white;
        background-color: $color-yellow12;
      }
    }
    .button {
      width: 80px;
      text-align: center;
      padding: 5px 0px;
      border-radius: 5px;
    }
  }
  .button {
    width: 80px;
    text-align: center;
    padding: 5px 0px;
    border-radius: 5px;
  }
  .yellow {
    color: $color-yellow13;
    font-size: $font-h4;
  }
  .grey {
    border: 2px solid $color-yellow13;
    color: $color-white;
  }
  .t-yellow {
    background-color: $color-yellow13;
    color: $color-blue9;
    &:hover {
      color: $color-yellow13;
      border: 2px solid $color-yellow13;
      background-color: $color-blue9;
    }
  }
}
</style>
