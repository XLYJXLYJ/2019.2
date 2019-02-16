$(function(){
	
	
	$(document).on("click",".all_no,.no",function(){
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
		$(".pay_fix").css({display:"none"});
		$('.result').css({'display':'none'});
		$('.fail').css({'display':'none'});
		clearInterval(time);
		request.abort();
	});

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
		var channel=$('#payParam').data('channel');
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
						location.href = '/api/payment/pay_success?pay_type='+tp+'&amount=' + amount+'&url='+url+'&channel=' + channel;
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
	
	//支付方式
	var time;
	$(".end_ok button").click(function(){ 
		var urls =  $('#HuataiPayForm').attr('action');
		if($('input[name="bank_code"]').is(":checked")){
			if($('input[name="bank_code"]').eq(0).is(":checked")){
				$(".all_fix").css({display:"block"});
				$(".fabu_fix").css({display:"block"});
				var order_id = $('#payParam').data('order_id');
				var amount =  $('#payParam').data('amount');
				var tp =  $('#payParam').data('pay_type');
				var url =  $('#payParam').data('url');
				var type=$('#payParam').data('type');
				$.ajax({
					type: 'post',
					url: urls,
			        dataType: 'jsonp',
					data:$('#HuataiPayForm').serialize(),
					jsonp:'callback',
					success: function(res) {
						if(res.code=="200") {
							$(".zhifu_cont img").addClass("erwei").attr('src', res.msg);
//							time=setInterval(function(){requestPayStatus();}, 2000);
							requestPayStatus();
						}
					}
				});
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
	
	
	
	//支付提示
	$(".btn").click(function(){
		var order_id = $('#payParam').data('order_id');
		var amount =  $('#payParam').data('amount');
		var tp =  $('#payParam').data('pay_type');
		var url =  $('#payParam').data('url');
		var type=$('#payParam').data('type');
		var channel=$('#payParam').data('channel');
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
						location.href = '/api/payment/pay_success?pay_type='+tp+'&amount=' + amount+'&url='+url+'&channel=' + channel;
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
	
	
		
		
});

 