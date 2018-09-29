'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageButton = function (_React$Component) {
  _inherits(PageButton, _React$Component);

  function PageButton(props) {
    _classCallCheck(this, PageButton);

    return _possibleConstructorReturn(this, (PageButton.__proto__ || Object.getPrototypeOf(PageButton)).call(this, props));
  }

  _createClass(PageButton, [{
    key: 'pageBtnClick',
    value: function pageBtnClick(e) {
      e.preventDefault();
      this.props.changePage(e.currentTarget.textContent);
    }
  }, {
    key: 'render',
    value: function render() {
      /*const classes = classSet({
        'active': this.props.active,
        'disabled': this.props.disable,
        'hidden': this.props.hidden,
        'page-item': true
      });
      */
      var classes = this.props.active ? "active" : "";
      classes += this.props.disable ? ' disabled' : "";
      classes += this.props.hidden ? ' hidden' : "";
      classes += ' page-item';

      return _react2.default.createElement('li', { className: classes }, _react2.default.createElement('a', { href: '#', onClick: this.pageBtnClick, className: 'page-link' }, _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.children } })));
    }
  }]);

  return PageButton;
}(_react2.default.Component);

exports.default = PageButton;