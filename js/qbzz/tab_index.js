$(function() {
	$(".product-content").hide().eq(0).show();
	$(".product-tab .product-top li").click(function() {
		var num = $(".product-tab .product-top li").index(this);
		$(".product-tab .product-top li").removeClass("active");
		$(this).addClass("active");
		$(".product-content").hide();
		$(".product-content").eq(num).show();

	});

});