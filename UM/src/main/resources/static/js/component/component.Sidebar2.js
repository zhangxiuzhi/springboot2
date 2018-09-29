"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wangzhenjia on 2018/7/24.
 */

var ComponentSidebar2 = function (_React$Component) {
    _inherits(ComponentSidebar2, _React$Component);

    function ComponentSidebar2(props) {
        _classCallCheck(this, ComponentSidebar2);

        var _this = _possibleConstructorReturn(this, (ComponentSidebar2.__proto__ || Object.getPrototypeOf(ComponentSidebar2)).call(this, props));

        _this.scrollbar = null;
        _this.state = {
            data: [],
            focusNode: _this.props.focusNode
        };

        _this.setFocus = _this.setFocus.bind(_this);
        _this.getParentNode = _this.getParentNode.bind(_this);
        _this.requestUrlData = _this.requestUrlData.bind(_this);
        _this.onNodeClick = _this.onNodeClick.bind(_this);
        return _this;
    }

    //DOM加载完成


    _createClass(ComponentSidebar2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.props.url && this.props.url != "") {
                //加载url数据
                this.requestUrlData();
            }
        }

        //完成渲染新的props或者state后调用

    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            //设置系统breadcrumb地址
            var node = this.state.focusNode;
            if (node == undefined) {
                return false;
            }

            /*//自动调整至菜单位置
            if($(".sidebar li[data-name='"+node.name+"']").position()){
                var stop = $(".sidebar li[data-name='"+node.name+"']").position().top;
                $(this.scrollbar).scrollTop(stop);
            }
              //更新滚动条
            $(this.refs.sidebar.refs.root).css("height",$("body").height()-$(".topheader").outerHeight()  - $(".footer").outerHeight());
            if(this.scrollbar == null){
                this.scrollbar = $(this.refs.sidebar.refs.root).perfectScrollbar({
                    wheelSpeed: 0.5
                });
            }else{
                this.scrollbar.perfectScrollbar("update");
            }
              $(window).resize(function(){
                var minHeight = $("body").height() - $(".topheader").outerHeight()  - $(".footer").outerHeight();
                $(this.refs.sidebar.refs.root).css("height",minHeight);
                this.scrollbar.perfectScrollbar("update");
            }.bind(this));
            */
        }
    }, {
        key: "getParentNode",
        value: function getParentNode(curr, datas) {
            var parent = null;
            for (var i in datas) {
                if (datas[i].children && datas[i].children.length > 0) {
                    parent = getNode(curr, datas[i], datas[i].children);
                    if (parent != null) {
                        break;
                    }
                }
            }
            function getNode(curr, parent, datas) {
                var p;
                for (var i in datas) {
                    if (curr == datas[i].name) {
                        p = parent;
                        break;
                    }
                }
                return p;
            }
            return parent;
        }

        //设置当前选中项

    }, {
        key: "setFocus",
        value: function setFocus(node) {
            this.setState({
                focusNode: node
            });
        }

        //加载url数据

    }, {
        key: "requestUrlData",
        value: function requestUrlData() {
            jbsframe.ajaxRequest({
                url: this.props.url
            }, function (data, msg) {
                // 填充
                this.setState({
                    data: data
                });
            }.bind(this));
        }

        //节点点击

    }, {
        key: "onNodeClick",
        value: function onNodeClick(node, _link) {
            this.setFocus(node);
            if (this.props.onNodeClick) {
                this.props.onNodeClick(node, _link);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var data = this.state.data.length > 0 ? this.state.data : this.props.data;
            var fn = this.state.focusNode ? this.state.focusNode : [];

            return React.createElement(Sidebar2, {
                ref: "sidebar",
                data: data, //this.state.data,
                className: "nav-main",
                focusNode: fn,
                onNodeClick: this.onNodeClick
            });
        }
    }]);

    return ComponentSidebar2;
}(React.Component);