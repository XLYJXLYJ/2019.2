$(function(){
	//下拉箭头
	    $(document).on("change",".selcet-fictitious",function(){
			var optionvalue=$(this).find("option:selected").text();
			$(this).siblings(".jiantou").text(optionvalue).css({"border-color":"#524ae7"});
		});
		$(".selcet-fictitious").blur(function(){
			$(this).siblings(".jiantou").css({"border-color":"#e9e9f4"});
		});
	
	// 上传附件
	var sdd=$(".accessory_li").eq(0);
	var z=1;
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
	
	
	
	$(document).on("click",".reduce",function(){
		$(this).closest("li").remove();
		var agin=0;
		$(".contents-ul_left strong").each(function(){
			agin++;
			$(this).html(agin);
		});	
	});
	
	$(".myform").Validform({
        tiptype: 3,
        btnSubmit:".nexts",
//      ignoreHidden:true,
//      postonce: true
        datatype:{
			'price':/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/
        },
   });
   $(document).on("change","#datetimepicker1",function(){
    	$(this).siblings("span.Validform_checktip").css({display:"none"});
	});
   
})
