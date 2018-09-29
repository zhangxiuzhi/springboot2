"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 选择窗体，内可以放置列表
 * Created by wzj on 2018/1/23.
 */

var idSWin = 0;

var SelectWindow = function (_React$Component) {
	_inherits(SelectWindow, _React$Component);

	function SelectWindow(props) {
		_classCallCheck(this, SelectWindow);

		var _this = _possibleConstructorReturn(this, (SelectWindow.__proto__ || Object.getPrototypeOf(SelectWindow)).call(this, props));

		_this.width = 600;
		_this.height = 400;

		_this.state = {
			id: "react-swin-" + ++idSWin
		};

		_this.open = _this.open.bind(_this);
		_this.close = _this.close.bind(_this);
		_this.handleConfirm = _this.handleConfirm.bind(_this);
		_this.handleCancel = _this.handleCancel.bind(_this);
		_this.handleConfirm1 = _this.handleConfirm1.bind(_this);
		_this.handleConfirm2 = _this.handleConfirm2.bind(_this);
		return _this;
	}

	//已插入真实 DOM 之后


	_createClass(SelectWindow, [{
		key: "componentDidMount",
		value: function componentDidMount() {

			$(this.refs.root).modal({ backdrop: "static", keyboard: false, show: true });
			//$(this.refs.root).on("shown.bs.modal",function(){
			//重新排列深度值
			/*$(".modal").each(function(index,mod){
   	var zIndex = Number($(mod).css("z-index")) + index * 10;
   	$(mod).css("z-index",zIndex);
   	$(mod).parent().next(".modal-backdrop").css("z-index",zIndex-1);
   });*/
			//});

			//显示前
			$(this.refs.root).on("show.bs.modal", function () {
				// $(this.refs.root).after("<div class='modal-backdrop fade in'></div>");
			}.bind(this));

			//显示后自定义事件
			$(this.refs.root).on("shown.bs.modal", function () {
				// $(this.refs.root).after("<div class='modal-backdrop fade in'></div>");
				var id = this.state.id;
				this.showModalAfter(this);
			}.bind(this));

			//隐藏后
			$(this.refs.root).on('hidden.bs.modal', function (e) {
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

			//footer
			var modalfoot = null;

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
				if (cancelButton != null) {
					button.push(cancelButton);
				}
				if (confirmButton1 != null) {
					button.push(confirmButton1);
				}
				if (confirmButton2 != null) {
					button.push(confirmButton2);
				}
			} else {
				if (cancelButton != null) {
					button.push(cancelButton);
				}
				if (confirmButton != null) {
					button.push(confirmButton);
				}
			}
			if (button.length > 0) {
				modalfoot = React.createElement('div', { className: 'modal-foot' }, ' ', button);
			}

			return React.createElement('div', { className: root_classes, ref: 'root', id: this.state.id }, React.createElement('div', { className: dialog_classes,
				style: {
					width: this.props.style ? this.props.style.width : this.width
				}
			}, React.createElement('div', { className: 'modal-content' }, React.createElement('div', { className: 'modal-head' }, React.createElement('button', { className: 'close', type: 'button', onClick: this.close }, '\xD7'), React.createElement('h3', null, title)), React.createElement('div', { ref: "modalBody",
				className: 'modal-body panel',
				style: {
					height: this.props.style ? this.props.style.height : this.height
				}
			}, message), modalfoot)));
		}

		//打开模态窗

	}, {
		key: "open",
		value: function open() {
			$(this.refs.root).modal("show");
			/* $("body").addClass("modal-open");
    $(this.refs.root).after("<div class='smodal-backdrop fade in'></div>");
    $(this.refs.root).show();
    if(this.props.onShowAfter){
    	this.props.onShowAfter(this);
   }*/
		}
		//关闭模态框

	}, {
		key: "close",
		value: function close() {
			$(this.refs.root).modal("hide");
			/* $("body").removeClass("modal-open");
    $(this.refs.root).siblings(".smodal-backdrop").remove();
    $(this.refs.root).hide().remove();*/
		}
		//确认框确定按钮事件

	}, {
		key: "handleConfirm",
		value: function handleConfirm() {
			var flag;
			if (this.props.onConfirm) {
				flag = this.props.onConfirm();
			}
			if (flag != false) {
				this.close();
			}
		}
		//确认框确定按钮事件

	}, {
		key: "handleConfirm1",
		value: function handleConfirm1() {
			//this.close();
			if (this.props.onConfirm1) {
				this.props.onConfirm1();
			}
		}
		//确认框确定按钮事件

	}, {
		key: "handleConfirm2",
		value: function handleConfirm2() {
			//this.close();
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

		//显示

	}, {
		key: "showModal",
		value: function showModal() {
			if (comp.props.onShowModal) {
				comp.props.onShowModal();
			}
		}
		//显示后

	}, {
		key: "showModalAfter",
		value: function showModalAfter(comp) {
			if (comp.props.onShowAfter) {
				comp.props.onShowAfter();
			}
		}
	}]);

	return SelectWindow;
}(React.Component);