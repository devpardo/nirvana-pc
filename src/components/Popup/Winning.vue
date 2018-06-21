<template lang="html">
  <div>
    <section>
      <div class="popup-div">
        <div class="right-side">
          <button class="btn-footer" @click="back()"></button>
        </div>
        <div class="winning prize-body">
          <div class="container">
            <div class="winning-amount">
                <span class="money">￥</span>{{ flags.redPacket || '请稍等...' }}
            </div>
            <!--<button class="btn-claim"></button>-->
          </div>
          <div class="footer">
            <div class="left-side">
              <p> 使用提示： </p>
              <p> 1、不限场馆，5倍流水，即可提款。 </p>
              <p> 2、此活动不与其它优惠活动共享。 </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["flags"],
  methods: {
    back() {
      this.flags.win = false;
      this.flags.prize = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'sass/styles';
</style>
