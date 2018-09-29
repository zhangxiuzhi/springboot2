"use strict";

/**
 * Created by Sunnysen on 2018/06/28.
 * 银行卡维护
 */

function JBSFrame_bank_add() {
    JBSFrame.call(this);

    //初始化UI
    this.initUI = function () {

        //表单验证
        this.formValidate("#form-bank", function (form) {
            tps_bank_add.ajaxRequest({
                url: "/productType/add/save/",
                data: form
            }, function (data, msg) {
                notification("保存成功", function () {
                    var id = $("input[name='id']").val();
                    window.location = "/productType/redirect";
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
var tps_bank_add;
$(document).ready(function (e) {
    tps_bank_add = new JBSFrame_bank_add();
    //初始化UI
    tps_bank_add.initUI();
});
function unitPriceCheck() {
    var price = document.getElementById("unitPrice").value;
    var reg = /^\d+(\.\d{2})?$/;
    if (price != "" && !reg.test(price)) {
        alert("输入不合法！");
        return false;
    } else {
        return true;
    }
}