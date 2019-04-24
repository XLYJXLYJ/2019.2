<template>
  <div class="answer" oncopy="return false;">
    <span class="title">机器人答案</span>
    <div style="height:25px"></div>
    <div class="gm-scroll-view">
      <ul class="answer-view">
        <li v-for="(a,index) in newArray" :key="index" @mouseover="hoverAnswer(index)" @mouseleave="leaveAnswer()">
          <el-popover
            placement="left"
            width="400"
            trigger="hover">
              <span style="font-size:15px;color:#000">问题：{{a.q.length>12 ? a.q.substring(0,12)+'...'  : a.q}}</span><br/>
              <span class="q_answer02">答案：<span v-html="a.a"></span></span>
          <div slot="reference">
            <div v-show="hoverAnswerNum!==index">
              <span class="question" :title="a.q.length>12 ?  a.q:'' ">问题：{{a.q.length>12 ? a.q.substring(0,12)+'...'  : a.q}}</span>
              <span class="q_answer" :title="a.a.replace('<br/>','').length>12 ?  a.a.replace('<br/>',''):''">答案：<span v-html="a.a.length>12 ? a.a.substring(0,11).replace(/[\r\n]/g,'') + '...'  : a.a"></span></span>
            </div>
            <div v-show="hoverAnswerNum==index">
              <span class="edit" :data-text="a.a" :robot_uu_id="a.robot_uu_id" :dialogId=" a.dialogId" @click="edit($event,a)">查看编辑</span>
              <span class="sent_btn" :data-text="a.a" :robot_uu_id="a.robot_uu_id" :dialogId=" a.dialogId" @click="sent($event,a)">发送</span>
            </div>
          </div>
          </el-popover>
          <div>
          </div>
        </li>
      </ul>
    </div>
    <span class="title">流程指引</span>
    <div style="height:25px"></div>
    <div class="gm-scroll-view" style="height:50%;">
      <el-collapse class="one">
        <el-collapse-item class="one-li" v-for="(a,index) in newArray" :key='index' :title="a.display_name" v-show="a.display_name">
            <ul class="two">
              <li v-for="(c,index__) in a.pAnswer.lAnswer" :key='index__' @click="sentProcess($event)" :title='c.content'>
                流程{{index__+1}}：{{c.content.length>12 ? c.content.substring(0,12)+'...'  : c.content}}
              </li>
            </ul>
        </el-collapse-item>
      </el-collapse>


    </div>
  </div>
</template>
<script>
  import Bus from '../../bus.js';
  export default {
    name: 'answer',
    props: {
      targetIds: {
        type: Object,
      },
      index: {
        type: Number
      }
    },
    data() {
      return {
        indexNum:'',
        processPproduct:'',
        showIcon:'',
        showIconOther:[],
        screen:'',
        hoverAnswerNum:-1
      }
    },
    computed: {
      newArray: function () {
        if (this.targetIds.qa_record && this.targetIds.qa_record.length > 0) {
          var qa_record = this.targetIds.qa_record;
          var answers = this.targetIds.answers;
          for (var i = 0; i < qa_record.length; i++) {
//              qa_record[i].a = qa_record[i].a .replace(/<br\/>/g,'')
            for (var j = 0; j < answers.length; j++) {
//                answers[j].a = answers[j].a.replace(/<br\/>/g,'')
              if (qa_record[i].q == answers[j].q && qa_record[i].sentTime == answers[j].sentTime) {
                answers.splice(j, 1);
                j--;
              }
            }
          }
          return this.targetIds.qa_record.concat(this.targetIds.answers)
        } else {
          return this.targetIds.answers
        }
      },
      answer: function () {
        return this.targetIds.answer
      }
    },
    watch: {
      newArray: {
        handler(newValue, oldValue) {
          var this_ = this;
          this.$nextTick(function () {
            setTimeout(function () {
              var div = document.getElementsByClassName('gm-scroll-view');
              div[this_.index].scrollTop = div[this_.index].scrollHeight;
            }, 200)
          })
        },
        deep: true,
        immediate: true,
      },
      answer: {
        handler(newValue, oldValue) {
          var this_ = this;
          this.$nextTick(function () {
            setTimeout(function () {
              var div = document.getElementsByClassName('gm-scroll-view');
              div[this_.index].scrollTop = div[this_.index].scrollHeight;
            }, 200)
          })
        },
        deep: true,
        immediate: true,
      },
    },
    created(){
      if(screen.width>1500){
        this.screen = true
      }else{
        this.screen = false
      }
      let ismac = this.isMac()
      if(ismac){
         document.getElementsByClassName('answer')[0].setAttribute('style','padding-right 25px')
      }
    },
    methods: {
      isMac() {
        return /macintosh|mac os x/i.test(navigator.userAgent);
      },
      hoverAnswer(index){
        this.hoverAnswerNum = index
      },
      leaveAnswer(index){
        this.hoverAnswerNum = -1
      },
      edit(event,a) {
        var this_ = this;
        var target = event.target
        localStorage.setItem('selectEdit',1)
        this.robot_balance(target.getAttribute("robot_uu_id"), target.getAttribute("dialogId"));
        Bus.$emit('look', {data_text: target.getAttribute("data-text").replace(/<br\/>/g, '\n'), 'index': this_.index,'a':a})
      },
      sent(event,a) {
        var this_ = this;
        var target = event.target
        this.robot_balance(target.getAttribute("robot_uu_id"), target.getAttribute("dialogId"));
        Bus.$emit('sent', {data_text: target.getAttribute("data-text"), 'index': this_.index,'a':a})
        this.$ajax({
            method: "put",
            url: "/acs/v1.0/robot_answer",
            headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          data: {
              'robot_uu_id': a.robot_uu_id,
              'modify_content': a.a,
              'service_send_status':1
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        }).then(res => {
        })
      },
      sentProcess(event) {
        var this_ = this;
        var target = event.target
        // this.robot_balance(target.getAttribute("robot_uu_id"), target.getAttribute("dialogId"));
        // Bus.$emit('sentProcess', {data_text: target.title, 'index': this_.index})
         Bus.$emit('look', {data_text: target.title, 'index': this_.index})
      },
      robot_balance(robot_uu_id, dialogId) {
        this.$ajax({
          method: "post",
          url: "/acs/v1.0/robot_balance",
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            'robot_uu_id': robot_uu_id,
            'dialogId': dialogId
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        }).then(res => {
        })
      },
      Spread(index) {
        this.indexNum = index
        this.processPproduct = true
      },
      Fold(index) {
        this.indexNum = index
        this.processPproduct = false
      },
      showHide(index_,index) {
        this.indexNum = index
        this.showIcon = !this.showIcon
        this.showIconOther[index] = this.$refs[index_][index].style.display
        if (this.$refs[index_][index].style.display=="none") {
          this.$refs[index_][index].style.display=""
        }else if (this.$refs[index_][index].style.display=="") {
          this.$refs[index_][index].style.display="none"
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  body {
    margin 0
    .answer {
      border 1px solid #d6d6d6
      border-right none
      display none
      float left
      width 300px
      padding-top 20px
      height 100%
      box-sizing border-box
      background: #eef3f6;
      border-radius: 5px;
      // box-shadow: 0px 0px 16px 0px rgba(61, 104, 169, 0.17);
      border-radius: 0px;
      overflow hidden
      position relative
      left -13px
      .title {
        margin-left 20px
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        color: rgba(69, 69, 69, 1);
        padding-bottom 8px
        width 270px
        display inline-block
        margin-bottom -10px
        border-bottom 1px solid #d6d6d6
      }
      .answer-view {
        margin 0px 0 0 0
        padding-left 18px
        margin-left 20px;
        box-shadow:0px 0px  10px 0px #cad7ea
        // border-top 1px solid #cad7ea
        li {
          padding 7px 0px 7px 6px
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 17px 0px #cad7ea
          border-radius: 5px;
          margin-bottom: 0px;
          margin-bottom 12px;
          cursor pointer
          margin-left -20px;
          &:hover {
            // background: #d0e1ed
            box-shadow: 0px 0px 8px 0px rgba(61, 104, 169, 0.17);
            border-radius: 5px;
          }
          div {
            overflow auto
            .number {
              float left
              height 100%
              font-size: 16px;
              font-family: ArialMT;
              color: rgba(49, 153, 224, 1)
            }
            .number + div {
              width 222px
              float left
            }
            .question {
              line-height 24px
              font-size 15px
              word-break break-all
              padding-left:8px;
            }
            .q_answer {
              display block
              font-size 14px
              color #666666
              padding-left:8px;
            }
            .edit:hover, .sent_btn:hover {
              background: rgba(49, 153, 224, 1);
              color white
            }
            .edit, .sent_btn {
              float right
              margin-right 6px
              color rgba(49, 153, 224, 1)
              padding 3px 5px
              font-size 14px
              margin-top 8px
              margin-bottom 8px
              border 1px solid rgba(49, 153, 224, 1)
              cursor pointer
              border-radius: 5px;
              width:43%;
              text-align center
            }
          }
        }
      }
    }
  }
  .answer .gm-scroll-view {
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: -10px;
    margin-bottom: 20px;
    width: calc(100%);
    height 35%
    .one{
      margin-left 20px;
      margin-bottom:50px;
      .one-li{
        margin-left -12px
        margin-right 8px
        position relative
        left 10px
        margin-bottom 4px;
        .two{
          margin-top:-2px
          padding-left:6px;
          padding-right:6px;
          li{
            padding 2px;
            border-radius:10px;
            margin 4px
            border: 1px solid #d0e1ed;
            cursor pointer
            padding-left 8px;
          }
          li:hover{
            background:#d0e1ed;
          }
        }
      }
    }
  }
  .answer .gm-scroll-view::-webkit-scrollbar {
    width: 10px;
    height: 271px;
  }
  .answer .gm-scroll-view::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px #eef3f6;
      background: #eef3f6;
  }
  .answer .gm-scroll-view::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px #eef3f6;
      border-radius: 10px;
      background: #eef3f6;
  }
</style>