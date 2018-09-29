"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by WangZhenJia(159109799@qq.com) on 2017/9/5.
 */

var ComponentSelectBox = function (_React$Component) {
    _inherits(ComponentSelectBox, _React$Component);

    function ComponentSelectBox(props) {
        _classCallCheck(this, ComponentSelectBox);

        var _this = _possibleConstructorReturn(this, (ComponentSelectBox.__proto__ || Object.getPrototypeOf(ComponentSelectBox)).call(this, props));

        _this.state = {
            data: [],
            node: ""
        };

        _this.customChange = _this.customChange.bind(_this);
        _this.getOrgSelect = _this.getOrgSelect.bind(_this);
        _this.setValue = _this.setValue.bind(_this);
        _this.insertErrorBubble = _this.insertErrorBubble.bind(_this);
        _this.removeErrorBubble = _this.removeErrorBubble.bind(_this);
        return _this;
    }

    //赋值


    _createClass(ComponentSelectBox, [{
        key: "setValue",
        value: function setValue(val) {
            this.refs.selectbox.setState({
                pendingValue: val
            });
        }
        //自定义change方法

    }, {
        key: "customChange",
        value: function customChange(node) {
            this.setState({
                node: node
            });
            //是否验证
            if (this.props.validetta && node != undefined) {
                this.removeErrorBubble();
            }
            if (this.props.onChange) {
                this.props.onChange(node == undefined ? { value: "", text: "" } : node);
            }
        }

        //获取原始下拉框

    }, {
        key: "getOrgSelect",
        value: function getOrgSelect() {
            return $(this.refs.selectbox.refs.select);
        }

        //插入错误提示

    }, {
        key: "insertErrorBubble",
        value: function insertErrorBubble(text) {
            var pos,
                W = 0,
                H = 0;
            var $bubble = $("<div class='validetta-bubble validetta-bubble--bottom'></div>");
            $bubble.html(text);

            var $element = this.getOrgSelect();
            var $elemParent = $element.parent(".react-selectbox-native").siblings(".react-selectbox-button");
            pos = $elemParent.position();
            H = $elemParent[0].offsetHeight;
            $bubble.css({
                top: pos.top + H + 0,
                left: pos.left + W + 15
            });
            $elemParent.next(".validetta-bubble").remove();
            $elemParent.after($bubble);
        }

        //删除错误提示

    }, {
        key: "removeErrorBubble",
        value: function removeErrorBubble() {
            var $element = this.getOrgSelect();
            var $elemParent = $element.parent(".react-selectbox-native").siblings(".react-selectbox-button");
            $elemParent.next(".validetta-bubble").remove();
        }
    }, {
        key: "render",
        value: function render() {
            ;
            var data = this.props.data.length > 0 ? this.props.data : this.state.data;
            var filter = true;
            if (this.props.filter == false) {
                filter = false;
            }
            return React.createElement(SelectBox, {
                ref: 'selectbox',
                label: this.props.label,
                name: this.props.inputName,
                value: this.props.inputValue,
                data: data,
                filter: filter,
                floatItem: this.props.floatItem || false,
                validetta: this.props.validetta,
                onChange: this.customChange
            });
        }
    }]);

    return ComponentSelectBox;
}(React.Component);