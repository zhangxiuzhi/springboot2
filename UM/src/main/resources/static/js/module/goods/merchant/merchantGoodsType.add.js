"use strict";

/**
 * Created by Sunnysen on 2018/06/28.
 * 银行卡维护
 */

function JBSFrame_bank_add() {
    JBSFrame.call(this);

    //初始化UI
    this.initUI = function () {

        // //表单验证
        // this.formValidate("#form-bank", function (form) {
        //     tps_bank_add.ajaxRequest({
        //         url: "/goods/merchant/add/save/",
        //         datatype: 'json',
        //         data: form
        //     }, function (data, msg) {
        //         notification("保存成功", function () {
        //             var id = $("input[name='id']").val();
        //             window.location = "/goods/merchant/redirect";
        //         });
        //     }, function (data, msg) {
        //         alert(msg);
        //     });
        // });
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
function merchantGoodsAdd() {
    confirm(null,"确认新增此条信息嘛",function () {
        tps_bank_add.ajaxRequest({
            url:'/goods/merchant/add/save',
            datatype:'json',
            data:$("#form-bank").serialize(),
        },function () {
            notification("新增成功",function () {
                window.location = "/goods/merchant/redirect";
            })
        })
    })
}