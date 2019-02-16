$(function(){
	// 总保费
	$(document).on('blur','.input-prices',function(){
		var priceAll = $(this).val().split(",").join("");
		function cc(s){
	        if(/[^0-9\.\ ]/.test(s)) {
	        	return s;
	        }
	        s=s.replace(/^(\d*)$/,"$1.");
	        s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
	        s=s.replace(".",",");
	        var re=/(\d)(\d{3},)/;
	        while(re.test(s)) {
	        	s=s.replace(re,"$1,$2");
	        }
	        s=s.replace(/,(\d\d)$/,".$1");
			return s
        }
		$(this).val(cc(priceAll));
		var blun=(/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/.test($(this).val()));
		if(blun){
			$(this).siblings(".Validform_checktip").html("");
		};
	})	
	
})
