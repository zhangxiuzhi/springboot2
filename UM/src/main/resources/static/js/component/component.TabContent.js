"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2018/4/2.
 *
 * 根据左侧sidebar节点点击，在主显示区域 .admin-page > .main 内动态添加 tabContent
 * 每个 tabContent 内含有iframe，用于显示节点上 url地址 所跳转的页面
 *
 */

var ComponentTabContent = function (_React$Component) {
    _inherits(ComponentTabContent, _React$Component);

    function ComponentTabContent(props) {
        _classCallCheck(this, ComponentTabContent);

        var _this = _possibleConstructorReturn(this, (ComponentTabContent.__proto__ || Object.getPrototypeOf(ComponentTabContent)).call(this, props));

        _this.state = {
            children: []
        };
        return _this;
    }

    //已插入真实 DOM 之后


    _createClass(ComponentTabContent, [{
        key: "componentDidMount",
        value: function componentDidMount() {}

        //更新后

    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {}
    }, {
        key: "tabContent",
        value: function tabContent() {
            return React.createElement("div", {
                className: "tab-pane"
            });
        }

        //添加tab

    }, {
        key: "addTabContent",
        value: function addTabContent() {
            var tabs = [];
            tabs.push(this.tabContent);
            this.setState({
                children: tabs
            });
        }

        //显示tab

    }, {
        key: "showTabContent",
        value: function showTabContent() {
            $('#myTabs a').click(function (e) {});
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div");
        }
    }]);

    return ComponentTabContent;
}(React.Component);