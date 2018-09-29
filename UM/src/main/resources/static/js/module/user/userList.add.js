"use strict";

/**
 * Created by Sunnysen on 2018/06/28.
 * 银行卡维护
 */

function JBSFrame_bank_add() {
    JBSFrame.call(this);

    //初始化UI
    this.initUI = function () {
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
function userAddCheck() {
    var userName = document.getElementById("userName").value;
    var phone = document.getElementById("phone").value;
    if (userName == ""||phone == ""){
        alert("输入不能为空！");
        return false;
    } else {
        return true;
    }
}
function userEditSave() {
    confirm(null,"确认修改该用户信息嘛？",function () {
        tps_bank_add.ajaxRequest({
            url:'/user/edit/save',
            datatype:'json',
            data:$("#edit-save-form").serialize(),
        },function () {
            notification("修改成功",function () {
                window.location = "/user/redirect";
            })
        })
    })
}
function userAddSave() {
    confirm(null,"确认注册新用户信息嘛？",function () {
        tps_bank_add.ajaxRequest({
            url:'/user/add/save',
            datatype:'json',
            data:$("#form-bank").serialize(),
        },function () {
            notification("注册成功",function () {
                window.location = "/user/redirect";
            })
        })
    })
}