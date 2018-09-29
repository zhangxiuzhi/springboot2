"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/10/31.
 */

var Sidebar = function (_React$Component) {
	_inherits(Sidebar, _React$Component);

	function Sidebar(props) {
		_classCallCheck(this, Sidebar);

		return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));
	}

	_createClass(Sidebar, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    className = _props.className,
			    name = _props.name,
			    id = _props.id,
			    focusNode = _props.focusNode;

			var classes = classNames('react-sidebar', className);

			var _props2 = this.props,
			    propsData = _props2.data,
			    onToggle = _props2.onToggle;

			var data = propsData;

			//console.log(data)


			return React.createElement("div", { ref: "root", className: classes }, React.createElement("ul", { className: "nav-list" }, data.map(function (node, index) {
				return React.createElement(SNode, {
					key: node.id || index,
					node: node,
					focusNode: focusNode,
					onNodeClick: _this2.props.onNodeClick
				});
			})));
		}
	}]);

	return Sidebar;
}(React.Component);