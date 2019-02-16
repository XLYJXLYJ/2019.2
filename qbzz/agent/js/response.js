$(function(){
	
	$(".padding").on("click",".mark_Arrow",function(){
		var index=$(this).parent().index();
		var na=$(this).attr("name");
		if($(this).attr("name")=="toogle"){
			$(this).attr("name","");
			$(this).find("div").css("background-position-x","-520px");
			$(this).siblings("div.mark_tabel").css({display:"block"});
		}else{
			$(this).attr("name","toogle");
			$(this).find("div").css("background-position-x","-560px");
			$(this).siblings("div.mark_tabel").css({display:"none"});
		}
	});	
	
	
	// 对比报价
    
    var tendid  ;
    $(document).on("click",".suer-baojiaa .bijia-a",function(){
    	tendid=$(this).data("tender");
    	var prices = '';
    	var companyTr = $(this).closest(".mark").find(".mark_tabel tr");
    	var trHtml = '';
    	var count = 0;
		for(var i=1; i<companyTr.length; i++){
			if(companyTr[i].getAttribute("data-status") == "yes"){
				count++;
				trHtml  += '<tr data-id="'+companyTr[i].getAttribute("data-id")+'">\
								<td class="gs">'+companyTr[i].getAttribute("data-msg")+'</td>\
								<td class="bj">'+companyTr[i].getAttribute("data-person")+'</td>\
								<td class="bf">'+companyTr[i].getAttribute("data-currency") +companyTr[i].getAttribute("data-money")+'</td>\
								<td class="xz lan-check"><label><input type="checkbox" name="" /></label></td>\
							</tr>';
				
			}
			
		}
    	
    	if(count>4){		// 报价公司大于4家 
    		$(".all_fix").css({display:"block"});
	        $(this).siblings(".gongbao-div").css({display:"block"});
	        $(this).siblings(".gongbao-div").find("tbody tr").remove();
    		$(this).siblings(".gongbao-div").find("tbody").append(trHtml);
    		$(".page1next").attr("href","javascript:;");
    	} else if(count>0 && count<=4) {	//  报价公司小于等于4家
//  		prices=companyTr[1].getAttribute("data-id");
    		$.each(companyTr,function(index,obj){
				if(obj.getAttribute("data-status") == "yes"){
    				prices=prices+"_"+obj.getAttribute("data-id");
    			};
    		});
    		prices=prices.substring(1);
    		$(this).attr("href","/insured/parity?tender="+tendid+"&price="+prices);  
    		  
    	}
    });
    
    // 选中变蓝
    $(document).on("click",".lan-check input",function(){
    	$(this).closest(".lan-check").each(function(){
    		if($(this).find("input").is(':checked')){
	    		$(this).parent("tr").addClass("lan");
	    	}else{
	    		$(this).parent("tr").removeClass("lan");
	    	};
    	});
    });
    
     // 错误信息提示2s
    var wrongTips = function(){
    	setTimeout(function(){
			$(".all_tip2").text("");
		},2000);
    };
    
    // 对比报价弹框  下一步
    $(document).on("click",".page1next",function(){
    	var prices = '';
		var lanChecked = $(this).closest(".gongbao-div").find(".lan");
		if(lanChecked.length == 0) {
			$(".all_tip2").text("请选择选择共保公司");
    		wrongTips();
		} else if(lanChecked.length > 4) {
			$(".all_tip2").text("最多选择 4 家保险公司");
    		wrongTips();
		} else {
			prices=lanChecked[0].getAttribute("data-id");
			$.each(lanChecked,function(index,obj){
				if(index>0){
					prices=prices+"_"+obj.getAttribute("data-id");
				};
			});
			$(".all_fix").css({display:"none"});
       		$(".gongbao-div").css({display:"none"});
			$(this).attr("href","/insured/parity?tender="+tendid+"&price="+prices); 
//			window.location.href="/insured/parity?tender="+tendid+"&price="+prices;
		}
    });
    
    // 关闭弹框
	$(document).on("click",".all_no,.no1,no",function(){
		$(".all_fix").css({display:"none"});
        $(".look_fix").css({display:"none"});
        $(".fabu_fix").css({display:"none"});
        $(".gongbao-div").css({display:"none"});
	});
	
	
	$(".all_no").click(function(){
        $(".all_fix").css({display:"none"});
        $(".look_fix").css({display:"none"});
        $(".fabu_fix").css({display:"none"});
        
    });
    
    // 更多按钮
//	$(document).bind("click",function(e){
//		var target  = $(e.target);
//		if(target.closest(".moreBtn").length == 0){
//		    	$(".moreBtnDiv").addClass("hide");
//		}
//	});
    //经纪人共保
  $(document).on("click",".suer-baojia",function(){
      $(".all_fix").css({display:"block"});
      $(this).find(".gongbao-div").show();
  });
    //选中变蓝
    $(document).on("click",".lan-check label",function(){
    	$(".lan-check").each(function(){
    		if($(this).find("input").is(':checked')){
	    		$(this).parent().addClass("lan");
	    	}else{
	    		$(this).parent().removeClass("lan");
	    	}
    	});
    });
    // 选择主承保人
     $(document).on("click",".gongbaopage2 .radio",function(){
     	var mons=$(this).closest("tr").data("price_premium");
     	$(".main-money").html(mons);
     	$(this).closest("tr").addClass("lan").siblings("tr").removeClass("lan");
     	$(this).closest("table").find(".mainInsure").removeClass("mainInsure");
     	$(this).closest("tr").find(".gs_name").addClass("mainInsure");
    });
    
    // 错误信息提示2s
    var wrongTips = function(){
    	setTimeout(function(){
			$(".all_tip2").text("");
		},2000);
    };
    
    // 确认报价弹框1 下一步
    $(".gongbaopage1 .page1next").click(function(){
    	$(".gongbaopage2 tr").remove();
    	$(".pageRate input").val("");
    	var num=0;
    	$(".gongbaopage1 .lan-check").each(function(){
    		if($(this).find("input").is(":checked")){
	    		num=1;
    			var mons=$(this).parent().data("price_premium");
	    		var insureName = $(this).siblings(".gs").text();
	    		var insureid = $(this).parent().data("id");
	    		var trHtml = '<tr data-id="'+insureid+'" data-msg="'+insureName+'" data-price_premium="'+mons+'">\
								<td class="widdb"><p class="gs_name">'+insureName+'</p></td>\
								<td class="wid"><input type="text" class="rateInpt" placeholder="请输入承保份额" name="rate[]" onkeyup="clearNoNum(this)"/> %\
								<input type="hidden" name="ids[]" value="'+insureid+'"/></td>\
								<td class="xz lan-check"><label><input class="radio" value="'+insureid+'" type="radio" name="zhu"/></label></td>\
							</tr>'
				$(this).closest(".gongbaopage1").siblings(".gongbaopage2").find("tbody").append(trHtml);
	    	}
    	});
    	if(num == 0){
    		$(".all_tip2").text("请选择选择共保公司");
    		wrongTips();
    	};
    	if(num == 1){
    		var mons=$(".gongbaopage2 tr").eq(0).data("price_premium");
     		$(".main-money").html(mons);
    		$(".gongbaopage2 tr").eq(0).addClass("lan");
    		$(".gongbaopage2 tr").eq(0).find(".gs_name").addClass("mainInsure");
    		$(".gongbaopage2 tr").eq(0).find(".radio").attr("checked",true);
    		$(".gongbaopage1").hide();
    		$(".gongbaopage2").show();
    		
    	}
    });
    
    // 确认报价弹框2 上一步
    $(".gongbaopage2 .pageLast").click(function(){
		$(".gongbaopage2").hide();
		$(".gongbaopage1").show();
    })
    // 确认报价弹框2 下一步
    $(".gongbaopage2 .page1next").click(function(){
    	$(".gongbaopage3 li").remove();
    	var inp = 0;
    	$(".gongbaopage2 .rateInpt").each(function(){
    		if($(this).val() == "" || $(this).val() == 0){
	    		$(".all_tip2").text("承保份额大于0");
	    		wrongTips();
	    		inp = 1;
	    		return false;
	    	}
    	});
		if(inp == 1){
			return false;
		}
		
		var totalAll = 0;
		$(".gongbaopage2 .rateInpt").each(function(){
			totalAll += $(this).val()-0;
		})
		if(totalAll != 100) {
			$(".all_tip2").text("您输入承保份额之和不是100,请重新输入");
    		wrongTips();
    		return false;
		}
		
		var bitype=$(".bitype").html();
		var mon=$(".main-money").html();
		var moneys=mon.split(",").join("")-0;
		var moneyall=0;
		$(".gongbaopage2 .rateInpt").each(function(){
			var eachmons=Math.round(moneys*$(this).val()/100);
			var eachmon=mm(Math.round(moneys*$(this).val()/100).toString());
			if($(this).closest("tr").index()+1!=$(".gongbaopage2 .rateInpt").length){
				moneyall+=eachmons;
			}else{
				eachmon=mm((moneys-moneyall).toString());
			}
			
			if($(this).closest("tr").find(".gs_name").hasClass("mainInsure")) {
				var liHtml ='<li class="clear">\
								<div class="divLeft clear" ><span class="gongsi">'+$(this).closest("tr").data("msg")+'</span><span>：</span></div>\
								<div class="divRight">\
									<span class="com-wid">'+$(this).val()+' %</span><span class="eachmon">— '+bitype+eachmon+'</span><span class="mainInsure"></span>\
								</div>\
							</li>';
				$(".sureTxt").prepend(liHtml);
			} else {
				var liHtml1 ='<li class="clear">\
								<div class="divLeft clear" ><span class="gongsi">'+$(this).closest("tr").data("msg")+'</span><span>：</span></div>\
								<div class="divRight">\
									<span class="com-wid">'+$(this).val()+' %</span><span class="eachmon">— '+bitype+eachmon+'</span>\
								</div>\
							</li>';
				$(".sureTxt").append(liHtml1);
			}
			
		});
		
		var liHtml2 ='<li class="clear">\
						<div class="divLeft" >总保费：</div>\
						<div class="divRight">\
							<span class="red">'+bitype+mon+' </span>\
						</div>\
					</li>';
		$(".sureTxt").append(liHtml2);
		
		
		$(".gongbaopage2").hide();
		$(".gongbaopage3").show();
    })
    
    // 确认共保份额3 上一步
    $(".gongbaopage3 .pageLast").click(function(){
		$(".gongbaopage2").show();
		$(".gongbaopage3").hide();
    })
    
    // 确认共保份额3 下一步
    $(".gongbaopage3 .page1next").click(function(){
    	var tender = $(this).closest(".gongbaopage3").siblings(".gongbaopage2").find('input[name="tender_id"]').val();
    	$.ajax({
			type: 'post',
			url: '/insured/tender_response/confirm_price?tender_id='+tender,
			dataType: 'json',
			data:$('.myForm').serialize(),
			success: function(res) {
				if (res && res.code === 200) {
					location.reload(); //操作成功刷新当前页面
				}else{
					alert(res.msg);
				}
			}
		});
    })
    
    
	$(document).on("click",".all_no,.no1",function(){
		$(".all_fix").css({display:"none"});
        $(".gongbao-div").css({display:"none"});
        $(".gongbaopage1").show();
        $(".gongbaopage2").hide();
        $(".gongbaopage3").hide();
        $(".gongbaopage1 input").attr("checked",false);
        $(".gongbaopage1 tr").removeClass("lan");
        $(".gongbaopage2 tr").remove();
        return false;
	});
	

	
//  $(".check_a").click(function(){
//      $(".all_fix").css({display:"block"});
//      T.addTemp({ele:".all_fix",a:"修改项目信息将使目前所有报价失效，保险公司将重新报价，是否确认修改？",url:$(this).data("url")});
//  });
//
//  $(".close").click(function(){
//      $(".all_fix").css({display:"block"});
//      T.addTemp({ele:".all_fix",a:"关闭项目将被视为中止询价，再次询价将需要重新填写项目信息，是否确认关闭？",url:$(this).data("url")});
//  });
//
//  $(".open").click(function(){
//      $(".all_fix").css({display:"block"});
//      T.addTemp({ele:".all_fix",a:"退回报价将允许对方修改或放弃报价，是否确认退回？",url:$(this).data("url")});
//  });
//
//	$(".cannot").click(function(){
//      $(".all_fix").css({display:"block"});
//      T.addTemp({ele:".all_fix",a:"若无法按要求补充业务资料，对方有可能会重新报价或放弃报价，您确定无法更改或补充资料吗？",url:$(this).data("url")});
//  });
	$("body").on("click",".no",function(){
        $(".all_fix").css({display:"none"});
        $(".fabu_fix").css({display:"none"});
        $(".look_fix").css({display:"none"});
    });

	
	//金钱转化
	function mm(s){
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
	
	 
	
	$(".require").click(function(){
		$(".all_fix").css({display:"block"});
		$(".look_fix").css({display:"block"});
		var url=$(this).data("url");
		var material=$(this).data("material");
		
		$("#get_material_content").html(material);
		$(".look_fix .look_yes").click(function(){
			window.location.href=url;
			$(".all_fix").css({display:"none"});
			$(".look_fix").css({display:"none"});
		});
	});
	
	var t = $('#myinput'); //获取到文本域对象  
    t.css("color","#A9A9A9"); //设置文本域的样式  
    var default_value = t.val(); //把默认显示的文字赋给一个变量  
      
    t.focus(function() {  //当鼠标点击文本域时修改文本域的样式，判断文本域内的文字是否等于默认值，如果等于就把文本域内设空  
        t.css("color","black");  
        if (t.val() == default_value) {  
            t.val('');  
        }  
    });  
  
    t.blur(function() { //当文本域失去鼠标焦点时判断文本域中的值是否为空，如果为空就把文本域的值设置为默认显示的文字并修改样式  
        t.css("color","black");  
        if (t.val() == '') {  
            t.val(default_value);  
            t.css("color","#A9A9A9");  
        }  
    });  
	
})
