"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2018/1/24.
 *
 * 所有单位、品名规则材质、人员部门等
 * 展示形式为：列表
 * 传递参数：{
 * 			url,搜索所需要的列表请求地址
 * 			data,搜索时需要的参数
 * 			getDataFieldName,确定时需要的得到的显示值
 * 		}
 * 回调方法：点击确定后，执行回调方法，并携带2个参数(名称 text，编号 value)
 */

var ComponentSelectWin = function (_React$Component) {
	_inherits(ComponentSelectWin, _React$Component);

	function ComponentSelectWin(props) {
		_classCallCheck(this, ComponentSelectWin);

		var _this = _possibleConstructorReturn(this, (ComponentSelectWin.__proto__ || Object.getPrototypeOf(ComponentSelectWin)).call(this, props));

		var _self = _this;

		//设置确定或双击后的id名字
		_this.getDataFieldName = _this.props.getDataFieldName || "shortName";
		//过滤查找需要的字段名
		_this.filterFieldName = _this.props.filterFieldName;
		_this.filterFieldLabel = "";
		//列表表头
		_this.listHead = [{ dataField: _this.getDataFieldName, dataName: "", type: "radio", width: 40, dataFormat: function dataFormat(cell, row) {
				return _self.formatAllRadio(cell, row);
			} }, { dataField: "shortName", dataName: "简称", width: 120 }, { dataField: "corpId", dataName: "编号", width: 120 }, { dataField: "nickName", dataName: "助记符", width: 100 }, { dataField: "corpName", dataName: "名称", width: 200 }, { dataField: "", dataName: "", width: 17, className: "scroll-cell" }];

		_this.state = {
			content: "" //展示的表格内容
			//searchData: this.props.data		//对表格的搜索
		};
		_this.requestUrlData = _this.requestUrlData.bind(_this);
		_this.renderContent = _this.renderContent.bind(_this);
		_this.renderFilterSearch = _this.renderFilterSearch.bind(_this);
		_this.renderList = _this.renderList.bind(_this);
		_this.renderListHead = _this.renderListHead.bind(_this);
		_this.callback_confirm = _this.callback_confirm.bind(_this);
		_this.formatAllRadio = _this.formatAllRadio.bind(_this);
		_this.onSWinSearch = _this.onSWinSearch.bind(_this);
		_this.onSWinSearchClear = _this.onSWinSearchClear.bind(_this);
		_this.filterFieldOnKeyDown = _this.filterFieldOnKeyDown.bind(_this);
		_this.filterTbodyContent = _this.filterTbodyContent.bind(_this);
		_this.onShowModal = _this.onShowModal.bind(_this);
		_this.onShowAfter = _this.onShowAfter.bind(_this);
		return _this;
	}

	//已插入真实 DOM 之后


	_createClass(ComponentSelectWin, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			if (this.props.url != "") {
				//单位默认不加载
				//if(this.props.url !="/base/corp/findCorpByType"){
				//加载url数据
				this.requestUrlData(this.props.data);
				//}
			}
		}
		//更新后

	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			var compenent = this;

			//设置等宽
			var $modalBody = $(this.refs.modal.refs.modalBody);

			$modalBody.css({
				height: "auto",
				overflow: "hidden"
			});
			var $swin_thead = $modalBody.find(".swin-table.swin-table-thead");
			var $swin_tbody = $modalBody.find(".swin-table.swin-table-tbody");

			var swt_width = 0;
			$swin_thead.find("colgroup>col").each(function (index, col) {
				swt_width = swt_width + $(col).width();
			});
			$swin_thead.css("width", "100%");

			$swin_tbody.find("colgroup>col:last-child").remove();
			$swin_tbody.find("tr>td:last-child").remove();

			var swb_width = 0;
			$swin_tbody.find("colgroup>col").each(function (index, col) {
				swb_width = swb_width + $(col).width();
			});
			$swin_tbody.css("width", "100%");

			//radio选择
			$(this.refs.modal.refs.root).find(".swin-table tbody tr").on("click", function () {
				$(this).find("input[type=radio][name=swin-radio-group]").prop("checked", true);
				$(compenent.refs.modal.refs.root).find(".swin-table tbody tr").removeClass("selected");
				$(this).addClass("selected");
			});
			//数据行双击
			$(this.refs.modal.refs.root).find(".swin-table tbody tr").on("dblclick", function () {
				compenent.callback_confirm();
				compenent.refs.modal.close(); //关闭
			});

			//单位时等待所有数据加载后刷新内容
			if (this.props.url == "/base/corp/findCorpByType") {
				//过滤表格内容
				this.filterTbodyContent();
			}
		}

		//显示时

	}, {
		key: "onShowModal",
		value: function onShowModal() {}
		//显示以后

	}, {
		key: "onShowAfter",
		value: function onShowAfter() {
			var $modalBody = $(this.refs.modal.refs.modalBody);
			jbsframe.blockElement($modalBody);
			var $swin_thead = $modalBody.find(".swin-table.swin-table-thead");
			var $swin_scroll_tbody = $modalBody.find(".swin-scroll-tbody");
			var $swin_tbody = $modalBody.find(".swin-table.swin-table-tbody");
			if ($swin_scroll_tbody.height() > $swin_tbody.height()) {
				$swin_thead.find("colgroup>col.scroll-cell").hide();
				$swin_thead.find("thead>tr>th.scroll-cell").hide();
			} else {
				$swin_thead.find("colgroup>col.scroll-cell").show();
				$swin_thead.find("thead>tr>th.scroll-cell").show();
			}
			jbsframe.unblockElement($modalBody);
		}

		//确定

	}, {
		key: "callback_confirm",
		value: function callback_confirm() {
			var node = {
				value: $(this.refs.modal.refs.root).find("input[type=radio][name=swin-radio-group]:checked").data("id"),
				text: $(this.refs.modal.refs.root).find("input[type=radio][name=swin-radio-group]:checked").data("text")
			};
			if (this.props.onConfirm) {
				this.props.onConfirm(node);
			}
		}
		//取消

	}, {
		key: "callback_cancel",
		value: function callback_cancel() {}

		//搜索框回车

	}, {
		key: "filterFieldOnKeyDown",
		value: function filterFieldOnKeyDown(e) {
			if (e.keyCode == 13) {
				this.onSWinSearch();
			}
		}

		//搜索按钮

	}, {
		key: "onSWinSearch",
		value: function onSWinSearch() {

			//单位点击按钮再查询
			if (this.props.url == "/base/corp/findCorpByType") {
				if (this.state.content == "") {
					//加载url数据
					this.requestUrlData(this.props.data);
				} else {
					//过滤表格内容
					this.filterTbodyContent();
				}
			} else {

				//过滤表格内容
				this.filterTbodyContent();
			}

			//var obj = {};
			//obj[this.filterFieldName] = this.refs.swinearch.value;
			//var filterObj = $.extend({},this.props.data,obj)
			//this.requestUrlData(filterObj);

		}

		//搜索重置按钮

	}, {
		key: "onSWinSearchClear",
		value: function onSWinSearchClear() {
			this.refs.swinearch.value = "";
			//this.requestUrlData(this.props.data);

			var $modalBody = $(this.refs.modal.refs.modalBody);
			var $table = $modalBody.find("table.swin-table");
			$table.find("tbody tr").show();
		}

		//过滤表格内容

	}, {
		key: "filterTbodyContent",
		value: function filterTbodyContent() {
			var $modalBody = $(this.refs.modal.refs.modalBody);
			var $table = $modalBody.find("table.swin-table");
			var $swin_thead = $modalBody.find(".swin-table.swin-table-thead");
			//模糊过滤
			$table.find("tbody tr").hide().filter(":contains('" + this.refs.swinearch.value + "')").show();
			//根据内容隐藏显示滚动
			this.onShowAfter();
		}

		//加载url数据

	}, {
		key: "requestUrlData",
		value: function requestUrlData(_searchData) {
			jbsframe.ajaxRequest({
				url: this.props.url,
				data: _searchData
			}, function (data, msg) {
				//填充
				this.setState({
					//content:this.renderList(data.content)
					content: data.content ? data.content : data
				});
			}.bind(this));
		}

		//构建内容

	}, {
		key: "renderContent",
		value: function renderContent() {
			return React.createElement("div", {
				className: "swin-frame"
			}, this.renderFilterSearch(), this.renderList());
		}

		//搜索栏

	}, {
		key: "renderFilterSearch",
		value: function renderFilterSearch() {
			this.filterFieldLabel = "";
			for (var i = 0; i < this.props.listHead.length; i++) {
				//this.filterFieldName
				//if(this.props.listHead[i].dataField == this.filterFieldName){
				//this.filterFieldLabel = this.props.listHead[i].dataName;
				//}
				if (this.props.listHead[i].dataName != undefined) {
					if (i == 1) {
						this.filterFieldLabel = this.props.listHead[i].dataName;
					}
					if (i > 1) {
						this.filterFieldLabel = this.filterFieldLabel + "\/" + this.props.listHead[i].dataName;
					}
				}
			}
			return React.createElement("div", { className: "filter-box text-left" }, React.createElement("div", { className: "form-inline" }, React.createElement("div", { className: "form-group" },
			//React.createElement("label",{className:"",},this.filterFieldLabel),
			React.createElement("input", {
				className: "input-default ",
				name: this.filterFieldName,
				placeholder: this.filterFieldLabel,
				style: { width: "220px" },
				ref: "swinearch",
				onKeyDown: this.filterFieldOnKeyDown
			})), React.createElement("div", { className: "form-group button-group" }, React.createElement("button", { type: "button", className: "ui-btn btn-linear ", onClick: this.onSWinSearch }, React.createElement("i", { className: "far fa-search" }), " 查询"), React.createElement("button", { type: "button", className: "ui-btn btn-white ", onClick: this.onSWinSearchClear }, React.createElement("i", { className: "far fa-redo" }), " 重置"))));
		}

		//构建列表

	}, {
		key: "renderList",
		value: function renderList() {
			return React.createElement("div", { className: "" }, this.renderListHead(), this.renderListBody());
		}

		//列表头

	}, {
		key: "renderListHead",
		value: function renderListHead() {
			//var listHead = this.props.listHead || this.listHead;
			/*if(this.listHead.length == 1){
             this.listHead.push.apply(this.listHead,this.props.listHead);
   }*/
			var listHead = $.extend(true, this.listHead, this.props.listHead);

			return React.createElement("div", {}, React.createElement("table", { className: "swin-table swin-table-thead", style: { "table-layout": "fixed" } }, React.createElement(JColgroup, { thcols: listHead }), React.createElement(JThead, { thcols: listHead })));
		}
		//列表体

	}, {
		key: "renderListBody",
		value: function renderListBody() {
			var data = this.state.content;
			var rows = [];
			var children = React.createElement(JTr, { keys: this.listHead });
			for (var i = 0; i < data.length; i++) {
				rows = this.renderTr(rows, children, data[i]);
			}

			return React.createElement("div", { className: "swin-scroll-tbody", style: { height: 200, "overflow-y": "auto" } }, React.createElement("table", { className: "swin-table swin-table-tbody", style: { "table-layout": "fixed" } }, React.createElement(JColgroup, { thcols: this.listHead }), React.createElement(JTbody, { children: rows })));
		}
	}, {
		key: "renderTr",
		value: function renderTr(tr, child, data, length) {
			tr.push(React.createElement(JTr, {
				data: data,
				keys: child.props.keys,
				colspan: child.props.colspan,
				rowspan: child.props.rowSpan,
				index: tr.length,
				className: child.props.className,
				siblingsLength: length
			}));
			return tr;
		}
		//格式化radio

	}, {
		key: "formatAllRadio",
		value: function formatAllRadio(cell, row) {
			return "<input type='radio' data-id='" + cell + "' data-text='" + row[this.getDataFieldName] + "' class='ui-radio radio-green' name='swin-radio-group'/>";
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(SelectWindow, {
				ref: 'modal',
				className: "swin-modal",
				title: this.props.title,
				message: this.renderContent(), //this.state.content,
				style: {
					width: 700
				},
				confirm: '确定',
				cancel: '取消',
				onConfirm: this.callback_confirm,
				onCancel: this.callback_cancel,
				onShowAfter: this.onShowAfter
			});
		}
	}]);

	return ComponentSelectWin;
}(React.Component);