$(function(){
	$.each(countryList.hot,function(key,value){
		var li=$('<li data-id="'+key+'">'+value+'</li>');
		$(".ulCountry_type").append(li);
	});
	//国家选择
	$(document).on("click",".world",function(e){
		e.stopPropagation();
		$(this).siblings(".qb_sbbb").show();
	});
	$(document).on("click",".word-delete",function(){
		$(this).closest(".qb_sbbb").hide();
	});
	$(document).on("click",".qb_sbee li",function(){
		var id=$(this).data("id");
		$(this).closest(".qb_sbbb").hide();
		$(this).closest(".qb_sbbb").siblings(".worlds").attr("value",id);
		$(this).closest(".qb_sbbb").siblings(".world").val($(this).text());
		$(this).closest(".qb_sbbb").siblings(".Validform_checktip").html("");
	});
	$(document).on("click",".pr_nav li",function(){
		$(this).addClass("ac").siblings().removeClass("ac");
		var name=$(this).data("id");
		var that=$(this);
		that.closest(".qb_sbbb").find(".ulCountry_type").find("li").remove();
		$.each(countryList[name],function(key,value){
			var li=$('<li data-id="'+key+'">'+value+'</li>');
			that.closest(".qb_sbbb").find(".ulCountry_type").append(li);
		})
	});
	$(document).bind("click",function(e){
		var target  = $(e.target);
		if(target.closest(".qb_sbbb").length == 0){
		    $(".qb_sbbb").hide();
		}
	});

});