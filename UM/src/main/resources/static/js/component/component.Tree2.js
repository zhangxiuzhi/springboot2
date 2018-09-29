"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by WangZhenJia(159109799@qq.com) on 2018/1/25.
 */

var ComponentTree2 = function (_React$Component) {
	_inherits(ComponentTree2, _React$Component);

	function ComponentTree2(props) {
		_classCallCheck(this, ComponentTree2);

		var _this = _possibleConstructorReturn(this, (ComponentTree2.__proto__ || Object.getPrototypeOf(ComponentTree2)).call(this, props));

		_this.state = {
			data: []
		};

		_this.onToggle = _this.onToggle.bind(_this);
		_this.onClick = _this.onClick.bind(_this);
		return _this;
	}

	_createClass(ComponentTree2, [{
		key: "onToggle",
		value: function onToggle(event, node) {
			if (this.props.onToggle) {
				this.props.onToggle(event, node.props.node);
			}
		}
	}, {
		key: "onClick",
		value: function onClick(event, node) {
			$("#component-tree .tree-node").removeClass("selected");
			if (this.props.onClick) {
				this.props.onClick(event, node.props.node);
			}
		}

		//DOM加载完成

	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			//选中当前默认节点
			var curNode = this.props.currentNode;
			var $node = $(this.refs.tree2.refs.root).find("a[data-nodename='" + curNode + "']");
			$node.parent("li.tree-node").addClass("selected");
			$node.parent("li.tree-node").parents("li.tree-node").addClass("toggled");
		}
	}, {
		key: "render",
		value: function render() {
			var data = this.state.data.length == 0 ? this.props.data : this.state.data;

			return React.createElement(Tree2, {
				ref: "tree2",
				data: data,
				className: this.props.className,
				onToggle: this.onToggle,
				onClick: this.onClick
			});
		}
	}]);

	return ComponentTree2;
}(React.Component);