"use strict";

/**
 * Created by zhangxiuzhi on 2018/6/22
 * 用户列表.
 */

function JBSFrame_register() {
    JBSFrame.call(this);

    this.filter = {}; //筛选过滤条件
    this.subTable = null;

    //初始化UI
    this.initUI = function () {

        //列表
        this.table = ReactDOM.render(React.createElement(UserTable, {
            searchData: this.filter
        }), document.getElementById("component-table"));

        var self = this;
    };
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

// //注册表格
// function register_table() {
//     tps_register.filter.companyName = $("#filter-companyName").val();
//     tps_register.filter.companyContactName = $("#filter-companyContactName").val();
//     tps_register.filter.companyContactTel = $("#filter-companyContactTel").val();
//     tps_register.filter.companyLoginName = $("#filter-companyLoginName").val();
//     tps_register.filter.companyTax = $("#filter-companyTax").val();
//     tps_register.filter.companyAddress = $("#filter-companyAddress").val();
//     tps_register.filter.companyLoginPwd = $("#filter-companyLoginPwd").val();
//     tps_register.filter.companyShortName = $("#filter-companyShortName").val()
//
//     tps_register.table.reloadTable(tps_register.filter);
// }
//查询表格
function search_table() {
    tps_register.filter.companyName = $("#filter-companyName").val();
    tps_register.filter.companyContactName = $("#filter-companyContactName").val();
    tps_register.filter.companyContactTel = $("#filter-companyContactTel").val();
    tps_register.filter.companyTax = $("#filter-companyTax").val();
    tps_register.filter.companyAddress = $("#filter-companyAddress").val();
    tps_register.filter.companyStatustatus = $("#filter-companyStatus").val();
    tps_register.filter.createDateStart = $("#filter-createDateStart").val();
    tps_register.filter.createDateEnd = $("#filter-createDateEnd").val();

    tps_register.table.reloadTable(tps_register.filter);
}