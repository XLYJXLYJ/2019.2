$(function(){
	var myDate=new Date()
	var data=myDate.setDate(myDate.getDate()+3);
	var newTime = new Date(data);
	var datas=newTime.getDate();
	var x=(2-datas)*40+"px";
	var currYear = (new Date()).getFullYear();
	var opt = {};
	opt.date = {
		preset: 'date'
	};
	opt.default = {
		theme: 'android-ics light', //皮肤样式
		display: 'modal', //显示方式 
		mode: 'scroller', //日期选择模式
		lang: 'zh',
		setText: '确定',
        cancelText: '取消',
		minDate: new Date(data),
		onShow: function (inst) { 
			$(document).find(".dwsc tr td").eq(2).find(".dw-ul").css({"-webkit-transform": "translate3d(0,"+x+",0)"});
			$(document).find(".dwsc tr td").eq(2).find(".dw-ul .dw-li").removeClass("dw-sel");
			$(document).find(".dwsc tr td").eq(2).find(".dw-ul .dw-li[data-val="+datas+"]").addClass("dw-sel");
		},
		startYear: currYear , //开始年份
		endYear: currYear+1,  //结束年份
		onSelect: __datetimeOnSelectDelegate
	};   
	$("#datetimepicker1").val('').scroller('destroy').scroller($.extend(opt['date'], opt['default']));
	function __datetimeOnSelectDelegate(textDate, inst) { 
	    var time=$('#datetimepicker1').val();
		$('#datetimepicker2').val(QBZZ.helper.timeHelper.timeAddYear(time,1));
	};
	
	
    $(".myform").Validform({
        tiptype: 4,
        btnSubmit:".end-bt", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
        ignoreHidden:true,
        datatype:{
        	'name':/^[\w\u4E00-\u9FA5()（）]{2,30}$/,
        	'credit':/^[A-Z0-9]{1,18}$/,
        	'area':/^0\.[0-9]{1,}$|^([1-9]\d{0,2})(\.[0-9]{1,})?$|^1000$/,
        	'postcodes':/^[1-9]\d{5}(?!\d)$/,
            'phone':/^1\d{10}$/,
            "mail":/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/
        },
        beforeCheck:function(curform){
        	
        	var jieguo=1;
			$(".file").each(function(){
				if($(this).val()==""&&jieguo==1){
					$(this).siblings("span.poto").css({display:"block"});
					jieguo= 0;
					var top2=$(this).offset().top-500;
					$("html, body").stop().animate({scrollTop:top2},0);
					return false;
				}else{
					jieguo= 1;
				};
			});
			
			if(jieguo==0){
				return false
			}
       	},
       	beforeSubmit:function(curform){
       		var phonenub=$(".phone").val();
			var yanzenma=$(".yanzenma").val();
			var result=1;
			$.ajax({
				type: 'GET',
				url: '/index/checkSmsCode',
				dataType: 'json',
				async: false,
				data: {
					'cellphone': phonenub,
					'sms_code': yanzenma
				},
				success: function(res) {
					
					if(res.code==200){
						result=1;
						$(".Verification-nub").css({display:"none"});
					}else{
						result=0;
						$(".Verification-nub").css({display:"block"}).html("验证码错误");
						return false;
					}
				},
				error:function(){
					$(".Verification-nub").css({display:"block"}).html("验证码错误");
					result=0;
					return false;
				}
			});
			if(result==0){
				return false;
			}
		}
    });
    $(document).on("change",".cont-information .correct,.file",function(){
//  	alert("a")
    	$(this).siblings("span.Validform_checktip").css({display:"none"});
    	$(this).siblings("span.poto").css({display:"none"});
    });
//短信验证码
	$(document).on("click",".validate-bt",function(){
		var phonenub=$(".phone").val();
		if(phonenub&&$(".phone").siblings("span.Validform_wrong").length==0){
			$(this).addClass("disabled");
			change(60,".validate-bt");
			$.ajax({
				type: 'GET',
				url: '/index/getSmsCode',
				dataType: 'json',
				data: {
					'cellphone': phonenub,
				},
				success: function(res) {
					
				}
			});
		}else{
			$(".phone").focus();
		}
		
	});


})