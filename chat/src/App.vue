<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted:function () {
    if(screen.width<1500){
       document.getElementsByTagName("body")[0].setAttribute('style','height:98.6%')
       document.getElementsByTagName("html")[0].setAttribute('style','height:98.6%')
       document.getElementById("app").setAttribute('style','min-height:98.6%;height:98.6%')
    }
  },
    computed:{
      newMessage(){
        return this.$store.state.no_voice
      }
    },
    watch:{
      newMessage:function(){
        let this_ = this
        this_.aplayAudio()
        Notification.requestPermission(function (perm) {  
          if (perm == "granted") {  
              var notification = new Notification(this_.$store.state.customer, {  
                  icon: 'http://open.qb-tech.net/img/aimi-big.png',  
                  body: this_.$store.state.sentence
              });  
              // setTimeout(function(){
              //     notification.close()
              // },3000)
          }  
        })
      }
    },
  methods:{
      aplayAudio () {
        const audio = document.getElementById('audio')
        audio.play()
      }
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
.el-notification{
  width 300px!important;
}
</style>
