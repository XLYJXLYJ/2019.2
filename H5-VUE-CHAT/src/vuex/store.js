import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    robotBaseUrl:'http://test.open.qb-tech.net',
    humanBaseUrl:'http://test.chat.qb-tech.net',
}

const actions = {

}

const mutations = {

}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
