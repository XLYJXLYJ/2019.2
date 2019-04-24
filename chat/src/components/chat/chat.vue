<template>
  <div :class="{'chat':screen01,'chat-small':screen02,'chat1920':screen03}" @onkeydown="onkeydown"  @mousemove="mousemove"  @mousedown="mousedown">
    <v_aside v-show="lessen"></v_aside>
    <v_head v-show="lessen" title="客服工作台"></v_head>
    <div class="content" id="content">
      <div class="chat-wrapper">
        <div class="chat_content">
          <!--<span class="chat_title">-->
          <!--<span>客服工作台</span>-->
          <!--</span>-->
          <!--<img src="../../assets/aimi.png">-->
          <span class="status">
            <label>{{s_name}}</label>
            <br/>
            <!-- <el-switch
              v-model="onlineValue"
              active-text="在线"
              inactive-text="离线">
            </el-switch> -->
            <i class="el-icon-circle-check icon-position" style="color:#09f175" v-show="onlineValue=='在线'"></i>
            <i class="el-icon-remove icon-position" v-show="onlineValue!=='在线'"></i>
            <select v-model="onlineValue" placeholder="请选择" @change="setActive($event)">
              <option>
                <span value="在线">在线</span>
              </option>
              <option>
                <span value="下线">离线</span>
              </option>
            </select>

            <!-- <span :class="{'active':checkActive}"  @click="setActive($event)" class="online">在线</span>
            <span :class="{'active':!checkActive}"  @click="setActive($event)" class="offline">下线</span> -->
          </span>
        </div>
        <chatList  :class="{'active':targetId==cl.targetId}"  v-for="(cl,index) in lists"  :id="index" :lists="lists[index]"  :key="index"   v-on:chat_List="remove(index)" v-on:s_l="addClass({id:cl.targetId,index:index})"></chatList>
      </div>
      <chatWindow :showIndex="showIndex" v-for="(list,index) in lists"  :targetIds="targetIds[index]" :index="index"  :gallery="gallery"  v-on:listenStatus="remove(index)" v-on:updateRecord="updateRecord"  :class="{'show':targetIds[index].targetId==targetId}" :key="index"></chatWindow>
      <answer v-for="(l,index) in lists" :targetIds="targetIds[index]"  :key="targetIds[index].targetId" :index="index" :class="{'show':targetIds[index].targetId==targetId}"></answer>
    </div>
    <v_close v-show="closeStatus" v-on:isClose="listenClose" >是否{{state}}?</v_close>
    <div class="z_index" v-show="logout">
      <div class="prompt">
        <div class="main">您的账号在另一地点登录，您已被迫下线</div>
        <span class="login_again" @click="not_line">重新登录</span>
        <span class="sure" @click="not_line">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
  import Bus from '../../bus.js';
  import v_aside from "../aside/aside"
  import v_head from "../head/head"
  import chatList from "../chatList/chatList"
  import chatWindow from "../chatWindow/chatWindow"
  import v_close from "../close/close"
  import answer from "../answer/answer"
  import {IndexedDB} from "../../store"
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  import { setInterval } from 'timers';
  export default {
    name:'chat',
    data(){
      return {
        date:"",
        checkActive:"",
        lists:[],
        extra:[],
        targetIds:[],
        targetId:"",
        temp:"",
        token:"",
        showIndex:0,
        records:[],
        temp_records:[],
        history:false,
        contents:[],
        listHistory:[],
        s_name:"",
        closeStatus:false,
        state:"",
        remove_Conversation:false,
        message_targetId:"",
        listArray:[],
        option :{
          name: 'answers',
          version: 1,
          storeName: 'q_a'
        },
        db:"",
        logout:false,
        timer:"",
        lessen:true,
        environment:"",
        gallery:"",
        arryAnswer:[],
        dialogId_ :'',
        process_id_:'',
        robot_answer_ :'',
        robot_uu_id_ :'',
        sentTime_:'',
        screen01:false,
        screen02:false,
        screen03:true,
        screen04:false,
        onlineValue:'',
        unreadMessageCountTotal:0,
        isShine:false,
        initVoice:''
      }
    },
    // beforeRouteEnter (to, from, next) {
    //   console.log(to)
    //   console.log(from)
    //   console.log(from.path)
    //   let this_ = this
    //   console.log(this)
    //   console.log(this_)
    //   // if(from.path=='/login'||from.path=='/user'||from.path=='/record'||from.path=='/'){
    //   //   // this_.$store.state.no_voice = 1
    //   //   // this_.$store.commit('setVoice',1)
    //   // }
    //   // next(vm =>{
    //   //     console.log( vm.$store.commit('setVoice',1) )
    //   //     vm.$store.commit('setVoice',1)
    //   // })
    // },
    destroyed() {
      this.state = "下线"
    },
    created:function () {
      this.initVoice = 0
      this.db=new IndexedDB(this.option);
      this.db.open();
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
//      this.$route.params.state=this.checkActive
      var this_=this;
      this.$ajax.get('/acs/v1.0/service_message').then(res=>{
        if(res.data.status=="200"){
          this.checkActive=res.data.data.state=="在线" ? true : false
          if(res.data.data.state=="在线"){
            this_.onlineValue='在线'
          }else{
            this_.onlineValue='离线'
          }
        }else if(res.data.msg=="用户未登录"){
          this_.$router.push({'path': '/'});
        }
      })
//      this_.environment="http://test.open.qb-tech.net/chat_image/"
      if(window.location.href.indexOf("test") > 0 || window.location.href.indexOf("127.0.0.1") > 0) {
        this_.environment= "http://test.open.qb-tech.net/chat_image/";
        this.appkey = "8w7jv4qb829cy";//82hegw5u8ytdx正式  8w7jv4qb829cy测试
      }else{
        this_.environment= "http://open.qb-tech.net/chat_image/";
        this.appkey = "82hegw5u8ytdx";//82hegw5u8ytdx正式  8w7jv4qb829cy测试
      }
//      setTimeout(function () {
//        this_.$ajax.get('/acs/v1.0/service_message').then(res=>{})
//      },4000)
      RongIMLib.RongIMClient.init(this.appkey);
      this.token = getCookie('s_token');
      this.s_name = getCookie('s_name');
      // 连接状态监听器
      RongIMLib.RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
          switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
              /*console.log('链接成功');*/
              this_.date=(new Date()).valueOf();
            case RongIMLib.ConnectionStatus.CONNECTING:
              /* console.log('正在链接');*/
              break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
              /* console.log('断开连接');*/
              break;
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
              /* console.log('其他设备登录');*/
              break;
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
              /*console.log('域名不正确');*/
              break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              /* console.log('网络不可用');*/
              break;
          }
        }
      });
      // 消息监听器
      RongIMLib.RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
          // 判断消息类型
          var flag=true;
          switch (message.messageType) {
            case RongIMClient.MessageType.TextMessage:
              var  date=getCookie('date');
              if(date<message.sentTime&&message.targetId=="systemcustomerrepeatlogin"&&message.content.content=="592b71f0-b3f8-4f64-bd45-40b35c0191af"&&message.content.extra!=date){
                this_.$ajax.put("/acs/v1.0/service_login",).then((res) => {
                  this_.logout=true;
                  /* console.log(res.data)*/
                  if(res.data.errmsg=="OK"){
                    this_.delCookie('s_token')
                    this_.delCookie('service_id')
                    this_.delCookie('company');
                    this_.delCookie('s_name');
                    this_.delCookie('date')
                    this_.delCookie('targetId');
                    return false;
                  }
                })
              }
              if(this_.targetIds){
                for(let i=0;i<this_.targetIds.length;i++) {
                  if (this_.targetIds[i].targetId == message.targetId) {
                    if (message.content.content != '592b71f0-b3f8-4f64-bd45-40b35c0191af') {
                      var html = message.content.content;
                      if(html.indexOf(this_.environment)==0){
                        html="<div><img src='"+html+"'></div>";
                      }
                      var date = new Date(message.sentTime);
                      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                      var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                      var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                      this_.targetIds[i].content.push({
                        type: 1,
                        content: html,
                        sentTime: hour + ":" + minute + ":" + second
                      })
                      this_.getAnswer(html, message.targetId, message.content.extra[4], i, message.sentTime,message.content.extra[3]).then(res => {
                      })
                    } else {
                      if(this_.lists.length<=1){
                        document.getElementsByClassName('content')[0].className ="content";
                        this_.lessen=true;
                      }
                      this_.message_targetId = message.targetId;
                      this_.removeConversation(message.targetId)
                      this_.db.deleteDataByKey(message.targetId);
                      break;
                    }
                  }
                }
              }
//              $("ul").append("<li>" + message.senderUserId+':'+message.content.content+ "</li>");
              break;
            case RongIMClient.MessageType.VoiceMessage:
              // message.content.content                        // 对声音进行预加载为 AMR 格式的 base64 码
              break;
            case RongIMClient.MessageType.ImageMessage:
              // message.content.content => 图片缩略图 base64。
              // message.content.imageUri => 原图 URL。
              break;
            case RongIMClient.MessageType.DiscussionNotificationMessage:
              // message.content.extension => 讨论组中的人员。
              break;
            case RongIMClient.MessageType.LocationMessage:
              // message.content.latiude => 纬度。
              // message.content.longitude => 经度。
              // message.content.content => 位置图片 base64。
              break;
            case RongIMClient.MessageType.RichContentMessage:
              // message.content.content => 文本消息内容。
              // message.content.imageUri => 图片 base64。
              // message.content.url => 原图 URL。
              break;
            case RongIMClient.MessageType.InformationNotificationMessage:
              // do something...
              break;
            case RongIMClient.MessageType.ContactNotificationMessage:
              // do something...
              break;
            case RongIMClient.MessageType.ProfileNotificationMessage:
              // do something...
              break;
            case RongIMClient.MessageType.CommandNotificationMessage:
              // do something...
              break;
            case RongIMClient.MessageType.CommandMessage:
              // do something...
              break;
            case RongIMClient.MessageType.UnknownMessage:
              // do something...
              break;
            default:
            // do something...
          }
        }
      });
      var timer;
      RongIMLib.RongIMClient.connect(this.token, {
        onSuccess: function (userId) {
          /*console.log("Connect successfully." + userId);*/
          setInterval( sessionTextMessage, 800 );
        },
        onTokenIncorrect: function () {
          /* console.log('token无效');*/
        },
        onError: function (errorCode) {
          var info = '';
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时';
              break;
            case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
              info = '不可接受的协议版本';
              break;
            case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
              info = 'appkey不正确';
              break;
            case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
              info = '服务器不可用';
              break;
          }
          /*   console.log(errorCode);*/
        }
      });
      var callback = {
        onSuccess: function (userId) {
          /*  console.log("Reconnect successfully." + userId);*/
        },
        onTokenIncorrect: function () {
          /*  console.log('token无效');*/
        },
        onError: function (errorCode) {
          /* console.log(errorcode);*/
        }
      };
      var config = {
        // 默认 false, true 启用自动重连，启用则为必选参数
        auto: true,
        // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
        url: 'http://cdn.ronghub.com/RongIMLib-2.3.3.min.js',
        // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
        rate: [100, 1000, 3000, 6000, 10000]
      };
      RongIMLib.RongIMClient.reconnect(this.token, callback, config);
      // $("#submit_id").click(sendTextMessage());
      function historyTextMessage(m,targetIds,customer_token) {
        this_.$ajax.get("/acs/v1.0/current_session",{params : {'targetId' : targetIds,'customer_token':customer_token}}).then((res) => {
          if(res.data.errmsg=='OK'){
            var data=res.data.data.log_dict_list
            for(var i=0;i<data.length;i++){
              if(data[i].content.indexOf(this_.environment)==0){
                data[i].content = "<div><img src='" + data[i].content + "' ></div>"
              }
            }
            this_.targetIds[m].history=data;
            this_.$set(this_.targetIds[m],'history',data);
            this_.$ajax.get("/acs/v1.0/service_online_status",{params : {'targetId' :targetIds,'p':1,'customer_token':customer_token}}).then((res) => {
              if (res.data.errmsg == 'OK') {
                this_.targetIds[m].total_page=res.data.data.total_page;
                this_.$set(this_.targetIds[m],'total_page',res.data.data.total_page);
                this_.db.getDataByKey(targetIds,targetIds.length-1).then(data=> {
                  if(data.value.length==1){
                    // this_.aplayAudio()
                  }
                  if (data.value.length>0) {
                    this_.targetIds[m].qa_record =data.value;
                    this_.$set(this_.targetIds[m], 'qa_record', data.value)
                  }
                })
              }
            })
            this_.listArray=[];
          }
        })
      }
      var listens=false;
      function sessionTextMessage() {
        RongIMLib.RongIMClient.getInstance().getConversationList({
          onSuccess: function (list) {
            //  console.log(list);
            var temp =[];
            var temp_target_id =[];
            var temp_content=[];
            this_.unreadMessageCountTotal = 0
            for (let i=0;i<list.length;i++){
              if(!(list[i].latestMessage.content.content=="592b71f0-b3f8-4f64-bd45-40b35c0191af"||list[i].latestMessage.content.content=="关闭客户会话,RongIMClient.getInstance().logout()")) {
                var obj = new Object();
                var content_wrap = new Object();
                obj.content = list[i].latestMessage.content.content;
                var html = '<div>\n' +
                  '        <div class="div_left">\n' +
                  '          <span class="avatar"></span>\n' +
                  '          <span class="box">' + list[i].latestMessage.content.content + '</span>\n' +
                  '        </div>\n' +
                  '      </div>'
                temp_content.push(html);
                obj.extra = list[i].latestMessage.content.extra;
                obj.targetId = list[i].targetId;
                obj.unreadMessageCount = list[i].unreadMessageCount
                if (this_.targetIds.length > 0) {
                  var array = [];
                  this_.targetIds.forEach(function (v) {
                    array.push(v.targetId);
                  })
                  if (array.indexOf(list[i].targetId) == -1) {
                    content_wrap.targetId = list[i].targetId;
                    content_wrap.h5_record = list[i].latestMessage.content.extra;
                    var type=list[i].latestMessage.messageDirection == 2 ? 1:2
                    var date=new Date(list[i].latestMessage.sentTime);
                    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                    if( list[i].latestMessage.content.content.indexOf(this_.environment)==0){
                      list[i].latestMessage.content.content = "<div><img src='" + list[i].latestMessage.content.content + "'></div>"
                    }
                    content_wrap.content = [{type: type, content: list[i].latestMessage.content.content,sentTime:hour+":"+minute+":"+second}];
                    content_wrap.id = i;
                    content_wrap.history="";
                    content_wrap.answers=[];
                    content_wrap.qa_record=[];
                    content_wrap.more=[];
                    content_wrap.total_page=0;
                    historyTextMessage(this_.targetIds.length,content_wrap.targetId,content_wrap.h5_record[5]);
                    this_.targetIds.push(content_wrap);
                    if(list[i].latestMessage.messageDirection==2) {
                      if(this_.$store.state.initVoice==1){
                      }else{
                        // this_.$store.commit('setVoice',numberRandom)
                        // // this_.$store.commit('setInitVoice',0)
                        // //显示桌面通知
                        // this_.$store.commit('setCustomer',obj.extra[3])
                        // this_.$store.commit('setSentence',obj.content)
                        let numberRandom = Math.random()
                        let obj1 = {
                          no_voice:numberRandom,
                          sentence:obj.content,
                          customer:obj.extra[3]
                        }
                        this_.$store.commit('triSentence',obj1)
                        // this_.store.state.customer =
                        // this_.store.state.sentence =
                      }
                      this_.getAnswer(list[i].latestMessage.content.content, list[i].targetId, content_wrap.h5_record[4], this_.targetIds.length - 1, list[i].sentTime,'Guest').then(res => {
                      })
                    }else{
                      this_.db.getDataByKey(list[i].targetId,this_.targetIds.length-1).then(data=> {
                        if (data&&data.value) {
                          var array=[];
                          var date = this_.getCookie('date');
                          for(var j=0;j<data.value.length;j++) {
                            if(data.value[j].sentTime>date){
                              array.push(data.value[j])
                            }
                          }
                          this_.targetIds[data.length].qa_record =array;
                          this_.$set(this_.targetIds[data.length], 'qa_record', array)
                        }
                      })
                    }
                  }
                } else {
                  content_wrap.targetId = list[i].targetId;
                  content_wrap.h5_record = list[i].latestMessage.content.extra ? list[i].latestMessage.content.extra : [];
                  var type=list[i].latestMessage.messageDirection == 2 ? 1:2
                  var date=new Date(list[i].latestMessage.sentTime);
                  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                  var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                  var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                  if( list[i].latestMessage.content.content.indexOf(this_.environment)==0){
                    list[i].latestMessage.content.content = "<div><img src='" + list[i].latestMessage.content.content + "'></div>"
                  }
                  content_wrap.content = [{type: type, content: list[i].latestMessage.content.content,sentTime:hour+":"+minute+":"+second}];
                  content_wrap.answers=[];
                  content_wrap.qa_record=[];
                  content_wrap.id = i;
                  content_wrap.history="";
                  content_wrap.more=[];
                  content_wrap.total_page=0;
                  historyTextMessage(0,content_wrap.targetId,content_wrap.h5_record[5]);
                  this_.targetIds.push(content_wrap);
                  if(list[i].latestMessage.messageDirection==2) {
                    this_.getAnswer(list[i].latestMessage.content.content, list[i].targetId, content_wrap.h5_record[4], this_.targetIds.length - 1, list[i].sentTime,'Guest').then(res => {
                    })
                  }else{
                    this_.db.getDataByKey(list[i].targetId,this_.targetIds.length-1).then(data=> {
                      if (data) {
                        var array=[];
                        var date = this_.getCookie('date');
                        for(var j=0;j<data.value.length;j++) {
                          if(data.value[j].sentTime>date){
                            array.push(data.value[j])
                          }
                        }
                        this_.targetIds[data.length].qa_record =array;
                        this_.$set(this_.targetIds[data.length], 'qa_record', array)
                      }
                    })
                  }
                }
                temp_target_id.push(content_wrap);
                temp.push(obj)
              }
            }
            // console.log(temp)
            this_.lists=temp;
            if(this_.getCookie('targetId').length>0){
              for(var n=0;n<this_.targetIds.length;n++){
                if(this_.targetIds[n].targetId==this_.getCookie('targetId')){
                  this_.targetId=this_.getCookie('targetId');
                  break;
                }
              }
              if(this_.targetId.length==0&&this_.lists.length>0){
                this_.targetId = this_.lists[0].targetId;
              }
            }else if(this_.targetId.length==0&&this_.lists.length>0){
              this_.targetId = this_.lists[0].targetId;
            }
          },
          onError: function (error) {
            // do something...
          }
        }, null);
      }
      function deleateconnect() {
        RongIMClient.getInstance().logout()
      }
    },
    mounted:function() {
      if(screen.width>1500){
        this.screen = true
      }else{
        this.screen = false
      }
      var this_ = this
      setInterval(function () {
        this_.clearUnreadCount(this_.targetId)
      }, 3000)
      Bus.$on('more', function (msg) {
        for (var i = msg.data.length - 1; i >= 0; i--) {
          this_.targetIds[msg.id].more.unshift(msg.data[i]);
        }
      })
      Bus.$on('lessen_window',function () {
        this_.lessen=false;
        this_.screen = true;
        if(document.getElementsByClassName('content')[0].className.indexOf('active')==-1){
          document.getElementsByClassName('content')[0].className +=" active";
        }
      })
      Bus.$on('magnify_window',function () {
        this_.lessen=true;
        if(screen.width<1500){
          this_.screen = false
        }
        if(document.getElementsByClassName('content')[0].className.indexOf('active')!=-1){
          document.getElementsByClassName('content')[0].className ="content";
        }
      })
      // this_.timer = setInterval(function () {
      //     this_.$ajax.put("/acs/v1.0/service_login",).then((res) => {
      //       console.log('22222')
      //       this_.delCookie('s_token')
      //       this_.delCookie('service_id')
      //       this_.delCookie('company');
      //       this_.delCookie('s_name');
      //       this_.delCookie('date');
      //       this_.delCookie('targetId');
      //       clearInterval(this_.timer);
      //       RongIMClient.getInstance().logout()
      //       this_.$router.push({'path': '/'});
      //     })
      // }, 7200000)
      // this.gallery = new Viewer(document.getElementsByClassName('chat')[0],{
      //   navbar:false,
      //   toolbar:false,
      //   title:false
      // });
    },
    computer:{
    },
    watch:{
      targetIds: {
        handler: function (newVal, oldVal) {
          /*  console.log('newVal', newVal)
            console.log('oldVal', oldVal)*/
        },
        immediate:true,
        deep: true,
      },
      targetId:function(val,oldval){
        this.setCookie('targetId',val,1);
      },
      remove_Conversation:function(val,oldval) {
        if(this.remove_Conversation){
          this.remove_Conversation=false;
          this.removeConversation(this.message_targetId)
        }
      },
      // $route (to, from) {
      //     // 执行ajax请求，但只希望在进入时请求，离开时不希望进行请求。
      //     console.log(to)
      //     console.log(from)
      // }
    },
    methods:{
      delCookie(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=this.getCookie(name);
        if(cval!=null)
          document.cookie= name + "="+cval+";expires="+exp.toGMTString();
      },
      onkeydown(){
        // this.timer_();
      },
      mousemove(){
        // this.timer_();
      },
      mousedown(){
        // this.timer_();
      },
      timer_() {
        // var this_=this;
        // clearInterval(this_.timer);
        // this_.timer= setInterval(function () {
        //   console.log('11111')
        //   this_.$ajax.put("/acs/v1.0/service_login",).then((res) => {
        //     this_.delCookie('s_token');
        //     this_.delCookie('service_id');
        //     this_.delCookie('company');
        //     this_.delCookie('s_name');
        //     this_.delCookie('date');
        //     this_.delCookie('targetId');
        //     clearInterval(this_.timer);
        //     RongIMClient.getInstance().logout()
        //     this_.$router.push({'path': '/'});
        //   })
        // },7200000)
        // console.log('你想闪退，没门')
      },
      not_line(){
        this.logout=false;
        RongIMClient.getInstance().logout()
        this.$router.push({'path': '/'});
      },
      delCookie(name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=this.getCookie(name);
        if(cval!=null)
          document.cookie= name + "="+cval+";expires="+exp.toGMTString();
      },
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
      setCookie(c_name, value, expiredays){
        var exdate=new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
      },
      aplayAudio () {
        const audio = document.getElementById('audio')
        audio.play()
      },
      getAnswer(sentence,dialogId,productId,index,sentTime,customer){
        return new  Promise((resolve,reject)=> {
          var this_ = this
          this_.$ajax({
            method: "post",
            url: "/acs/v1.0/robot_answer",///acs http://127.0.0.1:80
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              'sentence': sentence,
              'dialogId': dialogId,
              'productId':productId
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
          }).then((res) => {
            var lAnswer //接受异步数据
            var display_name
            // this_.aplayAudio()
            if(res.data.data.process_flag === 1){
              // var insex_ = index
              this_.dialogId_ = res.data.data.dialogId
              this_.process_id_ = res.data.data.process_id
              this_.robot_answer_ = res.data.data.robot_answer
              this_.robot_uu_id_ = res.data.data.robot_uu_id
              this_.sentTime_ = sentTime
              function getFlowAnswer(robot_answer_,dialogId_,robot_uu_id_){
                new Promise((resolve,reject)=> {
                  this_.$ajax({
                    method: "post",
                    url: "/acs/v1.0/process_guidance",///acs http://127.0.0.1:80
                    headers: {
                      'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      'dialogId': this_.dialogId_ ,
                      'process_id':this_.process_id_
                    },
                    transformRequest: [function (data) {
                      let ret = ''
                      for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                      }
                      return ret
                    }],
                  }).then((res) => {
                    resolve(res.data)
                    lAnswer = res.data.data
                    display_name = res.data.display_name
                    this_.targetIds[index].answers.push({q:sentence,a:this_.robot_answer_,sentTime:this_.sentTime_,robot_uu_id:this_.robot_uu_id_,dialogId:this_.dialogId_,pAnswer:{lAnswer},display_name:display_name})
                    try{
                      this_.db.getDataByKey(this_.dialogId_,index).then(data=>{
                        if(data){
                          if(data.value[data.value.length-1].sentTime==sentTime){
                            var array=[];
                            var date = this_.getCookie('date');
                            for(var j=0;j<data.value.length;j++){
                              if(data.value[j].sentTime>date){
                                array.push(data.value[j]);
                              }
                            }
                            this_.targetIds[index].qa_record = array;
                            this_.$set(this_.targetIds[index], 'qa_record', array)
                          }else{
                            // this_.aplayAudio()
                            console.log('机器人流程答案返回声音1')
                            // this_.$store.commit('setVoice',numberRandom)
                            // this_.store.state.customer = customer
                            // this_.store.state.sentence = sentence
                            let numberRandom = Math.random()
                            let obj1 = {
                              no_voice:numberRandom,
                              sentence:sentence,
                              customer:customer
                            }
                            this_.$store.commit('triSentence',obj1)
                            this_.db.updateData(this_.dialogId_,{q:sentence,a:this_.robot_answer_,sentTime:this_.sentTime_,robot_uu_id:this_.robot_uu_id_,dialogId:this_.dialogId_,pAnswer:{lAnswer},display_name:display_name})
                          }
                        }else{
                          this_.db.addData({'id':this_.dialogId_,'value':[{q:sentence,a:this_.robot_answer_,sentTime:this_.sentTime_,robot_uu_id:this_.robot_uu_id_,dialogId:this_.dialogId_,pAnswer:{lAnswer},display_name:display_name}]})
                        }
                      })
                    } catch(e) {
                    }
                  })
                })
              }
              getFlowAnswer()
            }
            if (res.data.msg == '机器人返回信息') {
              if(sentence.indexOf("<div><img src='"+this_.environment)==0){
                sentence='[图片]';
              }
              if(res.data.data.process_flag !== 1){
                this_.targetIds[index].answers.push({q:sentence,a:res.data.data.robot_answer,select:res.data.data.robot_select,robot_answer_data:res.data.data.robot_answer_data,sentTime:sentTime,robot_uu_id:res.data.data.robot_uu_id,dialogId:res.data.data.dialogId,pAnswer:{lAnswer}})
                try{
                  this_.db.getDataByKey(dialogId,index).then(data=>{
                    if(data){
                      if(data.value[data.value.length-1].sentTime==sentTime){
                        var array=[];
                        var date = this_.getCookie('date');
                        for(var j=0;j<data.value.length;j++){
                          if(data.value[j].sentTime>date){
                            array.push(data.value[j]);
                          }
                        }
                        this_.targetIds[index].qa_record = array;
                        this_.$set(this_.targetIds[index], 'qa_record', array)
                      }else{
                        // this_.aplayAudio()
                        // this_.$store.commit('setVoice',numberRandom)
                        // this_.$store.commit('setCustomer',customer)
                        // this_.$store.commit('setSentence',sentence)
                        let numberRandom = Math.random()
                        let obj1 = {
                          no_voice:numberRandom,
                          sentence:sentence,
                          customer:customer
                        }
                        this_.$store.commit('triSentence',obj1)
                        this_.db.updateData(dialogId,{q:sentence,a:res.data.data.robot_answer,select:res.data.data.robot_select,robot_answer_data:res.data.data.robot_answer_data,sentTime:sentTime,robot_uu_id:res.data.data.robot_uu_id,dialogId:res.data.data.dialogId,pAnswer:{lAnswer}})
                      }
                    }else{
                      // let numberRandom = Math.random()
                      // this_.$store.commit('setVoice',numberRandom)
                      // this_.$store.commit('setCustomer',customer)
                      // this_.$store.commit('setSentence',sentence)
                      let numberRandom = Math.random()
                      let obj1 = {
                        no_voice:numberRandom,
                        sentence:sentence,
                        customer:customer
                      }
                      this_.$store.commit('triSentence',obj1)
                      this_.db.addData({'id':dialogId,'value':[{q:sentence,a:res.data.data.robot_answer,select:res.data.data.robot_select,robot_answer_data:res.data.data.robot_answer_data,sentTime:sentTime,robot_uu_id:res.data.data.robot_uu_id,dialogId:res.data.data.dialogId,pAnswer:{lAnswer}}]})
                    }
                  })
                } catch(e) {
                }
              }
              resolve(res.data.data.robot_answer)
            }
          })
        })
      },
      listenClose(){
        // this.checkActive=!this.checkActive;
        let state=this.state=="上线"? "在线":"不在线"
        this.$ajax({
          method:"post",
          url:"/acs/v1.0/change_service_state",
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          },
          data:{
            'state':state,
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        }).then((res)=>{
          if(res.data.data=="客服状态变更成功"){
            this.checkActive=!this.checkActive;
          }else if(res.data.msg=="用户未登录"){
            this_.$router.push({'path': '/'});
          }
        })
        // this.closeStatus=false;
      },
      updateRecord(data){
        var obj =new Object;
        this.targetId=this.targetIds[data.index].targetId;
        var date=new Date();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        this.extra=data.extra;
        this.sendTextMessage(data.content,this.targetId);
        if(data.content.indexOf(this.environment)==0){
          data.content="<div><img src='"+data.content+"'></div>"
        }
        obj={type:data.type,content:data.content,sentTime:hour+":"+minute+":"+second}
        this.targetIds[data.index].content.push(obj);
        this.temp=0;
        //this.listHistory.push(data);
      },
      setActive(event){
//        this.checkActive=!this.checkActive;
        if(event.target.className=="active"){
          return false;
        }
        this.state = this.onlineValue;
        this.state = this.state=="在线"? "上线":"下线"
        this.listenClose()
        // this.closeStatus=true;
      },
      remove(data){
        if(data==this.temp){
          this.temp=0;
        }
        this.db.deleteDataByKey(this.lists[data].targetId);
        this.targetId=this.lists[data].targetId
        if(this.lists.length>1){
          this.setCookie('targetId',this.targetId,1);
        }else{
          this.setCookie('targetId',"",1);
          this.lessen=true;
          document.getElementsByClassName('content')[0].className ="content";
        }
        this.removeTextMessage(this.lists[data]);
      },
      closeList(data){
        this.lists.splice(data,1);
      },
      addClass(index){
        this.targetId=index.id;
        this.temp=index.index
        this.showIndex=index.index
        for(var i=0;i<this.targetIds.length;i++){
          if(this.targetIds[i].targetId==index.id){
            this.extra=this.targetIds[i].h5_record
          }
        }
        this.clearUnreadCount(this.targetId)
        setTimeout(function () {
          var div = document.getElementsByClassName('g-scroll-view');
          for(var i=0;i<div.length;i++){
            div[i].scrollTop = div[i].scrollHeight;
          }
        },100)
        setTimeout(function () {
          var div = document.getElementsByClassName('gm-scroll-view');
          for(var j=0;j<div.length;j++){
            div[j].scrollTop = div[j].scrollHeight;
          }
        },100)
      },
      sendTextMessage(m,id) {
        var this_=this;
        var msg = new RongIMLib.TextMessage({content:m, extra: this.extra});
        var conversationtype = RongIMLib.ConversationType.PRIVATE;
        RongIMClient.getInstance().sendMessage(conversationtype,  this.targetId, msg, {
            onSuccess: function (message) {
              //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
              // $("ul").append("<li>" + 'userid3:' + $('#message').val() + "</li>");
              /* console.log("Send successfully");*/
              if(m=="592b71f0-b3f8-4f64-bd45-40b35c0191af"){
                this_.removeConversation(id);//关闭会话
              }
            },
            onError: function (errorCode ,message) {
              var info = '';
              switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                  info = '超时';
                  break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                  info = '未知错误';
                  break;
                case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                  info = '在黑名单中，无法向对方发送消息';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                  info = '不在讨论组中';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_GROUP:
                  info = '不在群组中';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                  info = '不在聊天室中';
                  break;
                default :
                  info = x;
                  break;
              }
              /*  console.log('发送失败:' + info);*/
            }
          }
        );
      },
      removeConversation(targetId){
        var this_=this;
        RongIMClient.getInstance().removeConversation(RongIMLib.ConversationType.PRIVATE,targetId, {
          onSuccess: function (bool) {
            setTimeout(function () {
              var array=[];
              this_.lists.forEach(function(v){ array.push(v.targetId);})
              var sign=-1;
              for(var i=0;i<this_.targetIds.length;i++){
                if(array.indexOf(this_.targetIds[i].targetId)!=0){
                  this_.targetIds.splice(i,1);
                  i = i-1
                }
              }
              if(this_.lists[0]){
                this_.targetId=this_.lists[0].targetId;
                this_.setCookie('targetId',this_.targetId,1);
              }
            },1000)
            // 删除会话成功。
            /*  console.log(bool)*/
          },
          onError: function (error) {
            // error => 删除会话的错误码
            /* console.log(error)*/
          }
        })
      },
      clearAllConversation() {
        RongIMClient.getInstance().clearConversations({
          onSuccess:function(){
            // 清除会话成功
          },
          onError:function(error){
            // error => 清除会话错误码。
          }
        });
      },
      removeTextMessage(data) {
        var this_=this;
        var msg = new RongIMLib.TextMessage({content: '592b71f0-b3f8-4f64-bd45-40b35c0191af',extra:data.extra});
        var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
        var targetId = data.targetId; // 目标 Id
        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
            onSuccess: function (message) {
              //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
              /*  console.log(message);*/
              this_.$ajax({
                method:"post",
                url:"/acs/v1.0/customer_logout",
                headers:{
                  'Content-type': 'application/x-www-form-urlencoded'
                },
                data:{
                  'uuid':data.targetId,
                  'name':data.extra[3],
                  'product_id':data.extra[4],
                  'robot_user_id':data.extra[6],
                  'service_id':this_.getCookie('service_id')
                },
                transformRequest: [function (data) {
                  let ret = ''
                  for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                  }
                  return ret
                }],
              }).then((res)=>{
                this_.removeConversation(targetId);
              })            }
          }
        );
      },
      clearUnreadCount(targetId){
        var conversationType = RongIMLib.ConversationType.PRIVATE;
        var targetId = targetId;
        RongIMClient.getInstance().clearUnreadCount(conversationType,targetId,{
          onSuccess:function(){
            /* console.log('清除未读消息成功');*/
            // 清除未读消息成功。
          },
          onError:function(error){
            // error => 清除未读消息数错误码。
          }
        });
      }
    },
    components:{
      chatWindow,
      v_aside,
      v_head,
      chatList,
      v_close,
      answer
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .z_index{
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 10
    .prompt{
      position absolute
      width 269px
      height 80px
      top 50%;
      left 50%;
      transform  translate(-50%,-50%);
      z-index 10
      .main {
        height 50px
        line-height 50px
        background-color #e7e4f9;
        border-radius 5px 5px 0 0
        font-size 14px
        text-align center
      }
      span{
        display inline-block
        width 50%
        /*width 134.2px*/
        text-align center
        background-color #d1cdee
        height 30px
        font-size 14px
        line-height 30px
        cursor pointer
      }
      .login_again{
        float left
        border-radius 0 0 0 5px
        /*border-right .3px solid white*/
      }
      .sure{
        float right
        border-radius 0 0 5px 0
        /*border-left .3px solid white*/
      }
      /*&:before{
        content ""
        left 143px
        top 50px
        height 30px
        width 1px
        background-color white
      }*/
    }
  }
  .chat{
    width 100%
    height 100%
    background: #eef3f6;
    >.content{
      &.active{
        left 0
        top 0
        width 100%
        height 100%
        .chatWindow{
          width calc(100vw - 497px)
          .record{
            height calc(100vh - 195px)
          }
        }
      }
      overflow: hidden;
      position absolute
      left 132px
      top 59px;
      background: #eef3f6;
      width calc(100vw - 150px)
      /* height calc(100vh - 61px)*/
      height:93.7%
      .chat-wrapper {
        border 1px solid #d6d6d6
        float left
        height 100%
        background: white
        margin-left: 0px
        border-radius:0px;
        margin-top: 0px;
        margin-right: 14px
        box-shadow:0px 0px 16px 0px rgba(61,104,169,0.17);
        border-radius:0px;
        .chat_content{
          width 180px;
          height 36px
          margin-bottom 10px
          color #454545
          padding 0px 5px
          text-align center
          box-sizing border-box
          font-size 14px
          .chat_title {
            float left
            span {
              position relative
              font-size 15px
              &:before {
                position absolute
                content ""
                display inline-block
                height 16px
                width 3px;
                background-color #524AE7
                left -8px
                margin-top 2px
              }
            }
          }
          img {
            margin-top 50px
          }
          .status {
            display block
            margin-top 16px
            select{
              width 50px
              height 28px
              outline:none
              position relative
              top -42px;
              left 46px;
              padding-left 0px
              padding-right 0px
              border none
              font-size 14px
              font-family:MicrosoftYaHei;
            }
            .icon-position{
              position relative
              top -42px;
              left 46px;
            }
            label{
              /*width 120px
              margin-left -100px*/
              display block
              padding-left: 18px;
              text-align left
              font-size:20px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(43,48,62,1);
            }
            span {
              position relative
              display inline-block
              margin-top: 10px
              margin-bottom: 10px
              cursor pointer
              font-size:16px;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(153,153,153,1);
              &:after {
                display none
                content ""
                width 40px
                height 2px
                position: absolute
                left:-4px
                bottom: -6px
                background:rgba(49,153,224,1);
              }
              &:last-child {
                margin-left 5px
              }
              &:first-child {
                margin-right 5px
              }
              &.active {
                color:rgba(0,0,0,1);
                &:after {
                  /* background-color #524AE7*/
                  display inline-block
                }
              }
            }
            .online{
              margin-left:-35px;
              margin-right:25px
            }
          }
        }
      }
    }
    .chatWindow.show,.answer.show{
      display block
    }
    .chatList.hide {
      display none
    }
    .chatList.active{
      /*background:rgba(255,255,255,1);*/
      background: #d0e1ed
      /* box-shadow:0px 0px 14px 0px rgba(61,104,169,0.17);*/
      /* border-radius:5px;*/
    }
  }
  .chat-small{
    width 99%
    height 102.8%
    background-color #fff;
    >.content{
      &.active{
        left 0
        top 0
        width 100%
        height 100%
        .chatWindow{
          width calc(100vw - 487px)
          .record{
            height calc(100vh - 195px)
          }
        }
      }
      overflow: hidden;
      position absolute
      left 132px
      top 59px;
      background: #eef3f6;
      width calc(100vw - 132px)
      /* height calc(100vh - 61px)*/
      height:93.7%
      .chat-wrapper {
        border 1px solid #d6d6d6
        float left
        height 100%
        background: white
        margin-left: 0px
        border-radius:0px;
        margin-top: 0px;
        margin-right: 14px
        box-shadow:0px 0px 16px 0px rgba(61,104,169,0.17);
        border-radius:0px;
        .chat_content{
          width 180px;
          height 36px
          margin-bottom 10px
          color #454545
          padding 8px 5px
          text-align center
          box-sizing border-box
          font-size 14px
          .chat_title {
            float left
            span {
              position relative
              font-size 15px
              &:before {
                position absolute
                content ""
                display inline-block
                height 16px
                width 3px;
                background-color #524AE7
                left -8px
                margin-top 2px
              }
            }
          }
          img {
            margin-top 50px
          }
          .status {
            display block
            margin-top 16px
            select{
              width 50px
              height 28px
              outline:none
              position relative
              top -42px;
              left 46px;
              padding-left 0px
              padding-right 0px
              border none
              font-size 14px
              font-family:MicrosoftYaHei;
            }
            .icon-position{
              position relative
              top -42px;
              left 46px;
            }
            label{
              /*width 120px
              margin-left -100px*/
              display block
              padding-left: 18px;
              text-align left
              font-size:20px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(43,48,62,1);
            }
            span {
              position relative
              display inline-block
              margin-top: 10px
              margin-bottom: 10px
              cursor pointer
              font-size:16px;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(153,153,153,1);
              &:after {
                display none
                content ""
                width 40px
                height 2px
                position: absolute
                left:-4px
                bottom: -6px
                background:rgba(49,153,224,1);
              }
              &:last-child {
                margin-left 5px
              }
              &:first-child {
                margin-right 5px
              }
              &.active {
                color:rgba(0,0,0,1);
                &:after {
                  /* background-color #524AE7*/
                  display inline-block
                }
              }
            }
            .online{
              margin-left:-35px;
              margin-right:25px
            }
          }
        }
      }
    }
    .chatWindow.show,.answer.show{
      display block
    }
    .chatList.hide {
      display none
    }
    .chatList.active{
      /*background:rgba(255,255,255,1);*/
      background: #d0e1ed
      /* box-shadow:0px 0px 14px 0px rgba(61,104,169,0.17);*/
      /* border-radius:5px;*/
    }
  }
  .chat1920{
    width 100%
    height 100%
    background: #eef3f6;
    >.content{
      &.active{
        left 0
        top 0
        width 100%
        height 100%
        .chatWindow{
          width calc(100vw - 497px)
          .record{
            height calc(100vh - 195px)
          }
        }
      }
      overflow: hidden;
      position absolute
      left 132px
      top 59px;
      background: #eef3f6;
      width calc(100vw - 150px)
      /* height calc(100vh - 61px)*/
      height:93.7%
      .chat-wrapper {
        border 1px solid #d6d6d6
        float left
        height 100%
        background: white
        margin-left: 0px
        border-radius:0px;
        margin-top: 0px;
        margin-right: 14px
        box-shadow:0px 0px 16px 0px rgba(61,104,169,0.17);
        border-radius:0px;
        .chat_content{
          width 180px;
          height 36px
          margin-bottom 10px
          color #454545
          padding 0px 5px
          text-align center
          box-sizing border-box
          font-size 14px
          .chat_title {
            float left
            span {
              position relative
              font-size 15px
              &:before {
                position absolute
                content ""
                display inline-block
                height 16px
                width 3px;
                background-color #524AE7
                left -8px
                margin-top 2px
              }
            }
          }
          img {
            margin-top 50px
          }
          .status {
            display block
            margin-top 16px
            select{
              width 50px
              height 28px
              outline:none
              position relative
              top -42px;
              left 46px;
              padding-left 0px
              padding-right 0px
              border none
              font-size 14px
              font-family:MicrosoftYaHei;
            }
            .icon-position{
              position relative
              top -42px;
              left 46px;
            }
            label{
              /*width 120px
              margin-left -100px*/
              display block
              padding-left: 18px;
              text-align left
              font-size:20px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(43,48,62,1);
            }
            span {
              position relative
              display inline-block
              margin-top: 10px
              margin-bottom: 10px
              cursor pointer
              font-size:16px;
              font-family:SourceHanSansCN-Regular;
              font-weight:400;
              color:rgba(153,153,153,1);
              &:after {
                display none
                content ""
                width 40px
                height 2px
                position: absolute
                left:-4px
                bottom: -6px
                background:rgba(49,153,224,1);
              }
              &:last-child {
                margin-left 5px
              }
              &:first-child {
                margin-right 5px
              }
              &.active {
                color:rgba(0,0,0,1);
                &:after {
                  /* background-color #524AE7*/
                  display inline-block
                }
              }
            }
            .online{
              margin-left:-35px;
              margin-right:25px
            }
          }
        }
      }
    }
    .chatWindow.show,.answer.show{
      display block
    }
    .chatList.hide {
      display none
    }
    .chatList.active{
      /*background:rgba(255,255,255,1);*/
      background: #d0e1ed
      /* box-shadow:0px 0px 14px 0px rgba(61,104,169,0.17);*/
      /* border-radius:5px;*/
    }
  }
</style>
