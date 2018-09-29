"use strict";

/**
 * Created by zhangxiuzhi on 2018/6/22
 * 用户列表.
 */

function JBSFrame_merchantUser() {
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
var tps_merchantUser;
$(document).ready(function (e) {
    tps_merchantUser = new JBSFrame_merchantUser();
    //初始化UI
    tps_merchantUser.initUI();
});