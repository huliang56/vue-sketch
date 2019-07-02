import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  UPDATE_TOOL: 'UPDATE_TOOL',
  SAVE_DATA: 'SAVE_DATA',
  GET_PREV: 'GET_PREV',
  GET_NEXT: 'GET_NEXT',
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    currentTool: localStorage.getItem('sketch-tool') || 'Pencil',
    // 用于保留过去的可撤销状态
    past: JSON.parse(localStorage.getItem('sketch-past')) || [],
    // 当前状态
    present: JSON.parse(localStorage.getItem('sketch-present')) || {},
    // 撤销之后保留的未来状态
    future: JSON.parse(localStorage.getItem('sketch-future')) || [],
  },
  mutations: {
    // 修改当前工具状态
    [types.UPDATE_TOOL](state, payload) {
      state.currentTool = payload.tool
    },
    // 保存新的对象集
    [types.SAVE_DATA](state, payload) {
      // 过滤首次状态
      state.present && state.past.push(state.present)
      state.present = payload.json
      state.future = []
    },
    // 获取前一个对象集
    [types.GET_PREV](state) {
      if (state.past.length) {
        state.future.push(state.present)
        state.present = state.past.pop()
      }
    },
    // 获取下一个对象集
    [types.GET_NEXT](state) {
      if (state.future.length) {
        state.past.push(state.present)
        state.present = state.future.pop()
      }
    },
  },
  actions: {
    updateTool: ({ commit }, tool) => commit(types.UPDATE_TOOL, { tool }),
    saveObjects: ({ commit }, json) => commit(types.SAVE_DATA, { json }),
    loadPrev: ({ commit }) => commit(types.GET_PREV),
    loadNext: ({ commit }) => commit(types.GET_NEXT),
  },
  getters: {
    isFreeMode: state =>
      state.currentTool === 'Pencil' || state.currentTool === 'Eraser',
  },
  plugins: [saveLocalStoragePlugin()],
})

// 状态修改后，将状态保存到localStorage
function saveLocalStoragePlugin() {
  return store => {
    store.subscribe((mutation, state) => {
      console.log(mutation)
      if (mutation.type === 'UPDATE_TOOL') {
        localStorage.setItem('sketch-tool', state.currentTool)
      } else {
        localStorage.setItem('sketch-past', JSON.stringify(state.past))
        localStorage.setItem('sketch-present', JSON.stringify(state.present))
        localStorage.setItem('sketch-future', JSON.stringify(state.future))
      }
    })
  }
}
