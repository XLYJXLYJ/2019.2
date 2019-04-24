<template>
  <div class="vue-aside">
    <div class="logo">
      <!--<img src="img/logo.png" />-->
      <div>
        <div class="company">QBTech</div>
        <!--  <p>科技连接保险未来</p>-->
      </div>
    </div>
    <div class="list">
      <ul>
        <li class="li_father">
          <router-link to="/chat">
            <span class="icon icon1"></span>
            <span @click="setInitVoice()">客服工作台</span>
            <!--<span class="left active"></span>-->
          </router-link>
        </li>
        <li class="li_father">
          <router-link to="/user">
            <span class="icon icon2"></span>
            <span>用户中心</span>
            <!--<span class="left active"></span>-->
          </router-link>
        </li>
        <li class="li_father">
          <router-link to="/record">
            <span class="icon icon3"></span>
            <span>历史对话</span>
            <!--<span class="left active"></span>-->
          </router-link>
        </li>
        <router-view></router-view>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'vue-aside',
    mounted: function () {
      if(screen.width<1500){
        document.getElementsByClassName("vue-aside")[0].setAttribute('style','height:104.3%')
      }
    },
    methods:{
      setInitVoice(){
        this.$store.commit('setInitVoice',1)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  body {
    margin 0
  }
  ul {
    padding-left 0
  }
  ul li {
    list-style-type none
  }
  a {
    text-decoration none
  }
  .vue-aside {
    position absolute;
    top 0;
    left 0;
    width 132px
    /* height 100vh*/
    height:100%
    background: rgba(43, 48, 62, 1);
    .logo {
      width: 100%;
      height: 60px;
      background: rgba(34, 38, 50, 1);
      /* background-color: #524AE7;*/
      vertical-align: middle;
      text-align: center;
      margin-bottom: 20px;
      color: white;
      .company {
        font-size: 20px;
        font-weight: 600;
        /* margin-top: 18px*/
        padding: 18px 0px 5px 0px;
        /* border-bottom: 2px solid white;*/
        ~ p {
          margin-top: 5px;
          margin-bottom: 0px;
          font-size: 12px;
        }
      }
    }
    .list {
      .li_father {
        line-height 40px;
        padding 0 10px;
        margin-bottom 10px
        a {
          color: rgba(135, 144, 160, 1)
          margin-left 0
          /*font-size 0*/
          .icon {
            background url(sprite1.png);
            width 20px;
            height 26px;
            display inline-block;
            background-position-x -96px;
            &.icon1 {
              background-position-y -12px;
            }
            &.icon2 {
              background-position-y -46px;
            }
            &.icon3 {
              background-position-y -77px;
            }
          }
          span {
            font-size 14px
          }
          &.active{
            .icon{
              background-position-x -36px;
            }
            span{
              color white
            }
          }
          &:hover{
            .icon{
              /* background-position-x -93px;*/
              background-position-x -36px;
            }
            span{
              color:rgba(255,255,255,1);
            }
          }
        }
      }
    }
  }
</style>
