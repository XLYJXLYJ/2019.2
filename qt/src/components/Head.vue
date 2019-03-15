<template>
    <div class="head">
        <div class="head-content">
            <div class="logo">
                <p class="name">企保科技</p>
                <p class="slogan">科技连接保险未来</p>
            </div>
            <ul class="navigation">
                <router-link to="/Qt"><li>首页</li></router-link>
                <router-link to="/Task"><li>创建任务</li></router-link>
            </ul>
            <ul class="user">
                <li><img src="../assets/user.png"> {{cookie[0]}} {{this.cookie[1]}}</li>
                <!-- <li @click="quit()">退出</li> -->
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
        cookie:'',
        company:''
      }
    },
    mounted(){
        let url = window.location.href;
        document.title = url;
        var user = this.getCookie('user')
        this.cookie = user.split('&&');
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
     height: 60px;
     background: #8180f8;
     .head-content{
         width: 1200px;
         height: 80px;
         margin: 0 auto;
         background: #8180f8;
        .logo{
            width: 150px;
            height: 70px;
            background-color: #8180f8;
            text-align: center;
            color: white;
            .name{
                font-size: 20px;
                font-weight: 600;
                margin: 0 20px;
                padding: 6px 0px 5px 0px;
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
                color: #fff;
            }
            li:hover{
                background: #524AE7;
                color: #fff;
            }
        }
        .user{
            position: relative;
            width: 350px;
            height: 80px;
            left: 850px;
            top: -161px;
            li{
                float: right;
                width: auto;
                height: 50px;
                text-align: center;
                padding-top: 34px;
                padding-left:20px;
                padding-right:20px;
                font-size: 18px;
                font-family:'SimSun';
                font-weight:Medium;
                color: #fff;
            }
        }
     }
     a{
         color: #333;
     }
 }   
</style>
