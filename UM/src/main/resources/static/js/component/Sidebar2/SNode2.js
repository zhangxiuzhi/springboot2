"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/10/31.
 */

var SNode = function (_React$Component) {
	_inherits(SNode, _React$Component);

	function SNode(props) {
		_classCallCheck(this, SNode);

		var _this = _possibleConstructorReturn(this, (SNode.__proto__ || Object.getPrototypeOf(SNode)).call(this, props));

		_this.state = {
			children: []
		};

		_this.onParentNodeClick = _this.onParentNodeClick.bind(_this);
		_this.onNodeClick = _this.onNodeClick.bind(_this);
		_this.setNodeParentOpen = _this.setNodeParentOpen.bind(_this);
		return _this;
	}

	//加载子级


	_createClass(SNode, [{
		key: "renderChildNode",
		value: function renderChildNode(obj) {
			var _this2 = this;

			var children = this.props.node.children;
			var focusNode = this.props.focusNode;

			if (Array.isArray(children)) {
				return React.createElement("ul", null, children.map(function (child, index) {
					return React.createElement(SNode, {
						//key: child.id || index,
						node: child,
						focusNode: focusNode,
						parent: obj.parent,
						onChildNodeClick: obj.onChildNodeClick || _this2.props.onChildNodeClick
					});
				}));
			} else {}
		}

		//父节点点击

	}, {
		key: "onParentNodeClick",
		value: function onParentNodeClick() {
			$(this.refs.menuNode).siblings("li").removeClass("open");
			if (this.refs.menuNode.className == "open") {
				this.refs.menuNode.className = "";
			} else {
				this.refs.menuNode.className = "open";
			}
		}
	}, {
		key: "onNodeClick",
		value: function onNodeClick() {

			if (this.props.parent && this.props.node.children == null || this.props.node.children == null) {
				//子节点点击回调
				if (this.props.onChildNodeClick) {
					this.props.onChildNodeClick(this.props.node, $(this.refs.menuNode).find("a")[0]);
				}
			} else {
				//父节点
				this.onParentNodeClick();
			}
		}

		//load end

	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.setNodeParentOpen();
		}

		//update end

	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			this.setNodeParentOpen();
		}

		//设置当前焦点节点的父级为打开状态

	}, {
		key: "setNodeParentOpen",
		value: function setNodeParentOpen() {

			if (this.props.focusNode.name != undefined) {
				if (this.props.focusNode.name == this.props.node.name) {
					$(this.refs.menuNode).parent("ul").parents("li").addClass("open");
				}
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _props$node = this.props.node,
			    name = _props$node.name,
			    text = _props$node.text,
			    icon = _props$node.icon,
			    url = _props$node.url,
			    children = _props$node.children,
			    toggled = _props$node.toggled;
			var parent = this.props.parent;
			var fn = this.props.focusNode;


			var isOpened = this.props.node.open ? "open" : "";
			var classes = classNames('', {
				"open": isOpened //父级是否展开
			});

			var isSelected = false;
			if (fn.name != undefined) {
				if (fn.name == name) {
					isSelected = true;
				} else {
					isSelected = false;
				}
			}

			var classes_link = classNames('', {
				"nav-submenu": children && children.length > 0, //子节点类
				"selected": isSelected //是否选中
			});

			var classes_icon = '';
			if (icon) {
				classes_icon = 'far fa-' + icon;
			}

			return React.createElement("li", { ref: "menuNode", className: classes, "data-name": name }, React.createElement("a", { className: classes_link,
				//href: url == undefined ? "javascript:void(0)" : url,
				href: "#" + name,
				onClick: this.onNodeClick
			}, React.createElement("spane", { className: "node-icon" }, React.createElement("i", { className: classes_icon })), text), this.renderChildNode({
				parent: name,
				onChildNodeClick: this.props.onNodeClick
			}));
		}
	}]);

	return SNode;
}(React.Component);