$(function(){
	
	
	$(".biaodanform").Validform({
        tiptype: 4,
        btnSubmit:".addInsure_yes", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
        ignoreHidden:true,
        postonce: true,
        ajaxPost:true,
        datatype:{
        	'names':/^[\u4e00-\u9fa5\w\-\.(^\s*)]+$/,
            'phone':/^1\d{10}$/
        },
        callback:function(data){
			if(data.code==200){
				$(".no").click();
				$(".error-tishi-time").html("提交成功").show();
				var settime=setTimeout(function(){
					$(".error-tishi-time").hide();
					clearTimeout(settime);
				},2000);
			}else{
				$(".yanzm .Validform_checktip").html("验证码错误");
			}
        }
	});
	$(document).on("click",".spclayer",function(){
		var type=$(this).data("type");
		$("input[name='insurance_id']").val(type);
		var loginval=$("input[name='login']").val();
		//货物运输保障
		var huoyun1='<div class="sur-cont-li clear" >\
						<span class="heidian">●</span>\
						<div class="sur-cont-tit">费率说明：货运投保的费率标准。</div>\
						<div class="fendian"><p>1、一般货物保费率为0.025%；</p><p>2、易碎货物保费率为0.035%；</p><p>3、冷冻货物保费率为0.04%；</p></div>\
					</div>\
					<div class="sur-cont-li clear">\
						<span class="heidian">●</span>\
						<div class="sur-cont-tit">免赔额：事故免赔的额度。</div>\
						<div class="fendian"><p>1、一般货物无免赔；</p><p>2、易碎货物每次事故绝对免赔额为保险金额的3%或损失金额的8%，两者以高者为准；</p><p>3、冷冻货物每次事故绝对免赔额为保险金额的3%或损失金额的8%，两者以高者为准；</p></div>\
					</div>';
		var huoyun2='<div class="sur-cont-li clear">\
						<span class="heidian">●</span>\
						<div class="sur-cont-tit">费率及免赔额：</div>\
						<div class="sur-cont-right">点击预约投保，即可快速享受超高性价比的特价优惠政策。</div>\
					</div>';
		//无船承运责任保障
		var wuchuan1='<table border="" cellspacing="" cellpadding="">\
								<tr><th>保险期限</th><th>一年</th><th>二年</th><th>三年</th></tr>\
								<tr><td>保费（￥）</td><td>2,000.00</td><td>4,800.00</td><td>6,500.00</td></tr>\
							</table>';
		var wuchuan2='<div>点击预约投保，即可快速享受超高性价比的特价优惠政策。</div>';	

		if(type=="2"){
			if(loginval == 1){
				var cuanlayer=huoyun(huoyun1);
			}else if(loginval == 2){
				var cuanlayer=huoyun(huoyun2);
			};
			layers(cuanlayer,'650px');
		}else if(type=="9"){
			if(loginval == 1){
				var cuanlayer=wuchuan(wuchuan1);
			}else if(loginval == 2){
				var cuanlayer=wuchuan(wuchuan2); 
			};
			layers(cuanlayer,'400px');
		}
			
	});
	//提交预约投保
	$(document).on("click",".sur-ok",function(){
		layer.closeAll();
		var loginval=$("input[name='login']").val();
		if(loginval==1){
			var insurance_ids=$("input[name='insurance_id']").val();
			$.post("/group/save",{"insurance_id":insurance_ids},function(data){
				if(data.code==200){
					$(".all_fix").show();
					$(".fabu_fix").show();
				}else if(data.code==10019){
					$(".error-tishi-time").html(data.msg).show();
					var settime=setTimeout(function(){
						$(".error-tishi-time").hide();
						clearTimeout(settime);
					},2000);
				}
			},'json');
		}else{
			$(".all_fix").show();
			$(".addInsure").show();
		}
	});	
	//验证码
	var timeer;
	$(document).on("click",".code",function(){
		var phone=$(".phone").val();
		var resultphone = /^1\d{10}$/;
		if(resultphone.test(phone)) {
			$.post("/group/sendMessage",{'cellphone':phone},function(data){
				if(data.code==200){
					var n=60;
					$(".codes").removeClass("code").html(n+"s");
					timeer=setInterval(function(){
						n--;
						if(n>0){
							$(".codes").html(n+"s");
						}else{
							$(".codes").addClass("code").html("获取验证码");
							clearInterval(timeer);
						}
					},1000)
				}
			},'json');
		}else{
			$(".phone").focus();
			$(".phone .Validform_checktip").html("请输入正确手机号");
		}
	});
	
	//国内与国外选择
	$(document).on("click",".transtype",function(){
		$("input[name='insurance_id']").val($(this).val());
	});
	//关闭弹框
	$(document).on("click",".no",function(){
		layer.closeAll();
	});
	$("body").on("click",".no,.all_no,.fabu_yes",function(){ 
		$(".all_fix").hide();
		$(".fabu_fix").hide();
		$(".addInsure").hide();
		$(".addLi_right input").val("");
		$(".addLi_right textarea").val("");
		$(".addLi_right .Validform_checktip").html("");
		$(".codes").addClass("code").html("获取验证码");
		clearInterval(timeer);
	});
	//弹框开启
	function layers(cuanlayer,height){
		layer.open({
		 	title: false,
			type: 1,
			shade: [0.7, '#030303'],
		    closeBtn: 0, //不显示关闭按钮
		    area:["660px",height],
		    shadeClose: true, //开启遮罩关闭
		    content: cuanlayer
		});
	}
	
	function wuchuan(wuchuantype){       
		var chuan1='<div class="sur_fix" >\
				<div class="no"></div>\
				<div class="sur-title">无船承运责任保障（NVOCC）</div>\
				<div class="sur-cont wuchuan-cont">\
					<div class="sur-cont-li clear">\
						<div class="sur-cont-left">简介：</div>\
						<div class="sur-cont-right">无船承运业务经营者保证金责任保险，是供无船承运业务经营资格申请人选择的一种财务责任证明形式。当因无船承运业务经营者不履行承运人义务或者履行义务不当，根据司法机关已生效的判决或者司法机关裁定执行的仲裁机构裁决应当履行赔偿责任时，用以履行赔偿。</div>\
					</div>\
					<div class="sur-cont-li clear">\
						<div class="sur-cont-left goukenle">保障额度：</div>\
						<div class="sur-cont-right red">￥800,000.00</div>\
					</div>\
					<div class="sur-cont-li clear">\
						<div class="sur-cont-left">特价优惠：</div>\
						<div class="sur-cont-right">'+wuchuantype+'</div>\
					</div>\
				</div>\
				<div class="end clear"><div class="sur-ok">预约投保</div></div>\
			</div>';
		return chuan1;
	};
	
	function huoyun(huoyuntype){
			
		var chuan='<div class="sur_fix">\
				<div class="no"></div>\
				<div class="sur-title">货物运输保障（一切险）</div>\
				<div class="sur-cont huoyun-cont">\
					<div class="sur-cont-li clear " >\
						<span class="heidian">●</span>\
						<div class="jianjie" >简介：被保险货物在进行境内/境外运输的过程中，因保险合同约定的自然灾害或意外事故造成被保险财产损失，以及为抢救被保险财产而产生的合理费用，保险人按合同约定负责赔偿。（具体保险责任以保险条款为准，需特别注意保险条款中的除外责任）</div>\
					</div>\
					<div class="sur-cont-li clear" >\
						<span class="heidian">●</span>\
						<div class="sur-cont-tit">可投保货物：一般货品、易碎货品、冷冻货品。不含下列物品：</div>\
						<div class=" scroll fendian" >\
							<p>1、 武器弹药、现金、支票、票据、单证、有价证券、信用证、护照；</p><p>2、 艺术品、金银、珠宝、钻石、玉器、文物古玩等贵重物品；</p><p>3、 鱼粉、花生、菜籽饼、地瓜干、食品罐头等易自燃易腐易蛀易变质货物；</p><p>4、 爆竹、烟花等易燃易爆品及危险品；</p><p>5、 在中国大陆境内无法修复的精密仪器；</p><p>6、 水泥、粮食、饲料、食糖；</p><p>7、 军用品；</p><p>8、 海货、鲜活物品；</p><p>9、 动植物、红木家具、成品车；</p><p>10、 二手货物、旧货物；</p><p>11、 甲板货;</p>\
						</div>\
					</div>\
					<div class="sur-cont-li clear" >\
						<span class="heidian">●</span>\
						<div class="sur-cont-tit">承保运输范围：全国各地至全球，但受制裁及战争区域除外。可承保每车、每船最大货值为人民币700万或等值的其他货币金额。</div>\
					</div>\
					<div class="sur-cont-li clear" >\
						<span class="heidian">●</span>\
						<div class="sur-cont-tit">条款：海洋运输货物保险条款（2009版）一切险，及其他与保险公司已经约定的条款及条件。</div>\
					</div>'+huoyuntype+'\
				</div>\
				<div class="yunsucheck">\
					<label ><input class="transtype" type="radio" name="transtype" checked="checked" value="2"/>国内货运险</label>\
					<label ><input class="transtype" type="radio" name="transtype"  value="3"/>进出口货运险</label>\
				</div>\
				<div class="end clear"><div class="sur-ok">预约投保</div></div>\
			</div>';
		return chuan;
	};
			
		
	
})
