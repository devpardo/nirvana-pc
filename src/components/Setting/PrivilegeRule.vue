<template lang="html">
  <div class="ruler">
    <p class="title">会员等级说明</p>
    <table border="1">
      <tr>
        <th>会员等级</th>
        <th>Lv.0</th>
        <th>Lv.1</th>
        <th>Lv.2</th>
        <th>LV.3</th>
        <th>LV.4</th>
        <th>LV.5</th>
      </tr>
      <tr>
        <th>晋级条件</th>
        <td>无</td>
        <td>月总流水 ≥ 500,000</td>
        <td>月总流水 ≥ 2,000,000</td>
        <td>月总流水 ≥ 5,000,000</td>
        <td>月总流水 ≥ 10,000,000</td>
        <td>月总流水 ≥ 50,000,000</td>
      </tr>
      <tr>
        <th>会员特权</th>
        <td>无</td>
        <td>
          <ul>
            <li>白银抽奖盘</li>
            <li>VIP返水</li>
            <li>红利优惠券</li>
            <li>优先提款服务</li>
            <li>会员尊享生日礼金</li>
          </ul>
        </td>
        <td>
          <ul>
            <li>黄金抽奖盘</li>
            <li>VIP返水</li>
            <li>红利优惠券</li>
            <li>优先提款服务</li>
            <li>会员尊享生日礼金</li>
            <li>会员尊享节日礼物</li>
            <li>专属客服</li>
          </ul>
        </td>
        <td>
          <ul>
            <li>黄金抽奖盘</li>
            <li>VIP返水</li>
            <li>红利优惠券</li>
            <li>优先提款服务</li>
            <li>会员尊享生日礼金</li>
            <li>会员尊享节日礼物</li>
            <li>专属客服</li>
            <li>免费手机流量</li>
          </ul>
        </td>
        <td>
          <ul>
            <li>钻石抽奖盘</li>
            <li>VIP返水</li>
            <li>红利优惠券</li>
            <li>极速提款服务</li>
            <li>会员尊享生日礼金</li>
            <li>会员尊享节日礼物</li>
            <li>专属客服</li>
            <li>免费手机流量</li>
          </ul>
        </td>
        <td>
          <ul>
            <li>钻石抽奖盘</li>
            <li>VIP返水</li>
            <li>红利优惠券</li>
            <li>极速提款服务</li>
            <li>会员尊享生日礼金</li>
            <li>会员尊享节日礼物</li>
            <li>专属客服</li>
            <li>免费手机流量</li>
            <li>免费欧洲双人游</li>
          </ul>
        </td>
      </tr>
    </table>
    <div class="txt">
      <p><span class="fa">{{ question }}</span>会员特权是【亚太娱乐】为回馈用户的厚爱，根据用户每月的总流水（所有游戏投注的总和），所提供予用户的尊贵身份等级特权且能够享受丰厚的特权奖励。</p>
    </div>
    <div class="txt">
      <p><span class="fa">{{ question }}</span>会员特权设有高级抽奖盘、高额VIP返水比例、丰富的转账红利优惠券、极速提款服务、尊享的生日礼金及节日礼物、独一无二的专属客服和用之不尽的手机赠送流量等等。</p>
    </div>
    <div class="txt">
      <p><span class="fa">{{ question }}</span>系统将在每月最后一天统计当月总流水，并以此结算成长值。获得的成长值将决定用户在次月的VIP等级。</p>
    </div>
    <div class="txt">
      <p><span class="fa">{{ question }}</span>每月成长值及等级只在当月生效，次月不设累积。</p>
    </div>
    <div class="txt">
      <p><span class="fa">{{ question }}</span>一切解释权归亚太娱乐所有。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: this.$fontawesome("question-circle")
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

table, th, td {
  border: $px solid $color-blue8;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px auto;
  margin-bottom: 20px;
  background-color: rgba($color-white, .1);
  th { 
    font-size: $font-h4; 
    color: $color-yellow13; 
    background-color: rgba($color-white, .2);
    }
  td {
    color: $color-white;
    font-weight: bold;
    text-align: center;
    background-color: rgba($color-white, .1);
    li {
      margin-bottom: 5px;
    }
  }
  th, td {
    padding: 15px 0px;
  }
}
.ruler {
  padding: 20px;
  border-top: $px solid $color-blue8;
  margin: 0px auto;
  .title {
    font-size: $font-h;
    font-weight: bold;
    color: $color-yellow13;
    padding-bottom: 10px;
  }
  .txt {
    p {
      padding-bottom: 10px;
      color: $color-white;
    }
    .fa {
      padding-right: 10px;
      color: $color-yellow13;
      font-size: $font-h4;
    }
  }
}
</style>
