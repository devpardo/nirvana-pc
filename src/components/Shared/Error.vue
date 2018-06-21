<template lang="html">
  <div class="mask-layer">
    <div class="transfer">
      <p class="title"><span class="center">{{ errorObj.title }}</span><span class="hand fr" @click="close()">关闭</span></p>
      <div class="transfer-error">
        <p class="error-img">
          <img src="~assets/images/transfer-error-icon.png" width="100%" height="100%"/>
        </p>
        <p class="error-info">出错了...</p>
        <p class="link-info"><span class="fa">{{ infoCircle }}</span>您可以点击页面右下方聊天窗口联系客服</p>
        <!--<p class="error-button"><span class="hand dl" @click="close()">取消</span><span class="hand dl">联系客服</span></p>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["errorObj"],
  data() {
    return {
      infoCircle: this.$fontawesome("info-circle")
    };
  },
  methods: {
    close() {
      this.errorObj.flag = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.mask-layer {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2001;
  .transfer {
    border-radius: 5px;
    z-index: 39;
    position: fixed;
    width: 620px;
    top: 10%;
    left: 30%;
    background-color: $color-white;
    .title {
      padding: 20px 10px;
      text-align: center;
      border-bottom: $px solid $color-gray8;
      .fr, .fl {
        color: $color-blue3;
        font-size: $font-h4;
      }
      .center {
        color: $color-gray12;
        font-size: $font-h2;
        font-weight: bold;
      }
    }
  }
}
.account {
  padding: 15px 20px;
  .main {
    width: 100%;
  }
  .fl, .fr {
    width: 200px;
    text-align: center;
    word-break: break-all;
  }
  .gray {
    color: $color-gray5;
    font-size: $font-h4;
    padding-bottom: 10px;
  }
  .money {
    color: $color-gray12;
    font-size: $font-h1;
    font-weight: bold;
  }
  .img {
    width: 20px;
    height: 16px;
    position: absolute;
    left: 50%;
    top: 91px;
  }
}
.input {
  text-align: center;
  margin-top: 50px;
  .info {
    color: $color-gray5;
    padding-top: 15px;
    .fa {
      color: $color-blue2;
      padding-right: 5px;
    }
  }
  .number {
    color: $color-gray12;
    span {
      font-size: $font-h2;
      padding-right: 15px;
    }
    input, i {
      font-style: normal;
      border: none;
      font-size: $font-h;
      outline: none;
    }
  }
}
.button-submit {
  width: 223px;
  @include line-height(40px);
  background-color: $color-blue3;
  color: $color-white;
  font-size: $font-h4;
  text-align: center;
  margin: 10px auto;
  margin-top: 30px;
  border-radius: 5px;
}
.coupon {
  margin-top: 20px;
  padding: 10px;
  .coupon-img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
  .h3 {
    color: $color-gray10;
    span { font-size: $font-h4; vertical-align: middle; }
  }
  .coupon-item {
    span {
      color: $color-gray16;
      width: 270px;
      padding: 12px 10px;
      text-align: center;
      border: $px solid $color-gray16;
      margin-top: 20px;
      margin-right: 10px;
      display: inline-block;
      cursor: pointer;
      &:hover {
        color: $color-blue4;
        border: $px solid $color-blue4;
      }
    }
    .border-blue {
      color: $color-blue4;
      border: $px solid $color-blue4;
    }
  }
}
.transfer-error {
  padding: 20px;
  padding-bottom: 50px;
  text-align: center;
  .error-img {
    width: 90px;
    height: 87px;
    margin: 20px auto;
  }
  .error-info {
    color: $color-gray5;
    font-size: $font-h2;
    margin: 10px 0px;
  }
  .error-button {
    margin-top: 20px;
    padding-bottom: 100px;
    span {
      width: 120px;
      @include line-height(40px);
      border-radius: 5px;
      text-align: center;
      font-weight: bold;
      vertical-align: top;
      font-size: $font-h4;
      &:first-of-type {
        border: $px solid $color-blue4;
        color: $color-blue4;
        margin-right: 20px;
      }
      &:last-of-type {
        background-color: $color-blue4;
        color: $color-white;
      }
    }
  }
}
.transfer-success {
  padding: 20px;
  text-align: center;
  padding-bottom: 100px;
  .success-img {
    width: 100px;
    height: 100px;
    margin: 20px auto;
  }
  .success-info {
    color: $color-gray10;
    font-size: $font-h2;
    span {
      color: $color-blue4;
    }
  }
  .success-txt {
    color: $color-gray5;
    span {
      color: $color-blue4;
    }
  }
  .success-button {
    width: 120px;
    @include line-height(40px);
    background-color: $color-blue4;
    color: $color-white;
    font-size: $font-h4;
    border-radius: 5px;
    margin: 20px auto;
  }
}
.link-info {
  margin: 0px auto;
  padding-top: 10px;
  color: $color-gray;
  font-size: $font-h5;
  .fa {
    font-size: $font-h4;
    color: $color-red;
    padding-right: 5px;
  }
}
</style>
