$(function(){
//	$("#header").load("header.html",get);
//	$("#footer").load("footer.html"); 
	
	$(".companies .clickPart").click(function() {
		var company_name = $(this).data("name"),
			company_phone = $(this).data("phone"),
			company_url = $(this).data("url");
		$(".company_name").text(company_name);
		$(".company_phone").text(company_phone);
		$(".company_url").text(company_url);
		$(".all_fix").show();
	});
	$(document).on("click",".all_no,.no",function() {
		$(".all_fix").hide();
	})
	
	$(".moreTxt").click(function() {
		$(".hideCompany").toggleClass("hide");
		$(".moreImg").toggleClass("moreImgMove");
	});
})