"use strict";

/**
 * Created by wzj on 2018/4/2. tabContent 模块tab容器
 */

function JBSFrame_tabContent() {
    JBSFrame.call(this);

    this.currentTab = null;
    this.tabStore = [];

    this.initUI = function () {

        //用户头像链接
        erp_tabContent.formatLinkInTable($("#user-info-protrait")[0]);
        //默认首页tab点击
        $("#bcTabs a[href=#tab-index]").click(function () {
            erp_sidebar.setFocus({ name: "home" });
            erp_tabContent.showTab($(this).data("node"), this);
        });
        //格式化所有tab-link的链接，设置成以tab形式打开
        this.formatTabLink();

        //左右开关
        $(".bc-tabs-btnLeft").click(function () {
            //console.log($("#bcTabs .tab.active").prev())
            var $prevTab = $("#bcTabs .tab.active").prev(".tab");
            if ($prevTab.length > 0) {
                var $_link = $prevTab.find("a.bc-title");
                var _node = $_link.data("node");
                //显示上一个tab
                erp_tabContent.showTab(_node, $_link[0]);
            }
        });
        $(".bc-tabs-btnRight").click(function () {
            //console.log($("#bcTabs .tab.active"))
            var $nextTab = $("#bcTabs .tab.active").next(".tab");
            if ($nextTab.length > 0) {
                var $_link = $nextTab.find("a.bc-title");
                var _node = $_link.data("node");
                //显示下一个tab
                erp_tabContent.showTab(_node, $_link[0]);
            }
        });
        //关闭所有tab
        $(".bc-tabs-btnCloseAll").click(function () {
            $("#bcTabs .tab").each(function (index, tab) {
                var $_link = $(tab).find("a");
                if ($_link.attr("href") != "#tab-index") {
                    //关闭tab
                    erp_tabContent.closeTab($_link.data("node"), $_link[0]);
                }
            });
        });
    };

    //根据参数打开tab窗口
    this.openNewTab = function (opt, open) {
        if (open != false) {
            this.closeActiveTab();
        }
        //console.log(opt)
        var _link = document.createElement("a");
        _link.href = opt.url;

        //转换对象并添加至tab容器中
        parent.erp_tabContent.addTabStore({
            url: opt.url,
            title: opt.title,
            type: opt.type,
            name: opt.name
        }, _link);
    };

    //格式化所有tab-link的链接，设置成以tab形式打开
    this.formatTabLink = function () {
        $(".tab-link").each(function (index, _link) {
            if (!_link.onclick) {
                erp_tabContent.formatLinkInTable(_link);
            }
        });
    };

    //添加到tab仓库
    this.addTabStore = function (node, _link) {
        var _href = "#tab-" + node.type + "-" + node.name;
        //添加到tab仓库
        if (this.tabStore.indexOf(_href) < 0) {
            this.tabStore.push(_href);

            //添加tab标签,添加tabContent
            this.addTabLabel(node);
        } else {
            //显示历史tab
            this.showTab(node, _link);
            //刷新iframe
            this.reloadFrame();

            var _id = "tab-" + node.name;
            var $tab = $("#bcTabs a[href='#" + _id + "']").closest(".tab");

            //刷新pane下的iframe-url地址
            var $pane = $("#" + _id);
            $pane.find("iframe#iframe-" + _id).attr("src", node.url);

            //移动到所在位置


            //如果tab位置 > 总宽度
            /*var offsetX = $("#bcTabs a[href=#"+_id+"]").offset().left;
            if(!$("body").hasClass("hide-sidebar")){
                offsetX = offsetX - $(".sidebar").outerWidth();
            }*/
            /*if($tab.data("offsetX")){
                this.moveToTab($tab.data("offsetX"));
            }else{
                this.moveToTab(0);
            }*/
        }

        //清除所有tooltip
        $(".tooltip").remove();
    };

    //添加tab标签
    this.addTabLabel = function (node, _link) {
        var $active = $("#bcTabs div.tab.active");
        $("#bcTabs div.tab").removeClass("active");

        //属性

        var _url = node.url;
        var _title = node.title;
        var _type = node.type;
        var _name = node.name;
        var _href = "#tab-" + _type + "-" + _name;
        //element
        var $tab = $("<div class='tab active'></div>");
        var $_link = $("<a class='bc-title' href='" + _href + "' data-url='" + _url + "'>" + _title + "</a>");
        var $_close = $("<a href='javascript:void(0)' class='close-tab fal fa-times-circle'></a>");
        //$("#bcTabs div.tab:first-child").after($tab);
        //$active.after($tab);
        if (_link) {
            $(_link).data("node", node);
        }
        $tab.append($_link);
        $tab.append($_close);
        $("#bcTabs").append($tab);
        if (_link == undefined) {
            $tab.find("a.bc-title").data("node", node);
        }

        //添加pane
        this.addTabContent(node);

        //设置移动位置
        //如果当前tabs容器宽度 > 总宽度
        if ($("#bcTabs").width() > $(".bc-tabs-box").width()) {
            var offsetX = $(".bc-tabs-box").width() - $("#bcTabs").width() - 44;
            this.moveToTab(offsetX);
            $tab.data("offsetX", offsetX); //保存定位
        }

        //绑定事件
        $_link.unbind("click").bind("click", function () {
            //显示tab
            erp_tabContent.showTab($(this).data("node"), this);
        });
        $_close.unbind("click").bind("click", function () {
            //关闭tab
            var $link = $(this).prev("a.bc-title");
            erp_tabContent.closeTab($link.data("node"), $link[0]);
        });
    };
    //添加tabContent
    this.addTabContent = function (node) {
        var _url = node.url;
        var _title = node.title;
        var _type = node.type;
        var _name = node.name;
        var _id = "tab-" + _type + "-" + _name;
        var iframe_id = "iframe-" + _id;

        //tabContent
        $("#adminPage-main-tabs .content").removeClass("active");

        var $pane = $("<div class='content tab-pane active' id='" + _id + "'><iframe name='" + iframe_id + "' id='" + iframe_id + "' frameborder='0' src='" + _url + "'></iframe></div>");
        $pane.css("height", window.innerHeight - $(".topheader").outerHeight() - $(".breadcrumb").outerHeight());
        $("#adminPage-main-tabs").append($pane);
        /// $("#adminPage-main-tabs").append("<div class='content tab-pane active' id='"+pane_id+"'></div>");

        //当前tab
        this.currentTab = $pane;
        this.loadTabUrl($pane, _url);
    };

    this.loadTabUrl = function ($pane, url) {
        var iframe = $pane.find("iframe")[0];
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () {
                // IE
                $(iframe).contents().find("body").addClass("inner-body");
                $(iframe).contents().find("body").addClass("hide-sidebar");
                $(iframe).contents().find("body").addClass("hide-topheader");

                if (document.documentElement.clientHeight) {
                    //console.log(document.documentElement.clientHeight,document.documentElement.scrollHeight)
                    //erp_tabContent.currentTab.find("iframe").css("height",document.documentElement.clientHeight)
                }
                var minHeight = window.innerHeight - $(".topheader").outerHeight() - $(".breadcrumb").outerHeight(); //- $(".footer").outerHeight();
                erp_tabContent.currentTab.css("height", minHeight);

                //remove block
                jbsframe.unblockElement($pane);
            });
        } else {
            iframe.onload = function () {
                // 非IE
                $(iframe).contents().find("body").addClass("inner-body");
                $(iframe).contents().find("body").addClass("hide-sidebar");
                $(iframe).contents().find("body").addClass("hide-topheader");

                if (document.documentElement.clientHeight) {
                    //erp_tabContent.currentTab.find("iframe").css("height",document.documentElement.clientHeight)
                    //console.log(document.documentElement.clientHeight,document.documentElement.scrollHeight)
                }
                var minHeight = window.innerHeight - $(".topheader").outerHeight() - $(".breadcrumb").outerHeight(); //- $(".footer").outerHeight();
                erp_tabContent.currentTab.css("height", minHeight);
                //remove block
                jbsframe.unblockElement($pane);
            };
        }
        //add block
        jbsframe.blockElement($pane);

        //bind resize
        $(iframe.contentWindow).resize(function () {
            var $table = $(this.document.body).find(".table-box");
            $table.css("width", "inherit");
        });
    };

    //显示tab,content
    this.showTab = function (node, _link) {
        var href = "";
        var _id = "";
        var $pane = null;

        if (node) {
            _id = "#tab-" + (node.type + "-" + node.name);
            href = node.url;
            $pane = $(_id);
        }

        if (_link.hash == "#tab-index") {
            _id = _link.hash;
            $pane = $(_id);
        }

        //当前tab
        this.currentTab = $pane;

        //tab
        $("#bcTabs div.tab").removeClass("active");
        $("#bcTabs div.tab>a[href='" + _id + "']").closest("div.tab").addClass("active");
        //content
        $("#adminPage-main-tabs .content").removeClass("active");
        $pane.addClass("active");

        //move
        $("#bcTabs .tab.active").prev(".tab").each(function (index, tab) {});
        if ($("#bcTabs .tab.active").data("offsetX")) {
            /* if($("#bcTabs").width() > $(".bc-tabs-box").width()){
                 if(Math.abs($("#bcTabs .tab.active").data("offsetX")) > $(".bc-tabs-box").width()){
                     this.moveToTab(Math.abs($("#bcTabs .tab.active").data("offsetX")) - $(".bc-tabs-box").width());
                 }else{
                     this.moveToTab($("#bcTabs .tab.active").data("offsetX"));
                 }
             }else{
                 this.moveToTab(0);
             }*/
            if ($("#bcTabs").width() > $(".bc-tabs-box").width()) {
                if (Math.abs($("#bcTabs .tab.active").data("offsetX")) > $(".bc-tabs-box").width()) {
                    this.moveToTab(Math.abs($("#bcTabs .tab.active").data("offsetX")) - $("#bcTabs").width() + $(".bc-tabs-box").width());
                } else {
                    this.moveToTab($("#bcTabs .tab.active").data("offsetX"));
                }
            } else {
                this.moveToTab(0);
            }
            console.log($("#bcTabs").width(), $(".bc-tabs-box").width(), $("#bcTabs .tab.active").data("offsetX"));
        } else {
            this.moveToTab(0);
        }

        //set tree active node
        if (node) {
            erp_sidebar.setFocus(node); //设置当前树节点的焦点
        }
    };

    //关闭tab，content
    this.closeTab = function (node, _link) {
        //console.log(node,_link)
        var _id = _link.hash;
        var index = this.tabStore.indexOf(_id);

        var $_tab = $("#bcTabs div.tab>a[href='" + _id + "']").closest("div.tab");
        var $_pane = $(_id);
        //console.log(index,$_tab,$_pane)


        //选中上一个tab
        var $prevTab = $_tab.prev("div.tab");
        if ($prevTab.length > 0) {
            var $link = $prevTab.find("a.bc-title");
            this.showTab($($link).data("node"), $link[0]);
            this.reloadFrame();
        }

        //从仓库清除
        this.tabStore.splice(index, 1);
        $_tab.remove();
        $_pane.remove();
    };

    //关闭当前选中tab
    this.closeActiveTab = function () {
        var $activeTab = $("#bcTabs .tab.active");
        var $activeTab_link = $("#bcTabs .tab.active>a.bc-title");
        this.closeTab($activeTab.data("node"), $activeTab_link[0]);
    };

    //重新刷新iframe
    this.reloadFrame = function () {
        if (this.currentTab.find("iframe").length > 0) {
            this.currentTab.find("iframe")[0].contentWindow.location.reload(true);
        }
    };

    //所有表格内的超链接处理
    this.formatLinkInTable = function (_link) {
        if (_link == undefined || _link.attributes["href"] == undefined) {
            return false;
        }
        if ($(_link).data("node")) {
            return false;
        }
        var href = _link.attributes["href"].nodeValue;
        $(_link).attr("href", "#" + href);
        $(_link).attr("hash", href);

        //属性
        var _name = $(_link).data("tabname") || $(_link).attr("data-tabname"); //id
        var _type = $(_link).data("tabtype") || $(_link).attr("data-tabtype"); //add,view ,edit, copy, copyAll,charge,pdf
        var _title = $(_link).data("tabtitle") || $(_link).text(); //描述类型

        $(_link).data("node", {
            url: href,
            title: _title,
            name: _name,
            type: _type
        });

        //编辑,查看
        $(_link).unbind("click").bind("click", function () {
            //转换对象并添加至tab容器中
            parent.erp_tabContent.addTabStore($(this).data("node"), this);
            //清除所有tooltip
            $(".tooltip").remove();
        });
    };

    //移动到tab所在位置
    this.moveToTab = function (offsetX) {
        $("#bcTabs").css("transform", "translateX(" + offsetX + "px)");
    };
}

/*
 * //body load
 * --------------------------------------------------------------------
 */
var erp_tabContent;
$(document).ready(function (e) {
    erp_tabContent = new JBSFrame_tabContent();
    // 初始化UI
    erp_tabContent.initUI();
});