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
  min-width 1250px
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
</style>
