$(function(){
	
	$('#need').change(function(){ 
		if($("#need").val()==2){
			$(".select_ul").css({display:"none"});
		}else{
			$(".select_ul").css({display:"block"});
		}
	});
	
	// 点击所在城市 弹框
	$('#selt-city').click(function(e){
		e.stopPropagation();
		$('.city').show();
	});
	// 点击热门或字母
	$('.city_top li').click(function(){
		$('#selt-city').focus()
		$(this).children().addClass('choose');
		$(this).siblings().children().removeClass('choose');
	});
	$('.city_top li').eq(0).click(function(){
		$('.hot_city').show().siblings().hide();
	});
	$('.city_top li').eq(1).click(function(){
		$('.city_a_d').show().siblings().hide();
	});
	$('.city_top li').eq(2).click(function(){
		$('.city_e_h').show().siblings().hide();
	});
	$('.city_top li').eq(3).click(function(){
		$('.city_j_m').show().siblings().hide();
	});
	$('.city_top li').eq(4).click(function(){
		$('.city_n_s').show().siblings().hide();
	});
	$('.city_top li').eq(5).click(function(){
		$('.city_t_x').show().siblings().hide();
	});
	$('.city_top li').eq(6).click(function(){
		$('.city_y_z').show().siblings().hide();
	});
	// 点击城市
	$('.city_cont span').click(function(){
		var city = $(this).text();
		$('#selt-city').val(city);
		$('.city').hide();
		var cityId = $(this).data('id');
		$('.inpt-hide').val(cityId);
		$('.cityInpt .Validform_checktip').html('');
	});
	$('.city_top img').click(function(){
		$('.city').hide();
	});
	$(document).bind("click",function(e){
		var target  = $(e.target);
		if(target.closest(".city").length == 0){
	    	$(".city").hide();
		}
	});
	
})
