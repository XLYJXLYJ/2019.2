$(function() {
	//$(".product_form").Validform();  //就这一行代码！;

	$(".product_form").Validform({
		tiptype: 3,
		showAllError: true,
		//传入自定义datatype类型【方式二】;
		datatype: {
			"china": /^[\u4e00-\u9fa5a-zA-Z]$/,
			"number": /^^(\+)?\d+(\.\d+)?$/,
			"number2": /^[0-9]*[1-9][0-9]*$/,
			"number3": /^[\u4E00-\u9FA5A-]+$/,
			"number4": /^[a-zA-Z\u4e00-\u9fa5\s()（）]+$/,
			"number5": /(-|\+)?\d+$/,
			"data": /^\+?(0|[1-9][0-9]*)$/,
		}

	});

	//通过$.Tipmsg扩展默认提示信息;
	$.Tipmsg.w["china"] = "请输入中文或英文";
	$.Tipmsg.w["number"] = "只能由数字或小数点组成";
	$.Tipmsg.w["number2"] = "最少1个金币起";
	$.Tipmsg.w["number3"] = "只能输入中文和数字";
	$.Tipmsg.w["number4"] = "请输入中文或英文";
	$.Tipmsg.w["data"] = "只能0或任意正整数";
	$.Tipmsg.w["number5"] = "请输入数字";

});