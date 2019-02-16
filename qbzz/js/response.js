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
    $(document).on("click",".suer-baojia .bijia-a",function(){
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
//	$("body").on("click",".no",function(){
//      $(".all_fix").css({display:"none"});
//      $(".fabu_fix").css({display:"none"});
//      $(".look_fix").css({display:"none"});
//  });

//  $(".all_no").click(function(){
//      $(".all_fix").css({display:"none"});
//      $(".look_fix").css({display:"none"});
//      $(".fabu_fix").css({display:"none"});
//      $(this).find(".gongbao-div").hide();
//  });
	
	// 补充资料的弹框
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
