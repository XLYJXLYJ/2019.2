var batch=true;
$(document).on('click','.batch',function(){
	if(batch){
		$("table th").eq(0).attr('colspan','3');
		$('table tr td:nth-child(1)').show();
		batch=false;
	}else{
		$("table th").eq(0).attr('colspan','2');
		$('table tr td:nth-child(1)').hide();
		batch=true;
		$('.select_div>img').hide();
		
	}
})
$(document).on('click','.select_div',function(){
	var img=$(this).children('img');
	if(img.is(':hidden')){
		img.show();
	}else{
		img.hide();
	}
})
$('td').hover(function(){
	$(this).parent('tr').addClass('active').siblings('tr').removeClass('active');
},function(){
	$(this).parent("tr").removeClass('active');
})
$('.aside .li_div .child_div').hover(function(){
	$(this).addClass('active1').siblings().removeClass('active1');
},function(){
	$(this).removeClass('active1')
})
$(document).on('click','.add_synonym',function(){
	if($('.synonym_list>div input').length==0){
		$(this).parent().before('<div><span class="shade"><img src="../img/ai/delete.png"></span><span><input placeholder="请输入 " type="text"/></span></div>')
	}
	
})
$(document).on('input propertychange','.synonym_list>div input', function() {  
   var $this = $(this);
   var text_length = $this.val().length;//获取当前文本框的长度
   var current_width = parseInt(text_length) *16;//该16是改变前的宽度除以当前字符串的长度,算出每个字符的长度
   $this.css("width",current_width+"px");
});
$(document).on('mouseover','.synonym_list>div',function(){
	if($(this).children().children('input').length==0){
		$(this).children('.shade').show();
	}
	
})
$(document).on('mouseout','.synonym_list>div',function(){
	$(this).children('.shade').hide();
})
var this_;
$(document).on('click','.shade',function(){
	this_=$(this);
	$('.alert').addClass('dialog_open');
	
})
$(document).on('click','.alert .cancel',function(){
	$('.alert').removeClass('dialog_open');
})
$(document).on('click','.alert .sure',function(){
	$('.alert').removeClass('dialog_open');
	this_.parent().remove();
})
$(document).on('click','.alert',function(e){
	var messagebox=$('.messagebox-container')[0];
	if(e.target!=messagebox&&!$.contains(messagebox,e.target)){
		$('.remove').removeClass('dialog_open');
	}
})
$(document).on('click','.remove',function(e){
	var remove=$('.messagebox-remove')[0];
	if(e.target!=remove&&!$.contains(remove,e.target)){
		$('.remove').removeClass('dialog_open');
	}
})
$(document).on('click','.border_rd',function(){
	$(this).children('div').show();
	$(this).parent().siblings('.check').children('.border_rd').children('div').hide()
})

var $this;
$(document).on('click','.delete',function(){
	$this=$(this).parent().parent();
	$('.remove').addClass('dialog_open');
})
$(document).on('click','.remove .cancel',function(){
	$('.remove').removeClass('dialog_open');
})
$(document).on('click','.remove .sure',function(){
	$('.remove').removeClass('dialog_open');
	var id = $this.find('.level').data('id');
	console.log(id);
	$.ajax({
		type:"delete",
		url:"/xl/removenode ",
		async:true,
		data:{'id':id},
		success:function(data){
			if(data.msg="请求成功"){
				window.reload();
			}
		}
	});
})
$(document).on('click','.head>div',function(){
	var index=$(this).index();
	if(index>1){
		$(this).addClass('active').siblings().removeClass('active');
		$('.aside>div').eq(index-2).show().siblings().hide();
	}
})
$(document).on('click','.modify',function(){
		$.ajax({
			type:"post",
			url:"http://test.ai.qb-tech.net/xl/updatenode",
			async:true,
			data:{'id':id,'name':name,'tyc':tyc},
			success:function(data){
				if(data.mgs=="请求成功") window.location.reload();
			}
		});
		return false ;
	
	
})
$(document).on('click','.save',function(){
	$.each($('.modify'),function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('.save').hide();
			$.each($(this).parent().siblings().children(), function() {
				if($(this).attr('edit-enable')=='true'){
					$(this).attr('disabled','disabled');
				}
			});	
			var id=$(this).parents('tr').children().children('.id').val();
			var name=$(this).parents('tr').children().children('.name').val();
			var tyc=$(this).parents('tr').children().children('.tyc').val();
			tyc=tyc.split(",");
			$.ajax({
				type:"post",
				url:"http://test.ai.qb-tech.net/xl/updatenode",
				async:true,
				data:{'id':id,'name':name,'tyc':tyc},
				success:function(data){
					if(data.mgs=="请求成功") window.location.reload();
				}
			});

		}
	})
})
$(document).on('click','.plus',function(){
	var this_=$(this);
	var pid=this_.data('id');
	if($.trim(this_.text())=="-"){
		$.each(this_.parent().siblings('tr').children('.plus'), function() {
			if($(this).data('pid')!=undefined&&$(this).data('pid')==pid){
				$(this).parent('tr').remove();
			}
		});
		var level= this_.siblings('td').children('.level').val();
		var  html=""
		for (var i = 0; i < level-1; i++) {
			html +="&nbsp;";
		}
		this_.html(html+"+");
		return false;
	}
	var result=1;
	if(this_.siblings('td').eq(0).is(':hidden')){//隐藏勾选框
		result=1;
	}else if(this_.siblings('td').eq(0).children('img').is('hidden')){//没有选中
		result=2;
	}else{//选中
		result=3;
	}
	///xl/getsnodes
	$.ajax({
		type:"get",
		url:"b.json",
		async:true,
		data:{'pid':pid},
		success:function(data){
			
			var msg=data.data.nodes;
			var html="";
			if(msg.length!=0){
				this_.html(this_.text().substring(0,this_.text().length-1)+"-");
				for (var i = 0; i < msg.length; i++) {
					html +="<tr>";
					if(result==1){
						html +="<td><div class='select_div' ><img src='img/checked.png'></div></td>";
					}else if(result==2){
						html +="<td style='display:table-cell'><div class='select_div' ><img src='img/checked.png'></div></td>";
					}else if(result==3){
						html +="<td style='display:table-cell'><div class='select_div' ><img src='img/checked.png' style='display:inline'></div></td>";
					}
					
					var level=msg[i].level;
					var  text=""
					for (var j = 0; j < level-1; j++) {
						text +="&nbsp;&nbsp;";
					}
					text=text+"+";
					html +="<td class='plus' data-id='"+msg[i].id+"'data-pid='"+pid+"'>"+text+"</td>";
					html +="<td >"+msg[i].name+"</td>";
					html +="<td>"+msg[i].level+"</td>";
					var tyc=msg[i].tyc;
					if(tyc.length==0){
						html +="<td></td>";
					}else{
						var value="";
						for (var j = 0; j< tyc.length; j++) {
							if(j==tyc.length-1){
								value +=tyc[j];
							}else{
								value +=tyc[j]+"，";	
							}
						}
						html +="<td>"+value+"</td>";
					}
					if(msg[i].briefintroduction.length>50){
								html +='<td><p title="'+msg[i].briefintroduction+'">'+msg[i].briefintroduction.substring(0,50)+'...</p></td>';
					}else{
						html +='<td><p>'+msg[i].briefintroduction+'</p></td>';
					}
					if(msg[i].coverscope.length>50){
						html +='<td><p title="'+msg[i].coverscope+'">'+msg[i].coverscope.substring(0,50)+'...</p></td>';
						
					}else{
						html +='<td><p>'+msg[i].coverscope+'</p></td>';
					}
					if(msg[i].insuranceobject.length>50){
						html +='<td><p title="'+msg[i].insuranceobject+'">'+msg[i].insuranceobject.substring(0,50)+'...</p></td>';
						
					}else{
						html +='<td><p>'+msg[i].insuranceobject+'</p></td>';
					}
					html +="<td class='handle'><a href='add.html?pid="+msg[i].id+"' ><span class='add'></span></a><span class='modify'></span><span class='delete'></span></td>";
					html +="</tr>";
				}
				this_.parent('tr').after(html);
			}
		}
	});
})
var html_;
var index=10;
$(document).on('click','.search',function(){
	var input=$('.input input').val();
	$.ajax({
		type:"post",
		url:"http://test.ai.qb-tech.net/xl/getpnodes",
		data:{'cvalue':input},
		async:true,
		success:function(data){
			var msg=data.data.pnodes;
			var html=""
			if(msg.length>0){
				for (var i = 0; i < msg.length; i++) {
					html +="<tr>";
					html +="<td><div class='select_div'><img src='img/checked.png'></div></td>";
					html +="<td class='plus'>+</td>";
					html +="<td><input type='text' class='id' disabled='disabled'  value='"+msg[i].id+"'/></td>";
					html +="<td><input type='text' class='name'  disabled='disabled' edit-enable='true' value='"+msg[i].name+"'/></td>";
					html +="<td><input type='text' class='level'	disabled='disabled'  value='"+msg[i].level+"'/></td>";
					var tyc=msg[i].tyc;
					tyc=tyc.replace("[","").replace("]","");
					tyc=tyc.split(',');
					if(tyc.length==0){
						html +="<td><input type='text' class='tyc' disabled='disabled' edit-enable='true' value=''/></td>";
					}else if(tyc.length==1){
						html +='<td><input type="text" class="tyc" disabled="disabled" edit-enable="true" value='+tyc[0]+'/></td>';
					}else{
						var value="";
						for (var j = 0; j< tyc.length; j++) {
							tyc[j]=tyc[j].replace(/\"/g,"");
							if(j==tyc.length-1){
								value +=tyc[j];
							}else{
								value +=tyc[j]+"，";	
							}
						}
						value=value.replace(/\'/g,"");
						html +='<td><input type="text" class="tyc" disabled="disabled" edit-enable="true" value="'+value+'"/></td>';
					}
					html +="<td class='handle'><a href='add.html?snodes=snodes&pid="+msg[i].id+"' ><span class='add'></span></a><span class='modify'></span><span class='delete'></span></td>";
					html +="</tr>";
					if(msg[i].children!=undefined&&msg[i].children.length>0){
						var str= recursion(msg[i].children);
						html +=str;
						in_html="";
					}
				}
				html_=html;
				html_=html_.split("</tr>");
				var length=(html_.length>index)? index : html_.length;
				var str="";
				for(m=0;m<length;m++){
					str +=html_[m]+"</tr>";
				}
				$('tbody').empty();
				$('tbody').append(str);
			}
		}
	});
})

//递归查询
var in_html="";
function recursion (msg){//子级
	
	for(var i=0;i<msg.length;i++){
		in_html +="<tr>";
		in_html +="<td><div class='select_div'><img src='img/checked.png'></div></td>";
		var level=msg[i].level;
		var  text=""
		for (var m = 0; m < level; m++) {
			text +="&nbsp;&nbsp;";
		}
		text=text+"+";
		in_html +="<td class='plus' data-id='"+msg[i].parent_id+"'>"+text+"</td>";
		in_html +="<td><input type='text' class='id' disabled='disabled'  value='"+msg[i].id+"'/></td>";
		in_html +="<td><input type='text' class='name'  disabled='disabled' edit-enable='true' value='"+msg[i].name+"'/></td>";
		in_html +="<td><input type='text' class='level'	disabled='disabled'  value='"+msg[i].level+"'/></td>";
		var tyc=msg[i].tyc;
		tyc=tyc.replace("[","").replace("]","");
		tyc=tyc.split(',');
		if(tyc.length==0){
			in_html +="<td><input type='text' class='tyc' disabled='disabled' edit-enable='true' value=''/></td>";
		}else if(tyc.length==1){
			in_html +='<td><input type="text" class="tyc" disabled="disabled" edit-enable="true" value='+tyc[0]+'/></td>';
		}else{
			var value="";
			for (var j = 0; j< tyc.length; j++) {
				tyc[j]=tyc[j].replace(/\"/g,"");
				if(j==tyc.length-1){
					value +=tyc[j];
				}else{
					value +=tyc[j]+"，";	
				}
			}
			value=value.replace(/\'/g,"");
			in_html +='<td><input type="text" class="tyc" disabled="disabled" edit-enable="true" value="'+value+'"/></td>';
		}
		in_html +="<td class='handle'><a href='add.html?snodes=snodes&pid="+msg[i].id+"' ><span class='add'></span></a><span class='modify'></span><span class='delete'></span></td>";
		in_html +="</tr>";
		if(msg[i].children!=undefined&&msg[i].children.length>0){
			recursion(msg[i].children);
		}
	}
	return in_html;
}
