<template>
  <div class="answer" oncopy="return false;">
    <span class="title">机器人答案</span>
    <div style="height:25px"></div>
    <div class="gm-scroll-view">
      <ul>
        <li v-show="newArray.length>0" v-for="(a,index) in newArray" :key='index'>
          <div>
            <span class="number">{{index+1}}、</span>
            <div>
              <span class="question" :title="a.q.length>12 ?  a.q:'' ">问题：{{a.q.length>12 ? a.q.substring(0,12)+'...'  : a.q}}</span>
              <span class="q_answer" :title="a.a.replace('<br/>','').length>12 ?  a.a.replace('<br/>',''):''">答案：<span>{{a.a.length>12 ? a.a.substring(0,12)+'...'  : a.a}}</span></span>
            </div>
          </div>
          <div>
            <span class="edit" :data-text="a.a" :robot_uu_id="a.robot_uu_id" :dialogId=" a.dialogId"
                  @click="edit($event)">查看编辑</span>
            <span class="sent_btn" :data-text="a.a" :robot_uu_id="a.robot_uu_id" :dialogId=" a.dialogId"
                  @click="sent($event)">发送</span>
          </div>
        </li>
      </ul>
    </div>
    <span class="title">流程指引</span>
    <div style="height:25px"></div>
    <div class="gm-scroll-view" style="height:55%;" v-show="processGuidance">
      <ul style="margin-bottom:20px">
        <div class="recommended" v-show="!processPproduct">
          <span class="productBtn">产品推荐</span>
          <span class="unfoldBtn" @click="Spread()">展开</span>
        </div>
        <div class="recommended" v-show="processPproduct">
          <span class="productBtn">产品推荐</span>
          <span class="unfoldBtn" @click="Fold()">折叠</span>
        </div>
        <li v-show="flowArrayNum.length>0 && processPproduct" v-for="(a,index) in flowArrayNum" :key='index' style="height:auto" @click="sentProcess($event)">
          <span style="color:#666">流程{{index+1}}：</span> <span style="color:#666">{{a.content}}</span>
        </li>
      </ul>
      <!-- <ul style="margin-bottom:20px">
        <div class="recommended">
          <span class="productBtn">产品推荐</span>
          <span class="unfoldBtn" @click="handleUnfold(true)">展开</span>
        </div>
        <div class="recommended">
          <span class="productBtn">理赔资料</span>
          <span class="unfoldBtn" @click="handleUnfold(false)">折叠</span>
        </div>
        <li v-show="flowArray.length>0" v-for="(a,index) in flowArray" :key='index' style="height:auto" :data-text="a.a" :robot_uu_id="a.robot_uu_id" :dialogId=" a.dialogId" @click="sentProcess($event)">
          流程：<span>{{a.a.length>12 ? a.a.substring(0,12)+'...'  : a.a}}</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script>
  import Bus from '../../bus.js';
  import Vuex from '../../vuex/store.js';
  export default {
    name: 'answer',
    props: {
      targetIds: {
        type: Object,
      },
      targetFlow: {
        type: Object,
      },
      index: {
        type: Number
      }
    },
    data() {
      return {
        processGuidance: false, // 是否显示流程指引
        processPproduct: '', // 流程产品
        flowArrayNum: []
      }
    },
    computed: {
      newArray: function () {
        if (this.targetIds.qa_record && this.targetIds.qa_record.length > 0) {
          var qa_record = this.targetIds.qa_record;
          var answers = this.targetIds.answers;
          for (var i = 0; i < qa_record.length; i++) {
            for (var j = 0; j < answers.length; j++) {
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
      },
      flowArray: function () {
        return this.$store.state.flowArray
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
      flowArray (val) {
        this.flowArrayNum = this.$store.state.flowArray
        if (this.flowArrayNum.length > 0) {
          this.processGuidance = true
        } else {
          this.processGuidance = false
        }
      }  
    },
    methods: {
      edit(event) {
        var this_ = this;
        var target = event.target
        this.robot_balance(target.getAttribute("robot_uu_id"), target.getAttribute("dialogId"));
        Bus.$emit('look', {data_text: target.getAttribute("data-text").replace(/<br\/>/g, '\n'), 'index': this_.index})
      },
      sent(event) {
        var this_ = this;
        var target = event.target
        this.robot_balance(target.getAttribute("robot_uu_id"), target.getAttribute("dialogId"));
        Bus.$emit('sent', {data_text: target.getAttribute("data-text"), 'index': this_.index})
      },
      sentProcess(event) {
        var this_ = this;
        var target = event.target
        this.robot_balance(target.getAttribute("robot_uu_id"), target.getAttribute("dialogId"));
        Bus.$emit('sentProcess', {data_text: target.outerText, 'index': this_.index})
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
      Spread () {
        this.processPproduct = true
      },
      Fold () {
        this.processPproduct = false
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  body {
    margin 0
    .answer {
      display none
      float left
      width 270px
      padding-top 20px
      height 100%
      box-sizing border-box
      background: #eef3f6;
      border-radius: 5px;
      box-shadow: 0px 0px 16px 0px rgba(61, 104, 169, 0.17);
      border-radius: 5px;
      overflow hidden
      .title {
        margin-left 20px
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        color: rgba(69, 69, 69, 1);
      }
      ul {
        margin 0px 0 0 0
        padding-left 8px;
        li {
          padding 7px 0px 7px 6px
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 17px 0px #cad7ea
          border-radius: 5px;
          margin-bottom: 10px;
          cursor pointer
          &:hover {
            background: #d0e1ed
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
            }
            .q_answer {
              display block
              font-size 14px
              color #666666
            }
            .edit:hover, .sent_btn:hover {
              background: rgba(49, 153, 224, 1);
              color white
            }
            .edit, .sent_btn {
              float right
              margin-right 20px
              color rgba(49, 153, 224, 1)
              padding 3px 5px
              font-size 14px
              margin-top 10px
              border 1px solid rgba(49, 153, 224, 1)
              cursor pointer
              border-radius: 5px;
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
    width: calc(100% + 20px);
    height 35%
    
    .recommended {
        width: 100%
        height: 30px;

        .productBtn {
          float: left;
          margin-left: 32px;
          color: #3199e0;
          padding: 3px 5px;
          font-size: 14px;
          border: 1px solid #3199e0;
          cursor: pointer;
          /* background: rgba(49,153,224,1); */
          border-radius: 5px;

          &:hover {
            background: rgba(49, 153, 224, 1);
            color white
          }
        }

        .unfoldBtn {
          float: left;
          margin-left: 20px;
          color: #3199e0;
          padding: 3px 5px;
          font-size: 14px;
          border: 1px solid #3199e0;
          cursor: pointer;
          /* background: rgba(49,153,224,1); */
          border-radius: 5px;

          &:hover {
            background: rgba(49, 153, 224, 1);
            color white
          }
        }
      }

  }
</style>

