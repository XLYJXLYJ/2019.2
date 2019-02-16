// 将数字显示成千分位的两位小数金额
(function(){
	var fmoney = function(s) {    //s:传入的数字金额
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + ""; 
		var l = s.split(".")[0].split("").reverse(), 
			r = s.split(".")[1], 
			t = ""; 
		for(var i=0; i<l.length; i++ ){ 
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
		} 
		return t.split("").reverse().join("") + "." + r; 
	}; 
	
	// span标签
	$('.moneySpan').each(function(){
		var money = parseInt($(this).text());
		$(this).text(fmoney(money));
	});
	// input标签
	$('.moneyInput').each(function(){
		var money = parseInt($(this).val());
		$(this).val(fmoney(money));
	});
})()
