$(function(){
	$(window).bind('beforeunload',function(){return '确认离开此页吗';});
	$(document).on("click",".hold,.up",function(){
		$(window).unbind('beforeunload');
	});
	$("input[type='radio']:checked").css({color:"#232324"});
	
	var myDate=new Date()
	var data=myDate.setDate(myDate.getDate()+3);
	var mm=new Date($('#datetimepicker1').val());
	var mmm=mm.setDate(mm.getDate()+1) ;
	$('#datetimepicker1').datetimepicker({
		language: 'zh-CN', 
        format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  0,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView:2,
		startDate:new Date(data),
		forceParse: 0,
        showMeridian: 1
   }).on("changeDate",function(){
		var time=$('#datetimepicker1').val();
		$('#datetimepicker2').val(QBZZ.helper.timeHelper.timeAddMonth(time,nub)); 
    });
	var nub=$("#need").val();
	$("#need").change(function(){
		nub=$("#need").val();
	})
	$("#need").change(function(){
		if($('#datetimepicker1').val()!=""){
			var time=$('#datetimepicker1').val();
			nub=$(this).val();
			$('#datetimepicker2').val(QBZZ.helper.timeHelper.timeAddMonth(time,nub));
		}
	});

//	$(".group_bottom input[type='radio']").click(function(){
//		$(".group_bottom input[type='radio']").each(function(){
//			if($(this).is(":checked")){
//				$(this).parent().parent().parent().addClass("check").siblings("ol").removeClass("check");
//				var val=$(this).siblings("span").html();
//				$(this).parent().parent().parent().siblings("input").val(val);
//			}
//		})
//	});
    if(!!window.ActiveXObject || "ActiveXObject" in window){
		if($(".content").length!=0&&$(".now.clear").length!=0&&$(".step.clear")!=0&&$(".dBody").length==0){
			$(".content").wrapAll("<div class='dBody'></div>");
            $(".now.clear").css("top","43px");
            $(".content").css("margin-top","-20px");
            $(".step.clear").css("margin-top","-71px");
            $(".myform main-insured-form").css("margin-top","20px");
            // $(".top").css("position","absolute");

		}
    }
	$(".group_bottom ol").click(function(){
		var index = $(this).index();
		if(index>0) {

			$(this).addClass("check").siblings("ol").removeClass("check");
			$(this).find("input[type='radio']").attr("checked","checked");
		};
		var fangan=$(this).find("label span").html();
    	$(this).closest(".group_bottom").find(".suzu").attr("value",fangan);
    	$(".last_ol").each(function(){
    		if($(this).find("input").is(":checked")){
			}else{
				$(this).find(".tell").css({display:"none"});
				$(this).find(".nub_input").val("");
				$(this).find(".nub_input1").val("");
			}
    	});
	});
	
	var z=0;
	$(".group_fix").on("click",".add_group",function(){
		z++;
		var big=0;
		$(".fenzu_nub").each(function(){
			var nubs=parseInt($(this).html());
			if(nubs>big){
				big=nubs;
			};
		});	
		var times=big+1;
		var add=$(".group").eq(0).clone(true);
		add.find(".group_fix span").remove();
		add.find(".nub").val("");
		add.find(".group_top_left input").val("");
		add.find(".group_top_left .fenzu .fenzu_nub").html(times);
		add.find(".group_fix p").removeClass("add_group").addClass("remove");
		add.find("label input").attr({name:z});
		add.appendTo(".add_parent");
	});
	$(".group_fix").on("click",".remove",function(){
		$(this).parent().parent().remove();
		var agin=0;
		$(".fenzu_nub").each(function(){
			agin++;
			$(this).html(agin);
		});	
		var numbers=0;
		$(".nub").each(function(){
			if($(this).val()!=""){
				numbers=numbers+parseInt($(this).val());
			}
			
		});
		$(".all_nub").html(numbers);
		$(".nub_all").val(numbers);
	});
	$(".do label").on("click",function(){
		$(this).addClass("secai").siblings("label").removeClass("secai");
	});
	
	$(".his-choose label").click(function(){
		if($(".his-choose .his_one").is(":checked")){
			$(".his-choose_block").css({display:"block"});
		}else{
			$(".his-choose_block").css({display:"none"});
		}
	})
	
	
	$(".group_other").on("click",".add_group",function(){
		var add=$(".all_addr").eq(0).clone(true);
		add.find(".group_other span").remove();
		add.find("input").val("");
		add.find(".right_10 input").val("中国");
		add.find(".right_10 .world").val("");
		add.find(".group_other p").removeClass("add_group").addClass("remove");
		add.appendTo(".trans-addr");
	});
	$(".group_other").on("click",".remove",function(){
		$(this).parent().parent().remove(); 
	});
	
	
	
	
	$(".accessory").on("click",".reduce:gt(0)",function(){
		$(this).parent().parent().parent().remove();
	});
	$(".category span").click(function(){
		$(".category_allcontent").css({display:"block"});
	});
	$(".category_content_top img").click(function(){
		$(".category_allcontent").css({display:"none"});
	});
	
//	$(".add_parent").on("click",".last_ol label",function(){
//		$(this).parent().siblings("li").find("input").attr("unignore","unignore");
//	});
//	$(".add_parent").on("click",".other_ol label",function(){
//		$(this).parent().parent().siblings("ol").find("input.nub_input").removeClass("Validform_error").attr("ignore","ignore");
//	})
//	
	$(".add_parent").on("change",".nub",function(){ 
		var numbers=0;
		$(".nub").each(function(){
			if($(this).val()!=""){
				numbers=numbers+parseInt($(this).val());
			}
		});
		$(".all_nub").html(numbers);
		$(".nub_all").val(numbers);
	})
	
	
	//表单验证
	var hh = $(".myform").Validform({
        tiptype: 4,
        btnSubmit:".nexts",
        ignoreHidden:true,
        postonce: true,
        datatype:{
        	'name':/^[\w\u4E00-\u9FA5()（）]+$/,
            'phone':/^\d+$/,
            "number":/^[1-9]\d*$/,
            "Customs":/^[a-zA-Z0-9]{10}$/,
//	        'gongze':/^[5-9]\d{2}(\,?\d{3})(\.\d{1,2})?$|^[1-9]\d{1}(\,?\d{3}){2}(\.\d{1,2})?$|^[1][0]{2}(\,?\d{3}){2}(\.\d{1,2})?$/,
//	        'huoyun':/^[1-9]\d{6}$|^[1-9]\d{7,10}$|^[1][0]{11}$/,
			'price':/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/
        },
        beforeCheck:function(curform){
            if(!!window.ActiveXObject || "ActiveXObject" in window) {

                if($(".riqi input").val()==""){
                    var top1=$(".riqi input").offset().top-200;
                    $(".dBody").stop().animate({scrollTop: top1}, 0);

                    $(".riqi .Validform_checktip").css({display:"block"});
                    return false
                };
                if(mmm<data){
                    var top1=$(".riqi input").offset().top-200;
					$(".dBody").stop().animate({scrollTop: top1}, 0);
                    $(".riqi .Validform_checktip").css({display:"block"}).html("请选择正确日期");
                    return false
                };
                if($(".check_city").val()==""){
                    var top2=$(".check_city").offset().top-200;
					$(".dBody").stop().animate({scrollTop: top2}, 0);
                    $(".city_tell").css({display:"block"});
                    return false;
                }
                // var top
                // if ($("input[name='start_country[]']").val().length <= 1) {
                //     top=$("input[name='start_country[]']").offset().top+300;
                //     $("input[name='start_country[]']").siblings(".Validform_checktip").text("请输入国家");
                //     $("input[name='start_country[]']").siblings(".Validform_checktip").show();
                //     $(".dBody").stop().animate({scrollTop:-top},0);
                //     return false;
                // }
                //
                // if ($("input[name='start_city[]']").val().length <= 1) {
                //     top=$("input[name='start_city[]']").offset().top+300;
                //     $("input[name='start_city[]']").siblings(".Validform_checktip").text("请输入城市");
                //     $("input[name='start_city[]']").siblings(".Validform_checktip").show();
                //     $(".dBody").stop().animate({scrollTop:-top},0);
                //     return false;
                // }
                // if ($("input[name='end_country[]']").val().length <= 1) {
                //     top=$("input[name='end_country[]']").offset().top+300;
                //     $("input[name='end_country[]']").siblings(".Validform_checktip").text("请输入国家");
                //     $("input[name='end_country[]']").siblings(".Validform_checktip").show();
                //     $(".dBody").stop().animate({scrollTop:-top},0);
                //     return false;
                // }
                //
                // if ($("input[name='end_city[]']").val().length <= 1) {
                //     top=$("input[name='end_city[]']").offset().top+300;
                //     $("input[name='end_city[]']").siblings(".Validform_checktip").text("请输入城市");
                //     $("input[name='end_city[]']").siblings(".Validform_checktip").show();
                //     $(".dBody").stop().animate({scrollTop:-top},0);
                //     return false;
                // }
            }else {
                if ($(".riqi input").val() == "") {
                    var top2 = $(".riqi input").offset().top - 200;
                    $("html, body").stop().animate({scrollTop: top2}, 0);
                    $(".riqi .Validform_checktip").css({display: "block"});

                    return false;
                }
                ;
                if (mmm < data) {
                    var top1 = $(".riqi input").offset().top - 200;
                    $(".html, body").stop().animate({scrollTop: top1}, 0);
                    $(".riqi .Validform_checktip").css({display: "block"}).html("请选择正确日期");
                    return false
                }
                ;
                if ($(".check_city").val() == "") {
                    var top2 = $(".check_city").offset().top - 200;
                    $(".html, body").stop().animate({scrollTop: top2}, 0);
                    $(".city_tell").css({display: "block"});
                    return false;
                }
                ;
                if ($("input[name='start_country[]']").length != 0 && $("input[name='start_country[]']").val().length <= 1) {
                    top = $("input[name='start_country[]']").offset().top - 200;
                    $("input[name='start_country[]']").siblings(".Validform_checktip").text("请输入国家");
                    $("input[name='start_country[]']").siblings(".Validform_checktip").show();
                    $("html, body").stop().animate({scrollTop: top}, 0);
                    return false;
                }
                if ($("input[name='start_city[]']").length != 0 && $("input[name='start_city[]']").val().length <= 1) {
                    top = $("input[name='start_city[]']").offset().top - 200;
                    $("input[name='start_city[]']").siblings(".Validform_checktip").text("请输入城市");
                    $("input[name='start_city[]']").siblings(".Validform_checktip").show();
                    $("html, body").stop().animate({scrollTop: top}, 0);
                    return false;
                }
                if ($("input[name='end_country[]']").length != 0 && $("input[name='end_country[]']").val().length <= 1) {
                    top = $("input[name='end_country[]']").offset().top - 200;
                    $("input[name='end_country[]']").siblings(".Validform_checktip").text("请输入国家");
                    $("input[name='end_country[]']").siblings(".Validform_checktip").show();
                    $("html, body").stop().animate({scrollTop: top}, 0);
                    return false;
                }

                if ($("input[name='end_city[]']").length != 0 && $("input[name='end_city[]']").val().length <= 1) {
                    top = $("input[name='end_city[]']").offset().top - 200;
                    $("input[name='end_city[]']").siblings(".Validform_checktip").text("请输入城市");
                    $("input[name='end_city[]']").siblings(".Validform_checktip").show();
                    $("html, body").stop().animate({scrollTop: top}, 0);
                    return false;
                }
            }

            var jieguo=1;
			$(".sub_check").each(function(){
				if($(this).is(":checked")&&jieguo==1){
					$(this).closest('.last_ol').find("input.nub_input").each(function(){
						var str=$(this).val();
						var result=(/^[1-9]\d*$/.test(str));
						if(!result){
							$(this).siblings(".tell").text('请输入最多有一位小数的金额').css({display:"block"});
							jieguo= 0;
							var top2=$(this).offset().top-200;
                            if(!!window.ActiveXObject || "ActiveXObject" in window) {
                                $(".dBody").stop().animate({scrollTop: top2}, 0);
                            }else{
                                $(".html, body").stop().animate({scrollTop: top2}, 0);
                            }
                            return false;
						}else{
							jieguo= 1; 
						};
					});
					if($(".sub_check").hasClass("new-fenzu")){
					}else{
						var inpt = $(this).closest('.last_ol').find("input.nub_input").eq(0).val()/10;
						var $this = $(this).closest('.last_ol').find("input.nub_input1");
						var str=$this.val();
						var result=(/^([1-9]\d*(,\d{3})*|0)(\.\d{0,1})?$/.test(str));
						if(!result){
							$this.siblings(".tell").text('格式错误，请输入最多有一位小数的金额').css({display:"block"});
							jieguo= 0;
							var top2=$this.offset().top-200;
                            if(!!window.ActiveXObject || "ActiveXObject" in window) {
                                $(".dBody").stop().animate({scrollTop: top2}, 0);
                            }else{
                                $(".html, body").stop().animate({scrollTop: top2}, 0);
                            }
                            return false;
						}else if(str > inpt){
							$this.siblings(".tell").text('金额不能大于死亡、伤残赔偿限额的十分之一').css({display:"block"});
							jieguo= 0;
							var top2=$this.offset().top-200;
                            if(!!window.ActiveXObject || "ActiveXObject" in window) {
                                $(".dBody").stop().animate({scrollTop: top2}, 0);
                            }else{
                                $(".html, body").stop().animate({scrollTop: top2}, 0);
                            }
                            return false;
						}else if(str==0){
							$this.siblings(".tell").text('金额不能为0').css({display:"block"});
							jieguo= 0;
							var top2=$this.offset().top-200;
                            if(!!window.ActiveXObject || "ActiveXObject" in window) {
                                $(".dBody").stop().animate({scrollTop: top2}, 0);
                            }else{
                                $(".html, body").stop().animate({scrollTop: top2}, 0);
                            }
                            return false;
						}else{
							jieguo= 1;
						};
					}
				};
			})
			if(jieguo==0){
				return false
			}
			if($(".content .tell_html").html()==""){
				$(".tell_file").css({display:"block"});
				return false
			}
			if($(".other_c").is(":checked")){
				if($(".other_c_input").val()==""){
					var top4=$(".other_c_input").offset().top-200;
					$("html, body").stop().animate({scrollTop:top4},0);
					$(".tell_other").css({display:"block"});
					return false
				}
			}
			
			if($(".his-choose .his_one").is(":checked")){
				if($(".tell_html1").html()==""){
					$(".tell_file1").css({display:"block"});
					return false
				}
			}
			
			//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话将不会继续执行验证操作;	
		},
        beforeSubmit:function(curform){
        	// 两个货运险的总保险金额在[100万，1000亿]之间
        	if($(".totalMoney").length>0) {
        		var totalMoney = $(".totalMoney").val().replace(/,/g,'');
        		if(totalMoney<1000000 || totalMoney>100000000000) {
	        		$(".totalMoney").siblings(".Validform_checktip").text("总保险金额[100万，1000亿]之间").css({"display":"block"});
	        		$("body,html").scrollTop(994);
	        		return false;
	        	}
        	}
        	// 公责险的总保险金额在[50万，1亿]之间
        	if($(".totalMoney_gongze").length>0) {
        		var totalMoney_gongze = $(".totalMoney_gongze").val().replace(/,/g,'');
        		if(totalMoney_gongze<500000 || totalMoney_gongze>100000000) {
	        		$(".totalMoney_gongze").siblings(".Validform_checktip").text("总保险金额[50万，1亿]之间").css({"display":"block"});
	        		$("body,html").scrollTop(200);
	        		return false;
	        	}
        	}
        	// 三个财产险的总保险金额在[100万，1000亿]之间
        	if($(".money-li-cont .money_red span").length>0){
        		var totalMoney_caichan = $(".money-li-cont .money_red span").text().replace(/,/g,'');
	        	if(totalMoney_caichan<1000000 || totalMoney_caichan>100000000000) {
	        		$(".money-li-cont .money_red span").closest(".money_red").siblings(".Validform_checktip").text("总保险金额在[100万，1000亿]之间").css({"display":"block"});
	        		$("body,html").scrollTop(900)
	        		return false;
	        	}
        	}
        	
			$(window).unbind('beforeunload');
		}
    });
    $(".riqi input").change(function(){
    	if($(".riqi input").val()!=""){
    		myDate=new Date()
			data=myDate.setDate(myDate.getDate()+3);
			mm=new Date($('#datetimepicker1').val());
			mmm=mm.setDate(mm.getDate()+1) ;
			$(".riqi .Validform_checktip").css({display:"none"});
		}
    });
	$(".other_c_input").change(function(){
		$(".tell_other").css({display:"none"});
	});
    
    $(".add_parent").on("change",".nub_input",function(){
    	var str=$(this).val();
    	var results=(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(str));
    	if(results){
			$(this).siblings("span.Validform_checktip").css({display:"none"});
		};
    });
    $(".add_parent").on("blur",".nub_input0",function(){
    	$(this).closest('.last_ol').find('.nub_input1').siblings("span.Validform_checktip").css({display:"none"});
    });
     $(".add_parent").on("change",".nub_input1",function(){
    	var str=$(this).val();
    	var inpt = $(this).closest('.last_ol').find("input.nub_input").eq(0).val()/10;
    	var results=(/^[0-9]\d*(\.\d{0,1})?$/.test(str));
    	if(results){
			$(this).siblings("span.Validform_checktip").css({display:"none"});
		}else if(str <= inpt){
			$(this).siblings("span.Validform_checktip").css({display:"none"});
		};
    });
    
    
//  $(".add_parent").on("click","label",function(){
//  	var fangan=$(this).find("span").html();
//  	$(this).closest(".group_bottom").find(".suzu").attr("value",fangan);
//  	$(".last_ol").each(function(){
//  		if($(this).find("input").is(":checked")){
//			}else{
//				$(this).find(".tell").css({display:"none"});
//				$(this).find(".nub_input").val("");
//			}
//  	})
//		
//	})
    $(".tell_html").bind("DOMNodeInserted",function(e){
	    if($(".tell_html").html()!=""){
			$(".tell_file").css({display:"none"});
		}
	});
	$(".tell_html1").bind("DOMNodeInserted",function(e){
	    if($(".tell_html1").html()!=""){
			$(".tell_file1").css({display:"none"});
		}
	});
	
	
	function getObjectURL(file) {
		var url = null;
		if (window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if (window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if (window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	};
	
	$(".input_file1").change(function() {
		var objUrl = getObjectURL(this.files[0]);
		if (objUrl) {
			$(".tell_html1").html(objUrl);
		}
	});
	$(".input_file").change(function() {
		var objUrl = getObjectURL(this.files[0]);
		if (objUrl) {
			$(".tell_html").html(objUrl);
		}
	});
	
	$('.no').click(function(){
		$('.check_id_fix').addClass('hide');
	});
	// 点击所在城市 弹框
	$('.check_city').click(function(e){
		e.stopPropagation();
		$('.city').show();
	});
	// 点击热门或字母
	$('.city_top li').click(function(){
		$('.check_city').focus()
		$(this).children().addClass('choose');
		$(this).siblings().children().removeClass('choose');
	});
	$('.city_top li').eq(0).click(function(){
		$('.hot_city').show().siblings().hide();
	});
	$('.city_top li').eq(1).click(function(){
		$('.city_a_d').show().siblings().hide();
	});
	$('.city_top li').eq(2).click(function(){
		$('.city_e_h').show().siblings().hide();
	});
	$('.city_top li').eq(3).click(function(){
		$('.city_j_m').show().siblings().hide();
	});
	$('.city_top li').eq(4).click(function(){
		$('.city_n_s').show().siblings().hide();
	});
	$('.city_top li').eq(5).click(function(){
		$('.city_t_x').show().siblings().hide();
	});
	$('.city_top li').eq(6).click(function(){
		$('.city_y_z').show().siblings().hide();
	});
	// 点击城市
	$('.city_cont span').click(function(){
		var city = $(this).text();
		$('.check_city').val(city);
		$(".city_tell").css({display:"none"});
		$('.city').hide();
		var cityId = $(this).data('id');
		$('.inpt-hide').val(cityId)
	});
	$('.city_top img').click(function(){
		$('.city').hide();
	});
	$(document).bind("click",function(e){
		var target  = $(e.target);
		if(target.closest(".city").length == 0){
	    	$(".city").hide();
		}
	});
	//投保方案如果选择D方案 
	$('.nub_input').eq(0).blur(function(){
		if($(this).val() != ''){
			$(this).closest('.last_ol').find('.nub_input1').val($(this).val()/10);
		}
	})
	
	
	// 币种的选择
	$('.duan').change(function(){
		var priceKind = $(this).find('option:selected').text();
		$('.price-kind').text(priceKind);
	});
	
	//财产险总金额的计算及验证
	$(document).on("change",".munput",function(){
		var munmoney=0;
		$(".munput").each(function(){
			moneyone=$(this).val().split(",").join("")-0;
			munmoney+=moneyone;
		});
		var totalMoney_caichan = munmoney;
		munmoney=moneys(munmoney.toString());
		$(".money-li-cont .money_red span").html(munmoney);
		
    	if(totalMoney_caichan>100000000000 || totalMoney_caichan<1000000) {
    		$(".money-li-cont .money_red span").closest(".money_red").siblings(".Validform_checktip").text("总保险金额在[100万，1000亿]之间").css({"display":"block"});
    		$("body,html").scrollTop(900)
    	} else {
    		$(".money-li-cont .money_red span").closest(".money_red").siblings(".Validform_checktip").text("").css({"display":"none"});
    	}
		$('input[name="price"]').attr("value",munmoney);
	});
	
	function moneys(s){
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
	
	
})
