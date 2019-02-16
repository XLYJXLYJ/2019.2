$(function(){
	$(window).bind('beforeunload',function(){return '确认离开此页吗';});
	$(document).on("click",".hold,.up",function(){
		$(window).unbind('beforeunload');
	});
	$(".myform").Validform({
        tiptype: 4,
        btnSubmit:".nexts", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
		
        ignoreHidden:true,
        postonce: true,
        datatype:{
        	'name':/^[\u4E00-\u9FA5\w()（）\-\.(^\s*)]+$/,
            'phone':/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{2}-\d{7}$|^0\d{3}-\d{7}$|^0\d{3}-\d{8}$/,
            "number":/^[1-9]\d*$/,
            "number1":/^[1-9]\d*(\.\d+)?$/,
            'price':/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$/
        },
        beforeCheck:function(curform){
        	if($("#datetimepicker1").val()==""){
				$(".tell").css({display:"block"});
				return false
			};
			if($(".price-yes").is(":checked")){
				if($("#deal_content_inpt").val()==""){
					$(".tell").css({display:"block"});
					return false
				};
			}
			var nb=0;
			if($(".qibao-yes").is(":checked")){
				$(".payTerm").each(function(){ 
					if($(this).val()==""||($(this).val()-0)==0){
						nb=0;
						return false
					}else{
						nb=$(this).val()-0+nb;
					}
					
				});
				if(nb!=($(".inpt-num").val()-0)){
					$(".tell1").css({display:"block"});
					return false
				};
				var results=1;
				$(".duan_input").each(function(){
					if($(this).val()==""){
						results=0;
						return false
					}
				});
				if(results==0){
					$(".tell2").css({display:"block"});
					return false
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
			$(window).unbind('beforeunload');
		}
	});
	
	
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
		var n=0;
		$(".payTerm").each(function(){
			if($(this).val()==""||($(this).val()-0)==0){
				n=0;
				return false
			}else{
				n=$(this).val()-0+n;
			}
		});
		if(n!=($(".inpt-num").val()-0)){
		}else{
			$(".tell1").css({display:"none"});
		}
	});
	
	
	
	$(".used1 a").click(function(){
		var that=$(this);
		toubaofuzhi(that);
	});	
	function toubaofuzhi(a){
		$(".used1_find").eq(0).addClass("disabled").attr({"unselectable":"on","readOnly":"readOnly"});
		$('input[name="applicant_user_company_id"]').val(a.data("id"));
		$('input[name="company_name"]').val(a.data("company_name"));
		$('input[name="license"]').val(a.data("license"));
		$('img[name="license_image"]').attr("src",a.data("license_image"));
		$('input[name="contact"]').val(a.data("contact"));
		$('.toubao').find(".Validform_checktip").html("").removeClass("Validform_wrong");
		$('input[name="phone"]').val(a.data("phone"));
		$('input[name="policy_send_add"]').val(a.data("policy_send_add"));
		$('select[name="invoices_type"]').val(a.data("invoices_type"));
		if(a.data("invoices_type")==1){
			$(".select_ul").css({display:"block"});
			$('input[name="tax_register_address"]').val(a.data("tax_register_address"));
			$('input[name="tax_register_tel"]').val(a.data("tax_register_tel"));
			$('input[name="tax_bank_name"]').val(a.data("tax_bank_name"));
			$('input[name="tax_bank_account"]').val(a.data("tax_bank_account"));
			
		}else{
			$(".select_ul").css({display:"none"});
		}
	};
	$(".used2 a").click(function(){
		var that=$(this);
		beibaofuzhi(that)
	});		
	function beibaofuzhi(a){
		$(".used2_find").eq(0).addClass("disabled").attr({"unselectable":"on","readOnly":"readOnly"});
		$('.beibao').find(".Validform_checktip").html("").removeClass("Validform_wrong");
		$('input[name="insured_user_company_id"]').val(a.data("id"));
		$('input[name="insured_company_name"]').val(a.data("company_name"));
		$('input[name="insured_license"]').val(a.data("insured_license"));
		$('img[name="insured_license_image"]').attr("src",a.data("insured_license_image"));
	};

	var urls=$('#insuredDescription').data("image");
	$(".revise1").click(function(){
		$(".used1_find").removeClass("disabled").attr({"unselectable":"off","readOnly":false});
		$(".used1_find").eq(1).show();
		$(".used1 a").removeClass("checked");
		$(".fix-people1 .yewuyuan-cont").removeClass("lan");
		$(".fix-people1 .yewuyuan-cont input").attr("checked",false);
		$(".enterprise_ul1 input").val("");
		$(".select_ul input").val("");
		$('img[name="license_image"]').attr("src",urls);
	});
	$(".revise2").click(function(){
		$(".used2_find").removeClass("disabled").attr({"unselectable":"off","readOnly":false});
		$(".used2_find").eq(1).show();
		$(".used2 a").removeClass("checked");
		$(".fix-people2 .yewuyuan-cont").removeClass("lan");
		$(".fix-people2 .yewuyuan-cont input").attr("checked",false);
		$(".enterprise_ul2 input").val("");
		$('img[name="insured_license_image"]').attr("src",urls);
	});
	
	$(".used1_find").blur(function(){
		
		var ml=$(this).val();
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: '/insured/ajax/get/user/company',
			data: {'company_name':ml},
			success: function(res) {
                if (res && res.code === 200) {
                    if (res.data!=""&&res.data!=null) {
                    	
                    	$(".all_fix").css({display:"block"});
						$(".fabu_fix").css({display:"block"});
						
						$(".fabu_fix .no").click(function(){
							$(".used1_find").eq(0).val("");
							$(".used1_find").eq(0).focus();
						});
						$(".fabu_fix .fabu_yes").click(function(){
							$(".all_fix").css({display:"none"});
							$(".fabu_fix").css({display:"none"});
							$(".used1_find").eq(0).addClass("disabled");
//							$(".used1_find").eq(1).hide();
							$('input[name="applicant_id"]').val(res.data.id);
							$('input[name="company_name"]').val(res.data.company_name);
							$('input[name="license"]').val(res.data.license);
							$('img[name="license_image"]').attr("src",res.data.license_image);
							$('input[name="contact"]').val(res.data.contact);
							$('input[name="phone"]').val(res.data.phone);
							$('input[name="policy_send_add"]').val(res.data.policy_send_add);
							$('select[name="invoices_type"]').val(res.data.invoices_type);
							if(res.data.invoices_type==1){
								$(".select_ul").css({display:"block"});
								$('input[name="tax_register_address"]').val(res.data.tax_register_address);
								$('input[name="tax_register_tel"]').val(res.data.tax_register_tel);
								$('input[name="tax_bank_name"]').val(res.data.tax_bank_name);
								$('input[name="tax_bank_account"]').val(res.data.tax_bank_account);
							}else{
								$(".select_ul").css({display:"none"});
							}
							
						});
                        
                    }
                }
            },
			error:function(){
			}
		});
		
		
	});
	$(".used2_find").blur(function(){
		var ml=$(".used2_find").val();
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: '/insured/ajax/get/user/company',
			data: {'company_name':ml},
			success: function(res) {
                if (res && res.code === 200) {
                    if (res.data) {
                    	$(".all_fix").css({display:"block"});
						$(".fabu_fix").css({display:"block"});
						
						$(".fabu_fix .no").click(function(){
							$(".used2_find").eq(0).val("");
							$(".used2_find").eq(0).focus();
						});
						$(".fabu_fix .fabu_yes").click(function(){
							$(".all_fix").css({display:"none"});
							$(".fabu_fix").css({display:"none"});
							$(".used2_find").eq(0).addClass("disabled");
//							$(".used2_find").eq(1).hide();
							$('input[name="insured_id"]').val(res.data.id);
							$('input[name="insured_company_name"]').val(res.data.company_name);
							$('input[name="insured_license"]').val(res.data.insured_license);
							$('img[name="insured_license_image"]').attr("src",res.data.insured_license_image);
						});
                        
                    }
                }
            },
			error:function(){
			  	
			}
		});
		
	})
	
	$(".upload_pic").click(function(){
		var srcs=$(this).attr("src");
		$(".all_fix").css({display:"block"});
		$(".zhizhao_pic").css({display:"block"});
		$(".zhizhao_pic .mid_pic").attr({src:srcs});
	});
	$(document).on("click",".all_no ,.no",function(){
		$(".all_fix").css({display:"none"});
		$(".zhizhao_pic").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
		$(".fix-people").css({display:"none"});
	});
	
	
	
	$('#need').change(function(){ 
		if($("#need").val()==2){
			$(".select_ul").css({display:"none"});
		}else{
			$(".select_ul").css({display:"block"});
		}
	});
	
	var resdata=$('#datetimepicker1').data("begin_time");
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
		endDate:new Date(resdata),
		startView: 2,
		minView:2,
		forceParse: 0,
        showMeridian: 1
   });
	
	$('#deal_content_inpt').datetimepicker({
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
    
    $(".used a").click(function(){
    	$(this).addClass("checked").siblings("a").removeClass("checked");
    });
    var arr=[];
    var time;
    for(var i=0;i<1000;i++){
    	arr.push($(".deal_others").eq(0).clone(true));
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
	});
    
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
	
	$(".people-agreement label").on("click",function(){
		var indexs=$(this).index();
		if(indexs==0){
			$(".beibao").addClass("hide");
			$(".used2").addClass("hide");
		}else{
			$(".beibao").removeClass("hide");
			$(".used2").removeClass("hide");
		}
	});
	
	//经纪人
	//更多常用企业
	$(document).on("click",".gengduo1",function(){
		$(".all_fix").css({display:"block"});
		$(".fix-people1").css({display:"block"});
	});
	$(document).on("click",".gengduo2",function(){
		$(".all_fix").css({display:"block"});
		$(".fix-people2").css({display:"block"});
	});
	//选择常用企业
	$(document).on("click",".fix-people label",function(){
		$(this).parent().addClass("lan").siblings().removeClass("lan");
	});
	$(document).on("click",".fix-people1 button",function(){
		var zz=0;
		$(".fix-people1 .yewuyuan-cont").each(function(){
			if($(this).find("input").is(':checked')){
				var that=$(this);
				var id=$(this).data("id");
				toubaofuzhi(that);
				$(".no").click();
				$(".used1 a").each(function(){
					var ider=$(this).data("id");
					if(ider==id){
						zz=1;
						$(this).addClass("checked").siblings().removeClass("checked");
					}
				});
				if(zz==0){
					$(".used1 a").removeClass("checked");
				}
			}
		});
	});
	$(document).on("click",".fix-people2 button",function(){
		var zz=0;
		$(".fix-people2 .yewuyuan-cont").each(function(){
			if($(this).find("input").is(':checked')){
				var that=$(this);
				var id=$(this).data("id");
				beibaofuzhi(that);
				$(".no").click();
				$(".used2 a").each(function(){
					var ider=$(this).data("id");
					if(ider==id){
						zz=1;
						$(this).addClass("checked").siblings().removeClass("checked");
					}
				});
				if(zz==0){
					$(".used2 a").removeClass("checked");
				}
			}
		});
	});
	
//	//是否共保
//	$(document).on("click",".gb label",function(){
//		var index=$(this).index();
//		if(index==1){
//			$(".methods label").eq(0).hide();
//			$(".methods label").eq(1).find("input").attr("checked",true);
//			$(".deal_content").hide();
//			$(".deal_content_other").show();
//		}else{
//			$(".methods label").eq(0).show();
//		}
//	});
	
	
})
