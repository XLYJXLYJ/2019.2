$(function() {
	$(".register-tab .form-inline").hide().eq(0).show();
	$(".register-tab .select-radio li input").click(function() {
		var num = $(".register-tab .select-radio li input").index(this);
		$(".register-tab .form-inline").hide();
		$(".register-tab .form-inline").eq(num).show();
	});
	
	//登录选项卡
	$(".design-tab dd").hover(function(){
		var TAB_INDEX=$(".design-tab dd").index(this);
		$(".design-tab dd").removeClass("active");
		$(this).addClass("active");
		$(".design-contact-tab").hide().eq(TAB_INDEX).show();
	});
});