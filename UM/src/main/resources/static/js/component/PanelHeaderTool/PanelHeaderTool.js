"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2018/2/11.
 *
 * panel容器头部的工具条
 */
var PanelHeaderTool = function (_React$Component) {
  _inherits(PanelHeaderTool, _React$Component);

  function PanelHeaderTool(props) {
    _classCallCheck(this, PanelHeaderTool);

    var _this = _possibleConstructorReturn(this, (PanelHeaderTool.__proto__ || Object.getPrototypeOf(PanelHeaderTool)).call(this, props));

    _this.state = {};

    _this.maximizePanel = _this.maximizePanel.bind(_this);
    _this.minusPanel = _this.minusPanel.bind(_this);
    return _this;
  }

  //DOM加载完成


  _createClass(PanelHeaderTool, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
    //jbsframe.tooltip();


    /*最大化*/

  }, {
    key: "maximizePanel",
    value: function maximizePanel(e) {
      var $pht = $(this.refs.tools).parents(".panel-header-tool");
      var $panel = $pht.closest(".panel");
      var $panel_body = $panel.find(".panel-body");

      //
      if ($panel.hasClass("fullscrean")) {
        jbsframe.renderAdminPageScroll();
        //$("body").removeClass("panel-fullscrean");
        $panel.removeClass("fullscrean");
        $(e.currentTarget).find("i").removeClass("fa-window-restore");

        //根据panel内容调整滚动态
        $panel.children(".panel-body").css("height", "auto");

        var panelHeight = $panel.outerHeight();
        var panelHeaderHeight = $panel.children(".panel-header").outerHeight();
        var panelFooterHeight = $panel.children(".panel-footer").outerHeight();
        var panel_padding = jbsframe.getPaddingNumber($panel);
        var panelBodyHeight = panelHeight - panelHeaderHeight - panelFooterHeight - panel_padding[0] - panel_padding[2];
        //$panel.children(".panel-body").css("height",panelBodyHeight);
        //panel内表格
        if ($panel.find(".table-box").length > 0) {

          //重新定义高度
          var $table = $panel.find(".table-scroll-tbody>.table");
          var jtable = $table.data("jtable");
          jtable.setTableSize({
            width: "auto",
            height: panelHeight
          });
        }
      } else {
        jbsframe.destroyAdminPageScroll();
        //$("body").addClass("panel-fullscrean");
        $panel.addClass("fullscrean");
        $(e.currentTarget).find("i").addClass("fa-window-restore");

        //
        var panelHeight = $panel.outerHeight();
        var panelHeaderHeight = $panel.find(".panel-header").outerHeight();
        var panelFooterHeight = $panel.find(".panel-footer").outerHeight();
        var panel_padding = jbsframe.getPaddingNumber($panel);

        //调整panel-body的高度
        var panelHeight = panelHeight - panelHeaderHeight - panelFooterHeight - panel_padding[0] - panel_padding[2];
        //panel内表格
        if ($panel.find(".table-box").length > 0) {

          //重新定义高度
          var $table = $panel.find(".table-scroll-tbody>.table");
          var jtable = $table.data("jtable");
          jtable.setTableSize({
            height: panelHeight
          });
        }
      }
    }
    /*最小化*/

  }, {
    key: "minusPanel",
    value: function minusPanel(e) {
      var $pht = $(this.refs.tools).parents(".panel-header-tool");
      var $panel = $($pht.parents(".panel")[0]);
      var $icon;
      if (e) {
        $icon = $(e.currentTarget).find("i");
        //按钮点击响应
        if ($panel.hasClass("minusscrean")) {
          this.switchMinus(false, $panel, $icon);
        } else {
          this.switchMinus(true, $panel, $icon);
        }
      } else {
        $icon = $pht.find("i.fa-minus");
        //根据panel样式响应
        if ($panel.hasClass("panel-minus")) {
          this.switchMinus(true, $panel, $icon);
        } else {
          this.switchMinus(false, $panel, $icon);
        }
      }
    }

    //切换最小化

  }, {
    key: "switchMinus",
    value: function switchMinus(result, $panel, $icon) {
      if (!result) {
        $panel.find(".panel-body").show();
        $icon.removeClass("fa-plus");
        $panel.removeClass("minusscrean");
        if ($panel.hasClass("funnscreen-hide-body")) {
          $panel.removeClass("funnscreen-hide-body");
        }
      } else {
        $panel.find(".panel-body").hide();
        $icon.addClass("fa-plus");
        $panel.addClass("minusscrean");
        if ($panel.hasClass("fullscrean")) {
          $panel.addClass("funnscreen-hide-body");
        }
      }
    }
  }, {
    key: "render",
    value: function render() {

      //const classes = classNames('");

      return React.createElement("div", { ref: "tools", className: "" }, React.createElement("a", { ref: "maximize", href: "javascript:void(0)", className: "ui-link-icon", onClick: this.minusPanel }, React.createElement("i", { className: "fal fa-minus" })), React.createElement("a", { ref: "maximize", href: "javascript:void(0)", className: "ui-link-icon", onClick: this.maximizePanel }, React.createElement("i", { className: "fal fa-window-maximize" })));
    }
  }]);

  return PanelHeaderTool;
}(React.Component);