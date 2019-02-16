var T = {} ;
(function () {
    function getTemp(a){
    	return '<div class="fabu_fix" style="display:block;">'+
					'<div class="no chacha"></div>'+
					'<div class="ok_fix_top">温馨提示：</div>'+
					'<div class="all_top clear">'+
						'<div class="bounced_pic"></div>'+
						'<p>'+a+'</p>'+
					'</div>'+
					'<span class="fabu_yes">确认</span>'+
				'</div>'
    };
    function getTemp1(a){
    	return '<div class="fabu_fix" style="display:block;">'+
					'<div class="no chacha"></div>'+
					'<div class="ok_fix_top">退回报价：</div>'+
					'<textarea rows="7" cols="60" placeholder="请输入退回保价的缘由及事项说明,可不填写"></textarea>'+
					'<div class="all_top1 clear">'+
						'<p>'+a+'</p>'+
					'</div>'+
					'<span class="fabu_yes">确认</span>'+
				'</div>'
    };
    
    function addTemp(options){
		$(options.ele).append(getTemp(options.a));
    	$("body").on("click",".fabu_fix .fabu_yes",function(){
    		if (options.url == 'close') {
    			$(".no").click();
    		} else {
    			window.location.href=options.url;
    		}
    	})
    };
    function addTemp1(options){
    	$(options.ele).append(getTemp1(options.a));
    	$("body").on("click",".fabu_fix .fabu_yes",function(){
    		if (options.url == 'close') {
    			$(".no").click();
    		}else {
    			window.location.href=options.url;
    		}
    	})
    };
    T.addTemp = addTemp;
    T.addTemp1 = addTemp1;
})(T);

//var index;
$(document).on("click",".click-sure",function(){
	$(".moreBtnDiv").addClass("hide"); 
	$(".all_fix").css({display:"block"});
	T.addTemp({ele:".all_fix",a:$(this).data("message"),url:$(this).data("url")});
});
$(document).on("click",".click-sure1",function(){
	$(".moreBtnDiv").addClass("hide"); 
	$(".all_fix").css({display:"block"});
	T.addTemp1({ele:".all_fix",a:$(this).data("message"),url:$(this).data("url")});
});
$("body").on("click",".no",function(){ 
	$(".all_fix").css({display:"none"});
	$(".fabu_fix").css({display:"none"});
	$(".look_fix").css({display:"none"});
	$(".upload_fix").css({display:"none"});
});
$(".all_no").click(function(){
	$(".all_fix").css({display:"none"});
	$(".look_fix").css({display:"none"});
	$(".fabu_fix").css({display:"none"});
	$(".upload_fix").css({display:"none"});
});
//
// //兼容IE8下拉框
// $(function(){
//     $("select").on("change",function(){
//         var this_=this;
//         $(this_).parent().siblings(".spTime1").text($("option:selected",this_).text());
//         $(this_).siblings(".product-all").text($("option:selected",this_).text());
//     })
// })
//
// $(function () {
//
//     $("select").each(function(){
//         var this_=this;
//         if($("option:selected",this_).text().length!==0){
//             $(this_).parent().siblings(".spTime1").text($("option:selected",this_).text());
//             $(this_).siblings(".product-all").text($("option:selected",this_).text());
//         }
//             $(".spTime1").show();
//             $(".product-all").show();
//
//     })
// })
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
    if(!!window.ActiveXObject || "ActiveXObject" in window){
        if($("input[type='text']").length!=0&&$(".dBody").length==0){
            $(".content").wrapAll("<div class='dBody'></div>");
            $(".content").css("margin-top","20px");
            $(".now.clear").css("top","43px");
            $(".content_top.clear").css("margin-top","-106px");
            $(".top").css("position","absolute");
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

$(function(){
    $(window).scroll(function(){
      	if(isIE){
			$("input").each(function(){
		    	var isFocus=$(this).is(":focus");  
				if(true==isFocus){  
					if($(document).scrollTop()>($(this)).offset().top-82){
						$(this).blur();
					}
				}
		  	});
		  	$("textarea").each(function(){
		    	var isFocus=$(this).is(":focus");  
				if(true==isFocus){  
					if($(document).scrollTop()>($(this)).offset().top-82){
						$(this).blur();
					}
				}
		  	});
		}

    })
})

// $(".product-all").parent().css("width","100px");
$(function(){  
    $('input[placeholder]').placeholder();  
});  
