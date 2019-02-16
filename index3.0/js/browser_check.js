//判断是否是IE浏览器，包括Edge浏览器 

//设置cookie
function setCookie(c_name, value, expiredays, domain)
{
	var exdate = new Date();
    //exdate.setTime(exdate.getTime() + expiredays*24*60*60*1000);
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";domain=" + domain+";path=/";
}

//获取cookie
function getCookie(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1)
		{
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

//用户选择继续使用
function cgo() {
	var hostname = location.hostname;
	var hostArr = hostname.split('.');
	var hostname = location.hostname;
	var hostArr = hostname.split('.');
	var domain = '.qibaozz.com';
	//for(i=1;i<hostArr.length;i++){
		//domain += "." + hostArr[i];
	//}
	setCookie('continue_use', 'yes', 100, domain);
	window.location.href = getQueryString('cur_url') ? getQueryString('cur_url') : 'http://' + hostname;
}

//用户选择继续使用
function cgods() {
	var hostname = location.hostname;
	var hostArr = hostname.split('.');
	var hostname = location.hostname;
	var hostArr = hostname.split('.');
	var domain = '.qibaodashi.com';
	//for(i=1;i<hostArr.length;i++){
		//domain += "." + hostArr[i];
	//}
	setCookie('continue_use', 'yes', 100, domain);
	window.location.href = getQueryString('cur_url') ? getQueryString('cur_url') : 'http://' + hostname;
}

//获取url参数
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}

//获取IE版本
function IEVersion(redirect_hostname)
{
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
	var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器 
	var isIE = userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
	if (isIE)
	{
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if (fIEVersion <= 8) {
			window.location.href = "http://" + redirect_hostname + "/index/checkbrower?cur_url=" + document.location.href;
		}
	}
}
