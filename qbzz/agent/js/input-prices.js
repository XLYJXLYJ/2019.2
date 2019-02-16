$(function(){
	// 总保费
	$(document).on('blur','.input-prices',function(){
		var priceAll = $(this).val();
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
		
	})
})
