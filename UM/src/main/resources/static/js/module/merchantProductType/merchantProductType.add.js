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
                url: "/merchantProductType/add/save/",
                datatype: 'json',
                data: form
            }, function (data, msg) {
                notification("保存成功", function () {
                    var id = $("input[name='id']").val();
                    window.location = "/merchantProductType/redirect";
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
function editSave() {
    var id = document.getElementById("id").value;
    var price = document.getElementById("unitPrice").value;
    alert(id + "  " + price);
    notification("确认修改该商品价格嘛", function () {
        tps_bank_add.ajaxRequest({
            url: "/merchantProductType/edit/save",
            data: {
                id: id,
                unitPrice: price
            },
            method: "get",
            datatype: "json"
        }, function (data, msg) {
            notification("修改价格成功", function () {
                window.location = "/merchantProductType/redirect";
            });
        });
    });
}

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