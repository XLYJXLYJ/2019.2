/*
var  bodyHeight=$(document.body).height()
var conentHeight=$('.conent').outerHeight(true)+79;
var y=conentHeight-bodyHeight
if(y>0){
	var height= bodyHeight+y+100
	$(".aside").css({"height": height+'px'})
	$(".aside").css({"background": '#f3f3fd'})
}else{
	$(".aside").css({"height": bodyHeight+'px'})
	$(".aside").css({"background": '#f3f3fd'})

}*/
var cookie=getCookie('user');
if(cookie=="not find"){
	// window.location.href="login.html";
}else{
	cookie=cookie.split('&&');
	$(".top .username").css("display","inline")
	$(".top .company").css("display","inline")
	$('.top .username').text(cookie[0]);
	$('.top .company').text(cookie[1]);
	console.log(cookie);
	console.log(cookie[5]);
	/*if(cookie[1]=="中国人寿保险（海外）股份有限公司"){
		$('.li_sub').eq(-3).hide();//隐藏销售漏斗
	}*/
	if(cookie[2]==2){
		$('.li_father').eq(3).hide();//隐藏人工客服
		$('.role .special').hide();
	}
	if(cookie[2]!=='1'){
		$('.li_sub').eq(-1).hide();//隐藏客服数据
	}
	if(cookie[3]==0){
		$('.li_father').eq(6).hide();//隐藏智能呼叫
	}
	if(cookie[4]=="0"){//隐藏销售漏斗
		$('.li_sub').eq(-3).hide();
	}
	if(cookie[5]==1){//显示质检模块
		$('.li_father').eq(5).show();
	}
}


$('.li_father>a').click(function(){
	var  this_=$(this);
	if(this_.find('.left').hasClass('active')){
		this_.find('.left').removeClass('active');
	}else{
		this_.find('.left').addClass('active');
	}
	this_.siblings('ul').slideToggle("fast");	
})
$('.li_sub>a').click(function(e){
	var  this_=$(this);
	if(this_.find('.left').hasClass('active')){
		this_.find('.left').removeClass('active');
	}else{
		this_.find('.left').addClass('active');
	}
	this_.siblings('ul').slideToggle("fast");
		
})
$(".footer input").bind('input porpertychange',function(){
	var this_ = $(this);
	var value=$.trim(this_.val());
	if($('.footer input').length>1){
		var index =$('.list .footer input').index(this_[0]);
		var number=$('.footer:eq('+index+') .number').text();
		if(value.length>0&&parseInt(value)<=parseInt(number)&&value>0){
			this_.siblings('.ship').addClass('active');
		}else{
			this_.siblings('.ship').removeClass('active');
		}
	}else{
		var number=$('.footer .number').text()
		if(value.length>0&&parseInt(value)<=parseInt(number)&&value>0){
			this_.siblings('.ship').addClass('active');
		}else{
			this_.siblings('.ship').removeClass('active');
		}
	}
		
})
$(document).on('click','.edit',function(){
	var this_ = $(this)
	if(this_.siblings('textarea').is(':hidden')){
		this_.siblings('p').hide();
		this_.siblings('textarea').show();
		this_.siblings('textarea').addClass('active');
		this_.find('.edit_text').text('取消编辑');
		/*this_.parents('.robot_settings').find('.remark.red').show();*/
	}else{
		this_.siblings('textarea').hide();
		this_.siblings('p').show();
		this_.siblings('textarea').removeClass('active');
		this_.siblings('textarea').val(this_.siblings('p').text());
		this_.find('.edit_text').text('编辑');
		/*this_.parents('.robot_settings').find('.remark.red').hide();*/
	}
	$('.robots').css('height',$('.robots').outerHeight(true));
})
$('.list_div_father').click(function(){
	$(this).addClass('active');
	$('.list_div_father').not(this).removeClass('active');
})
$('.login_out').click(function(){
	$.ajax({
		type:"delete",
		url:"/merchant/v1.0/session",
		success:function(data){
			if(data.errmsg=="OK"){
				delCookie('user');
				window.location.href="login.html";
			}
		}
		
	})	
})
$.ajax({
	type:"get",
	url:"/merchant/v2.0/plan_balance",
	async:true,
	success:function(data){
		if(data.msg=='ok'){
			data=data.data;
			if(parseInt(data[0].month_balance)<=1000||parseInt(data[0].year_balance)<=1000){
				$('.aside sup').css('display','inline-block');
			}
		}
	}
})

function getCookie(objName){//获取指定名称的cookie的值 
    var arrStr = document.cookie.split("; "); 
    for (var i = 0; i < arrStr.length; i++) { 
        var temp = arrStr[i].split("="); 
        if (temp[0] == objName){
            return unescape(temp[1]); 
        }else{
        	return 'not find';
        }
    } 
} 
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
$('.bottom_cont span').click(function(){
	$('.alert').hide();
})
function KeyDown(event){
	if (event.keyCode == 13){
		$('.add_similar_question').click();
	}
}
//$(document).on('click','.alert',function(e){
//	var div=$('.lay-prompt')[0];
//	if (div&&e.target != div && !$.contains(div, e.target)){
//		$('.alert').hide();
//		$('.lay-prompt input').val("");
//		$('.lay-prompt .Validform_checktip.Validform_wrong').text("");
//	}
//})	
$('.addContingencyQuestion').click(function(){
	$('.alert').removeClass('active');
	$('.alert').show();
})
$('.lay-prompt-btn1').click(function(){
	var contingencyQuestion=$('.contingencyQuestion').val();
	var contingencyAnswer=$('.contingencyAnswer').val();
	if($.trim(contingencyQuestion).length<=0){
		$('.contingencyQuestion').siblings('.Validform_checktip.Validform_wrong').text('请输入问题')
		return false;
	}else if($.trim(contingencyQuestion).length>100){
		$('.contingencyQuestion').siblings('.Validform_checktip.Validform_wrong').text('问题的字数在100以内');
		return false;
	}else{
		$('.contingencyQuestion').siblings('.Validform_checktip.Validform_wrong').text('');
	}
	if($.trim(contingencyAnswer).length<=0){
		$('.contingencyAnswer').siblings('.Validform_checktip.Validform_wrong').text('请输入答案');
		return false;
	}else if($.trim(contingencyAnswer).length>1000){
		$('.contingencyAnswer').siblings('.Validform_checktip.Validform_wrong').text('答案的字数在1000以内');
		return false;
	}else{
		$('.contingencyAnswer').siblings('.Validform_checktip.Validform_wrong').text('');
	}
	if($('.contingencyQuestions ul li').length==0){
		$('.contingencyQuestions').show();
	}
	if($('.alert').hasClass('active')){
		var index = $('.alert').attr('index');
		index = parseInt(index)
		$('.edit').eq(index).attr('question',contingencyQuestion);
		$('.edit').eq(index).attr('answer',contingencyAnswer);
		$('.edit').eq(index).prev('span').text(contingencyQuestion);
		$('.alert').removeClass('active');
		$('.alert').hide();
		$('.lay-prompt input').val("");
		$('.lay-prompt .Validform_checktip.Validform_wrong').text("");
		
	}else{
		if($('.contingencyQuestions ul li').length==5){
			$('.contingencyAnswer').siblings('.Validform_checktip.Validform_wrong').text('最多只能添加五个关联问题');
			return false;
		}
		var html = "<li>";
		if(contingencyQuestion.length>25){
			html += "<span title='"+contingencyQuestion+"'>"+contingencyQuestion.substring(0,23)+"...</span>";
		}else{
			html += "<span>"+contingencyQuestion+"</span>";
		}
		html +=	"<span class='edit' question='"+contingencyQuestion+"' answer='"+contingencyAnswer+"' id=''></span>";
		html += "<span class='delete' id=''></span>";	
		html += "</li>";
		$('.contingencyQuestions ul').append(html);
		$('.alert').hide();
		$('.lay-prompt input').val("");
		$('.lay-prompt .Validform_checktip.Validform_wrong').text("");
	}
	
})
$(document).on('click','.contingencyQuestions .edit',function(){
	$('.alert').addClass('active');
	$('.alert').attr('index',$('.edit').index(this));
	$('.alert').show();
	$('.contingencyQuestion').val($(this).attr('question'));
	$('.contingencyAnswer').val($(this).attr('answer'))
	
})
$('.lay-prompt-btn0').click(function(){
	$('.alert').hide();
	$('.lay-prompt input').val("");
	$('.lay-prompt .Validform_checktip.Validform_wrong').text("");		
})
$(".callBtn").click(function () {
	var newWindow = window.open();
	$.ajax({
		type: "POST",
		/*type: "GET",*/
		/*url: "http://localhost:63342/static/ai_cms/url.json",*/
		url:"/merchant/v2.0/robot/user_bind",
		async: true,
		success: function (data) {
			if (data.status == '200') {
				var url=data.data;
				/*window.location.href=url*/
				/*window.open(url);*/
				newWindow.location.href = url;
			} else if (data.errmsg == '用户未登录') {
				window.location.href = "login.html";
			}

		}
	})
})

