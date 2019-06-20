import Vue from 'vue'
import Vuex from 'vuex'

import cnode from './cnode'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token:'',
    admin: null,
    identity: '',
    isLogin: false
  },
  mutations: {
    setState (state, data) {
      state.isLogin = data.success
      state.admin = data.adminInfo
      state.token = data.adminInfo.adminId
      state.identity=data.message
      sessionStorage.setItem('store', state)
    }
  },
  modules: {
    cnode
  }
})
export default store
