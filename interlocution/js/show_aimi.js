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
var priority = 2;
//$('.aimi .aimi-message').addClass('active');
//var roy_domain = "http://172.16.3.148:8888";
//setTimeout(function() {
//	$('.vc-switch').click();
//	setTimeout(function() {
//		$('.vc-mask').click();
//	}, 350)
//
//}, 3000)

//定时轮循客户是否在线
var maxTime = 300; // seconds
var time = maxTime;
$('body').on('keydown mousemove mousedown touchstart touchmove touchend', function(e) {
	time = maxTime; // reset
});
var intervalId = setInterval(function() {
	time--;
	// console.log(time)
	if (time <= 0) {
		ShowInvalidLoginMessage();
		clearInterval(intervalId);
	}
}, 3000)
function ShowInvalidLoginMessage() {
	alert("服务超时已结束");
}

var roy_domain = "http://chat.qb-tech.net";
if(window.location.href.indexOf("test") > 0) {
	var roy_domain = "http://test.chat.qb-tech.net";
}
var myDB = {
	name: 'record',
	version: 1,
	db: null
}
var result;
var flag = true;
openDB(myDB.name, myDB.version);
var robot_url = window.location.href;

function zan(type, target, isLine) {
	var temp = ""
	if(isLine) {
		temp = '<hr/>';
	}
	var CLurl=window.location.href;
	var index = CLurl.lastIndexOf("\/");
	var str = CLurl.substring(index + 1,CLurl.length);
	if(str=='CL-fss'){
		temp += '<div class="questionnaire">';
		temp += '<p>以上回答是否解決您的問題?</p>';
		temp += '<div class="questionnaire-content">';
		temp += '<div class="feedback yes" data-target="' + target + '" data-type="' + type + '">';
		temp += '<span class="icon"></span>';
		temp += '<span class="desc">是,已解決</span>';
		temp += '</div>';
		temp += '<div class="feedback no"  data-target="' + target + '" data-type="' + type + '">';
		temp += '<span class="icon"></span>';
		temp += '<span class="desc">否,未解決</span>';
		temp += '</div>';
		temp += '</div>';
		temp += '</div>';
		temp += '<div class="retroaction">';
		temp += '<p><span class="flower"></span><span>感謝您的反饋,我們將繼續努力</span></p>';
		temp += '</div>';
	}else{
		temp += '<div class="questionnaire">';
		temp += '<p>以上回答是否解决您的问题?</p>';
		temp += '<div class="questionnaire-content">';
		temp += '<div class="feedback yes" data-target="' + target + '" data-type="' + type + '">';
		temp += '<span class="icon"></span>';
		temp += '<span class="desc">是,已解决</span>';
		temp += '</div>';
		temp += '<div class="feedback no"  data-target="' + target + '" data-type="' + type + '">';
		temp += '<span class="icon"></span>';
		temp += '<span class="desc">否,未解决</span>';
		temp += '</div>';
		temp += '</div>';
		temp += '</div>';
		temp += '<div class="retroaction">';
		temp += '<p><span class="flower"></span><span>感谢您的反馈,我们将继续努力</span></p>';
		temp += '</div>';
	}
	return temp;
}

function zan1(type, uuid) {
	var temp = '<div class="left">';
	temp += '<div class="text1">';
	temp += '<div>';
	temp += '<img src="/img/aimi.png">';
	temp += '</div>';
	temp += '<div class="radius">'
	temp += zan(type, uuid, false);
	temp += '</div>';
	temp += '</div>';
	temp += '</div>';
	return temp;
}

setTimeout(function() {
	try {
		getDataByKey(myDB.db, 'data', robot_url, compute);
	} catch(e) {
		$('.aimi-message').show();
		$(".scroll").append('<div class="left"><div class="text1"><div><img src="' + res_url + avatar_small + '"/></div>' +
			'<div class="radius"><div class="typing_loader"></div></div></div></div>');
		setTimeout(function() {
			$(".radius .typing_loader").remove();
			$(".left .text1 .radius").eq(-1).text(greet_msg);
			$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
		}, 2000)
	}

}, 2000)
var length;

function compute(x) {
	result = x;
	if(result != undefined) {
		var text = '';
		$('.aimi-message').show();
//		$('.aimi-message').show();
		//		$(".scroll").append('<div class="left"><div class="text1"><div><img src="' + res_url + avatar_small + '"/></div>' +
		//			'<div class="radius">'+greet_msg+'</div></div></div>');
//		$('.aimi .alert').hide();
		//		$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
		for(var i = 1; i < result.data.length; i++) {
			if(result.data[i][1] != undefined && result.data[i][1] == 'aimi') {
				var str = '<div class="left">';
				str += '<div class="text1">';
				str += '<div><img src="' + res_url + avatar_small + '"></div>';
				str += '<div class="radius">' + result.data[i][0] + '</div>';
				str += '</div>';
				str += '</div>';
				text = text + str;
			} else if(result.data[i][1] != undefined && result.data[i][1] == 'user') {
				var str = "<div class='right'>";
				str += "<div class='text'>";
				str += "<div>" + result.data[i][0] + "</div>";
				str += "</div>";
				str += "</div>";
				text = text + str;
			} else if(result.data[i][1] != undefined && result.data[i][1] == 'comment') {
				text = text + result.data[i][0];
			} else if(result.data[i][1] != undefined && result.data[i][1] == 'picture') {
				text = text + result.data[i][0];
			}
		}
		$(".scroll").append(text);
		setTimeout(function() {
			$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
			query();
			if(huize){
				connect();
			}
		}, 1000)
	} else {
		var value = {
			'name': robot_url,
			'data': [
				["", 'aimi']
			]
		}
		addData(myDB.db, 'data', value);
		result = ' ';
		$('.aimi-message').show();
		if(!huize) {
			$(".scroll").append('<div class="left"><div class="text1"><div><img src="' + res_url + avatar_small + '"/></div>' +
				'<div class="radius"><div class="typing_loader"></div></div></div></div>');
			setTimeout(function() {
				$(".radius .typing_loader").remove();
				$(".left .text1 .radius").eq(-1).html(greet_msg)
				$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
				if(priority==1){
					connect();
				}
			}, 2000)
		}
	}
}
$('.aimi .chat').removeClass('active');
$('.aimi .wrapper').css('height', $(".aimi .chat").height() - $('.all-fix').height());
//$('.scroll').css('overflow', "auto");
$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
setTimeout(function() {
	$(".aimi .left").css({
		"opacity": "1"
	});
	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
}, 1000);
var timer;
//Android软键盘
$(window).resize(function() {
	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
})
//
////页面滚动，软键盘消失
function _touch() {
	var startx; //让startx在touch事件函数里是全局性变量。
	var endx;
	var el = document.getElementsByClassName('chat')[0];

	function cons() {
		if(starty && endy) {
			$(".input input[type='text']").blur();
		}

	}
	el.addEventListener('touchstart', function(e) {
		var touch = e.changedTouches;
		startx = touch[0].clientX;
		starty = touch[0].clientY;
	});
	el.addEventListener('touchend', function(e) {
		var touch = e.changedTouches;
		endx = touch[0].clientX;
		endy = touch[0].clientY;
		cons();
	});
}
_touch()
$('.input input[type="text"]').bind('input propertychange', function() {
	if($.trim($(this).val()).length > 0) {
		$(".send").addClass("blue");
	} else {
		$(".send").removeClass("blue");
	}
});
var html = "";
html += '<div class="left">';
html += '<div class="text1">';
html += '<div><img src="' + res_url + avatar_small + '"/></div>';
html += '<div class="radius"><div id="spinners">';
html += '<div class="mop-load-div"><div class="mop-css-6 three-bounce"><div class="bounce1"></div>';
html += '<div class="bounce2"></div><div class="bounce3"></div></div></div></div>' + wait_response + '</div>';
html += '</div>';
html += '</div>';
html += '</div>';
var timer_ = ""

function checkServiceStatus() {
	var status = "";
	$.ajax({
		type: "post",
		url: roy_domain + "/acs/v1.0/customer_login",
		async: false,
		data: {
			'uuid': localStorage.getItem('uuid'),
			'name': localStorage.getItem('name'),
			'product_id': localStorage.getItem('product_id'),
			'robot_user_id': localStorage.getItem('robot_user_id'),
			'customer_token': localStorage.getItem('token')
		},
		success: function(data) {
			status = data;
		}
	})
	return status
}

function send(msg) {
	//记录当前时间
	if($(".send").is(".blue")) {
		$('.left:eq(-1) .choice').hide();
		if(artificial_service) { //人工客服
			$(".send").removeClass("blue");
			if(priority == 1 && disconnect) {
				var status = checkServiceStatus();
				//判断人工客服是否在线
				//1.在线就连接人工客服
				//2.如果不在线,判断user_robot_id是否为26
				//2.1 如果为26,判断robot_hosting是否为1,
				//2.11如果为1,连接机器人,否则连接机器人
				//2.2如果不为26,显示机器人不在线.
				$('.send-type').removeClass("active");
				if(status && status.msg == "connect") {
					localStorage.setItem('targetId', status.data.targetId);
					localStorage.setItem('token', status.data.token);
					localStorage.setItem('extra', status.data.extra);
					localStorage.setItem('targetId', status.data.targetId);
					localStorage.setItem('extra', JSON.stringify(status.data.extra));
					$('.send-type').addClass("active");
				} else if(status && status.msg == "not online") {
					$('.send-type').removeClass("active");
					if(status.robot_hosting == 1) {
						artificial_service = false;
						$(".send").addClass("blue");
						send(msg);
						updateDataByKey(myDB.db, 'data', robot_url, [status.data, 'aimi']);
						return false;
					} else {
						$(".scroll").append("<div class='right'><div class='text'><div>" + msg + "</div></div></div>");
						$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
						updateDataByKey(myDB.db, 'data', robot_url, [msg, 'user']);
						setTimeout(function() {
							$('.aside-wrapper>span').text('');
							var s = '<div class="left">';
							s += '<div class="text1">';
							s += '<div><img src="' + res_url + avatar_small + '"></div>';
							s += '<div class="radius">';
							s += status.data;
							s += '</div>';
							s += '</div>';
							s += '</div>';
							$(".scroll").append(s);
							$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
							updateDataByKey(myDB.db, 'data', robot_url, [status.data, 'aimi']);
						}, 1000)
						return false;
					}
				} else {
					$('.aside-wrapper>span').text(status.data);
					return false;
				}
			}
			if(disconnect) {
				startConnect(msg);
			} else {
				sendTextMessage(msg);
			}
		} else {
			$('.send-type').removeClass("active");
			if(priority == 1) {
				var status = checkServiceStatus();
				var online = status && status.msg == "connect";
				var not_online = status && status.msg == "not online" && status.robot_hosting == 0;
				if(online || not_online) {
					if(online) {
						localStorage.setItem('targetId', status.data.targetId);
						localStorage.setItem('token', status.data.token);
						localStorage.setItem('extra', status.data.extra);
						localStorage.setItem('targetId', status.data.targetId);
						localStorage.setItem('extra', JSON.stringify(status.data.extra));
					}
					artificial_service = true;
					$(".send").addClass("blue");
					send(msg);
					return false;
				}
			}
			if(msg !== '系统自动结束本轮对话，请确认' || person == true) {
				person = false;
				$(".scroll").append("<div class='right'><div class='text'><div>" + msg + "</div></div></div>");
				$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
				if(result == undefined) {
					var value = {
						'name': robot_url,
						'data': [
							[msg, 'user']
						]
					}
					try {
						addData(myDB.db, 'data', value);
					} catch(e) {

					}
					result = '';
				} else {
					try {
						updateDataByKey(myDB.db, 'data', robot_url, [msg, ['user']]);
					} catch(e) {

					}
				}
			}
			$(".input input[type='text']").val("");
			$(".send").removeClass("blue");

			$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
			$(".scroll").append(html);
			$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);

			$.post(send_url, {
				'dialog_id': '1',
				'msg': msg,
				'key': key,
				'claims_consultation': (claims_consultation ? 'open' : 'close')
			}, function(data) {
				//var data={"msg":{"data":["\u60a8\u6240\u63cf\u8ff0\u7684\uff08\u5fc3\u810f\u75c5\uff09\u5728\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u56e0\u4fdd\u5355\u8fd8\u6709\u5176\u4ed6\u7ea6\u5b9a\u4e8b\u9879\uff0c\u4e3a\u4e86\u66f4\u51c6\u786e\u5730\u5224\u65ad\u80fd\u5426\u83b7\u5f97\u8d54\u4ed8\uff0c\u60a8\u53ef\u4ee5\u8bd5\u7740\u63d0\u4f9b\u66f4\u591a\u7684\u4fe1\u606f\u3002","\u8bf7\u544a\u8bc9\u6211\u60a8\u60f3\u8981\u7406\u8d54\u7684\u8d39\u7528\u9879\u76ee\uff08\u5982\u8eab\u6545\u8d54\u507f\u91d1\u3001\u6b8b\u75be\u8d54\u507f\u91d1\u3001\u4f4f\u9662\u6d25\u8d34\u3001\u533b\u7597\u8d39\u3001\u68c0\u67e5\u8d39\u7b49)\u3002"]}};
				//var data={"msg":{"data":["\u60a8\u6240\u63cf\u8ff0\u7684\uff08\u68c0\u67e5\u8d39\uff09\u5728\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u56e0\u4fdd\u5355\u8fd8\u6709\u5176\u4ed6\u7ea6\u5b9a\u4e8b\u9879\uff0c\u4e3a\u4e86\u66f4\u51c6\u786e\u5730\u5224\u65ad\u80fd\u5426\u83b7\u5f97\u8d54\u4ed8\uff0c\u60a8\u53ef\u4ee5\u8bd5\u7740\u63d0\u4f9b\u66f4\u591a\u7684\u4fe1\u606f\u3002","\u8bf7\u5b8c\u6574\u8bf4\u660e\u6b64\u6b21\u5c31\u8bca\u7684\u533b\u7597\u673a\u6784\u662f\u54ea\u5bb6\uff1f"]}};
				//var data={"msg":{"data":{"data":["\u60a8\u63d0\u53ca\u533b\u7597\u673a\u6784\u540d\u79f0\u53ef\u80fd\u6709\u8bef\u6216\u4e0d\u5b8c\u6574\uff0c\u8bf7\u51c6\u786e\u9009\u62e9\u662f\u4ee5\u4e0b\u54ea\u5bb6\u533b\u7597\u673a\u6784\u6216\u6839\u636e\u5c31\u8bca\u6750\u6599\u6838\u5b9e\u518d\u6b21\u8f93\u5165\u6b63\u786e\u7684\u533b\u7597\u673a\u6784\u5168\u79f0"],"select":["\u6df1\u5733\u5e02\u4e2d\u533b\u9662","\u6df1\u5733\u5e02\u773c\u79d1\u533b\u9662","\u6df1\u5733\u5e02\u513f\u7ae5\u533b\u9662","\u6df1\u5733\u5e02\u5eb7\u5b81\u533b\u9662","\u6df1\u5733\u6d41\u82b1\u533b\u9662"]}}}
				//var data={"msg":{"data":["\u60a8\u6240\u63cf\u8ff0\u7684\uff08\u6df1\u5733\u5e02\u4e2d\u533b\u9662\uff09\u5728\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u56e0\u4fdd\u5355\u8fd8\u6709\u5176\u4ed6\u7ea6\u5b9a\u4e8b\u9879\uff0c\u4e3a\u4e86\u66f4\u51c6\u786e\u5730\u5224\u65ad\u80fd\u5426\u83b7\u5f97\u8d54\u4ed8\uff0c\u60a8\u53ef\u4ee5\u8bd5\u7740\u63d0\u4f9b\u66f4\u591a\u7684\u4fe1\u606f\u3002","\u60a8\u597d\uff0c\u6839\u636e\u60a8\u7684\u9648\u8ff0\uff0c\u8be5\u8d39\u7528\u5728\u672c\u4fdd\u9669\u65b9\u6848\u7684\u4fdd\u969c\u8303\u56f4\u5185\uff0c\u53ef\u4ee5\u7406\u8d54\u3002\u8bf7\u95ee\u662f\u5426\u9700\u8981\u6d4b\u7b97\u53ef\u4ee5\u7406\u8d54\u7684\u91d1\u989d\uff1f\u8bf7\u76f4\u63a5\u56de\u590d\u201c\u662f\u201d\u6216\u201c\u5426\u201d"],"select":["\u662f","\u5426"]}}
				//var data={"msg":{"data":["\u60a8\u597d\uff0c\u8bf7\u60a8\u6309\u7167\u201c\u8d39\u7528\u79d1\u76ee+\u91d1\u989d\u201d\u7684\u683c\u5f0f\u51c6\u786e\u5217\u51fa\u9700\u8981\u8ba1\u7b97\u7684\u5168\u90e8\u8d39\u7528\uff0c\u4ee5\u201c\u3001\u201d\u9694\u5f00\u3002\u5982\uff1a\u624b\u672f\u8d39+10000\u3001\u5e8a\u4f4d\u8d39+5000"]}}
				//var data={"msg":{"data":["\u60a8\u597d\uff0c\u6839\u636e\u60a8\u7684\u8d39\u7528\u660e\u7ec6\uff0c\u5e8a\u4f4d\u8d39\u5728\u4fdd\u969c\u8303\u56f4\u5185,\u5728\u4fdd\u969c\u8303\u56f4\u5185\u7684\u7d22\u8d54\u91d1\u989d\u4e3a400.0\u5143\uff0c\u8003\u8651\u514d\u8d54\u989d\uff0c\u8d54\u507f\u9650\u989d\uff0c\u8d54\u4ed8\u6bd4\u4f8b\u7b49\u56e0\u7d20\u540e\uff0c\u6d4b\u7b97\u51fa\u672c\u6b21\u8d54\u507f\u91d1\u989d\u4e3a400.0\u5143\u3002\u82e5\u9700\u518d\u6b21\u8ba1\u7b97\uff0c\u8bf7\u8f93\u5165\"\u91cd\u65b0\u8ba1\u7b97\"\u6216\"\u7ed3\u675f\"\u6765\u7ed3\u675f\u672c\u8f6e\u5bf9\u8bdd\u3002"]}}
				//var data={"msg":{"data":["\u6309\u60a8\u7684\u8981\u6c42\uff0c\u672c\u8f6e\u5bf9\u8bdd\u7ed3\u675f\u3002\u82e5\u6709\u65b0\u7684\u60c5\u51b5\u54a8\u8be2\uff0c\u8bf7\u91cd\u65b0\u5f00\u59cb\u63d0\u95ee \"XXX\u4fdd\u4e0d\u4fdd\""]}}
				//var data ={"msg":{'data':
				//var data={"msg":{"data":["設立公積金個人計劃的辦理手續及所需文件？<br /><br />帳戶擁有人與基金管理實體訂立公積金個人計劃合同後，親臨或委托他人遞交以下文件到基金管理實體：<br />1.<a href='http://www.fss.gov.mo/uploads/wizdownload/201808/4599_ghf9r.pdf' target='_blank' >設立公積金個人計劃申請表（E）</a>；  <a href='http://www.fss.gov.mo/uploads/wizdownload/201808/4600_0llz4.pdf' target='_blank' >（填表樣本）</a><br />2.公積金個人計劃合同影印本（已簽署文本）；<br />3.", "您是否還需要瞭解以下問題：","您是否還需要瞭解以下問題"],"folds":[0],"select":["本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？"]}}
				//var data={"msg":{"data":["未滿六十五歲的帳戶擁有人，因配偶、任一親等的直系血親或姻親的嚴重傷病而需負擔龐大的醫療開支<br /><br />賬戶擁有人每年只可提取一次其個人賬戶內全部或部分款項。提取金額上限為該賬戶擁有人有權獲得的鼓勵性基本款項及預算盈餘特別分配款項。<br /><br />辦理手續及所需文件：：親身或由他人遞交以下文件至服務辦理地點：<a href='http://www.fss.gov.mo/uploads/media/dag/location.pdf' target='_blank' >詳細地址：</a><br />1.<a href='http://www.fss.gov.mo/uploads/media/dag/withdrawal/l1-f-ch.pdf' target='_blank' >提取款項申請表L1（格式FSS/PC-6）</a>；<a href='http://www.fss.gov.mo/uploads/media/dag/withdrawal/l1-s-ch.pdf' target='_blank' >（填表樣本）</a><br />2.澳門居民身份證影印本；<br />3.患者的身份證影印本；<br />4.患者由當地認可的醫療單位發出的患病證明（需顯示申請日前十二個月內的患病情況，包括疾病名稱、嚴重程度、接受治療的期間及情況，倘屬下列疾病，則患病證明須同時顯示相關數據。）<br />(1)惡性腫瘤：患病證明須顯示患者申請日前十二個月內是否曾接受或預計需接受抗癌治療，是否已轉移或擴散至其他部位，是否屬晚期腫瘤。<br />(2)中風：患病證明須顯示患者最近一次中風的日期，患者是否因中風而導致永久喪失工作能力。<br />5.患者因嚴重傷病須負擔龐大醫療開支的證明文件：<br />(1)必須遞交收據等證明文件。<br />(2)預計的醫療開支：<a href='http://www.fss.gov.mo/uploads/media/dag/withdrawal/c11-f-ch.pdf' target='_blank' >填寫C/11聲明書</a>   ；<a href='http://www.fss.gov.mo/uploads/media/dag/withdrawal/c11-s-ch.pdf' target='_blank' >（填表樣本）</a>。<br />6.賬戶擁有人與患者的有效關係證明文件；<br />7.賬戶擁有人的澳門幣銀行賬戶影印本；<br />8.如賬戶擁有人為無行為能力人士，請參閱<a href='http://www.fss.gov.mo/zh-hant/rpc/rpc-pessoasincapazes' target='_blank' >無行為能力的賬戶擁有人提取款項手續</a>。<br /><br />備註/申請須知：接受社會保障基金轉賬的銀行包括：中國銀行澳門分行、大西洋銀行、大豐銀行、華僑永亨銀行股份有限公司、澳門國際銀行、澳門商業銀行、香港上海匯豐銀行、中國工商銀行(澳門)股份有限公司、匯業銀行、澳門華人銀行。"],"folds":[0],"select":["本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？"]}}
				//var data={"msg":{"data":["提取款項資格？<br /><br />http://www.fss.gov.mo/zh-hant/rpc/levantamento","您是否還需要瞭解以下問題"],"folds":[0],"select":["本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？","本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？","本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？","本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？"],"whether":["是","否"]}}
				//var data={"msg":{"data":["您是否還需要瞭解以下問題"],"folds":[0],"select":["本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？","本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？","本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？","本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？"],"whether":["是","否"]}}
				//var data={"msg":{"data":["基金錶現情況？<br /><br />閣下可通過以下鏈接查看基金錶現情況<br />保證基金：https://eservice.fss.gov.mo/main/Funds/Fund/F00020  <br />平衡基金：https://eservice.fss.gov.mo/main/Funds/Fund/F00021    <br />增長基金：https://eservice.fss.gov.mo/main/Funds/Fund/F00022","您是否還需要瞭解以下問題"],"folds":[0],"select":["本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？"]}}
				//var data={"msg":{"data":['登入指引？<div class="imgshow"><figure> <div class="img-dv"><a style="position: static;"  index="1" href="http://test.open.qb-tech.net/kg_img/tupiana.png" data-size="813x1527"><img  src="http://test.open.qb-tech.net/kg_img/tupiana.png"></a></div> </figure></div>',"您是否還需要瞭解以下問題"],"folds":[],"select":["本产品申请理赔需要哪些资料？","本产品的续保方式有哪些？","本产品有多少的免赔额\/率？"]}}
				// var data={
				// 	"result": {"无忧人生": [["险类险别", "重疾险"], ["投保年龄", "1岁--60岁"], ["保费", "0万元--1300.0万元"], ["性别", "不限"], ["保障人数", "3人"]], 
				// 			"爱倍护": [["险类险别", "重疾险"], ["投保年龄", "18岁--65岁"], ["保费", "0万元--1200.0万元"], ["性别", "不限"], ["保障人数", "9人"], ]}, 
				// 	"status": true, 
				// 	"table": true
				// };
				if(data.hasOwnProperty("iv") && data.iv) {
					var json = decrypt((data.msg), skey, data.iv).replace("aimi", aimi_name).replace("AIMI", aimi_name);
					data.msg = $.parseJSON(json);
				}
				if(data.msg.data instanceof Array) {
					if(data.msg.data.length > 0) {
						var duolunArr = $.parseJSON(data.msg.data[0])
						if(duolunArr){
							var str = '<div class="left">';
							str += '<div class="text1">';
							str += '<div class="tableAnswer">';
							str += '<table>';
							for (var index in duolunArr){	
								str += '<thead>';
									str += '<tr>';
										str += '<th>险种名称</th>';
										str += '<th>'+index+'</th>';
									str += '</tr>';
								str += '</thead>';	
								duolunArr[index].map(
									function(key,value){
										str += '<tbody>';
											str += '<tr>';
												str += '<td>'+key[0]+'</td>';
												str += '<td>'+key[1]+'</td>';
											str += '</tr>';
										str += '</tbody>';
									}
								)
							}
							str += '</table>';
							// str += '<button class="s-button">展开</button>';
							str += '</div>';
							str += '</div>';
							str += '</div>';
							$(".scroll").append(str);
						}else{
							var data_ = data.msg.data;
							var folds = data.msg.folds;
							var whether = data.msg.whether ?  data.msg.whether : "";
							var last = "";
							var choice = "";
							for(var i = 0; i < data_.length; i++) {
								(function(i) {
									var temp = "";
									temp += data_[i].replace(/^(?!.*<a href=.*)[0-9]{5,15}$/g, "<a href='tel:" + "$&" + "'>" + "$&" + "</a>").replace(/\<br \/\>/g, "\<br").replace(/(?!.*?(\"|\')+)(.+?)((https|ftp|http):\/\/[^\u4e00-\u9fa5\s]*)/g, "$2<a href='$3' target='_blank'>" + "$3" + "</a>").replace(/\<br/g, "\<br \/\>")
									if(i == data_.msg.position) {
										last = data_[i];
										if(data.msg.select != undefined) {
											temp += "</br>";
											for(var m = 0; m < data.msg.select.length; m++) {
												temp += "<a class='option'>" + (m + 1) + "." + data.msg.select[m] + "</a></br>";
												last += "<a class='option'>" + (m + 1) + "." + data.msg.select[m] + "</a></br>";
											}
										}
										if((!claims_consultation || !artificial_service)&& !whether) {
											temp += zan('robot', data.target, true);
										}
										if(whether){
											choice = '<ul class="choice">';
											for(var m=0; m<whether.length; m++){
												choice += '<li>'+whether[m]+'</li>';
											}
											choice += '</ul>'
										}
	
									}
									var hide = false
									if(folds){
										for(var j = 0; j < folds.length; j++) {
											if(i == folds[j]) {
												hide = true;
											}
										}
									}
									
									var t = data_[i].replace(/<br \/>/g, "囖");
									if(hide && t.length > 250) {
										temp = temp.replace(/<br \/>/g, "囖");
									}
									var str = '<div class="left">';
									str += '<div class="text1">';
									str += '<div><img src="' + res_url + avatar_small + '"></div>';
									str += '<div class="radius">';
									str += '<div>'
									str += temp;
									str += '</div>'
									str += '</div>';
									str += choice;
									str += '</div>';
									str += '</div>';
									setTimeout(function() {
										if(i == 0 && msg != '系统自动结束本轮对话，请确认') {
											$(".left .text1 .radius").eq(-1).html('<div>'+temp+'</div>');
											if(whether&&i == data_.length - 1){
												$(".left .text1").eq(-1).append(choice);
											}
											
										} else {
											$(".scroll").append(str);
										}
										try {
											temp = temp.replace(/囖/g, "<br \/>");
											updateDataByKey(myDB.db, 'data', robot_url, [temp, 'aimi']);
										} catch(e) {
	
										}
										if(hide && t.length > 250) {
											var string1 = t.substring(0, 250).replace(/囖/g, "<br \/>");
											string1 = string1.replace(/^(?!.*<a href=.*)[0-9]{5,15}$/g, "<a href='tel:" + "$&" + "'>" + "$&" + "</a>").replace(/\<br \/\>/g, "\<br").replace(/(?!.*?(\"|\')+)(.+?)((https|ftp|http):\/\/[^\u4e00-\u9fa5\s]*)/g, "$2<a href='$3' target='_blank'>" + "$3" + "</a>").replace(/\<br/g, "\<br \/\>")
											var string2 = t.substring(250, t.length).replace(/囖/g, "<br \/>");
											string2 = string2.replace(/^(?!.*<a href=.*)[0-9]{5,15}$/g, "<a href='tel:" + "$&" + "'>" + "$&" + "</a>").replace(/\<br \/\>/g, "\<br").replace(/(?!.*?(\"|\')+)(.+?)((https|ftp|http):\/\/[^\u4e00-\u9fa5\s]*)/g, "$2<a href='$3' target='_blank'>" + "$3" + "</a>").replace(/\<br/g, "\<br \/\>")
											if(string1.lastIndexOf('<a href=') > string1.lastIndexOf('</a>') || (string2.indexOf('<a href=') == -1 && string2.indexOf('</a>') != -1) || string2.indexOf('<a href=') > string2.indexOf('</a>')) { //判断是否拆分超链接
												string1 = string1 + string2.substring(0, string2.indexOf('</a>') + 4);
												string2 = string2.substring(string2.indexOf('</a>') + 4, string2.length);
											}
											$('.left').eq(-1).find('.radius').html('<div>' + string1 + '</div><span class="detail">...<span>查看详情</span></span><span class="extra">' + string2 + '</span>' + zan('robot', data.target, true));
											$('.left').eq(-1).show();
	
										}
										$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
										if(t.indexOf('.bmp') != 0 || t.indexOf('.png') != 0 || t.indexOf('.gif') != 0 || t.indexOf('.jpg') != 0 || t.indexOf('.jpeg') != 0) {
											query()
											setTimeout(function() {
												$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
											}, 100)
										}
									}, 1000);
								})(i)
							}
						}
					}
				} else {
					if(data.msg.data.data) {
						var data_ = data.msg.data.data;
						for(var i = 0; i < data_.length; i++) {
							var temp = "";
							temp += data_[i];
							if(i == data_.length - 1) {
								if(!claims_consultation || !artificial_service) {
									temp += zan('robot', data.target, true);
								}
								if(data.msg.data.select != undefined) {
									temp += "</br>";
									for(var m = 0; m < data.msg.select.length; m++) {
										temp += "<a class='option'>" + data.msg.select[m] + "</a></br>";
									}
								}
							}
							if(i == 0 || msg != '系统自动结束本轮对话，请确认') {
								$(".left .text1 .radius").eq(-1).html(temp);
							} else {
								var str = '<div class="left">';
								str += '<div class="text1">';
								str += '<div><img src="' + res_url + avatar_small + '"></div>';
								str += '<div class="radius">';
								str += temp;
								str += '</div>';
								str += '</div>';
								str += '</div>';
								setTimeout(function() {
									$(".scroll").append(str);
									$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
								}, 500);
							}
							try {
								updateDataByKey(myDB.db, 'data', robot_url, [temp, 'aimi']);
							} catch(e) {

							}
						}
					}
					if(data.table){

					}
				}
				if(data.msg.is_dialog == 1) {
					clearInterval(timer);
					timer = setInterval(function() {
						$('.send').addClass('blue');
						send('系统自动结束本轮对话，请确认');
					}, 300000);
				} else if(data.msg.is_dialog == 0) {
					clearInterval(timer);
				}
				$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
			}, 'json');
		}
	}
}
//
var person = false;
//发送消息
$(document).on("click", '.send', function() {
	var msg = $(".input input[type='text']").val();
	$(".input input[type='text']").val("");
	person = true;
	send(msg);
})
//
//enter键发送
function KeyDown(event) {
	if(event.keyCode == 13) {
		var msg = $(".input input[type='text']").val();
		person = true;
		send(msg);
		$('.input input[type="text"]').val("");
	}
}

function find(str, cha, num) {
	var x = str.indexOf(cha);
	for(var i = 0; i < num; i++) {
		x = str.indexOf(cha, x + 1);
	}
	return x;
}
//继续提问
$(".continue").click(function() {
	$(".end").hide();
	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
})

//查看详情
$(document).on("click", ".detail", function() {
	var this_ = this;
	var prev = $(this_).prevAll();
	prev.html(prev.html() + $(this).siblings('.extra').html());
	$(this).text('');
	$(this).css('display', 'inline-block')
	$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
})
//发送消息
$(document).on("click", '.feedback', function() {
	var data_type = $(this).data('type');
	var target = $(this).data('target');
	if(data_type == "robot") {
		var type = 0;
		if($(this).hasClass('yes')) {
			type = 1;
		}
		$.post(feedback_url, {
			'target': target,
			'type': type
		}, function(data) {}, 'json');
	} else {
		var solve = "未解决";
		if($(this).hasClass('yes')) {
			solve = "已解决"
		}
		$.post(roy_domain + "/acs/v1.0/customer_solve", {
			'customer_token': target,
			'solve': solve,
			'uuid': uuid
		})

	}

})
////提示
$(".prompt").click(function(e) {
	e.stopPropagation();
	if($(".aimi .alert").is(":hidden")) {
		$(".aimi .alert").show();
		$(".aimi .alert>div").stop(true, false).slideDown();;

	} else {
		$(".aimi .alert>div").stop(true, false).slideUp();;
		$(".aimi .alert").hide();
	}
})
$(document).on("click", ".choose>div", function() {
	var msg = $(this).text();
	$(".input input[type='text']").val("");
	$(".choose").remove();
	$(".send").addClass("blue");
	send(msg);
})
$(document).on("click", ".radius .option", function() {
	var msg = $(this).text().substring($(this).text().indexOf('.') + 1, $(this).text().length);
	$(".input input[type='text']").val("");
	$(".send").addClass("blue");
	send(msg);
})
var case_height;
var chat_height = $(".aimi .chat").height();
$(document).on("click", ".aimi .question", function() {
	var this_ = $(this);
	$(".input input[type='text']").blur();
	if(this_.hasClass("active")) {
		this_.removeClass("active");
		$(".aimi .case").hide();
		$(".aimi .wrapper").css({
			height: 'calc(100vh - 3.6rem)'
		});

		$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	} else {
		this_.addClass("active");
		$(".aimi .case").show();
		case_height = $(".all-fix").height();
		$(".aimi .wrapper").css({
			'height': chat_height - case_height
		});
		$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	}
})
$(".aimi .checkbox_input>div").click(function() {
	if($(this).children(".checkbox_bg").is(":hidden")) {
		$(this).children(".checkbox_bg").show()
	} else {
		$(this).children(".checkbox_bg").hide();
	}

})
$(".aimi .checkbox .sure").click(function() {
	var checkbox = $(".checkbox_bg:visible")
	var str = '';
	if(checkbox.length > 0) { //已选择
		checkbox.each(function(i) {
			str = str + $(this).parent().text() + ",";
		})
		$(".checkbox").remove();
	} else {
		$(".checkbox").hide();
	}

	str = str.substring(0, str.length - 1);
	$(".right .text div").eq(-1).text(str);
})
var interval;

function scrollToEnd(this_) {
	document.body.scrollTop = document.body.scrollHeight;
}
$(".input input[type='text']").on("focus", function(e) {
//	alert('点击')
	var this_ = this;
	if($(".aimi .question").hasClass("active")) {
		$(".aimi .question").removeClass("active");
		$(".aimi .case").hide();
		$(".aimi .wrapper").css({
			height: 'calc(100vh - 3.6rem)'
		});
	}
	interval = setTimeout(function() {
		scrollToEnd(this_);

		$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
	}, 500)
})

$(".input input[type='text']").blur(function(){
    setTimeout(() => {
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
})
$(document).on("click", ".swiper-slide.swiper-slide-active>div", function() {
	var msg = $(this).text();
	$(".aimi .question").removeClass("active");
	$(".aimi .case").hide();
	$(".aimi .wrapper").css({
		height: 'calc(100vh - 3.6rem)'
	});
	$(".send").addClass("blue");
	send(msg);
})

$("body").bind('scroll', function() {
	$('.input input[type="text"]').blur();
})

var before = $('.choose').scrollLeft();
$('.choose').scroll(function(e) {
	var after = $('.choose').scrollLeft();
	if(before < after) {
		$(".more").remove();
	}
})
$(document).on('click', '.questionnaire-content>div', function() {
	$(this).children('.icon').addClass('active');
	$(this).parents('.questionnaire').hide();
	$(this).parents('.questionnaire').siblings('.retroaction').show();
})
//理赔咨询
var claims_consultation = false;
$('.aside-wrapper .claims_consultation').click(function() {
	claims_consultation = false;
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		$('.aside-wrapper div').eq(3).addClass('active')
		$(this).text('理赔咨询');
		$.post(send_url, {
			'dialog_id': '1',
			'msg': '结束',
			'key': key,
			'claims_consultation': (claims_consultation ? 'open' : 'close')
		}, function(data) {}, 'json');
		$(".scroll").append('<div class="left"><div class="text1"><div><img src="' + res_url + avatar_small + '"/></div>' +
			'<div class="radius">理赔咨询已关闭，您可以继续向我咨询其他问题，如有需要，可点击上方按钮再次启动哦～</div></div></div>');
		$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
		updateDataByKey(myDB.db, 'data', robot_url, ['理赔咨询已关闭，您可以继续向我咨询其他问题，如有需要，可点击上方按钮再次启动哦～', 'aimi']);
	} else {
		claims_consultation = true;
		$(this).text('结束任务');
		$(this).addClass('active');
		$(".scroll").append('<div class="left"><div class="text1"><div><img src="' + res_url + avatar_small + '"/></div>' +
			'<div class="radius">' + aimi_name + '已为您启动理赔咨询，您可以告诉我发生了什么疾病或意外？</div></div></div>');
		$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
		if(result == undefined) {
			var value = {
				'name': robot_url,
				'data': [
					[aimi_name + '已为您启动理赔咨询，您可以告诉我发生了什么疾病或意外？', 'aimi']
				]
			}
			try {
				addData(myDB.db, 'data', value);
			} catch(e) {

			}
			result = '';
		} else {
			try {
				updateDataByKey(myDB.db, 'data', robot_url, [aimi_name + '已为您启动理赔咨询，您可以告诉我发生了什么疾病或意外？', 'aimi']);
			} catch(e) {

			}
		}
	}
})
var preRequest;
var cancle = false;

function setCookie(c_name, value, expiredays) {　　
	var exdate = new Date();　　
	exdate.setDate(exdate.getDate() + expiredays);　　
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
//var uri="http://172.16.3.148:8888"
$('.artificial_service').click(function() {
	var this_ = $(this);
	clearInterval(intervalId);
	//获取当前用户信息
	if(this_.hasClass('active')) {
		this_.removeClass('active')
		this_.text('人工客服');
		$('.send-type').removeClass('active')
		artificial_service = false
		if($('.aside-wrapper>span').text().length > 0) { //取消排队
			preRequest.abort();
			cancle = true;
			$.ajax({
				type: "put",
				url: roy_domain + "/acs/v1.0/customer_login",
				async: true,
				data: {
					'uuid': localStorage.getItem('uuid'),
					'name': localStorage.getItem('name'),
					'product_id': localStorage.getItem('product_id'),
					'robot_user_id': localStorage.getItem('robot_user_id')
				},
				success: function(data) {
					$('.aside-wrapper>span').text("");
				}
			})
		} else { //退出人工客服
			artificial_service = false;
			sendTextMessage('592b71f0-b3f8-4f64-bd45-40b35c0191af');
		}
	} else {
		connect(this_)

	}
})

function connect(this_) {
	$.ajax({
		type: 'post',
		url: "/chat/uservice", //http://172.16.3.189:3000
		async: false,
		data: {
			'key': key
		},
		success: function(data) {
			var obj = new Object();
			if(data.code == 0) {
				localStorage.setItem('uuid', data.data.uuid);
				localStorage.setItem('product_id', data.data.product_id);
				localStorage.setItem('robot_user_id', data.data.robot_user_id);
				localStorage.setItem('name', data.data.name);
				localStorage.setItem('sesionId', data.data.sesionId);
			}
			if(this_) {
				this_.addClass('active')
				this_.text('结束人工');
			}
//			$('.send-type').addClass('active')
			customerLogin();

			function customerLogin() {
				preRequest = $.ajax({
					type: "post",
					url: roy_domain + "/acs/v1.0/customer_login",
					async: true,
					data: {
						'uuid': localStorage.getItem('uuid'),
						'name': localStorage.getItem('name'),
						'product_id': localStorage.getItem('product_id'),
						'robot_user_id': localStorage.getItem('robot_user_id'),
						'customer_token': localStorage.getItem('token')
					},
					timeout: 10000,
					success: function(data) {
						var temp = "";
						if(data.msg == "not online") {
							temp = data.data;
							if(this_) {
								this_.removeClass('active')
								this_.text('人工客服');
							}
							localStorage.setItem('robot_hosting', data.robot_hosting)
							$('.send-type').removeClass('active');
							if((priority == 1 && data.robot_hosting == 0)) { //客服不在线,没有托管机器人,连接客服
								artificial_service = true;
							} else {
								artificial_service = false;
								is_robot_hosting = true;
							}
							custom_service_not_line = true;
						} else if(data.msg == "connect") {
							$('.send-type').addClass('active')
							localStorage.setItem('targetId', data.data.targetId);
							localStorage.setItem('token', data.data.token);
							localStorage.setItem('extra', data.data.extra);
							localStorage.setItem('targetId', data.data.targetId);
							localStorage.setItem('extra', JSON.stringify(data.data.extra));
//							if(!connect) {
//								connect = true;
//								startConnect();
//							}
							startConnect();
							artificial_service = true;
							temp = data.data.welcome_words;
						}
						if(data.msg == "not online" || data.msg == "connect") {
							$('.aside-wrapper>span').text('');
							var s = '<div class="left">';
							s += '<div class="text1">';
							s += '<div><img src="' + res_url + avatar_small + '"></div>';
							s += '<div class="radius">';
							s += temp;
							s += '</div>';
							s += '</div>';
							s += '</div>';
							if((!is_connect)&& (data.robot_hosting!=1||priority==2)){
								$(".scroll").append(s);
								$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
								if(result == undefined) {
									var value = {
										'name': robot_url,
										'data': [
											[temp, 'aimi']
										]
									}
									try {
										addData(myDB.db, 'data', value);
									} catch(e) {
	
									}
									result = '';
								} else {
									try {
										updateDataByKey(myDB.db, 'data', robot_url, [temp, 'aimi']);
									} catch(e) {
	
									}
								}
							}
						} else {
							if(data.data == "数据库中没有此机器人对应的客服!") {
								var s = '<div class="left">';
								s += '<div class="text1">';
								s += '<div><img src="' + res_url + avatar_small + '"></div>';
								s += '<div class="radius">';
								s += "数据库中没有此机器人对应的客服!";
								s += '</div>';
								s += '</div>';
								s += '</div>';
								$(".scroll").append(s);
								$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
							} else {
								$('.aside-wrapper>span').text(data.data);
							}
							if(!cancle) {
								artificial_service = false;
								if(data.data != "数据库中没有此机器人对应的客服!") {
									setTimeout(function() {
										if(!cancle) {
											customerLogin();
										}
									}, 10000)
								}
							} else {

							}
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						if(textStatus == "timeout") {
							if(!cancle) {
								setTimeout(function() {
									if(!cancle) {
										customerLogin();
									}
								}, 10000)
							}
						} else {
							if(!cancle) {
								setTimeout(function() {
									if(!cancle) {
										customerLogin();
									}
								}, 10000)
							}
						}
					}
				});
			}
		}
	})
}
var uuid = ""
var product_id = "";
var robot_user_id = "";
var name = "";
String.prototype.endWith = function(endStr) {
	var d = this.length - endStr.length;
	return(d >= 0 && this.lastIndexOf(endStr) == d);
}
window.onload = function() {
	$.ajax({
		type:"post",
		url:"/chat/priority",
		async:true,
		data:{
			'key':key
		},
		success: function(data){
			priority = data.data.priority;
			if(priority == 2){
				$('.artificial_service').show();
			}
		}
	});
	$.ajax({
		type: 'post',
		url: "/chat/uservice", //http://172.16.3.189:3000
		async: true,
		data: {
			'key': key
		},
		success: function(data) {
			var obj = new Object();
			if(data.code == 0) {
				uuid = data.data.uuid;
				product_id = data.data.product_id;
				robot_user_id = data.data.robot_user_id;
				name = data.data.name;
				sesionId = data.data.sesionId;
				localStorage.setItem('uuid', uuid);
				localStorage.setItem('product_id', product_id);
				localStorage.setItem('robot_user_id', robot_user_id);
				localStorage.setItem('name', name);
				localStorage.setItem('sesionId',sesionId);
				$.ajax({
					type: "post",
					url: roy_domain + "/acs/v1.0/customer_token",
					async: true,
					data: {
						'uuid': uuid,
						'product_id': product_id,
						'robot_user_id': robot_user_id,
						'name': name
					},
					success: function(data) {
						localStorage.setItem('token', data.data);
						$.ajax({
							type: "post",
							url: roy_domain + "/acs/v1.0/before_customer_connect",
							async: true,
							data: {
								'uuid': uuid,
								'product_id': product_id,
								'robot_user_id': robot_user_id,
								'name': name
							},
							success: function(data) {
								if(priority == 1) {
									if(data.msg == 'connect'){
										is_connect = true;
									}
									huize = true;
//									connect();
								} else if(data.msg == 'connect') {
									localStorage.setItem('targetId', data.data.targetId);
									localStorage.setItem('token', data.data.token);
									localStorage.setItem('extra', data.data.extra);
									localStorage.setItem('targetId', data.data.targetId);
									localStorage.setItem('extra', JSON.stringify(data.data.extra));
									$('.artificial_service').addClass('active');
									$('.artificial_service').text('结束人工');
									$('.send-type').addClass('active')
									artificial_service = true;
									//startConnect();
								}

							}
						});
					}
				});

			}
		}
	})
}

function photoCompress(file, w, objDiv) {
	var ready = new FileReader();
	/*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
	ready.readAsDataURL(file);
	ready.onload = function() {
		var re = this.result;
		canvasDataURL(re, w, objDiv)
	}
}
function canvasDataURL(path, obj, callback) {
	var img = new Image();
	img.src = path;
	img.onload = function() {
		var that = this;
		// 默认按比例压缩
		var w = that.width,
			h = that.height,
			scale = w / h;
		w = obj.width || w;
		h = obj.height || (w / scale);
		var quality = 0.7; // 默认图片质量为0.7
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var anw = document.createAttribute("width");
		anw.nodeValue = w;
		var anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(that, 0, 0, w, h);
		if(obj.quality && obj.quality <= 1 && obj.quality > 0) {
			quality = obj.quality;
		}
		var base64 = canvas.toDataURL('image/jpeg', quality);
		callback(base64);
	}
}

function convertBase64UrlToBlob(urlData) {
	var arr = urlData.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while(n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: mime
	});
}
var reader = new FileReader();
$(document).on('change', 'input[name="service_image"]', function() {
	//alert('上传文件');
	if($.trim($('input[name="service_image"]').val().length) <= 0) return false;
	var file = this.files[0];
	var form = new FormData(); // FormData 对象
	var xhr;
	var url = roy_domain + '/acs/v1.0/service_upload_image';
	if(file.size / 1024 > 1024) {
		photoCompress(file, {
			quality: 0.2
		}, function(base64Codes) {
			var bl = convertBase64UrlToBlob(base64Codes);
			form.append("service_image", bl, "file_" + Date.parse(new Date()) + ".jpg"); // 文件对象
			EXIF.getData(file, function() {
				var Orientation = EXIF.getTag(this, 'Orientation');
				if(Orientation && Orientation != 1) {
					form.append("image_reverse", "1");
					compressed_files(url, form)
				} else {
					form.append("image_reverse", "0");
					compressed_files(url, form)
				}
			});
		})
	} else {
		form.append("service_image", file);
		EXIF.getData(file, function() {
			var Orientation = EXIF.getTag(this, 'Orientation');
			if(Orientation && Orientation != 1) {
				form.append("image_reverse", "1");
				normal(url, form)
			} else {
				form.append("image_reverse", "0");
				normal(url, form)
			}
		})

	}
	$('#uploadForm').empty();
	$('#uploadForm').append('<input id="uploaderInput" name="service_image" class="weui-uploader__input" type="file" accept="image/*" >')
})

function normal(url, form) {
	xhr = new XMLHttpRequest();
	xhr.open("post", url, true);
	xhr.onload = uploadComplete;
	xhr.onerror = uploadFailed;
	xhr.send(form);
}

function compressed_files(url, form) {
	var xhr = new XMLHttpRequest();
	xhr.open("post", url, true);
	xhr.onload = uploadComplete;
	xhr.onerror = uploadFailed;
	xhr.send(form);
}

function uploadComplete(evt) {
	//服务断接收完文件返回的结果
	var returndata = JSON.parse(evt.target.responseText);
	if(returndata.msg == "ok") {
		sendTextMessage({
			url: returndata.data,
			text: false
		});
		var width = "";
		var height = "";
		var img = new Image();
		img.onload = function() {
			width = this.width;
			height = this.height;
			var str = '<div class="right">';
			str += '<div class="text">';
			str += '<div class="active">';
			var html = '<div class="imgshow">';
			str += '<div class="imgshow">';
			html += '<figure>';
			str += '<figure>';
			html += '<div class="img-dv">';
			str += '<div class="img-dv">';
			var temp = width + "x" + height;
			html += '<a style="position: static;"  index="1" href="' + returndata.data + '" data-size="' + temp + '"><img  src="' + returndata.data + '"></a>'
			str += '<a style="position: static;"  index="1" href="' + returndata.data + '" data-size="' + temp + '"><img  src="' + returndata.data + '"></a>'
			html += '</div>';
			str += '</div>';
			html += '</figure>';
			str += '</figure>';
			html += '</div>';
			str += '</div>';
			str += '</div>';
			str += '</div>';
			str += '</div>';
			console.log(str);
			$(".scroll").append(str);
			query();
			$('.wrapper').scrollTop($('.scroll')[0].scrollHeight);
			if(result == undefined) {
				var value = {
					'name': robot_url,
					'data': [
						[str, 'pic']
					]
				}
				try {
					addData(myDB.db, 'data', value);
				} catch(e) {

				}
				result = '';
			} else {
				try {
					updateDataByKey(myDB.db, 'data', robot_url, [str, 'picture']);
				} catch(e) {

				}
			}
		}
		img.src = returndata.data;
	} else {
		alert("上传失败！");
	}
}

function uploadFailed(evt) {
	alert("上传失败！");
}

function doUpload(url) {
	var img = new Image();
	img.onload = function() {
		var originWidth = this.width,
			originHeight = this.height,
			maxWidth = 200,
			maxHeight = 200,
			quality = 0.8;
		canvas = document.createElement('canvas');
		canvas.height = originHeight / originWidth * maxWidth;
		drawer.drawImage(img, 0, 0, canvas.width, canvas.height);

	}
}

//单选
$(document).on('click','.choice',function(){
	var strTarget = event.target.innerHTML
    if(strTarget.indexOf('li')!=-1){ 
		return;
    }else{
		$(this).hide();
		$('.send').addClass('blue');
		send(event.target.innerText);
    }
})



