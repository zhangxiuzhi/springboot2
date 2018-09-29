"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/11/14.
 */

var ComponentRadioBox = function (_React$Component) {
    _inherits(ComponentRadioBox, _React$Component);

    function ComponentRadioBox(props) {
        _classCallCheck(this, ComponentRadioBox);

        /*
         *
         * */
        var _this = _possibleConstructorReturn(this, (ComponentRadioBox.__proto__ || Object.getPrototypeOf(ComponentRadioBox)).call(this, props));

        _this.state = {
            data: [{ id: "tradeType-all", text: "全部", value: "all", name: "tradeType" }, { id: "tradeType-inStock", text: "港口现货", value: "inStock", name: "tradeType" }, { id: "tradeType-future", text: "远期现货", value: "future", name: "tradeType" }, { id: "tradeType-pricing", text: "点价", value: "pricing", name: "tradeType" }]
        };
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(ComponentRadioBox, [{
        key: "onChange",
        value: function onChange(value, label) {
            if (this.props.onChange) {
                this.props.onChange(value, label);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var datas = this.props.data;

            return React.createElement(RadioBoxGroup, {
                data: datas,
                className: this.props.className,
                value: this.props.inputValue || this.props.value,
                name: this.props.inputName,
                onChange: this.onChange
            });
        }
    }]);

    return ComponentRadioBox;
}(React.Component);