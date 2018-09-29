"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/11/9.
 */

var SortButton = function (_React$Component) {
	_inherits(SortButton, _React$Component);

	/*
  *  sort:asc升序,desc降序,none无
  *
  *  规则: asc -> desc -> none -> asc
  * */

	function SortButton(props) {
		_classCallCheck(this, SortButton);

		var _this = _possibleConstructorReturn(this, (SortButton.__proto__ || Object.getPrototypeOf(SortButton)).call(this, props));

		_this.onNodeClick = _this.onNodeClick.bind(_this);

		_this.state = {
			sortId: props.data.id,
			sort: props.data.sort //排序方式
		};
		return _this;
	}

	//更新后


	_createClass(SortButton, [{
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			//console.log("update finish", this.state);
			//将当前排序值传给按钮组
			this.props.onToggle(this.state);
		}

		//点击

	}, {
		key: "onNodeClick",
		value: function onNodeClick(event) {
			var onToggle = this.props.onToggle;

			//按升降序规则来切换

			var sort = "none";
			if (this.state.sort == "asc") {
				sort = "desc";
			}
			if (this.state.sort == "desc") {
				sort = "none";
			}
			if (this.state.sort == "none" || this.state.sort == "") {
				sort = "asc";
			}
			this.setState({
				sort: sort
			});
		}

		//根据内容返回类型

	}, {
		key: "returnSortIcon",
		value: function returnSortIcon() {
			if (this.state.sort == "asc") {
				return "↑";
			}
			if (this.state.sort == "desc") {
				return "↓";
			}
			if (this.state.sort == "none" || this.state.sort == "") {
				return "↑↓";
			}
		}
		//渲染图标类型

	}, {
		key: "renderSortTypeIcon",
		value: function renderSortTypeIcon() {
			var classes = classNames("icon", this.state.sort);
			return React.createElement("span", { className: classes //"icon fa"
				//,this.returnSortIcon()
			});
		}
	}, {
		key: "render",
		value: function render() {
			var btn = this.props.data;
			var classes = classNames('btn btn-default', this.state.sort);

			return React.createElement("button", { className: classes, onClick: this.onNodeClick }, btn.text, this.renderSortTypeIcon());
		}
	}]);

	return SortButton;
}(React.Component);