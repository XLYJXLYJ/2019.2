import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    robotBaseUrl:'http://open.qb-tech.net',
    humanBaseUrl:'https://chat.qb-tech.net',
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
