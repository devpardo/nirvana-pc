import * as types from "../mutation-types";
import * as storage from "../../libs/storage";
import cookie from "../../libs/cookie";
const state = {
  email: "",
  username: "",
  uid: "",
  aws_url: "",
  auth: null
};

const mutations = {
  [types.SET_USER_INFO](state, user) {
    // state.email = user.email;
    // state.uid = user.uid;
    // state.username = user.username;
    // state.aws_url = user.aws_url;
    state.auth = user;
  },
  [types.REMOVE_USER_INFO](state) {
    state.auth = null;
  },
  SET_AUTH_BALANCE: (state, payload) => {
    if (!state.auth) return;
    state.auth.main_wallet = payload;
  },
  SET_AUTH: (state, payload) => {
    state.auth = payload;
  }
};

const actions = {
  async setUserInfo({ commit, dispatch, state }, user) {
    commit(types.SET_USER_INFO, user);
    if (state.uid) {
      await dispatch("wsLink");
    }
  },
  removeUserInfo({ commit, dispatch }) {
    localStorage.clear();
    commit(types.REMOVE_USER_INFO);
  },
  async getAuthBalance({ commit, getters }) {
    if (!getters.auth) return;
    const { data } = await this.api.getAuthBalance();
    commit("SET_AUTH_BALANCE", data.amount);
  },
  async getAuth({ commit, dispatch }) {
    const { data } = await this.api.getProfile();

    commit("SET_AUTH", data);
  },
  async login({ dispatch }, payload) {
    const { data } = await this.api.loginUser(payload);

    cookie.set("accessToken", data.access_token, { path: "/" });

    await dispatch("getAuth");
  },
  async logout({ commit }) {
    cookie.remove("user");
    commit("SET_AUTH");
  }
};

const getters = {
  getUserInfo(state) {
    return state.email;
  },
  auth: state => state.auth,
  channelCode: () => storage.get("channel_code")
};

export default { state, getters, actions, mutations };
