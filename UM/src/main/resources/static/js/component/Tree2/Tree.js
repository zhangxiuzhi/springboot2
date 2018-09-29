'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/9/8.
 */

var Tree = function (_React$Component) {
	_inherits(Tree, _React$Component);

	function Tree(props) {
		_classCallCheck(this, Tree);

		return _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));
	}

	_createClass(Tree, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    className = _props.className,
			    name = _props.name,
			    id = _props.id;

			var classes = classNames('react-tree', className);

			var _props2 = this.props,
			    propsData = _props2.data,
			    onToggle = _props2.onToggle;

			var data = propsData;

			if (!Array.isArray(data)) {
				data = [data];
			}
			return React.createElement('div', { className: classes, name: name, id: id }, React.createElement('ul', { ref: function ref(_ref) {
					return _this2.treeBaseRef = _ref;
				}, className: 'nav' }, data.map(function (node, index) {
				return React.createElement(TreeNode, {
					key: node.id || index,
					node: node,
					onToggle: onToggle
				});
			})));
		}
	}]);

	return Tree;
}(React.Component);

/*
Tree.propTypes = {
	onToggle: PropTypes.func
};*/