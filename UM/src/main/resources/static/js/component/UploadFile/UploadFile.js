"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2018/1/31.
 *
 * 上传文件组件
 */

var UploadFile = function (_React$Component) {
	_inherits(UploadFile, _React$Component);

	function UploadFile(props) {
		_classCallCheck(this, UploadFile);

		var _this = _possibleConstructorReturn(this, (UploadFile.__proto__ || Object.getPrototypeOf(UploadFile)).call(this, props));

		_this.state = {
			label: "上传照片",
			random: new Date().getTime(),
			value: ""
		};

		_this.upload_onChange = _this.upload_onChange.bind(_this);
		_this.upload_ajax = _this.upload_ajax.bind(_this);
		return _this;
	}

	_createClass(UploadFile, [{
		key: "upload_onChange",
		value: function upload_onChange() {
			this.upload_ajax(this.refs.file.id);
		}
	}, {
		key: "upload_ajax",
		value: function upload_ajax(elemFileId, value) {
			var ulf = this;
			$.ajaxFileUpload({
				url: this.props.url, //'/user/portrait/uploadFile',
				secureuri: false,
				fileElementId: elemFileId, // file标签的id
				dataType: 'json',
				async: false,
				success: function success(result) {
					if (ulf.props.onChange) {
						ulf.props.onChange(result); //返回提交后的值
					}
				}
			});
		}
	}, {
		key: "render",
		value: function render() {

			return React.createElement("div", { className: "file-uploadFile clearfix" }, React.createElement("a", { href: "javascript:void(0)", className: "ui-btn btn-white btn-file" }, React.createElement("span", { className: "text-new" }, "\u9009\u62E9\u6587\u4EF6"), React.createElement("span", { className: "text-update" }, "\u66FF\u6362\u6587\u4EF6"), React.createElement(FileInput, {
				ref: "file",
				id: "react-uploadFile-" + this.state.random,
				name: "file",
				accept: ".doc,.docx,.xls,.xlsx,.pdf,.zip,.rar,.7z,.png,.jpg",
				onChange: this.upload_onChange
			})
			/*React.createElement("input", {
   	ref:"file",
   	type: "file",
   	id:"react-uploadFile-"+this.state.random,
   	name: "file",
   	onChange: this.upload_onChange,
   	accept: ".doc,.docx,.xls,.xlsx,.pdf,.zip,.rar,.7z,.png,.jpg"
   })*/
			), React.createElement("div", { className: "uploadFile-exists" }, React.createElement("span", { className: "text-name" }), React.createElement("span", { className: "close", "data-closetargetname": "file" }, React.createElement("i", { className: "fa fa-remove" }))), React.createElement("input", { type: "hidden", id: "", name: "", value: "" }));
		}
	}]);

	return UploadFile;
}(React.Component);