
// import asyncFunc from '@/common/asyncFunc' // 引入异步调用
import Qs from 'qs' // 格式化数据格式
import {IndexedDB} from "@/common/indexData"
// import random from 'vux/src/tools/number/random';
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
            humanButton:true, //人工客服按钮
            humanButtonText:'人工客服', // 人工客服显示文字
            busyText:'', // 客服繁忙提示文字
            inputImg:true, // 图片上传框
            greet_msg:window.greet_msg, // 初始化欢迎语
            aimi_name:window.aimi_name, // 机器人名称
            slogon:window.slogon, // 机器人简介
            avatar_big:window.avatar_big, // 头像大图
            avatar_small:window.avatar_small, // 头像小图
            wait_response:window.wait_response, // 等待语
            timeout_msg:window.timeout_msg, // 请求超时结束语
            qas:window.qas, // 初始化选项
            showDots:true, // 是否显示轮播圆点
            // solveProblem:'', // 是否显示已解决问题
            answerBack:'以上回答是是否解决你的问题?',
            UpDown:true, // 切换显示解决与未解决
            isImage:false, // 显示是否是图片
            list:[], // 左边图片列表
            rightList:[], // 右边图片列表
            userImageUrl:'', // 用户选择图片
            setIntervalTime:'', // 定时器
            isbutton:true, // 默认button颜色
            isOpenquestionIcon:'', //是否显示qa控制图标
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
        }
    },
    beforeRouteEnter(to, from, next){
        window.db=new IndexedDB();
        window.db.open();
        window.db._init();
        setTimeout(
            function(){
                window.db.getDataByKey(1000,1000).then(data=> {
                    console.log('从缓存中获取数据 ====== ')
                    console.log(data)
                    if(data){
                        console.log('有缓存，先加载缓存...')
                        window.msgs = data.value
                        next();
                    }else{
                        console.log('没缓存，直接加载...')
                        next();
                    }
                })
            },1000
        )
    },
    created(){
        let this_ = this
        this_.msgs = window.msgs || []

        let tokenUser =  new Promise((resolve, reject) => {
            // 客户token
            let this_ = this
            let userData = Qs.stringify({
                key: window.key
            });
            this_.axios.post(window.url+'/chat/uservice',userData)
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
        })
        tokenUser.then(
            function(value){
                console.log('获取的/chat/uservice接口返回的信息======')
                console.log(value.data)
                localStorage.setItem('uuid', value.data.uuid);
                localStorage.setItem('product_id', value.data.product_id);
                localStorage.setItem('robot_user_id', value.data.robot_user_id);
                localStorage.setItem('name', value.data.name);
                localStorage.setItem('sesionId',value.data.sesionId);
            }
        )
        //模拟测试数据开始
        // let uuid = Math.random().toString();
        // let product_id = 1;
        // let robot_user_id = 3;
        // let name = Math.random();
        // let sesionId = Math.random().toString();
        // this_.priority = 1
        // localStorage.setItem('uuid', uuid);
        // localStorage.setItem('product_id', product_id);
        // localStorage.setItem('robot_user_id', robot_user_id);
        // localStorage.setItem('name', name);
        // localStorage.setItem('sesionId',sesionId);
        // let humanDataToken = Qs.stringify({
        //     name:localStorage.getItem('name'),
        //     uuid:localStorage.getItem('uuid')
        // });
        // this_.axios.post(this_.$store.state.humanBaseUrl+'/acs/v1.0/customer_token',humanDataToken)
        // .then(result => {
        //     console.log('uuid = ' + localStorage.getItem('uuid'))
        //     localStorage.setItem('token', result.data.token);
        // })
        // // 客户查询
        // let humanDataSelect = Qs.stringify({
        //     name: localStorage.getItem('name'),
        //     uuid:localStorage.getItem('uuid'), // 客户dialog_id
        //     product_id:localStorage.getItem('product_id'), // 产品id
        //     robot_user_id:localStorage.getItem('robot_user_id') // 用户id
        // });
        // this_.axios.post(this_.$store.state.humanBaseUrl+'/acs/v1.0/before_customer_connect',humanDataSelect)
        // .then(result => {
        //     console.log('连接前查询之前状态数据 ======')
        //     console.log(result)
        //     let msg = result.data.msg
        //     if(this_.priority ==1){
        //         this_.humanButton = false
        //         if(msg='connect'){ // 自动重新链接客服 1、初始化连接时人工客服还有空位 2、客户重新连接断开后，客服未处理，继续连接
        //             this_.huamanOrRobot = true // 切换到人工客服回答
        //             this_.busyText = '' // 关闭忙碌语
        //             this_.inputImg = false // 开启图片开关
        //             localStorage.setItem('token', result.data.data.token);
        //             localStorage.setItem('extra', result.data.data.extra);
        //             localStorage.setItem('targetId', result.data.data.targetId);
        //             localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
        //             this_.customerLogin()
        //         }else if(msg='robot'){
        //             console.log('人工优先模式,之前未有过对话')
        //             this_.setIntervalTime = setInterval(() => this_.customerLoginer(),2000)
        //         }
        //     }else if(this_.priority == 2 && msg == 'connect') { // 链接客服 （机器人优先）(客户切换到人工客服)
        //         localStorage.setItem('token', result.data.data.token);
        //         localStorage.setItem('extra', result.data.data.extra);
        //         localStorage.setItem('targetId', result.data.data.targetId);
        //         localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
        //         this_.huamanOrRobot = true
        //         this_.busyText = ''
        //         this_.humanButtonText = '结束人工'
        //     }else if(this_.priority == 0){
        //         this_.huamanOrRobot = false // 发送机器人消息
        //         this_.inputImg = false // 开启图片开关
        //     }
        // })
        //模拟测试数据结束

        //判断轮播文字数组长度
        if(qas.length<7){
            this_.showDots = false
        }
        if(qas.length==0){
            this_.isOpenSwiper = false
        }
        // 初始化连接融云开始
        if(window.location.href.indexOf("test") > 0 || window.location.href.indexOf("127.0.0.1") > 0 || window.location.href.indexOf("localhost:8080") > 0 || window.location.href.indexOf("//192.168.1.16:8080") > 0 || window.location.href.indexOf("//192.168.1.127:80") > 0) {
        this_.appkey = "8w7jv4qb829cy";//82hegw5u8ytdx正式  8w7jv4qb829cy测试
        }else{
        this_.appkey = "82hegw5u8ytdx";
        }

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
                        if(message.content.content=="592b71f0-b3f8-4f64-bd45-40b35c0191af"){
                            let msg;
                            this_.inputImg = false
                            // 判断是人工客服优先模式还是机器人优先模式(1:是人工客服优先，2：是机器人优先)
                            if(this_.priority==1){
                                msg='您与人工客服的聊天已结束'
                            }else{
                                msg='您与人工客服的聊天已结束，如果您还想要人工客服服务，请继续点击人工客服按钮';
                            }
                            let data01 = {
                                msg: msg,
                                self: false,
                                zan:0,
                                imgData:false,
                            }
                            this_.msgs.push(data01)
                            setTimeout(() => {
                                window.db.updateData(1000,data01)
                                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 10)

                            let data02 = {
                                msg: '以上回答是是否解决你的问题?',
                                self: false,
                                zan:1,
                                imgData:false,
                            }
                            this_.msgs.push(data02)
                            setTimeout(() => {
                                window.db.updateData(1000,data02)
                                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 20)
                            // this_.solveProblem = true
                            if((this_.priority==1&&localStorage.getItem('robot_hosting')==0)){//客服不在线,没有托管机器人,连接客服
                                this_.humanButton = true;
                            }else{
                                this_.humanButton = false;
                            }
                        }else{
                            // this_.solveProblem = false
                            if(message.content.content.indexOf("/chat_image/")>0 && message.messageDirection!==1){
                                this_.isImage = true
                                console.log('显示融云接受到的图片，图片信息 = ' + message.content.content)
                                let data = {
                                    msg:message.content.content,
                                    src:message.content.content,
                                    self: false,//图片显示位置(左边还是右边)
                                    imgData:true,//是否显示图片
                                    zan:0
                                }
                                this_.msgs.push(data);
                                window.db.updateData(1000,data)
                            }else{
                                console.log('显示融云接受到的文字，文字信息 = ' + message.content.content)
                                let data = {
                                    msg: message.content.content,
                                    self: false,
                                    imgData:false,//是否显示图片
                                    zan:0
                                }
                                this_.msgs.push(data)
                                window.db.updateData(1000,data)
                            }
                            console.log('融云返回消息队列 ======')
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

        let tokenLogin =  new Promise((resolve, reject) => {
            // 客户token
            let humanDataToken = Qs.stringify({
                name:localStorage.getItem('name'),
                uuid:localStorage.getItem('uuid')
            });
            this_.axios.post(this_.$store.state.humanBaseUrl+'/acs/v1.0/customer_token',humanDataToken)
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
            this_.humanButton = true, //人工客服按钮
            this_.humanButtonText = '理赔咨询' //人工客服显示文字
        }

        // 客户token
        let datakey = Qs.stringify({
            key: window.key
        });
        // let this_ = this
        this_.axios.post('/chat/priority',datakey)
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
            this_.axios.post(this_.$store.state.humanBaseUrl+'/acs/v1.0/before_customer_connect',humanDataSelect)
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
    },
    mounted() {
        let this_ = this
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
　　　　　}
　　},
    methods: {
        //发送图片
        choise_file(){
            let this_ = this
            let myfile = document.getElementById('fileImg')
            console.log(myfile.files)
            let file_info = this_.$refs.file_el.files[0]
            // 使用FileReader对象预览
            let fr = new FileReader()
            // 通过fr.readAsDataURL文件的内容进行读取
            fr.readAsDataURL(file_info)
            fr.onload = function () {
                this_.userImageUrlData = this.result
                let data = {
                    msg:this_.userImageUrlData,//消息信息
                    src:this_.userImageUrlData,
                    self: true,//是否在左边显示
                    imgData:true,//是否显示图片
                    zan:0//是否显示点赞文字
                }
                this_.msgs.push(data);
                window.db.updateData(1000,data)
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
                formData.append('image_reverse',0);
            }else{
                formData.append('image_reverse',1);
            }
            this_.axios.post(this_.$store.state.humanBaseUrl+'/acs/v1.0/service_upload_image',formData)
            .then(result => {
                console.log(result.data.data)
                this_.sendHumanMessage(result.data.data)
                console.log('roy返回图片地址成功')
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
            console.log(arg)
        },
        show (index) {
            let this_ = this 
            this_.$refs.previewer[1].show(index)
        },
        //放大右边图片
        rightLogIndexChange(arg){
            console.log(arg)
        },
        rightShow (index) {
            let this_ = this 
            this_.$refs.rightpreviewer[1].show(index)
        },
        //点赞人工客服
        clickUp(index){
            let this_ = this 
            this_.msgs[index].zan = 0 
            this_.msgs[index].msg = '感谢您的反馈,我们将继续努力'
            let solveData={
                salve: '已解决',
                uuid:localStorage.getItem('uuid'), // 客户dialog_id
                customer_token: localStorage.getItem('token')
            }
            this_.axios.post(this_.$store.state.humanBaseUrl+'/acs/v1.0/customer_solve',solveData)
            .then(result => {
                console.log('点赞成功')
                this_.UpDown = false
            })
        },
        //踩人工客服
        clickDown(index){
            let this_ = this 
            this_.msgs[index].zan = 0 
            this_.msgs[index].msg = '感谢您的反馈,我们将继续努力'
            let noSolveData={
                salve: '未解决',
                uuid:localStorage.getItem('uuid'), // 客户dialog_id
                customer_token: localStorage.getItem('token')
            }
            this_.axios.post(this_.$store.state.humanBaseUrl+'/acs/v1.0/customer_solve',noSolveData)
            .then(result => {
                console.log('踩成功')
                this_.UpDown = false
            })
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
        this_.axios.post(this_.$store.state.humanBaseUrl+'/acs/v1.0/customer_login',humanDataLogin)
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
                    this_.setIntervalTime = setInterval(function(){
                        this_.customerLoginer()
                    },2000)
                } else if(this_.priority == 2){
                    this_.inputImg = false
                    this_.humanButton = true
                    this_.busyText = result.data.data
                    console.log('机器优先模式')
                }            
                this_.msgs.push({
                    msg: msg,
                    self: false,
                    imgData:false,
                    zan:0
                });
                console.log(this_.msgs)
                console.log(window.db)
                window.db.addData({'id':1000,'value':this_.msgs})
                setTimeout(() => {
                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                }, 0)
            } else if(result.data.msg == "connect") {
                console.log('客户连接人工客服成功')
                this_.busyText = ''
                this_.inputImg = true
                this_.huamanOrRobot = true
                localStorage.setItem('token', result.data.data.token);
                localStorage.setItem('extra', result.data.data.extra);
                localStorage.setItem('targetId', result.data.data.targetId);
                localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
                let msg = result.data.data.welcome_words;
                console.log('欢迎语 = ' + result.data.data.welcome_words)
                this_.msgs.push({
                    msg:  msg,
                    self: false,
                    zan:0,
                    imgData:false
                });
                window.db.addData({'id':1000,'value':this_.msgs})
                clearInterval(this_.setIntervalTime)
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
            this_.axios.post(this_.$store.state.humanBaseUrl+'/acs/v1.0/customer_login',humanDataLogin)
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
                    console.log('机器优先模式')
                    this_.msgs.push({
                        msg: msg,
                        self: false,
                        imgData:false,
                        zan:0
                    });
                    window.db.addData({'id':1000,'value':this_.msgs})
                    setTimeout(() => {
                    this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                    }, 0) 
                }            
            } else if(result.data.msg == "connect") {
                this_.busyText = ''
                this_.inputImg = true
                this_.huamanOrRobot = true
                localStorage.setItem('token', result.data.data.token);
                localStorage.setItem('extra', result.data.data.extra);
                localStorage.setItem('targetId', result.data.data.targetId);
                localStorage.setItem('extra', JSON.stringify(result.data.data.extra));
                console.log('欢迎语' + result.data.data.welcome_words)
                // let msg = result.data.data.welcome_words;
                this_.msgs.push({
                    msg:  result.data.data.welcome_words,
                    self: false,
                    zan:0,
                    imgData:false
                });
                window.db.addData({'id':1000,'value':this_.msgs})
                setTimeout(() => {
                    this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                }, 0)
                clearInterval(this_.setIntervalTime)
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
        },
        //发送选项框消息
        select(msg){
            let this_ = this
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
                this_.axios.post(this_.$store.state.humanBaseUrl+'/acs/v1.0/customer_login',humanDataLogin)
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
                                self: true,
                                imgData:false,
                                zan:0
                            }
                            this_.msgs.push(data01)

                            setTimeout(() => {
                                window.db.updateData(1000,data01)
                                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 10)

                            this_.greet_msg = this_.loginStatus.data
                            let data02 = {
                                msg: this_.greet_msg,
                                self: false,
                                imgData:false,
                                zan:0
                            }
                            this_.msgs.push(data02)

                            setTimeout(() => {
                                window.db.updateData(1000,data02)
                                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 20)
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
                            this_.inputImg = true
                            this_.sendHumanMessage(inputMsg)
                        }else if(this_.huamanOrRobot==false || this_.loginStatus.robot_hosting == 1){
                            console.log('发送机器人消息1')
                            this_.inputImg = false
                            this_.sendRobotMessage(inputMsg)
                        }else{
                            this_.greet_msg = '您好，所有人工坐席不在线，您可以拨打企保科技的客服热线：XXXXXX咨询'
                            // 客户输入答案
                            
                            let data01 = {
                                msg: inputMsg,
                                self: true,
                                imgData:false,
                                zan:0
                            }
                            this_.msgs.push(data01)
                            setTimeout(() => {
                                window.db.updateData(1000,data01)
                                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 10)

                            let data02 = {
                                msg: this_.greet_msg,
                                self: false,
                                imgData:false,
                                zan:0
                            }
                            this_.msgs.push(data02)
                            setTimeout(() => {
                                window.db.updateData(1000,data02)
                                this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                            }, 20)
                            this_.userText=''
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
                // 客户输入答案
                this_.msgs.push({
                    msg: this_.userText || selectItem,
                    self: true,
                    imgData:false,
                    zan:0
                })
                this_.userText=''
                this_.axios.post(window.send_url,robotData)
                .then(result => {
                    console.log('机器人获取答案成功')
                    if(result.data.hasOwnProperty("iv") && result.data.iv) {
                        var json = decrypt((result.data.msg), window.skey,result.data.iv).replace("aimi", window.aimi_name).replace("AIMI", window.aimi_name);
                        result.msg = JSON.parse(json);
                    }
                    let data = {
                        msg: result.msg.data[0],
                        self: false,
                        imgData:false, //暂时false
                        zan:1
                    }
                    this_.msgs.push(data);
                    window.db.updateData(1000,data)
                    setTimeout(() => {
                    this_.$refs.chattingContent.scrollTop = this_.$refs.chattingContent.scrollHeight
                    }, 0)
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
            
            let extra = JSON.parse(localStorage.getItem('extra')) || [];
            console.log('发送extra的消息======')
            console.log(extra)
            // let extra = ["001机器人","平安机器人（单轮)",[],"0.4461427238390505","1","Dd8XeswcNlWsfQLQPXxaJP8v82r3SwuXq7FGRUENo3QwfK5Hqajwy9R8q7AOu01qxD/RIg+OQAGPPykK3oziwSVa2arE2+wOtQPyj7FdK2PpU7Fquglotg==","3","d9d4f495e875a2e075a1a4a6e1b9770f"];
            extra.push(localStorage.getItem('sesionId'));
            let rongYunMsg = new RongIMLib.TextMessage({content: msg,extra:extra});
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
                    self: true,
                    imgData:false,
                    zan:0,
                }
                this_.msgs.push(data)
                window.db.updateData(1000,data)
            }
            console.log('左边聊天数组数据')
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
                            info = x;
                            break;
                    }
                    console.log('发送失败:' + info);
                }
            })
        }
    }
}