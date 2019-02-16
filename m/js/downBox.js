var T = {} ;
(function () {
    function getTemp(ids){
  	return '<ul class="fix-cont" id='+ids+'>'+
			'</ul>'

    };
    function addTemp(options){
    	if($("#"+options.id).length>0){
    		$("#"+options.id).css({display:"block"}).animate({bottom:"0"},200);
    	}else{
    		$("body").append(getTemp(options.id));
    		$("#"+options.id).animate({bottom:"0"},200);
	    	for(var i=0;i<options.a.length;i++){
	    		var li=$("<li data-type="+i+" data-value="+options.vals[i]+" data-price="+options.price[i]+">"+options.a[i]+"</li>");
	    		$(".fix-cont").append(li);
	    	};
	    	$("#"+options.id).find("li").eq(options.nubs).addClass("active");
    	};
    };	
    $("body").on("click",".fix-cont li",function(){ 
    	var type=$(this).data("type");
    	var price=$(this).data("price");
    	var valuess=$(this).data("value");
    	that.data("type",type);
    	that.data("pnub",price);
    	that.siblings("input").val(valuess);
    	that.siblings("span.Validform_checktip").css({display:"none"});
    	$(this).addClass("active").siblings().removeClass("active");
    	var ct=$(this).html();
    	setTimeout(function(){
    		$(".all-fix").css({display:"none"});
			$(".fix-cont").css({display:"none"});
			that.val(ct); 
			//总保费
			var pricenub=($(".pricemoney").eq(0).data("pnub")-0)*($(".pricemoney").eq(1).val()-0);
			$(".money-nub").html(pricenub);
			$('input[name="premium"]').val(pricenub);
    	},500);
		
		
	});	
    
    
    T.addTemp = addTemp;
})(T);
$(".select-box").focus(function(){
	var zz=$(this);
	var zztime=setTimeout(function(){
		zz.blur();
		clearTimeout(zztime);
	});
	
});
var that;
$(document).on("click",".select-box",function(){
	$(this).blur();
	$(".all-fix").css({display:"block"});
	var index=$(this).parent().index();
	that=$(this);
	var ids=$(this).data("id");
	var nub=$(this).data("nub");
	var datas=$(this).data("message").split(",");
	if($(this).data("value")){
		var values=$(this).data("value").split(",");
	}else{
		var values=[];
	}
	
	if($(this).data("price")){
		var prices=$(this).data("price").split(",");
	}else{
		var prices=[];
	}
	
	T.addTemp({id:ids,a:datas,ele:that,price:prices,nubs:nub,vals:values});
});

//键盘遮盖输入框问题
$(document).on("click",".cont-information input",function(){
	var top=$(this).offset().top-100;
	document.body.scrollTop=top;
});

//保险协议    
$(document).on("click",".insur_clause",function(){
	$(".baoxian-fix").css({display:"block"});
	$(".clause-type").css({display:"block"});
});
$("body").on("click",".all-no,.delete",function(){
	$(".all-fix").css({display:"none"});
	$(".fix-cont").css({display:"none"});
	$(".baoxian-fix").css({display:"none"});
	$(".clause-type").css({display:"none"});
});	

//倒计时
function change(i,obj){
	var count = i;
	$(obj).html(i+"秒");
	var countDown = setInterval(function() {
		$(obj).html(--count+"秒");
		if(count == 0) {
			clearInterval(countDown);
			$(obj).removeClass('disabled');
			$(obj).html('发送验证码')
		}
	},1000);
};

//总保费
//$(document).on("change",".pricemoney",function(){
//	alert("a")
//	var pricenub=($(".pricemoney").eq(0).data("price")-0)*($(".pricemoney").eq(0).val()-0);
//	$(".money-nub").html(pricenub);
//	$('input[name="premium"]').val(pricenub);
//})

//调用照相机或者手机相册
//function getObjectURL(file) {
//	var url = null;
//	if (window.createObjectURL != undefined) { // basic
//		url = window.createObjectURL(file);
//	} else if (window.URL != undefined) { // mozilla(firefox)
//		url = window.URL.createObjectURL(file);
//	} else if (window.webkitURL != undefined) { // webkit or chrome
//		url = window.webkitURL.createObjectURL(file);
//	};
//	return url;
//}


//$(".Photographs input").change(function() {
//	var objUrl = getObjectURL(this.files[0]);
////	console.log(this.files[0]);
//////	console.log(this.files[0].name);
//	var that=$(this)
////	converImgTobase64(objUrl, function(base64Str) {
////	    that.siblings("img").attr("src", base64Str);
////	});
//	
//	var reader = new FileReader();
//  reader.onload = function (e) {
//      compress(objUrl,function(base64Str) {
//      	that.siblings(".img").css({display:"block"});
//      	$.ajax({
//				type: 'POST',
//				url: '/file/upload',
//				dataType: 'json',
//				data: {
//					'image': base64Str
//				},
//				success: function(res) {
//					if(res.code==200){
//						that.siblings(".img").css({display:"none"});
//						that.siblings(".potopic").attr("src", base64Str);
//						that.siblings(".policy_photo").attr("value", res.msg);
//					}
//				}
//			});
////		    that.siblings("img").attr("src", base64Str);
//		});
//  };
//	reader.readAsDataURL(this.files[0]);
//  
//});
//var compress = function (res,callback) {
//  var img = new Image(),
//      maxH = 800;
//      maxW = 800;
//
//  img.onload = function () {
//      var cvs = document.createElement('canvas'),
//          ctx = cvs.getContext('2d');
//
//		if(img.height > img.width) {
//	        if(img.height > maxH) {
//	            img.width *= maxH / img.height;
//	            img.height = maxH;
//	        }
//     	}else{
//	       	if(img.width > maxW) {
//	            img.height *= maxW / img.width;
//	            img.width = maxW;
//	        }
//      }
////
//      cvs.width = img.width;
//      cvs.height = img.height;
////
//      ctx.clearRect(0, 0, cvs.width, cvs.height);
//      ctx.drawImage(img, 0, 0, img.width, img.height);
//
//      var dataUrl = cvs.toDataURL('image/jpeg',0.6);
//		callback.call(this, dataUrl);
//      // 上传略
//  }
//
//  img.src = res;
//}

//保险协议    
//$(document).on("click",".clause-a",function(){
//	var types=$("#type").data("type");
//	$(".baoxian-fix").css({display:"block"});
//	console.log(types);
//	if(types==0){
//		$(".clause-A").css({display:"block"}).siblings().css({display:"none"});
//	}else if(types==1){
//		$(".clause-B").css({display:"block"}).siblings().css({display:"none"});
//	}else if(types==2){
//		$(".clause-C").css({display:"block"}).siblings().css({display:"none"});
//	};
//});




