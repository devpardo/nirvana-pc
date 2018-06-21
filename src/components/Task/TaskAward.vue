<template lang="html">
  <div>
    <div class="privileges">
    <p class="title"></p>
      <div class="fill-in">
        <div v-if="award && award.privileges.length">
          <div class="content">
            <p>恭喜您获得:</p>
            <p v-for="item in award.privileges" class="font">{{ item.text }}</p>
          </div>
        </div>
        <div v-else class="no-data">请稍等,奖励提取中...</div>
        <p class="ok hand" @click="closed()">确定</p>
      </div>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>

<script>
export default {
  props: ["award"],
  methods: {
    closed() {
      this.award.flag = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.privileges {
  position: fixed;
  top: 25%;
  left: 40%;
  z-index: 100;
  background-color: $color-white;
  border-radius: 5px;
  min-width: 400px;
  .font {
    font-weight: bold;
    padding: 3px 0px;
  }
  .title {
    height: 0px;
    background-color: $color-white;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .content {
    p { font-size: $font-h4 }
  }
}
.fill-in {
  z-index: 2;
  text-align: center;
  padding: 2rem .3rem;
  .ok {
    background-color: $color-yellow13;
    color: $color-blue9;
    padding: 8px;
    width: 60%;
    margin: 0px auto;
    margin-top: 20px;
    border-radius: 2rem;
  }
}
.mask-layer {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-black;
  opacity: 0.5;
  z-index: 99;
}
</style>
