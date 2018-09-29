"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wangzhenjia on 2018/2/26.
 *
 * 所有部门，人员结构的树型查询
 * 展示形式为：树型
 * 传递参数：url,搜索所需要的列表请求地址
 * 回调方法：点击确定后，执行回调方法，并携带2个参数(名称，编号)
 */

var ComponentTreeWin = function (_React$Component) {
	_inherits(ComponentTreeWin, _React$Component);

	function ComponentTreeWin(props) {
		_classCallCheck(this, ComponentTreeWin);

		var _this = _possibleConstructorReturn(this, (ComponentTreeWin.__proto__ || Object.getPrototypeOf(ComponentTreeWin)).call(this, props));

		var _self = _this;

		_this.getSelectedNode = null; //当前树型选中节点
		_this.state = {
			content: "" //展示的内容 html
		};
		_this.requestUrlData = _this.requestUrlData.bind(_this);
		_this.renderTreeContainer = _this.renderTreeContainer.bind(_this);
		_this.renderTree = _this.renderTree.bind(_this);
		_this.callback_confirm = _this.callback_confirm.bind(_this);
		_this.onTreeNodeDoubleClick = _this.onTreeNodeDoubleClick.bind(_this);
		return _this;
	}

	//已插入真实 DOM 之后


	_createClass(ComponentTreeWin, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var $modalBody = $(this.refs.modal.refs.modalBody);
			$modalBody.perfectScrollbar({
				wheelSpeed: 0.5
			});
			if (this.props.url != "") {
				//加载url数据
				this.requestUrlData();
			}
		}
		//更新后

	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			var compenent = this;
		}

		//树节点双击

	}, {
		key: "onTreeNodeDoubleClick",
		value: function onTreeNodeDoubleClick(node) {
			if (this.props.onConfirm) {
				this.props.onConfirm({
					value: node.depId, //node.id,
					text: node.text
				});
			}
			this.refs.modal.close(); //关闭
		}
	}, {
		key: "callback_confirm",
		value: function callback_confirm() {
			if (this.getSelectedNode == null) {
				alert("请选择节点");
				return false;
			}
			if (this.props.onConfirm) {
				this.props.onConfirm({
					value: this.getSelectedNode.depId, //this.getSelectedNode.id,
					text: this.getSelectedNode.text
				});
			}
		}
	}, {
		key: "callback_cancel",
		value: function callback_cancel() {}

		//加载url数据

	}, {
		key: "requestUrlData",
		value: function requestUrlData() {
			jbsframe.ajaxRequest({
				url: this.props.url,
				data: this.props.data
			}, function (data, msg) {
				//填充
				this.setState({
					data: data
					//content:this.renderTreeContainer()
				});
			}.bind(this));
		}

		//渲染树型容器

	}, {
		key: "renderTreeContainer",
		value: function renderTreeContainer() {
			return React.createElement("div", {
				id: "stwin-tree"
			});
		}

		//渲染树型

	}, {
		key: "renderTree",
		value: function renderTree() {
			var component = this;
			var $modalBody = $(this.refs.modal.refs.modalBody).find("#stwin-tree");
			$modalBody.tree({
				//url : "/user/department/listData",
				data: [this.state.data],
				onDblClick: this.onTreeNodeDoubleClick,
				onSelect: function onSelect(node) {
					//当前选中节点
					component.getSelectedNode = node;
				}
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(SelectWindow, {
				ref: 'modal',
				className: "swin-modal",
				title: this.props.title,
				message: this.renderTreeContainer(), //this.state.content,
				confirm: '确定',
				cancel: '取消',
				onConfirm: this.callback_confirm,
				onCancel: this.callback_cancel,
				onShowAfter: this.renderTree
			});
		}
	}]);

	return ComponentTreeWin;
}(React.Component);