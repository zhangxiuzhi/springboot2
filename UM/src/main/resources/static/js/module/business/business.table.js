"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by Sunnysen on 2018/6/25
 * 平台商家服务维护 列表.
 */

var BusinessTable = function (_React$Component) {
    _inherits(BusinessTable, _React$Component);

    function BusinessTable(props) {
        _classCallCheck(this, BusinessTable);

        var _this = _possibleConstructorReturn(this, (BusinessTable.__proto__ || Object.getPrototypeOf(BusinessTable)).call(this, props));

        _this.thead = [{ dataField: "businesstypeId", dataName: "操作", width: 90, dataFormat: formatOperation }, { dataField: "companyName", dataName: "商家名称", width: 110 }, { dataField: "contactName", dataName: "商家联系人", width: 110 }, { dataField: "contactTel", dataName: "商家联系人电话", width: 110 }, { dataField: "businesstypeName", dataName: "消费类型", width: 120 }, { dataField: "property1", dataName: "单价", width: 200 }, { dataField: "createDate", dataName: "创建时间", width: 200, dataFormat: function dataFormat(d) {
                return jbsframe.formatDateTime(d);
            } }, { dataField: "statusDsc", dataName: "状态", width: 120 }, { dataField: "modifyDate", dataName: "修改时间", width: 120, dataFormat: function dataFormat(d) {
                return jbsframe.formatDateTime(d);
            } }, { dataField: "modifyPersonName", dataName: "修改人", width: 120 }];
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

    _createClass(BusinessTable, [{
        key: "reloadTable",
        value: function reloadTable(_searchData) {
            this.refs.jtable.reloadTable(_searchData);
        }
    }, {
        key: "render",
        value: function render() {
            var datas = this.state.data;
            var options = {
                url: "/business/listData", //数据请求url
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

    return BusinessTable;
}(React.Component);

function formatOperation(cell, row) {
    var html = "<a href='javascript:void(0)' onclick='showDialog(this)' data-rowdata='" + JSON.stringify(row) + "'data-toggle='modal' data-target='#modal-changePrice' class='ui-link-icon fal fa-pencil-alt' title='修改单价'></a>";
    return html;
}

function showDialog(self) {
    var rowdata = $(self).data("rowdata");
    $("input[name='property1']").val(rowdata.property1);
    $("input[name='businesstypeId']").val(rowdata.businesstypeId);
    // $("#modal-packageAdjust").modal("show");
}