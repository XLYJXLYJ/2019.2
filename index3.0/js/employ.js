(function(){
	
	var employ = {
		
		// 初始化
		init: function() {
			Qibao.userUpload('container_add_company_1', 'upload', 'uploadKey', 'upload_show_process_area_1', 'showImage');
    		Qibao.userUpload('container_add_company_2', 'uploadLicense', 'uploadLicenseKey', 'upload_show_process_area_2', 'showLicenseImage');
			
			employ.bindEvents();
			var xx = $.getUrlParam('order');
			var itemlist=[];
			
			employ.openload(xx); 
		},
		//进入页面加载请求
		openload:function(xx){
			var that=this;
			
			$.ajax({
				type:"get",
				url:urlload,
				data:{"order":xx},
				dataType: 'json',
				success:function(res){
					if(res.code=="200"){
						var results=0;
						var results1=0;
						$(".plan_kind").html(res.data.info.insurance_employer_id);
						if(res.data.info.insurance_employer_id=="D"){
							$(".insureKind option").eq(3).remove();
						}
						$(".insuer_period").html(res.data.info.month);
						$("#datetimepicker1").val(res.data.info.begin_time);
						$("#datetimepicker2").val(res.data.info.end_time);
						
						$(res.data.company).each(function(index,element){
							var a=$('<a data-company_name="'+this.company_name+'" '+
									'data-credit_code="'+this.credit_code+'" '+
									'data-license="'+this.license+'" '+
			                       	'data-license_image="'+this.license_image+'" '+
			                       	'data-contact="'+this.contact+'" '+
			                       	'data-phone="'+this.phone+'" '+
									'data-area_id="'+this.area_id+'" '+
									'data-area_name="'+this.area_name+'" '+
			                       	'data-policy_send_add="'+this.policy_send_add+'" '+
			                       	'data-invoices_type="'+this.invoices_type+'" '+
			                       	'data-tax_register_address="'+this.tax_register_address+'" '+
			                       	'data-tax_register_number="'+this.tax_register_number+'" '+
			                       	'data-tax_register_tel="'+this.tax_register_tel+'" '+
			                       	'data-tax_bank_name="'+this.tax_bank_name+'" '+
			                       	'data-tax_bank_account="'+this.tax_bank_account+'">'+this.company_name+'</a>');
			                
			                if(res.data.info.company_name==this.company_name){
								a.addClass("checked");
								results=1;
							};
							$(".used1").append(a);
							if(results==1){
								$(".used1_find").eq(0).addClass("disabled").attr({"unselectable":"on","readOnly":"readOnly"});
							};
						
							var a1=$('<a data-company_name="'+this.company_name+'" '+
									'data-credit_code="'+this.credit_code+'" '+
									'data-insured_license="'+this.license+'" '+
			                       	'data-insured_license_image="'+this.license_image+'">'+this.company_name+'</a>');
							if(res.data.info.insured_company_name==this.company_name){
								a1.addClass("checked");
								results1=1;
							};
							$(".used2").append(a1);
						});
						if(results1==1){
							$(".used2_find").eq(0).addClass("disabled").attr({"unselectable":"on","readOnly":"readOnly"});
						};
						
						that.toubaoEvents(res.data.info);
						that.beibaoEvents(res.data.info);
						itemlist=res.data.employee.data;
						that.renderList(itemlist,1);
						that.pagefunc(res.data.employee.sum,1);
						$(".totalMoney span").html(res.data.employee.total_money);
						$(".totalNums").html(res.data.employee.suc_num);
						$(".right_nums").html(res.data.employee.suc_num);
						$(".wrong_nums").html(res.data.employee.fail_num);
						
					}
					
				},
				error:function(){
			//  	alert("网络错误，请稍后再尝试！");
				}
			});
		},
		
		//投保人
		toubaoEvents:function(res){
			var urls=$('#insuredDescription').data("image");
			$('input[name="company_name"]').val(res.company_name);
			$('input[name="credit_code"]').val(res.credit_code);
			$('input[name="license"]').val(res.license);
			if(res.license_image!=""){
				$('img[name="license_image"]').attr("src",res.license_image);
			}else{
				$('img[name="license_image"]').attr("src",urls);
			};
			
			$('input[name="contact"]').val(res.contact);
			$('input[name="phone"]').val(res.phone);
			$('input[name="area_name"]').val(res.area_name);
			$('input[name="area_id"]').val(res.area_id);
			$('input[name="policy_send_add"]').val(res.policy_send_add);
			$('select[name="invoices_type"]').val(res.invoices_type);
			if(res.invoices_type==1){
				$('select[name="invoices_type"]').siblings(".selcSpan").html("增值税普通发票");
				$(".select_ul").css({display:"block"});
				$('input[name="tax_register_number"]').val(res.tax_register_number);
				$('input[name="tax_register_address"]').val(res.tax_register_address);
				$('input[name="tax_register_tel"]').val(res.tax_register_tel);
				$('input[name="tax_bank_name"]').val(res.tax_bank_name);
				$('input[name="tax_bank_account"]').val(res.tax_bank_account);
				
			}else{
				$('select[name="invoices_type"]').siblings(".selcSpan").html("不需要发票");
				$(".select_ul").css({display:"none"});
			};

		},
		
		//被保人
		beibaoEvents:function(res){
			var urls=$('#insuredDescription').data("image");
			if(res.agreement==2){
				$('input[name="agreement"]').eq(1).attr("checked",true);
				$(".beibao").removeClass("hide");
				$(".used2").removeClass("hide");
				
			}else if(res.agreement==1){
				$('input[name="agreement"]').eq(0).attr("checked",true);
				$(".beibao").addClass("hide");
				$(".used2").addClass("hide");
			};
			$('input[name="insured_company_name"]').val(res.insured_company_name);
			$('input[name="insured_credit_code"]').val(res.insured_credit_code);
			$('input[name="insured_license"]').val(res.insured_license);
			if(res.insured_license_image!=""){
				$('img[name="insured_license_image"]').attr("src",res.insured_license_image);
			}else{
				$('img[name="insured_license_image"]').attr("src",urls);
			}
			
						
		},

		//常用保险人与被保险人
		insurpeople:function(res){
			
		},
		
		
		// 绑定事件
		bindEvents: function() {
			var that = this;
			// 下拉箭头
		    $(document).on("change",".selc",function(){
				var optionvalue=$(this).find("option:selected").text();
				$(this).siblings(".selcSpan").text(optionvalue).css({"border-color":"#524ae7"});
			});
			$(".selc").blur(function(){
				$(this).siblings(".selcSpan").css({"border-color":"#e9e9f4"});
			});
			//职业类别查询
			$.each(zhiyelei,function(key,value){
				var op=$('<option value="'+key+'">'+value+'</option>');
				$(".selc-type1").append(op);
			});
			$(".selc-type1").change(function(){
				var leival=$(this).val();
				$(".selc-type2 option:gt(0)").remove();
				$(".selc-type3 option:gt(0)").remove();
				$(".kindName").html("");
				$(".midKind").find(".selcSpan").html("行业中类");
				$(".smallKind").find(".selcSpan").html("行业小类");
				if(leival=="z"){
					
				}else{
					$.each(zhiyelei1[leival],function(key,value){
						var op=$('<option value="'+key+'">'+value+'</option>');
						$(".selc-type2").append(op);
					});
				};
			});
			$(".selc-type2").change(function(){
				var leival=$(this).val();
				$(".selc-type3 option:gt(0)").remove();
				$(".kindName").html("");
				$(".smallKind").find(".selcSpan").html("行业小类");
				if(leival=="z"){
				}else{
					$.each(zhiyelei2[leival],function(key,value){
						var op=$('<option value="'+key+'">'+value+'</option>');
						$(".selc-type3").append(op);
					});
				};
			});
			$(".selc-type3").change(function(){
				var leival=$(this).val();
				if(leival=="z"){
					$(".kindName").html("");
				}else{
					$(".kindName").html(zhiyelei3[leival]+"类");
				};
			});
			
			
		    // 切换投保人与被保人是否一致
			$(".people-agreement label").on("click",function(){
				$(this).css({"color": "#35313f"});
				$(this).siblings().css({"color": "#727689"});
				var indexs=$(this).index();
				if(indexs==0){
					$(".beibao").addClass("hide");
					$(".used2").addClass("hide");
				}else{
					$(".beibao").removeClass("hide");
					$(".used2").removeClass("hide");
				}
			});
			
			
			// 起保日期
		    var myDate=new Date();
			var data=myDate.setDate(myDate.getDate()+3);
			$('#datetimepicker1').datetimepicker({
				language: 'zh-CN', 
		        format: 'yyyy-mm-dd',
		        weekStart: 1,
		        todayBtn:  0,
				autoclose: 1,
				todayHighlight: 1,
				startDate:new Date(data),
				startView: 2,
				minView:2,
				forceParse: 0,
		        showMeridian: 1
		    }).on("changeDate",function(){
				var time=$('#datetimepicker1').val();
				var insuerPeriod = $(".insuer_period").text();
				$('#datetimepicker2').val(QBZZ.helper.timeHelper.timeAddMonth(time,insuerPeriod)); 
		    });
		    
			$("#datetimepicker1").change(function(){
				if($("#datetimepicker1").val()!=""){
					$(this).siblings(".Validform_wrong").css({display:"none"});
				}
			});
			
			// 出生日期的选择
			var todate=new Date();
			var todate2=new Date();
			var start_date=todate2.setFullYear(todate2.getFullYear()-66);
			var end_date=todate.setFullYear(todate.getFullYear()-16);
			$('#datetimepicker').datetimepicker({
				language: 'zh-CN', 
		        format: 'yyyy-mm-dd',
		        weekStart: 1,
		        todayBtn:  0,
				autoclose: 1,
				todayHighlight: 1,
				startDate:new Date(start_date),
				endDate:new Date(end_date),
				startView: 4,
				minView:2,
				forceParse: 0,
		        showMeridian: 1
		   });
			
			$("#datetimepicker").change(function(){
				if($("#datetimepicker").val()!=""){
					$(this).siblings(".Validform_wrong").css({display:"none"});
				}
			});
			
			
			// 选择常用企业
			$(document).on("click",".used1 a",function(){
				$(".used1_find").eq(0).addClass("disabled").attr({"unselectable":"on","readOnly":"readOnly"});
				var datas={
						"company_name":$(this).data("company_name"),
						"credit_code":$(this).data("credit_code"),
						"license":$(this).data("license"),
						"license_image":$(this).data("license_image"),
						"contact":$(this).data("contact"),
						"phone":$(this).data("phone"),
						"area_id":$(this).data("area_id"),
						"area_name":$(this).data("area_name"),
						"policy_send_add":$(this).data("policy_send_add"),
						"invoices_type":$(this).data("invoices_type"),
						"tax_register_address":$(this).data("tax_register_address"),
						"tax_register_number":$(this).data("tax_register_number"),
						"tax_register_tel":$(this).data("tax_register_tel"),
						"tax_bank_name":$(this).data("tax_bank_name"),
						"tax_bank_account":$(this).data("tax_bank_account"),
				};
				that.toubaoEvents(datas);
				$('.toubao').find(".Validform_checktip").html("").removeClass("Validform_wrong");	
			});	
			$(document).on("click",".used2 a",function(){
				$(".used2_find").eq(0).addClass("disabled").attr({"unselectable":"on","readOnly":"readOnly"});
				var datass={
						"insured_company_name":$(this).data("company_name"),
						"insured_credit_code":$(this).data("credit_code"),
						"insured_license":$(this).data("insured_license"),
						"insured_license_image":$(this).data("insured_license_image")
				};
				that.beibaoEvents(datass);
				$('.beibao').find(".Validform_checktip").html("").removeClass("Validform_wrong");
			});		
			
			$(document).on("click",".used a",function(){
		    	$(this).addClass("checked").siblings("a").removeClass("checked");
		    });
		    
		    
			// 点击更改
			var urls=$('#insuredDescription').data("image");
			$(".revise1").click(function(){
				
				$(".used1_find").eq(0).removeClass("disabled").attr({"unselectable":"off","readOnly":false});
				$(".used1 a").removeClass("checked");
				$(".enterprise_ul1 input").val("");
				$(".select_ul input").val("");
				$('img[name="license_image"]').attr("src",urls);
			});
			$(".revise2").click(function(){
				$(".used2_find").eq(0).removeClass("disabled").attr({"unselectable":"off","readOnly":false});
				$(".used2 a").removeClass("checked");
				$(".enterprise_ul2 input").val("");
				$('img[name="insured_license_image"]').attr("src",urls);
			});
			
			//   弹框
			var topHeight;
			$(".upload_pic").click(function(){ //  点击上传的图片
				topHeight = $(window).scrollTop();
				var srcs=$(this).attr("src");
				$(".all_fix").css({display:"block"});
				$(".zhizhao_pic").css({display:"block"});
				$(".zhizhao_pic .mid_pic").attr({src:srcs});
			});
			$(".addOne").click(function(){    //  添加单个的信息
				topHeight = $(window).scrollTop();
				$(".addInsure_yes").data("id","");
				$(".all_fix").css({display:"block"});
				$(".addInsure").css({display:"block"});
				$('html,body').addClass('ovfHiden');
				$(".insureName").val("")
				$(".insureSex").val("男").siblings(".selcSpan").text("男")
				$(".insureTime").val("")
				$(".identifySelc").val("身份证").siblings(".selcSpan").text("身份证")
				$(".identifyNums").val("")
				$(".insureKind").val("1类").siblings(".selcSpan").text("1类")
		
			});
			$(document).on("click",".all_no, .no",function(){
				$(".all_fix").css({display:"none"});
				$(".zhizhao_pic").css({display:"none"});
				$(".table-load").css({display:"none"});
				$(".fabu_fix").css({display:"none"});
				$(".addInsure").css({display:"none"}).find(".Validform_checktip").html("");
				$('html,body').removeClass('ovfHiden');
				$(window).scrollTop(topHeight);
		
			});
			
			// 需要增值发票与否
			$('.selcNeed').change(function(){ 
				if($(".selcNeed").val()==2){
					$(".select_ul").css({display:"none"});
				}else{
					$(".select_ul").css({display:"block"});
				}
			});
			
			$(".form_fix").Validform({
		        tiptype: 4,
		        btnSubmit:".addInsure_yes", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
		        ignoreHidden:true,
		        postonce: true,
		        datatype:{
		        	'names':/^[\u4e00-\u9fa5\w\-\.(^\s*)]+$/,
		            'numbers':/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
		        },
		        beforeCheck :function(curform){
		        	var identifyNums = $(".identifyNums").val();
		        	if(!identifyNums){
						$(".tell1").html("请填写证件号码");
						return false;
					}
		        	if($(".addLi_right .identifySelc").val() == 1) {
						var identifyTest = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
						if(!identifyTest.test(identifyNums)) {
							$(".tell1").html("证件号码填写不正确");
							return false;
						}
					}
		        },
		        beforeSubmit:function(){
		        	var timers;
		        	clearInterval(timers);
					var insureName=$(".insureName").val();
					var insureSex=$(".insureSex").val();
					var insureSexop=$(".insureSex").find("option:selected").text();
					var insureTime=$(".insureTime").val();
					var identifySelc=$(".identifySelc").val();
					var identifySelcop=$(".identifySelc").find("option:selected").text();
					var identifyNums=$(".identifyNums").val();
					var insureKind=$(".insureKind").val();
					var insureKindop=$(".insureKind").find("option:selected").text();
					var dataid=$(".addInsure_yes").data("id");
					var datapage=$(".addInsure_yes").data("page");
					$(".addInsure_yes").html("提交中···").addClass("loading-bt").attr("disabled",true);
					if(dataid==""){
						$.ajax({
							type:"post",
							url:urllist,
							dataType: 'json',
							data:{
								'name':insureName,
								'id_type':identifySelc,
								'id_number':identifyNums,
								'sex':insureSex,
								'birth_date':insureTime,
								'industry_type':insureKind},
							success:function(res){
								$(".addInsure_yes").html("确认").removeClass("loading-bt").attr("disabled",false);
								if(res.code=="200"){
									$(".no").click();
									$('html,body').removeClass('ovfHiden');
									that.renderList(res.data.data,1);
									that.pagefunc(res.data.sum,1);
									$(".totalMoney span").html(res.data.total_money);
									$(".totalNums").html(res.data.suc_num);
									$(".right_nums").html(res.data.suc_num);
									$(".wrong_nums").html(res.data.fail_num);
								}else{
									$(".error-tishi-time").show().html(res.msg);
									timers=setInterval(function(){
										$('.error-tishi-time').hide().html("");
										clearInterval(timers);
									},2000);
								}
							},
							error:function(){
								$(".addInsure_yes").html("确认").removeClass("loading-bt").attr("disabled",false);
						//  	alert("网络错误，请稍后再尝试！");
							}
						});
					}else{
						$.ajax({
							type:"put",
							url:urllist,
							dataType: 'json',
							data:{'id':dataid,
								'name':insureName,
								'id_type':identifySelc,
								'id_number':identifyNums,
								'sex':insureSex,
								'birth_date':insureTime,
								'industry_type':insureKind,
								'page':datapage
							},
							success:function(res){
								$(".addInsure_yes").html("确认").removeClass("loading-bt").attr("disabled",false);
								if(res.code=="200"){
									$(".no").click();
									$('html,body').removeClass('ovfHiden');
									that.renderList(res.data.data,datapage);
									that.pagefunc(res.data.sum,datapage);
									$(".totalMoney span").html(res.data.total_money);
									$(".totalNums").html(res.data.suc_num);
									$(".right_nums").html(res.data.suc_num);
									$(".wrong_nums").html(res.data.fail_num);
								}else{
									$(".error-tishi-time").show().html(res.msg);
									timers=setInterval(function(){
										$('.error-tishi-time').hide().html("");
										clearInterval(timers);
									},2000);
								}
							},
							error:function(){
								$(".addInsure_yes").html("确认").removeClass("loading-bt").attr("disabled",false);
						//  	alert("网络错误，请稍后再尝试！");
							}
						});
					}
					
					
					return false;
		        }
			})
			$(".addLi_right .identifySelc").change(function(){
				$(".tell1").html("");
			})
			$(".identifyNums").blur(function(){
				
				var identifyNums = $(".identifyNums").val();
				var identifyTest = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
				if(!identifyNums){
					$(".tell1").html("请填写证件号码");
				}else{
					$(".tell1").html("");
				}
				if($(".addLi_right .identifySelc").val() == 1) {
					if(identifyTest.test(identifyNums)) {
						$(".tell1").html("");
					}else{
						$(".tell1").html("请填写身份证");
					}
				}
				
				
			});
			
			$(".myform").Validform({
		        tiptype: 4,
		        btnSubmit:".payNow", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
		        ignoreHidden:true,
		        datatype:{ 
		        	'name':/^[\u4E00-\u9FA5\w()（）\-\.(^\s*)]+$/,
		        	'credit':/^[A-Z0-9]{1,18}$/,
		            'phone':/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{2}-\d{7}$|^0\d{3}-\d{7}$|^0\d{3}-\d{8}$/,
		            'number':/^[a-z0-9]+$/,
		            'price':/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$/
		        },
		        beforeCheck:function(curform){
		        	if($('input[name="license"]').val()==""){
						$("html, body").stop().animate({scrollTop:500},0);
						$(".load-null").html("请上传营业执照");
						return false
		        	};
		        	if($('#selt-city').val()==""){
						$("html, body").stop().animate({scrollTop:600},0);
						$(".city-div .Validform_checktip").html("请选择城市");
						return false
		        	};
		        	if($('input[name="agreement"]').eq(1).is(":checked")&&$('input[name="insured_license"]').val()==""){
		        		$("html, body").stop().animate({scrollTop:1500},0);
						$(".load-null1").html("请上传营业执照");
						return false
		        	}
		        },
		        beforeSubmit:function(){
		        	if($(".wrong_nums").text()-0>0) {  // 列表信息有误时，弱提示
						$(".all_tip").show();
						var tipTime = setTimeout(function(){
							$(".all_tip").hide();
						},1000)
						return false;
					}else if($(".totalNums").text()-0<5){	// 列表正确条数小于5时，弹框提示
						$(".all_fix").css({display:"block"});
						T.addTemp({ele:".all_fix",a:$(".payNow").data("message"),url:$(".payNow").data("url")});
						return false;
					}else{
						$(".payNow").html("提交中···").addClass("loading-bt").attr("disabled",true);
						$.ajax({
							type:"post",
							url:urlload,
							dataType: 'json',
							data:$(".myform").serialize(),
							success:function(res){
								$(".payNow").html("确认").removeClass("loading-bt").attr("disabled",false);
								if(res.code=="200"){
									window.location.href=res.data.ref_url;
								}else{
									
								}
							},
							error:function(){
								$(".payNow").html("确认").removeClass("loading-bt").attr("disabled",false);
						//  	alert("网络错误，请稍后再尝试！");
							}
						});
						return false;
					};
		        }
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
				$(this).parent().siblings(".city").show();
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
			//表格上传
			$(document).on("click",".table-load-bt",function(){
				$(".all_fix").css({display:"block"});
				$(".table-load").css({display:"block"});
				$("#containerPolicy5").remove();
				var divload=$('<div id="containerPolicy5">'+
                            '<span class="input_file" id="policyBrowser5">浏览</span>'+
                        '</div>');
                $(".table-all").append(divload);
				Qibao.policyUpload('containerPolicy5', 'policyBrowser5', 'policyUrl5', 'policyProcessArea5', 'showPolicy5', 'policyName5');
				$(".table-load").find("input").attr("value","");
				$(".table-load").find(".first_input").html("");
			});
			$(document).on("click",".table-load-ok",function(){
				var tabval=$("#policyName5").val();  
				if(tabval){  
					$(".table-load-ok").html("提交中···").addClass("loading-bt").attr("disabled",true); 
					$.ajax({
						type:"post",
						url:urlupload,
						dataType: 'json',
						data:$("#table-load").serialize(),
						success:function(res){
							$(".table-load-ok").html("确认").removeClass("loading-bt").attr("disabled",false);
							if(res.code=="200"){
								$(".all_fix").css({display:"none"});
								$(".table-load").css({display:"none"});
								that.renderList(res.data.data,1);
								that.pagefunc(res.data.sum,1);
								$(".totalMoney span").html(res.data.total_money);
								$(".totalNums").html(res.data.suc_num);
								$(".right_nums").html(res.data.suc_num);
								$(".wrong_nums").html(res.data.fail_num);
							}else if(res.code=="10003"){
								$(".error-tishi").show().html(res.msg);
								timers=setInterval(function(){
									$('.error-tishi').hide().html("");
									clearInterval(timers);
								},3000);
							}
							
						},
						error:function(){
							$(".table-load-ok").html("确认").removeClass("loading-bt").attr("disabled",false);
					//  	alert("网络错误，请稍后再尝试！");
						}
					});
					
				}else{
					$(".table-load .Validform_checktip").html("请上传表格");
				}
				return false;
			});
			
			// 点击编辑
			$(document).on("click",".editOne",function(){
				topHeight = $(window).scrollTop();
				$(".all_fix").css({display:"block"});
				$(".addInsure").css({display:"block"});
				$("html,body").addClass("ovfHiden");
				var dataid=$(this).data("id");
				var datapage=$(this).data("page");
				$(".addInsure_yes").data("id",dataid);
				$(".addInsure_yes").data("page",datapage);
				var tdName = $(this).closest("tr").find(".tdName").text();
				var tdIdtype = $(this).closest("tr").find(".tdIdType").text();
				var tdIdcard = $(this).closest("tr").find(".tdIdCard").text();
				var tdTime = $(this).closest("tr").find(".tdTime").text();
				var tdSex = $(this).closest("tr").find(".tdSex").text();
				var tdOccupational = $(this).closest("tr").find(".tdOccupational").text();
				$(".identifySelc option").each(function(){
				   if($(this).text() == tdIdtype){
				      $(".identifySelc").val($(this).val()).siblings(".selcSpan").text(tdIdtype)
				   }
				});
				$(".insureName").val(tdName)
				$(".insureSex option").each(function(){
				   if($(this).text() == tdSex){
				      $(".insureSex").val($(this).val()).siblings(".selcSpan").text(tdSex)
				   }
				});
				$(".insureTime").val(tdTime)
				$(".identifyNums").val(tdIdcard)
				$(".insureKind option").each(function(){
				   if($(this).text() == tdOccupational){
				      $(".insureKind").val($(this).val()).siblings(".selcSpan").text(tdOccupational)
				   }
				});
			});
			
			
			// 点击弹框的 确定按钮
			$("body").on("click",".tank_fix .fabu_yes",function(){
				var opurl=$(this).data("type");
				var dataid=$(this).data("id");
				var datapage=$(this).data("page");
				if(opurl == 'close') {
					$(".no").click();
					return false;
				} 
				if(opurl == 'empty'){   // 清空列表信息
					$.ajax({
						type:"delete",
						url:urlnull,
						dataType: 'json',
						success:function(res){
						},
						error:function(){
					//  	alert("网络错误，请稍后再尝试！");
						}
					});
					$(".tableContain tr td").remove();
					$(".wrong_nums").text(0);
					$(".right_nums").text(0);
					$(".totalNums").text(0);
					$(".totalMoney span").text(0);
					$(".no").click();
					that.pagefunc(0,1);
					return false;
				} 
				if(opurl == 'delete'){	// 删除单个投保人信息
					$.ajax({
						type:"delete",
						url:urllist,
						dataType: 'json',
						data:{"id":dataid,page:datapage},
						success:function(res){
							if(res.code=="200"){
								$(".no").click();
								that.renderList(res.data.data,datapage);
								that.pagefunc(res.data.sum,datapage);
								$(".totalMoney span").html(res.data.total_money);
								$(".totalNums").html(res.data.suc_num);
								$(".right_nums").html(res.data.suc_num);
								$(".wrong_nums").html(res.data.fail_num);
							}
						},
						error:function(){
					//  	alert("网络错误，请稍后再尝试！");
						}
					});
					return false;
				}
			});
			
			// 点击选择文件
			$(".used1_find").blur(function(){
				
			});
			$(".used2_find").blur(function(){
				
			});
			
		},
		
		//列表分页
		pagefunc:function(all,now){
			var that = this;
			if(all-0<=10){
				$('.nub').hide();
			}else{
				$('.nub').show();
			}
			$('.nub').pagination({
				totalData:all,	//数据总条数
				current	:now,	//当前第几页
				showData:10,	//每页显示的条数
				prevCls	:'img_left',	//上一页class
				nextCls	:'img_right',	//下一页class
				prevContent	:'',	//上一页节点内容
				nextContent	:'',	//下一页节点内容
				activeCls	:'active',	//当前页选中状态class名
				count	:2,	//当前选中页前后页数
//				isHide	:true,	//总页数为0或1时隐藏分页控件
				keepShowPN	:false,	//是否一直显示上一页下一页
				homePage	:'',	//首页节点内容，默认为空
				endPage	:'',	//尾页节点内容，默认为空
				callback:function(api){
			        $.ajax({
						type:"get",
						url:urllist,
						dataType: 'json',
						data:{"page":api.getCurrent()},
						success:function(res){
							
							that.renderList(res.data.data,api.getCurrent());
							$(".totalMoney span").html(res.data.total_money);
							$(".totalNums").html(res.data.suc_num);
							$(".right_nums").html(res.data.suc_num);
							$(".wrong_nums").html(res.data.fail_num);
						},
						error:function(){
					//  	alert("网络错误，请稍后再尝试！");
						}
					});
			    }
            });
		},
		// 渲染列表页面
		renderList: function(res,page) {
			
			$(".tableContain tr:gt(0)").remove();
			var list = res;
			var listHtml = "";
			var that = this;
			$(list).each(function() {
				listHtml += "<tr>\
								<td class='wrongTips'>\
									<div class='wrongDiv'>\
										<div class='error-pic'></div>\
										<div class='wrongTxt'></div>\
									</div>\
								</td>\
								<td class='tdName'>"+this.name+"</td>\
								<td class='tdIdType'>"+this.Idtype+"</td>\
								<td class='tdIdCard'>"+this.Idcard+"</td>\
								<td class='tdTime'>"+this.time+"</td>\
								<td class='tdSex'>"+this.sex+"</td>\
								<td class='tdOccupational' data-occupational='"+this.occupational+"'>"+this.occupational+"类</td>\
								<td><a class='editOne' data-id='"+this.id+"' data-page='"+page+"'>编辑</a></td>\
								<td class='deletePic'><div class='click-sure' data-message='确认删除本条参保人信息?' data-url='delete' data-id='"+this.id+"' data-page='"+page+"'></div></td>\
							</tr>"
			});
			$(".tableContain").append(listHtml);
			// 渲染错误的列表
			$(list).each(function(indexs,items){
				if(this.error != "") {
					$(".tableContain tr").eq(indexs+1).find(".wrongDiv").show();
					$(".tableContain tr").eq(indexs+1).addClass("red");
					var wrongTxtHtml = "";
					$(this.error).each(function(index,item){
						wrongTxtHtml += "<p>"+item+"</p>";
					})
					$(".tableContain tr").eq(indexs+1).find(".wrongTxt").append(wrongTxtHtml);
				};
			});
		}
	};
	employ.init();
	
})()
