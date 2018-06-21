import * as types from "../mutation-types";
export default {
  state: {
    tasks: []
  },
  actions: {
  },
  mutations: {
    [types.SET_TASKS](state, tasks) {
      state.tasks = tasks;
    }
  }
};
