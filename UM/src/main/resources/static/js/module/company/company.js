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

var setting = {
    view: { expandSpeed: "",
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
        selectedMulti: false
    },
    edit: {
        enable: true
    },
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        onDblClick: zTreeOnDblClick,
        onCheck: onCheck
    }
};

var setting2 = {
    view: { expandSpeed: "",
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
        selectedMulti: false
    },
    edit: {
        enable: true
    },
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeRemove: beforeRemove,
        onDblClick: zTreeOnDblClick2
    }
};

function onCheck(e, treeId, treeNode) {
    var parentNode = treeNode.getParentNode();
    tps_user.ajaxRequest({
        url: "/business/assign",
        data: {
            companyUserId: 1,
            businesstypeName: treeNode.name,
            businesstypeCode: treeNode.businesstypeCode,
            ifEnd: 1,
            parentBusinesstypeId: parentNode.businesstypeId,
            businessLevel: 2,
            companyId: 1,
            businesstypeType: "GS"
        }
    }, function (data) {
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        for (var i in data) {
            var newNode = { businesstypeId: data[i].businesstypeId, name: data[i].businesstypeName, businesstypeCode: data[i].businesstypeCode };
            treeObj.addNodes(treeNode, newNode);
        }
    });
}

function zTreeOnDblClick(event, treeId, treeNode) {
    tps_user.ajaxRequest({
        url: "/business/find",
        data: {
            companyUserId: 1,
            parentBusinessTypeId: treeNode.businesstypeId
        }
    }, function (data) {
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        for (var i in data) {
            var newNode = { businesstypeId: data[i].businesstypeId, name: data[i].businesstypeName, businesstypeCode: data[i].businesstypeCode };
            treeObj.addNodes(treeNode, newNode);
        }
    });
};

function zTreeOnDblClick2(event, treeId, treeNode) {
    tps_user.ajaxRequest({
        url: "/business/findAssignedByCompanyId",
        data: {
            companyUserId: 1,
            parentBusinessTypeId: treeNode.businesstypeId
        }
    }, function (data) {
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo2");
        for (var i in data) {
            var newNode = { businesstypeId: data[i].businesstypeId, name: data[i].businesstypeName, businesstypeCode: data[i].businesstypeCode };
            treeObj.addNodes(treeNode, newNode);
        }
    });
};

function filter(treeId, parentNode, childNodes) {
    if (!childNodes) return null;
    for (var i = 0, l = childNodes.length; i < l; i++) {
        childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
    }
    return childNodes;
}
function beforeRemove(treeId, treeNode) {
    tps_user.ajaxRequest({
        url: "/business/delete",
        data: {
            companyUserId: 1,
            parentBusinessTypeId: '000'
        }
    }, function (data) {});

    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.selectNode(treeNode);
    return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
}
function beforeRename(treeId, treeNode, newName) {
    if (newName.length == 0) {
        setTimeout(function () {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.cancelEditName();
            alert("节点名称不能为空.");
        }, 0);
        return false;
    }
    return true;
}

var newCount = 1;
function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='add node' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    var btn = $("#addBtn_" + treeNode.tId);
    if (btn) btn.bind("click", function () {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.addNodes(treeNode, { id: 100 + newCount, pId: treeNode.id, name: "new node" + newCount++ });
        return false;
    });
};
function removeHoverDom(treeId, treeNode) {
    $("#addBtn_" + treeNode.tId).unbind().remove();
};

$(document).ready(function (e) {
    tps_user = new JBSFrame_user();
    //初始化UI
    tps_user.initUI();

    $.fn.zTree.init($("#treeDemo"), setting);

    $.fn.zTree.init($("#treeDemo2"), setting2);

    tps_user.ajaxRequest({
        url: "/business/find",
        data: {
            companyUserId: 1,
            parentBusinessTypeId: '000'
        }
    }, function (data) {
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        for (var i in data) {
            var newNode = { businesstypeId: data[i].businesstypeId, name: data[i].businesstypeName, businesstypeCode: data[i].businesstypeCode };
            treeObj.addNodes(null, newNode);
        }
    });

    tps_user.ajaxRequest({
        url: "/business/findAssignedByCompanyId",
        data: {
            companyUserId: 1,
            parentBusinessTypeId: '000'
        }
    }, function (data) {
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo2");
        for (var i in data) {
            var newNode = { businesstypeId: data[i].businesstypeId, name: data[i].businesstypeName, businesstypeCode: data[i].businesstypeCode };
            treeObj.addNodes(null, newNode);
        }
    });
});

//查询表格
function search_table() {
    tps_user.filter.companyContactName = $("#filter-companyContactName").val();
    tps_user.filter.companyShortName = $("#filter-companyShortName").val();

    tps_user.table.reloadTable(tps_user.filter);
}