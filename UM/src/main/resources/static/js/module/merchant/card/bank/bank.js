"use strict";

/**
 * Created by sunnysen on 2018/6/27
 * 商家银行账户 列表.
 */
function JBSFrame_bank() {

    JBSFrame.call(this);

    this.filter = {}; //筛选过滤条件

    this.subTable = null;

    //初始化UI
    this.initUI = function () {

        //列表
        this.table = ReactDOM.render(React.createElement(BankTable, {
            searchData: this.filter
        }), document.getElementById("component-table"));

        var self = this;
    };
}

/*
 //body load
 --------------------------------------------------------------------*/
var tps_bank;
$(document).ready(function (e) {
    tps_bank = new JBSFrame_bank();
    //初始化UI
    tps_bank.initUI();
});

//查询表格
function search_table() {
    tps_bank.filter.merchantName = $("#filter-merchantName").val();
    tps_bank.table.reloadTable(tps_bank.filter);
}