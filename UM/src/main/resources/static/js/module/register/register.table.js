"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 描述:
 *
 * @author gemaochao
 * @create 2018-06-27 8:51
 */
function JBSFrame_register() {
    JBSFrame.call(this);
}

var UserTable = function (_React$Component) {
    _inherits(UserTable, _React$Component);

    function UserTable(props) {
        _classCallCheck(this, UserTable);

        var _this = _possibleConstructorReturn(this, (UserTable.__proto__ || Object.getPrototypeOf(UserTable)).call(this, props));

        _this.thead = [{ dataField: "registerId", dataName: "操作", width: 40, dataFormat: formatOperation }, { dataField: "companyName", dataName: "公司名称", width: 110 }, { dataField: "companyShortName", dataName: "公司简称", width: 120 }, { dataField: "companyContactName", dataName: "联系人名称", width: 120 }, { dataField: "companyContactTel", dataName: "联系人手机号", width: 120 }, { dataField: "companyTax", dataName: "社会信用代码", width: 110 }, { dataField: "companyNature", dataName: "公司属性", width: 110, dataFormat: companyNatureFormatOperation }, { dataField: "companyPreference", dataName: "用户分类", width: 110, dataFormat: companyPreferenceFormatOperation }, { dataField: "localPath1", dataName: "企业营业执照", width: 110, dataFormat: localPath1FormatOperation }, { dataField: "companyAddress", dataName: "公司地址", width: 110 }, { dataField: "companyStatus", dataName: "状态", width: 110, dataFormat: companyStatusFormatOperation }, { dataField: "createDate", dataName: "注册时间", width: 110, dataFormat: function dataFormat(d) {
                return jbsframe.formatDateTime(d);
            } }, { dataField: "modifyDate", dataName: "修改时间", width: 110, dataFormat: function dataFormat(d) {
                return jbsframe.formatDateTime(d);
            } }, { dataField: "modifyPerson", dataName: "操作人", width: 110, dataFormat: modifyPersonFormatOperation }, { dataField: "companyStatus", dataName: "操作", width: 110, dataFormat: auditFormatOperation }];
        _this.state = {
            data: [],
            page: 1,
            size: 10,
            total: 100,
            searchData: {}
        };
        _this.reloadTable = _this.reloadTable.bind(_this);
        return _this;
    }

    _createClass(UserTable, [{
        key: "reloadTable",
        value: function reloadTable(_searchData) {
            this.refs.jtable.reloadTable(_searchData);
        }
    }, {
        key: "render",
        value: function render() {
            var datas = this.state.data;
            var options = {
                url: "/page/listDate", //数据请求url
                thead: this.thead, //表头
                status: this.props.status, //状态
                searchData: this.props.searchData, //过滤搜索条件
                pageNum: this.state.page || 1, //当前第几页
                sizePerPage: this.state.size || 10, //每页显示多少条
                totalSize: this.state.total || 100,
                nodata: { text: "没有数据" }, //无数据时显示
                customRenderFinishCallBack: function customRenderFinishCallBack() {
                    // alert(111);
                }
            };
            return React.createElement(ComponentJTable, { options: options, datas: datas, ref: "jtable" });
        }
    }]);

    return UserTable;
}(React.Component);
//格式化时间


undefined.formatDateTime = function (timestamp) {
    return timestamp == "" || timestamp == null || timestamp == "null" ? "" : new Date(Number(timestamp)).pattern("yyyy-MM-dd HH:mm:ss");
};
undefined.formatDate = function (timestamp) {
    return timestamp == "" || timestamp == null || timestamp == "null" ? "" : new Date(Number(timestamp)).pattern("yyyy-MM-dd");
};
function companyPreferenceFormatOperation(companyPreference) {
    if (companyPreference === "01") {
        return "商户";
    }

    if (companyPreference === "02") {
        return "消费者";
    }

    return "";
}
function companyStatusFormatOperation(companyStatus) {
    if (companyStatus === "00") {
        return "冻结";
    }
    if (companyStatus === "10") {
        return "未审核";
    }
    if (companyStatus === "20") {
        return "已审核";
    }
    return "";
}

function companyNatureFormatOperation(companyNature) {
    if (companyNature === "GS") {
        return "公司";
    }
    return "个人";
}
function localPath1FormatOperation(localPath1) {
    if (localPath1 === "") {
        return "未上传";
    }
    return "营业执照.jpg";
}

//操作人modifyperson在user表中对应名字
function modifyPersonFormatOperation(modifyPerson) {
    var username;
    tps_register.ajaxRequest({
        async: false,
        url: "/page/modifyPerson/" + modifyPerson
    }, function (data, success) {
        username = success;
    });
    return username;
}
function auditFormatOperation(companyStatus, register) {
    var auditName = "error";
    var html = "";
    if (companyStatus === "00") {
        auditName = "冻结";
        html += "<span style='background:blue' onclick='' class='ui-btn'>" + auditName + "</span>";
        return html;
    }
    if (companyStatus === "10") {
        auditName = "通过审核";
        html += "<span style='background: green' onclick='upgradeUser(" + register.registerId + ")'class='btn-blue' >" + auditName + "</span>";
        return html;
    }
    if (companyStatus === "20") {
        auditName = "撤销审核";
        html += "<span style='background: red' onclick='upgrade(" + register.registerId + ")' class='btn-blue'>" + auditName + "</span>";
        return html;
    }
    return html;
}

var tps_register;
$(document).ready(function (e) {
    tps_register = new JBSFrame_register();
    //初始化UI
    tps_register.initUI();
});
//修改营业执照
function formatOperation(registerId) {
    var html = "";
    html += "<a href='/page/edit/" + registerId + "'  class='ui-link-icon fal fa-pencil-alt ' data-tabname='" + registerId + "' data-tabtype='edit' data-tabtitle='营业执照修改(" + registerId + ")' title='修改营业执照'></a>";
    return html;
}
//审核操作功能
//通过审核
function upgradeUser(registerId) {
    var msg = "你确定审核通过该商家吗?";
    confirm(msg, audit(registerId)); //?
}
//撤销审核
function upgrade(registerId) {
    var msg2 = "你确定撤销审核该商家吗?";
    notification(msg2, audit(registerId));
}
//修改审核状态
function audit(registerId) {
    tps_register.ajaxRequest({
        url: "/page/audit/" + registerId
    }, function () {
        notification("修改成功", function () {
            tps_register.table.reloadTable();
        });
    });
}