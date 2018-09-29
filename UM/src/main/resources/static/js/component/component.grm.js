"use strict";

/**
 * 品名、规则、材质，通用组件
 */

var component_grm;
$(document).ready(function () {
    component_grm = new JBSFrame_component_grm();
    component_grm.initUI();
});

function JBSFrame_component_grm() {
    JBSFrame.call(this);

    var self = this;
    this.initUI = function () {
        //comp-grm-goodsName-text

        //设置规则材质可用
        if ($("#comp-grm-goodsName-text").val() !== "") {
            this.setRatioMaterialDisabled(false);
        } else {
            this.setRatioMaterialDisabled(true);
        }
    };

    //品名
    this.show_componentGoodsName = function () {
        jbsframe.selectWindow({
            title: "品名",
            url: "/base/goods/getGoodsList",
            getDataFieldName: "goodsName",
            filterFieldName: "goodsName",
            listHead: [{ dataField: "goodsId", type: "radio" }, { dataField: "goodsName", dataName: "品名" }, { dataField: "wzCode", dataName: "品名编码" }, { dataField: "nickName", dataName: "助记符" }]
        }, function (data) {
            $("#comp-grm-goodsName-id").val(data.value);
            $("#comp-grm-goodsName-text").val(data.text);
            //设置规则材质可用
            self.setRatioMaterialDisabled(false);
        });
    };
    //规格
    this.show_componentSpecRatio = function () {
        jbsframe.selectWindow({
            title: "规格",
            url: "/base/goods/specRatio/getSpecRatioList",
            data: { "goodsName": $("#comp-grm-goodsName-text").val() },
            getDataFieldName: "spec",
            filterFieldName: "spec",
            listHead: [{ dataField: "pieceId", type: "radio" }, { dataField: "spec", dataName: "规格" }, { dataField: "ratio", dataName: "比率(kg/m)" }, { dataField: "pieceId", dataName: "件数计量单位" }, { dataField: "specCode", dataName: "规格编码" }]
        }, function (data) {
            $("#comp-grm-specRatio-id").val(data.value);
            $("#comp-grm-specRatio-text").val(data.text);
        });
    };
    //材质
    this.show_componentMaterial = function () {
        jbsframe.selectWindow({
            title: "材质",
            url: "/base/goods/material/getMaterialList",
            data: { "goodsName": $("#comp-grm-goodsName-text").val() },
            getDataFieldName: "material",
            filterFieldName: "material",
            listHead: [{ dataField: "maCode", type: "radio" }, { dataField: "material", dataName: "材质" }, { dataField: "kmCode", dataName: "科目代码" }, { dataField: "maCode", dataName: "材质编码" }, { dataField: "ifPsteel", dataName: "品种钢", dataFormat: function dataFormat(cell) {
                    if (cell) {
                        return "是";
                    } else {
                        return "否";
                    }
                } }]
        }, function (data) {
            $("#comp-grm-material-id").val(data.value);
            $("#comp-grm-material-text").val(data.text);
        });
    };

    //设置规则材质可用
    this.setRatioMaterialDisabled = function (flag) {
        if (flag) {
            $("#comp-grm-specRatio-text").attr("readonly", true);
            $("#comp-grm-specRatio-text").next(".input-group-addon").addClass("disabled");
            $("#comp-grm-material-text").attr("readonly", true);
            $("#comp-grm-material-text").next(".input-group-addon").addClass("disabled");
        } else {
            $("#comp-grm-specRatio-text").attr("readonly", false);
            $("#comp-grm-specRatio-text").next(".input-group-addon").removeClass("disabled");
            $("#comp-grm-material-text").attr("readonly", false);
            $("#comp-grm-material-text").next(".input-group-addon").removeClass("disabled");
        }
    };
}