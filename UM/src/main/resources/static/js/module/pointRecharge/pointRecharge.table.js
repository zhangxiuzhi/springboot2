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

		_this.thead = [{ dataField: "name", dataName: "司机姓名", width: 150 }, { dataField: "phone", dataName: "手机号", width: 150 }, { dataField: "idNumber", dataName: "ID", width: 150 }, { dataField: "sourceCompany", dataName: "发放公司", width: 150 }, { dataField: "points", dataName: "发放点数", width: 150 }, { dataField: "createTime", dataName: "时间", width: 150 }];
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
				url: "/recharge/search/list", //数据请求url
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