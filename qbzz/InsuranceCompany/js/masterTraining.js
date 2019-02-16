$(function(){
	var orderid = $.getUrlParam('id');
	var numb;
	var ttype;
//	alert(orderid);
	//进入页面加载请求
	$.post("/insured/training/getDetail",{id:orderid},function(data){
		if(data.code=="200"){
			$(".colorname").html(data.data.username);
			$(".project_numb").html(data.data.training_key);
			$(".project_type").html(data.data.product_name);
			$(".project_time").html(data.data.insurance_term);
			$(".project_maintk").html(data.data.master_clause);
			$(".project_goods").html(data.data.goods_name);
			$(".project_natures1").html(data.data.industry_one);
			$(".project_natures2").html(data.data.industry_two);
			$(".project_grade").html(data.data.building_grade);
			$(".project_aptitude").html(data.data.eqname);
			
			$(".project_nature").html(data.data.nature);
			$(".project_erea").html(data.data.nature_place);
			
			$(".departure_country").html(data.data.departure_country);
			$(".departure_city").html(data.data.departure_city);
			$(".arrive_country").html(data.data.arrive_country);
			if(data.data.arrive_city==0){
				var arrive_city="";
			}else{
				var arrive_city=data.data.arrive_city;
			}
			$(".arrive_city").html(arrive_city);
			$(".project_transporttype").html(gettransport(data.data.transport_mode,data.data.product_id));
			$(".project_packingtype").html(data.data.packing_mode);
			
			$(".project_security1").html(getsecurity(data.data.fas));
			$(".project_security2").html(getsecurity(data.data.auto_fire_system));
			$(".project_security3").html(getsecurity(data.data.hydrant_and_extincteur));
			$(".project_security4").html(getsecurity(data.data.security_duty));
			$(".project_security5").html(getsecurity(data.data.flood_control));
			
			$(".project_address1").html(data.data.province);
			$(".project_address2").html(data.data.city);
			$(".project_address3").html(data.data.area);
			
			$(".project_money").html(getMoney((data.data.freight_amount/100).toString()));
			$(".project_moneyone").html(getMoney((data.data.one_accident_limit/100).toString()));
			
			$(".compensation_limit").html(getMoney((data.data.compensation_limit/100).toString()));
			$(".single_compensation_limit").html(getMoney((data.data.single_compensation_limit/100).toString()));
			
			$(".project_detailed1").html(getMoney((data.data.construction/100).toString()));
			$(".project_detailed2").html(getMoney((data.data.mechanical/100).toString()));
			$(".project_detailed3").html(getMoney((data.data.furniture/100).toString()));
			$(".project_detailed4").html(getMoney((data.data.materials/100).toString()));
			$(".project_detailed5").html(getMoney((((data.data.materials-0)+(data.data.furniture-0)+(data.data.mechanical-0)+(data.data.construction-0))/100).toString()));
			
			$(".project_deductibles1").html(getMoney((data.data.deductible_fas_amount/100).toString()));
			$(".project_deductibles2").html(getMoney((data.data.deductible_flood_amount/100).toString()));
			$(".project_deductibles3").html(getMoney((data.data.dedictoble_earthquake_amount/100).toString()));
			$(".project_deductibles4").html(getMoney((data.data.deductible_other_amount/100).toString()));
			$(".deductible_accident_amount").html(getMoney((data.data.deductible_accident_amount/100).toString()));
			$(".deductible_medical_amount").html(getMoney((data.data.deductible_medical_amount/100).toString()));
			$(".deductible_property_amount").html(getMoney((data.data.deductible_property_amount/100).toString()));
			
			$(".project_deductiblesbf1").html(Math.round(data.data.deductible_fas_per*100));
			$(".project_deductiblesbf2").html(Math.round(data.data.deductible_flood_per*100));
			$(".project_deductiblesbf3").html(Math.round(data.data.deductible_earthquake_per*100));
			$(".project_deductiblesbf4").html(Math.round(data.data.deductible_other_per*100));
			$(".deductible_accident_pre").html(Math.round(data.data.deductible_accident_pre*100));
			$(".deductible_property_pre").html(Math.round(data.data.deductible_property_pre*100));
			
			$(data.data.additional_terms).each(function(index, obj){
				var adiv=$('<div class="lianjie" data-id="'+obj.id+'"><span>'+(index+1)+'、</span>'+obj.name+'</div>');
				$(".tiaokuans").append(adiv);
			});
			
			$(".year1").html(data.data.last_one_years);
			$(".year2").html(data.data.last_two_years);
			$(".year3").html(data.data.last_three_years);
			$(".project_histoy1").html(getPercentage(data.data.last_one_years_paid));
			$(".project_histoy2").html(getPercentage(data.data.last_two_years_paid));
			$(".project_histoy3").html(getPercentage(data.data.last_three_years_paid));
			
			ttype=data.data.parent_product_id;
			numb=data.data.order_number%5;
			if(numb==0){
				numb=5;
			};
			if(data.data.rate==null){
				var rate='';
			}else{
				var rate=data.data.rate;
			};
			$(".project_rate").attr("value",rate);
			$(".project_poundage").html(Math.round(data.data.fee*100));
			
			if(numb!=1){
				$(".previousStep").show();
				if(numb==4){
					$(".contBottomtit").html("（好棒好棒！还差一道题就闯关成功了）");
				}else if(numb==5){
					$(".contBottomtit").html("（欧耶，提交即闯关成功了）");
					$(".nextStep").html("提交");
				}else{
					$(".contBottomtit").html("（一鼓作气，继续加油）");
				}
			}else{
				$(".contBottomtit").html("（一鼓作气，继续加油）");
			};
			$(".trainStep .trainStepNum:lt("+numb+")").addClass("complete");
			$(".trainStep .trainStepLine:lt("+(numb-1)+")").addClass("hei");
		}else if(data.code=="10004"){
			window.location.href="http://my.dev.qibaozz.com/login.html";
		};
	},'json');
	
	//有无转换
	function getsecurity(res){
		if(res==1){
			return "有"
		}else{
			return "无"
		}
	};
	
	//金钱转换
	function getMoney(s){
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
	};
	
	//历年赔付
	function getPercentage(res){
		if(res=="-0.01"){
			return "未投保"
		}else{
			return Math.round(res*100)+"%";
		}
	};
	
	//运输方式
	function gettransport(res,type){
		if(res==1){
			return "空运";
		}else if(res==2){
			if(type==27){
				return "水运";
			}else{
				return "陆运";
			}
		}
	};
	
	//装箱方式
//	function packtype(res){
//		if(res==1){
//			return "袋装/箱装";
//		}else if(res==2){
//			return "散装/裸装";
//		}else if(res==3){
//			return "冷藏";
//		}else if(res==4){
//			return "捆扎";
//		}else if(res==5){
//			return "罐装";
//		}else if(res==6){
//			return "托盘";
//		}
//	};
	
	//条款查看
	$(document).on("click",".tiaokuans .lianjie",function(){
		var ids=$(this).data("id");
		
		$.post("/insured/training/getAppendClause",{id:ids},function(data){
				if(data.code==200){
					$('.all_fix').show();
					$(".tiaokuan_fix").show();
					$(".tiaokuan_title").html(data.data.name);
					$(".tiaokuan_cont").html(data.data.content);
				};
			},'json');
	});
	
	$(document).on("click",".all_no,.no,.guanbi_ok",function(){
		$(".all_fix").css({display:"none"});
		$(".chooseInsure").css({display:"none"});
		$(".tiaokuan_fix").css({display:"none"});
	});
	
	//  承保费率的验证
	$(document).on("click",'.nextStep',function(){
		var rate = $('.rateInpt').val();
		if(ttype==1){
			var rateReg = /^[5]$|^[0-4]?(\.[0-9]{1,})?$/;
		}else if(ttype==2){
			var rateReg = /^[1][0]$|^[0-9]?(\.[0-9]{1,})?$/;
		}else{
			var rateReg = /^[2]$|^[0-1]?(\.[0-9]{1,})?$/;
		}
		
		if(!rate) {
			$('.all_tip').text('请输入费率数值').show();
			setTimeout(function(){
				$('.all_tip').hide()
			},1000);
			return false;
		}
		if(!rateReg.test(rate)) {
			$('.all_tip').text('承保费率不合理，请认真填写。').show();
			setTimeout(function(){
				$('.all_tip').hide()
			},1000);
			return false;
		};
		if(rate==0) {
			$('.all_tip').text('承保费率不能为零').show();
			setTimeout(function(){
				$('.all_tip').hide()
			},1000);
			return false;
		};
		
		$.post("/insured/training/replyProblem",{id:orderid,rate:rate},function(data){
			if(data.code==200){
				if(numb!=5){
					if(data.data.type=="1"){
						window.location.href="http://my.dev.qibaozz.com/training/propertyTraining.html?id="+data.data.id;
					}else if(data.data.type=="2"){
						window.location.href="http://my.dev.qibaozz.com/training/commonTraining.html?id="+data.data.id;
					}else{
						window.location.href="http://my.dev.qibaozz.com/training/transportTraining.html?id="+data.data.id;
					};
				}else{
					window.location.href="http://my.dev.qibaozz.com/training/passed.html?type="+data.data.t;
				}
					
			};
		},'json');
//		}else{
//			$.post("/insured/training/submitRate",{id:orderid,rate:rate},function(data){
//				if(data.code==200){
//					window.location.href="http://my.qbzz.com/training/passed.html?type="+data.data.t;
//				};
//			},'json');
//		}
	});
	
	//上一题
	$(document).on("click",".previousStep",function(){
		$.post("/insured/training/upProblem",{id:orderid},function(data){
			if(data.code==200){
				if(data.data.type=="1"){
					window.location.href="http://my.dev.qibaozz.com/training/propertyTraining.html?id="+data.data.id;
				}else if(data.data.type=="2"){
					window.location.href="http://my.dev.qibaozz.com/training/commonTraining.html?id="+data.data.id;
				}else{
					window.location.href="http://my.dev.qibaozz.com/training/transportTraining.html?id="+data.data.id;
				};
			};
		},'json');
	});
	
})
