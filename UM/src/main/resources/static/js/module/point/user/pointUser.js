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

        esteel_appBar.setBreadCrumbs(["点卡明细", "用户消费明细"]);

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
    tps_user.filter.userName = $("#filter-userName").val();
    tps_user.filter.merchantName = $("#filter-merchantName").val();
    tps_user.filter.searchFrom = $("#filter-searchFrom").val();
    tps_user.filter.searchTo = $("#filter-searchTo").val();

    tps_user.table.reloadTable(tps_user.filter);
}