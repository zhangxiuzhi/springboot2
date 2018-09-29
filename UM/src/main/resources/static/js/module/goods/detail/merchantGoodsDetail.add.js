"use strict";

function JBSFrame_merchantGoodsDetail_add() {
    JBSFrame.call(this);

    //初始化UI
    this.initUI = function () {

        //表单验证
        this.formValidate("#form-merchantGoodsDetail", function (form) {
            tps_merchantGoodsDetail_add.ajaxRequest({
                url: "/goods/detail/save",
                data: form
            }, function (data, msg) {
                notification("保存成功", function () {
                    window.location = "/goods/detail/";
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
var tps_merchantGoodsDetail_add;
$(document).ready(function (e) {
    tps_merchantGoodsDetail_add = new JBSFrame_merchantGoodsDetail_add();
    //初始化UI
    tps_merchantGoodsDetail_add.initUI();
});