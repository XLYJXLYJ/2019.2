'use strict';
var QBZZ = window.QBZZ || {};
QBZZ.Effect = QBZZ.Effect || {};
(function (window, $) {
	QBZZ.Effect.pay = {
		startUp: function () {
			this.pageInit();
		},

		requestPayStatus: function () {
			var prices_id = $('#insured_pay_model .pay_finish_confirm').data('prices_id');
			var amount = $('#insured_pay_model .pay_finish_confirm').data('amount');
			$.ajax({
				type: 'GET',
				url: '/insured/tender_response/ajax/get/pay_status',
				dataType: 'json',
				data: {
					'prices_id': prices_id
				},
				success: function(res) {
					if(res && res.code === 200) {
						if(res.data == true) {
							location.href = '/insured/tender_response/pay_success?type=online&amount=' + amount;
						}
					}
				}
			});
		},

		requestWeixin: function () {
			QBZZ.Effect.pay.showPayModel($("#yeepay_weixin"));
			$.ajax({
				type: 'get',
				url: '/insured/tender_response/weixin_pay',
				dataType: 'json',
				data: $('#YeepayPayForm').serialize(),
				success: function(res) {
					if(res ) {
						$("#yeepay_weixin .pay-wx img").attr('src', res);
						$("#yeepay_weixin .pay-wx").css({'display':'block'});
						$("#yeepay_weixin .pay-wx-loading").css({'display':'none'});
						setInterval("QBZZ.Effect.pay.requestPayStatus()", 2000);
					}
				}
			});
		},

		showPayModel: function (current) {
			$("#insured_pay_model .modal-body").css('display', 'none');
			current.css('display', 'block');
			$("#insured_pay_model").css('display', 'block');
		},

		pageInit: function () {
			$("#insured_confirm_pay").click(function() {
				if($(".pay_bank_code:checked").length) {
					var bankCode = $(".pay_bank_code:checked").val();
					if(bankCode == 'weixin') {
						QBZZ.Effect.pay.requestWeixin();
						return false;
					} else {
						QBZZ.Effect.pay.showPayModel($("#yeepay_wy"));
					}
				} else {
					$('#insured_pay_model').css({'display':'none'});
					$('#insured_pay_bubble').find('b').html('请选择支付方式');
					$('#insured_pay_bubble').css({'display':'block'});
					return false;
				}
			});

			//关闭支付窗口
			$("#insured_pay_model .close").click(function() {
				$("#insured_pay_model").hide();
			});

			$("#insured_pay_bubble .close").click(function() {
				$("#insured_pay_bubble").hide();
			});

			//隐藏支付错误信息
			$('#pay_error_close').click(function () {
				$(this).parent().parent().parent().hide(800);
			});

			//单选框选中
			$("#RaioTab table li").click(function() {
				$(this).find('input').attr("checked", true);
			});

			//支付完成确认操作
			$('#insured_pay_model .pay_finish_confirm').click(function() {
				var prices_id = $(this).data('prices_id');
				var amount = $(this).data('amount');
				var type = $(this).data('type');
				$.ajax({
					type: 'GET',
					url: '/insured/tender_response/ajax/get/pay_status',
					dataType: 'json',
					data: {
						'prices_id': prices_id
					},
					success: function(res) {
						if(res && res.code === 200) {
							if(res.data == true) {
								location.href = '/insured/tender_response/pay_success?type=online&amount=' + amount;
							} else {
								if(type == 'success') {
									$('#insured_pay_model').css({'display':'none'});
									$('#insured_pay_bubble').find('b').html('支付尚未完成，请重新支付！');
									$('#insured_pay_bubble').css({'display':'block'});
								} else if(type == 'failure') {
									$("#insured_pay_model").hide();
									scrollTo(0, 200);
									$('#payment_error_info').show(800);
								}
							}
						}
					}
				});
			});
		}
	}
})(window, jQuery);

$(function () {
	QBZZ.Effect.pay.startUp();
})