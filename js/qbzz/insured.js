'use strict';
var QBZZ = window.QBZZ || {};
QBZZ.Effect = QBZZ.Effect || {};
(function (window, $) {
    QBZZ.Effect.insured = {
        templateUrl: '',
        oldStep: 1,
        currentStep: 1,
        formData: {},
        forward: '',

        startUp: function () {
            this.getProduct();
            this.changeStep();
            this.getSubIndustry();
            this.getSubCargoType();
			this.glyphiconSearch();
            this.fillInvoice();
            this.recomandSearch();
            this.attachmentClear();
            this.searchJobs();
            this.changeCurrency();
        },

        getProduct: function () {
            $('.insured_category_id').change(function () {
                var categoryId = parseInt($(this).val());
                if(categoryId > 0) {
                    $('.insured_products_id').empty();
                    $.ajax({
                        type: 'GET',
                        url: '/insured/ajax/get/product',
                        dataType: 'json',
                        data: {'categoryId': categoryId},
                        success: function(res) {
                            if (res && res.code === 200) {
                                if (res.data && res.data.length > 0) {
                                    var data = res.data;
                                    var content = '<option value>请选择险种</option>';
                                    for(var i=0 , length=data.length; i < length; i++ ){
                                        content += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                                    }
                                    $('.insured_products_id').append(content);
                                }
                            }
                        }
                    });
                }
            });
        },

        changeStep: function () {
            $('body').on("click", ".insured_button_step", function () {
                var $this = $(this);
                var step = parseInt($this.attr("step"));
                var forward = $this.attr("forward");
                QBZZ.Effect.insured.forward = forward;
                if (QBZZ.Effect.insured.forward == 'pre' || QBZZ.Effect.insured.forward == 'save' || step == 3) {
                    eval("QBZZ.Effect.insured.toStep" + step + "()");
                }
            });
        },

        toStep2: function () {
            $('input[name="forward"]').val(QBZZ.Effect.insured.forward);
            $.ajax({
                type: 'POST',
                url: '/insured/ajax/submit',
                data: $("#formTwo").serialize(),
                success: function(res) {
                    if (res && res.code === 200) {
                        if (res.data) {
                            location.href = res.data;
                        }
                    }
                }
            });
        },

        toStep3: function () {
            $('input[name="forward"]').val(QBZZ.Effect.insured.forward);
            $.ajax({
                type: 'POST',
                url: '/insured/ajax/submit',
                data: $("#formThree").serialize(),
                success: function(res) {
                    if (res && res.code === 200) {
                        if (res.data) {
                            location.href = res.data;
                        }
                    }
                }
            });
        },

        toStep4: function () {
            $('input[name="forward"]').val(QBZZ.Effect.insured.forward);
            $.ajax({
                type: 'POST',
                url: '/insured/ajax/submit',
                data: $("#formFour").serialize(),
                success: function(res) {
                    if (res && res.code === 200) {
                        if (res.data) {
                            location.href = res.data;
                        }
                    }
                }
            });
        },
        
        recomandSearch: function () {
            $('.main-insured-form').on('click','.tenders_recomand_choice',function () {
                var ul = $('.Release-sel-contact-company').find('ul');
                $.ajax({
                    type: 'GET',
                    url: '/insured/ajax/get/choice',
                    data: {'type' : 'recomand'},
                    success: function(res) {
                        if (res && res.code === 200 && res.data && res.data.length > 0) {
                            var data = res.data;
                            var content = '';
                            ul.empty();
                            for (var i = 0, length = data.length; i < length; i++) {
                                content += '<li id="tab'+data[i].id+'"><div><img src="' + data[i].logo + '" alt="">' + data[i].name + '</div> ' +
                                    '<span class="add_tab">+</span>' +
                                    '<input type="hidden" name="choice_id[]" value="' + data[i].id + '"/>' +
                                    '<input type="hidden" name="choice_type[]" value="recomand"/></li>';
                            }
                            ul.append(content);
                        }
                    }
                });
            });
        },

        glyphiconSearch: function () {
            $('.main-insured-form').on('click','.glyphicon-search',function () {
                var current = $(this);
                var type = current.attr('type');
                var value = current.parent().find('input').val();
                var ul = current.parent().parent().find('ul');
                var tenders_id = $('#formThree').find('input[name="tenders_id"]').val();

                $.ajax({
                    type: 'GET',
                    url: '/insured/ajax/get/choice',
                    data: {'value': value, 'type' : type, 'tenders_id' : tenders_id},
                    success: function(res) {
                        ul.empty();
                        if (res && res.code === 200 && res.data && res.data.length > 0) {
                            var data = res.data;
                            var content = '';
                            if(type == 'user') {
                                for (var i = 0, length = data.length; i < length; i++) {
                                    content += '<li id="tab'+data[i].id+'" title="' + data[i].name + '（' + data[i].email + '）' + '"><div>' +
                                        data[i].name + '（' + data[i].email + '）</div> ' +
                                        '<span class="add_tab">+</span>' +
                                        '<input type="hidden" name="choice_id[]" value="' + data[i].id + '"/>' +
                                        '<input type="hidden" name="choice_type[]" value="' + type + '"/></li>';
                                }

                            } else if(type == 'company' || type == 'subCompany' || type == 'business') {
                                for (var i = 0, length = data.length; i < length; i++) {
                                    content += '<li id="tab'+data[i].id+'"><div><img src="' + data[i].logo + '" alt="">' + data[i].name + '</div> ' +
                                        '<span class="add_tab">+</span>' +
                                        '<input type="hidden" name="choice_id[]" value="' + data[i].id + '"/>' +
                                        '<input type="hidden" name="choice_type[]" value="' + type + '"/></li>';
                                }
                            }
                            ul.append(content);
                        } else if(res && res.code === 90001) {
                            ul.append('<p class="tip_box_01">' + res.data + '</p>');
                        }
                    }
                });
            });
        },
        
        getSubIndustry: function () {
            $('.main-insured-form').on('change','.industrys_id',function () {
                var current = $(this);
                var id = parseInt(current.val());
                $('select[name="sub_industrys_id"]').empty();
                if(id > 0) {
                    $.ajax({
                        type: 'GET',
                        url: '/insured/ajax/get/subProduct',
                        data: {'id': id},
                        success: function(res) {
                            if (res && res.code === 200) {
                                if (res.data && res.data.length > 0) {
                                    var data = res.data;
                                    var content = '<option value>' + '请选择' + '</option>';
                                    for(var i=0 , length=data.length; i < length; i++ ){
                                        content += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                                    }
                                } else {
                                    var content = '<option value>' + '请选择' + '</option>';
                                }
                                $('select[name="sub_industrys_id"]').append(content);
                                //current.next('select').append(content);
                            }
                        }
                    });
                }
            });
        },
		getSubCargoType: function () {
            $('.main-insured-form').on('change','.cargo_type',function () {
                var current = $(this);
                var id = parseInt(current.val());
                $('select[name="sub_cargo_type"]').empty();
                if(id > 0) {
                    $.ajax({
                        type: 'GET',
                        url: '/insured/ajax/get/subCargo',
                        data: {'id': id},
                        success: function(res) {
                            if (res && res.code === 200) {
								var data = res.data;
								var content = '<option value>' + '请选择' + '</option>';
								$.each(data,function(index,value){
									content += '<option value="' + index + '">' + value + '</option>';
								});
                                $('select[name="sub_cargo_type"]').append(content);
                            }
                        }
                    });
                }
            });
        },
        fillInvoice: function () {
            //查看发票
            $('.main-insured-form').on('click','.view_invoice',function () {
                var selectInvoiceId = $('select[name="tenders_invoice_id"]').val();
                var invoiceId = $('input[name="invoice_id"]').val();
                $('.tenders_invoice_add').hide();
                $('.tenders_invoice_update').show();
                if(selectInvoiceId == invoiceId) {
                    $('.tenders_invoice_detail').show();
                } else {
                    QBZZ.Effect.insured.getInvoice(selectInvoiceId);
                }
            });
            //提交发票
            $('.main-insured-form').on('click','.add_invoice',function () {
                $('input[name="invoices_taxpayer_name"]').attr('value','');
                $('input[name="invoices_taxpayer_number"]').attr('value','');
                $('input[name="invoices_taxpayer_account"]').attr('value','');
                $('input[name="invoices_bank_account"]').attr('value','');
                $('input[name="invoices_phone"]').attr('value','');
                $('input[name="invoices_address"]').attr('value','');
                $('input[name="invoice_id"]').attr('value','');
                $('.tenders_invoice_add').show();
                $('.tenders_invoice_update').hide();
                $('.tenders_invoice_detail').show();
            });
            //提交添加发票
            $('.main-insured-form').on('click','.tenders_invoice_add',function () {
                QBZZ.Effect.insured.commitInvoice('add');
            });
            //修改发票
            $('.main-insured-form').on('click','.tenders_invoice_update',function () {
                QBZZ.Effect.insured.commitInvoice('update');
            });
            //取消发票
            $('.main-insured-form').on('click','.tenders_invoice_clear',function () {
                $('.tenders_invoice_detail').hide();
            });
            //选择发票信息
            $('.main-insured-form').on('click','select[name="tenders_invoice_id"]',function () {
                $('.tenders_invoice_detail').hide();
            });
        },
        
        getInvoice: function (invoiceId) {
            $.ajax({
                type: 'GET',
                url: '/insured/ajax/get/invoice',
                data: {'invoiceId': invoiceId},
                success: function(res) {
                    if (res && res.code === 200) {
                        if (res.data) {
                            $('input[name="invoices_taxpayer_name"]').attr('value',res.data.taxpayer_name);
                            $('input[name="invoices_taxpayer_number"]').attr('value',res.data.taxpayer_number);
                            $('input[name="invoices_taxpayer_account"]').attr('value',res.data.taxpayer_account);
                            $('input[name="invoices_bank_account"]').attr('value',res.data.bank_account);
                            $('input[name="invoices_phone"]').attr('value',res.data.phone);
                            $('input[name="invoices_address"]').attr('value',res.data.address);
                            $('input[name="invoice_id"]').attr('value',res.data.id);
                            $('.tenders_invoice_detail').show();
                        }
                    }
                }
            });
        },

        getInvoiceList: function (id) {
            var current = $('select[name="tenders_invoice_id"]');
            current.empty();
            $.ajax({
                type: 'GET',
                url: '/insured/ajax/get/invoice/list',
                data: {},
                success: function(res) {
                    if (res && res.code === 200) {
                        if (res.data) {
                            if (res.data && res.data.length > 0) {
                                var data = res.data;
                                var content = '';
                                for(var i=0 , length=data.length; i < length; i++ ){
                                    if(id == data[i].id) {
                                        content += '<option value="' + data[i].id + '" selected>' + data[i].taxpayer_name + '</option>';
                                    } else {
                                        content += '<option value="' + data[i].id + '">' + data[i].taxpayer_name + '</option>';
                                    }
                                }
                                current.append(content);
                            }
                        }
                    }
                }
            });
        },

        commitInvoice: function (type) {
            var taxpayerName = $('input[name="invoices_taxpayer_name"]').val();
            var taxpayerNumber = $('input[name="invoices_taxpayer_number"]').val();
            var taxpayerAccount = $('input[name="invoices_taxpayer_account"]').val();
            var bankAccount = $('input[name="invoices_bank_account"]').val();
            var phone = $('input[name="invoices_phone"]').val();
            var address = $('input[name="invoices_address"]').val();
            var id = $('input[name="invoice_id"]').val();
            $.ajax({
                type: 'POST',
                url: '/insured/ajax/commit/invoice',
                data: {
                    'taxpayerName': taxpayerName,
                    'taxpayerNumber': taxpayerNumber,
                    'taxpayerAccount': taxpayerAccount,
                    'bankAccount': bankAccount,
                    'phone': phone,
                    'address': address,
                    'id': id,
                    'type': type
                },
                success: function(res) {
                    if (res && res.code === 200) {
                        if (res.data) {
                            $('.tenders_invoice_detail').hide();
                            QBZZ.Effect.insured.getInvoiceList(res.data);
                        }
                    }
                }
            });
        },

        attachmentClear: function () {
            $('.main-insured-form').on('click','.attachment_clear',function () {
                $(this).parent().find('.attachment_name').empty();
                $(this).parent().find('input[name="attachment_url[]"]').attr('value','');
                $(this).parent().find('input[name="attachment_name[]"]').attr('value','');
            });
        },

        searchJobs: function () {
            $('.main-insured-form').on('change','select[name="jobsOne"]',function () {
                var id = parseInt($(this).val());
                var next = $('select[name="jobsTwo"]');
                var last = $('select[name="jobsThree"]');
                var contain = $('#product_jobs_result');
                next.empty();
                last.empty();
                contain.empty();
                if(id > 0) {
                    $.ajax({
                        type: 'GET',
                        url: '/insured/ajax/get/jobs',
                        data: {'id': id},
                        success: function (res) {
                            if (res && res.code === 200) {
                                QBZZ.Effect.insured.appendSearchJobs(res, next);
                            }
                        }
                    });
                }
            });

            $('.main-insured-form').on('change','select[name="jobsTwo"]',function () {
                var id = parseInt($(this).val());
                var next = $('select[name="jobsThree"]');
                next.empty();
                $('#product_jobs_result').empty();
                if(id > 0) {
                    $.ajax({
                        type: 'GET',
                        url: '/insured/ajax/get/jobs',
                        data: {'id': id},
                        success: function (res) {
                            if (res && res.code === 200) {
                                QBZZ.Effect.insured.appendSearchJobs(res, next);
                            }
                        }
                    });
                }
            });

            $('.main-insured-form').on('change','select[name="jobsThree"]',function () {
                var code = $(this).find('option:selected').data('code');
                var grade = $(this).find('option:selected').data('grade');
                var id = parseInt($(this).val());
                var current = $('#product_jobs_result');
                current.empty();
                if(id > 0) {
                    var result = '<tr> <td>' + code + '</td> <td>' + grade + '</td></tr>';
                    current.html(result);
                }
            });
        },

        appendSearchJobs: function (res, current) {
            if (res.data) {
                var data = res.data;
                var content = '<option>请选择</option>';
                for(var i=0 , length=data.length; i < length; i++ ){
                    content += '<option value="' + data[i].id + '" data-code="' + data[i].code + '" data-grade="' + data[i].grade + '">' + data[i].name + '</option>';
                }
                current.append(content);
            }
        },
        
        changeCurrency: function () {
            $('.main-insured-form').on('change','.tenders_currency_id',function () {
                var currencyId = $(this).val();
                $('.tenders_currency').val(currencyId);
            });
        },
    }
})(window, jQuery);

$(function () {
    QBZZ.Effect.insured.startUp();
})