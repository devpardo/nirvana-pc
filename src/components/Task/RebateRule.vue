<template lang="html">
  <div class="rule">
    <div class="content">
      <p class="title">亚太返水规则 <span class="fr hand" @click="close()"><span class="fa">{{ back }}</span><span>返回</span></span></p>
      <div class="txt">
        <p class="request"><span class="circle fa">{{ question }}</span>什么是返水？</p>
        <p class="response">返水是指【亚太娱乐】为回馈用户所发放的活动奖金，用户在日常游戏投注中的有效流水都将被系统记录下来，并按照各个平台所对应的返水比例计算返水奖金。</p>
      </div>
      <div class="txt">
        <p class="request"><span class="circle fa">{{ question }}</span>返水规则</p>
        <p class="response">1. 系统将自动统计用户当天的游戏投注数据，并在次日生成派发返水奖金，请前往<span class="yellow hand" @click="close()">【我的返水】</span>查看并领取。</p>
        <p class="response">2. 成功领取后的返水奖金讲自动添加至主账户中，详情请查询<span class="yellow hand" @click="BalanceHistories()">【交易记录】</span>。</p>
        <p class="response">3. 成功领取后的返水奖金可直接提款，无需流水即可提款。</p>
        <p class="response">4. 使用转账优惠或优惠券等方式所获得的奖金并不计算在返水内，系统将自动扣除该部分流水。例如：若转账至PT平台时选择100%首存优惠券，那么您需完成
          （本金+奖金）×18倍的流水。在此之后用户进行游戏时所产生的流水才会被计算为有效流水并参与返水优惠。
        </p>
      </div>

      <table>
        <tbody>
          <tr>
            <th>亚太游戏</th>
            <th colspan="8">亚太真人视讯</th>
          </tr>
          <tr>
            <th>对应平台</th>
            <td colspan="6">AG真人｜SUNBET</td>
          </tr>
          <tr>
            <th>会员等级</th>
            <td>Lv.1</td>
            <td>Lv.2</td>
            <td>Lv.3</td>
            <td>Lv.4</td>
            <td>Lv.5</td>
            <td>Lv.6</td>
          </tr>
          <tr>
            <th>返水比例</th>
            <td>0.6%</td>
            <td>0.7%</td>
            <td>0.8%</td>
            <td>0.9%</td>
            <td>1.0%</td>
            <td>1.0%</td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <th>亚太游戏</th>
            <th colspan="8">亚太电游</th>
          </tr>
          <tr>
            <th>对应平台</th>
            <td colspan="6">PT｜MG｜Kuma｜PG｜DT｜PNG</td>
          </tr>
          <tr>
            <th>会员等级</th>
            <td>Lv.1</td>
            <td>Lv.2</td>
            <td>Lv.3</td>
            <td>Lv.4</td>
            <td>Lv.5</td>
            <td>Lv.6</td>
          </tr>
          <tr>
            <th>返水比例</th>
            <td>0.8%</td>
            <td>1.0%</td>
            <td>1.2%</td>
            <td>1.4%</td>
            <td>1.5%</td>
            <td>1.5%</td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <th>亚太游戏</th>
            <th colspan="8">亚太体育</th>
          </tr>
          <tr>
            <th>对应平台</th>
            <td colspan="6">沙巴体育</td>
          </tr>
          <tr>
            <th>会员等级</th>
            <td>Lv.1</td>
            <td>Lv.2</td>
            <td>Lv.3</td>
            <td>Lv.4</td>
            <td>Lv.5</td>
            <td>Lv.6</td>
          </tr>
          <tr>
            <th>返水比例</th>
            <td>0.4%</td>
            <td>0.5%</td>
            <td>0.6%</td>
            <td>0.7%</td>
            <td>0.8%</td>
            <td>0.9%</td>
          </tr>
        </tbody>
      </table>


    </div>
  </div>
</template>

<script>
export default {
  props: ["rebate"],
  data() {
    return {
      back: this.$fontawesome("mail-reply"),
      question: this.$fontawesome("question-circle"),
      exclamation: this.$fontawesome("exclamation-circle")
    };
  },
  methods: {
    close() {
      this.rebate.rule = false;
    },
    BalanceHistories() {
      this.$router.push({ name: "BalanceHistories" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

table {
  border-collapse: collapse;
}
table, th, td {
  border: $px solid $color-blue8;
}
table {
  width: 100%;
  background-color: $color-blue9;
  vertical-align: top;
  margin-bottom: 10px;
  .name {
    background-color: $color-gray4;
  }
  .red {
    color: $color-red9;
  }
  td {
    text-align: center;
    vertical-align: middle;
    padding: 10px 0px;
    color: $color-white;
  }
  th {
    width: 100px;
    padding: 10px 0px;
    background-color: rgba($color-white, .1);
    color: $color-white;
  }
}
.rule {
  background-color: $color-blue8;
  border: $px solid $color-yellow13;
  padding: 30px 40px;
  height: 680px;
  overflow-y: scroll;
  .content {
    .yellow {
      color: $color-yellow13;
      margin: 10px 0px;
      .fa { padding-right: 6px; }
    }
    .title {
      font-size: $font-h;
      color: $color-yellow13;
    }
  }
}
.txt {
  margin-top: 10px;
  p {
    margin-bottom: 6px;
  }
  .fa {
    padding-right: 5px;
  }
  .request {
    color: $color-white;
    font-weight: bold;
  }
  .circle {
    color: $color-yellow13;
  }
  .response {
    padding-left: 13px;
    color: rgba($color-white, .5);
    .red {
      color: $color-red9;
    }
    .yellow {
      color: $color-yellow13;
    }
  }
}
</style>
