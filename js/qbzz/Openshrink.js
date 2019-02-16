//收起、展开
$(function() {
	var i = 0;
	$(".span-tab").click(function() {
		if(i == 0) {
			$(this).parent("span").css("height", "auto");
			$(this).html("收起");
			i = 1;
		} else {
			$(this).parent("span").css("height", "60px");
			$(this).html("展开");
			i = 0;
		}

	});

	//分期支付添加


	$("#insuredForm").off('click.addTab').on("click.addTab", ".add_tab", function() {
		var s = $(this).parents("li").children(".add-dl");
		var s1 = s.children("dd:first-child");
		var s2;
		var len;
		var len_input;
		var number;
		s1.clone(true).appendTo(s);
		len = s.children("dd").length;
		s2 = s.children("dd").eq(len - 1).find("input");
		len_input = s2.length;
		for(var i = 0; i < len_input; i++) {
			s2.eq(i).val("");
		}

		Change_number();

	});

	//上传文件添加
	$("#insuredForm").on("click", ".add_upload_tab", function() {
		$(".add-Upload_dl dl dd:first-child").clone(true).appendTo(".add-Upload_dl dl");

	});
	//上传文件添加保单维护详情
	$(".Single-batch .add-Upload-text .add_upload_tab").click(function() {
		var s = $(this).parents("li").children(".div-input");
		var s1 = s.children("dd:first-child");

	});

	//成交说明
	$(".Release-ul-tab li").click(function() {
		var num = $(".Release-ul-tab li").index(this);
		$(".Release-sel-tab").hide().eq(num).show();

	});
	//选择投保人
	var count = 0; //记录选取次数
	$("#insuredForm").on("click", ".Release-sel-tab li span", function() {
		count++;
		var tex_val = $(this).parent("li"); //获取所点按钮相应的值
		var len = $(".Release-sel-r-tab ul li").length; //获取选中ID的个数
		var id_a = $(this).parent("li").attr('id');;
		var id_b;
		var s = 0;
		for(var i = 0; i < len; i++) {
			id_b = $(".Release-sel-r-tab ul li").eq(i).attr('id');
			if(id_a == id_b) {
				s = 1;
			}
		} //判断是否有相同的ID
		if(s == 0) {
			$(tex_val).clone().appendTo(".Release-sel-r-tab ul");
			$(".Release-sel-r-tab ul span").html("-");
		} else {
			alert("您已经添加!");
		}
	});

	$("#insuredForm").on("click", ".Release-sel-r-tab .add_tab", function() {
		$(this).parents("li").remove();
	});

	//发布页面（是否需要纸质保单）
	$("#insuredForm").on("click", ".checkbox-tab", function() {
		var w = $(this).parents("li").find(".Billing-information-tab");

		if($(this).is(':checked')) {
			w.show();
		} else {
			w.hide();
		}

	});

	//开票信息

	$(".Billing-information-tab a.detail").hover(function() {
		$(".detail-find").show();

	}, function() {
		$(".detail-find").hide();
	});

	$(".detail-find-btn-tab").click(function() {
		$(".detail-find").hide();
	});

	$(".Release-tab-a").hide().eq(0).show();
	$(".Release_tab li").click(function() {
		var num1 = $(".Release_tab li").index(this);
		$(".Release_tab li").removeClass("active");
		$(this).addClass("active");
		$(".Release-tab-a").hide();
		$(".Release-tab-a").eq(num1).show();

	});

	//选项卡切换
	$(".Release_tab-f li").click(function() {
		var num1 = $(".Release_tab-f li").index(this);
		$("#active").val(num1);
		$(".Release_tab-f li").removeClass("active");
		$(this).addClass("active");
		$(".offer-Deal-tab").hide();
		$(".offer-Deal-tab").eq(num1).show();

	});

	//参保企业用户（响应中）
//	var i_a = 0;
//	$(".show-btn").click(function() {
//
//		if(i_a == 0) {
//			$(this).parents(".Response").css("height", "auto");
//			i_a = 1;
//		} else {
//
//			$(this).parents(".Response").css("height", "165px");
//			i_a = 0;
//		}
//
//	});

	//运营管理平台（保险公司—会员管理）
	var i_ab = 0;
	$(".organization .show-btn").click(function() {

		if(i_ab == 0) {
			$(this).parents(".Response").css("height", "auto");
			i_ab = 1;
		} else {

			$(this).parents(".Response").css("height", "191px");
			i_ab = 0;
		}

	});

	//参保企业保险标管理-发布（编辑）
	$(".Release-title-tab li").hover(function() {
		var num = $(".Release-title-tab li").index(this);
		$(".Release-title-tab li").removeClass("active");
		$(this).addClass("active");
		$(".Release-sel-contact-tab").hide().eq(num).show();

	});

	//参保企业用户(发票删除)
	$(".invoice-box .col-md-4 i").click(function() {
		$(this).parents(".col-md-4").remove();
	});

	//沒有幫助
	$(".Not-help").click(function() {
		var text_help = $(this).html();
		if(text_help == "没有帮助") {
			$(this).html("撤销没有帮助");
		} else {
			$(this).html("没有帮助");
		}
	});

	//保单维护——详情
	$(".Several-quotations-a").click(function() {
		$(".Several-quotations-a .offer-form").hide();
		$(this).children(".offer-form").show();
	});

	//运营管理平台（保险公司—会员管理）
	$(".Insurance-company-l  h3").click(function() {
		$(this).next("dl").show();
	});

	//企业财产险
	$(".ul-tab .li-tab input").click(function() {
		var radio_check = $(this).parents(".li-tab").children(".label-tab").children("input");
		if(radio_check.is(':checked')) {
			$(this).parents(".ul-tab").children(".ts-li").show();
		} else {
			$(this).parents(".ul-tab").children(".ts-li").hide();
		}

	});

	//动态添加删除
	$("#insuredForm").on("click", ".clear-tab", function() {
		var s = $(this).parents(".clear-dl-tab").children("dd");
		var number;
		var num = s.length;
		if(num > 1) {
			$(this).parents("dd").remove();
			Change_number();

		}

	});

	function Change_number() {
		var len = $(".Change_number dl dd").length;
		for(var i = 0; i < len; i++) {
			$(".Change_number dl dd").eq(i).children(".span_val").html(i + 1);

		}
	}

	//保险行业其他用户注册
	$(".region select").change(function() {
		var val = $(".region select").val();
		if(val == "境外") {
			$(".city_a").hide();
			$(".city_b").show();
			$(".phone span").hide();
			$(".phone em").hide();
		} else {
			$(".city_a").show();
			$(".city_b").hide();
			$(".phone span").show();
			$(".phone em").show();
		}
	});
	//关于我们（资质牌照）
	$(".License img").hover(function() {
		$(".License .License-box").stop().show(500);
	}, function() {
		$(".License .License-box").stop().hide(500);
	});

	//文件上传
	$("#insuredForm").on("change", ".Upload-button", function() {
		var file_name = $(this).val();
		$(this).parents(".Upload").children(".Upload-text").val(file_name);
	});

	//保留两位小数
	$(".parseFloat_box").change(function() {
		var val;
		val = parseFloat($(this).val()).toFixed(2);
		$(this).val(val);
	});

	//发布页面保费分期支付
	$("#insuredForm").on("click", ".Payment_show_box", function() {
		var index = $("#insuredForm .Payment_show_box").index(this);
		var s = $(this).parents("ul").find(".Payment_show").eq(1);
		$("#insuredForm .Payment_show").hide().eq(index).show();
		if(index == 0) {
			s.find("dl").removeClass("Calculate_01");
			s.find(".span_color").html("");
		} else {

			s.find("dl").addClass("Calculate_01");

		}
	});
	//默认选中起保后付费
	if($(".checkbox_tab2").is(':checked')) {
		$("#insuredForm .Payment_show").eq(1).find("dl").addClass("Calculate_01");
	}

	//起保后付费 验证总和
	$("#insuredForm").on("click", ".submit_tab", function() {
		var val = 0;
		var s = $(".Calculate_01 dd");
		var len = $(".Calculate_01 dd").length;
		for(var i = 0; i < len; i++) {
			val += parseInt(s.eq(i).find(".Percentage").val());
		}

		if(val != 100 && $(".Payment_show").find("dl").hasClass("Calculate_01")) {
			$(".Payment_show").find(".span_color").html("<b>分期支付总和应为100%且还款日期不能为空</b>");
			return false;
		} else {
			$(".Payment_show").find(".span_color").html("");
		};

		////		//验证费率
		////		if($('#price_premium').val() == '') {
		////			alert('保费不能为空');
		////			return false;
		////		}
		//		if($('#agreement').is(':checked') == false) {
		//			alert('请选择我保证我的报价是真实有效的，且具有法律效力。否则，将承担相应违约责任。');
		//			return false;
		//		}
		//		$('#type').val(2);
		//		$('#insuredForm').submit();

	});

	//报价页面起保后付费 验证总和
	$("#insuredForm").on("click", ".priceSaveSubmit", function() {
		var val = 0;
		var s = $(".Calculate_01 dd");
		var len = $(".Calculate_01 dd").length;
		for(var i = 0; i < len; i++) {
			val += parseInt(s.eq(i).find(".Percentage").val());
		}

		if(val != 100 && $(".Payment_show").find("dl").hasClass("Calculate_01")) {
			$(".Payment_show").find(".span_color").html("<b>分期支付总和应为100%且还款日期不能为空</b>");
			return false;
		} else {
			$(".Payment_show").find(".span_color").html("");
		};

		////		//验证费率
		////		if($('#price_premium').val() == '') {
		////			alert('保费不能为空');
		////			return false;
		////		}
		if($('#agreement').is(':checked') == false) {
			alert('请选择我保证我的报价是真实有效的，且具有法律效力。否则，将承担相应违约责任。');
			return false;
		}
		$('#type').val(2);
		$('#insuredForm').submit();

	});

	//添加投保雇员
	$("#insuredForm").on("click", ".add_upload_tab_a", function() {
		$(".add-people dl dd:first-child").clone(true).appendTo(".add-people dl");

	});

	//悬赏/索要金币
	$(".Coins-box select").change(function() {
		var this_val = $(this).val();
		if(this_val != "请选择") {
			$(this).siblings(".span_01").show();
		} else {
			$(this).siblings(".span_01").hide();
		}

		if(this_val == "悬赏金币") {
			$(this).siblings(".span_02").show();
		} else {
			$(this).siblings(".span_02").hide();
		}

	});

	var s = $(".Coins-box select").parents("li");
	if($(".Coins-box select").val() == "悬赏金币") {
		s.find("span").show();

	};
	if($(".Coins-box select").val() == "索要金币") {
		s.find("span").hide();
		s.find(".span_01").show();
	};

	//发布页面排名
	$("#insuredForm").on("click", ".submit_tab", function() {

		var val;
		var sel_val = new Array();
		var s = $(".ranking_tab select");
		$(".ts_box").hide();
		var len = $(".ranking_tab select").length;
		for(var i = 0; i < len; i++) {
			val = s.eq(i).val();
			if(val != "请选择") {
				sel_val[i] = val;

			}
		}; //将选择的值存入数组

		for(var i = 0; i < sel_val.length; i++) {
			//判断是否排名重复！
			for(var j = i + 1; j < sel_val.length; j++) {
				if(sel_val[i] == sel_val[j]) {
					$(".ts_box").html("排名不能重复！").show();
					return false;

				}
			};

			//判断是否按照连续顺序进行排名
			if(sel_val[i] > sel_val.length) {
				$(".ts_box").html("请按照连续顺序进行排名").show();
				return false;

			};

		};

	});

	//起保后付费 自动计算
	$("#insuredForm").on('change', ".Percentage", function() {
		var price_premium = parseFloat($(this).val());
		var s = $(".data_val").val();
		var data_val = parseFloat(s); //获取保费
		if(s != "") {
			$(this).siblings(".disabled").val(((price_premium * data_val) / 100).toFixed(2));
		}
	});
	//起保后付费 自动计算 （点击保费）
	$("#insuredForm").on('change', ".data_val", function() {
		var data_val = parseFloat($(this).val()); //获取保费
		Percen_val_a(data_val);

	});
	//起保后付费 自动计算 （点击费率）
	$("#insuredForm").on('change', ".rate_tab", function() {
		var data_val = parseFloat($("#insuredForm .data_val").val()); //获取保费
		Percen_val_a(data_val);

	});

	function Percen_val_a(data_val_a) {
		var s = $("#insuredForm .Change_number dd");
		for(var i = 0; i < s.length; i++) {
			var Percent = s.eq(i).find(".Percentage").val(); //获取每一期的百分比
			if(Percent != "") {
				var price_premium = parseFloat(Percent);
				s.eq(i).find(".money_tab").val(((price_premium * data_val_a) / 100).toFixed(2));
			} else {
				return false;
			};
		}
	};

	//生成保单弹出框
	$(".show_tab").click(function() {
		var price_id = $(this).data("price_id");
		var wish_url = $(this).data("wish_url");
		$("#price_id").val(price_id);
		if ((wish_url == '') || (wish_url == undefined)) {
			$("#download_wish_url").hide();	
		} else {
			$("#download_wish_url").attr('href', wish_url);	
		}
		$(".show_box01").show();
	});
	$(".show_box01 .close").click(function() {
		$(".show_box01").hide();
	});
	//上传投保意愿书弹出框
	$(".show_tab_tender").click(function() {
		var price_id = $(this).data("price_id");
		var tender_file_url = $(this).data("tender_file_url");
		$("#price_id").val(price_id);
		$("#tender_file_url").attr('href', tender_file_url);
		$(".show_box01").show();
	});

	//上传文件删除
	$(".file_tab dd span").click(function() {
		$(this).parents("dd").remove();
	});

	//关闭当前页面
	$(".close_tab2").click(function() {
		window.opener = null;
		window.open('', '_self');
		window.close();
	});

	//企业财产险是否验证
	$("#insuredForm").on('click', ".yes", function() {
		$(".ul-tab .checkbox-input").attr("ignore", "");
	});
	$("#insuredForm").on('click', ".no", function() {
		$(".ul-tab .checkbox-input").attr("ignore", "ignore");
		$("#insuredForm .ts-li").find("p").html("");
	});
	if($("#insuredForm .no").is(':checked')) {
		$(".ul-tab .checkbox-input").attr("ignore", "ignore");
	};

	//职业类别查询弹出框
	$("#insuredForm").on('click', ".search-tab", function() {
		$(this).parents(".search-people").find(".search-box").show();
	});
	$("#insuredForm").on('click', ".close_02", function() {
		$(this).parents(".search-box").hide();
	});
	$("#insuredForm").on('click', ".search-people .design-btn", function() {
		$(this).parents("ul").find("select").each(function() {
			if($(this).val() == "请选择") {
				$(".search-people .search-box ul b").html("请选择!");
				return false;
			} else {
				$(".search-people .search-box ul b").html("");
			}
		});
	});
	//国际、国内货物运输保险（保险主条款）
	$("#insuredForm").on('click', ".design-btn", function() {
		var Tag = $("#insuredForm .clause_tab");
		if(Tag.find("select").val() == "请选择" && Tag.find("textarea").val() == "") {
			Tag.find("b.Tip").html("至少选择一项");
			return false;
		} else {
			Tag.find("b.Tip").html("");
		}

	});

	//发布页面项目信息日期验证
	$("#insuredForm .clearfix").find("input").attr("ignore", "ignore");
	$("#insuredForm").on('click', ".offer-design-btn", function() {
		var s = $(this).parents("#insuredForm").find(".clearfix input");
		var input_len = s.length;
		for(var i = 0; i < input_len; i++) {
			if(s.eq(i).val() == "") {
				s.parents(".clearfix").append("<b style='line-height:40px;color:#db4d00;'>请选择保险期限！</b>");
				return false;
			} else {
				s.parents(".clearfix").find("b").hide();
			};

		};
	});

	//发布页面成交说明日期验证
	$("#insuredForm .Release-c-a .span-data").find("input").attr("ignore", "ignore");
	$("#insuredForm").on('click', ".submit_tab", function() {
		var s = $(this).parents("#insuredForm").find(".Release-c-a .span-data input");
		if(s.val() == "") {
			s.parents(".Release-c-a").append("<b style='line-height:40px;color:#db4d00;'>请选择保险期限！</b>");
			return false;
		} else {
			s.parents(".Release-c-a").find("b").hide();
		};

	});

	//返回顶部
	$("#back-to-top").click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});

	//批单保费验证
	$("#insuredForm").on('click', ".Verification", function() {
		var s = $(".Verification_li").find("b.tip");
		$(".Verification_li").find("input").each(function() {
			if($(this).val() == "") {
				s.html("请完善批单保费!");
				return false;
			} else {
				s.html("");
			}
		});

	});

	//保单维护批单（批单反馈选项卡）
$("#sel_box_tab dd input").click(function() {
		var index = $("#sel_box_tab dd input").index(this);
		$("#sel_box_tab dd input").attr("checked", "");
		$(this).attr("checked", "checked");
		$(this).parents("#sel_box_warp").find("ul").hide().eq(index).show();
	});

});