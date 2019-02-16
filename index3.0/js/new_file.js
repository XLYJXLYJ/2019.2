$.fn.pasteEvents = function (delay) {
    if (delay == undefined) delay = 20;
    return $(this).each(function () {
        var $el = $(this);
        $el.on("paste", function () {
            $el.trigger("prepaste");
            setTimeout(function () { $el.trigger("postpaste"); }, delay);
        });
    });
};
//对象数组排序
var sortby = function (name) {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? 1 : -1;
            }
            return typeof a < typeof b ? 1 : -1;
        }
        else {
            throw ("error");
        }
    }
}
var fristShowHtml = "<div class=\"hz_ties\" >" +
                "<div class=\"hz_sbab\"><p><b>常用国家</b>（可直接选择国家）</p><span><img onclick=\"HideCountryDiv()\" style=\"cursor:hand\" src=\"http://images.baoyuntong.com/short/www/admin_img/hz_cbguanbi.jpg\" width=\"8\" height=\"8\" /></span>" +
                "<div class=\"clear\"></div>" +
                "<input type=\"hidden\" id=\"hidPageIndex\" value=\"0\" /><input type=\"hidden\" id=\"hidIsLoadPager\" value=\"true\" /></div>" +
                "<div class=\"hz_sbcc\" >" +
                      "<div class=\"hz_sbdd\">" +
                        "<ul id=\"pr_nav\">" +
                             "<li id=\"lihotUse\" class=\"ac\" onclick=\"GetHotUsedCountry();\">常用国家</li>" +
                             "<li id=\"liA\" onclick=\"GetCountriesByInitial('A');\">A</li>" +
                             "<li id=\"liB\" onclick=\"GetCountriesByInitial('B');\">B</li>" +
                             "<li id=\"liC\" onclick=\"GetCountriesByInitial('C');\">C</li>" +
                             "<li id=\"liD\" onclick=\"GetCountriesByInitial('D');\">D</li>" +
                             "<li id=\"liE\" onclick=\"GetCountriesByInitial('E');\">E</li>" +
                             "<li id=\"liF\" onclick=\"GetCountriesByInitial('F');\">F</li>" +
                             "<li id=\"liG\" onclick=\"GetCountriesByInitial('G');\">G</li>" +
                             "<li id=\"liH\" onclick=\"GetCountriesByInitial('H');\">H</li>" +
                             "<li id=\"liI\" onclick=\"GetCountriesByInitial('I');\">I</li>" +
                             "<li id=\"liJ\" onclick=\"GetCountriesByInitial('J');\">J</li>" +
                             "<li id=\"liK\" onclick=\"GetCountriesByInitial('K');\">K</li>" +
                             "<li id=\"liL\" onclick=\"GetCountriesByInitial('L');\">L</li>" +
                             "<li id=\"liM\" onclick=\"GetCountriesByInitial('M');\">M</li>" +
                             "<li id=\"liN\" onclick=\"GetCountriesByInitial('N');\">N</li>" +
                             "<li id=\"liO\" onclick=\"GetCountriesByInitial('O');\">O</li>" +
                             "<li id=\"liP\" onclick=\"GetCountriesByInitial('P');\">P</li>" +
                             "<li id=\"liQ\" onclick=\"GetCountriesByInitial('Q');\">Q</li>" +
                             "<li id=\"liR\" onclick=\"GetCountriesByInitial('R');\">R</li>" +
                             "<li id=\"liS\" onclick=\"GetCountriesByInitial('S');\">S</li>" +
                             "<li id=\"liT\" onclick=\"GetCountriesByInitial('T');\">T</li>" +
                             "<li id=\"liU-Z\" onclick=\"GetCountriesByInitial('U-Z');\">U-Z</li>" +
                         "</ul>" +
                         "<div class=\"clear\"></div>" +
                        "</div>" +

                       "<div class=\"hz_sbee\"  >" +
                      "<ul id=\"ulCountry\" >" +

                       "</ul>" +
                       "<div class=\"clear\"></div>" +
                       "</div>" +
                       "<div class=\"hz_sbff\" id=\"showPageInfo\">" +
                            "<div class=\"hz_sbuu\"><span>共计<b>24</b>条记录</span> " +
                    	     "<ul><li><</li><li class=\"ov\">1</li><li>2</li><li>3</li><li>></li></ul> " +
                             "<div class=\"clear\"></div>" +
                             "</div>" +

                       "</div>" +
                  "</div>" +
                "<div class=\"clear\"></div>" +
                 "</div> ";
var countryList; //国家数据列表
//绑定国家初始化
function bindCuntry() {
    document.onkeydown = jpPressKey;
    //起运地
    $('[id$=txtStartCountry]').focus(function () {
        StartCountryInit();
    }).keyup(function (e) {
        var code = e.which || e.keyCode;
        if (code != 38 && code != 40) {
            loadSearch($(this));
        }
    }).on("postpaste", function () {
        loadSearch($(this));
    }).pasteEvents();
    //中转地
    $('[id$=txtMiddleCountry]').focus(function () {
        MiddleCountryInit();
    }).keyup(function (e) {
        var code = e.which || e.keyCode;
        if (code != 38 && code != 40) {
            loadSearch($(this));
        }
    }).on("postpaste", function () {
        loadSearch($(this));
    }).pasteEvents();
    //目的国家
    $('[id$=txtEndCountry]').focus(function () {
        EndCountryInit();
    }).keyup(function (e) {
        var code = e.which || e.keyCode;
        if (code != 38 && code != 40) {
            loadSearch($(this));
        }
    }).on("postpaste", function () {
        loadSearch($(this));
    }).pasteEvents();
    //点击页面隐藏
    $('body').click(function (evt) {
        var txtStartCountryId = $('[id$=txtStartCountry]').attr("id");
        var divStartCountryId = $('[id$=dCheckStartCountry]').attr("id");
        var txtEndCountryId = $('[id$=txtEndCountry]').attr("id");
        var divEndCountryId = $('[id$=dCheckEndCountry]').attr("id");
        var txtMiddleCountryId = $('[id$=txtMiddleCountry]').attr("id");
        var divMiddleCountryId = $('[id$=dCheckMiddleCountry]').attr("id");

        if (evt.target.id != "imgStartCountry" && $("#hidCountryType").val() == "F" && $(evt.target).parents("#dCheckStartCountry").length == 0 && evt.target.id != txtStartCountryId && evt.target.id != divStartCountryId) {
            ShowEndCountryControl();
            $('#dCheckStartCountry').hide(1, hzsbbHide);
            IE6Show(false);
        }

        if (evt.target.id != "imgEndCountry" && $("#hidCountryType").val() == "T" && $(evt.target).parents("#dCheckEndCountry").length == 0 && evt.target.id != txtEndCountryId && evt.target.id != divEndCountryId) {
            ShowEndCountryControl();
            $('#dCheckEndCountry').hide(1, hzsbbHide);
            IE6Show(false);
        }

        if (evt.target.id != "imgMiddleCountry" && $("#hidCountryType").val() == "M" && $(evt.target).parents("#dCheckMiddleCountry").length == 0 && evt.target.id != txtMiddleCountryId && evt.target.id != divMiddleCountryId) {
            ShowEndCountryControl();
            $('#dCheckMiddleCountry').hide(1, hzsbbHide);
            IE6Show(false);
        }
    });
}
//响应键盘事件
function jpPressKey(e) {
    e = e || window.event;
    var code = e.which || e.keyCode;
    //38上 40下
    var box = $(".hz_sbbb:visible");
    var hov = box.find("li.areahover");
    if (code == 38) {
        var pre = hov.prev("li");
        if (pre != null && pre.length > 0) {
            hov.removeClass("areahover");
            pre.addClass("areahover");
        }
    } else if (code == 40) {
        var next = hov.next("li");
        if (next != null && next.length > 0) {
            hov.removeClass("areahover");
            next.addClass("areahover");
        }
    } else if (code == 13) {
        var id = box.attr("id").replace("dCheck", "txt");
        if (hov != null && hov.length > 0) {
            hov.click();
            $("[id$='" + id + "']").blur();
        } else {
            $("[id$='" + id + "']").css("color", "#CCC").val("国家（中文/英文）");
            HideCountryDiv();
        }
        return false;
    }
}
//关闭层
function CloseCountryDiv() {
    $("#dCheckStartCountry").hide(1, hzsbbHide);
    $("#dCheckEndCountry").hide(1, hzsbbHide);

    $('[id$=txtMiddleCountry]').show(); //防止遮盖
    $('[id$=imgMiddleCountry]').show(); //防止遮盖
    $('[id$=txtEndCountry]').show(); //防止遮盖
    $('[id$=imgEndCountry]').show(); //防止遮盖
    IE6Show(false);
}

function IE6Show(IsShow) {

    var IsMax = false;
    try {

        if (window.external.max_version != undefined) {
            IsMax = true;
        }
    }
    catch (e) {
        IsMax = false;
    }
    if (IsMax && IsShow) {
        $("#divIE6").show();
    }


    if ($.browser.msie && ($.browser.version == "6.0") && IsShow) {
        $("#divIE6").show();
    }

    if (!IsShow) {
        $("#divIE6").hide();
    }
}

///起始国家初始化
function StartCountryInit() {
    $("#hidCountryType").val("F");
    $("#dCheckStartCountry").show();

    $("#dCheckStartCountry").attr("class", "hz_sbbb");
    $("#dCheckStartCountry").html(fristShowHtml);

    $('[id$=txtEndCountry]').hide(); //防止遮盖
    $('[id$=imgEndCountry]').hide(); //防止遮盖
    $("#dCheckEndCountry").html("");
    $('[id$=dCheckEndCountry]').hide(1, hzsbbHide);

    $('[id$=txtMiddleCountry]').hide(); //防止遮盖
    $('[id$=imgMiddleCountry]').hide(); //防止遮盖
    $("#dCheckMiddleCountry").html("");
    $('[id$=dCheckMiddleCountry]').hide(1, hzsbbHide);

    GetHotUsedCountry();
    HotCountryPageInfo();
    IE6Show(true);
}

///目的国家初始化
function EndCountryInit() {
    $("#hidCountryType").val("T");
    $("#dCheckEndCountry").show();

    $("#dCheckMiddleCountry").hide(1, hzsbbHide);

    $("#dCheckStartCountry").hide(1, hzsbbHide);

    $("#dCheckEndCountry").attr("class", "hz_sbbb");
    $("#dCheckEndCountry").html(fristShowHtml);
    GetHotUsedCountry();
    HotCountryPageInfo();
    IE6Show(true);
}
//中转国家初始化
function MiddleCountryInit() {
    $("#hidCountryType").val("M");
    $("#dCheckMiddleCountry").show();

    $("#dCheckEndCountry").hide(1, hzsbbHide);
    $('[id$=txtEndCountry]').hide(); //防止遮盖
    $('[id$=imgEndCountry]').hide(); //防止遮盖

    $("#dCheckStartCountry").hide(1, hzsbbHide);

    $("#dCheckMiddleCountry").attr("class", "hz_sbbb");
    $("#dCheckMiddleCountry").html(fristShowHtml);
    GetHotUsedCountry();
    HotCountryPageInfo();
    IE6Show(true);
}

///常用国家
function HotCountryPageInfo() {
    $("#showPageInfo").html("共计<b>10</b>条记录");
}

///隐藏国家选择框
function HideCountryDiv() {
    if ($("#hidCountryType").val() == "F") {
        $('[id$=dCheckStartCountry]').hide(1, hzsbbHide);
    } else if ($("#hidCountryType").val() == "T") {
        $('[id$=dCheckEndCountry]').hide(1, hzsbbHide);
    } else if ($("#hidCountryType").val() == "M") {
        $('[id$=dCheckMiddleCountry]').hide(1, hzsbbHide);
    }
    ShowEndCountryControl();
    IE6Show(false);
}

function ShowEndCountryControl() {
    $('[id$=txtEndCountry]').show(); //防止遮盖
    $('[id$=imgEndCountry]').show(); //防止遮盖 
    $('[id$=txtMiddleCountry]').show(); //防止遮盖
    $('[id$=imgMiddleCountry]').show(); //防止遮盖 
}

///常用国家列表查询
function GetHotUsedCountry() {
    $(".ac").removeAttr("class");
    HotCountryPageInfo();
    $("#lihotUse").addClass('ac');
    var companyId = $('[id$=selCompany]').val();
    var topCount = 10;
    var IsFromCountry = true;
    if ($("#hidCountryType").val() == "F") {
        IsFromCountry = true;
    } else if ($("#hidCountryType").val() == "T") {
        IsFromCountry = false;
    }
    $.ajax({
        url: "/WebService/ServiceOperation.asmx/GetUseList",
        contentType: "application/json; charset=utf-8",
        sync: false,
        type: "Post",
        dataType: "json",
        data: "{IsFromCounty:" + IsFromCountry + ",companyId:" + companyId + ",topCount:" + topCount + "}",
        success: function (json) {
            if (json.d != null) {
                LoadCountry(json.d);
            } else {

            }
        },
        error: function (x, e) {
            alert(x.responseText);
        }
    });
}

///加载常用国家列表
function LoadCountry(countriesObj) {
    var liCountryhtml = "";
    var total = countriesObj.length;
    for (var i = 0; i < countriesObj.length; i++) {
        liCountryhtml += "<li style=\"cursor:hand\"  onclick=\"GetCountry(this," + countriesObj[i].Id + ")\">" + countriesObj[i].EnName + "<i>" + countriesObj[i].CnName + "</i></li>";

    }
    if (total > 0 && total <= 10) {
        $("#showPageInfo").html("共计<b>" + total + "</b>条记录");
    } else {
        if ($("#hidIsLoadPager").val() == "true") {
            GetPages(total, false);
        }
        $("#hidIsLoadPager").val("true");
    }
    if ($(".ac").html() == "常用国家") {
        $("#showPageInfo").html("共计<b>10</b>条记录");
    }
    $("#ulCountry").html(liCountryhtml);
}
//加载分页国家
function LoadPageCountry(countriesObj) {
    var liCountryhtml = "";
    var total = countriesObj.PageCount;
    for (var i = 0; i < countriesObj.List.length; i++) {
        liCountryhtml += "<li style=\"cursor:hand\"  onclick=\"GetCountry(this," + countriesObj.List[i].Id + ")\">" + countriesObj.List[i].EnName + "<i>" + countriesObj.List[i].CnName + "</i></li>";
    }
    if (total > 0 && total <= 10) {
        $("#showPageInfo").html("共计<b>" + total + "</b>条记录");
    } else {
        if ($("#hidIsLoadPager").val() == "true") {
            GetPages(total, false);
        }
        $("#hidIsLoadPager").val("true");
    }
    if ($(".ac").html() == "常用国家") {
        $("#showPageInfo").html("共计<b>10</b>条记录");
    }
    $("#ulCountry").html(liCountryhtml);
}
///获取选择国家
function GetCountry(obj, id) {
    if (!$(obj).hasClass("areahover")) {
        $(obj).siblings("li").removeClass("areahover");
        $(obj).addClass("areahover");
    }
    var strCountry = $(obj).text().replace("<i>", "").replace("</i>", "").replace("<I>", "").replace("</I>", "");
    if ($("#hidCountryType").val() == "F") {
        $('[id$=txtStartCountry]').val(strCountry);
        $('[id$=txtStartCountry]').css("color", "#000");
        $('[id$=dCheckStartCountry]').hide(1, hzsbbHide);
        $("[id$=FormAddressId]").val(id);
    } else if ($("#hidCountryType").val() == "T") {
        $('[id$=txtEndCountry]').val(strCountry);
        $('[id$=txtEndCountry]').css("color", "#000");
        $('[id$=dCheckEndCountry]').hide(1, hzsbbHide);
        $("[id$=ToAddressId]").val(id);
    } else if ($("#hidCountryType").val() == "M") {
        $('[id$=txtMiddleCountry]').val(strCountry);
        $('[id$=txtMiddleCountry]').css("color", "#000");
        $('[id$=dCheckMiddleCountry]').hide(1, hzsbbHide);
        $("[id$=PassAddressId]").val(id);
    }
    ShowEndCountryControl();
    ResetCalculate(); //重置试算
    IE6Show(false);
}

function GetPages(pageTotal, issearch) {
    var pageSize = 10;
    var pageCount = 0;
    if (pageTotal % pageSize == 0) {
        pageCount = pageTotal / pageSize;
    } else {
        pageCount = (pageTotal / pageSize) + 1;
    }
    var pageHtml = "";
    if (pageCount > 0) {
        pageHtml = "<div class=\"hz_sbuu\"><span>共计<b>" + pageTotal + "</b>条记录</span>" +
        "<ul id=\"ulPager\"><li id=\"liPagerPre\" style=\"cursor:hand\" onclick=\"GetCountryByPageIndex('-1','" + pageCount + "'," + issearch + ")\" style=\"display:none\"><</li>"; //
    }
    for (var i = 1; i <= pageCount; i++) {
        if (i == 1)
            pageHtml += "<li id=\"li" + i + "\" class=\"ov\" style=\"cursor:hand\" onclick=\"GetCountryByPageIndex('" + (i - 1) + "','" + pageCount + "'," + issearch + ")\" >" + i + "</li>";
        else
            pageHtml += "<li id=\"li" + i + "\" style=\"cursor:hand\" onclick=\"GetCountryByPageIndex('" + (i - 1) + "','" + pageCount + "'," + issearch + ")\">" + i + "</li>";
    }
    if (pageHtml != "")
        pageHtml += "<li id=\"liPagerNext\"  style=\"cursor:hand\" onclick=\"GetCountryByPageIndex('+1','" + pageCount + "'," + issearch + ")\">></li></ul><div class=\"clear\"></div></div>";

    $("#showPageInfo").html(pageHtml);
}

//国家分页标签点击事件
function GetCountryByPageIndex(pageIndex, pageCount, issearch) {
    if (pageIndex != "-1" && pageIndex != "+1") {
        $("#hidPageIndex").val(pageIndex);
    }
    else if (pageIndex == "+1") {
        if ($("#hidPageIndex").val() == parseInt(pageCount - 1)) return;

        pageIndex = parseInt($("#hidPageIndex").val()) + 1;
        $("#hidPageIndex").val(pageIndex);
    } else if (pageIndex == "-1") {
        if ($("#hidPageIndex").val() == 0) return;

        pageIndex = $("#hidPageIndex").val() - 1;
        $("#hidPageIndex").val(pageIndex);
    }
    //控制上一页标签显示
    if (parseInt(pageIndex) != 0)
        $("#liPagerPre").show();
    else
        $("#liPagerPre").hide();

    //控制下一页标签显示
    if (parseInt(pageIndex) != parseInt(pageCount - 1))
        $("#liPagerNext").show();
    else
        $("#liPagerNext").hide();

    $(".ov").removeAttr("class");
    $("#li" + (parseInt(pageIndex) + 1)).addClass("ov");

    $("#hidIsLoadPager").val("false");

    QueryCountry($(".ac").html());
}

function QueryCountry(initial) {
    $(".ac").removeAttr("class");
    $("#li" + initial).addClass('ac');
    var companyId = $('[id$=selCompany]').val();
    var IsFromCountry = true;
    if ($("#hidCountryType").val() == "F") {
        IsFromCountry = true;
    } else if ($("#hidCountryType").val() == "T") {
        IsFromCountry = false;
    }

    var pageSize = 10;
    var pageIndex = 0;
    if ($("#hidPageIndex").length > 0) {
        pageIndex = $("#hidPageIndex").val();
    }

    $.ajax({
        url: "/WebService/ServiceOperation.asmx/GetAreaList",
        contentType: "application/json; charset=utf-8",
        sync: false,
        type: "Post",
        dataType: "json",
        data: "{IsFromCountry:" + IsFromCountry + ",companyId:" + companyId + ",initial:'" + initial + "',pageIndex:" + pageIndex + ",pageSize:" + pageSize + "}",
        success: function (json) {
            if (json.d != null) {
                LoadPageCountry(json.d);
            } else {

            }
        },
        error: function (x, e) {
            alert(x.responseText);
        }
    });
}

///国家字母点击
function GetCountriesByInitial(initial) {
    $("#hidPageIndex").val(0);
    QueryCountry(initial);
}
//加载自动匹配
function loadSearch(o) {
    var val = $(o).val();
    val = $.trim(val);
    if (val == "") {
        $(o).focus();
        return;
    }
    //如果层未显示
    if ($(".hz_sbbb:visible").length <= 0) {
        $(o).focus();
    }
    loadSearchData(val);
}

//加载数据
function loadSearchData(val) {
    if (countryList == null || countryList.length <= 0) {
        $.ajax({
            url: "/WebService/ServiceOperation.asmx/GetCountryAllList",
            contentType: "application/json; charset=utf-8",
            sync: false,
            type: "Post",
            dataType: "json",
            success: function (json) {
                countryList = json.d;
                createHtmlPP(val);
            },
            error: function (x, e) {
                alert(x.responseText);
            }
        });
    } else {
        createHtmlPP(val);
    }
}
//拼接页面
function createHtmlPP(val) {
    //数据列表拼接
    var box = $(".hz_sbbb:visible");
    var title = ",按英文字母顺序排列";
    var html = '<div class="hz_sbdd"><p>&nbsp;&nbsp;支持键盘↑↓</p><div class="clear"></div></div>';
    html += '<div class="hz_sbhh"><ul>';
    if (countryList.length > 0) {
        var haslength = 0;
        //首字母匹配
        var reg_start = new RegExp("^" + val + "", "i");
        var reg_all = new RegExp("^(?!" + val + ").*(" + val + ").*$", "i");
        var reg_cn = /^[\u4e00-\u9fa5]+$/;
        //数组
        var farr = new Array();
        var marr = new Array();
        $.each(countryList, function (index, item) {
            var name = item.EnName + item.CnName;
            if (reg_cn.test(val)) {
                if (reg_start.test(item.CnName)) {
                    farr.push(item);
                } else if (reg_all.test(name)) {
                    marr.push(item);
                }
            } else {
                if (reg_start.test(name)) {
                    farr.push(item);
                } else if (reg_all.test(name)) {
                    marr.push(item);
                }
            }
        });
        //如果为中文
        if (reg_cn.test(val)) {
            farr = farr.sort(sortby("EnName"));
            marr = marr.sort(sortby("EnName"));
        }
        //拼接代码
        var reg_key = new RegExp(val, 'i');
        if (farr.length >= 10) {
            for (var i = farr.length - 1; i >= farr.length - 10; i--) {
                var name = farr[i].EnName + farr[i].CnName;
                //关键字标红                
                var mm = name.match(reg_key);
                name = name.replace(reg_key, "<i>" + mm[0] + "</i>");

                //默认选中项
                if (i == farr.length - 1) {
                    html += "<li en='" + farr[i].EnName + "' cn='" + farr[i].CnName + "' onclick='GetCountry(this," + farr[i].Id + ")' class='areahover'>" + name + "</li>";
                } else {
                    html += "<li en='" + farr[i].EnName + "' cn='" + farr[i].CnName + "' onclick='GetCountry(this," + farr[i].Id + ")'>" + name + "</li>";
                }
                haslength++;
            }
        } else {
            for (var i = farr.length - 1; i >= 0; i--) {
                var name = farr[i].EnName + farr[i].CnName;
                //关键字标红                
                var mm = name.match(reg_key);
                name = name.replace(reg_key, "<i>" + mm[0] + "</i>");

                //默认选中项
                if (i == farr.length - 1) {
                    html += "<li en='" + farr[i].EnName + "' cn='" + farr[i].CnName + "' onclick='GetCountry(this," + farr[i].Id + ")' class='areahover'>" + name + "</li>";
                } else {
                    html += "<li en='" + farr[i].EnName + "' cn='" + farr[i].CnName + "' onclick='GetCountry(this," + farr[i].Id + ")'>" + name + "</li>";
                }
                haslength++;
            }
            if (marr.length > 0) {
                var len = marr.length >= (10 - farr.length) ? (10 - farr.length) : marr.length;
                for (var j = marr.length - 1; j >= marr.length - len; j--) {
                    var name = marr[j].EnName + marr[j].CnName;
                    //关键字标红                
                    var mm = name.match(reg_key);
                    name = name.replace(reg_key, "<i>" + mm[0] + "</i>");

                    //默认选中项
                    if (farr.length == 0 && j == marr.length - 1) {
                        html += "<li en='" + marr[j].EnName + "' cn='" + marr[j].CnName + "' onclick='GetCountry(this," + marr[j].Id + ")' class='areahover'>" + name + "</li>";
                    } else {
                        html += "<li en='" + marr[j].EnName + "' cn='" + marr[j].CnName + "' onclick='GetCountry(this," + marr[j].Id + ")'>" + name + "</li>";
                    }
                    haslength++;
                }
            }
        }
        if (haslength > 0) {
            title = val + title;
        } else {
            title = "对不起，没有找到与“" + val + "”相关的国家/地区";
        }
    } else {
        title = "对不起，没有找到与“" + val + "”相关的国家/地区";
    }
    html += '</ul></div>';
    html += '<div id="showPageInfo" class="hz_sbff"></div>';

    //标题
    box.find(".hz_sbab p").html(title);
    //内容
    box.find(".hz_sbcc").html(html);
}
//隐藏事件
function hzsbbHide() {
    var html = $(this).html();
    var id = this.id.replace("dCheck", "txt");
    //文本框中的值
    var val = $("[id$='" + id + "']").val();
    if ($.trim(html) != "") {
        //选中项的值
        var li = $(this).find("li.areahover");
        if (li != null && li.length > 0) {
            //整体匹配
            var sal = li.text();
            if ($.trim(val) != $.trim(sal)) {
                //中英文分别匹配
                var en = li.attr("en");
                var cn = li.attr("cn");

                if ($.trim(val).toLowerCase() == $.trim(sal).toLowerCase()
                || $.trim(val).toLowerCase() == en.toLowerCase()
                || $.trim(val).toLowerCase() == cn.toLowerCase()) {
                    li.click();
                } else {
                    $("[id$='" + id + "']").css("color", "#CCC").val("国家（中文/英文）");
                }
            }

        } else if (html.indexOf("支持键盘↑↓") > 0) {
            $("[id$='" + id + "']").css("color", "#CCC").val("国家（中文/英文）");
        } else {//从数据中匹配
            var isset = false;
            if (countryList != null && countryList.length > 0) {
                $.each(countryList, function (index, item) {
                    var name = item.EnName + item.CnName;
                    if (val.toLowerCase() == name.toLowerCase()) {
                        $("[id$='" + id + "']").val(name);
                        if (id.indexOf("Start") > 0) {
                            $("input[id$=FormAddressId]").val(item.Id);
                        } else if (id.indexOf("Middle") > 0) {
                            $("input[id$=PassAddressId]").val(item.Id);
                        } else if (id.indexOf("End") > 0) {
                            $("input[id$=ToAddressId]").val(item.Id);
                        }
                        isset = true;
                    }
                });
                if (!isset) {
                    $("[id$='" + id + "']").css("color", "#CCC").val("国家（中文/英文）");
                }
            } else {
                $.ajax({
                    url: "/WebService/ServiceOperation.asmx/GetCountryAllList",
                    contentType: "application/json; charset=utf-8",
                    sync: false,
                    type: "Post",
                    dataType: "json",
                    success: function (json) {
                        countryList = json.d;
                        $.each(countryList, function (index, item) {
                            var name = item.EnName + item.CnName;
                            if (val.toLowerCase() == name.toLowerCase()) {
                                $("[id$='" + id + "']").val(name);
                                if (id.indexOf("Start") > 0) {
                                    $("input[id$=FormAddressId]").val(item.Id);
                                } else if (id.indexOf("Middle") > 0) {
                                    $("input[id$=PassAddressId]").val(item.Id);
                                } else if (id.indexOf("End") > 0) {
                                    $("input[id$=ToAddressId]").val(item.Id);
                                }
                                isset = true;
                            }
                        });
                        if (!isset) {
                            $("[id$='" + id + "']").css("color", "#CCC").val("国家（中文/英文）");
                        }
                    },
                    error: function (x, e) {
                        alert(x.responseText);
                    }
                });
            }
        }
        $(this).html("");
    }
}