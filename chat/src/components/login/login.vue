<template>
  <div class="login">
    <div class="login_logo">
      <div>
        <div>企保科技</div>
        <p>科技连接保险未来</p>
      </div>
    </div>
    <div class="login_form">
      <form class="myform">
        <p>用户登录</p>
        <div>
          <input  type="text" placeholder="请输入用户名" v-model="phone"  name="mobile" class="phone"/>
          <span class="Validform_checktip  Validform_wrong">{{phone_errmsg}}</span>
        </div>
        <div>
          <input type="password" placeholder="请输入密码" v-model="password"  class="passwd"   name="password"  />
          <span class="Validform_checktip  Validform_wrong">{{password_errmsg}}</span>
        </div>
        <div>
          <span class="login_btn" @click="user_login()">登录</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        phone: '',
        password: '',
        phone_errmsg: '',
        password_errmsg: '',
        date:'',
        count:0,
      }
    },
    methods: {
      setCookie(c_name, value, expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
      },
      user_login(){
        var this_=this;
        if(this_.count==0){
          this_.date=(new Date()).valueOf();
          if(this_.phone.trim().length<=0){
            this_.phone_errmsg="请输入用户名";
            return false;
          }else if(this_.phone.trim().length<2||this_.phone.trim().length>16) {
            this_.phone_errmsg="格式错误";
            return false;
          }else{
            this_.phone_errmsg="";
          }
          if(this_.password.trim().length<=0){
            this_.password_errmsg="请输入密码";
            return false;
          }else if(this_.password.trim().length<2||this_.password.trim().length>16) {
            this_.password_errmsg="格式错误";
            return false;
          }else{
            this_.password_errmsg="";
          }
          this_.$ajax({
            method:"post",
            url:"/acs/v1.0/service_login",
            headers:{
              'Content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              'mobile':this_.phone,
              'password':this_.password,
              'timestamp':this_.date
            },
            transformRequest: [function (data) {
              this_.count=1;
              this_.setCookie('date',this_.date,1)
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          }).then((res)=>{
            if(res.data.msg=="登录成功"){
              this_.setCookie('company',res.data.data.company,1)
              this_.setCookie('s_name',res.data.data.s_name,1);
              this_.setCookie('s_token',res.data.data.s_token,1)
              this_.setCookie('service_id',res.data.data.service_id,1)
              var state=false;
              if(res.data.state=="在线"){
                state=true;
              }
              this_.$router.push({'path':'/chat','params':{'state':state}});
            }else if(res.data.msg=="重复登录"){
              this_.count=0
              this_.password_errmsg=res.data.data;
            }else{
              this_.count=0
              this_.password_errmsg=res.data.errmsg;
            }
          })
        }
//        this_.$router.push({'path':'/chat','params':{'state':state}});
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  body,html {
    width 100%
    height 100%
    min-width 600px
    .login {
      position relative
      width 100vw
      height 100vh
      background url(background.jpg) no-repeat
      background-size cover
      .login_logo {
        position absolute
        left 70px
        top 30px
        text-align center
        color white
        div {
          > div {
            width 140px
            font-size 24px
            font-weight 600
            margin 0 20px
            padding 13px 0px 5px 0px
            border-bottom 2px solid white
            letter-spacing 3px
          }
          > p {
            margin-top 5px
            margin-bottom 0px
            font-size 14px
            letter-spacing 1.5px
          }
        }
      }
      .login_form {
        position absolute
        width 360px
        height 400px
        background-color #ecf0f9
        top 50%
        transform translateY(-50%)
        left 60%
        border-radius 10px
        @media screen and (max-width: 1300px) {
          width 300px
          height 300px
        }
        form {
          p {
            font-size 25px
            text-align center
            color #454545
            font-weight 500
            @media screen and (max-width: 1300px) {
              font-size: 20px;
              font-weight: 400;
            }
          }
          div {
            width 80%
            margin auto
            height 90px
            @media screen and (max-width: 1300px) {
              height: 60px;
            }
            &:last-child{
              height 35px
            }
            input{
              width: 100%;
              height: 50px;
              border-radius:5px ;
              border: 1px solid #aaadbc;
              background-color: rgba(0,0,0,0);
              font-size: 18px;
              padding-left: 12px;
              box-sizing: border-box;
              @media screen and (max-width: 1300px) {
                height: 34px;
                font-size: 14px;
                border: 1px solid #aaadbc;
              }
            }
            .Validform_checktip.Validform_wrong{
              font-size  12px;
              color #e92c12 ;
              display  block;
            }
            .login_btn{
              width 100%
              height 50px
              background-color #524AE7
              color white
              display inline-block
              line-height 50px
              border-radius 5px
              margin auto
              text-align center
              margin-top 30px
              font-size 20px
              @media screen and (max-width: 1300px) {
                height: 34px;
                line-height: 34px;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
</style>
