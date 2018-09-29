"use strict";

/**
 * Created by zhangxiuzhi on 2018/6/22
 * 用户列表.
 */

function JBSFrame_user() {
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
var tps_user;
$(document).ready(function (e) {
    tps_user = new JBSFrame_user();
    //初始化UI
    tps_user.initUI();

    $("#export").click(function () {
        tps_user.filter.tradeinfoId = $("#filter-tradeinfoId").val();
        tps_user.filter.extSegnoName = $("#filter-extSegnoName").val();
        tps_user.filter.extContactName = $("#filter-extContactName").val();
        tps_user.filter.extContactTel = $("#filter-extContactTel").val();
        tps_user.filter.extVehicleNum = $("#filter-extVehicleNum").val();
        tps_user.filter.status = $("#filter-status").val();
        tps_user.filter.settleType = $("#filter-settleType").val();
        tps_user.filter.createDateStart = $("#filter-createDateStart").val();
        tps_user.filter.createDateEnd = $("#filter-createDateEnd").val();

        window.location.href = "http://localhost:8090/consume/excel?tradeinfoId=" + tps_user.filter.tradeinfoId + "&extSegnoName=" + tps_user.filter.extSegnoName + "&extContactName=" + tps_user.filter.extContactName + "&extContactTel=" + tps_user.filter.extContactTel + "&extVehicleNum=" + tps_user.filter.extVehicleNum + "&status=" + tps_user.filter.status + "&settleType=" + tps_user.filter.settleType + "&createDateStart=" + tps_user.filter.createDateStart + "&createDateEnd=" + tps_user.filter.createDateEnd;
    });
});

//查询表格
function search_table() {
    tps_user.filter.tradeinfoId = $("#filter-tradeinfoId").val();
    tps_user.filter.extSegnoName = $("#filter-extSegnoName").val();
    tps_user.filter.extContactName = $("#filter-extContactName").val();
    tps_user.filter.extContactTel = $("#filter-extContactTel").val();
    tps_user.filter.extVehicleNum = $("#filter-extVehicleNum").val();
    tps_user.filter.status = $("#filter-status").val();
    tps_user.filter.settleType = $("#filter-settleType").val();
    tps_user.filter.createDateStart = $("#filter-createDateStart").val();
    tps_user.filter.createDateEnd = $("#filter-createDateEnd").val();

    tps_user.table.reloadTable(tps_user.filter);
}