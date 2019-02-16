var T = {} ;
(function () {
    function getTemp(a,url,id,page){
    	return '<div class="tank_fix" style="display:block;">'+
					'<div class="no chacha"></div>'+
					'<div class="ok_fix_top">温馨提示：</div>'+
					'<div class="all_top clear">'+
						'<div class="bounced_pic"></div>'+
						'<p>'+a+'</p>'+
					'</div>'+
					'<span class="fabu_yes" data-type="'+url+'" data-id="'+id+'" data-page="'+page+'">确认</span>'+
				'</div>'
    };
    function addTemp(options){
    	
    	if(options.id&&options.page){
    		$(options.ele).append(getTemp(options.a,options.url,options.id,options.page));
    	}else{
    		$(options.ele).append(getTemp(options.a,options.url,"",""));
    	}
    };
    T.addTemp = addTemp;
})(T);

var $delete;
$(document).on("click",".click-sure",function(){
	$delete = $(this).closest("tr").index();
	$(".all_fix").css({display:"block"});
	T.addTemp({ele:".all_fix",a:$(this).data("message"),url:$(this).data("url"),id:$(this).data("id"),page:$(this).data("page")});
});

$("body").on("click",".no,.all_no",function(){ 
	$(".all_fix").css({display:"none"});
	$(".tank_fix").css({display:"none"});
});


