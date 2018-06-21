<template lang="html">
  <div class="body">
    <div class="foot-info">

      <div class="top">
        <div class="title-bar">
          <span class="title">客户支持</span>
        </div>
      </div>

      <div class="info-content">
        <nav-menu class="nav-menu dl" :menuDatas="menuDatas" :menuFlags="menuFlags" :ob="ob"></nav-menu>
        <div class="content dl">
          <footer-content :ob="ob"></footer-content>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from "@/components/Footer/NavMenu.vue";
import FooterContent from "@/components/Footer/Content.vue";

export default {
  data() {
    return {
      ob: {
        category: this.$route.params.list || 0
      },
      menuDatas: [
        {
          id: 1,
          title: "关于我们",
          sub: [
            {
              title: "亚太娱乐简介",
              id: 0
            },
            {
              title: "联系我们",
              id: 1
            }
          ]
        },
        {
          id: 2,
          title: "常见问题",
          sub: [
            {
              title: "官方网址",
              id: 2
            },
            {
              title: "网站无法打开",
              id: 3
            },
            {
              title: "充值失败",
              id: 4
            },
            {
              title: "提款失败",
              id: 5
            },
            {
              title: "账户安全",
              id: 6
            },
            {
              title: "优惠申请",
              id: 7
            }
          ]
        },
        {
          id: 3,
          title: "政策及条款",
          sub: [
            {
              title: "服务条款",
              id: 8
            },
            {
              title: "隐私政策",
              id: 9
            },
            {
              title: "责任博彩",
              id: 10
            },
            {
              title: "免责声明",
              id: 11
            }
          ]
        },
        {
          id: 2,
          title: "网站地图",
          sub: [
            {
              title: "网站地图",
              id: 12
            }
          ]
        }
      ],
      menuFlags: [true, false, false, false, false, false]
    };
  },
  components: {
    NavMenu,
    FooterContent
  },
  watch: {
    "$route.params.list"(n) {
      if (n <= 12) {
        this.ob.category = n;
        this.menuFlags.forEach((item, index) => {
          if (index === n) {
            this.$set(this.menuFlags, index, true);
          } else {
            this.$set(this.menuFlags, index, false);
          }
        });
      }
    }
  },
  mounted() {
    if (this.ob.category <= 4) {
      this.menuFlags[0] = false;
      this.$set(this.menuFlags, this.ob.category, true);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/public';

.foot-info {
  width: $min-width;
  padding: 20px 0 0 20px;
  margin: 0 auto;

  .top {
    .title-bar {
      margin-bottom: 20px;

      span {
        font-size: $font-h;
        color: $color-white;
      }

      span.title {
        font-weight: bold;
      }

      span.sub-title {
        margin-left: 10px;
        font-weight: lighter;
      }
    }
  }

  .info-content {
    background-color: $color-blue8;
    padding: 30px 40px;
  }

  .content {
    width: 80%;
    float: left;
    display: block;
    box-sizing: border-box;
  }

  .nav-menu {
    width: 20%;
    float: left;
    display: block;
    box-sizing: border-box;
    vertical-align: top;

  }
}
</style>
