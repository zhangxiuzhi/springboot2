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

		_this.thead = [{ dataField: "id", dataName: "操作", width: 90, dataFormat: formatOperation }, { dataField: "name", dataName: "商户名称", width: 110 }, { dataField: "shortName", dataName: "商户简称", width: 120 }, { dataField: "address", dataName: "商户地址", width: 120 }, { dataField: "tax", dataName: "税号", width: 120 }, { dataField: "contactName", dataName: "联系人名称", width: 120 }, { dataField: "contactPhone", dataName: "联系人电话", width: 120 }];
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
				url: "/merchant/listData", //数据请求url
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


function formatOperation(cell) {
	var html = "";
	html += "<a href='/merchant/edit/" + cell + "' class='ui-link-icon fal fa-pencil-alt ' data-tabname='" + cell + "' data-tabtype='edit' data-tabtitle='商户编辑(" + cell + ")' title='编辑'></a>";
	html += "<a href='javascript:void(0)' action='/merchant/delete/" + cell + "' onclick='del_rowData(this)' class='ui-link-icon far fa-trash-alt' title='删除'></a>";
	return html;
}

// 删除
function del_rowData(_link) {
	confirm(null, "是否删除？", function () {
		jbsframe.ajaxRequest({
			url: $(_link).attr("action")
		}, function () {
			notification("删除成功", function () {
				tps_merchant.table.reloadTable();
			});
		});
	});
}