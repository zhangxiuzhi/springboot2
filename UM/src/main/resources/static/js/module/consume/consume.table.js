"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by zhangxiuzhi on 2018/6/22
 * 用户列表.
 */

var UserTable = function (_React$Component) {
  _inherits(UserTable, _React$Component);

  function UserTable(props) {
    _classCallCheck(this, UserTable);

    var _this = _possibleConstructorReturn(this, (UserTable.__proto__ || Object.getPrototypeOf(UserTable)).call(this, props));

    _this.thead = [{ dataField: "tradeinfoId", dataName: "交易单号", width: 110 }, { dataField: "extSegnoName", dataName: "外部平台名称", width: 120 }, { dataField: "extContactName", dataName: "消费人", width: 120 }, { dataField: "extContactTel", dataName: "消费人电话", width: 120 }, { dataField: "extVehicleNum", dataName: "车牌号", width: 110 }, { dataField: "extContactNo", dataName: "身份证号", width: 110 }, { dataField: "businesstypeName", dataName: "消费类型", width: 110 }, { dataField: "price", dataName: "单价", width: 110 }, { dataField: "quantity", dataName: "重量", width: 110 }, { dataField: "amount", dataName: "总金额", width: 110 }, { dataField: "cardName", dataName: "点卡名", width: 110 }, { dataField: "settleType", dataName: "结算状态", width: 110, dataFormat: settleTypeFormatOperation }, { dataField: "companyName", dataName: "商家名称", width: 110 }, { dataField: "userName", dataName: "商家联系人", width: 110 }, { dataField: "userTel", dataName: "商家联系人电话", width: 110 }, { dataField: "createDate", dataName: "创建时间", width: 150, dataFormat: function dataFormat(d) {
        return jbsframe.formatDateTime(d);
      } }, { dataField: "status", dataName: "状态", width: 110, dataFormat: statusFormatOperation }, { dataField: "modifyPersonName", dataName: "修改人", width: 110 }, { dataField: "modifyDate", dataName: "修改时间", width: 150, dataFormat: function dataFormat(d) {
        return jbsframe.formatDateTime(d);
      } }];
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
        url: "/consume/listData", //数据请求url
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
//操作


function settleTypeFormatOperation(settleType) {
  if (settleType === "1") {
    return "后结算";
  }

  if (settleType === "2") {
    return "已结算";
  }

  return "";
}

function statusFormatOperation(status) {
  if (status === "00") {
    return "无效";
  }

  if (status === "05") {
    return "新增";
  }

  if (status === "10") {
    return "有效";
  }

  return "";
}