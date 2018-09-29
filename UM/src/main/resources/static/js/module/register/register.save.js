"use strict";

/**
 * Created by zhangxiuzhi on 2018/6/22
 * 用户列表.
 */

function JBSFrame_register() {
    JBSFrame.call(this);
}
/*
 //body load
 --------------------------------------------------------------------*/
var tps_register;
$(document).ready(function (e) {
    tps_register = new JBSFrame_register();
    //初始化UI
    tps_register.initUI();
});

function saveBtn() {
    // var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
    tps_register.ajaxRequest({
        url: "/page/save",
        data: {
            companyName: $("#re_companyName").val(),
            companyShortName: $("#re_companyShortName").val(),
            companyLoginName: $("#re_loginName").val(),
            companyLoginPwd: $("#re_password").val(),
            companyContactName: $("#re_companyContactName").val(),
            companyContactTel: $("#re_companyContactTel").val(),
            // localPath1ath1:fileObj,
            companyTax: $("#re_companyTax").val(),
            companyAddress: $("#re_companyAddress").val()

        }
    }, function () {
        notification("注册成功", function () {
            window.location = "/user/";
        });
    });
}