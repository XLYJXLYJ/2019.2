$(function(){
	
	$('#datetimepicker1').datetimepicker({
		language: 'zh-CN', 
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  0,
		autoclose: 1,
		todayHighlight: 1,
		endDate:new Date(),
		startView: 2,
		minView:2,
		forceParse: 0,
		clearBtn:true,
        showMeridian: 1
    });
    $('#datetimepicker2').datetimepicker({
		language: 'zh-CN', 
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  0,
		autoclose: 1,
		todayHighlight: 1,
		endDate:new Date(),
		startView: 2,
		minView:2,
		forceParse: 0,
		clearBtn:true,
        showMeridian: 1
    });
    
})
