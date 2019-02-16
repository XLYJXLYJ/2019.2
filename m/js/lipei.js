$(function(){
	var opt = {};
	opt.date = {
		preset: 'date'
	};
	opt.default = {
		theme: 'android-ics light', //皮肤样式
		display: 'modal', //显示方式 
		mode: 'scroller', //日期选择模式
		lang: 'zh',
		setText: '确定',
        cancelText: '取消',
		minDate: new Date()
	};   
	$("#datetimepicker3").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
	
	
    $(".myform").Validform({
        tiptype: 4,
        btnSubmit:".end-bt", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
        ignoreHidden:true,
        ajaxPost:true,
        datatype:{
        	'name':/^[\w\u4E00-\u9FA5()（）]{2,30}$/,
            'phone':/^1\d{10}$/,
            'price':/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/
        },
        callback:function (data) {
			if (data.code==200){
				window.location.href='/index/claimsSuccess'
			}else{
                $('.chongfu').text(data.info).show();
				var ste = setTimeout(function () {
                    $('.chongfu').hide();
                    clearTimeout(ste);
                },2000)
			}
        }
    });
    $(document).on("change",".cont-information .correct",function(){
    	$(this).siblings("span.Validform_checktip").css({display:"none"});
    	$(this).siblings("span.poto").css({display:"none"});
    });
})