"use strict";

/**
 * Created by zhangxiuzhi on 2018/6/22
 * 用户列表.
 */

function JBSFrame_merchantGoodsDetail() {
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
var tps_merchantGoodsDetail;
$(document).ready(function (e) {
    tps_merchantGoodsDetail = new JBSFrame_merchantGoodsDetail();
    //初始化UI
    tps_merchantGoodsDetail.initUI();
});

//查询表格
function search_table() {
    tps_merchantGoodsDetail.filter.merchantName = $("#filter-merchantName").val();
    tps_merchantGoodsDetail.table.reloadTable(tps_merchantGoodsDetail.filter);
}