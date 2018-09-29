"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/12/18.
 */
/**
 * Created by wzj on 2017/12/18.
 */

var UploadImage = function (_React$Component) {
	_inherits(UploadImage, _React$Component);

	function UploadImage(props) {
		_classCallCheck(this, UploadImage);

		var _this = _possibleConstructorReturn(this, (UploadImage.__proto__ || Object.getPrototypeOf(UploadImage)).call(this, props));

		_this.state = {
			value: "aa",
			hasImage: false,
			label: props.label ? props.label : "上传照片"
		};

		//this.changeFile = this.changeFile.bind(this);
		_this.remove = _this.remove.bind(_this);
		return _this;
	}

	_createClass(UploadImage, [{
		key: "remove",
		value: function remove(event) {
			//window.URL.revokeObjectURL();
			this.refs.image.src = "";
			this.setState({
				hasImage: false,
				text: this.props.label ? this.props.label : "上传照片"
			});
		}
	}, {
		key: "changeFile",
		value: function changeFile(event) {
			//如果为异步上传文件
			if (this.props.ajax) {
				if (this.props.onChange) {
					this.props.onChange(this.refs.inputFile.id, event);
				}
			} else {
				var file = event.target.files[0]; // 获取到input-file的文件对象
				var url = window.URL.createObjectURL(file);
				this.refs.image.src = url;
				this.setState({
					hasImage: true,
					text: "替换照片"
				});
				if (this.props.onChange) {
					this.props.onChange(url);
				}
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var classes = classNames("react-uploadImage", {
				"hasImage": this.state.hasImage
			});

			return React.createElement("div", { className: classes }, React.createElement("a", { href: "javascript:;", className: "removeImage fa fa-remove", ref: "remove", onClick: this.remove }), React.createElement("a", { href: "javascript:;", className: "btn-file" }, React.createElement("span", { ref: "text" }, this.state.label), React.createElement("input", { onChange: function onChange(e) {
					return _this2.changeFile(e);
				}, id: this.props.id, name: this.props.name, type: "file", ref: "inputFile" })), React.createElement("div", { className: "viewImgMask" }), React.createElement("img", { src: "", className: "viewImg", ref: "image" }));
		}
	}]);

	return UploadImage;
}(React.Component);