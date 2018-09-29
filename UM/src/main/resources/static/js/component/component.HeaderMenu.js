"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/6/7.
 */

/**
 * 主菜单
 *
 */

/*--------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------*/
//
var ComponentHeaderMenu = function (_React$Component) {
	_inherits(ComponentHeaderMenu, _React$Component);

	function ComponentHeaderMenu(props) {
		_classCallCheck(this, ComponentHeaderMenu);

		//初始数据
		var _this = _possibleConstructorReturn(this, (ComponentHeaderMenu.__proto__ || Object.getPrototypeOf(ComponentHeaderMenu)).call(this, props));

		_this.state = {
			data: {
				main: { name: "index", text: "全部商品", children: [{ name: "", text: "品种1", children: [{ name: "", text: "a", url: "" }, { name: "", text: "b", url: "" }] }, { name: "", text: "品种2", children: [] }, { name: "", text: "品种3", children: [] }, { name: "", text: "品种3", children: [] }, { name: "", text: "品种4", children: [] }] },
				nav: [{ name: "index", text: "首页", tag: "", url: "" }, { name: "trade", text: "交易", tag: "hot", url: "/trade/" }, { name: "1", text: "招标", tag: "" }, { name: "2", text: "意向", tag: "" }, { name: "3", text: "资讯", tag: "" }, { name: "3", text: "数据", tag: "new" }]
			},
			focusNode: props.current
		};
		return _this;
	}
	/*******************************************************************/


	_createClass(ComponentHeaderMenu, [{
		key: "componentWillMount",
		value: function componentWillMount() {}
		//DOM加载完成

	}, {
		key: "componentDidMount",
		value: function componentDidMount() {}
		/*******************************************************************/

	}, {
		key: "ajaxRequestData",
		value: function ajaxRequestData() {}
		/*******************************************************************/

	}, {
		key: "render",
		value: function render() {
			var data = this.state.data;
			var fn = this.state.focusNode;
			return React.createElement(HeaderMenu, { data: data, className: "esteel-headerMenu", focusNode: fn });
		}
	}]);

	return ComponentHeaderMenu;
}(React.Component);