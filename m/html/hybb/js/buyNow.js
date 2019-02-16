$(".start").click(function(){
	$(".all-fix").css("display","block");
	$("#start").css("display","block");
	$('html,body').addClass('ovfHiden'); //使网页不可滚动
})

//选择起运地
$("#start .left ").on("click","span", function() {
	var this_=$(this);
	$(this_).addClass("active").siblings().removeClass("active");
	var p=this_.text();
	var id=this_.attr("data-id");
	//获取城市
	$.ajax({
		type:"post",
		url:"/userpav/getSubCity",
		async:true,
		data:{"upid":id},
		dataType:"json",
		success:function(data){
			//清空起运地 城市
			$("#start .ul-div-body .right").empty();
			var str="";
			$.each(data.data,function(key,value){
				str=str+"<span data-id="+value.id+">"+value.name+"</span>";
			})
			//填充起运地城市
			$("#start .ul-div-body .right").append(str);
		}
	});
})

$("#start .right").on("click","span", function() {
	var this_=$(this);
	$(this_).addClass("active").siblings().removeClass("active");
	var p=$(".left .active").text();
	var shenID = $("#start .left .active").data("id");
	var shiID = this_.data("id");
	if(p.length>0){
		var c=this_.text();
		$(".start").siblings(".shen").val(shenID);
		$(".start").siblings(".shi").val(shiID);
		$(".all-fix").css("display","none");
		$("#start").css("display","none");
//		$(".left .active").removeClass("active");
		this_.removeClass("active")
		$(".start").val(p+" "+c);
		$(".start").siblings(".Validform_checktip").text("");
	}
	$('html,body').removeClass('ovfHiden'); //使网页恢复可滚
	var top2=$(".start").offset().top-300;
	$("html, body").stop().animate({scrollTop:top2},0);
	
})

$(".end").click(function(){
	$(".all-fix").css("display","block");
	$("#end").css("display","block");
	$('html,body').addClass('ovfHiden'); //使网页不可滚动
})

//选择目的地
$("#end .left").on("click","span",function(){
	var this_=$(this);
	$(this_).addClass("active").siblings().removeClass("active");
	var id=this_.attr("data-id");
	//获取城市
	$.ajax({
		type:"post",
		url:"/userpav/getSubCity",
		async:true,
		data:{"upid":id},
		dataType:"json",
		success:function(data){
			//清空目的地城市
			$("#end .ul-div-body .right").empty();
			var str="";
			$.each(data.data,function(key,value){
				console.log(value);
				str=str+"<span data-id="+value.id+">"+value.name+"</span>";
			})
			//填充目的地城市
			$("#end .right").append(str);
		}
	});
	
})

$("#end .right").on("click","span",function(){
	var this_=$(this);
	$(this_).addClass("active").siblings().removeClass("active");
	var p=$("#end .left .active").text();
	var shenID = $("#end .left .active").data("id");
	var shiID = this_.data("id");
	if(p.length>0){
		var c=this_.text();
		$(".end").siblings(".shen").val(shenID);
		$(".end").siblings(".shi").val(shiID);
		$(".all-fix").css("display","none");
		$("#end").css("display","none");
//		$(".left .active").removeClass("active");
		this_.removeClass("active")
		$(".end").val(p+" "+c);
		$(".end").siblings(".Validform_checktip").text("");
	}
	$('html,body').removeClass('ovfHiden'); //使网页恢复可滚
	var top2=$(".end").offset().top-300;
	$("html, body").stop().animate({scrollTop:top2},0);
})

//选择包装方式
$("input[name='packing']").click(function(){
	$(".all-fix").show();
	$(".packing-way").show();
	
})

$(".packing-way li").click(function(){
	$(".packing").val($(this).text());
	$(".packing").siblings(".Validform_checktip").html("");
	$(".all-fix").hide();
	$(".packing-way").hide();
})

//选择单位:
$(".midDiv input[name='unit']").click(function(){
	$(".all-fix").show();
	$(".number-choose").show();
})
$(".number-choose li").click(function(){
	$(".midDiv input[name='unit']").val($(this).text());
	$(".packing").siblings(".Validform_checktip").html("");
	$(".all-fix").hide();
	$(".number-choose").hide();
})



//金额
//$(document).on("blur","input[name='invoice_amount']",function(){
//	var val=$("input[name='invoice_amount']").val();
//	var last=val.substring(val.length-1,val.length);
//	if(last=="万"){
//		val=val.substring(0,val.length-1);
//	}
//	if(!/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$/.test(val)){
//		$("input[name='invoice_amount']").next(".Validform_checktip").text("金额格式错误 ");
//		return false;
//	}else{
//		$("input[name='invoice_amount']").next(".Validform_checktip").text("")
//	}
//	$("input[name='invoice_amount']").val(val+"万");
//})

//确认退出登录
$(".loginout").click(function(){
	$(".all-fix").css("display","block");
	$(".z-center").css("display","block");
	$('html,body').addClass('ovfHiden');
})
$(".fixBnt button,.all-no").click(function(){
	$(".all-fix").css("display","none");
	$(".z-center").css("display","none");
	$('html,body').removeClass('ovfHiden');
})




//时间插件
$(function () {

	var nowData=new Date();

    var opt= { 

    	theme:'ios', //设置显示主题 

        mode:'scroller', //设置日期选择方式，这里用滚动

        display:'bottom', //设置控件出现方式及样式

        preset : 'datetime', //日期:年 月 日 时 分

        minDate: new Date(nowData.getFullYear(),nowData.getMonth(),nowData.getDate(),nowData.getHours()+1,00),

		maxDate:new Date(nowData.getFullYear(),nowData.getMonth()+25,nowData.getDate(),22,00),

        //dateFormat: 'yy-mm-dd ', // 日期格式

		// dateOrder: 'yymmdd', //面板中日期排列格式

        stepMinute: 5, //设置分钟步长

        yearText:'年', 

        monthText:'月',

        dayText:'日',

        hourText:'时',

        minuteText:'分',

        lang:'zh' //设置控件语言};
    };
    $('.time').mobiscroll(opt);
	$(".time").siblings("input").mobiscroll(opt);

});
$(".time").change(function(){
	console.log($(this).val());
	var time=$(this).val();
	var array=time.split("/");
	var y=array[0];
	var m=array[1];
	var darray=array[2].split(" ");
	var d=darray[0];
	var harray=darray[1].split(":");
	var h=harray[0];
	$(this).val(y+"-"+m+"-"+d+" "+h+"时");
	
})

$(".logout").click(function(){
	$(".all-fix").show();
	$(".z-center").show();
})


