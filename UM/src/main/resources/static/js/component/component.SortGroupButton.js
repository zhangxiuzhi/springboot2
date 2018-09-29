"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/11/9.
 */

var ComponentSortGroupButton = function (_React$Component) {
	_inherits(ComponentSortGroupButton, _React$Component);

	function ComponentSortGroupButton(props) {
		_classCallCheck(this, ComponentSortGroupButton);

		/*
  *  sort:asc升序,desc降序,none无
  * */
		var _this = _possibleConstructorReturn(this, (ComponentSortGroupButton.__proto__ || Object.getPrototypeOf(ComponentSortGroupButton)).call(this, props));

		_this.state = {
			data: []
		};
		_this.value = [];
		_this.onGroupToggle = _this.onGroupToggle.bind(_this);
		return _this;
	}

	//最终切换值


	_createClass(ComponentSortGroupButton, [{
		key: "onGroupToggle",
		value: function onGroupToggle(data) {
			this.value = data;
			//自定义方法，当排序按钮变化后
			if (this.props.onChange) {
				this.props.onChange(data);
			}
		}
	}, {
		key: "render",
		value: function render() {
			var data = this.props.data;

			return React.createElement(SortGroupButton, { data: data, onGroupToggle: this.onGroupToggle });
		}
	}]);

	return ComponentSortGroupButton;
}(React.Component);