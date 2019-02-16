var res_url = '/insurebotaimi/';
var send_url = '';
var feedback_url = '';
var greet_msg = '我是AImi';
var wait_response = '稍等';
var key = '';
var skey = '';
var avatar_small = '';
var aimi_name = 'Jarvis';

var artificial_service = false;
var is_robot_hosting = false;
var custom_service_not_line = false;
var huize = false;
var is_connect = false;
var artificial_service = false
//var roy_domain = "http://172.16.3.148:8888";
var roy_domain = "http://chat.qb-tech.net";

if(window.location.href.indexOf("test") > 0){
	roy_domain = "http://test.chat.qb-tech.net";
}

var myDB={
	name:'record',
	version:1,
	db:null
}
var result;
var flag=true;
openDB(myDB.name,myDB.version); 
var robot_url=window.location.href;
function zan(type,target,isLine) {
	var temp=""
	if(isLine){
		temp = '<hr/>';
	}
    temp += '<div class="questionnaire">';
    temp += '<p>以上回答是否解决您的问题?</p>';
    temp += '<div class="questionnaire-content">';
    temp += '<div class="feedback yes" data-target="' + target + '" data-type="'+ type +'">';
    temp += '<span class="icon"></span>';
    temp += '<span class="desc">是,已解决</span>';
    temp += '</div>';
    temp += '<div class="feedback no"  data-target="' + target + '" data-type="'+ type +'">';
    temp += '<span class="icon"></span>';
    temp += '<span class="desc">否,未解决</span>';
    temp += '</div>';
    temp += '</div>';
    temp += '</div>';
    temp += '<div class="retroaction">';
    temp += '<p><span class="flower"></span><span>感谢您的反馈,我们将继续努力</span></p>';
    temp += '</div>';
    return temp;
}
function zan1(type,uuid){
	var temp ='<div class="left">';
	temp += '<div class="text1">';
	temp += '<div>';
	temp += '<img src="/img/aimi.png">';
	temp += '</div>';
	temp += '<div class="radius">'
	temp += zan(type,uuid,false);
	temp += '</div>';
	temp += '</div>';
	temp += '</div>';
	return temp;
}	

setTimeout(function(){
	try{
		getDataByKey(myDB.db,'data',robot_url,compute);
	}catch(e){
		$('.aimi-message').show();
		$(".scroll").append('<div class="left"><div class="text1"><div><img src="' + res_url + '/img/aimi.png"/></div>'
							+'<div class="radius"><div class="typing_loader"></div></div></div></div>');
		setTimeout(function(){
			$(".radius .typing_loader").remove();
	        $(".left .text1 .radius").eq(-1).text(greet_msg);
	        
	        $('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	        
	        var value={
				'name':robot_url,
				'data':[[greet_msg,'aimi']]
			}
			addData(myDB.db,'data',value);
			result=' ';
		},2000)
	}
	
},2000)
var length;
function compute(x) {
	result=x;
	if(result!=undefined){
		var text='';
		$('.aimi-message').show();
		$('.aimi-message').show();
		$(".scroll").append('<div class="left"><div class="text1"><div><img src="' + res_url + '/img/aimi.png"/></div>'
							+'<div class="radius">你好，我是智能保险官Aimi，您可以直接向我咨询，也可以通过上方的快速按钮启动事项办理哦~</div></div></div>');
		
		for(var i=0;i<result.data.length;i++){
			if(result.data[i][1]!=undefined&&result.data[i][1]=='aimi'){
				var str =	'<div class="left">';
					str +=	'<div class="text1">';
					str +=	'<div><img src="' + res_url + '/img/aimi.png"></div>';
					str +=	'<div class="radius">'+result.data[i][0]+'</div>';
					str +=	'</div>';
					str +=	'</div>';
					text=text+str;
			}else if(result.data[i][1]!=undefined&&result.data[i][1]=='user'){
				var str ="<div class='right'>";
					str +="<div class='text'>";
					str +="<div>"+result.data[i][0]+"</div>";
					str +="</div>";
					str +="</div>";
					text=text+str;
			}else if(result.data[i][1]!=undefined&&result.data[i][1]=='comment'){
				text=text+result.data[i][0];
			}
		}
		$(".scroll").append(text);
		$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
		$('.all-fix').css('position','absolute')
//		if(uuid&&product_id&&robot_user_id&&name){
//			artificial_service=true;
//			flag=false;
//			$('.artificial_service').click();
//		}
	}else{
		$('.aimi-message').show();
		$(".scroll").append('<div class="left"><div class="text1"><div><img src="' + res_url + '/img/aimi.png"/></div>'
							+'<div class="radius"><div class="typing_loader"></div></div></div></div>');
		
		setTimeout(function(){
			$(".radius .typing_loader").remove();
			//if(!(uuid&&product_id&&robot_user_id&&name)){
				$(".left .text1 .radius").eq(-1).text(greet_msg)
			//}	
	        
	        $('.all-fix').css('position','absolute')
	        $('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	        var value={
				'name':robot_url,
				'data':[[greet_msg,'aimi']]
			}
		},2000)
//		if(uuid&&product_id&&robot_user_id&&name){
//			artificial_service=true;
//			flag=false;
//			$('.artificial_service').click();
//		}
		
	}
	
}
$('.aimi .chat').removeClass('active');
$('.aimi .wrapper').css('height',$(".aimi .chat").height()-$('.all-fix').height());
$('.scroll').css('overflow',"scroll")

$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
setTimeout(function(){
	$(".aimi .left").css({"opacity":"1"});
	
	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
},1000);
var timer;
//Android软键盘
$(window).resize(function(){
	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
})  
//
////页面滚动，软键盘消失
function _touch(){
    var startx;//让startx在touch事件函数里是全局性变量。
    var endx;
    var el=document.getElementsByClassName('chat')[0];
    function cons(){   
		if(starty&&endy){
            $(".input input").blur();
        }
            
    }
    el.addEventListener('touchstart',function(e){
        var touch=e.changedTouches;
        startx=touch[0].clientX;
        starty=touch[0].clientY;
    });
     el.addEventListener('touchend',function(e){
         var touch=e.changedTouches;
             endx=touch[0].clientX;
              endy=touch[0].clientY;
              cons();
   });
}
_touch()
////监听input输入框
////$(".input input").attr("propertychange", "ValChange()");
////ValChange=function(){
//	//input propertychange
$('.input input').bind('input propertychange', function() {
    if($.trim($(this).val()).length >0){
    	$(".send").addClass("blue");
    }else{
    	$(".send").removeClass("blue");
    }
});
//function OnInput(event){
//	if($.trim($(this).val()).length >0){
//  	alert(1)
//  }else{
//  	alert(2)
//  }
//}
////}
var html="";
html +='<div class="left">';
html += '<div class="text1">';
html += '<div><img src="' + res_url + '/img/aimi.png"/></div>';
html += '<div class="radius"><div id="spinners">';
html +=	'<div class="mop-load-div"><div class="mop-css-6 three-bounce"><div class="bounce1"></div>';
html += '<div class="bounce2"></div><div class="bounce3"></div></div></div></div>' + wait_response + '</div>';
html += '</div>';
html += '</div>';
html += '</div>';
var timer_=""
function send(msg) {
    //记录当前时间
    if ($(".send").is(".blue")) {
    	if(artificial_service){
    		sendTextMessage(msg);
    		$(".send").removeClass("blue");
//  		clearInterval(timer_);
//          timer_ = setInterval(function () {
//              $('.artificial_service').click();
//              clearInterval(timer_);
//          }, 1800000);
            
    	}else{
	        if (msg !== '系统自动结束本轮对话，请确认' || person == true) {
	            person = false;
	            $(".scroll").append("<div class='right'><div class='text'><div>" + msg + "</div></div></div>");
	            $('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	            if (result == undefined) {
	                var value = {
	                    'name': robot_url,
	                    'data': [[msg, 'user']]
	                }
	                try {
	                    addData(myDB.db, 'data', value);
	                } catch (e) {
	
	                }
	                result = '';
	            } else {
	                try {
	                    updateDataByKey(myDB.db, 'data', robot_url, [msg, ['user']]);
	                } catch (e) {
	
	                }
	            }
	        }
	        $(".input input").val(" ");
	        $(".send").removeClass("blue");
	        
	        $('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	        $(".scroll").append(html);
	        
	        $('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	
	       $.post(send_url, {'dialog_id': '1', 'msg': msg, 'key': key, 'claims_consultation': (claims_consultation ? 'open' : 'close')}, function (data) {
	            //var data={"msg":{"data":["\u60a8\u6240\u63cf\u8ff0\u7684\uff08\u5fc3\u810f\u75c5\uff09\u5728\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u56e0\u4fdd\u5355\u8fd8\u6709\u5176\u4ed6\u7ea6\u5b9a\u4e8b\u9879\uff0c\u4e3a\u4e86\u66f4\u51c6\u786e\u5730\u5224\u65ad\u80fd\u5426\u83b7\u5f97\u8d54\u4ed8\uff0c\u60a8\u53ef\u4ee5\u8bd5\u7740\u63d0\u4f9b\u66f4\u591a\u7684\u4fe1\u606f\u3002","\u8bf7\u544a\u8bc9\u6211\u60a8\u60f3\u8981\u7406\u8d54\u7684\u8d39\u7528\u9879\u76ee\uff08\u5982\u8eab\u6545\u8d54\u507f\u91d1\u3001\u6b8b\u75be\u8d54\u507f\u91d1\u3001\u4f4f\u9662\u6d25\u8d34\u3001\u533b\u7597\u8d39\u3001\u68c0\u67e5\u8d39\u7b49)\u3002"]}};
	            //var data={"msg":{"data":["\u60a8\u6240\u63cf\u8ff0\u7684\uff08\u68c0\u67e5\u8d39\uff09\u5728\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u56e0\u4fdd\u5355\u8fd8\u6709\u5176\u4ed6\u7ea6\u5b9a\u4e8b\u9879\uff0c\u4e3a\u4e86\u66f4\u51c6\u786e\u5730\u5224\u65ad\u80fd\u5426\u83b7\u5f97\u8d54\u4ed8\uff0c\u60a8\u53ef\u4ee5\u8bd5\u7740\u63d0\u4f9b\u66f4\u591a\u7684\u4fe1\u606f\u3002","\u8bf7\u5b8c\u6574\u8bf4\u660e\u6b64\u6b21\u5c31\u8bca\u7684\u533b\u7597\u673a\u6784\u662f\u54ea\u5bb6\uff1f"]}};
	            //var data={"msg":{"data":{"data":["\u60a8\u63d0\u53ca\u533b\u7597\u673a\u6784\u540d\u79f0\u53ef\u80fd\u6709\u8bef\u6216\u4e0d\u5b8c\u6574\uff0c\u8bf7\u51c6\u786e\u9009\u62e9\u662f\u4ee5\u4e0b\u54ea\u5bb6\u533b\u7597\u673a\u6784\u6216\u6839\u636e\u5c31\u8bca\u6750\u6599\u6838\u5b9e\u518d\u6b21\u8f93\u5165\u6b63\u786e\u7684\u533b\u7597\u673a\u6784\u5168\u79f0"],"select":["\u6df1\u5733\u5e02\u4e2d\u533b\u9662","\u6df1\u5733\u5e02\u773c\u79d1\u533b\u9662","\u6df1\u5733\u5e02\u513f\u7ae5\u533b\u9662","\u6df1\u5733\u5e02\u5eb7\u5b81\u533b\u9662","\u6df1\u5733\u6d41\u82b1\u533b\u9662"]}}}
	            //var data={"msg":{"data":["\u60a8\u6240\u63cf\u8ff0\u7684\uff08\u6df1\u5733\u5e02\u4e2d\u533b\u9662\uff09\u5728\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u56e0\u4fdd\u5355\u8fd8\u6709\u5176\u4ed6\u7ea6\u5b9a\u4e8b\u9879\uff0c\u4e3a\u4e86\u66f4\u51c6\u786e\u5730\u5224\u65ad\u80fd\u5426\u83b7\u5f97\u8d54\u4ed8\uff0c\u60a8\u53ef\u4ee5\u8bd5\u7740\u63d0\u4f9b\u66f4\u591a\u7684\u4fe1\u606f\u3002","\u60a8\u597d\uff0c\u6839\u636e\u60a8\u7684\u9648\u8ff0\uff0c\u8be5\u8d39\u7528\u5728\u672c\u4fdd\u9669\u65b9\u6848\u7684\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u53ef\u4ee5\u7406\u8d54\u3002\u8bf7\u95ee\u662f\u5426\u9700\u8981\u6d4b\u7b97\u53ef\u4ee5\u7406\u8d54\u7684\u91d1\u989d\uff1f\u8bf7\u76f4\u63a5\u56de\u590d\u201c\u662f\u201d\u6216\u201c\u5426\u201d"],"select":["\u662f","\u5426"]}}
	            //var data={"msg":{"data":["\u60a8\u597d\uff0c\u8bf7\u60a8\u6309\u7167\u201c\u8d39\u7528\u79d1\u76ee+\u91d1\u989d\u201d\u7684\u683c\u5f0f\u51c6\u786e\u5217\u51fa\u9700\u8981\u8ba1\u7b97\u7684\u5168\u90e8\u8d39\u7528\uff0c\u4ee5\u201c\u3001\u201d\u9694\u5f00\u3002\u5982\uff1a\u624b\u672f\u8d39+10000\u3001\u5e8a\u4f4d\u8d39+5000"]}}
	            //var data={"msg":{"data":["\u60a8\u597d\uff0c\u6839\u636e\u60a8\u7684\u8d39\u7528\u660e\u7ec6\uff0c\u5e8a\u4f4d\u8d39\u5728\u4fdd\u969c\u8303\u56f4\u5185,\u5728\u4fdd\u969c\u8303\u56f4\u5185\u7684\u7d22\u8d54\u91d1\u989d\u4e3a400.0\u5143\uff0c\u8003\u8651\u514d\u8d54\u989d\uff0c\u8d54\u507f\u9650\u989d\uff0c\u8d54\u4ed8\u6bd4\u4f8b\u7b49\u56e0\u7d20\u540e\uff0c\u6d4b\u7b97\u51fa\u672c\u6b21\u8d54\u507f\u91d1\u989d\u4e3a400.0\u5143\u3002\u82e5\u9700\u518d\u6b21\u8ba1\u7b97\uff0c\u8bf7\u8f93\u5165\"\u91cd\u65b0\u8ba1\u7b97\"\u6216\"\u7ed3\u675f\"\u6765\u7ed3\u675f\u672c\u8f6e\u5bf9\u8bdd\u3002"]}}
				//var data={"msg":{"data":["\u6309\u60a8\u7684\u8981\u6c42\uff0c\u672c\u8f6e\u5bf9\u8bdd\u7ed3\u675f\u3002\u82e5\u6709\u65b0\u7684\u60c5\u51b5\u54a8\u8be2\uff0c\u8bf7\u91cd\u65b0\u5f00\u59cb\u63d0\u95ee \"XXX\u4fdd\u4e0d\u4fdd\""]}}
	          //var data ={"msg":{'data':
		      //['这个问题啊，我会哦\n', '本员工福利保险为包含了意外、重疾、医疗在内的综合性保险方案，主要保障及限额如下：\n1、意外伤害：80万元\n2、意外医疗：1万元\n3、住院津贴：100元/天\n4、疾病身故：30万元\n5、重大疾病：30万元\n6、门诊医疗：2000元\n7、补充住院医疗：1万元\n8、公共交通工具意外伤害：飞机100万元、火车50万元、汽车50万元、轮船50万元\n注：以上为层级三员工福利方案，其他层级实际承保保额以保单为准，请与HR确认相关信息。','9999999999','给AIMI回复以下序号可回复问题：'],
		//'select': ['本产品的生效时间是哪一天？', '本产品该如何申请理赔？', '该如何续保本产品？', '本产品有免赔额/率嘛？', '本产品对受益人的要求？','12345']}}
	            if (data.iv) {
	                var json = decrypt((data.msg), skey, data.iv);
	                data.msg = $.parseJSON(json);
	            }
	            if (data.msg.data instanceof Array) {
			    	if(data.msg.data.length>0){
			    		var data_ = data.msg.data;
			    		var last="";
			    		for(var i=0;i<data_.length;i++){
			    			var temp = "";
			    			//if(data_[i].length)
			    			temp += data_[i].replace( /([0-9]{5,15})/g,"<a href='tel:"+"$&"+"'>"+"$&"+"</a>");
			    			if(i==data_.length-1){
			    				last=data_[i];
			    				if(data.msg.select!=undefined){
			        				temp += "</br>";
			        				for (var m = 0; m < data.msg.select.length; m++) {
			                            temp += "<a class='option'>" + data.msg.select[m] + "</a></br>";
			                            last += "<a class='option'>" + data.msg.select[m] + "</a></br>";
			                        }
			        			}
			    				if(!claims_consultation||!artificial_service){
			        				temp += zan('robot',data.target,true);
			        			}
			    				
			    			}
			    			if(i==0&&msg != '系统自动结束本轮对话，请确认'){
			    				$(".left .text1 .radius").eq(-1).html(temp);
			    			}else{
				    			(function(i){
				    				var str = '<div class="left">';
				                    str += '<div class="text1">';
				                    str += '<div><img src="' + res_url + '/img/aimi.png"></div>';
				                    str += '<div class="radius">';
				                    str += temp;
				                    str += '</div>';
				                	str += '</div>';
				                	str += '</div>';
				    				setTimeout(function () {
				                        $(".scroll").append(str);
				                        $('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
				                    }, 1000);
				                })(i)    
			    			}
			    			
			    			try {
			    				if(last.length!=0){
			    					temp = last;
			    				}
			                	updateDataByKey(myDB.db, 'data', robot_url, [temp, 'aimi']);
			                	
			                } catch (e) {
			
			                }
			    		}
			    	}
	            } else {
	            	if(data.msg.data.data){
	            		var data_=data.msg.data.data;
	            		for(var i=0;i<data_.length;i++){
	            			var temp="";
	            			temp += data_[i];
			    			if(i==data_.length-1){
			    				if(!claims_consultation ||! artificial_service){
			        				temp += zan('robot',data.target,true);
			        			}
			    				if(data.msg.data.select!=undefined){
			        				temp += "</br>"; 
			        				for (var m = 0; m < data.msg.select.length; m++) {
			                            temp += "<a class='option'>" + data.msg.select[m] + "</a></br>";
			                        }
			        			}
			    			}
			    			if(i==0||msg != '系统自动结束本轮对话，请确认'){
			    				$(".left .text1 .radius").eq(-1).html(temp);
			    			}else{
			    				var str = '<div class="left">';
			                    str += '<div class="text1">';
			                    str += '<div><img src="' + res_url + '/img/aimi.png"></div>';
			                    str += '<div class="radius">';
			                    str += temp;
			                    str += '</div>';
			                	str += '</div>';
			                	str += '</div>';
			    				setTimeout(function () {
			                        $(".scroll").append(str);
			                        $('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
			                    }, 500);
			    			}
			    			
			    			try {
			                	updateDataByKey(myDB.db, 'data', robot_url, [temp, 'aimi']);
			                	
			                } catch (e) {
			
			                }
	            		}
	            	}
	                
	            }
	            if (data.msg.is_dialog == 1) {
	                clearInterval(timer);
	                timer = setInterval(function () {
	                    $('.send').addClass('blue');
	                    send('系统自动结束本轮对话，请确认');
	                }, 300000);
	            } else if (data.msg.is_dialog == 0) {
	                clearInterval(timer);
	            }
	            $('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	            query();
	        }, 'json');
	    }
    }	
}
//
var person=false;
//发送消息
$(document).on("click",'.send',function(){
	var msg = $(".input input").val();
	$(".input input").val("");
	person=true;
	send(msg);	
})
//
//enter键发送
function KeyDown(event){
	if (event.keyCode == 13){
		var msg = $(".input input").val();
	    person=true;
	    send(msg);
	    $('.input input').val("");
	}
}
//继续提问
$(".continue").click(function(){
	$(".end").hide();
	
	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
})
//
$(".aimi .alert").click(function(e){
	var prop=$('.aimi .alert>div')[0];
    if (e.target!= prop &&!$.contains(prop, e.target)){
    	$(".aimi .alert>div").stop(true, false).slideUp();;
    	$(".aimi .alert").hide();
    }
})
//发送消息
$(document).on("click", '.feedback', function () {
	var data_type = $(this).data('type');
	var target = $(this).data('target');
	if(data_type=="robot"){
	    var type = 0;
	    if ($(this).hasClass('yes')) {
	        type = 1;
	    }
	    $.post(feedback_url, {'target': target, 'type': type}, function (data) {
	    }, 'json');
	}else{
		var solve = "未解决";
		if ($(this).hasClass('yes')) {
	        solve = "已解决"
	    }
		$.post(roy_domain+"/acs/v1.0/customer_solve",{'customer_token':target,'solve':solve,'uuid':uuid})
		

	}	
    
})
////提示
$(".prompt").click(function(e){
	e.stopPropagation();
	if($(".aimi .alert").is(":hidden")){
		$(".aimi .alert").show();
		$(".aimi .alert>div").stop(true, false).slideDown();;
		
	}else{
		$(".aimi .alert>div").stop(true, false).slideUp();;
		$(".aimi .alert").hide();
	}
})
$(document).on("click",".choose>div",function(){
	var msg = $(this).text();
	$(".input input").val("");
	$(".choose").remove();
	$(".send").addClass("blue");
    send(msg);
})
$(document).on("click",".radius>a.option",function(){
	var msg = $(this).text();
	$(".input input").val("");
	$(".send").addClass("blue");
    send(msg);
})
var case_height;
var chat_height=$(".aimi .chat").height();
$(document).on("click",".aimi .question",function(){
	var this_=$(this);
	$(".input input").blur();
	if(this_.hasClass("active")){
		this_.removeClass("active");
		$(".aimi .case").hide();
		$(".aimi .wrapper").css({height:'calc(100vh - 3.6rem)'});
		
		$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	}else{
		this_.addClass("active");
		$(".aimi .case").show();
		case_height=$(".all-fix").height();
		$(".aimi .wrapper").css({'height':chat_height-case_height});
		$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	}
})
$(".aimi .checkbox_input>div").click(function(){
	if($(this).children(".checkbox_bg").is(":hidden")){
		$(this).children(".checkbox_bg").show()
	}else{
		$(this).children(".checkbox_bg").hide();
	}

})
$(".aimi .checkbox .sure").click(function(){
	var checkbox=$(".checkbox_bg:visible")
	var  str='';
	if( checkbox.length>0){//已选择
		checkbox.each(function(i){
			str=str+$(this).parent().text()+",";
		})
		$(".checkbox").remove();
	}else{
		$(".checkbox").hide();
	}
	
	str=str.substring(0,str.length-1);
	$(".right .text div").eq(-1).text(str);
})
//
//
var interval;
function scrollToEnd(this_){
	document.body.scrollTop = document.body.scrollHeight;
}
$(".input input").on("focus",function (e) {
	var this_=this;
	if($(".aimi .question").hasClass("active")){
		$(".aimi .question").removeClass("active");
		$(".aimi .case").hide();
		$(".aimi .wrapper").css({height:'calc(100vh - 3.6rem)'});
	}
    interval = setTimeout(function() {
        scrollToEnd(this_);
		
		$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
    }, 500)
})
$(".input input").on("blur",function (e) {
    clearInterval(interval);
})
$(document).on("click",".swiper-slide.swiper-slide-active>div",function(){
	var msg=$(this).text();
	$(".aimi .question").removeClass("active");
	$(".aimi .case").hide();
	$(".aimi .wrapper").css({height:'calc(100vh - 3.6rem)'});
	$(".send").addClass("blue");
    send(msg);
})

$("body").bind('scroll', function () {
    $('.input input').blur();
})

var before = $('.choose').scrollLeft();
$('.choose').scroll(function(e){
    var after = $('.choose').scrollLeft();
    if (before<after) {
    	$(".more").remove();
    }
    
})
$(document).on('click','.questionnaire-content>div',function(){
	$(this).children('.icon').addClass('active');
	$(this).parents('.questionnaire').hide();
	$(this).parents('.questionnaire').siblings('.retroaction').show();
})
//理赔咨询
var claims_consultation=false;
$('.aside-wrapper .claims_consultation').click(function () {
    claims_consultation = false;
    if ($(this).hasClass('active')) {
        // $(this).siblings('div').show();
        $(this).removeClass('active');
        $('.aside-wrapper div').eq(3).addClass('active')
        $(this).text('理赔咨询');
        $.post(send_url, {'dialog_id': '1', 'msg': '结束', 'key': key, 'claims_consultation': (claims_consultation ? 'open' : 'close')}, function (data) {}, 'json');
        $(".scroll").append('<div class="left"><div class="text1"><div><img src="' + res_url + '/img/aimi.png"/></div>'
                + '<div class="radius">理赔咨询已关闭，您可以继续向我咨询其他问题，如有需要，可点击上方按钮再次启动哦～</div></div></div>');
        
        $('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
        updateDataByKey(myDB.db, 'data',robot_url, ['理赔咨询已关闭，您可以继续向我咨询其他问题，如有需要，可点击上方按钮再次启动哦～', 'aimi']);
    } else {
        claims_consultation = true;
        // $(this).siblings('div').hide();
        $(this).text('结束任务');
        $(this).addClass('active');
        $(".scroll").append('<div class="left"><div class="text1"><div><img src="' + res_url + '/img/aimi.png"/></div>'
        + '<div class="radius">Aimi已为您启动理赔咨询，您可以告诉我发生了什么疾病或意外？</div></div></div>');
        $('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
        if (result == undefined) {
            var value = {
                'name':robot_url,
                'data': [['Aimi已为您启动理赔咨询，您可以告诉我发生了什么疾病或意外？', 'aimi']]
            }
            try {
                addData(myDB.db, 'data', value);
            } catch (e) {
            	
            }
            result = '';
        } else {
            try {
                updateDataByKey(myDB.db, 'data',robot_url, ['Aimi已为您启动理赔咨询，您可以告诉我发生了什么疾病或意外？', 'aimi']);
            } catch (e) {

            }
        }
    }
})
var preRequest;
var cancle=false;
function setCookie(c_name, value, expiredays){
   　　 	var exdate=new Date();
　　  exdate.setDate(exdate.getDate() + expiredays);
　　  document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
//var uri="http://172.16.3.148:8888"
$('.artificial_service').click(function () {
	var this_=$(this);
//	function getMessage(){
//		return  new  Promise(function(resolve,reject){
//			$.ajax({
//				type:'post',
//				url:"http://172.16.2.80:3334/chat/uservice",//http://172.16.2.108:3334
//				async:false,
//				data:{'key':key},
//			}).done((data)=>{
//				var obj = new Object();
//				if(data.code==0){
//					setCookie('uuid',data.data.uuid,1),
//					setCookie('product_id',data.data.product_id,1),
//					setCookie('robot_user_id',data.data.robot_user_id,1),
//					setCookie('name',data.data.name,1),
//					resolve(obj);
//				}
//				
//			})
//		})	
//	}
	var connect=false;
	//获取当前用户信息
	if (this_.hasClass('active')){
		this_.removeClass('active')
		this_.text('人工客服');
		artificial_service=false
		if($('.aside-wrapper>span').text().length>0){//取消排队
			preRequest.abort();
			cancle=true;
			$.ajax({
				type:"put",
				url:roy_domain+"/acs/v1.0/customer_login",
				async:true,
				data:{'uuid':getCookie('uuid'),'name':getCookie('name'),'product_id':getCookie('product_id'),'robot_user_id':getCookie('robot_user_id')},
				success:function(data){
					$('.aside-wrapper>span').text("");
				}
			})	
		}else{ //退出人工客服
			artificial_service=false;
			sendTextMessage('592b71f0-b3f8-4f64-bd45-40b35c0191af');
			
		}	
	}else{
		//getMessage().then(function(){
		$.ajax({
			type:'post',
			url:"/chat/uservice",//http://172.16.3.157:3000
			async:false,
			data:{'key':key},
			success:function(data){
				var obj = new Object();
				if(data.code==0){
					setCookie('uuid',data.data.uuid,1),
					setCookie('product_id',data.data.product_id,1),
					setCookie('robot_user_id',data.data.robot_user_id,1),
					setCookie('name',data.data.name,1)
				}	
				this_.addClass('active')
				this_.text('结束人工');
				customerLogin();
				function customerLogin(){
					preRequest=$.ajax({
						type:"post",
						url:roy_domain+"/acs/v1.0/customer_login",
						async:true,
						data:{'uuid':getCookie('uuid'),'name':getCookie('name'),'product_id':getCookie('product_id'),'robot_user_id':getCookie('robot_user_id'),'customer_token':getCookie('token')},
						timeout:10000,
						success:function(data){
							var temp="";
							if(data.msg=="not online"){
								temp = data.data;
								this_.removeClass('active')
								this_.text('人工客服');
								artificial_service=false;
								delCookie('uuid');
				                delCookie('product_id');
								delCookie('product_id');						
								delCookie('name');
								
							}else if(data.msg=="connect"){
								setCookie('targetId',data.data.targetId,1);
								setCookie('token',data.data.token,1);
								setCookie('extra',data.data.extra,1);
								setCookie('targetId',data.data.targetId);
								localStorage.setItem('extra',JSON.stringify(data.data.extra));
								if(!connect){
									connect=true;
									startConnect();
								}
								artificial_service=true;
								temp = data.data.welcome_words;
							}
							if(data.msg=="not online"||data.msg=="connect"){
								$('.aside-wrapper>span').text('');
								var s = '<div class="left">';
						        s += '<div class="text1">';
						        s += '<div><img src="' + res_url + '/img/aimi.png"></div>';
						        s += '<div class="radius">';
						        s += temp;
						        s += '</div>';
						    	s += '</div>';
						    	s += '</div>';
						    	$(".scroll").append(s);
						    	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
						    	if (result == undefined) {
							        var value = {
							            'name':robot_url,
							            'data': [[temp, 'aimi']]
							        }
							        try {
							            addData(myDB.db, 'data', value);
							        } catch (e) {
							
							        }
							        result = '';
							    } else {
							        try {
							            updateDataByKey(myDB.db, 'data',robot_url, [temp, 'aimi']);
							        } catch (e) {
							
							        }
							    }
								
						    }else{
						    	if(data.data=="数据库中没有此机器人对应的客服!"){
					    			var s = '<div class="left">';
							        s += '<div class="text1">';
							        s += '<div><img src="' + res_url + '/img/aimi.png"></div>';
							        s += '<div class="radius">';
							        s +="数据库中没有此机器人对应的客服!";
							        s += '</div>';
							    	s += '</div>';
							    	s += '</div>';
							    	$(".scroll").append(s);
							    	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
					    		}else{
					    			$('.aside-wrapper>span').text(data.data);
					    		}	
						    	if(!cancle){
						    		artificial_service=false;
						    		if(data.data!="数据库中没有此机器人对应的客服!"){
						    			setTimeout(function(){
							    			if(!cancle){
							    				customerLogin();
							    			}
										},10000)
						    		}
						    	}else{
						    		
						    	}
						    		
					    	}
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
				            if(textStatus == "timeout"){
								if(!cancle){
						    		setTimeout(function(){
										if(!cancle){
							    			customerLogin();
							    		}
									},10000)	
						    	}
				           }else{
								if(!cancle){
						    		setTimeout(function(){
										if(!cancle){
						    				customerLogin();
						    			}
									},10000)	
						    	}
				           }
						}
					});
				}
			}
		})	
	}
})
var uuid=""
var product_id="";
var robot_user_id="";						
var name="";
String.prototype.endWith=function(endStr){
   var d=this.length-endStr.length;
   return (d>=0&&this.lastIndexOf(endStr)==d);
}
window.onload=function(){
	$.ajax({
		type:'post',
		url:"/chat/uservice",//http://172.16.3.157:3000
		async:true,
		data:{'key':key},
		success:function(data){
			var obj = new Object();
			if(data.code==0){
				uuid=data.data.uuid;
				product_id=data.data.product_id;
				robot_user_id=data.data.robot_user_id;
				name=data.data.name;
				setCookie('uuid',uuid,1),
				setCookie('product_id',product_id,1),
				setCookie('robot_user_id',robot_user_id,1),
				setCookie('name',name,1)
				$.ajax({
					type:"post",
					url:roy_domain+"/acs/v1.0/customer_token",
					async:true,
					data:{'uuid':uuid,'product_id':product_id,'robot_user_id':robot_user_id,'name':name},
					success:function(data){
						setCookie('token',data.data,1);	
						startConnect();
					}
				});
				$.ajax({
					type:"post",
					url:roy_domain+"/acs/v1.0/before_customer_connect",
					async:true,
					data:{'uuid':uuid,'product_id':product_id,'robot_user_id':robot_user_id,'name':name},
					success:function(data){
						if(data.msg=='connect'){
							setCookie('targetId',data.data.targetId,1);
							setCookie('token',data.data.token,1);
							setCookie('extra',data.data.extra,1);
							setCookie('targetId',data.data.targetId);
							localStorage.setItem('extra',JSON.stringify(data.data.extra));
//							startConnect();
							$('.artificial_service').addClass('active');
							$('.artificial_service').text('结束人工');
							artificial_service=true;
						}	
					}	
				});
			}	
		}
	})	
}
