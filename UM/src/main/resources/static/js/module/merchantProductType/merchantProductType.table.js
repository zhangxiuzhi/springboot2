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

								_this.thead = [{ dataField: "id", dataName: "操作", width: 110, dataFormat: formatOperation }, { dataField: "merchantName", dataName: "商户名称", width: 110 }, { dataField: "productType", dataName: "商品名称", width: 110 }, { dataField: "unitPrice", dataName: "价格", width: 150 }, { dataField: "createTime", dataName: "上架时间", width: 150, dataFormat: function dataFormat(d) {
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
																url: "/merchantProductType/list", //数据请求url
																thead: this.thead, //表头
																status: this.props.status, //状态
																searchData: this.props.searchData, //过滤搜索条件
																pageNum: this.state.page || 1, //当前第几页
																sizePerPage: this.state.size || 10, //每页显示多少条
																totalSize: this.state.total || 100,
																nodata: { text: "没有数据" } //无数据时显示
												};
												return React.createElement(ComponentJTable, { options: options, datas: datas, ref: "jtable" });
								}
				}]);

				return UserTable;
}(React.Component);

function formatOperation(id) {
				var html = "";
				html += "<a href='/merchantProductType/edit/" + id + "'class='ui-link-icon fal fa-pencil-alt ' data-tabname='" + id + "' data-tabtype='edit' data-tabtitle='商品价格修改(" + id + ")' title='修改价格'></a>";
				html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				html += "<button type='button' class='ui-btn btn-linear btn-file' onclick='merchantProductDelete(" + id + ")'>删除</button>";
				// 	html += "<a href='/productType/delete/"+id+"' class='btn-linear ui-btn'>删除</a>"
				return html;
}

//格式化时间
undefined.formatDateTime = function (timestamp) {
				return timestamp == "" || timestamp == null || timestamp == "null" ? "" : new Date(Number(timestamp)).pattern("yyyy-MM-dd HH:mm:ss");
};
undefined.formatDate = function (timestamp) {
				return timestamp == "" || timestamp == null || timestamp == "null" ? "" : new Date(Number(timestamp)).pattern("yyyy-MM-dd");
};
function JBSFrame_user() {
				JBSFrame.call(this);
				//初始化UI
				this.initUI = function () {};
}
var tps_user;
$(document).ready(function (e) {
				tps_user = new JBSFrame_user();
				//初始化UI
				tps_user.initUI();
});

function merchantProductDelete(id) {
				notification("确认解除此商品关联信息？", function () {
								tps_user.ajaxRequest({
												url: "/merchantProductType/delete/" + id,
												method: 'get',
												dataType: 'json'
								}, function (data, msg) {
												notification("解除关联成功", function () {
																window.location = "/merchantProductType/redirect";
												});
								});
				});
}