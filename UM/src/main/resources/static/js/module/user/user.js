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
});

//查询表格
function search_table() {
    tps_user.filter.goodsName = $("#comp-grm-goodsName-text").val();
    tps_user.filter.spec = $("#comp-grm-specRatio-text").val();
    tps_user.filter.material = $("#comp-grm-material-text").val();
    tps_user.filter.cardId = $("#filter-cardId").val();
    tps_user.filter.storeId = $("#filter-storeId").val();
    tps_user.filter.minThickness = $("#filter-minThickness").val();
    tps_user.filter.maxThickness = $("#filter-maxThickness").val();
    tps_user.filter.minWidth = $("#filter-minWidth").val();
    tps_user.filter.maxWidth = $("#filter-maxWidth").val();
    tps_user.filter.minLength = $("#filter-minLength").val();
    tps_user.filter.maxLength = $("#filter-maxLength").val();
    tps_user.filter.pdArea = $("#filter-pdArea").val();
    tps_user.filter.depId = $("#filter-dep-id").val();
    tps_user.filter.supplyNumOperator = $("#filter-supplyNum-operator").val();
    var pSupplyNum = $("#filter-supplyNum").val();
    if (pSupplyNum == "") {
        tps_user.filter.supplyNum = "0";
    } else {
        tps_user.filter.supplyNum = pSupplyNum;
    }

    tps_user.filter.podId = $("#filter-podId").val();

    tps_user.table.reloadTable(tps_user.filter);
}