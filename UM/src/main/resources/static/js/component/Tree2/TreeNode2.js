"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/9/8.
 */

var TreeNode2 = function (_React$Component) {
	_inherits(TreeNode2, _React$Component);

	function TreeNode2(props) {
		_classCallCheck(this, TreeNode2);

		var _this = _possibleConstructorReturn(this, (TreeNode2.__proto__ || Object.getPrototypeOf(TreeNode2)).call(this, props));

		_this.onNodeToggle = _this.onNodeToggle.bind(_this);
		_this.onNodeClick = _this.onNodeClick.bind(_this);
		_this.addNewChildNode = _this.addNewChildNode.bind(_this);

		_this.state = {
			toggled: props.node.toggled ? true : false //props.node.toggled		//是否打开
			, selected: props.node.selected ? true : false //是否选中
			, children: props.node.children || []
		};
		return _this;
	}

	//更新后


	_createClass(TreeNode2, [{
		key: "componentDidUpdate",
		value: function componentDidUpdate() {}

		/*节点展开*/

	}, {
		key: "onNodeToggle",
		value: function onNodeToggle(event) {
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

		/*节点点击*/

	}, {
		key: "onNodeClick",
		value: function onNodeClick(event) {
			var _props2 = this.props,
			    node = _props2.node,
			    onClick = _props2.onClick;


			this.setState({
				selected: true
			});

			if (onClick) {
				onClick(event, this);
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
			    toggled = _props$node.toggled,
			    tab = _props$node.tab,
			    href = _props$node.href;

			//节点class

			var nodeClasses = classNames("tree-node", {
				"parentNode": children,
				"toggled": this.state.toggled,
				"selected": this.state.selected
			}, this.props.className);

			//节点展开图标
			var nodeToggleIcon = null;
			if (children && children.length > 0) {
				nodeToggleIcon = React.createElement('a', { className: 'toggleIcon hasIcon', onClick: this.onNodeToggle });;
			} else {
				nodeToggleIcon = React.createElement('a', { className: 'toggleIcon', onClick: this.onNodeToggle });;
			}
			return React.createElement('li', { ref: function ref(_ref) {
					return _this2.topLevelRef = _ref;
				}, className: nodeClasses }, nodeToggleIcon, this.renderNodeText(this.props.node, this), this.renderDrawer());
		}

		//节点信息

	}, {
		key: "renderNodeText",
		value: function renderNodeText(nodeProp, node) {
			//console.log(nodeProp);
			if (nodeProp.tab) {
				return React.createElement('a', { className: 'nodeText',
					'data-toggle': 'tab',
					"data-nodename": nodeProp.name,
					href: nodeProp.href, onClick: node.onNodeClick }, nodeProp.text);
			} else {
				return React.createElement('a', { className: 'nodeText',
					"data-nodename": nodeProp.name,
					href: 'javascript:void(0)', onClick: node.onNodeClick }, nodeProp.text);
			}
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

			var _props$node3 = this.props.node,
			    name = _props$node3.name,
			    text = _props$node3.text,
			    toggled = _props$node3.toggled,
			    remote = _props$node3.remote;

			var children = this.state.children;

			if (!Array.isArray(children)) {
				children = children ? [children] : [];
			}

			return React.createElement('ul', {
				ref: function ref(_ref2) {
					return _this3.subtreeRef = _ref2;
				}, className: 'nav nav-sub'
			}, children.map(function (child, index) {
				return React.createElement(TreeNode2, {
					key: child.id || index,
					node: child,
					onToggle: _this3.props.onToggle,
					onClick: _this3.props.onClick
				});
			}));
		}

		//绘制加载提示

	}, {
		key: "renderLoading",
		value: function renderLoading() {
			var _props$node4 = this.props.node,
			    name = _props$node4.name,
			    text = _props$node4.text,
			    children = _props$node4.children,
			    toggled = _props$node4.toggled;


			return React.createElement('ul', { className: 'nav nav-sub' }, React.createElement('li', null, React.createElement('a', null, 'Loading...')));
		}
	}]);

	return TreeNode2;
}(React.Component);