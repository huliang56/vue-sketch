import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  UPDATE_TOOL: 'UPDATE_TOOL',
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    currentTool: localStorage.getItem('currentTool') || 'Pencil',
  },
  mutations: {
    [types.UPDATE_TOOL](state, payload) {
      state.currentTool = payload.tool
      localStorage.setItem('currentTool', payload.tool)
    },
  },
  actions: {
    updateTool: ({ commit }, tool) => commit(types.UPDATE_TOOL, { tool }),
  },
  getters: {
    isFreeMode: state =>
      state.currentTool === 'Pencil' || state.currentTool === 'Eraser',
  },
})
