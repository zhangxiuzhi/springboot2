"use strict";

/**
 * Created by zhangxiuzhi on 2018/6/22
 * 用户列表.
 */

function JBSFrame_merchant() {
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
var tps_merchant;
$(document).ready(function (e) {
    tps_merchant = new JBSFrame_merchant();
    //初始化UI
    tps_merchant.initUI();
});

//查询表格
function search_table() {
    tps_merchant.filter.goodsType = $("#filter-goodsType").val();
    tps_merchant.table.reloadTable(tps_merchant.filter);
}