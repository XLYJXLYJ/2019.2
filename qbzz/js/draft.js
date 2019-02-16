$(function(){
	
	$(".prohibit").hover(function(){
		$(this).find("span").css({display:"block"});
	},function(){
		$(this).find("span").css({display:"none"});
	});
	
	$(".all_no").click(function(){
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
	});
	$(".fabu a").click(function(){
		$(".all_fix").css({display:"block"});
		T.addTemp({ele:".all_fix",a:"是否对该选中草稿标进行发布？",url:$(this).data("url")});
	})
	
	$(".delet").click(function(){
		$(".all_fix").css({display:"block"});
		T.addTemp({ele:".all_fix",a:"是否确认删除该选中的草稿标？",url:$(this).data("url")});
	})
	$("body").on("click",".no",function(){ 
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
	});
	//兼容IE8下拉框
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    $(function(){

        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 8) {
                $("select").css("opacity","0");
                $("select").css("filter","progid:DXImageTransform.Microsoft.Alpha(opacity=0)");
                $(".spTime1").css("margin-left", "-105px");
                $(".product-all").css("margin-left", "0px");
                $("select").each(function(){
                    var this_=this;
                    if($("option:selected",this_).text().length!==0){
                        $(this_).parent().siblings(".spTime1").text($("option:selected",this_).text());
                        $(this_).siblings(".product-all").text($("option:selected",this_).text());
                    }
                    $(".spTime1").show();
                    $(".product-all").show();

                })
            }
        }
    })

    $(function(){
        $("select").on("change",function(){
            if(isIE) {
                var this_ = this;
                $(this_).parent().siblings(".spTime1").text($("option:selected", this_).text());
                $(this_).siblings(".product-all").text($("option:selected", this_).text());
            }
        })
    })

    if($(".content").length!=0&&$("input[type='text']").length!=0&&$(".dBody").length==0){
        $(".content").wrapAll("<div class='dBody'></div>");
        $(".content").css("margin-top","20px");
        $(".now.clear").css("top","43px");
        $(".content_top.clear").css("margin-top","-106px");
        $(".top").css("position","absolute");
    }



});
