"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2018/1/31.
 */

var ComponentUploadFile = function (_React$Component) {
	_inherits(ComponentUploadFile, _React$Component);

	function ComponentUploadFile(props) {
		_classCallCheck(this, ComponentUploadFile);

		var _this = _possibleConstructorReturn(this, (ComponentUploadFile.__proto__ || Object.getPrototypeOf(ComponentUploadFile)).call(this, props));

		_this.state = {
			accept: ".doc,.docx,.xls,.xlsx,.pdf,.zip,.rar,.7z,.png,.jpg"
		};

		_this.onChange = _this.onChange.bind(_this);
		return _this;
	}

	_createClass(ComponentUploadFile, [{
		key: "onChange",
		value: function onChange(result) {
			if (this.props.onChange) {
				this.props.onChange(result);
			}
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(UploadFile, {
				url: this.props.url,
				accept: this.props.accept || this.state.accept,
				onChange: this.onChange
			});
		}
	}]);

	return ComponentUploadFile;
}(React.Component);