'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/9/7.
 */

var NumberPicker = function (_React$Component) {
	_inherits(NumberPicker, _React$Component);

	function NumberPicker(props) {
		_classCallCheck(this, NumberPicker);

		var _this = _possibleConstructorReturn(this, (NumberPicker.__proto__ || Object.getPrototypeOf(NumberPicker)).call(this, props));

		_this.state = {
			numValue: props.numValue ? props.numValue : 0
		};

		_this.handleDownClick = _this.handleDownClick.bind(_this);
		_this.handleUpClick = _this.handleUpClick.bind(_this);
		return _this;
	}

	//减少


	_createClass(NumberPicker, [{
		key: 'handleDownClick',
		value: function handleDownClick() {
			this.propagateStateChange(this.state.numValue - 1);
		}

		//增加

	}, {
		key: 'handleUpClick',
		value: function handleUpClick() {
			this.propagateStateChange(this.state.numValue + 1);
		}
	}, {
		key: 'propagateStateChange',
		value: function propagateStateChange(num) {
			if (num >= 0) {
				this.setState({
					numValue: num
				});
				if (this.props.onChange) {
					this.props.onChange(num);
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {

			var LR_L = React.createElement('div', { className: 'input-group-btn' }, React.createElement('button', { className: 'btn minus', onClick: this.handleDownClick }, React.createElement('i', { className: 'fa fa-minus' })));

			var LR_R = React.createElement('div', { className: 'input-group-btn' }, React.createElement('button', { className: 'btn plus', onClick: this.handleUpClick }, React.createElement('i', { className: 'far fa-plus' })));

			var RUD = React.createElement('div', { className: 'input-group-btn layout-updown' }, React.createElement('button', { className: 'btn up', onClick: this.handleUpClick }, React.createElement('i', { className: 'fa fa-caret-up' })), React.createElement('button', { className: 'btn down', onClick: this.handleDownClick }, React.createElement('i', { className: 'fa fa-caret-down' })));

			var dir = this.props.direction;
			if (dir == "LR") {
				RUD = null;
			}
			if (dir == "RUD") {
				LR_L = null;
				LR_R = null;
			}

			var classes = classNames('react-number-picker', "input-group", this.props.className, dir);

			return React.createElement('div', { className: classes }, LR_L, React.createElement('input', { type: 'text', className: 'form-control', value: this.state.numValue }), LR_R, RUD);
		}
	}]);

	return NumberPicker;
}(React.Component);

/*
NumberPicker.defaultProps = {
	direction: "LR" //右侧上下排放
};

NumberPicker.propTypes = {
	className: Protypes.string,
	direction: Protypes.string, //按钮方向
	// LR:左右排放
	// RUD:右侧上下排放
	onChange: Protypes.func //	自定义回调
};*/