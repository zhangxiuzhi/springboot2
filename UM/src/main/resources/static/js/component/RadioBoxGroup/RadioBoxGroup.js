"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/11/14.
 */

var RadioBoxGroup = function (_React$Component) {
	_inherits(RadioBoxGroup, _React$Component);

	function RadioBoxGroup(props) {
		_classCallCheck(this, RadioBoxGroup);

		var _this = _possibleConstructorReturn(this, (RadioBoxGroup.__proto__ || Object.getPrototypeOf(RadioBoxGroup)).call(this, props));

		_this.id = RadioBox.generateId();

		_this.state = {
			currentValue: props.value
		};

		_this.handleChange = _this.handleChange.bind(_this);
		return _this;
	}

	//选择切换后


	_createClass(RadioBoxGroup, [{
		key: "handleChange",
		value: function handleChange(event) {
			//console.log(event.target)

			this.setState({
				currentValue: event.target.value
			});
			//自定义回调
			if (this.props.onChange) {
				this.props.onChange(event.target.value, event.target.getAttribute("label"));
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
			    onToggle = _props.onToggle;

			var classes = classNames('react-radioBox', className);

			var data = this.props.data;

			var groupId = "react-radioBox" + this.id;

			return React.createElement('div', { className: classes }, data.map(function (radio, index) {
				return React.createElement(RadioBox, { data: radio, key: radio.id || index,
					groupId: groupId,
					name: name,
					onChange: _this2.handleChange,
					isChecked: _this2.state.currentValue });
			}), React.createElement('input', { type: 'hidden', name: name, ref: 'hiddenValue', value: this.state.currentValue }));
		}
	}]);

	return RadioBoxGroup;
}(React.Component);

RadioBox.idGenerator = 1;
RadioBox.generateId = function () {
	return RadioBox.idGenerator++;
};