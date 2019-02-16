$(function(){
	// 放大营业执照
	$(".invite_right img").click(function(){
		var srcs=$(this).attr("src");
		$(".all_fix").css({display:"block"});
		$(".zhizhao_pic").css({display:"block"});
		$(".zhizhao_pic .mid_pic").attr({src:srcs});
	});
	$(".all_no").click(function(){
		$(".all_fix").css({display:"none"});
		$(".zhizhao_pic").css({display:"none"});
	});
	$(".no").click(function(){
		$(".all_fix").css({display:"none"});
		$(".zhizhao_pic").css({display:"none"});
	});
	// 点击 项目或企业说明
	$(".price-titl").click(function(){
		var id = $(this).data('id');
		$(this).addClass('choose').siblings().removeClass('choose');
		if(id == 1){
			$('.baojia').show();
			$('.qiye').hide();
			$('.xiangmu').hide();
		}
		if(id == 2){
			$('.baojia').hide();
			$('.qiye').hide();
			$('.xiangmu').show();
		}
		if(id == 3){
			$('.baojia').hide();
			$('.xiangmu').hide();
			$('.qiye').show();
		}
	});
	$(".nexts").click(function(){
		var click_val = $(this).data("value");
		$("#price_type").val(click_val);
	});
	//保存草稿
	$(document).on("click",".hold",function(){
		var click_val = $(this).data("value");
		$("#price_type").val(click_val);
		var urls=$("#insuredForm").attr('action');
		$.ajax({
			type: 'post',
			url: urls,
			dataType: 'json',
			data:$('#insuredForm').serialize(),
			success: function(res) {
				if (res && res.code === 200) {
					window.location.href=res.data; 
				}
			}
		});
	});
	
	
	//提交报价
	$(document).on("click",".form-fix .sur-ok",function(){
		$(window).unbind('beforeunload');
		var urls=$("#insuredForm").attr('action');
		if($(".sur-cont-right label input").is(':checked')){
			$.ajax({
				type: 'post',
				url: urls,
				dataType: 'json',
				data:$('#insuredForm').serialize(),
				success: function(res) {
					if (res && res.code === 200) {
						window.location.href=res.data; 
					}
				}
			});
		}else{
			$(".sur-cont-right .Validform_checktip").show();
		}
	});	
	//监听勾选条款
	$(".sur-cont-right label").click(function(){
		$(".sur-cont-right .Validform_checktip").hide();
	});
	
	// 总保费
	$('.inpt-num').blur(function(){
		var priceAll = $('.inpt-num').val();
		var a=$('.inpt-num');
		var b=$('.priceAll');
		var c=$('.you-price-nub');
		toDecimal2(a,b,c,priceAll);
		baofei()
	});	
	
	function toDecimal2(obj1,obj2,obj3,x) { 
		function ccx(s){
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
		obj2.html(ccx(x));
		obj3.html(ccx(x));
	   
	}
    String.prototype.replaceAll  = function(s1,s2){
        return this.replace(new RegExp(s1,"gm"),s2);
    }
//报价提交验证
	$(".price_form").Validform({
        tiptype: 4,
        btnSubmit:".nexts", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;

        ignoreHidden:true,
        postonce: true,
        datatype:{
        	'name':/(?=.*\(.*\)|.*（.*）)^[a-zA-Z0-9\u4e00-\u9fa5()（）]*$|^[a-zA-Z0-9\u4e00-\u9fa5]*$/,
            'phone':/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{2}-\d{7}$|^0\d{3}-\d{7}$|^0\d{3}-\d{8}$/,
            "share":/^([1-9]\d*|0)(\.\d{1,2})?$/,
            "number":/^[1-9]\d*$/,
//          'price':/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/,
//          'price':/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$/,
			'price':/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/,
            'date':/^\d{4}-\d{2}-\d{2}$/
        },
        beforeCheck:function(curform){
			// if (!!window.ActiveXObject || "ActiveXObject" in window) {
             //    $("input[nullmsg]").each(function(){
            //
             //        if ($(this).siblings(".Validform_checktip.Validform_wrong").eq(0).length !== 0||$(this).val().length==0) {
            //
             //            var offset = $(this).offset().top;
             //            $('body,html').animate({scrollTop: offset - 120}, 100);
             //            return false;
             //        }
             //    })
			// }
//          $("input[nullmsg]").each(function(){
//
//              if ($(this).siblings(".Validform_checktip.Validform_wrong").eq(0).length !== 0||$(this).val().length==0) {
//
//                  var offset = $(this).offset().top;
//                  $('body,html').animate({scrollTop: offset - 120}, 100);
//                  return false;
//              }
//          })
			if($(".price-yes").is(":checked")){
				if($("#deal_content_inpt").val()==""){
					$(".tell").css({display:"block"});
					return false;
				};
			}
			
			var nb=0;
			if($(".qibao-yes").is(":checked")){
				$(".payTerm").each(function(){ 
					if($(this).val()==""||($(this).val()-0)==0){
						nb=0;
						return false;
					}else{
						nb=$(this).val().split(",").join("")-0+nb;
					}
					
				});
				if(nb!=($(".inpt-num").val().split(",").join("")-0)){
					$(".tell1").css({display:"block"});
					return false;
				};
				var results=1;
				$(".duan_input").each(function(){
					if($(this).val()==""){
						results=0;
						return false;
					}
				});
				if(results==0){
					$(".tell2").css({display:"block"});
					return false;
				};
			}
			
			
			var jieguo=1;
			var nber=0;
			if($(".qibao").is(":checked")){
				$(".numb").each(function(){ 
					if($(this).val()==""||($(this).val()-0)==0){
						nber=0;
						return false
					}else{
						nber=$(this).val()-0+nber;
					}
					
				});
				if(nber!=100){
					$(".tell1").css({display:"block"});
					return false
				};
				var result=1;
				$(".duan_input").each(function(){
					if($(this).val()==""){
						result=0;
						return false
					}
				});
				if(result==0){
					$(".tell2").css({display:"block"});
					return false
				};
//				$(this).parent().parent().parent().find("input.nub_input").each(function(){
//					var str=$(this).val();
//					var result=(/^\d+$|^\d+\.\d+$/.test(str));
//					if(!result){
//						$(this).siblings("span.tell").css({display:"block"});
//						jieguo= 0;
//						var top2=$(this).offset().top-200;
//						$("html, body").stop().animate({scrollTop:top2},0);
//						return false;
//					}else{
//						jieguo= 1;
//					};
//				})
		}
//			if(jieguo==0){
//				return false
//			}

			//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话将不会继续执行验证操作;	
		},
		beforeSubmit:function(curform){
			var shareInpt = Number($(".shareInpt").val());
			var shareInpt1 = Number($(".shareInpt1").val());
			if(shareInpt>100 || shareInpt1>100){
				$(".shareInpt1").siblings(".Validform_checktip").html("承保份额是0-100之间的数字").show();
				return false;
			};
			if(shareInpt >= shareInpt1) {
				$(".shareInpt1").siblings(".Validform_checktip").html("承保份额错误").show();
				return false;
			}
			if($(".conmonInpt").length==0) {
                var money = $(".inpt-num").val();
                var prices = $("input[name='amount[]']");
                var sum = 0;
                for (var i = 0; i < prices.length; i++) {
                	var m=$("input[name='amount[]").eq(i).val();
                	m=m.replaceAll(",","");
                    sum = parseInt(m) + sum;
                }
                if ($("input[type='radio']:checked").val() == 1) {
                    var priceAll = $(".priceAll").text();
                    priceAll = priceAll.substring(0, money.indexOf('.'));
                    priceAll = priceAll.replaceAll(",", "");
                    money = money.substring(0, money.indexOf('.'));
                    money = money.replaceAll(",", "");
                    if (parseInt(priceAll) != parseInt(money)) {
                        $(".tell1").css({display: "block"});
                        return false;
                    }
                } else {
                    money = money.substring(0, money.indexOf('.'));
                    money = money.replaceAll(",", "");
                    if (parseInt(money) != sum) {
                        $(".tell1").css({display: "block"});
                        return false;
                    }
                }
            }else{
				if($(".deal_content_other").is(".hide")==false){
                    var money = $(".inpt-num").val();
                    var prices = $("input[name='amount[]']");
                    var sum = 0;
                    for (var i = 0; i < prices.length; i++) {
                    	var m=$("input[name='amount[]").eq(i).val();
                    	m=m.replaceAll(",","");
                        sum = parseInt(m) + sum;
                    }
                    money = money.substring(0, money.indexOf('.'));
                    money = money.replaceAll(",", "");
                    if (parseInt(money) != sum) {
                        $(".tell1").css({display: "block"});
                        return false;
                    }
				}
			}

			$(".you-price-nub").text($(".inpt-num").val());
			$(".bginnub").text($(".shareInpt").val());
			$(".endnub").text($(".shareInpt1").val())
			$(".form-fix").show();
			$(".sur_fix").show();
			return false;
		}
	});
    $(function(){
		// if(!!window.ActiveXObject || "ActiveXObject" in window){
		// 	if($(".now.clear").length!=0&&$(".all_fix.form-fix").length!=0&&$(".content.cont-price").length!=0){
		// 		$(".now.clear").addClass("append");
		// 		$(".all_fix.form-fix").addClass("append");
		// 		$(".content.cont-price").addClass("append");
		// 		$(".top").css("position","absolute");
		// 		$(".append").wrapAll("<div class='dBody'></div>");
         //        $(".content.cont-price").css("padding-top","88px");
         //        $(".now.clear").css("top","43px");
		// 	}
		// }
        if($(".now.clear").length!=0&&$(".all_fix.form-fix").length!=0&&$(".content.cont-price").length!=0){
            $(".now.clear").addClass("append");
            $(".all_fix.form-fix").addClass("append");
            $(".content.cont-price").addClass("append");
            $(".top").css("position","absolute");
            $(".append").wrapAll("<div class='dBody'></div>");
            $(".content.cont-price").css("padding-top","88px");
            $(".now.clear").css("top","43px");
        }
    })
	
	
	
	$("#datetimepicker1").change(function(){
		if($("#datetimepicker1").val()!=""){
			$(".tell").css({display:"none"});
		}
	});
	$("#deal_content_inpt").change(function(){
		if($("#datetimepicker1").val()!=""){
			$(".tell").css({display:"none"});
		}
	});
	$(".numb").change(function(){
		var n=0;
		$(".numb").each(function(){
			if($(this).val()==""||($(this).val()-0)==0){
				n=0;
				return false
			}else{
				n=$(this).val()-0+n;
			}
		});
		if(n==100){
			$(".tell1").css({display:"none"});
		}
	});
	$(".duan_input").change(function(){
		var x=1;
		$(".duan_input").each(function(){
			if($(this).val()==""){
				x=0;
				return false
			}
		});
		if(x==1){
			$(".tell2").css({display:"none"});
		}
	});
	
	$(".payTerm").change(function(){
		baofei();
	});
	function baofei(){
		var n=0;
		var nn=0;
		$(".payTerm").each(function(){
			if($(this).val()==""||($(this).val().split(",").join("")-0)==0){
				nn=1;
				return false
			}else{
				n=$(this).val().split(",").join("")-0+n;
			}
		});
		if(n!=($(".inpt-num").val().split(",").join("")-0)||nn==1){
		}else{
			$(".tell1").css({display:"none"});
		}
	};
	
	
	$(".upload_pic").click(function(){
		var srcs=$(this).attr("src");
		$(".all_fix").css({display:"block"});
		$(".zhizhao_pic").css({display:"block"});
		$(".zhizhao_pic .mid_pic").attr({src:srcs});
	});
	$(document).on("click",".all_no,.no",function(){
		$(".all_fix").css({display:"none"});
		$(".zhizhao_pic").css({display:"none"});
		$(".sur_fix").css({display:"none"});
	});
	
	
	
	$('#need').change(function(){ 
		if($("#need").val()==2){
			$(".select_ul").css({display:"none"});
		}else{
			$(".select_ul").css({display:"block"});
		}
	});
	
	var resdata=$('input[name="pay_time_one"]').val();
	if(resdata){
		var resdata = new Date(resdata.replace(/-/g, '/'));
	};
	$('#datetimepicker1').datetimepicker({
		language: 'zh-CN', 
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  0,
		autoclose: 1,
		todayHighlight: 1,
		startDate:new Date(),
		startView: 2,
		minView:2,
		forceParse: 0,
        showMeridian: 1
    });
	$('.riqitexu').datetimepicker({
		language: 'zh-CN', 
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  0,
		autoclose: 1,
		todayHighlight: 1,
		startDate:new Date(),
		endDate:new Date(resdata),
		startView: 2,
		minView:2,
		forceParse: 0,
        showMeridian: 1
    });
    
    $(".used a").click(function(){
    	$(this).addClass("checked").siblings("a").removeClass("checked");
    });
    var arr=[];
    var time;
    for(var i=0;i<1000;i++){
    	var news=$(".deal_others").eq(0).clone(true);
    	news.find("input").attr("value","");
    	arr.push(news);
    };
    $(".add_img1").click(function(){
    	var big=1;
		$(".period").each(function(){
			var nub=parseInt($(this).html());
			if(nub>big){
				big=nub;
			};
		});	
		times=big+1;
		arr[big].find("span.period").html(times);
		arr[big].find(".add_mid").removeClass("add_img1").addClass("add_img2");
//		arr[big].find(".add_mid").on("click",function(){
//			$(this).parent().remove();
//			arr.splice(times-2,5);
//			var agin=0;
//			$(".period").each(function(){
//				agin++;
//				$(this).html(agin);
//			});	
//		});
		$(".deal_content_other").append( arr[big]);
        var c=0;
    	$(".period").each(function(){
			c++;
			$(this).html(c);
		});
        $.initDataPlugin();
    });
    
    $(".deal").on("click",".add_img2",function(){
		$(this).parent().remove();
		arr.splice(times-2,5);
		var agin=0;
		$(".period").each(function(){
			agin++;
			$(this).html(agin);
		});	
		baofei();
		riqi();
	});
	
	function riqi(){
		var result=1;
		$(".duan_input").each(function(){
			if($(this).val()==""){
				result=0;
				return false
			}
		});
		if(result==1){
			$(".tell2").css({display:"none"});
		};
	}
    
    $.initDataPlugin = function(){
        $(".duan_input").datetimepicker({
           language: 'zh-CN', 
	        format: 'yyyy-mm-dd',
	        weekStart: 1,
	        todayBtn:  0,
			autoclose: 1,
			todayHighlight: 1,
			startDate:new Date(),
			startView: 2,
			minView:2,
			forceParse: 0,
	        showMeridian: 1
        })
    };
    $.initDataPlugin();
    
    
	
	$(".methods label").eq(0).click(function(){
		$(".deal_content").css({display:"block"});
		$(".deal_content_other").css({display:"none"});
	});
	$(".methods label").eq(1).click(function(){
		$(".deal_content").css({display:"none"});
		$(".deal_content_other").css({display:"block"});
	});

	//承保份额后面大于前面
	$(".conmonInpt").blur(function(){
		var feneone=$(".shareInpt").val();
		var fenetwo=$(".shareInpt1").val();
		var shareInpt = Number(feneone);
		var shareInpt1 = Number(fenetwo);
		if(shareInpt>100 || shareInpt1>100){
			$(".shareInpt1").siblings(".Validform_checktip").html("承保份额是0-100之间的数字").show();
			return false;
		};
		if(shareInpt >= shareInpt1 && shareInpt1!= "") {
			$(".shareInpt1").siblings(".Validform_checktip").html("承保份额错误，前一个数必须小于后一个数").show();
			
		}
	});
	//承保份额
	$(".shareInpt").blur(function(){
		$(".bginnub").html($(this).val());
	});
	$(".shareInpt1").blur(function(){
		$(".endnub").html($(this).val());
	});
	
})
	