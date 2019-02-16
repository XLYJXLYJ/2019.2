//增删千分位符、小数点两位
$("#insuredForm").on('blur', ".add_thousand", function() {
	var _input_val = $(this).val();
	if(_input_val != "") {
		_input_val = parseFloat(_input_val).toFixed(2);
		$(this).val(_input_val);
		//			$(this).val(input_val.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,'));
	}
});

//	$("#insuredForm").on('focus', "#add_thousand", function() {
//		var _input_val = $(this).val();
//		if(_input_val != "") {
//			$(this).val(_input_val.replace(/,/g, ''));
//		}
//	});