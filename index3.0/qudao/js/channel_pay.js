$(function(){
	
	$(".myform").Validform({
        tiptype: 4,
        btnSubmit:".nexs", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
		
        ignoreHidden:true,
     
        datatype:{
        	'name':/(?=.*\(.*\)|.*（.*）)^[a-zA-Z0-9\u4e00-\u9fa5()（）]*$|^[a-zA-Z0-9\u4e00-\u9fa5]*$/,
            'phone':/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{2}-\d{7}$|^0\d{3}-\d{7}$|^0\d{3}-\d{8}$/,
            "number":/^[1-9]\d*$/,
//          'price':/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
			'price':/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/
        },
        beforeSubmit:function(){
        	if($(".sub .val").data("id")==1){
        		if($('input[name="bank_code"]').is(":checked")){
					if($('input[name="bank_code"]').eq(0).is(":checked")){
						var wxnub=$(".recharge-nub-right input").val();
						if(wxnub-0>5000){
							$(".all_fix").css({display:"block"});
							$(".exceed").css({display:"block"});
						}else{
							$(".all_fix").css({display:"block"});
							$(".fabu_fix").css({display:"block"});
							var order_id = $('#payParam').data('order_id');
							var amount =  $('#payParam').data('amount');
							var tp =  $('#payParam').data('pay_type');
							var url =  $('#payParam').data('url');
							var type=$('#payParam').data('type');
							$.ajax({
								type: 'get',
								url: '/api/payment/weixin_pay',
								dataType: 'json',
								data:$('#YeepayPayForm').serialize(),
								success: function(res) {
									if(res) {
										$(".zhifu_cont img").addClass("erwei").attr('src', res);
//										time=setInterval(function(){requestPayStatus();}, 2000);
										requestPayStatus();
									}
								}
							});
							
						}
						return false;
					}else{
						$(".all_fix").css({display:"block"});
						$(".pay_fix").css({display:"block"});
						requestPayStatus(); 
					}
				}else{
					$(".all_fix").css({display:"block"});
					$(".fail").css({display:"block"});
					return false;
				}
        	}
			//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话表单将不会提交;	
		}
	});
	
	$(".pay_nav span").click(function(){
		var index=$(this).index();
		$(this).addClass("active_check").siblings("span").removeClass("active_check");
		if(index==0){
			$(".pay_div").css({display:"block"});
			$(".other_type").css({display:"none"});
			$(".pay-balance").css({display:"none"});
			$('#payParam').data('pay_type',"online");
		}else if(index==1){
			$(".pay_div").css({display:"none"});
			$(".other_type").css({display:"block"});
			$(".pay-balance").css({display:"none"});
			$('#payParam').data('pay_type',"transfer");
//		}else{
//			$(".pay_div").css({display:"none"});
//			$(".other_type").css({display:"none"});
//			$(".pay-balance").css({display:"block"});
//			$('#payParam').data('pay_type',"transfer");
		}
	});
	
	$(document).on("click",".all_no,.no",function(){
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
		$(".pay_fix").css({display:"none"});
		$(".paid_fix").css({display:"none"});
		$('.result').css({'display':'none'});
		$('.fail').css({'display':'none'});
		$('.exceed').css({'display':'none'});
		clearInterval(time);
		request.abort();
	});
	var timer;
	$(".end-balance .balance-bt").click(function(){
		clearInterval(timer);
		var prece1=$(".my-price").html().split(",").join("")-0;
		var prece2=$(".out-price").html().split(",").join("")-0;
		if(prece1>=prece2){
			$(".all_fix").css({display:"block"});
			$(".paid_fix").css({display:"block"});
		}else{
//			console.log($(".all_tip").html());
			$(".contents .all_tip").css({display:"block"});
			timer=setInterval(function(){
				$('.all_tip').hide();
				clearInterval(time);
			},2000);
			return false;
		}
		
	})
//	$(".no").click(function(){ 
//		$(".all_fix").css({display:"none"});
//		$(".fabu_fix").css({display:"none"});
//		$(".pay_fix").css({display:"none"});
//		$(".paid_fix").css({display:"none"});
//		$('.result').css({'display':'none'});
//		$('.fail').css({'display':'none'});
//		$('.exceed').css({'display':'none'});
//		clearInterval(time);
//	});
	$(".bottom_cont a").click(function(){ 
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
		$(".pay_fix").css({display:"none"});
	});
	$(".delete-line").click(function(){
		$(".error").animate({width:"0",height:"0"},function(){
			$(this).hide();
		});
	});
	function sleep(d){
			  for(var t = Date.now();Date.now() - t <= d;);
	}
			 
	//支付
	var request;
	function requestPayStatus() {
		var order_id = $('#payParam').data('order_id');
		var amount =  $('#payParam').data('amount');
		var tp =  $('#payParam').data('pay_type');
		var url =  $('#payParam').data('url');
		var type=$('#payParam').data('type');
		request=$.ajax({
			type: 'GET',
			url: '/api/payment/ajax/get/pay_status',
			dataType: 'json',
			timeout:60000,
			data: {
				'order_id': order_id,
				'type': type
			},
			success: function(res) {
				if(res && res.code === 200) {
					if(res.data == true) {
						location.href = '/api/payment/pay_success?pay_type='+tp+'&amount=' + amount+'&url='+url;
					}else{
						
						sleep(3000); //当前方法暂停5秒
						requestPayStatus();
					}
				}else{
					sleep(3000);
					requestPayStatus();
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				if (textStatus == "timeout") {
					requestPayStatus();
				}

			}
		});
	};
	
	//支付方式
	var time;
	$(".end_ok").click(function(){
		if($('input[name="bank_code"]').is(":checked")){
			if($('input[name="bank_code"]').eq(0).is(":checked")){
				var wxnub=$(".out-price").html();
				if(wxnub-0>5000){
					$(".all_fix").css({display:"block"});
					$(".exceed").css({display:"block"});
				}else{
					$(".all_fix").css({display:"block"});
					$(".fabu_fix").css({display:"block"});
					var order_id = $('#payParam').data('order_id');
					var amount =  $('#payParam').data('amount');
					var tp =  $('#payParam').data('pay_type');
					var url =  $('#payParam').data('url');
					var type=$('#payParam').data('type');
					$.ajax({
						type: 'get',
						url: '/api/payment/weixin_pay',
						dataType: 'json',
						data:$('#YeepayPayForm').serialize(),
						success: function(res) {
							if(res) {
								$(".zhifu_cont img").addClass("erwei").attr('src', res);
//								time=setInterval(function(){requestPayStatus();}, 2000);
								requestPayStatus();
							}
						}
					});
				}
				return false;
			}else{
				$(".all_fix").css({display:"block"});
				$(".pay_fix").css({display:"block"});
				requestPayStatus(); 
				
			}
		}else{
			$(".all_fix").css({display:"block"});
			$(".fail").css({display:"block"});
			return false;
		}

	});	
		
//	function aa(){
//		if($('input[name="bank_code"]').is(":checked")){
//			if($('input[name="bank_code"]').eq(0).is(":checked")){
//				$(".all_fix").css({display:"block"});
//				$(".fabu_fix").css({display:"block"});
//				var order_id = $('#payParam').data('order_id');
//				var amount =  $('#payParam').data('amount');
//				var tp =  $('#payParam').data('pay_type');
//				var url =  $('#payParam').data('url');
//				var type=$('#payParam').data('type');
//				$.ajax({
//					type: 'get',
//					url: '/insured/weixin_pay',
//					dataType: 'json',
//					data:$('#YeepayPayForm').serialize(),
//					success: function(res) {
//						if(res) {
//							$(".zhifu_cont img").addClass("erwei").attr('src', res);
//							time=setInterval(function(){requestPayStatus();}, 2000);
//						}
//					}
//				});
//				return false;
//			}else{
//				$(".all_fix").css({display:"block"});
//				$(".pay_fix").css({display:"block"});
//				requestPayStatus(); 
//			}
//		}else{
//			$(".all_fix").css({display:"block"});
//			$(".fail").css({display:"block"});
//			return false;
//		}
//	};
	
	
	//支付提示
	$(".btn").click(function(){
		var order_id = $('#payParam').data('order_id');
		var amount =  $('#payParam').data('amount');
		var tp =  $('#payParam').data('pay_type');
		var url =  $('#payParam').data('url');
		var type=$('#payParam').data('type');
		var n=$(this).index();
		$.ajax({
			type: 'GET',
			url: '/api/payment/ajax/get/pay_status',
			dataType: 'json',
			data: {
				'order_id': order_id,
				'type': type
			},
			success: function(res) {
				if(res && res.code === 200) {
					if(res.data == true) {
						location.href = '/api/payment/pay_success?pay_type='+tp+'&amount=' + amount+'&url='+url;
					} else {
						if(n == 0) {
							$('.result').css({'display':'block'});
							$(".all_fix").css({display:"block"});
							$(".pay_fix").css({display:"none"});
						} else if(n == 1) {
							$("html, body").stop().animate({scrollTop:0},100);
							$(".error").css({display:"block"});
							$(".all_fix").css({display:"none"});
							$(".pay_fix").css({display:"none"});
							$(".error").animate({width:"96%",height:"500px"});
						}
					}
				}
			}
		});
	});
	
	//在线充值
	$(".recharge-nub-right input").blur(function(){
		var shu=$(this).val();
		var a=$(".recharge-nub-right input");
		var b=$(".end-left .red_money span");
		toDecimal2(a,b,shu);
		
		$.ajax({
			type: 'GET',
			url: '/api/payment/ajax/get/recharge',
			dataType: 'json',
			data: {
				'amount': shu
			},
			success: function(res) {
				if(res && res.code === 200) {
					if(res.data!=""&&res.data!=null) {
						$('input[name="applicant_id"]').val(res.data.id);
						$('input[name="amount"]').val(res.data.amount);
						$('input[name="time"]').val(res.data.time);
						$('input[name="sign"]').val(res.data.sign);
						$('input[name="order_id"]').val(res.data.orderId);
						$("#payParam").attr("data-amount",res.data.dataAmount);
						$("#payParam").attr("data-order_id",res.data.dataOrderId);
					}
				}
			}

		});
	});
		
		
});

function toDecimal2(obj1,obj2,x) { 
	if(!isNaN(obj1.val()-0)){
		var f = parseFloat(x); 
	    if (isNaN(f)) { 
	    	return false; 
	    } 
	    var f = Math.round(x*100)/100; 
	    var s = f.toString(); 
	    var rs = s.indexOf('.'); 
	    if (rs < 0) { 
	        rs = s.length; 
	        s += '.'; 
	    } 
	    while (s.length <= rs + 2) { 
	        s += '0'; 
	    } 
	//  return s; 
	    obj2.html(s);
	}
   
} 