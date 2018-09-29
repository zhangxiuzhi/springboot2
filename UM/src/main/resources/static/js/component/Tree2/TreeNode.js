"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/9/8.
 */

var TreeNode = function (_React$Component) {
	_inherits(TreeNode, _React$Component);

	function TreeNode(props) {
		_classCallCheck(this, TreeNode);

		var _this = _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call(this, props));

		_this.onNodeClick = _this.onNodeClick.bind(_this);
		_this.addNewChildNode = _this.addNewChildNode.bind(_this);

		_this.state = {
			toggled: props.node.toggled ? props.node.toggled : false //props.node.toggled		//是否打开
			, children: props.node.children || []
		};
		return _this;
	}

	_createClass(TreeNode, [{
		key: "onNodeClick",
		value: function onNodeClick(event) {
			var _props = this.props,
			    node = _props.node,
			    onToggle = _props.onToggle;


			this.setState({
				toggled: !this.state.toggled
			});

			if (onToggle) {
				onToggle(event, this);
			}
		}

		//添加子节点

	}, {
		key: "addNewChildNode",
		value: function addNewChildNode(_child) {
			this.setState({
				children: _child
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props$node = this.props.node,
			    name = _props$node.name,
			    text = _props$node.text,
			    children = _props$node.children,
			    toggled = _props$node.toggled;

			//节点class

			var nodeClasses = classNames("tree-node", {
				"parentNode": children,
				"toggled": this.state.toggled
			}, this.props.className);

			//开关class
			var toggleClasses = classNames("toggleIcon", {
				"fa fa-angle-right": children
			});

			return React.createElement('li', { ref: function ref(_ref) {
					return _this2.topLevelRef = _ref;
				}, className: nodeClasses }, React.createElement('a', { href: 'javascript:void(0)', onClick: this.onNodeClick }, React.createElement('i', { className: toggleClasses }), text), this.renderDrawer());
		}
	}, {
		key: "renderDrawer",
		value: function renderDrawer(decorators, animations) {
			var _props$node2 = this.props.node,
			    name = _props$node2.name,
			    text = _props$node2.text,
			    toggled = _props$node2.toggled,
			    remote = _props$node2.remote;

			var hasChildren = this.state.children.length > 0 ? true : false;

			//如果含有子节点
			if (hasChildren) {
				return this.renderChildren();
			}

			//如果可以远程加载
			if (remote) {
				return this.renderLoading();
			}

			return hasChildren ? this.renderChildren() : null;
		}

		//绘制子节点

	}, {
		key: "renderChildren",
		value: function renderChildren(decorators) {
			var _this3 = this;

			var _props2 = this.props,
			    _props2$node = _props2.node,
			    name = _props2$node.name,
			    text = _props2$node.text,
			    toggled = _props2$node.toggled,
			    remote = _props2$node.remote,
			    onToggle = _props2.onToggle;

			var children = this.state.children;

			if (!Array.isArray(children)) {
				children = children ? [children] : [];
			}

			return React.createElement('ul', { ref: function ref(_ref2) {
					return _this3.subtreeRef = _ref2;
				}, className: 'nav nav-sub' }, children.map(function (child, index) {
				return React.createElement(TreeNode, { key: child.id || index, node: child, onToggle: onToggle });
			}));
		}

		//绘制加载提示

	}, {
		key: "renderLoading",
		value: function renderLoading() {
			var _props$node3 = this.props.node,
			    name = _props$node3.name,
			    text = _props$node3.text,
			    children = _props$node3.children,
			    toggled = _props$node3.toggled;


			return React.createElement('ul', { className: 'nav nav-sub' }, React.createElement('li', null, React.createElement('a', null, 'Loading...')));
		}
	}]);

	return TreeNode;
}(React.Component);

/*
TreeNode.propTypes = {
	node: PropTypes.object.isRequired,
	onToggle: PropTypes.func //开关方式
};*/