"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/11/9.
 */

var SortGroupButton = function (_React$Component) {
	_inherits(SortGroupButton, _React$Component);

	/*
  *  sort:asc升序,desc降序,none无
  *
  *  规则: asc -> desc -> none -> asc
  * */

	function SortGroupButton(props) {
		_classCallCheck(this, SortGroupButton);

		var _this = _possibleConstructorReturn(this, (SortGroupButton.__proto__ || Object.getPrototypeOf(SortGroupButton)).call(this, props));

		_this.onToggle = _this.onToggle.bind(_this);

		_this.state = {
			data: props.data
		};
		return _this;
	}

	//获取排序按钮点击后的排序值


	_createClass(SortGroupButton, [{
		key: "onToggle",
		value: function onToggle(button) {
			var data = this.state.data;
			for (var i = 0; i < data.length; i++) {
				//改变当前操作的按钮值
				if (data[i].id == button.sortId) {
					data[i].sort = button.sort;
				}
			}

			//自定义事件，传递整个按钮组值
			if (this.props.onGroupToggle) {
				this.props.onGroupToggle(data);
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    className = _props.className,
			    name = _props.name,
			    id = _props.id,
			    onToggle = _props.onToggle,
			    onGroupToggle = _props.onGroupToggle;

			var classes = classNames('react-sortGroupButton', className);

			var btns = this.props.data;

			return React.createElement("div", { className: classes }, React.createElement("div", { className: "btn-group" }, btns.map(function (btn, index) {
				return React.createElement(SortButton, { key: index,
					data: btn,
					onToggle: _this2.onToggle
				});
			})));
		}
	}]);

	return SortGroupButton;
}(React.Component);