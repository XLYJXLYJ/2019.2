$(function(){
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
	 
    // 上传图片
    $(".file").bind("change",function(){ 
		var token = $(this).siblings(".attachment_url").val()
		var that = this
	    var fd = new FormData();
		fd.append("file",$(this)[0].files[0]);
		fd.append("token",token);
	    var xhr = new XMLHttpRequest();
	    // 显示进度条
	    if ( xhr.upload ) {
        	xhr.upload.onprogress = function(e) {
	            var done = e.loaded || e.loaded, total = e.total || e.total;
	        	$(that).closest("label").find(".fixHeight").css({"height":Math.floor(done/total*1000)/10+'%'});
	        	$(that).closest("label").find(".percent_uped").text(Math.floor(done/total*1000)/10+'%');         
        	};
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
	        	$(that).siblings(".attachment_url").val(getToken());
	        	var img = key.key;
	        	$.post('/indiviuser/setHeadImg',{img:img},function(){

	        	},'json');
			}
		}
	    };
	    xhr.open('post', 'http://up-z2.qiniu.com',true);
	    xhr.send(fd);
    }); 
    
})