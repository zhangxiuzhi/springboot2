"use strict";

function JBSFrame_merchant_add() {
    JBSFrame.call(this);

    //初始化UI
    this.initUI = function () {

        //表单验证
        this.formValidate("#form-merchant", function (form) {
            tps_merchant_add.ajaxRequest({
                url: "/merchantUser/update",
                data: form
            }, function (data, msg) {
                notification("保存成功", function () {
                    // var id = $("input[name='companyBankId']").val();
                    window.location = "/merchantUser/";
                    //window.location = "/bank/view/"+$("input[name='invoiceId']").val();
                });
            }, function (data, msg) {
                alert(msg);
            });
        });
    };

    var self = this;
}

/*
 //body load
 --------------------------------------------------------------------*/
var tps_merchant_add;
$(document).ready(function (e) {
    tps_merchant_add = new JBSFrame_merchant_add();
    //初始化UI
    tps_merchant_add.initUI();
});