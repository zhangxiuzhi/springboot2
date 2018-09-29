"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2018/1/19.
 */

var idModal = 0;

var Modal = function (_React$Component) {
	_inherits(Modal, _React$Component);

	function Modal(props) {
		_classCallCheck(this, Modal);

		var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

		_this.state = {
			id: "react-modal-" + ++idModal
		};

		_this.open = _this.open.bind(_this);
		_this.close = _this.close.bind(_this);
		_this.handleConfirm = _this.handleConfirm.bind(_this);
		_this.handleCancel = _this.handleCancel.bind(_this);
		_this.handleConfirm1 = _this.handleConfirm1.bind(_this);
		_this.handleConfirm1 = _this.handleConfirm2.bind(_this);
		return _this;
	}

	//已插入真实 DOM 之后


	_createClass(Modal, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			$(this.refs.root).modal({ backdrop: "static", keyboard: false, show: true });
			//this.open();


			//显示前
			$(this.refs.root).on("show.bs.modal", function () {
				setTimeout(function () {
					$('.modal-backdrop').attr('data-id', this.state.id);
				});
			}.bind(this));
			//显示后
			$(this.refs.root).on("shown.bs.modal", function () {
				//$(this.refs.root).after("<div class='cmodal-backdrop fade in'></div>");

			}.bind(this));
			//隐藏后
			$(this.refs.root).on('hidden.bs.modal', function () {
				$("#backdrop-" + this.refs.root.id).removeClass("in").remove();
				$(this.refs.root).remove();
			}.bind(this));
		}
	}, {
		key: "render",
		value: function render() {
			//样式
			var root_classes = classNames('modal fade in', {
				'multipleBtn': this.props.multipleBtn
			});
			var _props = this.props,
			    className = _props.className,
			    title = _props.title,
			    message = _props.message,
			    open = _props.open;

			var dialog_classes = classNames('modal-dialog', {
				'hideHeader': this.props.title == null ? true : false
			}, className);

			//按钮
			var button = [];
			var confirmButton = null;
			var cancelButton = null;
			var confirmButton1 = null;
			var confirmButton2 = null;

			if (this.props.confirm) {
				confirmButton = React.createElement('button', { type: 'button', className: 'ui-btn btn-blue', onClick: this.handleConfirm }, this.props.confirm);
			}
			if (this.props.cancel) {
				cancelButton = React.createElement('button', { type: 'button', className: 'ui-btn btn-white', onClick: this.handleCancel }, this.props.cancel);
			}
			if (this.props.confirm1) {
				confirmButton1 = React.createElement('button', { type: 'button', className: 'ui-btn btn-blue', onClick: this.handleConfirm1 }, this.props.confirm1);
			}
			if (this.props.confirm2) {
				confirmButton2 = React.createElement('button', { type: 'button', className: 'ui-btn btn-blue', onClick: this.handleConfirm2 }, this.props.confirm2);
			}
			//多个确认按钮
			if (this.props.multipleBtn) {
				button.push(cancelButton);
				button.push(confirmButton1);
				button.push(confirmButton2);
			} else {
				button.push(cancelButton);
				button.push(confirmButton);
			}

			return React.createElement('div', { className: root_classes, ref: 'root', id: this.state.id }, React.createElement('div', { className: dialog_classes }, React.createElement('div', { className: 'modal-content' }, React.createElement('div', { className: 'modal-head' }, React.createElement('button', { className: 'close', type: 'button' }, '\xD7'), React.createElement('h3', null, title)), React.createElement('div', { className: 'modal-body' }, message
			//React.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.children[0] } })
			), React.createElement('div', { className: 'modal-foot' }, ' ', button))));
		}

		//打开模态窗

	}, {
		key: "open",
		value: function open() {
			$(this.refs.root).modal("show");
			/*   $("body").addClass("modal-open");
      $(this.refs.root).after("<div class='cmodal-backdrop fade in'></div>");
      $(this.refs.root).show();*/
		}
		//关闭模态框

	}, {
		key: "close",
		value: function close() {
			$(this.refs.root).modal("hide");
			//$(".modal-backdrop").removeClass("in").remove();
			/*  $("body").removeClass("modal-open");
     $(this.refs.root).siblings(".cmodal-backdrop").remove();
     $(this.refs.root).hide().remove();*/
		}
		//确认框确定按钮事件

	}, {
		key: "handleConfirm",
		value: function handleConfirm() {
			this.close();
			if (this.props.onConfirm) {
				this.props.onConfirm();
			}
		}
		//确认框确定按钮事件

	}, {
		key: "handleConfirm1",
		value: function handleConfirm1() {
			this.close();
			if (this.props.onConfirm1) {
				this.props.onConfirm1();
			}
		}
		//确认框确定按钮事件

	}, {
		key: "handleConfirm2",
		value: function handleConfirm2() {
			this.close();
			if (this.props.onConfirm2) {
				this.props.onConfirm2();
			}
		}
		//确认框取消按钮事件

	}, {
		key: "handleCancel",
		value: function handleCancel() {
			if (this.props.onCancel) {
				this.props.onCancel();
			}
			this.close();
		}
	}, {
		key: "handleHidden",
		value: function handleHidden() {
			if (this.props.onHidden) {
				this.props.onHidden();
				this.close();
			}
		}
	}]);

	return Modal;
}(React.Component);