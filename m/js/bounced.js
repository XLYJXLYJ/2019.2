var T = {} ;
(function () {
    function getTemp(a,d){
    	return '<div class="claim_fix" style="display:block;">'+
					'<div class="claim_fix_top">温馨提示：</div>'+
					'<div class="claim_fix_msg">'+a+'</div>'+
					'<div class="fixBnt">'+ 
						'<a href="#" class="fixBnt_cancel no">取消</a>'+
						'<a href="#" class="fixBnt_submit" data-id="'+d+'">确定</a>'+
					'</div>'+
				'</div>'
    };
    function addTemp(options){
    	$(options.ele).append(getTemp(options.a,options.id));
    	$("body").on("click",".claim_fix .fixBnt_submit",function(){
    		if(options.taget == 'a'){
    			var form=$('<form method="get" action="'+options.url+'" target="_blank"><input type="text" value="'+options.tendersid+'" name="tendersId"/><input type="text" value="'+options.priceid+'" name="priceId"/></form>');
    			$(document.body).append(form);
    			form.submit();
    			var b=0;
    			
    			var ttime=setTimeout(function(){
    				window.location.reload();
    				clearTimeout;
    			});
    		}else{
    			if (options.url == 'close') {
	    			$(".no").click();
	    		} else if(options.url == 'order'){
	    			$(".no").click();
	    		}else {
	    			window.location.href=options.url;
	    		}
    		}
    		
    	})
    };
    T.addTemp = addTemp;
})(T);

$(document).on("click",".click-sure",function(){
	$(".all-fix").css({display:"block"});
	T.addTemp({id:$(this).data("id"),ele:".all-fix",a:$(this).data("message"),url:$(this).data("url"),taget:$(this).data("tag"),tendersid:$(this).data("tendersid"),priceid:$(this).data("priceid")});
});

$("body").on("click",".no,.all-no",function(){ 
	$(".all-fix").css({display:"none"});
	$(".claim_fix").css({display:"none"});
});

//$(".all-no").click(function(){
//	$(".all-fix").css({display:"none"});
//	$(".claim_fix").css({display:"none"});
//});