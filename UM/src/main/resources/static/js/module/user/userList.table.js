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

		_this.thead = [
			{ dataField: "id", dataName: "操作", width: 150 ,dataFormat:idFormat},
			{ dataField: "userName", dataName: "用户姓名", width: 150 },
			{ dataField: "phone", dataName: "手机号", width: 150 },
			{ dataField: "userType", dataName: "用户身份", width: 150 },
			{ dataField: "enabled", dataName: "是否锁定", width: 150 ,dataFormat:enabled},
			{ dataField: "updateTime", dataName: "修改时间", width: 150 , dataFormat: function dataFormat(d) {
            return jbsframe.formatDateTime(d)}},
			{ dataField: "createTime", dataName: "注册时间", width: 150, dataFormat: function dataFormat(d) {
                    return jbsframe.formatDateTime(d);} }];
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
				url: "/user/list", //数据请求url
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
function idFormat(id,TpsUserShowVo) {

	var  html = "";
    html += "<a href='/user/edit/" + id + "'class='ui-link-icon fal fa-pencil-alt ' data-tabname='" + id + "' data-tabtype='edit' data-tabtitle='用户信息修改(" + id + ")' title='修改该用户信息'></a>";
    html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    html += "<button class='ui-btn btn-linear btn-file 'onclick='userDelete("+id+")'title='删除该用户信息' >删除</button>";
    html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	if (TpsUserShowVo.enabled == 1) {
		html += "<button class='ui-btn btn-linear btn-file ' style='color: #c80000' onclick='unAble(" + id + ")' title='锁定该用户'>锁定</button>";
	}else {
		html += "<button class='ui-btn btn-file btn-linear' style='color: #00B83F' onclick='beAble(" + id + ")' title='解锁该用户'>解锁</button>";
	}
	return html;
}
//删除用户
function userDelete(id) {
	confirm(null,"确认删除该用户信息嘛？",function () {
		jbsframe.ajaxRequest({
			url:"/user/delete/"+id,
			method:'get',
			datatype:'json',
		},function (data,msg) {
			notification("删除成功",function () {
				window.location = "/user/redirect";
            });
        });
    });
}
//用户锁定
function unAble(id) {
	confirm(null,"确定锁定该用户嘛？",function () {
		able(id);
    });
}function beAble(id) {
	confirm(null,"确定解锁该用户嘛？",function () {
		able(id);
    });
}
function able(id) {
    jbsframe.ajaxRequest({
		url:"/user/enabled/"+id,
		method:'get',
		datatype:'json',
    },function (data,msg) {
		notification("操作成功",function () {
			window.location = "/user/redirect";
        });
    });
}


//格式化时间
undefined.formatDateTime = function (timestamp) {
    return timestamp == "" || timestamp == null || timestamp == "null" ? "" : new Date(Number(timestamp)).pattern("yyyy-MM-dd HH:mm:ss");
};
undefined.formatDate = function (timestamp) {
    return timestamp == "" || timestamp == null || timestamp == "null" ? "" : new Date(Number(timestamp)).pattern("yyyy-MM-dd");
};

function enabled(enabled) {
	if (enabled == 1){
		return "未锁定";
	} else {
		return"已锁定";
	}
}