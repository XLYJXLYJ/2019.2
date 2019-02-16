$(function(){
	// 弱提示
	setTimeout(function(){
		$('.all_tip').hide()
	},5000);
//	$('.keep').click(function(){
//		$('.all_tip').show();
//		setTimeout(function(){
//			$('.all_tip').hide()
//		},1000);
//	})
	
	// 上传名片认证的初始化
	Qibao.userUpload('pickfiles_1', 'uploaded_key', 'upload_show_process_area_1', 'upload_display_1');
	$('.account_right img').click(function(){
		$('.check_id_fix').show();
	})
	$('.no').click(function(){
		$('.check_id_fix').hide();
	});
	
	// 验证
	$(".myform").Validform({
		tiptype: 4
	})
})