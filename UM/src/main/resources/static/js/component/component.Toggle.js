"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by WangZhenJia(159109799@qq.com) on 2017/9/5.
 */

var ComponentToggle = function (_React$Component) {
	_inherits(ComponentToggle, _React$Component);

	function ComponentToggle(props) {
		_classCallCheck(this, ComponentToggle);

		var _this = _possibleConstructorReturn(this, (ComponentToggle.__proto__ || Object.getPrototypeOf(ComponentToggle)).call(this, props));

		_this.ui_toggle_onChange = _this.ui_toggle_onChange.bind(_this);
		return _this;
	}

	//toggle 开关自定义事件


	_createClass(ComponentToggle, [{
		key: "ui_toggle_onChange",
		value: function ui_toggle_onChange(event) {
			var target = event.target;
			if (this.props.onChange) {
				this.props.onChange(target.checked);
			}
		}
	}, {
		key: "render",
		value: function render() {
			var val = this.props.inputValue == "1" ? true : false;

			return React.createElement(Toggle, {
				defaultChecked: val,
				name: this.props.inputName,
				onChange: this.ui_toggle_onChange
			});
		}
	}]);

	return ComponentToggle;
}(React.Component);

//toggle


var toggleProps_1 = {
	//className:'wzj-ui-toggle'	//自定义class
	//,defaultChecked:true		//默认选中
	//,disabled:true
};