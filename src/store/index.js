import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    footNavShow : true
  },
  mutations: {
    setFootNavHidden(state){
      state.footNavShow = false;
    },
    setFootNavHiShow(state){
      state.footNavShow = true;
    }
  },
  actions: {
  },
  modules: {
  }
})
