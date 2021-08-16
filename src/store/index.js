
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 模块
import userinfo from "./modules/userInfo.js"

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {

  },
  mutations: {
    increment (state)
    {
      state.count++
    }
  },
  actions: {

  },
  modules: {
    userinfo
  }
})




