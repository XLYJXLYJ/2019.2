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
						wxnub=wxnub.substring(0,wxnub.length-3);
						wxnub=wxnub.replace(",","");
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
		},
        callback:function(data){
			var payStatus = false;
			$.ajax({
				type: 'GET',
				url: '/api/payment/ajax/get/pay_status',
				dataType: 'json',
				async: false,
				data: {
					'order_id': $('#payParam').data('order_id'),
					'type': $('#payParam').data('type'),
				},
				success: function(res) {
					if(res && res.code === 200) {
						if(res.data === true){
//							$(".content .all_tips").text("该订单已支付成功，请勿重复支付！").css({display:"block"});
							$('.other_type_bottom').append('<p class="all_tips">该订单已支付成功，请勿重复支付！</p>');
							setTimeout(function(){$('.all_tips').remove();},2000);
							payStatus = res.data;
							return false;
						}
					}
				}
			})
			if(payStatus == true) {
				return false;
			}
		}
	});
	
	// 切换支付方式
	$(".pay_nav span").click(function(){
		var index=$(this).index();
		$(this).addClass("active_check").siblings("span").removeClass("active_check");
		if(index === 0){
			$(".pay_div").css({display:"block"});
			$(".other_type").css({display:"none"});
			$(".pay-balance").css({display:"none"});
//			$(".pay-bank").css({display:"none"});
			$('#payParam').data('pay_type',"online");
			return false;
		}
		if(index === 1){
			$(".pay_div").css({display:"none"});
			$(".other_type").css({display:"block"});
			$(".pay-balance").css({display:"none"});
//			$(".pay-bank").css({display:"none"});
			$('#payParam').data('pay_type',"transfer");
			return false;
		}
		if(index === 2){
			$(".pay_div").css({display:"none"});
			$(".other_type").css({display:"none"});
			$(".pay-balance").css({display:"block"});
//			$(".pay-bank").css({display:"none"});
//			$('#payParam').data('pay_type',"transfer");
			return false;
		}
//		if(index === 3){
//			$(".pay_div").css({display:"none"});
//			$(".other_type").css({display:"none"});
//			$(".pay-balance").css({display:"none"});
//			$(".pay-bank").css({display:"block"});
//			return false;
//		}
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
	
	
	// 余额支付
	var timer;
	$(".end-balance .balance-bt").click(function(){
		var payStatus = false;
		var that = this;
		$.ajax({
			type: 'GET',
			url: '/api/payment/ajax/get/pay_status',
			dataType: 'json',
			async: false,
			data: {
				'order_id': $('#payParam').data('order_id'),
				'type': $('#payParam').data('type'),
			},
			success: function(res) {
				if(res && res.code === 200) {
					if(res.data == true){
						$(that).closest('.end-balance').append('<p class="all_tips">该订单已支付成功，请勿重复支付！</p>');
						setTimeout(function(){$('.all_tips').remove();},2000);
						payStatus = res.data;
						return false;
					}
					if(res.data == false){
						clearInterval(timer);
						var prece1=$(".available-balance").val().split(",").join("")-0;
						var prece2=$(".actual-pay").html().split(",").join("")-0;
						if(prece1>=prece2){
							$(".all_fix").css({display:"block"});
							$(".paid_fix").css({display:"block"});
						}else{
							$(that).closest('.end-balance').append('<p class="all_tips">余额不足！请选择其他支付方式！</p>');
							timer=setInterval(function(){
								$('.all_tips').remove();
								clearInterval(time);
							},2000);
							payStatus = true
							return false;
						}
						
					}
				}
				
			}
		})
		if(payStatus == true) {
			return false;
		}
	})
	
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
						sleep(3000)
						requestPayStatus();
					}
				}else{
					sleep(3000)
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
	
	//在线支付
	var time;
	$(".end_ok button").click(function(){
		var payStatus = false;
		var that = this;
		var order_id = $('#payParam').data('order_id');
		var type=$('#payParam').data('type');
		$.ajax({
			type: 'GET',
			url: '/api/payment/ajax/get/pay_status',
			dataType: 'json',
			async: false,
			data: {
				'order_id': order_id,
				'type': type,
			},
			success: function(res) {
				if(res && res.code === 200 && res.data == true) {
					$(that).closest('.end_ok').append('<p class="all_tips">该订单已支付成功，请勿重复支付！</p>');
					setTimeout(function(){$('.all_tips').remove();},2000);
					payStatus = res.data;
					return false;
				}
				if(res && res.code === 200 && res.data == false)  {
					if($('input[name="bank_code"]').is(":checked")){
						if($('input[name="bank_code"]').eq(0).is(":checked")){
							var wxnub=$(".out-price").html().split(",").join("")-0;
							if(wxnub-0>5000){
								$(".all_fix").css({display:"block"});
								$(".exceed").css({display:"block"});
							}else{
								$(".all_fix").css({display:"block"});
								$(".fabu_fix").css({display:"block"});
								var amount =  $('#payParam').data('amount');
								var tp =  $('#payParam').data('pay_type');
								var url =  $('#payParam').data('url');
								$.ajax({
									type: 'get',
									url: '/api/payment/weixin_pay',
									dataType: 'json',
									data:$('#YeepayPayForm').serialize(),
									success: function(res) {
										if(res) {
											$(".zhifu_cont img").addClass("erwei").attr('src', res);
//											time=setInterval(function(){requestPayStatus();}, 2000);
											requestPayStatus();
										}
									}
								});
							}
							payStatus = true;
							return false;
						} else{
							$(".all_fix").css({display:"block"});
							$(".pay_fix").css({display:"block"});
							requestPayStatus();

						}
					}else{
						$(".all_fix").css({display:"block"});
						$(".fail").css({display:"block"});
						payStatus = true;
						return false;
					}
					
				}
			}
		});
		if(payStatus == true) {
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
							$(".error").animate({width:"100%",height:"607px"});
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
//		var b=$(".end-left .red_money span");
//		toDecimal2(a,b,shu);
		$(".end-left .priceAll").html(shu);
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

//首次充值
$(".input-prices").blur(function(){
	$.ajax({
		type: 'GET',
		url: '/api/payment/ajax/get/is_first_pay?',
		dataType: 'json',
		success: function(data) {
			if(data.code==200){
				$(".balance-span").css("display","inline")
				var price=$(".input-prices").val();
				price=price.replace(",","")
				price=price.substring(0,price.indexOf("."))
				var money=price*0.3;
				$(".balance-money").text(money+"元");
			}	
		}
	})
})


//function toDecimal2(obj1,obj2,x) { 
//	if(!isNaN(obj1.val()-0)){
//		var f = parseFloat(x); 
//	    if (isNaN(f)) { 
//	    	return false;
//	    } 
//	    var f = Math.round(x*100)/100; 
//	    var s = f.toString(); 
//	    var rs = s.indexOf('.'); 
//	    if (rs < 0) { 
//	        rs = s.length; 
//	        s += '.'; 
//	    } 
//	    while (s.length <= rs + 2) { 
//	        s += '0'; 
//	    } 
//	//  return s; 
//	    obj2.html(s);
//	}
// 
//} 