import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    flowArray:[], // 流程答案的数据
    text:'', //  聊天窗口要发送的数据
    intent:'',
    chatHeight:'',
    no_voice:0
}

const actions = {

}

const mutations = {
    setHeight (state,index) {
      state.chatHeight = index
    },
    setVoice (state,index) {
      state.no_voice = index
    }
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
