"use strict";

/**
 * Created by sunnysen on 2018/6/25
 * 平台商家服务维护 列表.
 */
function JBSFrame_business() {

    JBSFrame.call(this);

    this.filter = {}; //筛选过滤条件

    this.subTable = null;

    //初始化UI
    this.initUI = function () {

        //列表
        this.table = ReactDOM.render(React.createElement(BusinessTable, {
            searchData: this.filter
        }), document.getElementById("component-table"));

        var self = this;
    };
}

/*
 //body load
 --------------------------------------------------------------------*/
var tps_business;
$(document).ready(function (e) {
    tps_business = new JBSFrame_business();
    //初始化UI
    tps_business.initUI();
});

//查询表格
function search_table() {
    tps_business.filter.companyContactName = $("#filter-companyContactName").val();
    tps_business.filter.companyShortName = $("#filter-companyShortName").val();
    tps_business.filter.businesstypeName = $("#filter-businesstypeName").val();
    tps_business.filter.status = $("#filter-status").val();
    tps_business.filter.rqStart = $("#filter-rqStart").val();
    tps_business.filter.rqEnd = $("#filter-rqEnd").val();

    tps_business.table.reloadTable(tps_business.filter);
}

function savePrice() {
    var price = $("input[name='property1']").val();
    var businesstypeId = $("input[name='businesstypeId']").val();
    confirm(null, "确认修改", function () {
        tps_business.ajaxRequest({
            url: "/business/savePrice",
            data: {
                property1: price,
                businesstypeId: businesstypeId
            }
        }, function () {
            $("#modal-changePrice").modal("hide");
            notification("变更成功", function () {
                $("input[name='property1']").val("");
                $("input[name='businesstypeId']").val("");
                tps_business.table.reloadTable();
            });
        });
    });
}