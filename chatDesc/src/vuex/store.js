import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    flowArray:[], // 流程答案的数据
    text:'', //  聊天窗口要发送的数据
    intent:''
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
