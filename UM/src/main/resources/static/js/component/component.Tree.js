"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by WangZhenJia(159109799@qq.com) on 2017/9/5.
 */

var ComponentTree = function (_React$Component) {
	_inherits(ComponentTree, _React$Component);

	function ComponentTree(props) {
		_classCallCheck(this, ComponentTree);

		var _this = _possibleConstructorReturn(this, (ComponentTree.__proto__ || Object.getPrototypeOf(ComponentTree)).call(this, props));

		_this.state = {
			data: []
		};

		_this.onToggle = _this.onToggle.bind(_this);
		return _this;
	}

	_createClass(ComponentTree, [{
		key: "onToggle",
		value: function onToggle(event, node) {
			//console.log("click ->", node, node.refs);
			//if (node.props.node.remote) {
			if (this.props.onExpand) {
				this.props.onExpand(node, node.props.node.remote);
			}
			//}
			//document.getElementById("log-tree").innerHTML = "节点名称:<span class='text-danger'>" + node.props.node.text + "</span> 节点打开:<span class='text-danger'>" + node.state.toggled + "</span>";
		}
	}, {
		key: "render",
		value: function render() {
			var data = this.state.data.length == 0 ? this.props.data : this.state.data;

			return React.createElement(Tree, {
				data: data,
				className: this.props.className,
				onToggle: this.onToggle
			});
		}
	}]);

	return ComponentTree;
}(React.Component);