import axios from "axios";

import cookie from "@/libs/cookie";

// const devServer = "http://api.mw006.net/";
const api = axios.create({
  // baseURL: 'http://api.3000.dev/',
  // baseURL: 'http://api.oneph.top/',
  baseURL: process.env.API_ROOT,
  // baseURL: 'http://api.manwin5.com/',
  timeout: 20000,
  headers: {
    "Na-Api-Platform": "Pc",
    "Na-Api-Id":
      "a9b0f5a803a83d9b5faaee5b9ba0b3175c6f925c1a59199e8cdc119f3fb1275a",
    "Na-Api-Key":
      "5d43b13f353434326b5546ead381b79890e1d781ece3a4f1847f21634e7760e8",
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

export const getToken = () => {
  return cookie.get("accessToken");
};

const tokenHeader = () => {
  const token = cookie.get("accessToken");
  return { Authorization: `Bearer ${token}` };
};

// http request 拦截器
api.interceptors.request.use(
  config => {
    if (cookie.get("accessToken")) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      Object.assign(config.headers, tokenHeader());
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// http response 拦截器
// api.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     console.log(error.response);
//     if (error.response) {
//       let messages;
//       let vue = new Vue();
//       switch (error.response.status) {
//         case 401:
//         case 403:
//           messages = error.response.data.message || error.response.data.error;
//           if (!messages) {
//             messages = "需要验证或本次连接已过期";
//           }
//           vue.$message({
//             message: messages,
//             showClose: true,
//             type: "error"
//           });
//           store.dispatch("removeUserInfo");
//           store.dispatch("setLoginFlag", true);
//           // router.replace({
//           //   path: "/",
//           //   query: { redirect: router.currentRoute.fullPath }
//           // });
//           break;
//         default:
//           messages = error.response.data.message || error.response.data.error;
//           if (!messages) {
//             messages = "系统错误";
//           }
//           vue.$message({
//             message: messages,
//             showClose: true,
//             type: "error"
//           });
//       }
//     }
//     return Promise.reject(error.response.data); // 返回接口返回的错误信息
//   }
// );

let httpApi = {
  getHomePopSuggests: () => api.get("/v1/home/popup_suggests"),
  getVendorAmount: vendorCode => api.get(`/v1/vendors/${vendorCode}/amount`),
  markCouponsAsRead: () => api.put("/v1/setting/profile/mark_coupons_as_read"),
  checkUser: (key = "email", value) =>
    api.get("/v1/users/check_user", { params: { [key]: value } }),
  registeredUser: data => api.post("/v1/users", data),
  mobileCaptcha: data => api.post("/v1/users/send_mobile_captcha", data),
  loginUser: data => api.post("/oauth2/token", data),
  updatePassword: data => api.put("/v1/setting/profile/update_password", data),
  getLikeGames: () => api.get("/v1/setting/profile/like_games"),
  getProfile: () => api.get("/v1/setting/profile"),
  logOut: () => api.post("/oauth2/revoke"),
  sendMobileResetCode: data =>
    api.post("/v1/users/send_mobile_reset_code", data),
  resetPasswordViaMobile: data =>
    api.post("/v1/users/reset_password_via_mobile", data),
  sendEmailResetCode: data => api.post("/v1/users/send_email_reset_code", data),
  resetPasswordViaEmail: data =>
    api.post("/v1/users/reset_password_via_email", data),
  getAnnouncement: () => api.get("/v1/announcements/"),
  getHomeAnnouncement: () => api.get("/v1/home/announcement/"),
  getAnnouncementDetail: announcementId =>
    api.get(`/v1/announcements/${announcementId}/`),
  getOrder: orderId => api.get(`/v1/setting/orders/${orderId}`),
  getGames: params => api.get("/v1/games", { params }),
  getGameDetail: gid => api.get(`/v1/games/${gid}/`),
  postLike: gid => api.post(`/v1/games/${gid}/like`),
  postUnlike: gid => api.post(`/v1/games/${gid}/unlike`),
  getLotteries: () => api.get("/v1/lotteries/"),
  postLotteries: () => api.post("/v1/lotteries/play"),
  postLaunch: gid => api.post(`/v1/games/${gid}/launch`),
  postTransfer: (vendorName, data) =>
    api.post(`/v1/vendors/${vendorName}/transfer`, data), // 转入转出
  postTransferMain: (vendorName, data) =>
    api.post(`/v1/vendors/${vendorName}/transfer_main`, data),
  postTransferSub: (vendorName, data) =>
    api.post(`/v1/vendors/${vendorName}/transfer_sub`, data),
  postApplyPromoCode: (vendorName, data) =>
    api.post(`/v1/vendors/${vendorName}/apply_promo_code`, data),
  getLoadTransfer: vendorName =>
    api.get(`/v1/vendors/${vendorName}/load_transfer`),
  postResetTransferAdjustment: vendorName =>
    api.post(`/v1/vendors/${vendorName}/reset_transfer_adjustment`),
  getVendorWallet: vendorName => api.get(`/v1/vendors/${vendorName}/`),
  getTasks: () => api.get("/v1/quests/"), // 任务
  getTask: (questId, params) => api.get(`/v1/quests/${questId}`, { params }),
  postTaskMakeProcess: (questId, data) =>
    api.post(`/v1/quests/${questId}/make_process`, data),
  postTaskMakeReceived: (questId, data) =>
    api.post(`/v1/quests/${questId}/make_received`, data),
  postReceiveRebate: rebateId =>
    api.post(`/v1/setting/rebates/${rebateId}/received`),
  getCoupons: () => api.get("/v1/setting/profile/coupons"), // 优惠
  postCouponCode: data => api.post("v1/setting/profile/set_coupon", data), // 兑换优惠券
  getPoints: params => api.get("/v1/setting/points", { params }), // 亚太币
  getRebates: () => api.get("/v1/setting/rebates"), // 返水
  getSearchRebates: params => api.get("/v1/setting/rebates/search", { params }),
  postSetRebatesCompleted: data =>
    api.post("/v1/setting/rebates/multi_set_completed", data),
  getProfileAmount: () => api.get("/v1/setting/profile/amount/"), // 个人中心
  // getBalanceHistories: (params) => api.get('/v1/setting/balance_histories', {params}),
  // getBalancehistory: (billNo) => api.get(`/v1/setting/balance_histories/${billNo}`),
  deposit: data => api.post("/v1/setting/orders/deposit", data),
  getBankCards: () => api.get("/v1/setting/bank_cards"),
  getBanks: params => api.get("/v1/setting/banks", { params }),
  postBankCards: data => api.post("/v1/setting/bank_cards", data),
  deleteBank: bankCardId => api.delete(`/v1/setting/bank_cards/${bankCardId}/`),
  getWithdrawals: () => api.get("/v1/setting/profile/withdrawals"),
  withdraw: data => api.post("/v1/setting/orders/withdraw", data),
  postCancelOrder: orderId => api.post(`/v1/setting/orders/${orderId}/cancel`),
  postUploadAvatar: (data, config) =>
    api.post("/v1/setting/profile/update_avatar", data, config),
  updateProfile: data => api.put("/v1/setting/profile", data),
  postMobileVerifyCode: mobile =>
    api.post("/v1/setting/profile/send_mobile_verify_code", { mobile }),
  postEmailVerifyCode: email =>
    api.post("/v1/setting/profile/send_email_verify_code", { email }),
  mobileCreate: (mobile, code) =>
    api.post("/v1/setting/profile/mobile_create", { mobile, code }),
  emailCreate: (email, code) =>
    api.post("/v1/setting/profile/email_create", { email, code }),
  getNotifications: params => api.get("/v1/setting/notifications", { params }),
  getNotificationsUnreadCount: params =>
    api.get("/v1/setting/notifications/unread_count", { params }),
  postNotifyRead: notificationId =>
    api.post(`/v1/setting/notifications/${notificationId}/read`),
  postNotifyDestroy: notificationId =>
    api.post(`/v1/setting/notifications/${notificationId}/destroy`), // 删除单个消息
  postNotifyReadAll: () => api.post("/v1/setting/notifications/read_all"), // 读取所有消息
  postNotifyDestroyAll: () => api.post("/v1/setting/notifications/destroy_all"), // 删除所有消息
  getNotifyDetail: notificationId =>
    api.get(`/v1/setting/notifications/${notificationId}`),
  deleteNotify: notificationId =>
    api.delete(`/v1/setting/notifications/${notificationId}`),
  getVipIntro: () => api.get("/v1/setting/profile/vip_intr"),
  postReadAll: () => api.post("/v1/setting/notifications/read_all"),
  getRecommend: () => api.get("/v1/home/recommend"), // 首页推荐游戏
  getSuggests: () => api.get("/v1/home/suggests"), // 首页轮播图
  getRecords: () => api.get("/v1/home/records"), // 首页中s奖纪录
  getVendors: params => api.get("/v1/vendors", { params }), // 某类别的游戏页面左侧的场馆列表
  getVendorsLabels: params => api.get("/v1/vendors/labels", { params }),
  getWalletOfVendor: code => api.get(`/v1/vendors/${code}/wallet`), // 获取场馆下的钱包
  getGamesOfVendor: (code, params) =>
    api.get(`/v1/vendors/${code}/games`, { params }), // 获取某场馆下对应分类的游戏列表
  getBannersOfVendor: () => api.get("/v1/vendors/banners"), // 某类游戏的页面上的轮播图
  getQuests: params => api.get("v1/quests", { params }), // 我的任务
  getPromotions: params => api.get("v1/promotions", { params }), // 优惠
  getBalanceHistories: params =>
    api.get("/v1/setting/balance_histories", { params }),
  getBalancehistory: billNo =>
    api.get(`/v1/setting/balance_histories/${billNo}`),
  getOnlineCustomers: () => api.get("/v1/setting/profile/online_customers"), // chat
  getOwnChat: () => api.get("/v1/setting/chat"),
  updateChatInfo: data => api.put("/v1/setting/chat", data),
  getChatLines: (chatId, params) =>
    api.get("/v1/setting/chat/chat_lines", { params }),
  channelVisitHistory: code => api.post("/v1/channel_visit_history", { code }),
  postHongbao: () => api.post("v1/lotteries/hongbao"), // 抽红包
  getHongbaoTimer: () => api.get("v1/lotteries/hongbao_state"), // 抽红包时间,
  requestCallback: () => api.post("/v1/setting/profile/request_callback"),
  getNotificationsCount: () => api.get("/v1/setting/profile/counter"),
  launchSportsBook: () => api.get("/v1/vendors/IBC/launch"),
  launchCasino: (vendorCode) => api.get(`/v1/vendors/${vendorCode}/launch`)
};

httpApi.install = function(Vue, options) {
  // if (options.store) {
  //   store = options.store;
  // }
  options.store.api = httpApi;
  options.store.router = options.router;
  Vue.prototype.api = httpApi;
};

export default httpApi;
