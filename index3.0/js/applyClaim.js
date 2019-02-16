$(function(){
	// 上传附件
	var sdd=$(".accessory_li").eq(0);
	var z=$(".accessory_li").length;
	$(document).on("click",".add-load .add-pic",function(){
		z++;
		var big=0;
		$(".contents-ul_left strong").each(function(){
			var nub=parseInt($(this).html());
			if(nub>big){
				big=nub;
			};
		});	
		var times=big+1;
		var add=sdd.clone(true);
		add.find(".contents-ul_left strong").html(times);
		add.find(".accessory_input").attr("id","attachment_name_show_"+z).html("");
		add.find('#attachment_url_1').attr("id","attachment_url_"+z);
		add.find('#attachment_name_1').attr("id","attachment_name_"+z);
		add.find("#container_send_1").attr("id","container_send_"+z);
		add.find(".file_upload").attr("id","file_upload_"+z);
		add.find(".upload_content_bottom").attr("id","upload_show_process_area_"+z);
		add.find("#container_send_"+z).html('').append('<label class="file_upload" id="file_upload_'+ z +'">点击上传</label>');
		add.insertBefore(".infor");
		Qibao.policyUpload('container_send_'+z, 'file_upload_'+z, 'attachment_url_'+z, 'upload_show_process_area_'+z, 'attachment_name_show_'+z, 'attachment_name_'+z);
		
//		$.initDataPlugin();
	});
	
//	// 上传附件(确认结案)
//	var accessory_li2 = '<li class="clear accessory_li2">\
//							<div class="contents-ul_left">\
//								<span>附件 <strong>1</strong>：</span>\
//							</div>\
//							<div class="contents-ul_right">\
//								<div class="clear">\
//									<span class="accessory_input"></span>\
//									<label><span class="input_file">点击上传</span></label>\
//									<div class="reduce"></div>\
//								</div>\
//								<div class="upload_content_bottom">\
//									<p>共：<span class="size">902.51M</span> 已上传：<span class="percentage">10% </span>上传速度：<span class="upload_speed">26.87KB/s</span></p>\
//									<div class="speed">\
//										<p>共：<span class="size">902.51M</span> 已上传：<span class="percentage">10% </span>上传速度：<span class="upload_speed">26.87KB/s</span></p>\
//									</div>\
//								</div>\
//							</div>\
//						</li>';
//	$(document).on("click",".add-load .add-pic2",function(){
//		var s=$(".accessory_li2").length;
//		var big=0;
//		s++;
//		if(s==1){
//			$(this).closest("li").before(accessory_li2);
//		}else {
//			$(".contents-ul_left strong").each(function(){
//				var nub=parseInt($(this).html());
//				if(nub>big){
//					big=nub;
//				};
//			});	
//			var times=big+1;
//			var sdd2=$(".accessory_li2").eq(0);
//			var add=sdd2.clone(true);
//			add.find(".contents-ul_left strong").html(times);
//			add.find(".accessory_input").attr("id","attachment_name_show_"+s).html("");
//			add.find('#attachment_url_1').attr("id","attachment_url_"+s);
//			add.find('#attachment_name_1').attr("id","attachment_name_"+s);
//			add.find("#container_send_1").attr("id","container_send_"+s);
//			add.find(".file_upload").attr("id","file_upload_"+s);
//			add.find(".upload_content_bottom").attr("id","upload_show_process_area_"+s);
//			add.find("#container_send_"+s).html('').append('<label class="file_upload" id="file_upload_'+ s +'">点击上传</label>');
//			add.insertBefore(".infor");
//			Qibao.policyUpload('container_send_'+s, 'file_upload_'+s, 'attachment_url_'+s, 'upload_show_process_area_'+s, 'attachment_name_show_'+s, 'attachment_name_'+s);
//			
//	//		$.initDataPlugin();
//		}
//		
//	});
	
	// 点击减少附件按钮
	$(document).on("click",".reduce",function(){
		$(this).closest("li").remove();
		z>=1 ? z-- : z=1;
		var agin=0;
		$(".contents-ul_left strong").each(function(){
			agin++;
			$(this).html(agin);
		});	
	});
	
	//上传提单验证
	$(".confirmRight .tell").bind("DOMNodeInserted",function(e){
	    $(".confirmRight .Validform_checktip").html("");
	    $(this).css({color:"#555"});
	});
	
	// 表单验证
	$(".myform").Validform({
        tiptype: 3,
        btnSubmit:".nexts",
//      ignoreHidden:true,
//      postonce: true
        datatype:{
			'price':/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/
        },
        beforeCheck:function(curform){
        	//上传赔案申请的盖章文件
        	if($(".confirmRight .tell").html()=="请上传文件"){
				$(".confirmRight .Validform_checktip").html("请上传赔案申请的盖章文件");
				return false
			};
        },
        beforeSubmit:function(curform){
//      	$(".all_fix").show();
//			$(".tank_fix").show();
//			return false;
        },
        callback:function(data){
			if($(".nexts").hasClass('disabled')){
				return false;
			}
			$(".nexts").addClass("disabled");
			$.post($(".myform").attr('action'),$(".myform").serialize(),function(data){
				if(data.code == 200){
					window.location.href='/insured/maintenance/reparation/view?id='+data.data;
					return;
				}else if(data.code == 90000){
					$("#box_msg").text(data.data);
					$(".all_fix").show();
					$(".tank_fix").show();
				}else{
					alert(data.data);
				}
				$(".nexts").removeClass("disabled");
			},'json');
        	return false;
        }
   });
   
    // 选择时间
    $('#datetimepicker1').datetimepicker({
			language: 'zh-CN', 
	        format: 'yyyy-mm-dd',
	        weekStart: 1,
	        todayBtn:  0,
			autoclose: true,
			todayHighlight: 1,
			startView: 2,
			minView:2,
			startDate : null,
			forceParse: 0,
	        showMeridian: 1
	    });
    $(document).on("change","#datetimepicker1",function(){
    	$(this).siblings("span.Validform_checktip").css({display:"none"});
	});
   
    // 关闭弹框
    $(document).on("click",".no,.all_no",function(){ 
		$(".all_fix").hide();
		$(".tank_fix").hide();
	});
})
