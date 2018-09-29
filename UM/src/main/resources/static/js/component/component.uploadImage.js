"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/12/18.
 */

var ComponentUploadImage = function (_React$Component) {
	_inherits(ComponentUploadImage, _React$Component);

	function ComponentUploadImage(props) {
		_classCallCheck(this, ComponentUploadImage);

		var _this = _possibleConstructorReturn(this, (ComponentUploadImage.__proto__ || Object.getPrototypeOf(ComponentUploadImage)).call(this, props));

		_this.scrf_header = $("meta[name='_csrf_header']").attr("content");
		_this.scrf_token = $("meta[name='_csrf']").attr("content");

		_this.state = {
			label: "上传照片"
		};

		_this.uploadImage_onChange = _this.uploadImage_onChange.bind(_this);
		_this.ajaxUploadImage_onChange = _this.ajaxUploadImage_onChange.bind(_this);
		return _this;
	}

	_createClass(ComponentUploadImage, [{
		key: "uploadImage_onChange",
		value: function uploadImage_onChange(e) {}
	}, {
		key: "ajaxUploadImage_onChange",
		value: function ajaxUploadImage_onChange(elemFileId, e) {
			console.log(elemFileId, e);
			var ele = e.target;
			$.ajaxFileUpload({
				url: '/user/uploadFile',
				secureuri: false,
				fileElementId: elemFileId, // file标签的id
				dataType: 'json',
				async: false,
				beforeSend: function beforeSend(xhr) {
					xhr.setRequestHeader(header, token);
				},
				success: function (data, msg) {
					console.log(data);
					alert(123);
				}.bind(this)
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _React$createElement;

			return React.createElement(UploadImage, (_React$createElement = { name: 'file',
				id: this.props.inputId
			}, _defineProperty(_React$createElement, "name", this.props.inputName), _defineProperty(_React$createElement, "label", this.props.label ? this.props.label : this.state.label), _defineProperty(_React$createElement, "scrf_header", this.scrf_header), _defineProperty(_React$createElement, "scrf_token", this.scrf_token), _defineProperty(_React$createElement, "ajax", this.props.ajax), _defineProperty(_React$createElement, "onChange", this.props.ajax ? this.ajaxUploadImage_onChange : this.uploadImage_onChange), _React$createElement));
		}
	}]);

	return ComponentUploadImage;
}(React.Component);