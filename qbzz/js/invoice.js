//索要发票
$(document).on("click",".invoicehave",function(){

	$(".applicant_id").val($(this).data("applicant"));
	$(".tender_id").val($(this).data("tender"));
	$(".all_fix").show();
	if($(this).data('invoices_type') != 1){
		$(".invoice_fix").show();
		$(".invoice-page1").show();
		$(".invoice-page1 .invoice-type-spc label input").eq(0).attr("checked",true);
		$(".invoice_fix .invoice-page2").hide();
	}else{
		$(".invoiceagin_fix").show();
	}
});

$(document).on("click",".no,.all-no,.end-finish",function(){ 
	$(".all_fix").hide();
	$(".invoice-fix").hide();
	$(".invoiceagin_fix").hide();
	$(".invoice_fix input").val("");
	$(".invoice-page1 .Validform_checktip").html("");
});

$(".invoiceform").Validform({
    tiptype: 4,
    btnSubmit:".end-bt", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
    ignoreHidden:true,
    ajaxPost:true,
    datatype:{ 
    	'name':/^[\u4E00-\u9FA5\w()（）\-\.(^\s*)]+$/,
        'phone':/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{2}-\d{7}$|^0\d{3}-\d{7}$|^0\d{3}-\d{8}$/,
        'number':/^[a-z0-9]+$/,
        'price':/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$/
    },
    callback:function(data){
		if(data.code==200){
			$(".invoice-page1").hide();
			$(".invoice_fix .invoice-page2").show();
			$("#"+$(".applicant_id").val()).data('invoices_type',1);
		}
    }
});


	

//$(".end-bt").click(function(){
//	$.post("/insured/submit_invoice",$(".invoiceform").serialize(),function(data){
//		if(data.code==200){
//			$(".invoice-page1").hide();
//			$(".invoice_fix .invoice-page2").show();
//			$("#"+$(".applicant_id").val()).data('invoices_type',1);
//		}
//		
//	},'json');
//});



