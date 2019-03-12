var name="";
var uuid="";
var product_id="";
var robot_user_id="";
var token="";
var targetId="";
var timestamp = "";
var disconnect = true;
//var roy_domain="http://172.16.2.59:8888"
//var roy_domain = "http://chat.qb-tech.net";
//var roy_domain = "http://test.chat.qb-tech.net";
var environment = "http://open.qb-tech.net";
var appkey = "82hegw5u8ytdx";
if(window.location.href.indexOf("test") > 0){
	var roy_domain = "http://test.chat.qb-tech.net";
	environment ='http://test.open.qb-tech.net';
	appkey = "8w7jv4qb829cy";
}

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
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=localStorage.getItem(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
$(function () {
//  var appkey = "82hegw5u8ytdx";//82hegw5u8ytdx  8w7jv4qb829cy
    RongIMLib.RongIMClient.init(appkey);
    // 设置连接监听状态 （ status 标识当前连接状态 ）
    // 连接状态监听器
    RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
            switch (status) {
                case RongIMLib.ConnectionStatus.CONNECTED:
                	targetId=localStorage.getItem('targetId');
                	$.ajax({
                		type:"post",
                		url: roy_domain + "/acs/v1.0/customer_connect_success",
						async:true,
						data:{'uuid':uuid,'name':name,'product_id':product_id,'robot_user_id':robot_user_id,'service_id':targetId},
                		async:true,
                		success:function(data){
                			
                		}
                	});
                	timestamp=Date.parse(new Date())
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
            switch (message.messageType) {
                case RongIMClient.MessageType.TextMessage:
                    // message.content.content => 消息内容
					console.log(message);
					// clearInterval(intervalId);//清除定时器
                    if(message.messageDirection==1){
                    	return false;
                    }
					var msg=""
					if(message.content.content=="592b71f0-b3f8-4f64-bd45-40b35c0191af"){
						if(priority==1){
							msg='您与人工客服的聊天已结束'
						}else{
							msg='您与人工客服的聊天已结束，如果您还想要人工客服服务，请继续点击人工客服按钮';
						}

						$('.artificial_service').html("人工客服");
						$('.artificial_service').removeClass('active');
						$('.send-type').removeClass('active')
						artificial_service=false;
						if((priority==1&&localStorage.getItem('robot_hosting')==0)){//客服不在线,没有托管机器人,连接客服
							artificial_service = true;
						}else{
							artificial_service = false;
							is_robot_hosting = true;
						}
						$('.send-type').removeClass('active');
						clearConversation();
						//var msg='您与人工客服的聊天已结束，如果您还想要人工客服服务，请继续点击人工客服按钮'
						$('.aside-wrapper>span').text("");
						var s = '<div class="left">';
					        s += '<div class="text1">';
					        s += '<div><img src="' + res_url + '/img/aimi.png"></div>';
					        s += '<div class="radius">';
					        s += msg;
					        s += '</div>';
					    	s += '</div>';
					    	s += '</div>';
				    	$(".scroll").append(s);
				    	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
					    	
		                $('.scroll').append(zan1('custom_service',message.content.extra[5],false))
						$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
						try {
		                    updateDataByKey(myDB.db, 'data', robot_url, [msg, 'aimi']);
		                    updateDataByKey(myDB.db, 'data', robot_url, [zan1('custom_service',message.content.extra[5]), 'comment']);
		                } catch (e) {
		
		                }
					}else{
						msg=message.content.content
						if(msg.indexOf(environment+"/chat_image/")==0){
							var img= new Image();
							img.src=msg;
							img.onload=function () {
								var width=this.width;
								var height=this.height;
								var temp=width+"x"+height; 
								msg='<div class="imgshow" data-pswp-uid="1">';
								msg+='<figure>';
								msg+='<div class="img-dv">';
								msg+='<a style="position: static;" index="1" href="'+message.content.content+'" data-size="'+temp+'"><img src="'+message.content.content+'"></a>';
								msg+='</div>';
								msg+='</figure>';
								msg+='</div>';
								var s = '<div class="left">';
						        s += '<div class="text1">';
						        s += '<div><img src="' + res_url + '/img/aimi.png"></div>';
						        s += '<div class="radius active">';
					        	s += msg;
					        	s += '</div>';
						    	s += '</div>';
						    	s += '</div>';
						    	$(".scroll").append(s);
						    	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
						    	query();
					    		try {
				                    updateDataByKey(myDB.db, 'data', robot_url, [s, 'picture']);
				                } catch (e) {
				
				                }
							}
						}else{
							var s = '<div class="left">';
					        s += '<div class="text1">';
					        s += '<div><img src="' + res_url + '/img/aimi.png"></div>';
					        s += '<div class="radius">';
				        	s += msg;
				        	s += '</div>';
					    	s += '</div>';
					    	s += '</div>';
					    	$(".scroll").append(s);
					    	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
					    	query();
				    		try {
			                    updateDataByKey(myDB.db, 'data', robot_url, [msg, 'aimi']);
			                } catch (e) {
			
			                }
						}
					}
					
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
});
function sessionTextMessage() {
    RongIMClient.getInstance().getConversationList({
        onSuccess: function (list) {
            console.log(list);
            $('#sessionMessage').empty();
            for (var i=0;i<list.length;i++)
            {
                $("#sessionMessage").append("<li>"+ list[i].targetId + ':' +list[i].unreadMessageCount+list[i].latestMessage.messageDirection+list[i].unreadMessageCount+list[i].latestMessage.content.content+ "</li>");
            }
        },
        onError: function (error) {
            // do something...
        }
    }, null);

}
function startConnect(msg){
    	name=localStorage.getItem('name');
    	uuid=localStorage.getItem('uuid');
		product_id=localStorage.getItem('product_id');
	 	robot_user_id=localStorage.getItem('robot_user_id');
	 	token=localStorage.getItem('token');
	    RongIMClient.connect(token, {
	        onSuccess: function (userId) {
	        	disconnect = false;
	        	if(msg){
		            sendTextMessage(msg);
	        	}
	            console.log("Connect successfully." + userId);
//	            setInterval( sessionTextMessage, 1000 );
	        },
	        onTokenIncorrect: function () {
	            console.log('token无效');
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
	            console.log(errorCode);
	        }
	    });
	}    


function sendTextMessage(m) {
	var extra = JSON.parse(localStorage.getItem('extra'));
	extra.push(localStorage.getItem('sesionId'));
	if(m=="592b71f0-b3f8-4f64-bd45-40b35c0191af"){
        $.ajax({
			type:"post",
			url: roy_domain + "/acs/v1.0/customer_logout",
			async:true,
			data:{'uuid':uuid,'name':name,'product_id':product_id,'robot_user_id':robot_user_id,'service_id':targetId},
			success:function(data){
				clearConversation();
				var msg=''
				if(priority==1){
					msg='您与人工客服的聊天已结束'
				}else{
					msg='您与人工客服的聊天已结束，如果您还想要人工客服服务，请继续点击人工客服按钮';
				}
				$('.aside-wrapper>span').text("");
				var s = '<div class="left">';
			        s += '<div class="text1">';
			        s += '<div><img src="' + res_url + '/img/aimi.png"></div>';
			        s += '<div class="radius">';
			        s += msg;
			        s += '</div>';
			    	s += '</div>';
			    	s += '</div>';
			    	$(".scroll").append(s);
			    	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	            $('.scroll').append(zan1('custom_service',token))
	            $('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	            try {
	                updateDataByKey(myDB.db, 'data', robot_url, [msg, 'aimi']);
	                updateDataByKey(myDB.db, 'data', robot_url, [zan1('custom_service',token), 'comment']);
	            } catch (e) {
					
	            }
			}
		})
        var msg = new RongIMLib.TextMessage({content: m,extra:extra});
	    var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
	    targetId=localStorage.getItem('targetId');
	    RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
	        onSuccess: function (message) {
	       		
	       	}	
	    })    
	    
	}else{
		m=m.url ? m.url : m;
		var msg = new RongIMLib.TextMessage({content: m,extra:extra });
	    var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
	    targetId=localStorage.getItem('targetId');
	    var success = false;
	    RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
	        onSuccess: function (message) {
	        	if(!(m.indexOf(environment)==0)){
	        		console.log("Send successfully");
		        	$(".scroll").append("<div class='right'><div class='text'><div>" + m + "</div></div></div>");
					$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
					try {
		                updateDataByKey(myDB.db, 'data', robot_url, [m, ['user']]);
		            } catch (e) {
		
		            }
	        	}
	        },
	        onError: function (errorCode, message) {
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
	            console.log('发送失败:' + info);
	        }
	   });
    
	}
    
}
function clearConversation() {
    RongIMClient.getInstance().removeConversation(RongIMLib.ConversationType.PRIVATE,targetId, {
      onSuccess:function(){
      	console.log('清除会话成功');
      	disconnect = true;
      	//if(msg=="关闭客户会话,RongIMClient.getInstance().logout()"){
      	RongIMClient.getInstance().logout()
      	//}
        // 清除会话成功
      },
      onError:function(error){
        // error => 清除会话错误码。
      }
    });
}
function deleateconnect() {
    RongIMClient.getInstance().logout()
}

$(document).on("click",".s-button",function(event){
	console.log(event)
	$(".tableAnswer tr").removeAttr("style");
	if(event.target.innerHTML == '展开'){
		$(".tableAnswer tr").removeAttr("style");
		event.target.innerHTML = '收起'
	}else{
	 event.target.innerHTML = '展开'
	 $(".tableAnswer tr:gt(1)").css("display","none");
	}
})
