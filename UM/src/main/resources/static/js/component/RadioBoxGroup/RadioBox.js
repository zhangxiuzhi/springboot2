"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/11/14.
 */

var RadioBox = function (_React$Component) {
	_inherits(RadioBox, _React$Component);

	function RadioBox(props) {
		_classCallCheck(this, RadioBox);

		var _this = _possibleConstructorReturn(this, (RadioBox.__proto__ || Object.getPrototypeOf(RadioBox)).call(this, props));

		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	//绑定标签点击等于radio点击


	_createClass(RadioBox, [{
		key: "handleClick",
		value: function handleClick(event) {
			var label = this.refs.label;
			if (event.target !== label) {
				event.preventDefault();
				label.click();
				return;
			}
		}
	}, {
		key: "render",
		value: function render() {
			var radio = this.props.data;
			var checkedOption = this.props.checked;

			var classes = classNames('radio-inline', {
				"checked": this.props.isChecked == radio.value ? true : false
			});

			var inputId = this.props.groupId + "-" + radio.value;

			return React.createElement("div", { className: classes, key: radio.id }, React.createElement("input", { className: "react-radioBox-screenreader-only", type: "radio",
				onChange: this.props.onChange,
				checked: this.props.isChecked == radio.value ? true : false,
				id: inputId,
				name: "react-rbg-" + this.props.name,
				value: radio.value,
				label: radio.text,
				ref: "radio" }), React.createElement("div", { className: "radio", onClick: this.handleClick }, React.createElement("div", { className: "point" })), React.createElement("label", { htmlFor: inputId, ref: "label" }, radio.text));
		}
	}]);

	return RadioBox;
}(React.Component);