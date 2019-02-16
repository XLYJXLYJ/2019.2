'use strict';
var QBZZ = window.QBZZ || {};
QBZZ.Effect = QBZZ.Effect || {};
(function (window, $) {
    QBZZ.Effect.maintenance = {
        startUp: function () {
            this.insuredInvoiceOperate();
            this.insuredPayOperate();
            this.insuranceInvoiceOperate();
            this.insurancePayOperate();
            this.maintenanceCorrectPost();
            this.maintenanceReparationPost();
        },

        insuredInvoiceOperate: function () {
            $('#insuredForm').on("click", ".insured-invoice-operate", function () {
                var $this = $(this);
                var id = $this.data('id');
                $.ajax({
                    type: 'Post',
                    url: '/insured/maintenance/price/ajax/invoice/commit',
                    dataType: 'json',
                    data: {'id': id},
                    success: function(res) {
                        if (res && res.code === 200) {
                            $this.parent().find('input[name="invoice"]').attr('value',"已收到");
                            $this.remove();
                        }
                    }
                });
            });
        },

        insuredPayOperate: function () {
            $('#insuredForm').on("click", ".insured-pay-operate", function () {
                var $this = $(this);
                var id = $this.data('id');
                $.ajax({
                    type: 'Post',
                    url: '/insured/maintenance/price/ajax/pay/commit',
                    dataType: 'json',
                    data: {'id': id},
                    success: function(res) {
                        if (res && res.code === 200) {
                            $this.parent().find('input[name="pay"]').attr('value',"已支付");
                            $this.remove();
                        }
                    }
                });
            });
        },

        insuranceInvoiceOperate: function () {
            $('#insuredForm').on("click", ".insurance-invoice-operate", function () {
                var $this = $(this);
                var id = $this.data('id');
                $.ajax({
                    type: 'Post',
                    url: '/insurance/maintenance/price/ajax/invoice/commit',
                    dataType: 'json',
                    data: {'id': id},
                    success: function(res) {
                        if (res && res.code === 200) {
                            $this.parent().find('input[name="invoice"]').attr('value',"已寄出");
                            $this.remove();
                        }
                    }
                });
            });
        },

        insurancePayOperate: function () {
            $('#insuredForm').on("click", ".insurance-pay-operate", function () {
                var $this = $(this);
                var id = $this.data('id');
                $.ajax({
                    type: 'Post',
                    url: '/insurance/maintenance/price/ajax/pay/commit',
                    dataType: 'json',
                    data: {'id': id},
                    success: function(res) {
                        if (res && res.code === 200) {
                            $this.parent().find('input[name="pay"]').attr('value',"已收讫");
                            $this.remove();
                        }
                    }
                });
            });
        },

        maintenanceCorrectPost: function () {
            $('#maintenanceCorrect').on('click','.correct-post-commit',function () {
                var $this = $(this);
                var id = $this.data('id');
                var type = $this.data('type');
                var url = '/insured/maintenance/correct/ajax/post/commit';
                if(type == 'sendPost') {
                    url = '/insurance/maintenance/correct/ajax/post/commit';
                }
                $.ajax({
                    type: 'Post',
                    url: url,
                    dataType: 'json',
                    data: {'id': id, 'type' : type},
                    success: function(res) {
                        if (res && res.code === 200) {
                            if(res.data == 2) {
                                $this.parent().find('p').html("批单已寄出");
                            } else if(res.data == 3) {
                                $this.parent().find('p').html("批单已收到");
                            }
                            $this.remove();
                        }
                    }
                });
            });
        },

        maintenanceReparationPost: function () {
            $('#maintenanceReparation').on('click','.reparation-post-commit',function () {
                var $this = $(this);
                var id = $this.data('id');
                var type = $this.data('type');
                var url = '/insured/maintenance/reparation/ajax/post/commit';
                if(type == 'sendPost') {
                    url = '/insurance/maintenance/reparation/ajax/post/commit';
                }
                $.ajax({
                    type: 'Post',
                    url: url,
                    dataType: 'json',
                    data: {'id': id, 'type' : type},
                    success: function(res) {
                        if (res && res.code === 200) {
                            if(res.data == 2) {
                                $this.parent().find('p').html("结案证明已寄出");
                            } else if(res.data == 3) {
                                $this.parent().find('p').html("结案证明已签回");
                            }
                            $this.remove();
                        }
                    }
                });
            });
        },
    };
    
})(window, jQuery);

$(function () {
    QBZZ.Effect.maintenance.startUp();
})