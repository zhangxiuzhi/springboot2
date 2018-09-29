"use strict";

function JBSFrame_merchant_add() {
    JBSFrame.call(this);

    //初始化UI
    this.initUI = function () {

        表单验证
        this.formValidate("#form-merchant", function (form) {
            tps_merchant_add.ajaxRequest({
                url: "/goods/add/save",
                data: form
            }, function (data, msg) {
                notification("保存成功", function () {
                    window.location = "/goods/redirect";
                });
            }, function (data, msg) {
                alert(msg);
            });
        }
        );
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
function merchantSubmit() {
    confirm(null,"确认修改嘛",function () {
       tps_merchant_add.ajaxRequest({
           url:'/goods/edit/save',
           data:$('#form-merchant').serialize(),
           datatype:'json',
       },function () {
           notification("修改成功",function () {
               window.location = '/goods/redirect';
           });
       });
    });
}
function goodsAdd() {
    confirm(null,"确认新增此条商品种类嘛？",function () {
        tps_merchant_add.ajaxRequest({
            url:'/goods/add/save',
            datatype:"json",
            data:$("#form-goodsType").serialize(),
        },function () {
            notification("新增商品种类成功",function () {
                window.location = "/goods/redirect";
            })
        })
    })
}