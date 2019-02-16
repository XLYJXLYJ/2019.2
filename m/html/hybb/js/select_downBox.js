var T = {} ;
(function () {
//  function getTemp(ids){
//		return '<ul class="fix-cont" id='+ids+'>'+
//			'</ul>'
//  };
//  function addTemp(options){
//		$("body").append(getTemp(options.id));
//		$("#"+options.id).animate({bottom:"0"},200);
//		var liFirst="",li="";
//		for(var i=0;i<options.a.length;i++){
//			var nubs=0;
//			if(options.id=="check-type1"){
//				nubs = Number(i)+1;
//				liFirst = '<li data-type=" " data-nub="0">请选择一级货物类型</li>';
//			} else if (options.id=="check-type2"){
//				nubs = Number(i)+1;
//				liFirst = '<li data-type=" " data-nub="0">请选择二级货物类型</li>';
//			} else {
//				nubs = Number(i);
//				liFirst="";
//			}
//			li += "<li data-type="+ options.price[i] +" data-nub="+ nubs +">"+ options.a[i] +"</li>";
//  	};
//		$("#"+options.id).html(liFirst+li);
//		$("#"+options.id).find("li").eq(options.nubs).addClass("active");
//  };
    $("body").on("click",".select-box",function(){
    	var index=$(".select-box").index(this);
    	if(index==0){//条款
    		$.ajax({
	    		type:"post",
	    		url:"/userpav/getProduct",
	    		async:false,
	    		data:{},
				dataType:"json",
	    		success:function(res){
	    			
	    		}
	    	})
			$(".all-fix").show();
    		$(".fix-cont").show();
    		
    	}else if(index==1){//货物类型
    		$.ajax({
	    		type:"post",
	    		url:"/userpav/getProduct",
	    		async:false,
	    		data:{},
				dataType:"json",
	    		success:function(res){}
	    	})
			$(".all-fix").show();
    		$(".fix-cont1").show();
    	}
    	
    	
    })
    //选择条款
    $(document).on("click",".fix-cont li",function(){ 
    	var that=$(".select-box:eq(0)");
    	var text=$(this).text();
    	$(".select-box:eq(0)").val(text);
    	that.siblings("span.Validform_checktip").css({display:"none"});
    	$(this).addClass("active").siblings().removeClass("active");
    	var ct=$(this).html();
    	$(".all-fix").css({display:"none"});
    	$(".fix-cont").hide();
		$(that).siblings("input[type='hidden']").val($(this).data("type"));
	});	
	
	//选择货物类型
	$(document).on("click",".fix-cont1 li",function(){ 
    	var that=$(".select-box:eq(1)");
    	var text=$(this).text();
    	that.val(text);
    	that.siblings("span.Validform_checktip").css({display:"none"});
    	$(this).addClass("active").siblings().removeClass("active");
    	var ct=$(this).html();
    	$(".all-fix").css({display:"none"});
    	$(".fix-cont1").hide();
		$(that).siblings("input[type='hidden']").val($(this).data("type"));
	});	
	

//	$("body").on("click","#check-plan li",function(){
//		var type=$(this).data("type");
//		var price=$(this).data("price");
//		var nub=$(this).data("nub");
//		if(that.data("nub") != nub) {
//			$("#check-typeInit1").remove();
//			$("#check-typeInit2").remove();
//			$(".typeKind1").data("nub","0");
//			$(".typeKind1").attr("value","请选择一级货物类型");
//		    that.data("nub",nub);
//	    	that.data("pnub",price);
//			$.ajax({
//	    		type:"post",
//	    		url:"/userpav/getProduct",
//	    		async:false,
//	    		data:{"type":type},
//				dataType:"json",
//	    		success:function(res){
//	    			var rate = res.data.rate;
//	    			$(".rate").attr("value",rate);
//	    			var products = res.data.product;
//	    			var typePrice="",typeMessage="";
//			    	$(products).each(function(index,item){
//			    		if(index==0) {
//			    			typePrice += item.id;
//			    			typeMessage += item.name;
//			    		} else {
//			    			typePrice += ","+item.id;
//			    			typeMessage += "," +item.name;
//			    		}
//			    	})
//			    	$(".typeKind1").data("price",typePrice);
//			    	$(".typeKind1").data("message",typeMessage);
//	    		}
//	    	});
//		}
//	});
//	
//
//  T.addTemp = addTemp;
})(T);

$(".select-box,.selectPlace,.time").focus(function(){
	var zz=$(this);
	var zztime=setTimeout(function(){
		zz.blur();
		clearTimeout(zztime);
	});
	
});
//var that;
//$(document).on("click",".select-box",function(){
//	$(this).blur();
//	that=$(this);
//	$(".all-fix").css({display:"block"});
//	var index = that.index(".select-box");
//	if($("#check-typeInit1").length>0 && index==1) {
//		$("#check-typeInit1").css({display:"block"});
//	} else if ($("#check-typeInit2").length>0 && index==2) {
//		$("#check-typeInit2").css({display:"block"});
//	}
//	else {
//		var ids=$(this).data("id");
//		var nub=$(this).data("nub");
//		var datas=$(this).data("message").split(",");
//		if($(this).data("price")){
//			var prices=$(this).data("price").split(",");
//		}else{
//			var prices=[];
//		}
//		T.addTemp({id:ids,a:datas,ele:that,price:prices,nubs:nub});
//	}
//	
//});




//键盘遮盖输入框问题
$(document).on("click",".cont-information input",function(){
	var top=$(this).offset().top-100;
	document.body.scrollTop=top;
});

//保险协议    
$(document).on("click",".insur_clause",function(){
	$(".baoxian-fix").css({display:"block"});
	$(".clause-type").css({display:"block"});
});
$("body").on("click",".all-no,.delete",function(){
	$(".all-fix").css({display:"none"});
	$(".fix-cont").hide()
	$(".fix-cont1").hide()
	$(".baoxian-fix").css({display:"none"});
	$(".clause-type").css({display:"none"});
	$("#start").css({display:"none"});
	$("#end").css({display:"none"});
	$("#check-typeInit1").css({display:"none"});
	$("#check-typeInit2").css({display:"none"});
	$(".packing-way").css({display:"none"});
	$(".number-choose").css({display:"none"});
});	


$(".myform").Validform({
    tiptype: 4,
    btnSubmit:".end-bt", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
    ignoreHidden:true,
    ajaxPost:true,
    datatype:{
            'price':/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$/,
            'fuwu':function(gets,obj,curform,regxp){
            	if($("moneyRed").val<=0.01){
            		return false;
            	}
            	
            }
    },
    beforeCheck:function(curform){
    	var jieguo=1;
		if($(".typeKind1").val()=="请选择货物类型"){
			$(".typeKind1").siblings(".Validform_checktip").text("请选择货物类型").css({display:"block"});
			jieguo= 0;
			var top2=$(".typeKind1").offset().top-300;
			$("html, body").stop().animate({scrollTop:top2},0);
			return false;
		} else{
			$(".typeKind1").siblings(".Validform_checktip").text("");
			jieguo= 1;
		};
		
		if($(".packing").val()=="请选择包装方式"){
			$(".packing").siblings(".Validform_checktip").text("请选择包装方式").css({display:"block"});
			jieguo=0;
			var top2=$(".packing").offset().top-300;
			$("html, body").stop().animate({scrollTop:top2},0);
			return false;
		}else{
			$(".packing").siblings(".Validform_checktip").text("");
			jieguo= 1;
		}
		
		if($(".unit").val().length==0){
			$(".unit").siblings(".Validform_checktip").text("请选择包装方式").css({display:"block"});
			jieguo=0;
			var top2=$(".unit").offset().top-300;
			$("html, body").stop().animate({scrollTop:top2},0);
			return false;
		}else{
			$(".unit").siblings(".Validform_checktip").text("");
			jieguo= 1;
		}
		
		if($(".start").val()==""){
			$(".start").siblings(".Validform_checktip").text("请选择起运地").css({display:"block"});
			jieguo= 0;
			var top2=$(".start").offset().top-300;
			$("html, body").stop().animate({scrollTop:top2},0);
			return false;
		} else{
			$(".start").siblings(".Validform_checktip").text("");
			jieguo= 1;
		};
		
		if($(".end").val()==""){
			$(".end").siblings(".Validform_checktip").text("请选择目的地").css({display:"block"});
			jieguo= 0;
			var top2=$(".end").offset().top-300;
			$("html, body").stop().animate({scrollTop:top2},0);
			return false;
		} else{
			$(".end").siblings(".Validform_checktip").text("");
			jieguo= 1;
		};
		
		if($(".time").val()==""){
			$(".time").siblings(".Validform_checktip").text("请选择起运时间").css({display:"block"});
			jieguo= 0;
			var top2=$(".time").offset().top-300;
			$("html, body").stop().animate({scrollTop:top2},0);
			return false;
		} else{
			$(".time").siblings(".Validform_checktip").text("");
			jieguo= 1;
		};
		//单号验证
    	var danhao=1,yanzhen=1;
		if($(".danhaoIpt").val()){
			var number = $(".danhaoIpt").val();
			$.ajax({
				type:"post",
				url:"/userpav/checkNumber",
				data:{"number":number},
				dataType: 'json',
				async:false,
				success:function(res){
					if(res.code!=200) {
						var top2=$(".danhaoIpt").offset().top-200;
						$("html, body").stop().animate({scrollTop:top2},0);
						$(".danhaoIpt").siblings(".Validform_checktip").html(res.msg).css({display:"block"});
						yanzhen=0;
					}
				}
			});
			danhao=1;
		}
		
		// 金额验证
		var totalMoney = $(".midDiv .input-prices").val();
		//var moneyNum = totalMoney.replace(/,/g,'');
		var moneyNum=parseInt(totalMoney);
		if(moneyNum>1000000 || moneyNum<=0) {
			$(".midDiv .input-prices").siblings(".Validform_checktip").text("保险金额在(0-100万]之间").css({display:"block"});
			yanzhen=0;
		}
		if(jieguo==0 || danhao==0 || yanzhen==0 ){
			return false;
		}


		if($(".midDiv .moneyRed").val()<0.1){
			$(".midDiv .moneyRed").siblings(".Validform_checktip").text("服务费用小于0.1元，无法提交").css({display:"block"});
			return false;
		}else{
			$(".midDiv .moneyRed").siblings(".Validform_checktip").text("").css({display:"none"});
		}
   	},
   	beforeSubmit:function(curform){
   		
	},
	callback:function(data) {
		if(data.code==200) {
			window.location.href = "/userpav/orderDetail/id/"+data.data.orderId;
		} else {
			window.location.href = "/userpav/purchase";
		}
	}
});

$(".midDiv input[name='invoice_amount']").change(function(){
	var totalMoney = $(this).val();
	if(!/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$/.test(totalMoney)){
		$(".midDiv input[name='invoice_amount']").siblings(".Validform_checktip").text("金额格式错误");
		return false;
	}else if(totalMoney.trim()==0){
		$(".midDiv input[name='invoice_amount']").siblings(".Validform_checktip").text("请输入保险金额");
		return false;
		
	}else{
		$(".midDiv input[name='invoice_amount']").siblings(".Validform_checktip").text("");
		
	}
	
	
	//var moneyNum = totalMoney.replace(/,/g,'');
	var  moneyNum=totalMoney*10000;
	if(0<moneyNum && moneyNum<=1000000) {
		var rate = $(".rate").val();
		var rateNum = rate.replace(/%/,"")/100;
		var fuwuMoney = Math.ceil(moneyNum*rateNum*100)/100;
		$(".midDiv .moneyRed").val(fuwuMoney.toFixed(2));
		$(this).siblings(".Validform_checktip").text("");
	} else {
		$(this).siblings(".Validform_checktip").text("保险金额在(0-100万]之间").css({display:"block"});
		$(".midDiv .moneyRed").val("")
	}
})

$(".time").change(function(){
	$(this).siblings(".Validform_checktip").text("");
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

//              dateOrder: 'yymmdd', //面板中日期排列格式

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
$(".time").change(function(){})

