<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted:function () {
//    var this_=this;
//    var timer= setInterval(function () {
//      this_.delCookie('s_token')
//      this_.delCookie('service_id')
//      this_.delCookie('company');
//      this_.delCookie('s_name');
//      this_.delCookie('date');
//      this_.delCookie('targetId');
//      this_.$router.push({'path': '/'});
//      this_.$router.push({'path': '/'});
//    },15000)
//    document.onkeydown=function(e){
//      timer_()
//    };
//    document.mousemove=function(e){
//      timer_()
//    };
//    document.mousedown=function(e){
//      timer_()
//    };
//    function  timer_() {
//      clearInterval(timer);
//      timer= setInterval(function () {
//      },15000)
//    }
//    function delCookie(name){
//      var exp = new Date();
//      exp.setTime(exp.getTime() - 1);
//      var cval=this.getCookie(name);
//      if(cval!=null)
//        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
//    }
  },
  methods:{

  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
body,html,#app{
  min-width 600px
  width 100%
  height 100%
}
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  /*height: auto;*/
  min-height: 100%;

}
.footer{
  button{
    border none
    background-color transparent
    cursor pointer
  }
  #pageSelect {
    display inline-block
    li {
      display inline-block
      width 25px
      height 25px
      text-align center
      border-radius 50%
      line-height 25px
    }
  }

}
.el-collapse-item__header{
  padding-left:12px;
  font-size: 15px!important;
  color #000;
  height 30px!important;
  border-radius:4px 4px 0px 0px;
  box-shadow: 0px 0px 8px 0px rgba(61, 104, 169, 0.17);
}
.el-collapse-item__header:hover{
  background:#d0e1ed;
}
.el-collapse-item__content{
  padding-bottom 0px!important;
  padding-top 0px!important;
}
.el-collapse-item__wrap{
  border-radius:0px 0px 4px 4px;
  margin-bottom:4px;
  padding-bottom:-10px!important;
}
</style>
