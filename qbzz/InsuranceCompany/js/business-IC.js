$(function(){
	// 点击创建业务部门，弹框
	$('.creat_business').click(function(){
		$('.invite_fix input').val('')
		if ($("input[name='area_id']").val()==''){
            $('.all_tip').text('请先选择城市').show();
            setTimeout(function(){
                $('.all_tip').hide();
            },1000);
            return false;
        }
        if ($("#busi_sel_01").val()==''){
            $('.all_tip').text('请先选择分公司').show();
            setTimeout(function(){
                $('.all_tip').hide();
            },1000);
            return false;
        }
		$("input[name='subsidiary_id']").val($("#busi_sel_01").val());
		$('.all_fix').show();
	});
	$('.no').click(function(){
		$('.all_fix').hide();
		$('.check_id_fix').hide();
	});
//	// 点击所在城市 弹框
//	$('.check_city').click(function(e){
//		e.stopPropagation();
//		$('.city').show();
//	});
//	// 点击热门或字母
//	$('.city_top li').click(function(){
////		$('.check_city').focus()
//		$(this).children().addClass('choose');
//		$(this).siblings().children().removeClass('choose');
//	});
//	$('.city_top li').eq(0).click(function(){
//		$('.hot_city').show().siblings().hide();
//	});
//	$('.city_top li').eq(1).click(function(){
//		$('.city_a_d').show().siblings().hide();
//	});
//	$('.city_top li').eq(2).click(function(){
//		$('.city_e_h').show().siblings().hide();
//	});
//	$('.city_top li').eq(3).click(function(){
//		$('.city_j_m').show().siblings().hide();
//	});
//	$('.city_top li').eq(4).click(function(){
//		$('.city_n_s').show().siblings().hide();
//	});
//	$('.city_top li').eq(5).click(function(){
//		$('.city_t_x').show().siblings().hide();
//	});
//	$('.city_top li').eq(6).click(function(){
//		$('.city_y_z').show().siblings().hide();
//	});
//	// 点击城市
//	$('.city_cont span').click(function(){
//		var city = $(this).text();
//		$('.check_city').val(city);
//		$('.city').hide();
//		var cityId = $(this).data('id');
//		$('.inpt-hide').val(cityId);
//		$('.diInpt .Validform_checktip').html('');
//	});
//	$('.city_top img').click(function(){
//		$('.city').hide();
//	});
//	$(document).bind("click",function(e){
//		var target  = $(e.target);
//		if(target.closest(".city").length == 0){
//	    	$(".city").hide();
//		}
//	});
	$('.sure_up_ok').click(function(){
		$('.check_id_fix').hide();
	});
	
	//下拉箭头
    $(document).on("change",".selc",function(){
		var optionvalue=$(this).find("option:selected").text();
		$(this).siblings(".selcSpan").text(optionvalue).css({"border-color":"#524ae7"});
	});
	$(".selc").blur(function(){
		$(this).siblings(".selcSpan").css({"border-color":"#e9e9f4"});
	});

})
