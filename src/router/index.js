import Vue from "vue";
import store from "@/store";
import Router from "vue-router";
import * as storage from "../libs/storage";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    // home
    {
      path: "/",
      name: "Home",
      component: resolve => {
        require(["@/views/Home"], resolve);
      }
    },
    {
      path: "/sports",
      name: "Sports",
      component: () => import("@/views/Sports")
    },
    {
      path: "/casino",
      name: "Casino",
      component: () => import("@/views/Casino")
    },
    {
      path: "/fish",
      name: "亚太真人",
      component: () => import("@/views/Fish")
    },
    {
      path: "/notice",
      name: "Notice",
      component: () => import("@/views/Notice")
    },
    // footer
    {
      path: "/footer_info/:list",
      name: "FooterInfo",
      component: resolve => {
        require(["@/views/FooterInfo"], resolve);
      }
    },
    // search
    {
      path: "/search_result",
      name: "SearchResult",
      component: resolve => {
        require(["@/views/SearchResult"], resolve);
      }
    },
    // vendor home
    {
      path: "/vendor_home",
      name: "VendorHome",
      component: resolve => {
        require(["@/views/VendorHome"], resolve);
      }
    },
    // login and join
    {
      path: "/rule",
      name: "Rule",
      component: resolve => {
        require(["@/views/Rule"], resolve);
      }
    },
    {
      path: "/join",
      name: "Join",
      component: resolve => {
        require(["@/views/Register"], resolve);
      }
    },
    {
      path: "/forget_password",
      name: "ForgetPassword",
      component: resolve => {
        require(["@/views/ForgetPassword"], resolve);
      }
    },
    // game
    {
      path: "/:game(slot|live_casino|fishing)/:code?/:taxonomyId?",
      name: "GameCode",
      component: resolve => {
        require(["@/components/Game"], resolve);
      },
      children: [
        {
          path: "",
          component: resolve => {
            require(["@/views/Game/Vendor"], resolve);
          },
          name: "Vendor"
        },
        {
          path: ":gid",
          component: resolve => {
            require(["@/views/Game/GameDetail"], resolve);
          },
          name: "GameDetail"
        }
      ]
      // pathToRegexpOptions: {name: 'game', pattern: 'slot|live_casino|fishing'}
    },
    {
      path: "/detail/:detail_gid",
      name: "Detail",
      component: resolve => {
        require(["@/views/Game/GameDetail"], resolve);
      }
    },
    // activity
    {
      path: "/activity/:category",
      name: "Activity",
      component: resolve => {
        require(["@/views/Activity/Index"], resolve);
      }
    },
    // task
    {
      path: "/tasks",
      component: resolve => {
        require(["@/views/Task/Index"], resolve);
      },
      // meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: resolve => {
            require(["@/views/Task/Award"], resolve);
          },
          meta: { index: "task" },
          name: "Award"
        },
        {
          path: "coin",
          component: resolve => {
            require(["@/views/Task/Coin"], resolve);
          },
          meta: { index: "task" },
          name: "Coin"
        },
        {
          path: "lottery",
          component: resolve => {
            require(["@/views/Task/Lottery"], resolve);
          },
          meta: { index: "task" },
          name: "Lottery"
        },
        {
          path: "coupon",
          component: resolve => {
            require(["@/views/Task/Coupon"], resolve);
          },
          meta: { index: "task" },
          name: "Coupon"
        },
        {
          path: "rebate",
          component: resolve => {
            require(["@/views/Task/Rebate"], resolve);
          },
          meta: { index: "task" },
          name: "Rebate"
        }
      ]
    },
    // setting
    {
      path: "/setting",
      component: resolve => {
        require(["@/views/Setting/Index"], resolve);
      },
      // meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: resolve => {
            require(["@/views/Setting/Account"], resolve);
          },
          name: "Account",
          meta: { index: "profile", name: "Account" }
        },
        {
          path: "profile",
          component: resolve => {
            require(["@/views/Setting/Profile"], resolve);
          },
          name: "Profile",
          meta: { index: "profile", name: "Account" }
        },
        {
          path: "change_password",
          component: resolve => {
            require(["@/views/Setting/ChangePassword"], resolve);
          },
          name: "ChangePassword",
          meta: { index: "profile", name: "Account" }
        },
        {
          path: "deposit",
          component: resolve => {
            require(["@/views/Setting/Deposit"], resolve);
          },
          name: "Deposit",
          meta: { index: "profile", name: "Account" }
        },
        {
          path: "withdraw",
          component: resolve => {
            require(["@/views/Setting/Withdraw"], resolve);
          },
          name: "Withdraw",
          meta: { index: "profile", name: "Account" }
        },
        {
          path: "balance_histories",
          component: resolve => {
            require(["@/views/Setting/BalanceHistories"], resolve);
          },
          name: "BalanceHistories",
          meta: { index: "profile", name: "BalanceHistories" }
        },
        {
          path: "banks",
          component: resolve => {
            require(["@/views/Setting/Banks"], resolve);
          },
          name: "Banks",
          meta: { index: "profile", name: "Account" }
        },
        {
          path: "add_bank",
          component: resolve => {
            require(["@/views/Setting/AddBank"], resolve);
          },
          name: "AddBank",
          meta: { index: "profile", name: "Account" }
        },
        {
          path: "likes",
          component: resolve => {
            require(["@/views/Setting/Likes"], resolve);
          },
          name: "Likes",
          meta: { index: "profile", name: "Likes" }
        },
        {
          path: "member_vip",
          component: resolve => {
            require(["@/views/Setting/MemberVip"], resolve);
          },
          name: "MemberVip",
          meta: { index: "profile", name: "MemberVip" }
        },
        {
          path: "privilege_level",
          component: resolve => {
            require(["@/views/Setting/PrivilegeLevel"], resolve);
          },
          name: "PrivilegeLevel",
          meta: { index: "profile", name: "MemberVip" }
        },
        {
          path: "notifications",
          component: resolve => {
            require(["@/views/Setting/Notifications"], resolve);
          },
          name: "Notifications",
          meta: { index: "profile", name: "Notifications" }
        },
        {
          path: "/notifications/:notificationId",
          component: resolve => {
            require(["@/views/Setting/NotificationDetail"], resolve);
          },
          name: "NotificationDetail",
          meta: { index: "profile", name: "Notifications" }
        },
        {
          path: "/announcements/:announcementId",
          component: resolve => {
            require(["@/views/Setting/NotificationDetail"], resolve);
          },
          name: "AnnouncementDetail",
          meta: { index: "profile" }
        }
      ]
    },
    // 404
    {
      path: "*",
      component: resolve => {
        require(["@/views/NotFound"], resolve);
      },
      name: "NotFound"
    },

  ]
});

// When handling the refresh, vuex is cleared but the user is already logged in
router.onReady(async () => {
  await store.dispatch("getAuth");
});

router.beforeEach(async (to, from, next) => {
  if (to.query && to.query.utm_source) {
    // store.dispatch("setChannelCode", to.query.utm_source);
    const { utm_source } = to.query;
    storage.set("channel_code", utm_source);
    Vue.prototype.api.channelVisitHistory(utm_source);
    // router.push({ name: "Join", query: { utm_source } });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 判断该路由是否需要登录权限
    if (store.getters.auth) {
      // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.path } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
    // if ((to.name === 'Login' || to.name === 'Join') && store.state.user.email) {
    //   next(false)
    // } else {
    //   next()
    // }
  }
});

export default router;
