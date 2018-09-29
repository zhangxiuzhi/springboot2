'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by WangZhenJia(159109799@qq.com) on 2017/9/5.
 */

var Toggle = function (_React$PureComponent) {
	_inherits(Toggle, _React$PureComponent);

	function Toggle(props) {
		_classCallCheck(this, Toggle);

		var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, props));

		_this.state = {
			//checked: !!(props.checked || props.defaultChecked)
			checked: props.defaultChecked
		};

		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	_createClass(Toggle, [{
		key: 'handleClick',
		value: function handleClick(event) {
			var checkbox = this.input;

			if (event.target !== checkbox) {
				event.preventDefault();
				checkbox.click();
				return;
			}
			//如果组件有checked属性，否则取checkbox的checked属性
			//const checked = this.props.hasOwnProperty('checked') ? this.props.checked : checkbox.checked;

			//设置state
			this.setState({ checked: checkbox.checked });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    className = _props.className,
			    id = _props.id,
			    name = _props.name,
			    defaultChecked = _props.defaultChecked,
			    onChange = _props.onChange;

			var classes = classNames('react-toggle', {
				'react-toggle--checked': this.state.checked,
				'react-toggle--disabled': this.props.disabled
			}, className);

			return React.createElement('div', { className: classes,
				onClick: this.handleClick
			}, React.createElement('div', { className: 'toggle-track' }), React.createElement('div', { className: 'toggle-thumb' }), React.createElement('input', {
				id: id,
				//name: name,
				checked: this.state.checked,
				value: this.state.checked == true ? "1" : "0",
				defaultChecked: defaultChecked,
				onChange: onChange,
				ref: function ref(_ref) {
					_this2.input = _ref;
				},
				className: 'react-toggle-screenreader-only',
				type: 'checkbox'
			}), React.createElement('input', { type: 'hidden', name: name, ref: 'hiddenValue', value: this.state.checked == true ? "1" : "0" }));
		}
	}]);

	return Toggle;
}(React.PureComponent);

/*
Toggle.propTypes = {
	className: Protypes.string,
	value: Protypes.string,
	name: Protypes.string,
	id: Protypes.string,
	onChange: Protypes.func,
	checked: Protypes.bool,
	defaultChecked: Protypes.bool,
	disabled: Protypes.bool
};*/