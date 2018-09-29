"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/11/24.
 */

var ComponentEsteelMultiSelect = function (_React$Component) {
	_inherits(ComponentEsteelMultiSelect, _React$Component);

	function ComponentEsteelMultiSelect(props) {
		_classCallCheck(this, ComponentEsteelMultiSelect);

		return _possibleConstructorReturn(this, (ComponentEsteelMultiSelect.__proto__ || Object.getPrototypeOf(ComponentEsteelMultiSelect)).call(this, props));
	}

	_createClass(ComponentEsteelMultiSelect, [{
		key: "onChange",
		value: function onChange(selectValue) {
			//console.log(selectValue);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			$(this.refs.box).hover(function () {
				$(this).addClass("hover");
			}, function () {
				$(this).removeClass("hover");
			});
			$(this.refs.clickText).click(function () {
				this.renderModal();
			}.bind(this));
		}
	}, {
		key: "render",
		value: function render() {
			var data = this.props.data;
			return React.createElement(MultiSelect, {
				refs: "ms",
				data: data,
				name: this.props.inputName,
				onChange: this.onChange
			}); //React.createElement(MultiSelect, { onChange: this.onChange });
		}
	}]);

	return ComponentEsteelMultiSelect;
}(React.Component);