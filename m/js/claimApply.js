$(function(){
	// ios系统返回强制刷新页面
	var isPageHide = false; 
	window.addEventListener('pageshow', function () { 
	    if (isPageHide) { 
	        window.location.reload(); 
	    } 
	}); 
	window.addEventListener('pagehide', function () { 
	    isPageHide = true; 
	}); 
	
	
	// 初始化上传头像
	function getToken() {
    	var uptoken = ""
		$.ajax({
			type:"get",
			url:"http://qbzz.qibaozz.com/uptoken?type=tender",
			async : false,
			dataType:'json',
			success:function(data){
				uptoken = data.uptoken;
			}
		})
		return uptoken
    }
	 
	$(".attachment_url").each(function(){
		$(this).attr('value',getToken())
	})

	
	$("#datetimepicker").focus(function(){
		document.activeElement.blur();
	});
	
	$(document).on("change",".file",function(){
    	$(this).siblings("span.Validform_checktip").css({display:"none"});
    	$(this).siblings("span.poto").css({display:"none"});
    });
    
	// 验证
    $(".myform").Validform({
        tiptype: 4,
        btnSubmit:".submitClaim", //该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
        ignoreHidden:true,
        datatype:{
            'price':/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/
        },
        beforeCheck:function(curform){
        	var jieguo=1;
			$(".file").each(function(){
				if(jieguo==1 && $(this).siblings('.poto').length>0){
					$(this).siblings("span.poto").css({display:"block"});
					jieguo= 0;
					var index = $(this).closest("li").index();
					var topTips = (600+index*200)+"rem";
					$("html, body").stop().animate({scrollTop:topTips},0);
					return false;
				}else{
					jieguo= 1;
				};
			});
			if(jieguo==0){
				return false;
			}
       	},
       	beforeSubmit:function(curform){
       		$(".all-fix").css({display:"block"});
       		$(".goClaim").css({display:"block"});
       		if($(".jiehuo").val()!=1){
				return false;
			}
       	}
    });
    
    // 键盘遮盖输入框问题
	$(document).on("click",".accountRight input",function(){
		var top=$(this).offset().top-100;
		document.body.scrollTop=top;
	});
	
	// 关闭弹框    
	$("body").on("click",".all-no,.fixBnt_cancel",function(){
		$(".all-fix").css({display:"none"});
		$(".goClaim").css({display:"none"});
		$(".exampleImg").css({display:"none"});
		$(".exampleImg img").css({display:"none"});
		$(".uploadImg").css({display:"none"});
		$(".uploadImg img").css({display:"none"});
	});	
	$(document).on("click",".fixBnt_submit",function(){
		$(".jiehuo").attr('value',1);
		$(".all-fix").css({display:"none"});
		$(".goClaim").css({display:"none"});
		$(".myform").submit();
	});	
   
    // 点击范例显示图片
    $(".exampleBtn").on("click",function(){
    	var index = $(this).closest("li").index()-2;
    	$(".all-fix").css({display:"block"});
       	$(".exampleImg").css({display:"block"});
       	$(".exampleImg img").eq(index).css({display:"block"});
    });
    
    // 点击上传后的图片变大图
	$(".uploaded").on("click",function(){
		var srcc = $(this).attr("src");
    	$(".all-fix").css({display:"block"});
       	$(".uploadImg").css({display:"block"});
       	$(".uploadImg img").attr("src",srcc);
       	var heightImg = (42.5-$(".uploadImg img").height()/10)/2+'rem';
       	$(".uploadImg img").css({"display":"block","marginTop":heightImg});
	});
	
   
    // 上传图片
    $(".file").bind("change",function(){ 
		var token = $(this).siblings(".attachment_url").val();
		var that = this;
	    var fd = new FormData();
		//在此限制图片的大小为10M   计算机存储数据最为常用的单位是字节(B)
        var imgSize = $(this)[0].files[0].size;
        if(imgSize>10*1024*1024){
	        alert('上传的图片的大于10M,请重新选择');
	        $(this).val('')
	        return false;
        }
        fd.append("file",$(this)[0].files[0]);
		fd.append("token",token);
	    var xhr = new XMLHttpRequest();
	    // 显示进度条
	    if ( xhr.upload ) {
        	xhr.upload.onprogress = function(e) {
	            var done = e.loaded || e.loaded, total = e.total || e.total;
	            $(that).siblings(".upload_content_bottom").show();
	        	$(that).closest("label").find(".fixHeight").css({"height":Math.floor(done/total*1000)/10+'%'});
	        	$(that).closest("label").find(".percent_uped").text(Math.floor(done/total*1000)/10+'%');         
        	}
    	}
	    // 图片上传成功后的回调
	    xhr.onreadystatechange = function(data){
	    	if (xhr.readyState == 4) {
				if (xhr.status == 200 || xhr.status == 304) {
			 		var key = JSON.parse(xhr.responseText);
			 		$(that).siblings(".potopic").hide();
			 		$(that).siblings(".uploaded").show().attr("src",'http://img01.qibaozz.com/'+key.key);
			 		$(that).siblings(".policy_photo").val(key.key);
			 		$(that).closest("label").find(".fixHeight").css({"height":0});
		        	$(that).closest("label").find(".percent_uped").text('');
		        	$(that).siblings(".img_delete").show();
		        	$(that).siblings(".upload_content_bottom").hide();
		        	var upload ="";
			        if($(that).closest(".PhotoID").length>0){
			        	var index = $(that).closest("label").index();
			        	if(index==0) {
			        		$(that).siblings(".poto").css({display:"none"});
			        		upload = $(that).closest("label").clone(true);
			        		upload.find(".potopic").show();
			        		upload.find(".uploaded").hide();
			        		upload.find(".attachment_url").val(getToken());
			        		upload.find(".img_delete").hide();
			        		upload.find(".policy_photo").val("");
			        		$(that).siblings(".poto").remove();
			        	} 
			        	if(index==1) {
			        		$(that).siblings(".poto").remove();
			        	} 
			        } 
			        else if($(that).closest(".PhotoBank").length>0){
			        	$(that).siblings(".poto").remove();
			        }
			        else {
			        	if($(that).siblings(".poto").length>0) {
				        	$(that).siblings(".poto").remove();
				        }
				        upload = $(that).closest("label").clone(true);
				        upload.find(".potopic").show();
				        upload.find(".uploaded").hide();
			        	upload.find(".attachment_url").val(getToken());
			        	upload.find(".img_delete").hide();
			        	upload.find(".policy_photo").val("");
			        }
			        $(that).closest(".Photographs").append(upload);
			        $(that).attr("disabled","disabled");
				}
			}
	    }
	    xhr.open('post', 'http://up-z2.qiniu.com',true);
	    xhr.send(fd);
    }); 
    
    // 删除图片
    $(".img_delete").click(function(){
    	var photo_url = $(this).closest("label").siblings("label").find(".policy_photo").val();
    	var upload = $(this).closest("label").clone(true);
    	if($(this).closest(".PhotoID").length>0) {
    		if(photo_url != "") {
				upload.append('<span class="poto">请上传照片</span>');
				upload.find(".potopic").show();
		        upload.find(".uploaded").hide();
		    	upload.find(".attachment_url").val(getToken());
		    	upload.find(".img_delete").hide();
		    	upload.find(".policy_photo").val("");
		    	upload.find(".file").attr("disabled",false);
		    	$(this).closest(".Photographs").append(upload);
    		}
    	} 
    	else if($(this).closest(".PhotoBank").length>0) {
			upload.append('<span class="poto">请上传照片</span>');
			upload.find(".potopic").show();
	        upload.find(".uploaded").hide();
	    	upload.find(".attachment_url").val(getToken());
	    	upload.find(".img_delete").hide();
	    	upload.find(".policy_photo").val("");
	    	upload.find(".file").attr("disabled",false);
	    	$(this).closest(".Photographs").append(upload);
    		
    	}
    	else {
    		var leng = $(this).closest(".Photographs").find("label").length;
    		var index = $(this).closest("li").index();
			if(leng=2 && photo_url == "" && index<4) {
				$(this).closest("label").siblings("label").append('<span class="poto">请上传照片</span>');
			}
    	}
    	$(this).closest("label").remove();
    });
    
   
})