import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import sundry from "./modules/sundry";
import task from "./modules/task";
import chat from "./modules/chat";
import api from "./api";

Vue.use(Vuex);

const state = () => ({
  platforms: [],
  games: [],
  wallets: [],
  modal: {
    promo: false
  }
});

const getters = {
  route: state => state.route,
  params: (state, getters) => {
    if (!getters.route) return;
    return getters.route.params;
  },
  platforms: state => state.platforms,
  games: state => state.games,
  wallets: state => state.wallets,
  modal: state => key => state.modal[key]
};

const mutations = {
  SET_MODAL: (state, { key, value }) => {
    console.log(key, value);
    if (key in state.modal) {
      state.modal[key] = value;
    }
  },
  SET_PLATFORMS: (state, payload) => {
    state.platforms = payload;
  },
  SET_GAMES: (state, payload) => {
    state.platforms = payload;
  },
  SET_WALLETS: (state, payload) => {
    state.wallets = payload;
  }
};

const actions = {
  // async getPlatform() {

  // },
  async getPlatforms({ commit, getters }) {
    const params = { q_category_eq: `category_${getters.params.game}` };
    const { data } = await api.getVendors(params);
    if (!data) return;
    console.log(data);
    commit("SET_PLATFORMS", data.items);
  },
  async getPlatformGames(
    { commit },
    { code, params = { q_recommended_at_present: 1 } }
  ) {
    const { data } = await api.getGamesOfVendor(code, params);
    if (!data) return [];
    console.log(code, data);
    const [item] = data.items;
    if (!item) return [];
    console.log(item);
    const { games } = item;
    return games || [];
  },
  async getAllPlatformGames({ commit, getters, dispatch }) {
    await dispatch("getPlatforms");
    const platforms = getters.platforms;
    console.log(platforms);
    const games = await Promise.all(
      platforms.map(platform => {
        return dispatch("getPlatformGames", { code: platform.code });
      })
    );
    const flattenGames = games.reduce(
      (allGames, platformGames) => [...allGames, ...platformGames],
      []
    );
    return flattenGames;
  },
  async getRebates() {
    const { data } = await api.getRebates();
    return data;
  },
  async getCoupons() {
    const { data } = await api.getCoupons();
    return data;
  },
  async getWallets({ commit }) {
    const { data } = await api.getProfileAmount();
    if (!data) return;
    if (data.sub_wallets && data.sub_wallets.length) {
      commit("SET_WALLETS", data.sub_wallets);
    }
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
    sundry,
    task,
    chat
  }
});

export default store;
