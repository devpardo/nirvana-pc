import * as types from "../mutation-types";

const state = {
  loginFlag: false,
  unreadNotificationCount: 0
};

const mutations = {
  [types.LOGIN_FLAG](state, value) {
    state.loginFlag = value;
  },
  [types.UNREAD_NOTIFICATION_COUNT](state, value) {
    state.unreadNotificationCount = value;
  }
};

const actions = {
  setLoginFlag({ commit }, value) {
    commit(types.LOGIN_FLAG, value);
  }
};

const getters = {
  getLoginFlag(state) {
    return state.loginFlag;
  }
};

export default { state, getters, actions, mutations };
