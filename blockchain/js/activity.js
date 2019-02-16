
if(document.body.clientWidth<768){
	$(".left").remove();
	$(".logo+hr").show();
	$(".input img").prop("src","../img/bf_app.png")
	$(".amount").prop("src","../img/user_app.png")
	$(".lock").prop("src","../img/locking_app.png")
	$(".sip").prop("src","../img/logo-sip_app.png")
}

var zh ="年关将要至，新春大空投！全球首个透过人工智能及区块链技术的保险社区（SIP智保链），限时空投百万SIPC，入群即得88个，推荐好友入群再得30个！猛戳这里领";
var en="Chinese New Year Airdrop!  World's 1st AI enhanced Blockchain based insurance community, SIP, is offering a million SIPC Airdrop.  You will receive 88SPIC from Airdrop by joining and every successful invitation and joining of your friend will bring you 30SPIC extra!  Click here and get yours! "    	
var clipboard = new Clipboard('.copy', {
    // 点击copy按
    	text: function() {
    		alert("已復制");
    		if(($("meta:eq(0)").attr("content")=="zh")){
            	return zh+$(".copy").siblings("input").val();
            }else{
            	return en+$(".copy").siblings("input").val();
            }
        }
    });

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });
    
    var clipboard = new Clipboard('.copy1', {
    // 点击copy按钮，直接通过text直接返回复印的内容
        text: function() {
        	alert("已復制");
            return $(".copy1").siblings("input").val();
        }
    });

    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });
        


function fun(name){
    obj = document.getElementsByName(name);
    check_val = [];
    for(var i = 0; i < obj.length; i++){
        if(obj[i].checked){
           check_val.push(obj[i].value);
        }
    }
    return check_val;
}
$(".div_checkbox").click(function(){
	if($(this).children(".checked").is(":hidden")){
		$(this).children(".checked").show()
		$(this).css("border","1px solid white"); 
		$(this).next().css("color","white")
	}else{
		$(this).children(".checked").hide();
		$(this).css("border","1px solid #165eee");
		$(this).next().css("color","#155ded")
	}
})
$(".div_checkbox").siblings("div").hover(function(){
	$(this).siblings(".div_checkbox").children(".prompt").show();
	$(this).siblings(".div_checkbox").children(".prompt1").show();
	$(this).siblings(".div_checkbox").children(".prompt2").show();
},function(){
	$(this).siblings(".div_checkbox").children(".prompt").hide()
	$(this).siblings(".div_checkbox").children(".prompt1").hide()
	$(this).siblings(".div_checkbox").children(".prompt2").hide()
})


$(".myform").Validform({
        tiptype: 4,
        ignoreHidden: true,
        postonce: true,
        ajaxPost: true,
        btnSubmit: ".sure",
        datatype: {},
        beforeCheck: function (curform) {
        	
			if(fun("role[]").length==0){
				$(".role").prev(".choose").css("color","#ffe9b6");
				return false;
			}else{
				$(".role").prev(".choose").css("color","#79bafc");
			}
			
//			
			if(fun("invest[]").length==0&&$(".others").val().length==0){
				$(".invest").prev(".choose").css("color","#ffe9b6");
				return false;
			}else if($(".others").val().length>100){
				$(".range").show();
				return false;
			}else{
				$(".range").hide();
				$(".invest").prev(".choose").css("color","#79bafc");
			}
			
			
			
			if($(".interests").val().length==0){
				$(".void").text("*請如實填寫問題,全部填寫後即可確認領取");
				$(".void").show();
				return false;
			}else if($(".interests").val().length>100){
				$(".void").text("范围在100个字符以内");
				$(".void").show();
			}else{
				$(".void").hide();
			}
        },
        callback: function (data) {
            if (data.code == 200) {
              
            } else {
                
            }
			
        }
    })


