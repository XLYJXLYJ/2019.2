<template>
  <div :class="{'vue-head':screen,'vue-head-big':!screen}">
    <img src="./location.png" alt="" class="location">
    <span class="title">当前位置：<span class="current">{{title}}</span></span>
    <span class="message">
      <router-link to="/user"><span class="user"></span><span class="username">{{s_name}}</span><span class="company">{{company}}</span></router-link>
      <span class="login_out" @click="logout">退出</span>
    </span>
    <div :class="{white:isWhite}"></div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    props: {
      title:{
        type:String
      }
    },
    name:"v-head",
    data(){
      return {
        company:'',
        s_name:'',
        screen:true,
        isWhite:true
      }
    },
    created:function () {
      function getCookie(objName){//获取指定名称的cookie的值
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
          var temp = arrStr[i].split("=");
          if (temp[0] == objName){
            return unescape(temp[1]);
          }
        }
        return ""
      }
      this.compan = this.company = getCookie('company')
      this.s_name = getCookie('s_name');
      if (!(this.company && this.s_name)) {
        this.$router.push({'path': '/'})
      }
    },
    mounted(){
      if(this.$route.path=='/record'){
        this.isWhite = false
      }
      if(screen.width<1500){
        this.screen = true
      }else{
        this.screen = false
      }
    },
    methods:{
      getCookie(objName){//获取指定名称的cookie的值
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
          var temp = arrStr[i].split("=");
          if (temp[0] == objName){
            return unescape(temp[1]);
          }
        }
        return ""
      },
      logout(){
        var this_=this;
        this.$ajax.delete("/acs/v1.0/service_login",).then((res) => {
          if(res.data.errmsg=="OK"||res.data.errmsg=="用户未登录"){
            this_.delCookie('s_token')
            this_.delCookie('service_id')
            this_.delCookie('service_voice')
            this_.delCookie('company');
            this_.delCookie('s_name');
            this_.delCookie('date');
            this_.delCookie('targetId');
            this_.$router.push({'path': '/'});
            RongIMClient.getInstance().logout()
          }
        })
      },
      delCookie(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=this.getCookie(name);
        if(cval!=null)
          document.cookie= name + "="+cval+";expires="+exp.toGMTString();
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .vue-head{
    position absolute
    left 132px;
    top -29px;
    width calc(100vw - 150px)
    height 79px
    padding 50px 70px 0px 20px
    box-sizing border-box
    padding-bottom: 40px
    font-size 14px
    background:rgba(255,255,255,1);
    /* border-bottom 1px solid #cac8f9*/
    .location{
      width: 16px
      height: 16px
      display: inline-block
      float left
      margin-top:2px
      margin-right:10px
      margin-left:10px
    }
    .title{
      float left
      font-family:PingFang-SC-Medium;
      font-weight:500;
      font-size:16px;
      color:rgba(69,69,69,1);
      .current{
        margin-left 5px
        /* color #524AE7*/
        font-size:16px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(43,48,62,1);
      }
    }
    .message{
      float right
      .user{
        display inline-block
        width 25px
        height 25px
        background url("../../../static/user1.png")
        background-repeat no-repeat
        float left
      }
      .username,.company{
        line-height 20px
        font-size:16px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(69,69,69,1);
      }
      .company{
        margin-left 5px
      }
      .login_out{
        margin-left 30px
        /*  color #524AE7*/
        cursor: pointer
        font-size:16px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(49,153,224,1);
      }
      a{
        text-decoration none
        color #454545
      }
    }
  }
  .vue-head-big{
    position absolute
    left 132px;
    top -29px;
    width calc(100vw - 132px)
    height 79px
    padding 50px 70px 0px 20px
    box-sizing border-box
    padding-bottom: 40px
    font-size 14px
    background:rgba(255,255,255,1);
    /* border-bottom 1px solid #cac8f9*/
    .location{
      width: 16px
      height: 16px
      display: inline-block
      float left
      margin-top:2px
      margin-right:10px
      margin-left:10px
    }
    .title{
      float left
      font-family:PingFang-SC-Medium;
      font-weight:500;
      font-size:16px;
      color:rgba(69,69,69,1);
      .current{
        margin-left 5px
        /* color #524AE7*/
        font-size:16px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(43,48,62,1);
      }
    }
    .message{
      float right
      .user{
        display inline-block
        width 25px
        height 25px
        background url("../../../static/user1.png")
        background-repeat no-repeat
        float left
      }
      .username,.company{
        line-height 20px
        font-size:16px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(69,69,69,1);
      }
      .company{
        margin-left 5px
      }
      .login_out{
        margin-left 30px
        /*  color #524AE7*/
        cursor: pointer
        font-size:16px;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(49,153,224,1);
      }
      a{
        text-decoration none
        color #454545
      }
    }
  }
  .white{
    width:40px!important;
    height:59px!important;
    background:#fff;
    position fixed!important;
    right:0px;
    top:0px;
    border-bottom 1px solid #d6d6d6;
    z-index 1000
  }
</style>
