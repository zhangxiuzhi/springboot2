"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/11/6.
 */

var HeaderMenu = function (_React$Component) {
	_inherits(HeaderMenu, _React$Component);

	function HeaderMenu() {
		_classCallCheck(this, HeaderMenu);

		return _possibleConstructorReturn(this, (HeaderMenu.__proto__ || Object.getPrototypeOf(HeaderMenu)).call(this));
	}

	//已插入真实 DOM 之后


	_createClass(HeaderMenu, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			//显示主节点的子项
			var refs = this.refs;
			$(refs.allitem).hover(function () {
				$(refs.allitemList).show();
			}, function () {
				$(refs.allitemList).hide();
			});

			$(refs.allitemList).find(".item-li").hover(function () {
				$(this).addClass("hover");
			}, function () {
				$(this).removeClass("hover");
			});
		}

		//主节点

	}, {
		key: "renderMainLink",
		value: function renderMainLink(link) {
			var _this2 = this;

			return React.createElement('li', { className: 'nav-allitem', ref: 'allitem' }, React.createElement('a', { href: '' }, link.text), React.createElement('div', { className: 'allitem-list', ref: 'allitemList' }, React.createElement('ul', { className: 'item' }, link.children.map(function (sub, index) {
				return _this2.renderMainLinkSub(sub, index);
			}))));
		}
		//主节点分支

	}, {
		key: "renderMainLinkSub",
		value: function renderMainLinkSub(sub, index) {
			var subchildren = null;
			var sub_icon = null;
			if (sub.children.length > 0) {
				sub_icon = React.createElement('span', { className: 'fa fa-angle-right' });
				subchildren = this.renderMainLinkSubNode(sub);
			}

			return React.createElement('li', { className: 'item-li', key: sub.id || index }, React.createElement('div', { className: 'item-nav' }, React.createElement('span', { className: '' }), React.createElement('h3', null, sub.text), sub_icon), subchildren);
		}
		//主节点分支节点

	}, {
		key: "renderMainLinkSubNode",
		value: function renderMainLinkSubNode(sub) {
			return React.createElement('div', { className: 'item-list' }, React.createElement('ul', null, sub.children.map(function (li, index) {
				return React.createElement('li', { key: li.id || index }, li.text);
			})));
		}

		//节点

	}, {
		key: "renderLink",
		value: function renderLink(fn, link, index) {
			var classes = classNames('nav-link', {
				"selected": fn.name == link.name ? true : false
			});

			var tag = null;
			if (link.tag) {
				var classes_tag = classNames('tag', 'tag-' + link.tag);
				tag = React.createElement('span', { className: classes_tag }, link.tag);
			}
			return React.createElement('li', { key: link.id || index, className: classes }, React.createElement('a', { href: link.url }, tag, link.text));
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    className = _props.className,
			    name = _props.name,
			    id = _props.id,
			    focusNode = _props.focusNode;

			var classes = classNames('react-headerMenu', className);

			var main = this.props.data.main;
			var nav = this.props.data.nav;

			return React.createElement('div', { className: classes }, React.createElement('ul', { className: 'clearfix' }, this.renderMainLink(main), nav.map(function (link, index) {
				return _this3.renderLink(focusNode, link, index);
			})));
		}
	}]);

	return HeaderMenu;
}(React.Component);