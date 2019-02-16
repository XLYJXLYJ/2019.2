<template>
  <div class="chat">
    <v_aside></v_aside>
    <v_head title="客户聊天页面"></v_head>
    <div class="content">
      <div class="chat-wrapper">
        <div class="chat_content">
          <span class="chat_title">
            <span>客服聊天页面</span>
          </span>
          <img src="../../assets/aimi.png">
          <span class="status">
            <label>客服1号</label>
            <span :class="{'active':checkActive}"  @click="setActive">在线</span>
            <span :class="{'active':!checkActive}"  @click="setActive">不在线</span>
          </span>
        </div>
        <chatList v-for="(cl,index) in lists"  :id="index"  :key="index"   v-on:chat_List="closeList(index)" v-on:s_l="addClass(index)"></chatList>
      </div>
      <chatWindow v-for="(list,index) in lists " v-on:listenStatus="remove(index)" :class="{'show':index==temp}" :key="index">{{lists[index]}}</chatWindow>
    </div>
  </div>

</template>
<script>
  import v_aside from "../aside/aside"
  import v_head from "../head/head"
  import chatList from "../chatList/chatList"
  import chatWindow from "../chatWindow/chatWindow";
  export default {
    name:'demo',
    data(){
      return {
        checkActive: true,
        lists:[45,67,67898,89],
        chatLists:[1,2,3,4,8],
        temp:0

      }
    },
    methods:{
      setActive(event){
        this.checkActive=!this.checkActive;
      },
      remove(data){
        this.lists.splice(data,1);
      },
      closeList(data){
        this.lists.splice(data,1);
      },
      addClass(index){
        this.temp=index;
      },

    },
    components:{
      chatWindow,
      v_aside,
      v_head,
      chatList
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .chat{
    >.content{
      position absolute
      left 150px
      top 80px
      width calc(100vw - 150px)
      height calc(100vh - 80px)
      .chat-wrapper {
        float left
        display table
        height 100%
        background-color #f1f1f9
        .chat_content{
          width 245px
          height 280px
          color #454545
          padding 20px
          text-align center
          box-sizing border-box
          .chat_title {
            float left
            span {
              position relative
              font-size 15px
              &:before {
                position absolute
                content ""
                display inline-block
                height 16px
                width 3px;
                background-color #524AE7
                left -8px
                margin-top 2px
              }
            }
          }
          img {
            margin-top 50px
          }
          .status {
            display block
            margin-top 20px
            label{
              margin-right 10px
            }
            span {
              position relative
              &:before {
                display inline-block
                content ""
                width 10px
                height 10px
                border-radius 50%
                margin-right 3px
                border 1px solid #524AE7
              }
              &:last-child {
                margin-left 5px
              }
              &:first-child {
                margin-right 5px
              }
              &.active {
                &:before {
                  background-color #524AE7
                }
              }
            }
          }
        }
      }
    }
    .chatWindow.show{
      display block
    }
    .chatList.hide {
      display none
    }
  }


</style>
