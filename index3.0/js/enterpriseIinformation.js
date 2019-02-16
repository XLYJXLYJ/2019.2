$(function(){

//	$(window).bind('beforeunload',function(){return '确认离开此页吗';});
//	$(document).on("click",".hold,.up",function(){
//		$(window).unbind('beforeunload');
//	});
	$(".myform").Validform({
        tiptype: 4,
        btnSubmit:".payNow", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
        ignoreHidden:true,
        postonce: true,
        datatype:{
        	'name':/^[\u4E00-\u9FA5\w()（）\-\.(^\s*)]+$/,
            'phone':/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{2}-\d{7}$|^0\d{3}-\d{7}$|^0\d{3}-\d{8}$/,
            "number":/^[1-9]\d*$/,
            "number1":/^[1-9]\d*(\.\d+)?$/
//		    'price':/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$/
        },
        
         beforeCheck:function(curform){
         
         	if(!$(".inpt-hide").val()){
        		$(this).siblings(".Validform_checktip").css({display:"block"})
        	}
         	
         	if($('#uploadKey').val()==""){
        		$("html, body").stop().animate({scrollTop:1500},0);
				$(".load-null").html("请上传营业执照");
				return false
        	}
         	
         	if($('input[name="agreement"]').eq(1).is(":checked")&&$('input[name="insured_license"]').val()==""){
        		$("html, body").stop().animate({scrollTop:1500},0);
				$(".load-null1").html("请上传营业执照");
				return false
        	}
         	
//       	if(!$(".beibao").hasClass("hide") && $('#uploadLicenseKey').val()==""){
//      		$("html, body").stop().animate({scrollTop:1500},0);
//				$(".load-null1").html("请上传营业执照");
//				return false
//      	}
        },
        
        beforeSubmit:function(curform){
			$(window).unbind('beforeunload');
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
		$('input[name="area_text"]').val(a.data("area_text"));
		$('input[name="area_id"]').val(a.data("area_id"));
		$('input[name="policy_send_add"]').val(a.data("policy_send_add"));
		$('select[name="invoices_type"]').val(a.data("invoices_type"));
		if(a.data("invoices_type")==1){
			$(".select_ul").css({display:"block"});
			$("#need").val("1");
			$('input[name="tax_register_address"]').val(a.data("tax_register_address"));
			$('input[name="tax_register_tel"]').val(a.data("tax_register_tel"));
			$('input[name="tax_bank_name"]').val(a.data("tax_bank_name"));
			$('input[name="tax_bank_account"]').val(a.data("tax_bank_account"));
			
		}else{
			$(".select_ul").css({display:"none"});
			$("#need").val("2");
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
								$("#need").val("1");
								$('input[name="tax_register_address"]').val(res.data.tax_register_address);
								$('input[name="tax_register_tel"]').val(res.data.tax_register_tel);
								$('input[name="tax_bank_name"]').val(res.data.tax_bank_name);
								$('input[name="tax_bank_account"]').val(res.data.tax_bank_account);
							}else{
								$(".select_ul").css({display:"none"});
								$("#need").val("2");
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
	

    $(".used a").click(function(){
    	$(this).addClass("checked").siblings("a").removeClass("checked");
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
	
	// 城市的渲染
	$.each(cityList,function (key,value) {
        if (key=='hot_city'){
            $("."+key).html('');
            $.each(value,function (key1,value1) {
                $("."+key).append("<li><span  data-id='"+value1.id+"'>"+value1.shortname+"</span></li>");
            });
        }else{
            $("."+key).empty();
            $.each(value,function (key1,value1) {
                var html = '<li><p>'+key1+'</p><div>';
                $.each(value1,function (key2,value2) {
                    html += "<span  data-id='"+value2.id+"'>"+value2.shortname+"</span>";
                });
                $("."+key).append(html+'</div></li>');
                delete html;
            });
        }
    });
	// 点击所在城市 弹框
	$(document).on("click","#selt-city",function(e){
		e.stopPropagation();
		$(".city").show();
	});
		// 点击热门或字母
	$('.city_top li').click(function(){
		$('#selt-city').focus()
		$(this).children().addClass('choose');
		$(this).siblings().children().removeClass('choose');
	});
	$(document).on('click','.city_top li',function(){
		var index = $(this).index();
		$('.cities').eq(index).show().siblings().hide();
	})
		// 点击城市
	$(document).on('click','.city_cont span',function(){
		var city = $(this).html();
		$('#selt-city').val(city);
		$('.city').hide();
		$(".city-div .Validform_checktip").html("");
		var cityId = $(this).data('id');
		$('.inpt-hide').val(cityId)
		$(".city").siblings(".Validform_wrong").css({display:"none"});
	});
		// 关闭城市弹框
	$(document).on('click','.city_top img',function(){
		$('.city').hide();
	});
	$(document).bind("click",function(e){
		var target  = $(e.target);
		if(target.closest(".city").length == 0){
		    	$(".city").hide();
		}
	});
})
