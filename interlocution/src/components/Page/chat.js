
import Qs from 'qs' // 格式化数据格式
import Vue from 'vue'
import {IndexedDB} from "@/common/indexData"
export default {
    data () {
        return {
            isOpenSwiper:true, // 是否打开轮播选项
            isOpenquestion:true, // 打开轮播选项按钮
            userText:'', // 客户发送的消息
            message:'', // 聊天框中的消息
            errorType: '', // 错误类型
            alertShow: false, // 是否弹出错误
            msgs:[], // 消息
            priority:'', // 人工客服与机器人优先级(1:人工客服优先;2:机器人优先)
            huamanOrRobot:false, // 控制是否是机器人还是人工客服回答(默认是机器人回答)
            appkey:'', // 融云秘钥
            humanButton:false, //人工客服按钮
            humanButtonText:'人工客服', // 人工客服显示文字
            busyText:'', // 客服繁忙提示文字
            inputImg:false, // 图片上传框
            greet_msg:window.greet_msg, // 初始化欢迎语
            aimi_name:window.aimi_name, // 机器人名称
            slogon:window.slogon, // 机器人简介
            avatar_big:window.avatar_big, // 头像大图
            avatar_small:window.avatar_small, // 头像小图
            wait_response:window.wait_response, // 等待语
            timeout_msg:window.timeout_msg, // 请求超时结束语
            qas:[], // 初始化选项
            showDots:true, // 是否显示轮播圆点
            // solveProblem:'', // 是否显示已解决问题
            answerBack:'以上回答是否解决您的问题?',
            UpDown:true, // 切换显示解决与未解决
            isImage:false, // 显示是否是图片
            list:[], // 左边图片列表
            rightList:[], // 右边图片列表
            userImageUrl:'', // 用户选择图片
            setIntervalTime:'', // 定时器
            isbutton:true, // 默认button颜色
            isOpenquestionIcon:true, // 是否显示qa控制图标
            controlYongyunMessage:'',// 控制融云重复消息
            humanBaseUrl:'https://chat.qb-tech.net',//人工url
            interval:'',//控制ios输入框bug,
            Orientation:'',//手机旋转问题
            textfold:false,//控制是否折叠
            istextfold:0//是否显示控制折叠文字
        }
    },
    watch: {
        //检测输入框是否有值
        userText:function(){
            let this_ = this
            if(this_.userText){
                this_.isbutton = false
            }else{
                this_.isbutton = true
            }
        },
        isOpenSwiper:function(){
            let this_ = this
            document.getElementById("foot-contain").setAttribute('style','top:0rem')
            if(this_.isOpenSwiper==true){
              document.getElementById("chat-contain").setAttribute('style','bottom:3rem')
              // var u = navigator.userAgent, app = navigator.appVersion;
              // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
              // if (isiOS) {
              //   window.setTimeout(function(){
              //     window.scrollTo(0,document.body.clientHeight);
              //   }, 1000);
              // }
              // document.getElementsByClassName('chatting-content')[0].scrollTop = parseInt(document.getElementsByClassName('chatting-content')['0'].scrollHeight) + 200
            }else{
                document.getElementById("chat-contain").setAttribute('style','bottom:0rem')
            }
        }
    },
    beforeRouteEnter(to, from, next){
        const indexdb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
        if (!indexdb) {
            console.log('你的浏览器不支持indexdb!')
            next();
        }else{
            console.log('你的浏览器支持indexdb!')
            let urlLength = window.location.href.length
            let urlStr = window.location.href.slice(urlLength-15,urlLength)
            console.log(urlStr)
            let options = {
              name: urlStr,
              version: 1,
              storeName: 'questionAnswer'
            }
            window.db=new IndexedDB(options);
            window.db.open();
            // window.db._init();
            setTimeout(function(){
                if(localStorage.getItem('uuid')!= null){
                    window.db.getDataByKey(localStorage.getItem('uuid'),2000).then(data=> {
                        console.log('从缓存中获取数据 ====== ')
                        if(data){
                            console.log('有缓存，先加载缓存...')
                            window.msgs = data.value
                            next();
                        }else{
                            console.log('没缓存，直接加载...')
                            next();
                        }
                    })
                }else{
                  next();
                }
            },1000)
        }
    },
    created(){
        let this_ = this
        //正式测试环境配置
        if(window.location.href.indexOf("test") > 0 || window.location.href.indexOf("127.0.0.1") > 0 || window.location.href.indexOf("localhost") > 0 || window.location.href.indexOf("192.168.1.16") > 0) {
            console.log('进入测试环境')
            this_.humanBaseUrl = "http://test.chat.qb-tech.net";
            this_.appkey = "8w7jv4qb829cy";//82hegw5u8ytdx正式  8w7jv4qb829cy测试
          }else{
            console.log('进入正式环境')
            this_.humanBaseUrl = "https://chat.qb-tech.net";
            this_.appkey = "82hegw5u8ytdx";
          }
        this_.controlYongyunMessage = 1
        this_.msgs = window.msgs || []

        let userData = Qs.stringify({
            key: window.key
        });
        Vue.axios.post(window.url+'chat/uservice',userData)
        .then(result => {
            localStorage.setItem('uuid', result.data.data.uuid);
            localStorage.setItem('product_id', result.data.data.product_id);
            localStorage.setItem('robot_user_id', result.data.data.robot_user_id);
            localStorage.setItem('name', result.data.data.name);
            localStorage.setItem('sesionId',result.data.data.sesionId);

            let humanDataToken = Qs.stringify({
                name:localStorage.getItem('name'),
                uuid:localStorage.getItem('uuid')
            });
            Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/customer_token',humanDataToken)
            .then(result => {
                let token = result.data.data;
                localStorage.setItem('token', token);
                RongIMClient.connect(token, {
                    onSuccess: function(userId) {
                        console.log('Connect successfully. ' + userId);
                    },
                    onTokenIncorrect: function() {
                        console.log('token 无效');
                    },
                    onError: function(errorCode){
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
                        console.log(info);
                    }
                });

            })

        })

        //模拟测试数据开始
        this_.msgs = [
            {imgData: false,msg: "您好，我是水滴筹，请问有什么可以帮助您？",select: [],selectposition:0,self: false,whether: [], whetherposition: 0,zan: 0},
            {imgData: false,msg: "请问你说的是哪个产品？<br />请选择以下产品：",robotZan: 0,select: ["太平百万医疗险", "安心百万医疗险"],selectposition:1,self: false,whether: [], whetherposition: 0,zan: 0},
            {imgData: false,msg: "心脏病保不保",robotZan: 0,select: [],selectposition:0,self: true,whether: [],whetherposition: 0,zan: 0},
            // {imgData: false,msg: ["太平百万医疗险哈哈哈", "安心百万医疗险哈哈哈"],robotZan: 0,select: [],selectposition:0,self: false,whether: [],whetherposition: 0,zan: 0},
            {h: 0,imgData: false, msg: "这是一款由太平财产保险有限公司发行的百万医疗险，主要http://www.baidu.com保障这款产品保障的是因意外或在等待期后因疾病导致的住院治疗，具体保障内容请查看保险条款。一般医疗保险金最高累计报销300万，100种重大疾病保险金最高报销600万，除因100种重大疾病导致的住院治疗无免赔额外，其余住院治疗均有1万免赔额/年。在市场上具备极强的竞争力。", msrc: undefined,overzan: 0,robotZan: 1,select: [],selectposition: 0,self: false, w: 0, whether: [], whetherposition: 0,zan: 1,textfold:true,istextfold:1},
            {imgData: false,msg: "太平百万医疗险",robotZan: 0,select: [],selectposition:0,self: true,whether: [],whetherposition: 0,zan: 0},
            {imgData: false,msg: "Aimi根据保单理解，心脏病在太平百万医疗险的保障范围内",robotZan: 1,select: [],selectposition:0,self: false,whether: [],whetherposition: 0,zan: 1},
            {imgData: false,msg: "如需咨询具体保障金额，您需回答下列问题：<br />请问保险事故是否发生在等待期30天后呢？", robotZan: 1,select: [],selectposition:0,self: false, whether: ["是", "否"], whetherposition: 1,zan: 0},
            {imgData: false,msg: "666666666",robotZan: 0,select: [],selectposition:0,self: true,whether: [],whetherposition: 0,zan: 0},
            {imgData: false,msg: "66666666666666661",robotZan: 0,select: [],selectposition:0,self: false,whether: [],whetherposition: 0,zan: 0},
            { h: 0,imgData: true, msg: "http://open.qb-tech.net/chat_image/3ef8f2a65d3711e9adbb52540077d8a0.png",msrc: "http://open.qb-tech.net/chat_image/3ef8f2a65d3711e9adbb52540077d8a0.png",robotZan: 0,select: [],selectposition:0,self: false, src: "http://open.qb-tech.net/chat_image/3ef8f2a65d3711e9adbb52540077d8a0.png", w: 0,whether: [],whetherposition: 0,zan: 0},
            { h: 0,imgData: false, msg: "您与水滴筹的聊天已结束",msrc: undefined,robotZan: 0,select: [],selectposition:0,self: false,w: 0,whether: [], whetherposition: 0,zan: 0},
            { h: 0,imgData: false,msg: "123456",msrc: undefined, robotZan: 0,select: [],selectposition:0,self: true,w: 0,whether: [],whetherposition: 0,zan: 0},
            { h: 0,imgData: false,msg: "请问你说的是哪个产品？<br />请选择以下产品：",msrc: undefined,robotZan: 1,select: ["太平百万医疗险", "安心百万医疗险"],selectposition:1,self: false, w: 0,whether: [],whetherposition: 0,zan: 0},
        ]
        let uuid = Math.random().toString();
        let product_id = 154;
        let robot_user_id = 29;
        let name = Math.random();
        let sesionId = Math.random().toString();
        this_.priority = 1
        localStorage.setItem('uuid', uuid);
        localStorage.setItem('product_id', product_id);
        localStorage.setItem('robot_user_id', 29);
        localStorage.setItem('name', name);
        localStorage.setItem('sesionId',sesionId);
        let humanDataToken = Qs.stringify({
            name:localStorage.getItem('name'),
            uuid:localStorage.getItem('uuid')
        });
        Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/customer_token',humanDataToken)
        .then(result => {
            console.log('uuid = ' + localStorage.getItem('uuid'))
            localStorage.setItem('token', result.data.token);
        })
        RongIMLib.RongIMClient.init(this_.appkey);
        localStorage.setItem('token', 'jbAwskvioqwF+Pdgx5Dn190+ErJ1xXi9y0K/LM5Yy9Wzwdh+8dhBq495Wv4rZ7FdXCcRCNx3mZQuFpTcoLBwDTjS1J0nu9Pdyv460Uyj4pE=');
        // 客户查询
        let humanDataSelect = Qs.stringify({
            name: localStorage.getItem('name'),
            uuid:localStorage.getItem('uuid'), // 客户dialog_id
            product_id:localStorage.getItem('product_id'), // 产品id
            robot_user_id:localStorage.getItem('robot_user_id') // 用户id
        });
        Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/before_customer_connect',humanDataSelect)
        .then(result => {
            console.log('连接前查询之前状态数据 ======')
            console.log(result)
            let msg = result.data.msg
            if(this_.priority ==1){
                this_.humanButton = false
                if(msg=='connect'){ // 自动重新链接客服 1、初始化连接时人工客服还有空位 2、客户重新连接断开后，客服未处理，继续连接
                    this_.huamanOrRobot = true // 切换到人工客服回答
                    this_.busyText = '' // 关闭忙碌语
                    this_.inputImg = false // 开启图片开关
                    localStorage.setItem('token', result.data.data.token);
                    localStorage.setItem('extra', result.data.data.extra);
                    localStorage.setItem('targetId', result.data.data.targetId);
                    localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
                    this_.customerLogin()
                }else if(msg=='robot'){
                    console.log('人工优先模式,之前未有过对话')
                    this_.setIntervalTime = setInterval(() => this_.customerLoginer(),2000)
                }
            }else if(this_.priority == 2 && msg == 'connect') { // 链接客服 （机器人优先）(客户切换到人工客服)
                localStorage.setItem('token', result.data.data.token);
                localStorage.setItem('extra', result.data.data.extra);
                localStorage.setItem('targetId', result.data.data.targetId);
                localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
                this_.huamanOrRobot = true
                this_.busyText = ''
                this_.humanButtonText = '结束人工'
            }else if(this_.priority == 0){
                this_.huamanOrRobot = false // 发送机器人消息
                this_.inputImg = false // 开启图片开关
            }
        })
        let tokenLogin =  new Promise((resolve, reject) => {
            // 客户token
            let humanDataToken = Qs.stringify({
                name:localStorage.getItem('name'),
                uuid:localStorage.getItem('uuid')
            });
            Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/customer_token',humanDataToken)
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
        })
        tokenLogin.then(
            function(value){
                let token = value.data;
                localStorage.setItem('token', token);
                console.log('token = ' + token)
                RongIMClient.connect(token, {
                    onSuccess: function(userId) {
                        console.log('Connect successfully. ' + userId);
                    },
                    onTokenIncorrect: function() {
                        console.log('token 无效');
                    },
                    onError: function(errorCode){
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
                        console.log(info);
                    }
                });
            }
        )
        // 设置连接监听状态 （ status 标识当前连接状态 ）
        // 连接状态监听器
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                // status 标识当前连接状态
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');

                      // 客户token
                      let datakey = Qs.stringify({
                        key: window.key
                      });
                      // let this_ = this
                      console.log('请求/chat/priority获得的数据')
                      Vue.axios.post(window.url+'chat/priority',datakey)
                        .then(result => {
                          console.log('请求/chat/priority获得的数据')
                          console.log(result)
                          let value = result.data
                          localStorage.setItem('priority',value.data.priority);
                          this_.priority = value.data.priority
                          if(this_.priority==0){
                            this_.humanButton = false
                            this_.busyText = ''
                            this_.inputImg = false
                          }else if(this_.priority==1){
                            this_.humanButton = false
                          }else{
                            this_.humanButton = true
                          }
                          // 客户查询
                          let humanDataSelect = Qs.stringify({
                            name: localStorage.getItem('name'),
                            uuid:localStorage.getItem('uuid'), // 客户dialog_id
                            product_id:localStorage.getItem('product_id'), // 产品id
                            robot_user_id:localStorage.getItem('robot_user_id') // 用户id
                          });
                          Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/before_customer_connect',humanDataSelect)
                            .then(result => {
                              console.log('连接前查询之前状态数据 ======')
                              console.log(result)
                              let msg = result.data.msg
                              if(this_.priority ==1){
                                this_.humanButton = false
                                if(msg='connect'){ // 自动重新链接客服 1、初始化连接时人工客服还有空位 2、客户重新连接断开后，客服未处理，继续连接
                                  this_.huamanOrRobot = true // 切换到人工客服回答
                                  this_.busyText = '' // 关闭忙碌语
                                  this_.inputImg = false // 开启图片开关
                                  localStorage.setItem('token', result.data.data.token);
                                  localStorage.setItem('extra', result.data.data.extra);
                                  localStorage.setItem('targetId', result.data.data.targetId);
                                  localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
                                  this_.customerLogin()
                                }else if(msg='robot'){
                                  console.log('人工优先模式,之前未有过对话')
                                  this_.setIntervalTime = setInterval(() => this_.customerLoginer(),2000)
                                }
                              }else if(this_.priority == 2 && msg == 'connect') { // 链接客服 （机器人优先）(客户切换到人工客服)
                                localStorage.setItem('token', result.data.data.token);
                                localStorage.setItem('extra', result.data.data.extra);
                                localStorage.setItem('targetId', result.data.data.targetId);
                                localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
                                this_.huamanOrRobot = true
                                this_.busyText = ''
                                this_.humanButtonText = '结束人工'
                              }else if(this_.priority == 0){
                                this_.huamanOrRobot = false // 发送机器人消息
                                this_.inputImg = false // 开启图片开关
                              }
                            })
                        })


                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('域名不正确');
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用');
                        break;
                }
            }
        });
        //模拟测试数据结束

        RongIMLib.RongIMClient.init(this_.appkey);
        // 设置连接监听状态 （ status 标识当前连接状态 ）
        // 连接状态监听器
        // 连接状态监听器
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                // status 标识当前连接状态
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');

                      // 客户token
                      let datakey = Qs.stringify({
                        key: window.key
                      });
                      // let this_ = this
                      console.log('请求/chat/priority获得的数据')
                      Vue.axios.post('/chat/priority',datakey)
                        .then(result => {
                          console.log('请求/chat/priority获得的数据')
                          console.log(result)
                          let value = result.data
                          localStorage.setItem('priority',value.data.priority);
                          this_.priority = value.data.priority
                          if(this_.priority==0){
                            this_.humanButton = false
                            this_.busyText = ''
                            this_.inputImg = false
                          }else if(this_.priority==1){
                            this_.humanButton = false
                          }else{
                            this_.humanButton = true
                          }
                          // 客户查询
                          let humanDataSelect = Qs.stringify({
                            name: localStorage.getItem('name'),
                            uuid:localStorage.getItem('uuid'), // 客户dialog_id
                            product_id:localStorage.getItem('product_id'), // 产品id
                            robot_user_id:localStorage.getItem('robot_user_id') // 用户id
                          });
                          Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/before_customer_connect',humanDataSelect)
                            .then(result => {
                              console.log('连接前查询之前状态数据 ======')
                              console.log(result)
                              let msg = result.data.msg
                              if(this_.priority ==1){
                                this_.humanButton = false
                                if(msg='connect'){ // 自动重新链接客服 1、初始化连接时人工客服还有空位 2、客户重新连接断开后，客服未处理，继续连接
                                  this_.huamanOrRobot = true // 切换到人工客服回答
                                  this_.busyText = '' // 关闭忙碌语
                                  this_.inputImg = false // 开启图片开关
                                  localStorage.setItem('token', result.data.data.token);
                                  localStorage.setItem('extra', result.data.data.extra);
                                  localStorage.setItem('targetId', result.data.data.targetId);
                                  localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
                                  this_.customerLogin()
                                }else if(msg='robot'){
                                  console.log('人工优先模式,之前未有过对话')
                                  this_.setIntervalTime = setInterval(() => this_.customerLoginer(),2000)
                                }
                              }else if(this_.priority == 2 && msg == 'connect') { // 链接客服 （机器人优先）(客户切换到人工客服)
                                localStorage.setItem('token', result.data.data.token);
                                localStorage.setItem('extra', result.data.data.extra);
                                localStorage.setItem('targetId', result.data.data.targetId);
                                localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
                                this_.huamanOrRobot = true
                                this_.busyText = ''
                                this_.humanButtonText = '结束人工'
                              }else if(this_.priority == 0){
                                this_.huamanOrRobot = false // 发送机器人消息
                                this_.inputImg = false // 开启图片开关
                              }
                            })
                        })


                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('域名不正确');
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用');
                        break;
                }
            }
        });

        // 消息监听器
        RongIMClient.setOnReceiveMessageListener({
            // 接收到的消息
            onReceived: function (message) {
                // 判断消息类型
                console.log('融云返回的信息 ======')
                console.log(message)
                switch(message.messageType){
                    case RongIMClient.MessageType.TextMessage:
                        // message.content.content => 文字内容
                        console.log(message)
                        if(message.content.content=="592b71f0-b3f8-4f64-bd45-40b35c0191af"){
                            let msg;
                            this_.inputImg = false
                            localStorage.setItem('controlWelcome',0) // 重新可以显示欢迎语
                            // 判断是人工客服优先模式还是机器人优先模式(1:是人工客服优先，2：是机器人优先)
                            let _data = []
                            if(this_.priority==1){
                                msg='您与'+ localStorage.getItem('service_name') +'的聊天已结束'
                                let data01 = {
                                    msg: msg,
                                    // src: msg,
                                    self: false,
                                    zan:0,
                                    overzan:1,
                                    robotZan:0,
                                    imgData:false,
                                    select:[],
                                    selectposition:0,
                                    whether:[],
                                    whetherposition:0,
                                    target:'',
                                    textfold:false,
                                    istextfold:0
                                }
                                this_.msgs.push(data01)
                                _data.push(data01)
                                // window.db.updateData(localStorage.getItem('uuid'),data01)
                            }else{
                                msg='您与'+ localStorage.getItem('service_name') +'的聊天已结束，如果您还想要人工客服服务，请继续点击人工客服按钮';
                                let data01 = {
                                    msg: msg,
                                    // src: msg,
                                    self: false,
                                    zan:0,
                                    overzan:1,
                                    robotZan:0,
                                    imgData:false,
                                    select:[],
                                    selectposition:0,
                                    whether:[],
                                    whetherposition:0,
                                    target:'',
                                    textfold:false,
                                    istextfold:0
                                }
                                this_.msgs.push(data01)
                                _data.push(data01)
                                // window.db.updateData(localStorage.getItem('uuid'),data01)
                            }

                            let data02 = {
                                msg: '以上回答是否解决您的问题?',
                                //src: '',
                                self: false,
                                zan:1,
                                overzan:0,
                                robotZan:0,
                                imgData:false,
                                select:[],
                                selectposition:0,
                                whether:[],
                                whetherposition:0,
                                target:'',
                                textfold:false,
                                istextfold:0
                            }
                            this_.msgs.push(data02)
                            _data.push(data02)
                            setTimeout(() => {

                                window.db.updateData(localStorage.getItem('uuid'),_data)
                                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 40)
                            // this_.solveProblem = true
                            if(this_.priority==1){//客服不在线,没有托管机器人,连接客服
                                this_.humanButton = false;
                            }else if(this_.priority==2){
                                this_.humanButton = true;
                            }
                        }else{
                            localStorage.setItem('controlWelcome',1)
                            // this_.solveProblem = false
                            if(message.content.content.indexOf("/chat_image/")>0 && message.messageDirection!==1){
                                this_.isImage = true
                                console.log('显示融云接受到的图片，图片信息 = ' + message.content.content)
                                // if(this_.controlYongyunMessage !== 1){
                                    let data = {
                                        msg:message.content.content,
                                        src:message.content.content,
                                        self: false,//图片显示位置(左边还是右边)
                                        imgData:true,//是否显示图片
                                        zan:0,
                                        overzan:1,
                                        robotZan:0,
                                        select:[],
                                        selectposition:0,
                                        whether:[],
                                        whetherposition:0,
                                        target:'',
                                        textfold:false,
                                        istextfold:0
                                    }
                                    this_.msgs.push(data);
                                    setTimeout(() => {
                                        window.db.updateData(localStorage.getItem('uuid'),data)
                                    }, 20)
                                    this_.controlYongyunMessage = 0
                                // }

                            }else{
                                console.log('显示融云接受到的文字，文字信息 = ' + message.content.content)
                                if(message.messageDirection==2){
                                    let str
                                    if(message.content.content.substr(-5,5) == '<br/>'){
                                      str = message.content.content.substr(0,message.content.content.length-5)
                                      console.log('融云返回的信息（处理过的）' + str)
                                    }else{
                                      str = message.content.content
                                    }
                                    if(message.content.extra[8]!=null){
                                        let data = {
                                            msg: message.content.extra[9],
                                            //src: message.content.content,
                                            self: false,
                                            imgData:false,//是否显示图片
                                            zan:0,
                                            overzan:1,
                                            robotZan:0,
                                            select:message.content.extra[8],
                                            selectposition:1,
                                            whether:[],
                                            whetherposition:0,
                                            target:'',
                                            textfold:str.length>250?true:false,
                                            istextfold:str.length>250?1:0,
                                        }
                                        this_.msgs.push(data);
                                        setTimeout(() => {
                                            window.db.updateData(localStorage.getItem('uuid'),data)
                                        }, 20)
                                        this_.controlYongyunMessage = 0
                                    }else{
                                        let data = {
                                            msg: str,
                                            //src: message.content.content,
                                            self: false,
                                            imgData:false,//是否显示图片
                                            zan:0,
                                            overzan:1,
                                            robotZan:0,
                                            select:[],
                                            selectposition:0,
                                            whether:[],
                                            whetherposition:0,
                                            target:'',
                                            textfold:str.length>250?true:false,
                                            istextfold:str.length>250?1:0,
                                        }
                                        this_.msgs.push(data);
                                        setTimeout(() => {
                                            window.db.updateData(localStorage.getItem('uuid'),data)
                                        }, 20)
                                        this_.controlYongyunMessage = 0
                                    }
                                }
                                // if(this_.controlYongyunMessage !== 1){

                                // }
                            }
                            console.log('数组队列 ======')
                            console.log(this_.msgs)
                            setTimeout(() => {
                            this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 0)
                        }
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        // message.content.content => 格式为 AMR 的音频 base64
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        // message.content.content => 图片缩略图 base64
                        // message.content.imageUri => 原图 URL
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        // message.content.latiude => 纬度
                        // message.content.longitude => 经度
                        // message.content.content => 位置图片 base64
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        // message.content.content => 文本消息内容
                        // message.content.imageUri => 图片 base64
                        // message.content.url => 原图 URL
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        // do something
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something
                        break;
                    default:
                        // do something
                }
            }
        });

        let token = localStorage.getItem('token');
        // 重新连接融云
        var callback = {
            onSuccess: function (userId) {
                console.log("Reconnect successfully." + userId);
            },
            onTokenIncorrect: function () {
                console.log('token无效');
            },
            onError: function (errorCode) {
                console.log(errorcode);
            }
        };
        var config = {
            // 默认 false, true 启用自动重连，启用则为必选参数
            auto: true,
            // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
            url: 'http://cdn.ronghub.com/RongIMLib-2.2.6.min.js',
            // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
            rate: [100, 1000, 3000, 6000, 10000]
        };
        RongIMClient.reconnect(token, callback, config);
        // 初始化连接融云结束
        if(window.show_claims_consultation == true){
            // this_.humanButton = true,  // 人工客服按钮
            // this_.humanButtonText = '理赔咨询'  // 人工客服显示文字
        }
    },
    mounted() {
        let this_ = this
        this_.qas = window.qas
        //判断轮播文字数组长度
        if(window.qas.length<7){
            this_.showDots = false
        }
        if(window.qas.length==0){
            this_.isOpenSwiper = false
        }
        // document.getElementsByClassName('chatting-content')[0].scrollTop = this_.$refs.chattingContent.scrollHeight
        document.getElementById("foot-contain").setAttribute('style','top:-3.45rem')
        if(this_.$refs.chattingContent.scrollHeight){
            this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight

        }
        if(window.qas.length ==0){
            this_.isOpenSwiper = false
            this_.isOpenquestionIcon = false
        }
    },
　　filters:{
　　　　　stringTrun:function(s){
            if(s.indexOf('<br/>')>0){
　　　　　　　　  return s.substring(0,s.length-5)
            }else{
                return s
            }
　　　　　},
          urlMsg:function(s){
              let this_ = this
              if(s){
                return s.replace(/^(?!.*<a href=.*)[0-9]{5,15}$/g, "<a href='tel:" + "$&" + "'>" + "$&" + "</a>").replace(/\<br \/\>/g, "囖").replace(/(?!.*?(\"|\')+)(.+?)((https|ftp|http):\/\/[^\u4e00-\u9fa5\s]*)/g, "$2<a href='$3' target='_blank'>" + "$3" + "</a>").replace(/囖/g, "\<br \/\>")
              }
          }
　　　　},
    // computed: {
    //   content() {
    //     const maxLen = this.maxLen;
    //     const haystack = this.haystack.toString();
    //     return haystack.length > maxLen
    //       ? haystack.slice(0, maxLen) + "..."
    //       : haystack;
    //   }
    // },
    methods: {
        handleFold(ft,index){
            let this_ = this
            this_.msgs[index].textfold = !this_.msgs[index].textfold
            if(ft == true){
              this_.msgs[index].istextfold = 2
            }else{
              this_.msgs[index].istextfold = 1
            }
        },
        //发送图片
        choise_file(event){
            let this_ = this
            let file_info = this_.$refs.file_el.files[0]
            console.log(event.target.files[0])
            console.log(EXIF)
            EXIF.getData(file_info, function() {
                this_.Orientation = EXIF.getTag(this, 'Orientation');
                console.log('Orientation ==' + Orientation)
            });

            // 使用FileReader对象预览
            let fr = new FileReader()
            // 通过fr.readAsDataURL文件的内容进行读取
            fr.readAsDataURL(file_info)
            fr.onload = function () {
                this_.userImageUrlData = this.result
                let data = {
                    msg:this_.userImageUrlData,//消息信息
                    src:this_.userImageUrlData,//识别显示图片地址
                    self: true,//是否在左边显示
                    imgData:true,//是否显示图片
                    zan:0,//是否显示点赞文字(图片) 0标识不显示；1表示显示
                    overzan:1,//结束语句的唯一标识 0是显示'点赞点菜'1是不显示点赞点菜
                    robotZan:0,//是否显示机器人点赞文字 0表示不显示；1表示显示'以上回答是否解决您的问题?'2表示显示'感谢您的反馈,我们将继续努力'
                    select:[],//选项内容
                    selectposition:0, //选项内容标识符
                    whether:[],//选项内容(是或否)
                    whetherposition:0,//选项标识(是或否)
                    target:'',//语句target,用于机器人点赞点踩
                    textfold:false,//是否折叠
                    istextfold:0,//是否显示折叠控制字符
                }
                this_.isOpenSwiper = false
                this_.sendImg(this_.userImageUrlData)
            }
        },
        //发送图片
        sendImg(userImageUrlData){
            let this_ = this
            console.log('向roy发送图片数据')
            let formData = new FormData();
            let dataImg = this_.convertBase64UrlToBlob(userImageUrlData)
            formData.append('service_image',dataImg);
            let u = navigator.userAgent
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            if (isIOS) {
                if(this_.Orientation==6){
                  console.log('需要旋转90度')
                  formData.append('image_reverse',1);
                }
            }else{
                console.log('不需要旋转90度')
                formData.append('image_reverse',0);
            }
            Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/service_upload_image',formData)
            .then(result => {
                console.log(result.data.data)
                this_.sendHumanMessage(result.data.data)
                console.log('roy返回图片地址成功')
                let data = {
                  msg:result.data.data,
                  src:result.data.data,
                  self: true,//图片显示位置(左边还是右边)
                  imgData:true,//是否显示图片
                  zan:0,
                  overzan:1,
                  robotZan:0,
                  select:[],
                  selectposition:0,
                  whether:[],
                  whetherposition:0,
                  target:'',
                  textfold:false,//是否折叠
                  istextfold:0,//是否显示折叠控制字符
                }

                this_.msgs.push(data);
                window.db.updateData(localStorage.getItem('uuid'),data)
            })
        },
        convertBase64UrlToBlob(urlData){
             //去掉url的头，并转换为byte
            var bytes=window.atob(urlData.split(',')[1]);        
            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob( [ab] , {type : 'image/png'});
        },
        //放大左边图片
        logIndexChange(arg){
            console.log("----->>> logIndexChange:", arg)
        },
        show (index) {
            let this_ = this
            this_.$refs.previewer[index].show(index)
        },
        //放大右边图片
        rightLogIndexChange(arg){
            console.log(arg)
        },
        rightShow (index) {
            let this_ = this
            this_.$refs.rightpreviewer[index].show(index)
        },
        //点赞人工客服
        clickUp(index,target){
            window.db.editData(localStorage.getItem('uuid'),index,'感谢您的反馈,我们将继续努力')
            let this_ = this
            if(this_.msgs[index].robotZan == 1){
                console.log('机器人点赞成功')
                this_.msgs[index].zan = 0
                this_.msgs[index].robotZan = 2
                this_.msgs[index].overzan = 0
                let noSolveData = Qs.stringify({
                  type: 1,
                  target:target, // 客户dialog_id
                })
                Vue.axios.post(feedback_url,noSolveData)
                  .then(result => {
                    console.log('踩成功')
                    this_.UpDown = false
                  })
            }else{
                console.log('点赞成功')
                this_.msgs[index].zan = 2
                this_.msgs[index].overzan = 1
                this_.msgs[index].msg = '感谢您的反馈,我们将继续努力'
                let solveData = Qs.stringify({
                  solve: '已解决',
                  uuid:localStorage.getItem('uuid'), // 客户dialog_id
                  customer_token: localStorage.getItem('token')
                })
                Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/customer_solve',solveData)
                  .then(result => {
                    console.log('点赞成功')
                    this_.UpDown = false
                  })
            }
        },
        //踩人工客服
        clickDown(index,target){
            window.db.editData(localStorage.getItem('uuid'),index,'感谢您的反馈,我们将继续努力')
            let this_ = this
            if(this_.msgs[index].robotZan == 1){
                console.log('机器人踩成功')
                this_.msgs[index].zan = 0
                this_.msgs[index].robotZan = 2
                this_.msgs[index].overzan = 0
                let noSolveData = Qs.stringify({
                  type: 0,
                  target:target,
                })
                Vue.axios.post(feedback_url,noSolveData)
                  .then(result => {
                    console.log('踩成功')
                    this_.UpDown = false
                  })
            }else{
                console.log('人踩成功')
                this_.msgs[index].zan = 2
                this_.msgs[index].overzan = 1
                this_.msgs[index].msg = '感谢您的反馈,我们将继续努力'
                let noSolveData = Qs.stringify({
                  solve: '未解决',
                  uuid:localStorage.getItem('uuid'), // 客户dialog_id
                  customer_token: localStorage.getItem('token')
                })
                Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/customer_solve',noSolveData)
                  .then(result => {
                    console.log('踩成功')
                    this_.UpDown = false
                  })
            }
        },
        // 切换人工客服与机器人状态
        clickHumanButton(){
            let this_ = this
            if(this_.humanButtonText = '结束人工'){
                this_.humanButtonText = '人工客服'
                this_.inputImg = false
                this_.huamanOrRobot = false
            }else{
                this_.humanButtonText = '结束人工'
                this_.inputImg = true
                this_.huamanOrRobot = true
            }
        },
        // 客户登录
        customerLogin(){
        let this_ = this
        let humanDataLogin = Qs.stringify({
            name: localStorage.getItem('name'),
            uuid:localStorage.getItem('uuid'), // 客户dialog_id
            product_id:localStorage.getItem('product_id'), // 产品id
            robot_user_id:localStorage.getItem('robot_user_id') // 用户id
        });
        Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/customer_login',humanDataLogin)
        .then(result => {
            if(result.data.msg == "not online") {
                let msg = result.data.data;
                console.log('priority = ' + this_.priority)
                console.log('客服状态 = ' + result.data.msg)
                console.log('robot_hosting = ' + result.data.robot_hosting)
                localStorage.setItem('robot_hosting', result.data.robot_hosting)
                if(this_.priority == 1 && result.data.robot_hosting == 0) { //客服不在线,没有托管机器人,连接客服
                    this_.inputImg = false
                    this_.humanButton = ''
                    this_.busyText = ''
                    this_.huamanOrRobot = 'none'
                    this_.greet_msg = result.data.data
                    console.log('客服优先模式，机器人未托管，人工客服未在线')
                    this_.setIntervalTime = setInterval(function(){
                        this_.customerLoginer()
                    },2000)
                } else if(this_.priority == 1 && result.data.robot_hosting == 1){
                    this_.inputImg = false
                    this_.humanButton = false
                    this_.busyText = ''
                    this_.huamanOrRobot = false
                    msg = '您好，我是' + window.aimi_name + ',' + window.slogon
                    console.log('客服优先模式，机器人托管，人工客服未在线')
                    // this_.setIntervalTime = setInterval(function(){
                    //     this_.customerLoginer()
                    // },2000)
                } else if(this_.priority == 2){
                    this_.inputImg = false
                    this_.humanButton = true
                    this_.busyText = result.data.data
                    console.log('机器优先模式')
                    this_.humanButtonText = '人工客服'
                }
                setTimeout(() => {
                    if(this_.$refs.chattingContent.scrollHeight){
                      this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                    }
                }, 0)
            } else if(result.data.msg == "connect") {
                console.log('客户连接人工客服成功')
                clearInterval(this_.setIntervalTime)
                this_.busyText = ''
                this_.inputImg = true
                this_.huamanOrRobot = true
                if(this_.priority == 2){
                  this_.humanButton = true
                  this_.humanButtonText = '取消客服'
                }
                localStorage.setItem('token', result.data.data.token);
                localStorage.setItem('extra', result.data.data.extra);
                localStorage.setItem('targetId', result.data.data.targetId);
                localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
                localStorage.setItem('service_name', result.data.data.service_name);
                let msg = result.data.data.welcome_words;
                console.log('欢迎语 = ' + result.data.data.welcome_words)
                // console.log('刷新不需要欢迎语')
                if(localStorage.getItem('controlWelcome')==1){
                    console.log('曾今拥有的欢迎语')
                }else{
                    console.log('显示第一条欢迎语')
                    this_.msgs.push({
                        msg:  msg,
                        //src: msg,
                        self: false,
                        zan:0,
                        overzan:1,
                        imgData:false,
                        select:[],
                        selectposition:0,
                        whether:[],
                        whetherposition:0,
                        target:'',
                        textfold:msg.length>250?true:false,//是否折叠
                        istextfold:msg.length>250?1:0,//是否显示折叠控制字符
                    });
                    window.db.updateData(localStorage.getItem('uuid'),this_.msgs)
                    localStorage.setItem('controlWelcome',1)
                    // window.db.addData({'id':localStorage.getItem('uuid'),'value':this_.msgs})
                }
                setTimeout(() => {
                    this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                }, 0)
            }else if(result.data.msg == "line"){
                console.log('priority = ' + this_.priority)
                console.log('客服状态 = ' + result.data.msg)
                console.log('robot_hosting = ' + result.data.robot_hosting)
                if(result.data.robot_hosting==1){
                    this_.huamanOrRobot = false
                    this_.inputImg = false // 开启图片开关
                    console.log('进入排队队列,此时机器人在线')
                }else{
                    this_.huamanOrRobot = 'none'
                    console.log('进入排队队列，此时机器人不在线')
                }
                localStorage.setItem('robot_hosting', result.data.robot_hosting)
                this_.inputImg = false
                this_.busyText = result.data.data
                this_.setIntervalTime = setInterval(function(){
                    this_.customerLoginer()
                },2000)
            }
        })
        },
        // 检测客户登录
        customerLoginer(){
            let this_ = this
            let humanDataLogin = Qs.stringify({
                name: localStorage.getItem('name'),
                uuid:localStorage.getItem('uuid'), // 客户dialog_id
                product_id:localStorage.getItem('product_id'), // 产品id
                robot_user_id:localStorage.getItem('robot_user_id') // 用户id
            });
            Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/customer_login',humanDataLogin)
            .then(result => {
            if(result.data.msg == "not online") {
                let msg = result.data.data;
                console.log('priority = ' + this_.priority)
                console.log('客服状态 = ' + result.data.msg)
                console.log('robot_hosting = ' + result.data.robot_hosting)
                localStorage.setItem('robot_hosting', result.data.robot_hosting)
                if(this_.priority == 1 && result.data.robot_hosting == 0) { //客服不在线,没有托管机器人,连接客服
                    this_.inputImg = false
                    this_.humanButton = ''
                    this_.busyText = ''
                    this_.huamanOrRobot = 'none'
                    this_.greet_msg = result.data.data
                    console.log('客服优先模式，机器人未托管，人工客服未在线')
                } else if(this_.priority == 1 && result.data.robot_hosting == 1){
                    this_.inputImg = false
                    this_.humanButton = false
                    this_.busyText = ''
                    this_.huamanOrRobot = false
                    msg = '您好，我是' + window.aimi_name + ',' + window.slogon
                    console.log('客服优先模式，机器人托管，人工客服未在线')
                } else if(this_.priority == 2){
                    this_.inputImg = false
                    this_.humanButton = true
                    this_.busyText = result.data.data
                    this_.humanButtonText = '人工客服'
                    console.log('机器优先模式')
                    this_.msgs.push({
                        msg: msg,
                        //src: msg,
                        self: false,
                        imgData:false,
                        zan:0,
                        overzan:1,
                        robotZan:0,
                        select:[],
                        selectposition:0,
                        whether:[],
                        whetherposition:0,
                        target:'',
                        textfold:msg.length>250?true:false,//是否折叠
                        istextfold:msg.length>250?1:0,//是否显示折叠控制字符
                    });
                    // window.db.addData({'id':localStorage.getItem('uuid'),'value':this_.msgs})
                    window.db.updateData(localStorage.getItem('uuid'),this_.msgs)
                    setTimeout(() => {
                    this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                    }, 0)
                }
            } else if(result.data.msg == "connect") {
                clearInterval(this_.setIntervalTime)
                this_.busyText = ''
                this_.inputImg = true
                this_.huamanOrRobot = true
                localStorage.setItem('token', result.data.data.token);
                localStorage.setItem('extra', result.data.data.extra);
                localStorage.setItem('targetId', result.data.data.targetId);
                localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
                console.log('欢迎语' + result.data.data.welcome_words)
                if(this_.priority == 2){
                    this_.humanButton = true
                    this_.humanButtonText = '取消客服'
                }
                // let msg = result.data.data.welcome_words;
                let connectData = {
                    msg: result.data.data.welcome_words,
                    //src: result.data.data.welcome_words,
                    self: false,
                    zan:0,
                    overzan:1,
                    robotZan:0,
                    imgData:false,
                    select:[],
                    selectposition:0,
                    whether:[],
                    whetherposition:0,
                    target:'',
                    textfold:false,//是否折叠
                    istextfold:0,//是否显示折叠控制字符
                }
                this_.msgs.push(connectData);
                // window.db.addData({'id':localStorage.getItem('uuid'),'value':this_.msgs})
                window.db.updateData(localStorage.getItem('uuid'),connectData)
                setTimeout(() => {
                    this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                }, 0)
            }else if(result.data.msg == "line"){
                console.log('priority = ' + this_.priority)
                console.log('客服状态 = ' + result.data.msg)
                console.log('robot_hosting = ' + result.data.robot_hosting)
                if(result.data.robot_hosting==1){
                    this_.huamanOrRobot = false
                    this_.inputImg = false // 开启图片开关
                    console.log('进入排队队列,此时机器人在线')
                }else{
                    this_.huamanOrRobot = 'none'
                    console.log('进入排队队列，此时机器人不在线')
                }
                localStorage.setItem('robot_hosting', result.data.robot_hosting)
                this_.inputImg = false
                this_.busyText = result.data.data
            }
            })
        },
        //切换选项框
        swiperControl(){
            let this_ = this
            this_.isOpenSwiper = !this_.isOpenSwiper
        },
        //关闭选项框
        closeSwipe(){
            let this_ = this
            this_.isOpenSwiper = false
            //顶起输入框内容
            // if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            //     document.getElementById("foot-contain").setAttribute('style','bottom:0.5rem')
            // }
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            console.log(this_.$refs.chattingContent.scrollHeight)
            if(!isiOS){
                setTimeout(() => {
                    this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                }, 500)
            }
            //  解决ios输入框回弹不了问题
            // if (!isiOS) {
            //   document.getElementById("chat-contain").setAttribute('style','bottom:3rem')
            // }
            // else {
            //     console.log('电脑端')
            // }
            // document.body.scrollTop = document.body.scrollHeight;
        },
        leaveFocus() {
            let this_ = this
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
              document.getElementById("foot-contain").setAttribute('style','bottom:0rem')
            }
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            //  解决ios输入框回弹不了问题
            if (isiOS) {
                document.activeElement.scrollIntoViewIfNeeded(true);
            }
            console.log(this_.$refs.chattingContent.scrollHeight)
            if(!isiOS){
                setTimeout(() => {
                    this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                }, 500)
            }
            // if (!isiOS) {
            //   document.getElementById("foot-contain").setAttribute('style','bottom:0rem')
            // }
            // else {
            //     console.log('电脑端')
            // }
        },
        //发送选项框消息
        select(msg){
            let this_ = this
            this_.sendMessage(msg)
            this_.isOpenSwiper = false
        },
        selectWhether(msg,index){
          let this_ = this
          this_.msgs[index].whetherposition = 0
          window.db.editWhetherData(localStorage.getItem('uuid'),index)
          this_.sendMessage(msg)
          this_.isOpenSwiper = false
        },
        //判断状态
        checkServiceStatus() {
            let this_ = this
            this_.loginStatus = "";
            let humanDataLogin = Qs.stringify({
                name: localStorage.getItem('name'),
                uuid:localStorage.getItem('uuid'), // 客户dialog_id
                product_id:localStorage.getItem('product_id'), // 产品id
                robot_user_id:localStorage.getItem('robot_user_id') // 用户id
            });
            return new Promise((resolve, reject) => {
              Vue.axios.post(this_.humanBaseUrl+'/acs/v1.0/customer_login',humanDataLogin)
                .then(res => {
                  resolve(res.data);
                })
                .catch(err =>{
                  reject(err.data)
                })
            });
        },
        //发送消息
        sendMessage(msg){
            let this_ = this
            let statusData = this_.checkServiceStatus()
            statusData.then(
               function(value){
                    this_.loginStatus = value
                    console.log('发送消息，重新检测状态：' + this_.loginStatus.msg)
                    if(this_.loginStatus.msg=="not online"){
                        console.log('重新判断状态，状态为 = ' + this_.loginStatus.msg)
                        if(this_.loginStatus.robot_hosting==0){
                            this_.msgs = this_.msgs || []
                            let data01 = {
                                msg: this_.userText,
                                //src: this_.userText,
                                self: true,
                                imgData:false,
                                zan:0,
                                overzan:1,
                                robotZan:0,
                                select:[],
                                selectposition:0,
                                whether:[],
                                whetherposition:0,
                                target:'',
                                textfold:false,//是否折叠
                                istextfold:0,//是否显示折叠控制字符
                            }
                            this_.msgs.push(data01)

                            setTimeout(() => {
                                window.db.updateData(localStorage.getItem('uuid'),data01)
                                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 20)

                            this_.greet_msg = this_.loginStatus.data
                            let data02 = {
                                msg: this_.greet_msg,
                                //msg: this_.greet_msg,
                                self: false,
                                imgData:false,
                                zan:0,
                                overzan:1,
                                robotZan:0,
                                select:[],
                                selectposition:0,
                                whether:[],
                                whetherposition:0,
                                target:'',
                                textfold:false,//是否折叠
                                istextfold:0,//是否显示折叠控制字符
                            }
                            this_.msgs.push(data02)

                            setTimeout(() => {
                                window.db.updateData(localStorage.getItem('uuid'),data02)
                                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 40)
                            this_.userText=''
                        }else{
                            // this_.greet_msg = this_.loginStatus.data
                            this_.sendRobotMessage(msg)
                        }
                    } else {
                        let inputMsg = msg || this_.userText
                        console.log('发送消息' + inputMsg)
                        console.log('是否发送人工消息=' + this_.huamanOrRobot)
                        if(this_.huamanOrRobot==true || this_.loginStatus.msg=='connect'){
                            console.log('发送人工客服消息')

                            this_.busyText = ''
                            this_.inputImg = true
                            this_.huamanOrRobot = true
                            localStorage.setItem('token', this_.loginStatus.data.token);
                            localStorage.setItem('targetId', this_.loginStatus.data.targetId);
                            localStorage.setItem('extra', JSON.stringify(this_.loginStatus.data.extra));
                            localStorage.setItem('service_name', this_.loginStatus.data.service_name);
                            // let msg = this_.loginStatus.welcome_words;
                            // console.log('欢迎语 = ' + this_.loginStatus.welcome_words)
                            // // console.log('刷新不需要欢迎语')
                            // if(localStorage.getItem('controlWelcome') ==1){
                            //     console.log('曾今拥有的欢迎语')
                            // }else{
                            //     console.log('显示第一条欢迎语')
                            //     this_.msgs.push({
                            //         msg:  msg,
                            //         self: false,
                            //         zan:0,
                            //         imgData:false
                            //     });
                            //     localStorage.setItem('controlWelcome',1)
                            //     window.db.updateData(localStorage.getItem('uuid'),msg)
                            // }
                            localStorage.setItem('controlWelcome',1)
                            this_.controlYongyunMessage = 0
                            this_.sendHumanMessage(inputMsg)
                        }else if(this_.huamanOrRobot==false || this_.loginStatus.robot_hosting == 1){
                            console.log('发送机器人消息1')
                            this_.inputImg = false
                            this_.sendRobotMessage(inputMsg)
                            this_.controlYongyunMessage = 0
                        }else{
                            this_.inputImg = true
                            this_.busyText = this_.loginStatus.data
                            if(!inputMsg){
                                this_.errorType = '输入内容不能为空'
                                this_.alertShow = true
                                return;
                            }
                            this_.greet_msg = '您好，您正在排队，请耐心等候...'
                            // 客户输入答案
                            this_.controlYongyunMessage = 0
                            let data01 = {
                                msg:inputMsg,
                                //src:inputMsg,
                                self: true,
                                imgData:false,
                                zan:0,
                                overzan:1,
                                robotZan:0,
                                select:[],
                                selectposition:0,
                                whether:[],
                                whetherposition:0,
                                target:'',
                                textfold:false,//是否折叠
                                istextfold:0,//是否显示折叠控制字符
                            }
                            this_.msgs.push(data01)
                            setTimeout(() => {
                                window.db.updateData(localStorage.getItem('uuid'),data01)
                                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 20)

                            let data02 = {
                                msg:this_.greet_msg,
                                //src:this_.greet_msg,
                                self: false,
                                imgData:false,
                                zan:0,
                                overzan:1,
                                robotZan:0,
                                select:[],
                                selectposition:0,
                                whether:[],
                                whetherposition:0,
                                target:'',
                                textfold:false,//是否折叠
                                istextfold:0,//是否显示折叠控制字符
                            }
                            this_.msgs.push(data02)
                            setTimeout(() => {
                                window.db.updateData(localStorage.getItem('uuid'),data02)
                                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 40)
                            this_.userText=''
                            this_.setIntervalTime = setInterval(function(){
                                this_.customerLoginer()
                            },2000)
                        }
                    }
               }
            )
        },
        //发送机器人消息
        sendRobotMessage(msg){
          let selectItem = msg
          let this_ = this
          if(this_.userText || selectItem){
            console.log('发送机器人消息')

            // 机器人回答
            let robotData = Qs.stringify({
              dialog_id: 1,
              msg: this_.userText || selectItem,
              key:window.key,
              claims_consultation: 'close'
            })
            let userRobot = {
              msg: this_.userText || selectItem,
              //src: this_.userText || selectItem,
              self: true,
              imgData:false,
              zan:0,
              overzan:1,
              robotZan:0,
              select:[],
              selectposition:0,
              whether:[],
              whetherposition:0,
              target:'',
              textfold:false,//是否折叠
              istextfold:0,//是否显示折叠控制字符
            }
            // 客户输入答案
            this_.msgs.push(userRobot)
            window.db.updateData(localStorage.getItem('uuid'),userRobot)
            this_.userText=''
            Vue.axios.post(window.send_url,robotData)
              .then(result => {
                console.log('机器人获取答案成功')
                if(result.data.hasOwnProperty("iv") && result.data.iv) {
                  var json = decrypt((result.data.msg), window.skey,result.data.iv).replace("aimi", window.aimi_name).replace("AIMI", window.aimi_name);
                  result.msg = JSON.parse(json);
                }
                let _data = []
                if(result.msg.data instanceof Array){
                  for(let i=0;i<result.msg.data.length;i++){
                    if(result.msg.select != undefined) {
                      let data;
                      if(i == result.msg.position-1){
                        data = {
                          msg: result.msg.data[i],
                          //src: result.msg.data[i],
                          select:result.msg.select,
                          selectposition:1,
                          self: false,
                          imgData:false, //暂时false
                          zan:0,
                          overzan:1,
                          robotZan:0,
                          whether:[],
                          whetherposition:0,
                          target:'',
                          textfold:result.msg.data[i].length>250?true:false,//是否折叠
                          istextfold:result.msg.data[i].length>250?1:0,//是否显示折叠控制字符
                        }
                      }else{
                        data = {
                          msg: result.msg.data[i],
                          //src: result.msg.data[i],
                          select:[],
                          selectposition:0,
                          self: false,
                          imgData:false, //暂时false
                          zan:1,
                          overzan:0,
                          robotZan:1,
                          whether:[],
                          whetherposition:0,
                          target:'',
                          textfold:result.msg.data[i].length>250?true:false,//是否折叠
                          istextfold:result.msg.data[i].length>250?1:0,//是否显示折叠控制字符
                        }
                      }
                      this_.msgs.push(data);
                      _data.push(data);
                      setTimeout(() => {
                        // window.db.updateData(localStorage.getItem('uuid'),data)
                        this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                      }, 0)
                    }else if(result.msg.hasOwnProperty('whetherposition')){
                      let data;
                      if(i == result.msg.whetherposition-1){

                        data = {
                          msg: result.msg.data[i],
                          //src: result.msg.data[i],
                          self: false,
                          imgData:false, //暂时false
                          zan:0,
                          overzan:1,
                          robotZan:0,
                          select:[],
                          selectposition:0,
                          whether:result.msg.whether,
                          whetherposition:1,
                          target:'',
                          textfold:result.msg.data[i].length>250?true:false,//是否折叠
                          istextfold:result.msg.data[i].length>250?1:0,//是否显示折叠控制字符
                        }
                      }else{
                          data = {
                          msg: result.msg.data[i],
                          //src: result.msg.data[i],
                          self: false,
                          imgData:false, //暂时false
                          zan:0,
                          overzan:0,
                          robotZan:0,
                          select:[],
                          selectposition:0,
                          whether:[],
                          whetherposition:0,
                          target:'',
                          textfold:result.msg.data[i].length>250?true:false,//是否折叠
                          istextfold:result.msg.data[i].length>250?1:0,//是否显示折叠控制字符
                        }
                      }
                      this_.msgs.push(data);
                      _data.push(data);
                      setTimeout(() => {
                        // window.db.updateData(localStorage.getItem('uuid'),data)
                        this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                      }, 0)
                    }else if(!result.msg.hasOwnProperty('whetherposition') && result.msg.select == undefined){
                      let data = {}
                      // if(i==0){
                      //   data = {
                      //     msg: result.msg.data[i],
                      //     //src: result.msg.data[i],
                      //     self: false,
                      //     imgData:false, //暂时false
                      //     zan:0,
                      //     overzan:0,
                      //     robotZan:1,
                      //     select:[],
                      //     selectposition:0,
                      //     whether:[],
                      //     whetherposition:0
                      //   }
                      // }else{
                      if(i==result.msg.data.length-1){
                        data = {
                          msg: result.msg.data[result.msg.data.length-1],
                          //src: result.msg.data[i],
                          self: false,
                          imgData:false, //暂时false
                          zan:1,
                          overzan:0,
                          robotZan:1,
                          select:[],
                          selectposition:0,
                          whether:[],
                          whetherposition:0,
                          target:result.data.target,
                          textfold:result.msg.data[result.msg.data.length-1].length>250?true:false,//是否折叠
                          istextfold:result.msg.data[result.msg.data.length-1].length>250?1:0,//是否显示折叠控制字符
                        }
                      }else{
                        data = {
                          msg: result.msg.data[i],
                          //src: result.msg.data[i],
                          self: false,
                          imgData:false, //暂时false
                          zan:0,
                          overzan:0,
                          robotZan:0,
                          select:[],
                          selectposition:0,
                          whether:[],
                          whetherposition:0,
                          target:result.data.target,
                          textfold:result.msg.data[i].length>250?true:false,//是否折叠
                          istextfold:result.msg.data[i].length>250?1:0,//是否显示折叠控制字符
                        }
                      }
                      // }
                      this_.msgs.push(data);
                      _data.push(data);
                      setTimeout(() => {
                        // window.db.updateData(localStorage.getItem('uuid'),data)
                        this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                      }, 0)
                    }
                  }
                  window.db.updateData(localStorage.getItem('uuid'),_data)
                }else{
                  let data = {}
                  // if(i==0){
                  //   data = {
                  //     msg: result.msg.data[i],
                  //     //src: result.msg.data[i],
                  //     self: false,
                  //     imgData:false, //暂时false
                  //     zan:0,
                  //     overzan:0,
                  //     robotZan:1,
                  //     select:[],
                  //     selectposition:0,
                  //     whether:[],
                  //     whetherposition:0
                  //   }
                  // }else{
                  data = {
                    msg: result.msg.data,
                    //src: result.msg.data[i],
                    self: false,
                    imgData:false, //暂时false
                    zan:1,
                    overzan:0,
                    robotZan:1,
                    select:[],
                    selectposition:0,
                    whether:[],
                    whetherposition:0,
                    target:result.data.target,
                    textfold:result.msg.data.length>250?true:false,//是否折叠
                    istextfold:result.msg.data.length>250?1:0,//是否显示折叠控制字符
                  }
                  // }
                  this_.msgs.push(data);
                  _data.push(data);
                  setTimeout(() => {
                    // window.db.updateData(localStorage.getItem('uuid'),data)
                    this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                  }, 0)
                  window.db.updateData(localStorage.getItem('uuid'),_data)
                }
              })
          }else{
            console.log('输入内容不能为空')
            this_.errorType = '输入内容不能为空'
            this_.alertShow = true
          }
        },
        //发送融云消息
        sendHumanMessage(selectMsg){
            let this_ = this
            let msg = selectMsg || this_.userText
            if(!msg){
                this_.errorType = '输入内容不能为空'
                this_.alertShow = true
                return;
            }
            if(localStorage.getItem('extra') == 'undefined'){
                // 极端情况
                let statusData = this_.checkServiceStatus()
                statusData.then(
                    function(value){
                        this_.busyText = value.data
                })
                // 客户输入答案
                this_.controlYongyunMessage = 0
                let data01 = {
                    msg: msg,
                    //src: msg,
                    self: true,
                    imgData:false,
                    zan:0,
                    overzan:1,
                    robotZan:0,
                    select:[],
                    selectposition:0,
                    whether:[],
                    whetherposition:0,
                    target:'',
                    textfold:false,//是否折叠
                    istextfold:0,//是否显示折叠控制字符
                }
                this_.msgs.push(data01)
                setTimeout(() => {
                    window.db.updateData(localStorage.getItem('uuid'),data01)
                    this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                }, 20)
                this_.greet_msg = '您好，您正在排队，请耐心等候...'
                let data02 = {
                    msg: this_.greet_msg,
                    //src: this_.greet_msg,
                    self: false,
                    imgData:false,
                    zan:0,
                    overzan:1,
                    robotZan:0,
                    select:[],
                    selectposition:0,
                    whether:[],
                    whetherposition:0,
                    target:'',
                    textfold:false,//是否折叠
                    istextfold:0,//是否显示折叠控制字符
                }
                this_.msgs.push(data02)
                setTimeout(() => {
                    window.db.updateData(localStorage.getItem('uuid'),data02)
                    this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                }, 40)
                // this_.sendMessage(msg)
                this_.userText=''
                if(this_.setIntervalTime){
                    console.log('定时器已经存在')
                }else{
                    this_.setIntervalTime = setInterval(function(){
                        this_.customerLoginer()
                    },2000)
                }
                return;
            } else{
                var extra_01 = JSON.parse(localStorage.getItem('extra')) || [];
            }
            // let extra = JSON.parse(localStorage.getItem('extra')) || [];
            console.log('发送extra的消息======')
            console.log(extra_01)
            // let extra = ["001机器人","平安机器人（单轮)",[],"0.4461427238390505","1","Dd8XeswcNlWsfQLQPXxaJP8v82r3SwuXq7FGRUENo3QwfK5Hqajwy9R8q7AOu01qxD/RIg+OQAGPPykK3oziwSVa2arE2+wOtQPyj7FdK2PpU7Fquglotg==","3","d9d4f495e875a2e075a1a4a6e1b9770f"];
            extra_01.push(localStorage.getItem('sesionId'));
            let rongYunMsg = new RongIMLib.TextMessage({content: msg,extra:extra_01});
            let conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
            let targetId=localStorage.getItem('targetId');
            console.log('targetId = ' + targetId)
            console.log('发送融云的消息 = ' + selectMsg)
            if(selectMsg.indexOf("/chat_image/") > 0){
                console.log('向融云发送图片')
            }else{
                console.log('向人工客服发送文字')
                let data = {
                    msg: msg,
                    //src: msg,
                    self: true,
                    imgData:false,
                    zan:0,
                    overzan:1,
                    robotZan:0,
                    select:[],
                    selectposition:0,
                    whether:[],
                    whetherposition:0,
                    target:'',
                    textfold:false,//是否折叠
                    istextfold:0,//是否显示折叠控制字符
                }
                this_.msgs.push(data)
                window.db.updateData(localStorage.getItem('uuid'),data)
            }
            console.log('右边聊天数组数据')
            console.log(this_.msgs)
            setTimeout(() => {
            this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
            }, 0)
            this_.userText=''
            console.log('conversationtype = ' + conversationtype)
            console.log('targetId = ' + targetId)
            console.log('rongYunMsg = ' + rongYunMsg)
            RongIMClient.getInstance().sendMessage(conversationtype, targetId, rongYunMsg, {
                onSuccess: function (message) {
                    console.log("Send successfully======");
                    console.log(message)
                },
                onError: function (errorCode, message) {
                    let info = '';
                    console.log("Send error======");
                    console.log(message)
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

                            let token = localStorage.getItem('token');
                            // 重新连接融云
                            var callback = {
                              onSuccess: function (userId) {
                                console.log("Reconnect successfully." + userId);
                              },
                              onTokenIncorrect: function () {
                                console.log('token无效');
                              },
                              onError: function (errorCode) {
                                console.log(errorcode);
                              }
                            };
                            var config = {
                              // 默认 false, true 启用自动重连，启用则为必选参数
                              auto: true,
                              // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
                              url: 'http://cdn.ronghub.com/RongIMLib-2.2.6.min.js',
                              // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
                              rate: [100, 1000, 3000, 6000, 10000]
                            };
                            RongIMClient.reconnect(token, callback, config);
                            // 初始化连接融云结束
                            if(window.show_claims_consultation == true){
                                // this_.humanButton = true, //人工客服按钮
                                // this_.humanButtonText = '理赔咨询' //人工客服显示文字
                            }
                            this_.sendHumanMessage(msg)
                            // info = x;
                            break;
                    }
                    console.log('发送失败:' + info);
                }
            })
        }
    }
}
