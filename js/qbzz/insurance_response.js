'use strict';
var QBZZ = window.QBZZ || {};
QBZZ.Effect = QBZZ.Effect || {};
(function (window, $) {
    QBZZ.Effect.response = {
        startUp : function () {
            this.bid(); //立即投标
            this.saveDraftPrice();
            this.priceSaveSubmit();
            this.checkPriceRate();
            this.queryResponse();
            this.queryReception();
            this.queryDraft();
            this.responsePolicyBtn();
        },
        bid:function(){
            $('.bidTender').on('click', function() {
                var tenderId = $(this).data('rel');
                $.ajax({
                    type: 'GET',
                    url: '/insurance/response_bid/'+tenderId,
                    dataType: 'json',
                    error: function () {
                        alert('投标失败,请重新投标!');
                    },
                    success: function(data) {
                        alert('投标成功');
                        location.href = '/insurance/list/';
                    }
                });
            });
        },
        //保存草稿报价
        saveDraftPrice:function(){
            $('.priceSaveDraft').on('click', function(){
                if($('#price_currency').val() == '') {
                    alert('保费不能为空');
                    return false;
                }

                if($('#agreement').is(':checked') == false) {
                    alert('请选择我保证我的报价是真实有效的，且具有法律效力。否则，将承担相应违约责任。');
                    return false;
                }
                $('#type').val(1);
                $('#insuredForm').submit();
            });
        },
        //校验费率
        checkPriceRate: function(){
            $('#price_rate').on('change', function(){
                if($(this).val() > 2000) {
                    alert('费率不能大于2000‰');
                }
                var number = parseFloat($(this).val() * $('#price').val()) / 1000;
                $('#price_premium').val(number.toFixed(2));
            });
        },
        //保存报价
        priceSaveSubmit: function(){
          
             
        },
        //响应中查询
        queryResponse:function(){
            $('.queryResponse').on('click', function(){
                $('#queryResponse').submit();
            });
        },
        //
        queryReception:function() {
            $('.queryReception').on('click', function(){
                $('#queryReception').submit();
            });
        },
        queryDraft:function() {
            $('.queryDraft').on('click', function(){
                $('#queryDraft').submit();
            });
        },
        //生成保单
        responsePolicyBtn:function(){
          $('.responsePolicyBtn').on('click', function(){
              var tenderId = $(this).data('rel');
              if($('#insurer_policy_num').val() == '') {
                  alert('保单号不能为空');
                  return false;
              }

              $('#responsePolicy').submit();
          });
        }
    };
})(window, jQuery);
$(function () {
    QBZZ.Effect.response.startUp();
})