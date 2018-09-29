'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2018/1/25.
 */

var Tree2 = function (_React$Component) {
	_inherits(Tree2, _React$Component);

	function Tree2(props) {
		_classCallCheck(this, Tree2);

		var _this = _possibleConstructorReturn(this, (Tree2.__proto__ || Object.getPrototypeOf(Tree2)).call(this, props));

		_this.perSelNode = null;
		_this.state = {
			selectedNode: null
		};

		_this.onClick = _this.onClick.bind(_this);
		_this.onToggle = _this.onToggle.bind(_this);
		return _this;
	}

	//更新后


	_createClass(Tree2, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}

		//点击

	}, {
		key: 'onClick',
		value: function onClick(event, node) {

			//回调
			if (this.props.onClick) {
				this.props.onClick(event, node);
			}

			//比较是否相同，不同则取消点击
			if (this.state.selectedNode != null && this.state.selectedNode != node) {
				this.state.selectedNode.setState({
					selected: false
				});
			} else {}
			this.setState({
				selectedNode: node
			});
		}

		//展开

	}, {
		key: 'onToggle',
		value: function onToggle(event, node) {
			if (this.props.onToggle) {
				this.props.onToggle(event, node);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    className = _props.className,
			    name = _props.name,
			    id = _props.id,
			    url = _props.url;

			var classes = classNames('react-tree2', className);

			var propsData = this.props.data;

			var data = propsData;

			if (!Array.isArray(data)) {
				data = [data];
			}
			return React.createElement('div', { ref: "root", className: classes, name: name, id: id, url: url }, React.createElement('ul', { ref: function ref(_ref) {
					return _this2.treeBaseRef = _ref;
				}, className: 'nav' }, data.map(function (node, index) {
				return React.createElement(TreeNode2, { key: node.id || index, node: node,
					onToggle: _this2.onToggle,
					onClick: _this2.onClick
				});
			})));
		}
	}]);

	return Tree2;
}(React.Component);