<template lang="html">
  <div class="vendor-carousel" id="vendor-carousel">
    <el-carousel height="250px">
      <el-carousel-item v-for="(item, index) in vendors" :key="index">
        <div class="block">
          <img :src=item.img width="100%" height="100%"/>
          <div class="info">
            <div class="info-left dl">
              <p>{{ item.name }}平台</p>
              <p>{{ item.txt }}</p>
            </div>
            <span class="fa hand dl" @click="goVendors(item.index, item.code)">{{ play }}</span>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      play: this.$fontawesome("play-circle"),
      vendors: [{ img: require("../../assets/images/vendor/updated/AV1.jpg"), name: "Kuma", code: "KG", index: "slot", txt: "成人情色 蚀骨销魂 女优老虎机" },
        { img: require("../../assets/images/vendor/updated/DT1.jpg"), name: "DT", code: "DT", index: "slot", txt: "热血玄幻的动漫仙侠老虎机" },
        { img: require("../../assets/images/vendor/updated/PT1.jpg"), name: "PT", code: "PT", index: "slot", txt: "大额惊喜 亚洲最强人气老虎机" },
        { img: require("../../assets/images/vendor/updated/MG1.jpg"), name: "MG", code: "MGS", index: "slot", txt: "应有尽有 开创老虎机电子时代" },
        { img: require("../../assets/images/vendor/updated/PNG1.jpg"), name: "PNG", code: "PNG", index: "slot", txt: "魔幻老虎机 漂亮的不像实力派" },
        { img: require("../../assets/images/vendor/updated/AG1.jpg"), name: "AG", code: "AG", index: "live_casino", txt: "身临其境 富丽奢华视讯娱乐城" },
        { img: require("../../assets/images/vendor/updated/GG1.jpg"), name: "GG", code: "GG", index: "fishing", txt: "精彩绝伦 最佳真钱捕鱼平台" }
      ]
    };
  },
  methods: {
    goVendors(category, code) {
      if (code) {
        if (category) {
          this.$router.push({path: `/${category}/${code}`});
        } else {
          this.$message({
            message: "该平台目前未有分类",
            type: "info"
          });
        }
      } else {
        this.$router.push({ name: "Vendor" });
      }
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/stylesheets/public';
#vendor-carousel {
  .el-carousel__indicator.is-active button {
    background-color: $color-yellow13;
  }
  .el-carousel__indicators {
    height: 20px;
    left: auto;
    top: 10px;
    right: -45px;
  }
  .el-carousel__indicator {
    padding: 0px;
    .el-carousel__button {
      height: 10px;
      width: 10px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}
</style>
<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.vendor-carousel {
  width: 100%;
}
#vendor-carousel {
  .block {
    position: relative;
    height: 250px;
    .info {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 10px;
      width: 100%;
      height: 60px;
      color: $color-white;
      bottom: 0px;
      right: 0px;
      left: 0px;
      .fa {
        color: $color-yellow13;
        font-size: $font-h;
        vertical-align: bottom;
        width: 10%;
      }
      .info-left {
        width: 83%;
        vertical-align: middle;
        p {
          @extend .overflow;
          &:first-of-type {
            font-size: $font-h4;
            font-weight: bold;
          }
        }
      }
    }
  }
  .el-carousel__indicators {
    .el-carousel__indicator {
      padding: 5px;
    }
  }
}
</style>
