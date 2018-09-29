"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/11/1.
 */

var ComponentSidebar = function (_React$Component) {
    _inherits(ComponentSidebar, _React$Component);

    function ComponentSidebar(props) {
        _classCallCheck(this, ComponentSidebar);

        var _this = _possibleConstructorReturn(this, (ComponentSidebar.__proto__ || Object.getPrototypeOf(ComponentSidebar)).call(this, props));

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


    _createClass(ComponentSidebar, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.props.url && this.props.url != "") {
                //加载url数据
                this.requestUrlData();
            } else {
                //渲染滚动条
                this.renderScrollbar();
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
            //设置标题
            /*if(node.children){
                //如果含有子项
                $("#bc-box .bc-title").html(node.children.text);
            }else{
                $("#bc-box .bc-title").html(node.text);
            }
              //var parent = this.getParentNode(node.name,this.props.data);
            var $root = $(this.refs.sidebar.refs.root);
            var $current = $root.find("li[data-name='"+node.name+"']");
            var $parents = $current.parents("li");
            $("#bc-box .bc-link").empty();
              //父节点
            for(var i=0;i<$parents.length;i++){
                var $sidebar_parent = $($parents[i]);
                var $breamcrumb_parent = $("<a href='javascript:void(0)'>"+$sidebar_parent.children("a").text()+"</a>");
                var $breamcrumb_parent_ul = $sidebar_parent.children("ul").clone();
                $breamcrumb_parent_ul.prepend("<li class='_parent'>"+$sidebar_parent.children("a").text()+"</li>");
                $breamcrumb_parent.append($breamcrumb_parent_ul);
                $("#bc-box .bc-link").prepend($breamcrumb_parent);
            }
              //首页
            if(node.name != "home"){
                $("#bc-box .bc-link").prepend("<a href='/'><i class='fal fa-home'></i></a>");
            }
                //当前节点
            if(node.children) {
                $("#bc-box .bc-link").append("<a>" + node.text + "</a>");
                $("#bc-box .bc-link").append("<a class='selected'>" + node.children.text + "</a>");
            }else{
                $("#bc-box .bc-link").append("<a class='selected'>" + node.text + "</a>");
            }
              $("#bc-box .bc-link a").hover(function(e){
                var $b_link = $(e.currentTarget);
                var $b_link_ul = $b_link.children("ul");
                  if($b_link.hasClass("nav-submenu")){
                    $b_link_ul = $b_link.next("ul");
                    $b_link.append($b_link_ul)
                    $b_link_ul.css({
                        left:-$b_link.innerWidth()+3 ,
                        top:0//$b_link.innerHeight()
                    });
                }else{
                    $b_link_ul.css({
                        left:$b_link.offset().left - 3 ,
                        top:$b_link.offset().top
                    });
                }
              });
            */

            //自动调整至菜单位置
            if ($(".sidebar li[data-name='" + node.name + "']").position()) {
                var stop = $(".sidebar li[data-name='" + node.name + "']").position().top;
                $(this.scrollbar).scrollTop(stop);
            }

            //更新滚动条

            $(this.refs.root).css("height", $("body").height() - $(".topheader").outerHeight() - $(".footer").outerHeight());
            if (this.scrollbar == null) {
                this.scrollbar = $(this.refs.root).perfectScrollbar({
                    wheelSpeed: 0.5
                });
            } else {
                this.scrollbar.perfectScrollbar("update");
            }

            $(window).resize(function () {
                var minHeight = $("body").height() - $(".topheader").outerHeight() - $(".footer").outerHeight();
                $(this.refs.root).css("height", minHeight);
                this.scrollbar.perfectScrollbar("update");
            }.bind(this));
        }

        //渲染滚动条

    }, {
        key: "renderScrollbar",
        value: function renderScrollbar() {

            $(this.refs.root).css("height", $("body").height() - $(".topheader").outerHeight() - $(".footer").outerHeight());
            if (this.scrollbar == null) {
                this.scrollbar = $(this.refs.root).perfectScrollbar({
                    wheelSpeed: 0.5
                });
            } else {
                this.scrollbar.perfectScrollbar("update");
            }

            $(window).resize(function () {
                var minHeight = $("body").height() - $(".topheader").outerHeight() - $(".footer").outerHeight();
                $(this.refs.root).css("height", minHeight);
                this.scrollbar.perfectScrollbar("update");
            }.bind(this));
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

        //设置用户信息栏

    }, {
        key: "renderUserProfile",
        value: function renderUserProfile() {
            return React.createElement("li", {}, React.createElement("div", { className: "user-profile" }, React.createElement("div", { className: "user-pic" }, React.createElement("img", { src: "/images/head-portrait.png", className: "rounded-circle" }), React.createElement("div", { className: "user-content margin-bottom-10" }, React.createElement("h5", { className: "user-name margin-top-10" }, this.props.userName), React.createElement("a", { className: "btn btn-circle btn-sm ", id: "sidebar-userProfile", "data-toggle": "dropdown", "aria-expanded": "false" }, React.createElement("i", { className: "fal fa-cog" })), React.createElement("a", { className: "btn btn-circle btn-sm", id: "sidebar-loginOut", href: "/logout" }, React.createElement("i", { className: "fal fa-power-off" }))))));
        }
    }, {
        key: "renderNode",
        value: function renderNode() {
            var _this2 = this;

            return this.props.data.map(function (node, index) {
                return React.createElement(SNode2, {
                    key: node.id || index,
                    node: node,
                    focusNode: _this2.state.focusNode,
                    onNodeClick: _this2.props.onNodeClick
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var data = this.state.data.length > 0 ? this.state.data : this.props.data;
            var fn = this.state.focusNode ? this.state.focusNode : [];
            return React.createElement("div", {
                ref: "root",
                className: "sidebar-nav"
            }, React.createElement("ul", {}, this.renderUserProfile(), this.renderNode()));
            /*
                      React.createElement("div", {
                              className:"bigImage",
                          style:{
                                  width:100,
                              height:120,
                              margin:"0px auto 0",
                              padding:"10px 0 0"
                          }
                      },React.createElement("img", {
                          src:$("#user-auth-dp-img").attr("src"),
                          style:{
                              "border-radius": "50%"
                          }
                      })
                      ),*/
            /*
                        return React.createElement(Sidebar, {
                            ref:"sidebar",
                            data: data,//this.state.data,
                            className: "nav-main",
                            focusNode:fn
                            ,onNodeClick:this.onNodeClick
                        })
                    */
            //);
            /*
            return React.createElement(Sidebar, {
            	ref:"sidebar",
            	data: data,//this.state.data,
            	className: "nav-main",
            	focusNode:fn
            });
            */
        }
    }]);

    return ComponentSidebar;
}(React.Component);