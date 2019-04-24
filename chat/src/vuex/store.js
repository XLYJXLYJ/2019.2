import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    flowArray:[], // 流程答案的数据
    text:'', //  聊天窗口要发送的数据
    intent:'',
    chatHeight:'',
    no_voice:0, //设置控制声音是否播放变量
    initVoice:'', //控制点击切换按钮是否播放声音
    customer:'Guest',
    sentence:''
}

const actions = {

}

const mutations = {
    setHeight (state, index) {
      state.chatHeight = index
    },
    setVoice (state, index) {
      state.no_voice = index
    },
    setInitVoice (state, index) {
      state.initVoice = index
    },
    setCustomer (state, index) {
      state.customer = index
    },
    setSentence (state, index) {
      state.sentence = index
    },
    triSentence (state, objj) {  // 同时设置声音和弹框参数
      let obj = {}
      obj = objj
      // state.no_voice = obj.no_voice
      // state.customer = obj.customer
      // state.sentence = obj.sentence
      [state.no_voice,state.customer,state.sentence] = [obj.no_voice,obj.customer,obj.sentence]
    }
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})
