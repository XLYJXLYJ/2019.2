$(function(){
    (function ($) {
        $.getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    })(jQuery);

	//下拉箭头
    $(document).on("change",".selc",function(){
		var optionvalue=$(this).find("option:selected").text();
		$(this).siblings(".selcSpan").text(optionvalue).css({"border-color":"#524ae7"});
	});
	$(".selc").blur(function(){
		$(this).siblings(".selcSpan").css({"border-color":"#e9e9f4"});
	});
	
	//日期
	$('#datetimepicker1').datetimepicker({ 
		language: 'zh-CN', 
        format: 'yyyy-mm-dd:hh',
        weekStart: 1,
        todayBtn:  0,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView:1,
		startDate:new Date(),
		forceParse: 0,
        showMeridian: 1
   	});
   	
   	//单号验证
   	$(document).on("blur",".danhao .input_short",function(){
   		$(".danhao-error").html("");
   		var cont=$(this).val();
   		var result=(/^[\s\S]{0,20}$/.test(cont));
		if(!result){
			$(this).siblings(".error").show().addClass("errors");  
		}else{
			$(this).siblings(".error").hide().removeClass("errors"); 
		};
   	});
   	
   	//地址二级联动
    $(".city_3").citySelect({
		prov:"广东", 
	});
	$(".city_4").citySelect({
		prov:"广东", 
	});
	$(".city_3 .prov").on("change",function(){ 
		var that=$(this);
		setTimeout(function(){
			var name=that.closest(".city_3").find(".city option:selected").val();
			that.closest(".city_3").find(".city").siblings(".selcSpan").html(name);
		})
	});
	$(".city_4 .prov").on("change",function(){
		var that=$(this);
		setTimeout(function(){
			var name=that.closest(".city_4").find(".city option:selected").val();
			that.closest(".city_4").find(".city").siblings(".selcSpan").html(name);
		})
	});
	
	//运输方式
	$(".transport").on("change",function(){
		var vals=$(".transport").val();
		if(vals==1){
			$(".Conveyance").val("全密封厢式货车");
		}else if(vals==2){
			$(".Conveyance").val("非密封货车");
		}else if(vals==3){
			$(".Conveyance").val("飞机");
			$(".transport-error").html("");
		}else if(vals==4){
			$(".Conveyance").val("火车");
			$(".transport-error").html("");
		}else if(vals==5){
			$(".Conveyance").val("轮船");
			$(".transport-error").html("");
		}else if(vals==6){
			$(".Conveyance").val("汽车");
			$(".transport-error").html("");
		}
	});
	//车牌号验证
	$(".transport-put").on("change",function(){
		$(".transport-error").html("");
	});
	//上传提单验证
	$(".upload .tell").bind("DOMNodeInserted",function(e){
	    $(".upload .Validform_checktip").html("");
	    $(this).css({color:"#555"});
	});
	//信用证验证
//	$(".letter input").on("change",function(){
//		$(this).siblings(".Validform_checktip").html("");
//	});
	$(".letter-of-credit .yes").on("click",function(){
		$(".letter").show();
	});
	$(".letter-of-credit .no").on("click",function(){
		$(".letter").hide().find(".Validform_checktip").html("");
	});
   	//表单验证
	$(".myform").Validform({
        tiptype: 4,
        btnSubmit:".btn_ok", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
        ignoreHidden:true,
        datatype:{
//      	'name':/(?=.*\(.*\)|.*（.*）)^[a-zA-Z0-9\u4e00-\u9fa5()（）]*$|^[a-zA-Z0-9\u4e00-\u9fa5]*$/,
//          'phone':/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{2}-\d{7}$|^0\d{3}-\d{7}$|^0\d{3}-\d{8}$/,
            "number":/^[1-9]\d*$/,
//          "rate1":/^([1-2][0-9]){1}$|^[3][0]$|^[1-2][0-9]\.[0-9]+$/,
            "rate1":/^[3][0](\.[0]+)?$|^([1-2][0-9]){1}(\.[0-9]+)?$|^([0-9]){1}(\.[0-9]+)?$/,
            "rate2":/^[0]\.[0][2][5-9](\d*)+$|^\d\.\d[3-9](\d*)+$|^\d\.[1-9]+$|^[1-9]{1,}(\.?)(\d{0,})+$/,
            'price':/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/
        },
        beforeCheck:function(curform){
        	//单号验证
        	var danhao=1;
        	var danhaos=1;
        	var yanzhen=1;
        	$(".input_short").each(function(){
        		if($(this).val()==""){
        			danhao=0;
        		}else{
        			var type = $(this).data("type");
        			if(type!=3) {  // 判断运单号与发票号是否重复
        				var number = $(this).val();
        				$.ajax({
	        				type:"post",
	        				url:"/cargo/checkNumber",
	        				data:{"type":type,"number":number},
							dataType: 'json',
	        				async:false,
	        				success:function(res){
	        					if(res.code!=200) {
	        						var top2=$(".input_short").offset().top-200;
									$("html, body").stop().animate({scrollTop:top2},0);
	        						$(".danhao-error").html(res.msg);
	        						yanzhen=0;
	        					}
	        				}
	        			});
        			}
        			danhao=1
        			return false;
        		}
        		
        		
        	});
        	if(danhao==0){
        		var top2=$(".input_short").offset().top-200;
				$("html, body").stop().animate({scrollTop:top2},0);
        		$(".danhao-error").html("请填写单号");
        		return false;
        	};
        	$(".error").each(function(){
        		if($(this).hasClass("errors")){
        			danhaos=0;
        			return false;
        		}else{
        			danhao=1;
        		}
        	});
        	if(danhaos==0 || yanzhen==0){
        		return false;
        	};
        	
        	
        	//车牌号验证
        	var vals=$(".transport").val();
        	if(vals=='1'||vals=='2'){
        		if($(".transport-put").val()==""){
        			$(".transport-error").html("请输入车牌号");
        			return false;
        		}
        	};	
        	//国家选择验证
        	if($(".word_3 .world").val()==""){
        		$(".word_3").find(".Validform_checktip").html("请选择国家");
        		return false
        	};
        	if($(".word_4 .world").val()==""){
        		$(".word_4").find(".Validform_checktip").html("请选择国家");
        		return false
        	};
        	//投保金额
        	if($('#premium1').hasClass('active')||$('#premium').hasClass('active')){
        		return false;
        	}
        	
//      	//上传提单验证
//      	if($(".upload .tell").html()=="请上传提单附件"){
//				$(".upload .Validform_checktip").html("请上传提单附件");
//				return false
//			};
			//发票金额大于700万
			var amount=$('input[name="invoice_amount"]').val();
			if($('input[name="addition"]').length!=0){
				var additions=$('input[name="addition"]').val();
				var transtype=3;
			}else{
				var additions=0;
				var transtype=2;
			};
			var currency=$('select[name="currency_id"]').val();
			var rates=$("#rate").html();
			var priceresult=1;
			var insurance = $.getUrlParam('goodsType');
			$.ajax({
				type:"post",
				url:"/cargo/checkPrice",
				dataType: 'json',
				async:false,
				data:{"invoice_amount":amount,"addition":additions,"currency_id":currency,"transtype":transtype,"insurance":insurance},
				success:function(data){
					if(data.code==10018){
						$(".inpt_money").siblings(".Validform_checktip").html(data.msg);
						$("html, body").stop().animate({scrollTop:500},0);
						priceresult=0;
					};
				},
				error:function(){
			//  	alert("网络错误，请稍后再尝试！");
				}
			});
			if(priceresult==0){
				return false;
			}
        	//信用证验证
//      	if($(".yes").is(":checked")){
//				if($(".letter input").val()==""){
//					var top4=$(".letter").offset().top-200;
//					$("html, body").stop().animate({scrollTop:top4},0);
//					$(".letter .Validform_checktip").html("请输入信用证号码");
//					return false
//				}
//			}
        }
	});
	
	//国家选择
	$(document).on("click",".world",function(e){
		e.stopPropagation();
		$(this).siblings(".qb_sbbb").show();
	});
	$(document).on("click",".word-delete",function(){
		$(this).closest(".qb_sbbb").hide();
	});
	$(document).on("click",".qb_sbee li",function(){
		var id=$(this).data("id");
		$(this).closest(".qb_sbbb").hide();
		$(this).closest(".qb_sbbb").siblings(".worlds").attr("value",id);
		$(this).closest(".qb_sbbb").siblings(".world").val($(this).text());
		$(this).closest(".qb_sbbb").siblings(".Validform_checktip").html("");
	});
	$(".word_3").on("click",".qb_sbee li",function(){
		var id=$(this).data("id");
		if(id != "1") {
			$(".word_4 .world").attr("disabled",true).val("中华人民共和国（不含港、澳、台地区） China");
			$(".word_4  .worlds").attr("value","1");
		} else {
			$(".word_4 .world").attr("disabled",false).val("");
			$(".word_4  .worlds").attr("value","");
		}
	});
	
	$(document).on("click",".pr_nav li",function(){
		$(this).addClass("ac").siblings().removeClass("ac");
		var name=$(this).data("id");
		var that=$(this);
		that.closest(".qb_sbbb").find(".ulCountry_type").find("li").remove();
		$.each(countryList[name],function(key,value){
			var li=$('<li data-id="'+key+'">'+value+'</li>');
			that.closest(".qb_sbbb").find(".ulCountry_type").append(li);
		})
	});
	$(document).bind("click",function(e){
		var target  = $(e.target);
		if(target.closest(".qb_sbbb").length == 0){
		    	$(".qb_sbbb").hide();
		}
	});
	$(document).on("click",".word_4 .world",function(){
		$(".word_3 .qb_sbbb").hide();
	});
	$(document).on("click",".word_3 .world",function(){
		$(".word_4 .qb_sbbb").hide();
	});
	
	//日期选择
	$("#datetimepicker1").change(function(){
		$(this).siblings(".Validform_checktip").html("");
	});
	
	
	//附件
//	$(document).on("click",".add_pic",function(){
//		var obj=$(".fujian").eq(0).clone(true);
//		obj.find(".tell").html("请上传发票、LC等附件").css({color:"#999"});
//		obj.find(".reduce").show();
//		obj.find("input").val("");
//		$(".fujians").append(obj);
//	});
//	$(document).on("click",".reduce",function(){
//		$(this).parent().remove();
//	});
//	$(document).on("DOMNodeInserted",".tell",function(){
//		$(this).css({color:"#555"});
//	});
	
//	(function(){
//		var date= new Date();
//		var year= date.getFullYear(); 
//		var month= date.getMonth()+1;
//		var day= date.getDate();
//		var hour= date.getHours();
//		var min= date.getMinutes();
//		var sec= date.getSeconds();
//		$("#datetimepicker1").val(year+"-"+addZero(month)+"-"+addZero(day));
//	})();
//	function addZero(n){
//		if(n<10){
//			return "0"+n;
//		}else{
//			return n;
//		}
//	};
	
	// 货物种类的选择
//			$(seleOption).each(function(){         // 渲染货物种类的二级菜单
//				var select = $("<select class='selc style_selc2'></select>");
//				$(this.kind).each(function(){
//					var option = $("<option>"+this+"</option>");
//					select.append(option);
//				});
//				$('.div_selc').append(select);
//			});
//			
//			$(".style_selc").change(function(){   // 货物种类的二级联动
//				var opt1=$(this).find("option:selected").index();
//				$('.style_selc2').eq(opt1).show().siblings(".style_selc2").hide().find("option:selected").prop("selected",false);
//				$('.style_span2').text("请选择二级货物种类")
//			});
//			
//			// 包装方式的渲染
//			$(seleStyle).each(function(){
//				var option = $("<option>"+this+"</option>");
//				$('.div_style select').append(option);
//			});

	
	
})
