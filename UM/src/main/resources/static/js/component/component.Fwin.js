"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2018/2/6.
 *
 * 带iframe的弹出窗
 * 传递参数：url,需要展示的链接地址
 * 回调方法：点击确定后，执行回调方法
 */

var ComponentIframeWin = function (_React$Component) {
	_inherits(ComponentIframeWin, _React$Component);

	function ComponentIframeWin(props) {
		_classCallCheck(this, ComponentIframeWin);

		var _this = _possibleConstructorReturn(this, (ComponentIframeWin.__proto__ || Object.getPrototypeOf(ComponentIframeWin)).call(this, props));

		var _self = _this;

		_this.state = {
			content: "" //展示的内容 html
		};
		_this.requestUrl = _this.requestUrl.bind(_this);
		_this.requestUrlData = _this.requestUrlData.bind(_this);
		_this.callback_confirm = _this.callback_confirm.bind(_this);
		_this.callback_confirm1 = _this.callback_confirm1.bind(_this);
		_this.close = _this.close.bind(_this);
		_this.callback_cancel = _this.callback_cancel.bind(_this);
		_this.setHeight = _this.setHeight.bind(_this);
		return _this;
	}

	//已插入真实 DOM 之后


	_createClass(ComponentIframeWin, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			if (this.props.style == "fullscrean") {
				var $modal = $(this.refs.modal.refs.root);
				$modal.addClass("fullsrean");
				var mhh = $modal.find(".modal-head").outerHeight();
				var mfh = $modal.find(".modal-foot").outerHeight();
				$modal.find(".modal-body").css("height", window.innerHeight - mhh - mfh - 2);
			}
			if (this.props.url != "") {
				//加载url数据
				this.requestUrl();
			}
		}
		//更新后

	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			//add block

		}
	}, {
		key: "callback_confirm",
		value: function callback_confirm() {}
	}, {
		key: "callback_cancel",
		value: function callback_cancel() {
			if (this.props.onClose) {
				this.props.onClose();
			}
		}
		//设置全屏功能

	}, {
		key: "callback_confirm1",
		value: function callback_confirm1() {
			var $modal = $(this.refs.modal.refs.root);
			$modal.toggleClass("fullsrean");
			if ($modal.hasClass("fullsrean")) {
				/*$modal.find(".modal-body").css("height",window.innerHeight-60-30-2);*/
				this.setHeight($modal);
			} else {
				$modal.find(".modal-body").css("height", this.props.style.height);
			}
		}

		//加载url数据

	}, {
		key: "requestUrlData",
		value: function requestUrlData() {
			jbsframe.ajaxRequest({
				url: this.props.url
			}, function (data, msg) {
				//填充
				this.setState({
					content: this.renderList(data.content)
				});
			}.bind(this));
		}
	}, {
		key: "requestUrl",
		value: function requestUrl() {
			var component = this;

			var $modal = $(this.refs.modal.refs.root);

			var fullscrean = this.props.style;

			//console.log(this.refs.ifrm)
			var iframe = this.refs.ifrm;
			if (iframe.attachEvent) {
				iframe.attachEvent("onload", function () {
					// IE
					$(iframe).contents().find("body").addClass("hide-sidebar");
					$(iframe).contents().find("body").addClass("hide-topheader");
					if (fullscrean == "fullscrean") {
						$modal.addClass("fullsrean");
						/*var mhh = $modal.find(".modal-head").outerHeight();
                     var mfh = $modal.find(".modal-foot").outerHeight();
                     $modal.find(".modal-body").css("height",window.innerHeight-mhh-mfh-30-2);*/
						component.setHeight($modal);
						//如果含有弹窗iframe
						if ($("#iframe-modal .modal-iframe").length > 0) {
							$($("#iframe-modal .modal-iframe")[0].contentWindow.document.body).find(".admin-page").css("overflow", "auto");
						}
					}
					//remove block
					jbsframe.unblockElement($(iframe).parent());
				});
			} else {
				iframe.onload = function () {
					// 非IE
					$(iframe).contents().find("body").addClass("hide-sidebar");
					$(iframe).contents().find("body").addClass("hide-topheader");
					if (fullscrean == "fullscrean") {
						$modal.addClass("fullsrean");
						/* var mhh = $modal.find(".modal-head").outerHeight();
       var mfh = $modal.find(".modal-foot").outerHeight();
       $modal.find(".modal-body").css("height",window.innerHeight-mhh-mfh-30-2);*/
						component.setHeight($modal);
						//如果含有弹窗iframe
						if ($("#iframe-modal .modal-iframe").length > 0) {
							$($("#iframe-modal .modal-iframe")[0].contentWindow.document.body).find(".admin-page").css("overflow", "auto");
						}
					}
					//remove block
					jbsframe.unblockElement($(iframe).parent());
				};
			}
			//add block
			jbsframe.blockElement($(iframe).parent());
		}

		//关闭

	}, {
		key: "close",
		value: function close() {
			this.refs.modal.close();
		}
	}, {
		key: "setHeight",
		value: function setHeight($modal) {
			var mhh = $modal.find(".modal-head").outerHeight();
			var mfh = $modal.find(".modal-foot").outerHeight();
			$modal.find(".modal-body").css("height", window.innerHeight - mhh - mfh - 30 - 2);
		}
	}, {
		key: "render",
		value: function render() {
			var iframe = React.createElement("iframe", {
				ref: "ifrm",
				className: "modal-iframe",
				frameborder: 0,
				style: { border: 0 },
				src: this.props.url
			});

			return React.createElement(SelectWindow, {
				ref: 'modal',
				className: "swin-modal",
				style: this.props.style,
				title: this.props.title,
				message: iframe,
				multipleBtn: this.props.multipleBtn ? true : false,
				confirm: null,
				cancel: '关闭',
				//confirm1:"全屏",
				onConfirm: this.callback_confirm,
				onCancel: this.callback_cancel,
				onConfirm1: this.callback_confirm1
			});
		}
	}]);

	return ComponentIframeWin;
}(React.Component);