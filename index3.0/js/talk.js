$(function(){
	$(".talk_left img").on("click",function(){
		var contTxt = $(".talkCont");
		var liHtml = '<li class="liRight clear">\
						<div class="leftImg"></div>\
						<div class="rightTxt">\
							<div class="sanjiao"></div>\
							<div class="conts">啊啊啊啊啊阿啊啊啊啊啊啊啊啊啊啊啊啊</div>\
						</div>\
					</li>';
		contTxt.append(liHtml);
        var scrollHeight = contTxt[0].scrollHeight;
        contTxt.scrollTop(scrollHeight);
	})
		
})