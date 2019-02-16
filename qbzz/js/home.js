$(function(){
			
	// 上传名片认证的初始化
	Qibao.userUpload('container_user_avatar', 'pickfiles_1', 'uploaded_key', 'upload_show_process_area_1', 'upload_display_1');
	$('.Head_portrait').click(function(){
		 $('.check_id_fix').removeClass('hide');
	})
	$(".no").click(function(){ 
		$('.check_id_fix').addClass('hide');
	});
	
	$(".sure_up_ok").on("click",function(){
		var srcs=$('#upload_display_1').attr("src");
		var ml=$('input[name="head_img"]').val();
		var ids=$('input[name="user_id"]').val();
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: '/auth/ajax/modify/user',
			data: {'head_img':ml,'user_id':ids},
			success: function(res) {
                if (res && res.code === 200) {
                    $(".Head_portrait").attr({src:srcs});
                    $('.check_id_fix').addClass('hide');
                }
            },
			error:function(){
			  	
			}
		});
	});	
	
	var n=0;
	$(document).on("click",".new-user-fix .xia",function(){
		if(n<3){
			n++;
			$(".new-user-fix .shang").css({display:"inline-block"});
			$(".check-img img").eq(n).show().siblings().hide();
		}else{
			$(".new-user-fix").hide();
			if($(".new-user-fix").hasClass("houtai-post-url")){		
			}else{
				$.ajax({
					type: 'GET',
					dataType: 'json',
					url: '/insured/first_login',
					success: function(res) {
		            },
					error:function(){
					}
				});
			};
		};	
		if(n==3){
			$(".xia").html("立即体验");
		};
	});
	$(document).on("click",".new-user-fix .shang",function(){
		if(n>0){
			n--;
			$(".check-img img").eq(n).show().siblings().hide();
		};
		if(n==0){
			$(".new-user-fix .shang").hide();
		};
		if(n!=3){
			$(".xia").html("下一步");
		};
	});
	
	//点击新手指引
	$(document).on("click",".look-new-people",function(){
		n=0;
		$(".new-user-fix").show().addClass("houtai-post-url");
		$(".new-user-fix .shang").css({display:"none"});
		$(".new-user-fix .xia").html("下一步");
		$(".check-img img").eq(0).show().siblings().hide();
	});
	$(document).on("click",".new-delete",function(){
		if($(".new-user-fix").hasClass("houtai-post-url")){		
		}else{
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: '/insured/first_login',
				success: function(res) {
	            },
				error:function(){
				}
			});
		};
		$(".new-user-fix").css({display:"none"});
		$(".new-user-fix .shang").css({display:"none"});
		$(".new-user-fix .xia").html("下一步");
		$(".new-delete").show();
		$(".check-img img").eq(0).show().siblings().hide();
	})
	//查看、收起指引
//	$(document).on("click",".more",function(){
//		$(this).removeClass("more").addClass("back");
//		$(this).find("span").html("更多指引");
//		
//		$(".guide-cont").animate({height:"0px",padding:"0 30px"},function(){
//			$(".guide-cont").animate({padding:"0px",border:"0"})
//		});
//	});
//	$(document).on("click",".back",function(){
//		$(this).removeClass("back").addClass("more");
//		$(this).find("span").html("收起指引");
//		$(".guide-cont").css({padding: "17px 30px",border:"1px solid #e9e9f4"})
//		$(".guide-cont").animate({height:"216px"});
//	});
	
	// 点击已缴纳保证金的图标
//	$('.paied').click(function() {
//		window.location.href = 'home-IC/bail.html'
//	})
//	$('.unpaied').click(function() {
//		window.location.href = 'home-IC/bail.html'
//	})

	//  显示或隐藏货运专用款
	$(".clickPic").on("click",function(){
		$(this).closest(".nav_cont").addClass("hide").siblings(".nav_cont").removeClass("hide")
	});
	
})
