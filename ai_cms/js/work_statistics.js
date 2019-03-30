var url;
function getUrl(data){
	url = data;
}
//查询所有数据
$(function() {
	paging("", "", "", "", 1);
	$('.start').hide();
})
$('.start').click(function() {
	var order_by_name = $('.order_by_name option:selected').val();
	var sort_by_name = $('.sort_by_name option:selected').val();
	var start_date = $('#datetimeStart').val();
	var end_date = $('#datetimeEnd').val();
	var number = $('.number').text();
	paging(order_by_name, start_date, end_date, sort_by_name, 1);
	$('.page').show();
	$.each($('.page'), function(i) {
		if(1 + i > number) {
			$(this).hide();
			$('.end').hide();
		} else {
			$(this).text(1 + i);
		}
	});
	$('.start').hide();
	parseInt(number) > 5 ? $('.end').show() : $('.end').hide();
	$('.page').eq(0).addClass('active').siblings('.page').removeClass('active');
})
$('.end').click(function() {
	var p = $('.number').text();
	var order_by_name = $('.order_by_name option:selected').val();
	var sort_by_name = $('.sort_by_name option:selected').val();
	var start_date = $('#datetimeStart').val();
	var end_date = $('#datetimeEnd').val();
	paging(order_by_name, start_date, end_date, sort_by_name, p);
	$('.page').show();
	var index = Math.floor(p / 5);
	index = index * 5;
	var page = $('.number').text();
	$.each($('.page'), function(i) {
		if(index + 1 + i > page) {
			$(this).hide();
			$('.end').hide();
		}
		$(this).text(index + 1 + i);
		if(index + 1 + i == p) {
			$(this).addClass('active');
			$('.page').not(this).removeClass('active');
			$('.end').hide();
		}
	});
	$('.end').hide();
	parseInt($('.page:visible').eq(-1).text()) > 5 ? $('.start').hide() : $('.start').show()
})
//上一页
$('.pre').click(function() {
	var value = $('.page').eq(0).text();
	value = parseInt(value);
	if(value == 1) {
		return false;
	} else {
		$('.page').show();
		$.each($('.page'), function(i) {
			$(this).text(value - 5 + i);
		});
	}
	var p = $('.page.active').text();
	var order_by_name = $('.order_by_name option:selected').val();
	var sort_by_name = $('.sort_by_name option:selected').val();
	var start_date = $('#datetimeStart').val();
	var end_date = $('#datetimeEnd').val();
	paging(order_by_name, start_date, end_date, sort_by_name, value - 1);
	parseInt($('.page').eq(0).text()) == 1 ? $('.start').hide() : $('.start').show()
	parseInt($('.page:visible').eq(-1).text()) >= number ? $('.end').hide() : $('.end').show()
})
//下一页
$('.next').click(function() {
	var value = $('.page:visible').eq(-1).text();
	value = parseInt(value);
	var number = $('.number').text();
	number = parseInt(number);

	var p = $('.page.active').text();
	var order_by_name = $('.order_by_name option:selected').val();
	var sort_by_name = $('.sort_by_name option:selected').val();
	var start_date = $('#datetimeStart').val();
	var end_date = $('#datetimeEnd').val();
	if(value == number) {
		return false;
	} else {
		paging(order_by_name, start_date, end_date, sort_by_name, value + 1);
		$(".page").show();
		$.each($('.page'), function(i) {
			if(value + 1 + i > number) {
				$(this).hide();
				$('.end').hide();
			} else {
				$(this).text(value + 1 + i);
			}

		});
		$('.page').eq(0).addClass('active').siblings('.page').removeClass('active');
	}
	parseInt($('.page').eq(0).text()) == 1 ? $('.start').hide() : $('.start').show()
	parseInt($('.page:visible').eq(-1).text()) >= number ? $('.end').hide() : $('.end').show()
})
//分页
$('.page').click(function() {
	var number = $('.number').text();
	var this_ = $(this);
	var p = $(this).text();
	var value = parseInt(this_.text());
	var order_by_name = $('.order_by_name option:selected').val();
	var sort_by_name = $('.sort_by_name option:selected').val();
	var start_date = $('#datetimeStart').val();
	var end_date = $('#datetimeEnd').val();
	paging(order_by_name, start_date, end_date, sort_by_name, p);
	var temp = false;;
	$.each($('.page'), function(i) {
		if(temp) {
			$(this).hide();
			$('.end').hide();
		}
		if(parseInt($(this).text()) == parseInt(number)) {
			temp = true;
		}
	});

	$(this_).addClass('active');
	$('.page').not(this_[0]).removeClass('active');
	parseInt($('.page').eq(0).text()) == 1 ? $('.start').hide() : $('.start').show()
	parseInt($('.page:visible').eq(-1).text()) >= number ? $('.end').hide() : $('.end').show()
})

//搜索
$('.search').click(function() {
	var order_by_name = $('.order_by_name option:selected').val();
	var sort_by_name = $('.sort_by_name option:selected').val();
	var start_date = $('#datetimeStart').val();
	var end_date = $('#datetimeEnd').val();
	paging(order_by_name, start_date, end_date, sort_by_name, 1);
	var page = $('.number').text();
	$('.number').text(page);
	$(".page").show();
	if(page <= 5) {
		$.each($('.page'), function(i) {
			if($(this).text() == page) {
				$(this).nextAll('.page').hide();
				return false;
			}
		})
	}
	$.each($('.page'), function(i) {
		$(this).text(1 + i);
		if(i == 0) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active')
		}
	});
	parseInt($('.page').eq(0).text()) == 1 ? $('.start').hide() : $('.start').show()
	parseInt($('.page:visible').eq(-1).text()) >= page ? $('.end').hide() : $('.end').show()
})

$('.ship').click(function() {
	if($(this).hasClass('active')) {
		var p = $(".footer input").val();
		$(".footer input").val('');
		var order_by_name = $('.order_by_name option:selected').val();
		var sort_by_name = $('.sort_by_name option:selected').val();
		var start_date = $('#datetimeStart').val();
		var end_date = $('#datetimeEnd').val();
		paging(order_by_name, start_date, end_date, sort_by_name, p);
		$('.page').show();
		var index = Math.floor(p / 5);
		index = index * 5;
		var page = $('.number').text();
		if(page > 5) {
			$('.end').show();
		} else {
			$('.end').hide();
		}
		$.each($('.page'), function(i) {
			if(index + 1 + i > page) {
				$(this).hide();
				$('.end').hide();
			}
			$(this).text(index + 1 + i);
			if(index + 1 + i == p) {
				$(this).addClass('active');
				$('.page').not(this).removeClass('active');
			}
		});
		$('.ship').removeClass('active');
		parseInt($('.page').eq(0).text()) == 1 ? $('.start').hide() : $('.start').show()
		parseInt($('.page:visible').eq(-1).text()) >= number ? $('.end').hide() : $('.end').show()
	}

})
var cookie = getCookie('user');
if(cookie == "not find") {
	//				window.location.href="login.html";
} else {
	cookie = cookie.split('&&');
}

function paging(order_by_name, start_date, end_date, sort_by_name, p) {
	///merchant/v1.0/record/dialogs
	$('tbody').empty();
	$.ajax({
		type: "get",
		url: url, ///merchant/v2.0/service/service_account
		async: false,
		data: {
			'order_by_name': order_by_name,
			'start_date': start_date,
			'end_date': end_date,
			'p': p,
			'sort_by_name': sort_by_name
		},
		success: function(data) {
			if(data.errmsg == 'OK') {
				$('.footer').show()
				var msg = data.data.log_dict_list;
				if(msg.length > 0) {
					var html = "";
					var str = "";
					var title = "";
					var str_id = "";
					var title_id = "";
					for(var i = 0; i < msg.length; i++) {
						html += '<tr>';
						html += '<td>' + ((p - 1) * 5 + i + 1) + '</td>';
						html += '<td>' + msg[i].service_name + '</td>'
						html += '<td>' + msg[i].service_work_time + '</td>';
						html += '<td>' + msg[i].customer_number + '</td>';
						html += '<td>' + msg[i].service_hours_online + '</td>';
						html += '<td>' + msg[i].service_answer_number + '</td>';
						html += '<td>' + msg[i].robot_answer_number + '</td>';
						html += '<td>' + msg[i].customer_feedback_yawp + '</td>';

						html += '</tr>';
					}
					$('tbody').empty();
					$('tbody').append(html);
					var page = data.data.total_page;
					$('.number').text(page);
					$('.page').show();
					if(page < 5) {
						$('.end').hide();
						$.each($('.page'), function() {
							if($(this).text() == page) {
								$(this).nextAll('.page').hide();
								return false;
							}
						})

					}
				} else {
					$('.footer').hide()
				}

				if($.trim(p).length == 0 || parseInt(p) <= 5) {
					$('.start').hide();
				} else {
					$('.start').show();
				}

			} else if(data.errmsg == '用户未登录') {
				window.location.href = "login.html";
			}

		}
	});
}
//获取用户机器人列表
//merchant/v2.0/robot/robot_number
$.ajax({
	type: "get",
	url: '/merchant/v2.0/robot/robot_number',
	data: {
		'product_id': cookie[2]
	},
	async: true,
	success: function(data) {
		if(data.status == '200') {
			data = data.data;
			var str = "";
			if(data.length > 0) {
				for(var i = 0; i < data.length; i++) {
					str += '<option value=' + data[i] + '>' + data[i] + '</option>';
				};
				$('.robot_code').append(str);
			}

		} else if(data.errmsg == '用户未登录') {
			window.location.href = "login.html";
		}
	}
});

$('.export').click(function() {
	$('.product_id').val(cookie[2]);
	$('.submit').click();
})
String.prototype.endWith = function(s) {
	if(s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if(this.substring(this.length - s.length) == s)
		return true;
	else
		return false;
	return true;
}
String.prototype.startWith = function(s) {
	if(s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if(this.substr(0, s.length) == s)
		return true;
	else
		return false;
	return true;
}