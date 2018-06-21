<template lang="html">
  <div class="member-vip">
    <p class="title-h1"><span>VIP特权</span></p>
    <div class="member-body">
      <div class="grow-vip">
        <img src="../../assets/images/vip-banner.png" width="100%" height="100%">
      </div>
      <div class="grow-member">
        <div class="member-data">
          <p>我的会员成长值 <span>( 会员成长值 = 每月总流水 )</span></p>
          <p>当前等级：<span>Lv.{{ vipData.vip_level || '0' }}</span>上月成长值：<span>{{ vipData.last_month_amount || '0.0' }}</span>本月成长值：<span>{{ vipData.current_month_amount || '0.0' }}</span></p>
        </div>
        <div class="level dl">
          <p class="title">预计下月可晋级等级:</p>
          <div class="lv-graphic">
            <table>
              <tr>
                <span class="color-width" :class="{ 'full-width': levelWidth >= 100, 'color-width-left': levelWidth >= 41, 'color-width-left-1': levelWidth < 41 }" :style="{ width: levelWidth + '%' }"></span>
                <td>
                  <span class="lv-before red red-first"><p>Lv.0</p><p>0</p></span>
                  <span class="lv" :class="{ 'red': percentage >= 1/5 }"><p>Lv.1</p><p>500,000</p></span>
                </td>
                <td><span class="lv" :class="{ 'red': percentage >= 2/5 }"><p>Lv.2</p><p>2,000,000</p></span></td>
                <td><span class="lv" :class="{ 'red': percentage >= 3/5 }"><p>Lv.3</p><p>5,000,000</p></span></td>
                <td><span class="lv" :class="{ 'red': percentage >= 4/5 }"><p>Lv.4</p><p>10,000,000</p></span></td>
                <td><span class="lv" :class="{ 'red': percentage >= 5/5 }"><p>Lv.5</p><p>50,000,000</p></span></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <privilege class="m-top" :level="vipData && vipData.vip_level"></privilege>
      <privilege-rule class="m-top"></privilege-rule>
    </div>
  </div>
</template>

<script>
import Privilege from "@/components/Setting/Privilege.vue";
import PrivilegeRule from "@/components/Setting/PrivilegeRule.vue";

export default {
  data() {
    return {
      levelWidth: 0,
      percentage: 0,
      section: 1 / 5,
      rank: "--",
      vipData: ""
    };
  },
  mounted() {
    this.vipIntroduce();
  },
  components: { Privilege, PrivilegeRule },
  methods: {
    vipIntroduce() {
      this.api.getVipIntro().then((res) => {
        if (res.data) {
          this.vipData = res.data;
          let arr = [];
          if (this.vipData && this.vipData.vip_level_hash) {
            for (let item in this.vipData.vip_level_hash) {
              arr.push(this.vipData.vip_level_hash[item]);
            }
            let currentMonthAmount = parseFloat(this.vipData.current_month_amount);
            let index = "";
            let len = arr.length;
            for (let i = 0; i < len; i++) {
              if (arr[i] <= currentMonthAmount) {
                index = i;
              }
            }
            let ind = parseInt(this.vipData.vip_level);
            if (ind >= len - 1) { this.rank = arr[len - 1]; } else { this.rank = arr[ind]; }
            if (index >= len - 1) {
              this.percentage = 1;
              this.levelWidth = 100;
            } else {
              let beforeAmount = arr[index];
              let afterAmount = arr[index + 1];
              let differ = currentMonthAmount - beforeAmount;
              let sectionPercentage = 0;
              if ((index >= 1) && (index <= len - 2)) {
                sectionPercentage = ((differ / (afterAmount - beforeAmount)) + 0.03) * this.section;
              } else {
                sectionPercentage = (differ / (afterAmount - beforeAmount)) * this.section;
              }
              this.percentage = (index * this.section + sectionPercentage);
              this.levelWidth = 100 * this.percentage;
              if (this.levelWidth > 0 && this.levelWidth <= 0.3) {
                this.levelWidth = 0.3;
              }
            }
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.member-vip {
  .member-body {
    background-color: $color-blue9;
    padding: 30px 40px;
  }
  .grow-member {
    .member-data {
      margin: 20px auto;
      p {
        text-align: center;
        &:first-of-type {
          font-size: $font-h;
          color: $color-yellow13;
          font-weight: bold;
          span { color: $color-yellow13; font-size: $font-h4 }
        }
        &:last-of-type {
          font-size: $font-h4;
          font-weight: bold;
          color: $color-white;
          padding-top: 10px;
          span { color: $color-yellow13; padding-right: 30px }
        }
      }
    }
  }
  .grow-vip {
    width: 100%;
    height: 200px;
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
.level {
  width: 100%;
  padding: 20px 0px;
  .title {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 10px;
    font-size: $font-h4;
    color: $color-white;
    font-weight: bold;
  }
}
.lv-graphic {
  width: 90%;
  margin: 0 auto;
  padding-top: 25px;
  .red {
    p {
      color: $color-yellow13;
    }
  }
  table {
    width: 100%;
    height: 10px;
    background-color: $color-blue8;
    border-radius: 5px;
    position: relative;
    .color-width {
      position: absolute;
      display: inline-block;
      background: linear-gradient(to right, #F77120, #FAD961);
      left: 0px;
      top: 0px;
      bottom: 0px;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      width: 100%;
      background-color: #F77120;
      &:after {
        content: '';
        background-image: url('../../assets/images/level-spin.png');
        background-size: 30px 30px;
        width: 30px;
        height: 30px;
        display: inline-block;
        bottom: 12px;
        position: absolute;
      }
    }
    .color-width-left {
      &:after { left: 98%; }
    }
    .color-width-left-1 {
      &:after { left: calc(98% - 7px); }
    }
    .full-width {
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    }
    td {
      width: 20%;
      position: relative;
      .lv, .lv-before {
        position: absolute;
        top: 20px;
        color: rgba($color-white, .5);
        p {
          &:first-of-type {
            font-size: $font-h4;
            font-weight: bold;
          }
        }
      }
      .lv {
        left: 94%;
        width: 200px;
      }
      .lv-before {
        left: -10px;
      }
    }
    td:not(:last-child) {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        left: 100%;
        top: -2px;
        height: 11px;
        width: 2px;
        background-color: $color-blue9;
      }
    }
  }
}
</style>
