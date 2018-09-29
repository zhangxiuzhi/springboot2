"use strict";

/*
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
*/

var PageButton = function (_React$Component) {
  _inherits(PageButton, _React$Component);

  function PageButton(props) {
    _classCallCheck(this, PageButton);

    var _this = _possibleConstructorReturn(this, (PageButton.__proto__ || Object.getPrototypeOf(PageButton)).call(this, props));

    _this.pageBtnClick = function (e) {
      e.preventDefault();
      var cthtml = e.currentTarget.innerHTML;
      if (cthtml.toString().indexOf("fa") >= 0 || cthtml.toString().indexOf("far") >= 0 || cthtml.toString().indexOf("fal") >= 0) {
        _this.props.changePage(cthtml);
      } else {
        _this.props.changePage(e.currentTarget.textContent);
      }
    };
    return _this;
  }

  _createClass(PageButton, [{
    key: "render",
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

      var p_children = this.props.children;
      if (p_children.toString().indexOf("fa") >= 0 || p_children.toString().indexOf("far") >= 0 || p_children.toString().indexOf("fal") >= 0) {
        return React.createElement("li", { className: classes }, React.createElement("a", { href: "#", onClick: this.pageBtnClick, className: "page-link",
          dangerouslySetInnerHTML: { __html: p_children }
        }));
      } else {
        return React.createElement("li", { className: classes }, React.createElement("a", { href: "#", onClick: this.pageBtnClick, className: "page-link" }, this.props.children));
      }
    }
  }]);

  return PageButton;
}(React.Component);