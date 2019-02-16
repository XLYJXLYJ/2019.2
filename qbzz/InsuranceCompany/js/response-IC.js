$(function(){
	
//	$(".insure").click(function(){
//		$(".all_fix").css({display:"block"});
//		$(".fabu_fix").css({display:"block"});
//		var url=$(this).data("url");
//		$(".fabu_fix .fabu_yes").click(function(){
//			window.location.href='price-no.html';
//		});
//		
//	});
//  $(".all_no").click(function(){
//		$(".all_fix").css({display:"none"});
//		$(".fabu_fix").css({display:"none"});
//		$(".delete_fix").css({display:"none"});
//		$(".unlock_fix").css({display:"none"});
//		$(".look_fix").css({display:"none"});
//		$(".modify_fix").css({display:"none"});
//		$(".notadd_fix").css({display:"none"});
//	});
 
	$(".open").click(function(){
		$(".all_fix").css({display:"block"});
		$(".modify_fix").css({display:"block"});
		var url=$(this).data("url");
		$(".modify_fix .fabu_yes").click(function(){
			window.location.href=url;
		});
	});
	
	$(".require").click(function(){
		$(".all_fix").css({display:"block"});
		$(".look_fix").css({display:"block"});
		var url=$(this).data("url");
		$(".look_fix .fabu_yes").click(function(){
			window.location.href=url;
			
		});
	});
	$(".make-to").click(function(){
		$(".all_fix").css({display:"block"});
		$(".all_invite_fix").css({display:"block"});
		var url=$(this).data("url");
		$(".all_invite_fix .fabu_yes").click(function(){
			window.location.href=url;
		});
	});
	
	$(document).on("click",".no,.all_fix",function(){ 
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").remove();
		$(".look_fix").css({display:"none"});
		$(".modify_fix").css({display:"none"});
		$(".all_invite_fix").css({display:"none"});
	});
	
	
	$('.ready_up_pic img').click(function(){
		$(this).closest('div').css({display:"none"});
	});
	
	var t = $('#myinput'); //获取到文本域对象  
    t.css("color","#A9A9A9"); //设置文本域的样式  
    var default_value = t.val(); //把默认显示的文字赋给一个变量  
      
    t.focus(function() {  //当鼠标点击文本域时修改文本域的样式，判断文本域内的文字是否等于默认值，如果等于就把文本域内设空  
        t.css("color","black");  
        if (t.val() == default_value) {  
            t.val('');  
        }  
    });  
  
    t.blur(function() { //当文本域失去鼠标焦点时判断文本域中的值是否为空，如果为空就把文本域的值设置为默认显示的文字并修改样式  
        t.css("color","black");  
        if (t.val() == '') {  
            t.val(default_value);  
            t.css("color","#A9A9A9");  
        }  
    });
    
    
    // 上传保单扫面件
//  var addnub=0;
//	$(document).on("click",".add-load .add-pic",function(){
//		if(addnub<4){
//			addnub++;
//			var newload=$(this).parent().siblings(".load-nub").eq(0).clone();
//			newload.find(".reduce-pic").css({display:"block"});
//			newload.find(".load-put").html("请上传保单扫描件");
//			$(newload).insertBefore(".add-load");
//		};
//		parent.layer.iframeAuto(index);
//		formData.find(".Validform_checktip").bind("DOMNodeInserted",function(e){
//		    parent.layer.iframeAuto(index);
//		}); 
		
//	});	
//	$(document).on("click",".load-nub .reduce-pic",function(){
//		$(this).parent().remove();
//		addnub--;
//		parent.layer.iframeAuto(index);
//	});

//	$(".ie8-back a").mouseover(function(){
//
//		var aTxt = $(this).text();
//		if(aTxt == "立即报价") {
//			$(this).append('<p class="onTips">立即报价，填写相关报价说明。</p>');
//			return false;
//		}
//		if(aTxt == "放弃报价"){
//			$(this).append('<p class="onTips">放弃报价后，表示您将不再参与本业务。</p>');
//			return false;
//		}
//		if(aTxt == "索取资料"){
//			$(this).append('<p class="onTips">项目信息不完备，您可点此按钮索取资料。</p>');
//			return false;
//		}
//		if(aTxt == "确认收款"){
//			$(this).append('<p class="onTips">客户已支付，请您确认收款。</p>');
//			return false;
//		}
//		if(aTxt == "生成保单"){
//			$(this).append('<p class="onTips">点击为客户上传保单文件。</p>');
//			return false;
//		}
//		if(aTxt == "修改报价"){
//			$(this).append('<p class="onTips">提交修改，客户将能看到您的最新报价。</p>');
//			return false;
//		}
//		
//	});
//	$(".ie8-back a").mouseout(function(){
//		$(this).find(".onTips").remove();
//	});
	
})
