<template>
  <div class="user">
    <v_aside></v_aside>
    <v_head title="用户中心"></v_head>
    <div class="content">
     <!-- <span class="user_title"><span>用户中心</span></span>-->
      <div class="robot_settings">
        <div></div>
        <div>
          <span>客服名:</span>
          <span class="username" disabled="disabled">{{username}}</span>
        </div>
        <div>
          <span>公司:</span>
          <span  class="company" disabled="disabled">{{company}}</span>
        </div>
        <div>
          <span>身份:</span>
          <span class="identity"  disabled="disabled">{{identity}}</span>
        </div>
        <div>
          <span>手机号:</span>
          <span class="phone_number mobile"  disabled="disabled">{{mobile}}</span>
          <span class="reset" @click="reset_phone">重置登录密码</span>
        </div>
      </div>
    </div>
    <div class="alert" v-show="dialog">
      <div class="alert_div">
        <p class="reset_passwd">重置密码</p>
        <form class="myform" method="put">
          <div>
            <label>客服名：</label>
            <input type="text" name="name" class="phone" disabled="disabled" v-model="username">
          </div>
          <div>
            <label>新密码：</label>
            <input type="password" name="passwd" class="passwd" v-model="passwd" value="" datatype="*8-15" errormsg="请输入8-15位密码,支持数字以及大小写字母" nullmsg="请输入密码">
            <span class="Validform_checktip Validform_wrong">{{passwd_errmsg}}</span>
          </div>
          <div>
            <label>确认密码：</label>
            <input type="password" name="passwd2" class="passwd2" v-model="passwd2"  value="" datatype="*8-15" errormsg="请输入8-15位密码,支持数字以及大小写字母" nullmsg="请输入密码">
            <span class="Validform_checktip Validform_wrong">{{passwd2_errmsg}}</span>
          </div>
          <div>
            <label>验证码：</label>
            <input type="type" name="verify" class="verify" v-model="verify_code"  value="" datatype="*4-6" errormsg="请输入4-6位数字" nullmsg="请输入验证码">
            <span :class="verify_Class" @click="get_code" v-text="get_code_status"></span>
            <span class="Validform_checktip Validform_wrong">{{verify_code_errmsg}}</span>
          </div>
          <div>
            <span class="sure" @click="reset_submit">确认重置</span>
            <span class="cancel" @click="reset_phone">取消</span>
          </div>
        </form>
      </div>
    </div>
    <div class="tips" v-show="success"><span>{{tips}}</span></div>
  </div>
</template>
<script>
  import v_aside from "../aside/aside"
  import v_head from "../head/head"
  var timeer;
  export default {
    name:"user",
    data(){
      return {
        username: "",
        company: "",
        identity: "",
        mobile: "",
        dialog: false,
        passwd: "",
        passwd2: "",
        verify_code: "",
        passwd_errmsg: "",
        passwd2_errmsg: "",
        verify_code_errmsg: "",
        get_code_status:"获取验证码",
        verify_Class:['get','code'],
        timeer:"",
        success:false,
        tips:"",

      }
    },
    created:function () {
      this.$ajax.get('/acs/v1.0/service_message').then(res=>{
         this.username=res.data.data.s_name;
         this.company=res.data.data.company;
         this.identity=res.data.data.identity;
         this.mobile=res.data.data.mobile;
      })
    },
    mounted:function () {
//      var this_=this;
//      var timer= setInterval(function () {
//        this_.delCookie('s_token')
//        this_.delCookie('service_id')
//        this_.delCookie('company');
//        this_.delCookie('s_name');
//        this_.delCookie('date');
//        this_.delCookie('targetId');
//        this_.$router.push({'path': '/'});
//      },15000)
//      document.onkeydown=function(e){
//        timer_()
//      };
//      document.mousemove=function(e){
//        timer_()
//      };
//      document.mousedown=function(e){
//        timer_()
//      };
//      function  timer_() {
//        clearInterval(timer);
//        timer= setInterval(function () {
//        },15000)
//      }
//      function delCookie(name){
//        var exp = new Date();
//        exp.setTime(exp.getTime() - 1);
//        var cval=this.getCookie(name);
//        if(cval!=null)
//          document.cookie= name + "="+cval+";expires="+exp.toGMTString();
//      }
    },
    components:{
      v_aside,
      v_head
    },
    methods:{
      get_code(){
        var this_=this;
        if(this_.verify_Class.length==2) {
          var n = 60;
          this.$ajax.get('/acs/v1.0/send_code',{params : {'mobile' : this.mobile}}).then(res => {
            this_.verify_Class = ['get'];
            this_.get_code_status = n + "s";
            timeer = setInterval(function () {
              n--;
              if (n >= 0) {
                this_.get_code_status = n + "s";
              } else {
                this_.verify_Class = ['get', 'code'];
                this_.get_code_status = "获取验证码";
                clearInterval(timeer);
              }
            }, 1000);
          })
        }
      },
      reset_phone(){
        this.dialog=!this.dialog;
          this.passwd= "";
          this.passwd2= "";
          this.verify_code= "";
          this.passwd_errmsg= "";
          this.passwd2_errmsg= "";
          this.verify_code_errmsg= "";
          this.get_code_status="获取验证码";
          this.verify_Class=['get','code'];
          clearInterval(timeer);
      },
      reset_submit(){
        var this_=this;
        var pd=this_.passwd.trim().length;
        var pd2=this_.passwd2.trim().length;
        var vc=this_.verify_code.trim().length;
        if(pd==0){
          this_.passwd_errmsg="请输入密码"
          return false;
        }else if(pd<8||pd>15){
          this_.passwd_errmsg="请输入8-15位密码,支持数字以及大小写字母"
          return false;
        }else{
          this_.passwd_errmsg=""
        }
        if(pd2==0){
          this_.passwd2_errmsg="请输入密码"
          return false;
        }else if(pd2<8||pd2>15){
          this_.passwd2_errmsg="请输入8-15位密码,支持数字以及大小写字母"
          return false;
        }else if(pd2!=pd){
          this_.passwd2_errmsg="两次输入密码不一致"
          return false;
        }
        else{
          this_.passwd2_errmsg=""
        }
        if(vc==0){
          this_.verify_code_errmsg="请输入验证码"
          return false
        }else if(vc<4||vc>6){
          this_.verify_code_errmsg="请输入4-6位数字"
          return false;
        }else{
          this_.verify_code_errmsg=""
        }

        this_.$ajax({
          method:"post",
          url:"/acs/v1.0/reset_password",
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          },
          data:{
            'mobile':this.mobile,
            'password':this.passwd,
            'password2':this.passwd2,
            'sms_code':this.verify_code
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        }).then((res)=>{
          if(res.data.errmsg=="修改密码成功"){
            this_.reset_phone();
            this_.success=true;
            this_.tips=res.data.errmsg;
            setTimeout(
              function (){
                this_.success=false;
                this_.tips="";
            },2000)
          }else{
            this_.verify_code_errmsg=res.data.errmsg;
          }
        })
//        this_.$ajax.get('/get_code',{}).then(res=>{
//          this.dialog=false;
//        })


      }


    }
  }

</script>
<style lang="stylus"rel="stylesheet/stylus">
  .user {
    .content {
      position absolute
      left 150px
      top 60px
      background #eef3f6
      width calc(100vw - 150px)
      height calc(100vh - 80px)
      padding 20px
      box-sizing border-box
      .user_title {
        position relative
        font-size 15px
        display block
        color #454545
        &:before {
          position absolute
          content ""
          display inline-block
          height 16px
          width 3px;
         /* background-color #524AE7*/
          background:rgba(49,153,224,1);
          left -8px
          margin-top 2px
        }
      }
      .robot_settings{
        margin-top 10px
        margin-left 20px
        div{
          margin-bottom 20px
          height auto
          overflow auto
          span{
            &:first-child{
              display inline-block
              font-size 14px
              width 46px
              text-align right
            }
            &.reset{
              display inline-block
              width: 103px
              height: 30px
              text-align center
              line-height 30px
              background:rgba(49,153,224,1);
              border-radius:4px;
              font-size 14px
            /*  color #524AE7*/
              font-weight:500;
              color:rgba(255,255,255,1);
              margin-left 20px
              font-family Arial
              cursor pointer
            }
            &:nth-child(2){
              margin-left 15px
              font-size 15px
            }
          }
        }
      }
    }
    .tips{
      position absolute
      top 0
      left 0
      height 100vh
      width 100vw
      color white
      z-index 4
      span{
        display inline-block
        position relative
       /* background-color #524AE7*/
        background:rgba(49,153,224,1);
        top 50%
        left 50%
        padding 5px 10px
        border-radius 3px
      }
    }
    .alert{
      position absolute
      top 0
      left 0
      height 100vh
      width 100vw
      background-color rgba(0,0,0,.5)
      z-index 3
      .alert_div{
        position relative
        width 400px
        height 370px
        background-color white
        left 0
        right 0
        top 50%
        bottom 0
        margin auto
        transform translateY(-50%)
        border-radius 5px
        box-sizing border-box
        padding-top 20px
        .reset_passwd {
          width 100%
          text-align center
         /* color #524AE7*/
          color:rgba(49,153,224,1);
          font-size 20px
          margin-top 0
          margin-bottom 20px
        }
        form{
          div {
            width 80%
            height 55px
            margin auto
            &:first-child {
              height 35px
            }
            label {
              font-size 14px
              width 70px
              display inline-block
              text-align right
              color #454545
            }
            input {
              height 30px
              width 200px
              border-radius 5px
              border 1px solid #d6d6d6
              &.verify {
                width 130px
              }
            }
            .get {
              display inline-block
              padding 0 10px
              color white
            /*  background-color #524AE7*/
              background:rgba(49,153,224,1);
              border-radius 5px
              height 34px
              line-height 34px
              text-align center
              margin-left 5px
              font-size 14px
              cursor: pointer
            }
            input[disabled] {
              border none
              background-color rgba(0, 0, 0, 0)
            }
            .sure, .cancel {
              display inline-block
              width 90px
              color white
            /*  background-color #524AE7*/
              background:rgba(49,153,224,1);
              border-radius 5px
              height 34px
              line-height 34px
              text-align center
              margin-top 20px
              cursor pointer
              font-size 14px
            }
            .sure {
              float left
              margin-left 30px
            }
            .cancel {
              float: right
              margin-right 30px
            }
            .Validform_checktip.Validform_wrong{
              font-size: 12px;
              color:#e92c12 ;
              display: block;
              margin-left 65px
            }
          }
        }
      }
    }
  }
</style>
