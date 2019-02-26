<template>
    <div class="head">
        <div class="head-content">
            <div class="logo">
                <p class="name">企保科技</p>
                <p class="slogan">科技连接保险未来</p>
            </div>
            <ul class="navigation">
                <router-link to="/Qt"><li>首页</li></router-link>
                <router-link to="/Task"><li>我的任务</li></router-link>
            </ul>
            <ul class="user">
                <li>用户:{{cookie[0]}} {{cookie[1]}}</li>
                <li @click="quit()">退出</li>
            </ul>
        </div>
    </div>
</template>
<script>
 
  export default {
    data() {
      return {
        qtTrasversion:'',
        cancelTask:'',
        cookie:''
      }
    },
    mounted(){
        var user = this.getCookie('user')
        this.cookie = user.split('%26%26');
        // console.log(user)
        // console.log(this.cookie)
    },
    methods:{
        quit(){
        this.axios.delete('/merchant/v1.0/session')
            .then(response => {  
                if(response.errmsg=="OK"){
                    delCookie('user');
                    window.location.href="/login.html";
                }
            })
        }
    }
  }
</script>
<style lang="less" scoped>
 .head{
     width: 100%;
     height: 80px;
     background: #8180f8;
     .head-content{
         width: 1200px;
         height: 80px;
         margin: 0 auto;
         background: #8180f8;
        .logo{
            width: 150px;
            height: 80px;
            background-color: #8180f8;
            text-align: center;
            color: white;
            .name{
                font-size: 20px;
                font-weight: 600;
                margin: 0 20px;
                padding: 16px 0px 5px 0px;
                border-bottom: 2px solid white;
            }
            .slogan{
                margin-top: 8px;
                margin-bottom: 0px;
                font-size: 12px;
            }
        }
        .navigation{
            position: relative;
            width: 400px;
            height: 80px;
            left: 150px;
            top: -81px;
            li{
                float: left;
                width: 160px;
                height: 50px;
                text-align: center;
                padding-top: 34px;
                font-size: 18px;
                font-family:'SimSun';
                cursor: pointer;
            }
            li:hover{
                background: #524AE7;
                color: #fff;
            }
        }
        .user{
            position: relative;
            width: 450px;
            height: 80px;
            left: 750px;
            top: -161px;
            li{
                float: left;
                width: auto;
                height: 50px;
                text-align: center;
                padding-top: 34px;
                padding-left:20px;
                padding-right:20px;
                font-size: 18px;
                cursor: pointer;
                font-family:'SimSun';
                font-weight:Medium;
            }
            li:hover{
                background: #524AE7;
                color: #fff;
            }
        }
     }
     a{
         color: #333;
     }
 }   
</style>
