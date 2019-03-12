var myDB={
	name:'record',
	version:1,
	db:null
}
var result;
openDB(myDB.name,myDB.version); 
//if(getCookie('InsurBot')){
//	setCookie('InsurBot','InsurBot',1); 
//}
setTimeout(function(){
	getDataByKey(myDB.db,'data','InsurBot',compute);
},2000)
var length;
function compute(x) {
	result=x;
	if(result!=undefined){
		var text='';
//		if(result.data.length>3){
//			length=result.data.length-3;
//		}else{
//			swiper.destroy(false);
		$('.chat>div').removeClass('swiper-container1');
		$('.aimi-message').show();
//			length=0;
//		}
		for(var i=0;i<result.data.length;i++){
			if(result.data[i][1]!=undefined&&result.data[i][1]=='aimi'){
				var str =	'<div class="left">';
					str +=	'<div class="text1">';
					str +=	'<div><img src="/interlocution/img/aimi.png"></div>';
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
			}
		}
		$(".scroll").append(text);
		$('.chat').animate({scrollTop: $(".scroll")[0].scrollHeight}, 800);
		
	}else{
		$('.aimi-message').show();
		$(".scroll").append('<div class="left"><div class="text1"><div><img src="/interlocution/img/aimi.png"/></div>'
							+'<div class="radius"><div class="typing_loader"></div></div></div></div>');
		setTimeout(function(){
			$(".radius.typing_loader").remove();
	        $(".left .text1 .radius").eq(-1).text('你好，我是Aimi，我是您的全天候保险助手。我擅长回答关于保险理赔方面的问题，比如您可以问我“***赔不赔”或者“***保不保”。')
	        $(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
	        var value={
				'name':'InsurBot',
				'data':[['你好，我是Aimi，我是您的全天候保险助手。我擅长回答关于保险理赔方面的问题，比如您可以问我“***赔不赔”或者“***保不保。”','aimi']]
			}
			addData(myDB.db,'data',value);
			result=' ';
		},2000)
		
	}
	
//	if(result==undefined){
//		var value={
//		'name':'InsurBot',
//		'data':[['你好，我是Aimi，我是您的全天候保险助手。我擅长回答关于保险理赔方面的问题，比如您可以问我“***赔不赔”或者“***保不保”。','aimi']]
//		}
//		addData(myDB.db,'data',value);
//	}else{
//		updateDataByKey(myDB.db,'data','InsurBot' ,['你好，我是Aimi，我是您的全天候保险助手。我擅长回答关于保险理赔方面的问题，比如您可以问我“***赔不赔”或者“***保不保。”',['aimi']]);
//	}
}	
//var 'InsurBot'=$('.back .'InsurBot'').text();
$(".chat").css("overflow-y","scroll")
$(".aimi .alert>div").stop(true, false).slideDown();;
$(".aimi .alert>div").stop(true, false).slideUp();;
$(".aimi .aimi-message").addClass("active");
setTimeout(function(){
	$(".aimi .left").css({"opacity":"1","transform":"translate3d(0,0,0)"});
	
	$(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
},1000);
var timer;
//Android软键盘
$(window).resize(function(){
	$(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
})
$(function() {  
    FastClick.attach(document.body);  
});  

//页面滚动，软键盘消失
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


//监听input输入框
$('.input input').bind('input propertychange', function() {  
    if($.trim($(this).val()).length >0){
    	$(".send").addClass("blue");
    }else{
    	$(".send").removeClass("blue");
    }
    
});
var html="";
html +='<div class="left">';
html += '<div class="text1">';
html += '<div><img src="/interlocution/img/aimi.png"/></div>';
html += '<div class="radius"><div id="spinners">';
html +=	'<div class="mop-load-div"><div class="mop-css-6 three-bounce"><div class="bounce1"></div>';
html += '<div class="bounce2"></div><div class="bounce3"></div></div></div></div>让我思考一下哦</div>';
html += '</div>';
html += '</div>';
html += '</div>';
function send(msg){
	//记录当前时间
	if($(".send").is(".blue")){
		if(msg!=='系统结束'||person==true){
			person=false;
			$(".scroll").append("<div class='right'><div class='text'><div>"+msg+"</div></div></div>");
			if(result==undefined){
				var value={
				'name':'InsurBot',
				'data':[[msg,'user']]
				}
				addData(myDB.db,'data',value);
				result=' ';
			}else{
				updateDataByKey(myDB.db,'data','InsurBot' ,[msg,['user']]);
				
			}
		}
		$(".input input").val(" ");
//		alert('....');
		$(".send").removeClass("blue");
		$(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
        $(".scroll").append(html);
        $(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
        
		$.post('/test/chat', {'dialog_id':'1','msg': msg}, function (data) {
			//var data={"msg":{"data":["\u60a8\u6240\u63cf\u8ff0\u7684\uff08\u5fc3\u810f\u75c5\uff09\u5728\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u56e0\u4fdd\u5355\u8fd8\u6709\u5176\u4ed6\u7ea6\u5b9a\u4e8b\u9879\uff0c\u4e3a\u4e86\u66f4\u51c6\u786e\u5730\u5224\u65ad\u80fd\u5426\u83b7\u5f97\u8d54\u4ed8\uff0c\u60a8\u53ef\u4ee5\u8bd5\u7740\u63d0\u4f9b\u66f4\u591a\u7684\u4fe1\u606f\u3002","\u8bf7\u544a\u8bc9\u6211\u60a8\u60f3\u8981\u7406\u8d54\u7684\u8d39\u7528\u9879\u76ee\uff08\u5982\u8eab\u6545\u8d54\u507f\u91d1\u3001\u6b8b\u75be\u8d54\u507f\u91d1\u3001\u4f4f\u9662\u6d25\u8d34\u3001\u533b\u7597\u8d39\u3001\u68c0\u67e5\u8d39\u7b49)\u3002"]}};
			//var data={"msg":{"data":["\u60a8\u6240\u63cf\u8ff0\u7684\uff08\u68c0\u67e5\u8d39\uff09\u5728\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u56e0\u4fdd\u5355\u8fd8\u6709\u5176\u4ed6\u7ea6\u5b9a\u4e8b\u9879\uff0c\u4e3a\u4e86\u66f4\u51c6\u786e\u5730\u5224\u65ad\u80fd\u5426\u83b7\u5f97\u8d54\u4ed8\uff0c\u60a8\u53ef\u4ee5\u8bd5\u7740\u63d0\u4f9b\u66f4\u591a\u7684\u4fe1\u606f\u3002","\u8bf7\u5b8c\u6574\u8bf4\u660e\u6b64\u6b21\u5c31\u8bca\u7684\u533b\u7597\u673a\u6784\u662f\u54ea\u5bb6\uff1f"]}};
			//var data={"msg":{"data":{"data":["\u60a8\u63d0\u53ca\u533b\u7597\u673a\u6784\u540d\u79f0\u53ef\u80fd\u6709\u8bef\u6216\u4e0d\u5b8c\u6574\uff0c\u8bf7\u51c6\u786e\u9009\u62e9\u662f\u4ee5\u4e0b\u54ea\u5bb6\u533b\u7597\u673a\u6784\u6216\u6839\u636e\u5c31\u8bca\u6750\u6599\u6838\u5b9e\u518d\u6b21\u8f93\u5165\u6b63\u786e\u7684\u533b\u7597\u673a\u6784\u5168\u79f0"],"select":["\u6df1\u5733\u5e02\u4e2d\u533b\u9662","\u6df1\u5733\u5e02\u773c\u79d1\u533b\u9662","\u6df1\u5733\u5e02\u513f\u7ae5\u533b\u9662","\u6df1\u5733\u5e02\u5eb7\u5b81\u533b\u9662","\u6df1\u5733\u6d41\u82b1\u533b\u9662"]}}}
			//var data={"msg":{"data":["\u60a8\u6240\u63cf\u8ff0\u7684\uff08\u6df1\u5733\u5e02\u4e2d\u533b\u9662\uff09\u5728\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u56e0\u4fdd\u5355\u8fd8\u6709\u5176\u4ed6\u7ea6\u5b9a\u4e8b\u9879\uff0c\u4e3a\u4e86\u66f4\u51c6\u786e\u5730\u5224\u65ad\u80fd\u5426\u83b7\u5f97\u8d54\u4ed8\uff0c\u60a8\u53ef\u4ee5\u8bd5\u7740\u63d0\u4f9b\u66f4\u591a\u7684\u4fe1\u606f\u3002","\u60a8\u597d\uff0c\u6839\u636e\u60a8\u7684\u9648\u8ff0\uff0c\u8be5\u8d39\u7528\u5728\u672c\u4fdd\u9669\u65b9\u6848\u7684\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u53ef\u4ee5\u7406\u8d54\u3002\u8bf7\u95ee\u662f\u5426\u9700\u8981\u6d4b\u7b97\u53ef\u4ee5\u7406\u8d54\u7684\u91d1\u989d\uff1f\u8bf7\u76f4\u63a5\u56de\u590d\u201c\u662f\u201d\u6216\u201c\u5426\u201d"],"select":["\u662f","\u5426"]}}
			//var data={"msg":{"data":["\u60a8\u597d\uff0c\u8bf7\u60a8\u6309\u7167\u201c\u8d39\u7528\u79d1\u76ee+\u91d1\u989d\u201d\u7684\u683c\u5f0f\u51c6\u786e\u5217\u51fa\u9700\u8981\u8ba1\u7b97\u7684\u5168\u90e8\u8d39\u7528\uff0c\u4ee5\u201c\u3001\u201d\u9694\u5f00\u3002\u5982\uff1a\u624b\u672f\u8d39+10000\u3001\u5e8a\u4f4d\u8d39+5000"]}}
			//var data={"msg":{"data":["\u60a8\u597d\uff0c\u6839\u636e\u60a8\u7684\u8d39\u7528\u660e\u7ec6\uff0c\u5e8a\u4f4d\u8d39\u5728\u4fdd\u969c\u8303\u56f4\u5185,\u5728\u4fdd\u969c\u8303\u56f4\u5185\u7684\u7d22\u8d54\u91d1\u989d\u4e3a400.0\u5143\uff0c\u8003\u8651\u514d\u8d54\u989d\uff0c\u8d54\u507f\u9650\u989d\uff0c\u8d54\u4ed8\u6bd4\u4f8b\u7b49\u56e0\u7d20\u540e\uff0c\u6d4b\u7b97\u51fa\u672c\u6b21\u8d54\u507f\u91d1\u989d\u4e3a400.0\u5143\u3002\u82e5\u9700\u518d\u6b21\u8ba1\u7b97\uff0c\u8bf7\u8f93\u5165\"\u91cd\u65b0\u8ba1\u7b97\"\u6216\"\u7ed3\u675f\"\u6765\u7ed3\u675f\u672c\u8f6e\u5bf9\u8bdd\u3002"]}}
//			var data={"msg":{"data":["\u6309\u60a8\u7684\u8981\u6c42\uff0c\u672c\u8f6e\u5bf9\u8bdd\u7ed3\u675f\u3002\u82e5\u6709\u65b0\u7684\u60c5\u51b5\u54a8\u8be2\uff0c\u8bf7\u91cd\u65b0\u5f00\u59cb\u63d0\u95ee \"XXX\u4fdd\u4e0d\u4fdd\""]}}
			
			if(data.msg.data instanceof Array){
				if(data.msg.data.length==2){
//					if(true)
						if(msg!=='系统结束'){
							$(".left .text1 .radius").eq(-1).text(data.msg.data[0]);
							updateDataByKey(myDB.db,'data','InsurBot' ,[data.msg.data[0],'aimi']);
							$(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
							var str =	'<div class="left">';
								str +=	'<div class="text1">';
								str +=	'<div><img src="/interlocution/img/aimi.png"></div>';
								str +=	'<div class="radius">'+data.msg.data[1]+'</div>';
								str +=	'</div>';
								str +=	'</div>';
							setTimeout(function(){
								$(".scroll").append(str);
								$(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
								
							},500);
						}else{
							var str =	'<div class="left">';
								str +=	'<div class="text1">';
								str +=	'<div><img src="/interlocution/img/aimi.png"></div>';
								str +=	'<div class="radius">'+data.msg.data[0]+'</div>';
								str +=	'</div>';
								str +=	'</div>';
								$(".scroll").append(str);
								$(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
							var str1 =	'<div class="left">';
								str1 +=	'<div class="text1">';
								str1 +=	'<div><img src="/interlocution/img/aimi.png"></div>';
								str1 +=	'<div class="radius">'+data.msg.data[1]+'</div>';
								str1 +=	'</div>';
								str1 +=	'</div>';
								$(".scroll").append(str1);
								$(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
						}
					
				}else if(data.msg.data.length==1){
					if(msg!=='系统结束'){
						$(".left .text1 .radius").eq(-1).text(data.msg.data);
					}else{
						var str =	'<div class="left">';
							str +=	'<div class="text1">';
							str +=	'<div><img src="/interlocution/img/aimi.png"></div>';
							str +=	'<div class="radius">'+data.msg.data+'</div>';
							str +=	'</div>';
							str +=	'</div>';
							$(".scroll").append(str);
							$(".chat")[0].scrollTop=$(".scroll").scrollHeight;
					}
				}
				if(data.msg.select!=undefined){
					var message=data.msg.select;
		        	if(message.length>0){
		        		var msg="<div class='choose'>";
		        		for(var i=0;i<message.length;i++){
		        			msg=msg+"<div>"+message[i]+"</div>";
		        		}
		        		msg=msg+"</div>";
		        	}
		        	setTimeout(function(){
						$(".scroll").append(msg);
						$(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
					},600);
					if(data.msg.data[1].endWith('请直接回复“是”或“否”')||data.msg.data[0].endWith('请直接回复“是”或“否”')){
						if(data.msg.data.length==2){
							updateDataByKey(myDB.db,'data','InsurBot' ,[data.msg.data[1],'aimi']);
							return false;
						}else{
							updateDataByKey(myDB.db,'data','InsurBot' ,[data.msg.data,'aimi']);
							return false;
						}
					}else{
						if(data.msg.data.length==2){
							var msg_data=data.msg.data[1];
							var message=data.msg.select;
				        	if(message.length>0){
				        		for(var i=0;i<message.length;i++){
				        			msg_data=msg_data+"'"+message[i]+"'，";
				        		}
				        	}
							updateDataByKey(myDB.db,'data','InsurBot' ,[msg_data,'aimi']);
							
							
						}else{
							var msg_data=data.msg.data;
							var message=data.msg.select;
				        	if(message.length>0){
				        		for(var i=0;i<message.length;i++){
				        			msg_data=msg_data+"'"+message[i]+"'，";
				        		}
				        	}
							updateDataByKey(myDB.db,'data','InsurBot' ,[msg_data,'aimi']);
							return false;
						}
					}
					
		        	
				}else{
					if(data.msg.data.length==2){
						updateDataByKey(myDB.db,'data','InsurBot' ,[data.msg.data[1],'aimi']);
					}else{
						updateDataByKey(myDB.db,'data','InsurBot' ,[data.msg.data,'aimi']);
					}
					
				}
			}else{
				if(msg!=='系统结束'){
					$(".left .text1 .radius").eq(-1).text(data.msg.data.data[0]);
				}else{
					var str =	'<div class="left">';
						str +=	'<div class="text1">';
						str +=	'<div><img src="/interlocution/img/aimi.png"></div>';
						str +=	'<div class="radius">'+data.msg.data.data[0]+'</div>';
						str +=	'</div>';
						str +=	'</div>';
						$(".scroll").append(str);
						$(".chat")[0].scrollTop=$(".scroll").scrollHeight;
				}
				if(data.msg.data.select !=undefined){
					var message=data.msg.data.select;
		        	if(message.length>0){
		        		var str="<div class='choose'>";
		        		for(var i=0;i<message.length;i++){
		        			str=str+"<div>"+message[i]+"</div>";
		        		}
		        		str=str+"</div>";
		        	}
		        	$(".scroll").append(str);
		        	var msg_data=data.msg.data.data[0];
		        	if(message.length>0){
		        		for(var i=0;i<message.length;i++){
		        			msg_data=msg_data+"'"+message[i]+"'，";
		        		}
		        		updateDataByKey(myDB.db,'data','InsurBot' ,[msg_data,'aimi']);
		        		
		        	}
				}
				
			}
			if(data.msg.is_dialog==1){
				clearInterval(timer);
				timer= setInterval(function(){
						$('.send').addClass('blue');
						send('系统结束');
						
				},300000);
			}else if(data.msg.is_dialog==0){
				clearInterval(timer);
			}
			$(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
	    }, 'json');
		
	}
}

//
var person=false;
//发送消息
$(document).on("click",'.send',function(){
	var msg = $(".input input").val();
//	clearInterval(timer);
	person=true;
	send(msg);	
//	timer = setInterval(function(){
//		$('.send').addClass('blue');
//		send('系统结束');
//		clearInterval(timer);
//	},300000);
})

//enter键发送
function KeyDown(){
  if (event.keyCode == 13){
  	var msg = $(".input input").val();
    person=true;
//  clearInterval(timer);
    send(msg);
//  timer = setInterval(function(){
//		$('.send').addClass('blue');
//		send('系统结束');
//		clearInterval(timer);
//	},300000);
  }
}


//继续提问
$(".continue").click(function(){
	$(".end").hide();
	$(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
})

$(".aimi .alert").click(function(e){
	var prop=$('.aimi .alert>div')[0];
    if (e.target!= prop &&!$.contains(prop, e.target)){
    	$(".aimi .alert>div").stop(true, false).slideUp();;
    	$(".aimi .alert").hide();
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
//	clearInterval(timer);
    send(msg);
//  timer = setInterval(function(){
//		$('.send').addClass('blue');
//		send('系统结束');
//		clearInterval(timer);
//	},300000);	

})
$(document).on("click",".aimi .question",function(){
	var this_=$(this);
	$(".input input").blur();
	setTimeout(function(){
		if(this_.hasClass("active")){
			this_.removeClass("active");
			$(".aimi .case").hide();
			$(".aimi .chat").css({height:'calc(100vh - 7rem)'});
		}else{
			this_.addClass("active");
			$(".aimi .case").show();
			$(".aimi")[0].scrollTop=$(".case").height();
			$(".aimi .chat").css({height:$(".aimi .chat").height()-$(".case").height()});
			$(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
		}
	},300)
	
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


var interval;
function scrollToEnd(this_){
	document.body.scrollTop = document.body.scrollHeight;
}
$(".input input").on("focus",function (e) {
	var this_=this;
	if($(".aimi .question").hasClass("active")){
		$(".aimi .question").removeClass("active");
		$(".aimi .case").hide();
		$(".aimi .chat").css({height:'calc(100vh - 7rem)'});
	}
    interval = setTimeout(function() {
        scrollToEnd(this_);
        $(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
    }, 500)
//	interval = setInterval(function() {
//      scrollToEnd(this_);
//      $(".chat")[0].scrollTop=$(".scroll")[0].scrollHeight;
//  }, 500)
    
})
$(".input input").on("blur",function (e) {
    clearInterval(interval);
})

$(document).on("click",".swiper-slide.swiper-slide-active>div",function(){
	var msg=$(this).text();
	$(".aimi .question").removeClass("active");
	$(".aimi .case").hide();
	$(".aimi .chat").css({height:'calc(100vh - 7rem)'});
	$(".send").addClass("blue");
//	clearInterval(timer);
    send(msg);
//  timer = setInterval(function(){
//		$('.send').addClass('blue');
//		send('系统结束');
//		clearInterval(timer);
//	},300000);
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
String.prototype.endWith=function(endStr){
    var d=this.length-endStr.length;
    return (d>=0&&this.lastIndexOf(endStr)==d);
}



