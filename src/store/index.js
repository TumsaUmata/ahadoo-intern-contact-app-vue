import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['apiToken']
    })
  ],
  state: {
    apiToken: null
  },
  getters: {
    getToken: state => {
      return state.apiToken;
    }
  },
  mutations: {
    setToken: (state, payload) => {
      state.apiToken = payload;
    },
    resetToken: (state) => {
      state.apiToken = null;
    }
  },
  actions: {
    setApiToken: ({commit}, payload) => {
      commit('setToken', payload)
    },
    resetUserToken: ({commit}) => {
      commit('resetToken')
    }
  },
  modules: {
  }
})
