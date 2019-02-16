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
	$(".group_bottom ol").click(function(){
		var index = $(this).index();
		if(index>0) {
			$(this).addClass("check").siblings("ol").removeClass("check");
			$(this).find("input[type='radio']").attr("checked","checked");
		}
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
//	$(".add_img2").click(function(){
//		var add1=$(".accessory_li").eq(0).clone(true);
//		add1.insertBefore(".infor");
//	});
	
	
//	$(".add_img2").on("click", function() {
//          var maxOrder = parseInt($(".accessory_li:first-child").find('input[name="attachment_order[]"]').val());
//          $(".accessory_li").find('input[name="attachment_order[]"]').each(function (index, domEle) {
//              if(maxOrder < parseInt($(domEle).val())) {
//                  maxOrder = parseInt($(domEle).val());
//              }
//          });
//          maxOrder = maxOrder + 1;
//          var uploadAdd = '<li class="clear accessory_li">'+
//				                '<div class="project_left ">'+
//				                    '<input type="text" name="attachment_type_name[]"/>'+
//				                '</div>'+
//				                '<div class="project_right clear file_label">'+
//				                    '<div class="clear">'+
//				                        '<span class="accessory_input first_input" id="attachment_name_show_'+maxOrder+'" ></span>'+
//				                       '<input type="hidden" id="attachment_url_'+maxOrder+'" name="attachment_url[]" />'+
//				                        '<input type="hidden" id="attachment_name_'+maxOrder+'" name="attachment_name[]" />'+
//				                        '<input type="hidden" name="attachment_order[]" value="'+maxOrder+'" />'+
//				                        '<label><input type="file" class="input_file" id="file_upload_'+maxOrder+'" />点击上传</label>'+
//				                        '<div class="reduce"></div>'+ 
//				                    '</div>'+
//				                    '<div id="upload_show_process_area_'+maxOrder+'" class="upload_content_bottom"></div>'+
//				                '</div>'+
//				            '</li>';
//          //uploadAdd.insertBefore(".infor");
//          $(".infor").prepend(uploadAdd);
//          Qibao.tenderUpload('file_upload_' + maxOrder, 'attachment_url_' + maxOrder, 'upload_show_process_area_' + maxOrder, 'attachment_name_show_' + maxOrder, 'attachment_name_' + maxOrder);
//      });
	
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
//	        'price':/^((\d{1,3}(,\d{3})+?|\d+)(\.\d{2})?|(\.\d{2}))$/
//	        'price':/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$/
			'price':/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/
        },
        beforeCheck:function(curform){
            if(!!window.ActiveXObject || "ActiveXObject" in window) {
                if($(".riqi input").val()==""){
                    var top1=$(".riqi input").offset().top-200;
                    $(".dBody").stop().animate({scrollTop:top1},0);
                    $(".riqi .Validform_checktip").css({display:"block"});
                    return false
                };
                if(mmm<data){
                    var top1=$(".riqi input").offset().top-200;
                    $(".dBody").stop().animate({scrollTop:top1},0);
                    $(".riqi .Validform_checktip").css({display:"block"}).html("请选择正确日期");
                    return false
                };
                if($(".check_city").val()==""){
                    var top2=$(".check_city").offset().top;
                    $(".dBody").stop().animate({scrollTop:top2},0);
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
                // if($(".project_right.setting.othersetting:eq(1)input:checkbox:checked").length<=0){
                //     top=$(".project_right.setting.othersetting:eq(1)").offset().top-200;
                //     $(".project_right.setting.othersetting:eq(1)").siblings(".Validform_checktip").text("请选择");
                //     $(".project_right.setting.othersetting:eq(1)").siblings(".Validform_checktip").show();
                //     $(".dBody").stop().animate({scrollTop:-top},0);
                //     return false;
                // }

            }else {
                if ($(".riqi input").val() == "") {
                    var top1 = $(".riqi input").offset().top - 200;
                    $("html, body").stop().animate({scrollTop: top1}, 0);
                    $(".riqi .Validform_checktip").css({display: "block"});
                    return false
                }
                ;
                if (mmm < data) {
                    var top1 = $(".riqi input").offset().top - 200;
                    $("html, body").stop().animate({scrollTop: top1}, 0);
                    $(".riqi .Validform_checktip").css({display: "block"}).html("请选择正确日期");
                    return false
                }
                ;
                if ($(".check_city").val() == "") {
                    var top2 = $(".check_city").offset().top - 200;
                    $("html, body").stop().animate({scrollTop: top2}, 0);
                    $(".city_tell").css({display: "block"});

                    return false;
                }
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
							$(this).siblings("span.tell").text('请输入最多有一位小数的金额').css({display:"block"});
							jieguo= 0;
							var top2=$(this).offset().top-200;
							$("html, body").stop().animate({scrollTop:top2},0);
							return false;
						}else{
							jieguo= 1;
						};
					});
					
					var inpt = $(this).closest('.last_ol').find("input.nub_input").eq(0).val()/10;
					var $this = $(this).closest('.last_ol').find("input.nub_input1");
					var str=$this.val();
					var result=(/^([1-9]\d*(,\d{3})*|0)(\.\d{0,1})?$/.test(str));
					if(!result){
						$this.siblings("span.tell").text('格式错误，请输入最多有一位小数的金额').css({display:"block"});
						jieguo= 0;
						var top2=$this.offset().top-200;
						$("html, body").stop().animate({scrollTop:top2},0);
						return false;
					}else if(str > inpt){
						$this.siblings("span.tell").text('金额不能大于死亡、伤残赔偿限额的十分之一').css({display:"block"});
						jieguo= 0;
						var top2=$this.offset().top-200;
						$("html, body").stop().animate({scrollTop:top2},0);
						return false;
					}else if(str==0){
						$this.siblings("span.tell").text('金额不能为0').css({display:"block"});
						jieguo= 0;
						var top2=$this.offset().top-200;
						$("html, body").stop().animate({scrollTop:top2},0);
						return false;
					}else{
						jieguo= 1;
					};
					
				};
				
			})
			if(jieguo==0){
//				$(window).bind('beforeunload',function(){return '确认离开此页吗';});
				return false
			}
			if($(".content .tell_html").html()==""){
				$(".tell_file").css({display:"block"});
//				$(window).bind('beforeunload',function(){return '确认离开此页吗';});
				return false
			}
			if($(".other_c").is(":checked")){
				if($(".other_c_input").val()==""){
					var top4=$(".other_c_input").offset().top-200;
					$("html, body").stop().animate({scrollTop:top4},0);
					$(".tell_other").css({display:"block"});
//					$(window).bind('beforeunload',function(){return '确认离开此页吗';});
					return false
				}
			}
			
			if($(".his-choose .his_one").is(":checked")){
				if($(".tell_html1").html()==""){
					$(".tell_file1").css({display:"block"});
//					$(window).bind('beforeunload',function(){return '确认离开此页吗';});
					return false
				}
			}
			
			//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
			//这里明确return false的话将不会继续执行验证操作;	
		},
        beforeSubmit:function(curform){
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
    
    
    $(".add_parent").on("click","label",function(){
    	var fangan=$(this).find("span").html();
    	$(this).closest(".group_bottom").find(".suzu").attr("value",fangan);
    	$(".last_ol").each(function(){
    		if($(this).find("input").is(":checked")){
			}else{
				$(this).find(".tell").css({display:"none"});
				$(this).find(".nub_input").val("");
			}
    	})
		
	})
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
	
	//总金额
	$(document).on("change",".munput",function(){
		var munmoney=0;
		$(".munput").each(function(){
			moneyone=$(this).val().split(",").join("")-0;
			munmoney+=moneyone;
		});
		munmoney=moneys(munmoney.toString());
		$(".money-li-cont .money_red span").html(munmoney);
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
	
	$("textarea[name='other_clause']").on("input propertychange", function() {  
        var $this = $(this),  
        _val = $this.val(),  
        count = "";  
        console.log(_val.length);
        if (_val.length > 500) {  
        	//s=s.Substring(0,s.Length-1)
            $this.val(_val.substring(0, 500));  
        }     
    });
    $("textarea[name='goods_type']").on("input propertychange", function() {
        var $this = $(this),  
        _val = $this.val(),  
        count = "";  
        console.log(_val.length);
        if (_val.length > 500) {  
        	
            $this.val(_val.substring(0, 500));  
        }     
    });
    $(".project_right img").click(function(){
    	$("option").css("display","block");
    })

    // $(function(){
    //     $("select").on("change",function(){
    //         var this_=this;
    //         $(this_).parent().siblings(".spTime1").text($("option:selected",this_).text());
    //         $(this_).siblings(".product-all").text($("option:selected",this_).text());
    //     })
    // })
    //
    // $(function () {
    //
    //     $("select").each(function(){
    //         var this_=this;
    //         if($("option:selected",this_).text().length!==0){
    //             $(this_).parent().siblings(".spTime1").text($("option:selected",this_).text());
    //             $(this_).siblings(".product-all").text($("option:selected",this_).text());
    //         }
    //             $(".spTime1").show();
    //             $(".product-all").show();
    //
    //     })
    // })
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
	var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
	var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    $(window).scroll(function(){
    	if(isIE) {
    		//$(document).scrollTop()>($('input:eq(0)')).offset().top+$('input:eq(0)').outerHeight()-82
      		$("input").each(function(){
		    	var isFocus=$(this).is(":focus");  
				if(true==isFocus){  
					if($(document).scrollTop()>($(this)).offset().top-82){
						$(this).blur();
					}
				}
		  	});
		  	$("textarea").each(function(){
		    	var isFocus=$(this).is(":focus");  
				if(true==isFocus){  
					if($(document).scrollTop()>($(this)).offset().top-82){
						$(this).blur();
//						$(this).css("color","transparent");
					}
				}
		  	});
        }  
    })

	
})
