$(function(){
	get();
});
function get(){
	var hostArr = document.domain.split('.');
	var p2 = hostArr.pop();
	var p1 = hostArr.pop();
	document.domain = p1 + '.' + p2;
	var side='<div class="fix">\
					<ul class="fix_ul">\
						<li class="topBtn otherfix-li"><a href="javascript:;"><span >返回顶部</span><div class="right_img"></div></a></li>\
					</ul>\
				</div>';
	$("body").prepend(side);85
//<li class="wxBtn"><span class="wxImg"></span><a href="javascript:;"><div class="right_img"></div></a></li>\
//	<li class="robotBtn robotBtn1"><div class="aimi-p"><div class="right_img1">AIMI</div><div class="right_img2"></div><div class="right_img1">AIMI</div></div></li>
//	<li id="tqidian" class="telBtn otherfix-li"><a><span>戳我聊天</span><div class="right_img"></div></a></li>
	$(".header_right_top li").hover(function(){
		$(this).find(".img").css({display:"block"});
	},function(){
		$(this).find(".img").css({display:"none"});
	});
	
	
	
	
	$(".under_line").hover(function(){
		var heights;
		if($(".nav-picss").length>0){
			heights=$(".nav-picss").height();
		}else{
			heights="520px";
		}
		$(".product").stop().animate({height:heights},200)
	},function(){
		$(".product").stop().animate({height:"0"},200);
	});	
	$(".product_img").click(function(){
		$(".product").stop().animate({height:"0"},200);
	});
	
	$(".product_cont ul li").hover(function(){
		var index=$(this).index();
		$(this).addClass("hover").siblings("li").removeClass("hover");
		$(".all_product_cont .menu").eq(index).addClass("block")
									.siblings("div").removeClass("block");
	});
	
	//aimi侧边轮播
	lunbo();
	var timer
	$(document).on("mouseover",".robotBtn",function(){
		clearInterval(timer);
	});
	$(document).on("mouseout",".robotBtn",function(){
		lunbo();
	});
	
	function lunbo(){
		timer=setInterval(function(){
			$(".aimi-p").stop().animate({top:"-=50px"},500,function(){
				var top=$(".aimi-p").css("top");
				top=top.substring(0,top.length-2)-0;
				if(top<=-100){
					$(".aimi-p").animate({"top":"0px"},0);
				};
			})
		},2000);
	};
	
//	fn();
//	function fn(){
//		$(".aimi-p").stop().animate({top:"-=50px"},1000,function(){
//			var top=$(".aimi-p").css("top");
//			
////			console.log(top.substring(0,top.length-2)-0);
//			top=top.substring(0,top.length-2)-0;
//			if(top<=-100){
////				$(".aimi-p").css("top","0px");
//				$(".aimi-p").animate({"top":"0px"},0);
//				console.log($(".aimi-p").css("top"));
//			};
//			setTimeout(fn,1000);
//		})
//	}	
//	function move(i){
//		$(".aimi-p").stop().animate({top: "-50px"},1000);
//	};

	//侧边划过
	$(document).on("mouseover",".fix_ul .otherfix-li",function(){
		$(this).stop().animate({width: "124px"});
	});
	$(document).on("mouseout",".fix_ul .otherfix-li",function(){
		$(this).stop().animate({width: "50px"});
	});
	$(document).on("mouseover",".fix_ul .wxBtn",function(){
		$(this).find(".wxImg").stop().animate({width: "122px",left: "-176px"});
	});
	$(document).on("mouseout",".fix_ul .wxBtn",function(){
		$(this).find(".wxImg").stop().animate({width: "0",left: "46"});
	});
	
	// 返回顶部
	$(document).on("click",".topBtn",function(){
		$('body,html').animate({ scrollTop: 0 },100);
	});
	
	var subDomain = 'www';
	var query_string = '/aimi/index';
	if(window.location.href.indexOf("qibaodashi") > 0 || window.location.href.indexOf("qbds") > 0){
		subDomain = 'user';
		query_string = '/index/aimi/index';
	}
	
	var aimi_url = 'http://'+subDomain+'.' + document.domain + query_string;
	if(window.location.href.indexOf("dev") > 0){
		if(window.location.href.indexOf("qibaodashi") > 0 || window.location.href.indexOf("qbds") > 0){
			aimi_url = 'http://dev.'+subDomain+'.' + document.domain + query_string;
		}else{
			aimi_url = 'http://'+subDomain+'.dev.' + document.domain + query_string;
		}
	}
	// 显示机器人对话框
	$(document).on("click",".robotBtn1",function(){
		layer.open({
			title: false,
			type: 2,
		    closeBtn: 0, //不显示关闭按钮
		    anim: -1,
		    area:["496px",'680px'],
		    shade: false,
		    offset: 'rb',
		   	move: '.mainTitle',
		    shadeClose: true, //开启遮罩关闭
//		    content: ['http://127.0.0.1:8020/static/index3.0/html/Elastic%20layer/robot.html','no']
		    content: [aimi_url,'no']
		});
		$(".layui-layer").css({left:"",right:"-496px",boxShadow:"none",border: "none",opacity:0});
		$(".layui-layer").animate({right:50,opacity:1},1000);
		$(".robotBtn").addClass("robotBtn2").removeClass("robotBtn1");
		$(window).resize(function () {
			var right=$(".layui-layer").css("right");
			var rightzhi=right.substring(0,right.length-2)-0 ;
			if(rightzhi>0){
				$(".layui-layer").css({left:"",right:"50px",opacity:1});
			}else{
				$(".layui-layer").css({left:"",right:"-496px",opacity:0});
			}
			
		});
	});

	$(document).on("click",".robotBtn2",function(){
		$(".layui-layer").animate({right:-496,opacity:0},1000);
		$(".robotBtn").addClass("robotBtn3").removeClass("robotBtn2");
	});
	$(document).on("click",".robotBtn3",function(){
		$(".layui-layer").animate({right:50,opacity:1},1000);
		$(".robotBtn").addClass("robotBtn2").removeClass("robotBtn3");
	});
	
	// 平台合作
	$(".cooperationContain a").hover(function(){
		$(this).addClass("checked").siblings("a").removeClass("checked");
	})
	
};


