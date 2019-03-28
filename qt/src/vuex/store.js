import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  routeNum: '', // 设备像素比
}

const actions = {

}

const mutations = {
  GetRoute (state,index) {
    state.routeNum = index
  }
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
