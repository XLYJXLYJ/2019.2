<template>
  <div class="chatList" @click="switch_list">
    <span class="name" v-if="lists.extra">{{lists.extra[3]}}({{lists.extra[0]}})</span>
    <sup v-show="lists.unreadMessageCount!=0"></sup>
    <!--<span class="time">06:35</span>-->
    <span class="content" v-if="lists.content&&lists.content.indexOf(environment)==-1"
          v-text="lists.content.replace('/<br/>/g','')">{{}}</span>
    <span class="content" v-else-if="lists.content">[图片]</span>
    <span class="close" @click.stop="closeWrapper"></span>
    <!-- 引入关闭组件 -->
    <v_close v-show="closeStatus" v-on:isClose="listenClose">是否关闭?</v_close>
  </div>
</template>
<script>
  import v_close from "../close/close"

  export default {
    props: {
      closeConnection: {
        type: Boolean
      },
      id: {
        type: Number
      },
      lists: {
        type: Object
      }
    },
    mounted() {
//      this.environment="http://test.open.qb-tech.net/chat_image/"
      if (window.location.href.indexOf("test") > 0) {
        this.environment = "http://test.open.qb-tech.net/chat_image/";
      } else {
        this.environment = "http://open.qb-tech.net/chat_image/";
      }
    },
    created: function () {
    },
    name: "chatList",
    data() {
      return {
        newMessage: false,
        closeStatus: false,
        cct: this.closeConnection,
        environment: "",

      }
    },
    components: {
      v_close
    },
    methods: {
      // 关闭对话
      closeWrapper(e) {
        this.closeStatus = true;
      },
      // 对话框
      listenClose(data) { //子组件传递data值
        console.log(data)
        this.closeStatus = false;
        if (data) {//断开聊天
          this.cct = false;
          this.$emit('chat_List', false)
        }
      },
      switch_list() {
        this.$emit('s_l', true);
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .chatList {
    position relative;
    width 180px;
    height 70px;
    padding 13px 9px 10px 19px;
    box-sizing border-box;
    margin-top: 10px
    background-color transparent;
    border-bottom 1px solid rgba(255, 255, 255, 0.9)
    &:hover {
      /*background-color #e8e7f9;*/
      /*background:#d0e1ed*/
      box-shadow:0px 0px 16px 0px rgba(61,104,169,0.17);
      border-radius:5px;
    }
    &:nth-child(1){
      margin-top 15px
    }
    .name {
      color #454545;
      font-size 16px;
      font-weight 600;
      display inline-block
      width 131px
      white-space: nowrap;
      overflow hidden;
      text-overflow ellipsis;
    }

    .time {
      position absolute;
      top 16px;
      right 9px;
      font-size 14px;
      color #b8bab9;
    }

    .content {
      display block;
      font-size 14px;
      width 136px;
      margin-top 5px;
      white-space nowrap;
      overflow hidden;
      text-overflow ellipsis;
      color #989a97;
    }

    .close {
      &:hover {
        background-position-x -5.5px;
      }
      position absolute;
      width 20px;
      height 20px;
      top 41px;
      right 9px;
      background url("../../assets/close.png");
      background-repeat no-repeat;
      background-position -38px -11px;
    }

    sup {
      display inline-block;
      width 8px;
      height 8px;
      background-color #ea4e52;
      border-radius 50%
      margin-top -3px

    }
  }

</style>
