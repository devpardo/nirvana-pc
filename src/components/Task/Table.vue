<template lang="html">
  <div class="table" v-if="points && points.length">
    <table>
      <tbody>
        <tr>
          <th>日期/时间</th>
          <th>详情</th>
          <th>亚太币</th>
        </tr>
        <tr v-for="item in points">
          <td>{{ item.created_at | date }}</td>
          <td>{{ item.log }}</td>
          <td class="none">{{ item.num_points }}</td>
        </tr>
      </tbody>
    </table>
    <!--<p class="th">
      <span>日期/时间</span>
      <span>详情</span>
      <span>亚太币</span>
    </p>
    <div class="tbody">
      <p v-for="item in points">
        <span>{{ item.created_at | date }}</span>
        <span>{{ item.log }}</span>
        <span class="none">{{ item.num_points }}</span>
      </p>
      <p><span></span><span></span><span class="more hand">查看更多...</span></p>
    </div>-->
  </div>
</template>

<script>
import "@/libs/filters.js";

export default {
  props: ["points"]
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.table {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  .th {
    span {
      width: 33%;
      display: inline-block;
      font-size: $font-h4;
    }
    padding: 0px 10px;
    @include line-height(45px);
    background-color: $color-gray7;
    color: $color-gray;
    font-weight: bold;
  }
  .tbody {
    background-color: $color-white;
    color: $color-gray;
    span {
      display: inline-block;
      width: 33%;
      border-right: $px solid $color-gray7;
      padding: 10px 0px;
    }
    .none { border-right: none }
    p {
      padding: 0px 10px;
      border-bottom: $px solid $color-gray7;
      border-left: $px solid $color-gray7;
      border-right: $px solid $color-gray7;
      &:nth-child(2n) {
        background-color: $color-gray4;
      }
    }
    .more {
      color: $color-blue3;
    }
  }
  table {
    background-color: $color-blue9;
    border-collapse: collapse;
    width: 100%;
    color: $color-white;
    th {
      padding: 10px 0;
      background-color: rgba($color-white, $alpha: .1);
    }
    td {
      padding: 8px 0;
      color: rgba($color-white, $alpha: .8);
    }
  }
  table, th, td {
  border: $px solid $color-blue8;
  }
}
</style>
