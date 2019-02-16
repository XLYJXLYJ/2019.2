$("input").focus(function () {
    $('body').css({'height': "100vh"});

})
//已有账户
$(".existing-account").click(function () {
    $(".alert .reg").css("display", "none");
    $(".alert .login").css("display", "block");
})
//没有账号
$(".no-account-number").click(function () {
    $(".alert .reg").css("display", "block");
    $(".alert .login").css("display", "none");
})

//注册
$(".three>.reg").on("click", function (e) {
    e.stopPropagation();
    $(".index .alert").addClass("z-index");
    $('.swiper-container').addClass('swiper-no-swiping');
    $('.swiper-pagination-bullet').addClass('active')

    $(".alert .reg").show();
    $(".alert .login").hide();
})
//登录
$(".three>.login").on("click", function (e) {
    e.stopPropagation();
    $(".index .alert").addClass("z-index");
    $('.swiper-container').addClass('swiper-no-swiping');
    $('.swiper-pagination-bullet').addClass('active')
    $(".alert .reg").hide();
    $(".alert .login").show();
})

//忘记密码
$(document).on("click", ".forget_password", function () {
    $(".alert .login").hide();
    $(".index .three .alert .forgetPassword").show();
})

$(document).on('click', '.alert .login-span', function () {
    $(".alert .finish").hide();
    $(".alert .login").show();
})


$(".three").click(function (e) {
    var reg = $('.index .alert .reg .myform')[0];
    var login = $('.index .alert .login .myform')[0];
    var forget = $('.index .alert .forgetPassword .myform')[0];
    var reset = $('.index .alert .resetPassword .myform')[0];
    var finish = $('.index .alert .finish div')[0];
    if (e.target != reg && !$.contains(reg, e.target) && e.target != login && !$.contains(login, e.target)
            && e.target != forget && !$.contains(forget, e.target) && e.target != reset && !$.contains(reset, e.target)
            & e.target != finish && !$.contains(finish, e.target)) {
        $(".index .alert").removeClass("z-index");
        $('.swiper-container').removeClass('swiper-no-swiping');
        $('.swiper-pagination-bullet').removeClass('active')
        $(".alert .reg").hide();
        $(".alert .forgetPassword").hide();
        $(".alert .resetPassword").hide();
        $(".alert .finish").hide();
    }

})

//密码可见
$(".index .resetPassword .myform>div>span").click(function () {
    if ($(this).hasClass("bottom")) {
        $(this).removeClass("bottom");
        $(this).siblings("input").prop("type", "password")
    } else {
        $(this).addClass("bottom");
        $(this).siblings("input").prop("type", "text")
    }

})

//监听input输入框
$('.forgetPassword .phone').bind('input propertychange', function () {
    if (/^1[3|4|5|8|7][0-9]\d{8}$/.test($(this).val())) {
        $(".forget-code").addClass("active");
    } else {
        $(".forget-code").removeClass("active");
    }
});
$('.resetPassword input').bind('input propertychange', function () {
    if ($(this).val().length > 0) {
        $(this).siblings(".eye").show();
        $(this).siblings("input").val($(this).val());
    } else {
        $(this).siblings(".eye").hide();
    }

})

$(function () {
    //注册
    $(".reg .myform").Validform({
        tiptype: 4,
        ignoreHidden: true,
        postonce: true,
        ajaxPost: true,
        btnSubmit: ".reg-buttom",
        datatype: {
            'phone': /^1\d{10}$/
        },
        callback: function (data) {
            if (data.code == 10000) {
                layer_msg('注册成功');
                setTimeout("window.location.href = '/insurbot/chat'", 2000);
            } else {
                layer_msg(data.msg);
            }
        }
    });
    //短信验证码
    $(document).on("click", ".get-code", function () {
        if (!$('.get-code').hasClass('code')) {
            return
        }
        var phone = $(".reg .phone").val();
        if (/^1[3|4|5|8|7][0-9]\d{8}$/.test(phone)) {
            $.post('/verifycode/code', {'mobile': phone}, function (data) {
                if (data.code == 10000) {
                    var n = 60;
                    $(".get-code").removeClass("code").html(n + "s");
                    timeer = setInterval(function () {
                        n--;
                        if (n > 0) {
                            $(".get-code").html(n + "s");
                        } else {
                            $(".get-code").addClass("code").html("获取验证码");
                            clearInterval(timeer);
                        }
                    }, 1000);
                    layer_msg('验证码发送成功');
                } else {
                    layer_msg('验证码发送失败');
                }
            }, 'json');
        } else {
            $(".reg .phone").focus();
            $(".reg .phone").siblings(".Validform_checktip").html("请输入正确手机号");
        }
    });
    
    //登录
    $(".login .myform").Validform({
        tiptype: 4,
        ignoreHidden: true,
        postonce: true,
        ajaxPost: true,
        btnSubmit: ".login-buttom",
        callback: function (data) {
            //alert("111");
            if (data.code == 10000) {
                layer_msg('登录成功');
                setTimeout("window.location.href = '/insurbot/chat'", 2000);
            } else {
                layer_msg(data.msg);
            }
        }
    });



    //找回密码step1
    $(".forgetPassword .myform").Validform({
        tiptype: 4,
        ignoreHidden: true,
        postonce: true,
        ajaxPost: true,
        datatype: {
            'phone': /^1\d{10}$/
        },
        btnSubmit: ".next",
        callback: function (data) {
            if (data.code == 10000) {
                $(".index .three .alert .forgetPassword").hide();
                $(".index .three .alert .resetPassword").show();
            } else {
                layer_msg(data.msg);
            }
        }
    })

    //找回密码获取验证码
    $(document).on("click", ".forget-code", function () {
        if (!$('.forget-code').hasClass('code')) {
            return false;
        }
        var phone = $(".forgetPassword .phone").val();
        if ($(".forget-code").hasClass("active")) {
            $.post('/verifycode/reset_pass', {'mobile': phone}, function (data) {
                if (data.code == 10000) {
                    var n = 60;
                    $(".forget-code").removeClass("code").html(n + "s");
                    timeer = setInterval(function () {
                        n--;
                        if (n > 0) {
                            $(".forget-code").html(n + "s");
                        } else {
                            $(".forget-code").addClass("code").html("获取验证码");
                            clearInterval(timeer);
                        }
                    }, 1000);
                    layer_msg('验证码发送成功');
                } else {
                    layer_msg('验证码发送失败');
                }
            }, 'json');
        } else {
            $(".forgetPassword .phone").focus();
            $(".forgetPassword .phone").siblings(".Validform_checktip").html("请输入正确手机号");
        }
    });

    //重置密码
    $(".resetPassword .myform").Validform({
        tiptype: 4,
        ignoreHidden: true,
        postonce: true,
        ajaxPost: true,
        btnSubmit: ".sure",
        callback: function (data) {
            if (data.code == 10000) {
                $(".index .three .alert .resetPassword").hide();
                $(".index .three .alert .finish").show();
            } else {
                layer_msg(data.msg);
            }


        }
    })


});
$('.verify_code').bind('input propertychange', function () {
    if ($.trim($(this).val()).length >= 4 && $.trim($(this).val()).length <= 6) {
        $(".get-code").addClass("active");
    } else {
        $(".get-code").removeClass("active");
    }

});
$('.verifyCode').bind('input propertychange', function () {
    if ($.trim($(this).val()).length >= 4 && $.trim($(this).val()).length <= 6) {
        $(".forget-code").addClass("active");
    } else {
        $(".forget-code").removeClass("active");
    }

});

