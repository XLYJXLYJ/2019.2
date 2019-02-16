$(function(){
	$(window).bind('beforeunload',function(){return '确认离开此页吗';});
	$(document).on("click",".hold,.up",function(){
		$(window).unbind('beforeunload');
	});

//  ie8兼容indexOf
	if (!Array.prototype.indexOf){
		Array.prototype.indexOf = function(elt /*, from*/){
		    var len = this.length >>> 0;
		　　var from = Number(arguments[1]) || 0;
		    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		    if (from < 0){
		    from += len;
		    }
		　　for (; from < len; from++){
		      if (from in this && this[from] === elt){
		      return from;
		      }
		    }
		    return -1;
		};
	};
	
	
	$(document).on("click",'.method-type',function(){
		var dex=$(this).index();
		$(this).addClass("method-type-active").siblings().removeClass("method-type-active");
		if(dex==0){
			$(".tishi").css({display:"none"})
			$(".brand").show();
			$(".brand").removeClass("method-two");
			$(".brand .brand_top p").html("各大主流保险公司为您报价");
			$(".salesman").removeClass("method-tree");
			$(".brand li").addClass("choose_no");
			$(".have").find(".choose_cont").remove();
			$(".search_ul").css({display:"none"});
			$(".search_cont input").val("");
			$(".input1").val("");
			$(".input2").val("");
			$(".input3").attr("value","1"); 
			$(".insuranceNames").eq(0).removeClass("hide");
			$(".insuranceNames").eq(1).addClass("hide");
		}else if(dex==1){
			$(".brand .brand_top p").html("请选择保险公司为您报价");
			$(".brand").show();
			$(".brand").addClass("method-two");
			$(".salesman").removeClass("method-tree");
			$(".check_pp .have").find(".choose_cont").remove();
			$(".search_ul").css({display:"none"});
			$(".search_cont input").val("");
			$(".input2").val("");
			$(".input3").attr("value","2");
			$(".insuranceNames").eq(0).addClass("hide");
			$(".insuranceNames").eq(1).removeClass("hide")
		}else{
			$(".brand").removeClass("method-two");
			$(".brand").hide();
			$(".salesman").addClass("method-tree");
			$(".brand li").addClass("choose_no");
			$(".choose_brand .have").find(".choose_cont").remove();
			$(".input1").val("");
			val1=[];
			$(".input3").attr("value","2");
		}
	})
	
	$(".myform").Validform({
        tiptype: 4,
        btnSubmit:".next", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
        ignoreHidden:true,
        postonce: true,
        datatype:{
        	'name':/^[\u4E00-\u9FA5\w()（）\-\.(^\s*)]+$/,
            'phone':/^1\d{10}$/,
            "number":/^[1-9]\d*$/,
            'price':/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
        },
        beforeCheck:function(curform){
        	if($("#datetimepicker1").val()==""){
				$(".tell").css({display:"block"});
				return false
			};
			
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
			}
			
        	if($(".method-two").size()>0){
				var result1=$(".input1").val();
				if(result1==""){
					$(".tishi").css({display:"block"}).find("span").html("您选择了定向发布需求，请选择品牌。");
					return false;
				}
			};
			if($(".method-tree").size()>0){
				var result2=$(".input2").val();
				if(result2==""){
					$(".tishi").css({display:"block"}).find("span").html("您选择了指定业务员，请选择业务员。");
					return false;
				}
			};
		//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
		//这里明确return false的话将不会继续执行验证操作;	
		},
        beforeSubmit:function(curform){
			$(window).unbind('beforeunload');
		}
	});
	
	
	
//	$(".next").click(function(){
//		if($(".judge").is(':checked')){
//			var result1=$(".input1").val();
//			var result2=$(".input2").val();
//			if(result1==""&&result2==""){
//				$(".tishi").css({display:"block"});
//			}
//		}
//	});		
		
	$(".brand").on("click",".more",function(){
		$(this).removeClass("more").addClass("back");
		$(this).find("span").html("收起品牌");
		$(".brand ul").css({height:"auto"});
	});
	$(".brand").on("click",".back",function(){
		$(this).removeClass("back").addClass("more");
		$(this).find("span").html("更多品牌");
		$(".brand ul").css({height:"178px"});
	});
	
	var val1=[];
	$(document).on("click",".method-two ul li",function(){
		$(".tishi").css({display:"none"});
		if($(this).attr("class")=="choose_no"){
			var ida=$(this).data("id");
			var name=$(this).find("span").html();
			var div=$('<div class="choose_cont"><div class="choose_pic"></div><span>'+name+'</span></div>');
			div.attr("id",ida);
			$(".brand .have").append(div);
			$(this).removeClass("choose_no");
			val1.push(ida);
			$(".end .input1").val(val1);
		}else{
			$(this).addClass("choose_no");
			val1.splice(val1.indexOf($(this).data("id")),1);
			$(".end .input1").val(val1);
			$(".brand .have").find("#"+$(this).data("id")).remove();
		}
	});
	
	$(".brand").on("click",".choose_cont",function(){
		var id=$(this).attr("id");
		val1.splice(val1.indexOf(id),1);
		$(".end .input1").val(val1);
		$(".brand .have").find("#"+id).remove();
		$(".brand ul li").each(function(){
			if($(this).data("id")==id){
				$(this).addClass("choose_no");
			}
		});
	});
	
	
	$(".salesman").on("click",".target",function(){
		$(".tishi").css({display:"none"});
		var value="";
		var result=true;
		var ids=$(this).data("id");
		var datid="";
		$(".salesman .choose_cont").each(function(){
			datid=datid+","+$(this).attr("id");
		});
		var str1=datid.slice(1,datid.length);
		$(".end .input2").val(str1);
		arr=str1.split(",");
		for(var i=0;i<=arr.length;i++){
			if(ids==arr[i]){
				result=false;
			}
		};
		if(result){
			var name=$(this).html();
			var div=$('<div class="choose_cont"><div class="choose_pic"></div><span>'+name+'</span></div>');
			div.attr("id",ids);
			$(".salesman .have").append(div);
		};
		$(".salesman .choose_cont").each(function(){
			value=value+","+$(this).attr("id");
		});
		var str1=value.slice(1,value.length);
		$(".end .input2").val(str1);
	});
	
	$(".salesman").on("click",".choose_cont",function(){
		var val="";
		$(this).remove();
		$(".salesman .choose_cont").each(function(){
			val=val+","+$(this).attr("id");
		});
		var str2=val.slice(1,val.length);
		$(".end .input2").val(str2);
		//弹框中选中去掉
		var dtid=$(this).attr("id");
		$(".yewuyuan-cont").each(function(){
			var dataid=$(this).data("id");
			if(dataid==dtid){
				$(this).find("input").attr("checked",false);
				$(this).removeClass("lan");
			}
		})
	});
	
	$(".seach_pic").click(function(){
		$(".search_ul").css({display:"block"});
		$(".search_ul1").css({display:"block"});
		var ml=$(this).siblings("input").val();
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: '/insured/ajax/get/user',
			data: {'user_name':ml},
			success: function(res) {
                if (res && res.code === 200) {
                	$(".search_ul").css({display:"block"});
                	$(".search_ul li").remove();
                	$(".search_ul1").css({display:"block"});
                	$(".search_ul1 li").remove();
                    if (res.data!="") {
                    	for(var i=0;i<res.data.length;i++){
                    		var li=$("<li  class='target'><span style='margin-right:10px;'>"+res.data[i].name+"</span><span>"+res.data[i].company_abbr+"</span></li>");
                    		li.data("id",res.data[i].id);
                    		$(".search_ul").append(li);
                    		$(".search_ul1").append(li);
                    	}
                    }else{
                    	var li=$("<li>未找到对应信息</li>");
                    		$(".search_ul").append(li);
                    		$(".search_ul1").append(li);
                    }
                }
            },
			error:function(){
			  	
			}
		});
		
	});
	//搜索框点击消失
	$(document).bind("click",function(e){
		var target  = $(e.target);
		if(target.closest(".search_ul").length == 0){
		    	$(".search_ul").hide();
		}
		if(target.closest(".search_ul1").length == 0){
		    	$(".search_ul1").hide();
		}
	});
	
	//经纪人
	//选中变黑
	$(document).on("click",".yewuyuan-cont input",function(){
		if($(this).is(':checked')){
			$(this).closest(".yewuyuan-cont").addClass("lan");
		}else{
			$(this).closest(".yewuyuan-cont").removeClass("lan");
		}
	});
	//弹框
	$(document).on("click",".check-others",function(){
		$(".aimi_window").hide();
		$(".select_window").show();
		$(".all_fix").show();
        $(".fix-people").show();
	});
	$(document).on("click",".no,.all_no",function(){
		$(".all_fix").hide();
		$(".aimi_window").show();
		$(".select_window").hide();
	});
	//选择业务员
	$(document).on("click",".fix-people button",function(){
		var timers;
		clearInterval(timers);
		var n=0;
		var value="";
		$(".yewuyuan-cont").each(function(){
			if($(this).find("input").is(':checked')){
				$(".tishi").hide();
				n=1;
				var names1=$(this).find(".ywname").html();
				var names2=$(this).find(".ywcompany").html();
				var ids=$(this).data("id");
				var res=0;
				var times=$(".choose_cont").length;
				for(var i=0;i<times;i++){
					var id=$(".choose_cont").eq(i).attr("id");
					if(id==ids){
						res=1;
					};
				};
				if(res==0){
					var div=$('<div class="choose_cont"><div class="choose_pic"></div><span>'+names1+'</span><span>'+names2+'</span></div>');
					div.attr("id",ids);
					$(".salesman .have").append(div);
				}
			}
		});
		if(n==1){
			$(".all_fix").hide();
		}else{
			$(".error-tishi").show();
			timers=setInterval(function(){
				$(".error-tishi").hide();
				clearInterval(timers);
			},2000);
		}
		$(".salesman .choose_cont").each(function(){
			value=value+","+$(this).attr("id");
		});
		var str1=value.slice(1,value.length);
		$(".end .input2").val(str1);
	});
	
	
	$('.search_cont').bind('keyup', function(event) {
		if (event.keyCode == "13") {
			//回车执行查询
			$(".seach_pic").click();
		}
	});	
	
	//Aimi核保
	$(document).on("click",".aimi-bt,.aimi-picbt",function(){
		var tps=$(".aimi-bt").data("type");
		$(".gujia-two tbody").find("tr").remove();
		$(".gongzhe").remove()
		if(tps==0){
			$(".select_window").hide();
			$(".aimi_window").show();
			$(".all_fix").show();
			var tb='<tr>\
						<td>火灾、爆炸事故</td>\
						<td><input class="input-prices deductibles initial1 nubers" name="deductible_fas_amount" type="text" placeholder="请输入" value="0.00"/></td>\
						<td><input class="franchise initial2 nubers"  type="text" name="deductible_fas_per" placeholder="请输入" value="0.00"/></td>\
					</tr>\
					<tr>\
						<td>水灾事故</td>\
						<td><input class="input-prices deductibles initial3 nubers" name="deductible_flood_amount" type="text" placeholder="请输入" value="0.00"/></td>\
						<td><input class="franchise initial4 nubers" type="text" name="deductible_flood_per" placeholder="请输入" value="0.00"/></td>\
					</tr>\
					<tr>\
						<td>地震事故</td>\
						<td><input class="input-prices deductibles initial5 nubers" name="dedictoble_earthquake_amount" type="text" placeholder="请输入" value="0.00"/></td>\
						<td><input class="franchise initial6 nubers" type="text" name="deductible_earthquake_per" placeholder="请输入" value="0.00"/></td>\
					</tr>\
					<tr>\
						<td>其他事故</td>\
						<td><input class="input-prices deductibles initial7 nubers" name="deductible_other_amount" type="text" placeholder="请输入" value="1,000.00"/></td>\
						<td><input class="franchise initial8 nubers" type="text" name="deductible_other_per" placeholder="请输入" value="10.00"/></td>\
					</tr>'
			$(".gujia-two tbody").append(tb);
		}else if(tps==1){
            $(".all_fix").show();
            $(".fix-people").hide();
            $(".aimi_window").show()
			var tb='<tr>\
						<td>一般免赔</td>\
						<td><input class="input-prices deductibles initial1 nubers" name="deductible_fas_amount" type="text" placeholder="请输入" value="1,000.00"/></td>\
						<td><input class="franchise initial2 nubers" type="text" name="deductible_fas_per" placeholder="请输入" value="10.00"/></td>\
					</tr>'
			$(".gujia-two tbody").append(tb);
		}else if(tps==2){
			$(".all_fix").show();
			var gongzhe='<div class="gongzhe clear">\
								<span class="head-put">场所性质：</span>\
								<div class="nature">\
									<select class="selc " name="nature">\
										<option value="0">请选择</option>\
										<option value="1">办公楼</option>\
										<option value="2">设计院</option>\
										<option value="3">事业单位</option>\
										<option value="4">大型商场</option>\
										<option value="5">餐厅酒楼</option>\
										<option value="6">酒店</option>\
										<option value="7">剧院</option>\
										<option value="8">公共娱乐场所</option>\
										<option value="9">机械制造工厂</option>\
										<option value="10">水泥厂</option>\
										<option value="11">化工厂</option>\
										<option value="12">建筑工地</option>\
										<option value="13">管道安装</option>\
										<option value="14">卷烟工厂</option>\
										<option value="15">锅炉工厂</option>\
										<option value="16">火电厂</option>\
										<option value="17">医院</option>\
										<option value="18">学校</option>\
										<option value="19">体育馆</option>\
										<option value="20">商铺</option>\
									</select>\
									<span class="selcSpan style_span">请选择</span>\
								</div>\
							</div>';
			$(".gujia-cont").prepend(gongzhe);
			$(".gujia-cont").addClass("gongzhong");
			var tb='<tr>\
						<td>医疗费用免赔</td>\
						<td><input class="input-prices deductibles initial1 nubers" name="deductible_fas_amount" type="text" placeholder="请输入" value="100.00"/></td>\
						<td><input class="franchise initial2 nubers"  type="text" name="deductible_fas_per" placeholder="请输入" value="0.00"/></td>\
					</tr>\
					<tr>\
						<td>财产损失免赔</td>\
						<td><input class="input-prices deductibles initial3 nubers" name="deductible_flood_amount" type="text" placeholder="请输入" value="1,000.00"/></td>\
						<td><input class="franchise initial4 nubers" type="text" name="deductible_flood_per" placeholder="请输入" value="10.00"/></td>\
					</tr>'
			$(".gujia-two tbody").append(tb);
		}else{
			$(".aimi-tishi").show();
			var timer=setTimeout(function(){
				$('.aimi-tishi').hide();
				clearTimeout(timer);
			},3000); 
		};
		
		initial1=$(".initial1").val();
		initial2=$(".initial2").val();
		initial3=$(".initial3").val();
		initial4=$(".initial4").val();
		initial5=$(".initial5").val();
		initial6=$(".initial6").val();
		initial7=$(".initial7").val();
		initial8=$(".initial8").val();
		
		
	});
	
	//下拉箭头
    $(document).on("change",".selc",function(){
		var optionvalue=$(this).find("option:selected").text();
		$(this).siblings(".selcSpan").text(optionvalue);
	});
	$(".selc").blur(function(){
		$(this).siblings(".selcSpan");
	});
	
	//验证估价
	$(document).on("click",".gujia-bt",function(){
		var that = $(this);
		if(that.hasClass("doing")){
			return false;
		};
		var nature=$(".nature .selc").val();
		if(nature==0){
			$(".error-tit").show().html("请选择场所性质");
			wrongTips();
			return false;
		};
		var mianji=$(".mianji").val();
		if($(".gujia-cont").hasClass("gongzhong")){
			/*if(mianji>0){
				
			}else{
				$(".error-tit").show().html("请输入大于0的面积");
				wrongTips();
				return false;
			}*/
			
		}
		// 年赔付率的验证
		var result1=0;
		$(".loss_ratios").each(function(){
			var numInsured = $(this).val().replace(/,/g,'');
			if(numInsured>=0&&numInsured<=1000){
			} else{
				result1=1;
				$(".error-tit").show().html("赔付率范围是[0-1000]");
				wrongTips();
				return false;
			};
			
		});
		if(result1==1){
			return false;
		};
		
		// 免赔金额的验证
		var result2=0;
		$(".deductibles").each(function(){
			var blun=(/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/.test($(this).val()));
			var coverage = $("#coverage").val()*0.5;
			var sumInsured = 2000000.00;
			var numInsured = $(this).val().replace(/,/g,'');
			coverage<=2000000 ? sumInsured = coverage : sumInsured = 2000000
			if(blun){
				if(numInsured>=0&&numInsured<=sumInsured){
				} else{
					result2=1;
					$(".error-tit").show().html("免赔额范围是[0-"+sumInsured+"]");
					wrongTips();
					return false;
				};
			}else{
				result2=1;
				$(".error-tit").show().html("免赔额金钱格式错误");
				wrongTips();
				return false;
			};
		});
		if(result2==1){
			return false;
		};
		
		var result3=0;
		$(".franchise").each(function(){
			if($(this).val()>=0&&$(this).val()<=50&&$(this).val()!=""){
			}else{
				result3=1;
				$(".error-tit").show().html("免赔率范围是[0-50]");
				wrongTips();
				return false;
			};
		});
		if(result3==1){
			return false;
		};
		that.addClass("doing").text("正在评估...");
		$.get("/insured/aimi_evaluation",$('#Aimi-gujia').serialize(),function(data){
			if(data.code==200){
				$(".feilv").html(data.data.rate+"‰");
				$(".gujia-bg").hide();
				$(".gujia-end").show();
				var endmoney=data.data.price;
				var changenub=(endmoney/40).toFixed(2)-0;
				var mun=0.00;
				var tt=setInterval(function(){
					if(mun+changenub>=endmoney||changenub==0){
						$(".change-money").html(price(endmoney.toString()));
						clearInterval(tt);
					}else{
						mun+=changenub;
						$(".change-money").html(price(mun.toString()));
					}
					$(".error-tit").hide().text("");
				},50);
			}
			that.removeClass("doing").text("开始评估");
		},"json");
		
	});
	
	//重新估价
	var initial1;
	var initial2;
	var initial3;
	var initial4;
	var initial5;
	var initial6;
	var initial7;
	var initial8;
	
	$(document).on("click",".gujia-else,.all_no,.no",function(){
		$(".loss_ratios").val("");
		$(".gujia-bg").show();
		$(".gujia-end").hide();
		$(".nature .selc option").eq(0).attr("selected","selected");
		$(".selcSpan").html("请选择");
		$(".mianji").val("");
		$(".change-money").html("0.00");
		$(".initial1").val(initial1);
		$(".initial2").val(initial2);
		$(".initial3").val(initial3);
		$(".initial4").val(initial4);
		$(".initial5").val(initial5);
		$(".initial6").val(initial6);
		$(".initial7").val(initial7);
		$(".initial8").val(initial8);
	});
	
	$(document).on("blur",".nubers",function(){
		var nub=$(this).val();
		if(nub&&nub>=0){
			nub=(nub-0).toFixed(2);
			$(this).val(nub);
		};
	});
//	$(document).on("click",".nubers",function(){
//		var nub=$(this).val();
//		if(nub==="0.00"){
//			$(this).val("");
//		};
//	});
	
	function price(s){
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
	
	var wrongTips = function(){
		var timees;
		if(timees){
			clearInterval(timees);
		}
    	timees=setInterval(function(){
			$(".error-tit").hide().text("");
			clearInterval(timees);
		},5000);
    };
    
    
    
    $("#datetimepicker1").change(function(){
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

})





