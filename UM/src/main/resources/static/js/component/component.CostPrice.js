"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2018/2/12.
 *
 * 杂费单价表
 * 展示形式为：列表
 * 传递参数：url,搜索所需要的列表请求地址
 * 回调方法：点击确定后，执行回调方法，并携带2个参数(名称，编号)
 */

var ComponentCostPriceWin = function (_React$Component) {
    _inherits(ComponentCostPriceWin, _React$Component);

    function ComponentCostPriceWin(props) {
        _classCallCheck(this, ComponentCostPriceWin);

        var _this = _possibleConstructorReturn(this, (ComponentCostPriceWin.__proto__ || Object.getPrototypeOf(ComponentCostPriceWin)).call(this, props));

        var _self = _this;

        //列表表头
        _this.listHead = [{
            dataField: "expenseTypeName",
            dataName: "费用",
            width: 90,
            align: "center",
            dataFormat: function dataFormat(cell, row, node) {
                return cell + "<input type='hidden' name='cp-" + row.expenseTypeId + "' value='" + row.expenseTypeId + "'/>";
            }
        }, {
            dataField: "price",
            dataName: "单价(含税)",
            width: 100,
            align: "center",
            dataFormat: function dataFormat(cell, row, node) {
                return _self.formatInputPrice(cell, row, node.props.property.dataField);
            }
        }, {
            dataField: "taxPrice",
            dataName: "单价(不含税)",
            width: 100,
            align: "center",
            dataFormat: function dataFormat(cell, row, node) {
                return _self.formatInputPrice(cell, row, node.props.property.dataField);
            }
        }, {
            dataField: "seTaxRate",
            dataName: "税率(%)",
            width: 100,
            align: "center",
            dataFormat: function dataFormat(cell, row, node) {
                return _self.formatInputPrice(cell, row, node.props.property.dataField);
            }
        }, {
            dataField: "memo", dataName: "备注", width: 100, align: "center", dataFormat: function dataFormat(cell, row, node) {
                return _self.formatInput(cell, row, node.props.property.dataField);
            }
        }, {
            dataField: "isPay",
            dataName: "产生应付费用",
            width: 100,
            align: "center",
            dataFormat: function dataFormat(cell, row, node) {
                return _self.formatCheckbox(cell, row, node.props.property.dataField);
            }
        }, {
            dataField: "settleCorp",
            dataName: "结算单位",
            width: 156,
            align: "center",
            dataFormat: function dataFormat(cell, row, node) {
                return _self.formatSelect(cell, row, node.props.property.dataField);
            }
        }];
        _this.contentData = [];

        //设置确定或双击后的id名字
        _this.getDataFieldName = _this.props.getDataFieldName || "shortName";

        //state
        _this.state = {
            content: "", //展示的内容 html,
            total: 0 //单价合计
        };

        _this.requestUrlData = _this.requestUrlData.bind(_this);
        _this.renderList = _this.renderList.bind(_this);
        _this.renderListHead = _this.renderListHead.bind(_this);
        _this.callback_confirm = _this.callback_confirm.bind(_this);
        _this.onShowAfter = _this.onShowAfter.bind(_this);
        _this.formatSelect = _this.formatSelect.bind(_this);
        _this.onSelectClick = _this.onSelectClick.bind(_this);
        _this.onClearSelect = _this.onClearSelect.bind(_this);
        _this.formatCheckbox = _this.formatCheckbox.bind(_this);
        _this.formatInputPrice = _this.formatInputPrice.bind(_this);
        _this.formatInput = _this.formatInput.bind(_this);
        _this.onInputChange = _this.onInputChange.bind(_this);
        _this.onCheckboxChange = _this.onCheckboxChange.bind(_this);
        return _this;
    }

    //已插入真实 DOM 之后


    _createClass(ComponentCostPriceWin, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.props.url != "") {
                //加载url数据
                this.requestUrlData();
            }
        }

        //更新后

    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {

            var $modalBody = $(this.refs.modal.refs.modalBody);
            jbsframe.blockElement($modalBody);
            var $swin_thead = $modalBody.find(".swin-table.swin-table-thead");
            var $swin_tbody = $modalBody.find(".swin-table.swin-table-tbody");

            var swt_width = 0;
            $swin_thead.find("colgroup>col").each(function (index, col) {
                swt_width = swt_width + $(col).width();
            });
            $swin_thead.css("width", swt_width);

            $swin_tbody.find("colgroup>col:last-child").remove();
            $swin_tbody.find("tr>td:last-child").remove();

            var swb_width = 0;
            $swin_tbody.find("colgroup>col").each(function (index, col) {
                swb_width = swb_width + $(col).width();
            });
            $swin_tbody.css("width", swb_width);

            if (this.props.loadFinish) {
                this.props.loadFinish();
            }
        }

        //显示以后

    }, {
        key: "onShowAfter",
        value: function onShowAfter() {
            var $modalBody = $(this.refs.modal.refs.modalBody);
            jbsframe.unblockElement($modalBody);

            var $swin_thead = $modalBody.find(".swin-table.swin-table-thead");
            var $swin_scroll_tbody = $modalBody.find(".swin-scroll-tbody");
            var $swin_tbody = $modalBody.find(".swin-table.swin-table-tbody");
            if ($swin_scroll_tbody.height() > $swin_tbody.height()) {
                $swin_thead.find("colgroup>col.scroll-cell").hide();
                $swin_thead.find("thead>tr>th.scroll-cell").hide();
            } else {
                $swin_thead.find("colgroup>col.scroll-cell").show();
                $swin_thead.find("thead>tr>th.scroll-cell").show();
            }
        }

        //弹框确定

    }, {
        key: "callback_confirm",
        value: function callback_confirm() {

            var $root = $(this.refs.modal.refs.root);
            this.reCountTotal();
            var total = $root.find(".costprice-total-value").html(); //单价总计


            var serData = $root.find("#cp-form").serializeArray();
            $("#cp-form").find(".ui-checkbox").each(function (index, ckb) {
                serData.push({
                    name: ckb.name,
                    value: ckb.checked
                });
            });
            var f = {}; //声明一个对象
            $.each(serData, function (index, field) {
                f[field.name] = field.value; //通过变量，将属性值，属性一起放到对象中
            });
            serData = JSON.stringify(f);
            serData = decodeURIComponent(serData, true);

            //如果所有内容未填则不做验证判断
            var allInput = "";
            $root.find("#cp-form input[type=text]").each(function (index, elem) {
                allInput = allInput + $(elem).val();
            });
            if (allInput == "") {
                $root.find("#cp-form input[type=text]").removeClass("notnull");
                $root.find("#cp-form input[type=hidden]").removeClass("notnull");
            }

            //验证在填写内容后，不选结算单位的验证
            if ($root.find("#cp-form").find(".notnull").length > 0) {
                $root.find("#cp-form").find(".notnull").addClass("error");
                jbsframe.alert("结算单位不能为空");
                return false;
            }

            //所有数据
            if (this.props.onConfirm) {
                this.props.onConfirm(total, serData);
                //this.props.onConfirm($root.find("#cp-form").serializeArray());
            }
        }

        //取消

    }, {
        key: "callback_cancel",
        value: function callback_cancel() {}

        /*-----------------------------------------------------------------*/

        //格式化select

    }, {
        key: "formatSelect",
        value: function formatSelect(cell, row, name) {
            return React.createElement("div", { className: "input-group" }, React.createElement("input", {
                className: "input-default form-control",
                type: "hidden",
                value: cell,
                name: "cp-" + row.expenseTypeId + "-" + name
            }), React.createElement("input", {
                className: "input-default form-control settleCorpName",
                type: "text",
                value: row.settleCorpName,
                readOnly: true,
                name: "cp-" + row.expenseTypeId + "-" + name + "-text"
            }), React.createElement("span", { className: "input-group-addon" }, React.createElement("a", { href: "javascript:void(0)", onClick: this.onSelectClick }, React.createElement("i", { className: "far fa-search" }))), React.createElement("a", { className: "input-group-clear far fa-times", href: "javascript:void(0)",
                style: {
                    position: "absolute",
                    top: "50%",
                    "margin-top": -6,
                    right: 50,
                    zIndex: 99,
                    display: "none"
                },
                onClick: this.onClearSelect }));
        }

        //select按钮点击事件

    }, {
        key: "onSelectClick",
        value: function onSelectClick(e) {
            var $inputText = $(e.currentTarget).parent(".input-group-addon").siblings("input[type=text]");
            var $inputValue = $(e.currentTarget).parent(".input-group-addon").siblings("input[type=hidden]");
            var $clearIcon = $(e.currentTarget).parent(".input-group-addon").siblings(".input-group-clear");

            //显示结算单位
            jbsframe.selectWindow({
                title: "结算单位",
                url: "/base/corp/findCorpByType",
                listHead: [{ dataField: "corpId", type: "radio" }, { dataField: "shortName", dataName: "简称" }, { dataField: "corpId", dataName: "编号" }, { dataField: "nickName", dataName: "助记符" }, { dataField: "corpName", dataName: "名称" }]
            }, function (node) {
                //赋值
                $inputValue.val(node.value);
                $inputText.val(node.text);
                $inputValue.removeClass("notnull");
                //显示清除按钮
                $clearIcon.show();
            });
        }

        //清除选中的单位

    }, {
        key: "onClearSelect",
        value: function onClearSelect(e) {
            var $clearIcon = $(e.currentTarget);
            var $inputText = $clearIcon.siblings("input[type=text]");
            var $inputValue = $(e.currentTarget).siblings("input[type=hidden]");
            $inputText.val("");
            $inputValue.val("");
            $clearIcon.hide();
        }

        //格式化checkbox

    }, {
        key: "formatCheckbox",
        value: function formatCheckbox(cell, row, name) {
            return React.createElement(ComponentCPWCheckbox, {
                cell: cell,
                row: row,
                name: name,
                onCheckboxChange: this.onCheckboxChange
            });
        }

        //格式化单价输入框

    }, {
        key: "formatInput",
        value: function formatInput(cell, row, name) {
            /*return React.createElement("input", {
                type: "text",
                value: "",
                name: "cp-" + row.expenseTypeId + "-" + name,
                className: "input-default",
                style: {width: 80}
            })*/
            return React.createElement(ComponentCPWInput, {
                cell: cell,
                row: row,
                name: name
            });
        }

        //格式化输入框

    }, {
        key: "formatInputPrice",
        value: function formatInputPrice(cell, row, name) {
            return React.createElement(ComponentCPWInputPrice, {
                cell: cell,
                row: row,
                name: name,
                onInputChange: this.onInputChange
            });
        }

        //输入框change事件 --- 单价

    }, {
        key: "onInputChange",
        value: function onInputChange(currentIndex, currentName, currentValue) {
            //计算含税价
            //console.log("输入组件:",currentIndex," name:",currentName," value:",currentValue)

            //重新计算价格
            this.reCountPrice(currentIndex, currentName, currentValue);
            //计算单价总计
            this.reCountTotal();
        }

        //产生应付费用

    }, {
        key: "onCheckboxChange",
        value: function onCheckboxChange(currentIndex, currentName, currentValue) {
            console.log(currentIndex, currentName, currentValue);

            if (currentValue) {}
            //讲结算单位设置成不为空
            if ($("input[name='cp-" + currentIndex + "-settleCorp-text']").val() == "") {
                if (currentValue == true) {
                    $("input[name='cp-" + currentIndex + "-settleCorp']").addClass("notnull");
                } else {
                    $("input[name='cp-" + currentIndex + "-settleCorp']").removeClass("notnull");
                }
            } else {
                $("input[name='cp-" + currentIndex + "-settleCorp']").removeClass("notnull");
            }
        }

        /*-------------------------------------------------------------------*/

        //重新计算价格

    }, {
        key: "reCountPrice",
        value: function reCountPrice(currentIndex, currentName, currentValue) {
            //单价
            var price = Number($("input[name='cp-" + currentIndex + "-price']").val());
            //税率值
            var seTaxRate = Number($("input[name='cp-" + currentIndex + "-seTaxRate']").val());
            // if (seTaxRate > 1) {
            seTaxRate = seTaxRate / 100;
            // }
            //单价不含税
            var taxPrice = Number($("input[name='cp-" + currentIndex + "-taxPrice']").val());

            //如果为单价不含税change
            if (currentName == "taxPrice") {
                var res = (taxPrice * (seTaxRate + 1)).toFixed(2);
                if (res == "0.00") {
                    res = "";
                }
                $("input[name='cp-" + currentIndex + "-price']").val(res);
            }
            //如果为单价change
            if (currentName == "price" || currentName == "seTaxRate") {

                var res = (price / (1 + seTaxRate)).toFixed(2);
                if (res == "0.00") {
                    res = "";
                }
                $("input[name='cp-" + currentIndex + "-taxPrice']").val(res);
            }

            //备注
            var memo = Number($("input[name='cp-" + currentIndex + "-memo']").val());

            //讲结算单位设置成不为空
            if ($("input[name='cp-" + currentIndex + "-settleCorp-text']").val() == "") {
                $("input[name='cp-" + currentIndex + "-settleCorp']").addClass("notnull");
            } else {
                $("input[name='cp-" + currentIndex + "-settleCorp']").removeClass("notnull");
            }
        }

        //计算单价总计

    }, {
        key: "reCountTotal",
        value: function reCountTotal() {
            var total = 0;
            console.log();
            $(this.refs.modal.refs.modalBody).find("input.price-input").each(function (index, element) {
                if (element.value != "") {
                    total = total + Number(element.value);
                }
            });
            if (isNaN(total)) {
                total = 0;
            }
            var modalBody = this.refs.modal.refs.modalBody;
            $(modalBody).find(".costprice-total-value").html(total.toFixed(2));
        }

        /*-------------------------------------------------------------------*/

        //加载url数据

    }, {
        key: "requestUrlData",
        value: function requestUrlData() {
            jbsframe.ajaxRequest({
                url: this.props.url,
                data: this.props.data
            }, function (data, msg) {
                //填充
                this.contentData = data; //data.content;
                this.setState({
                    content: this.renderList(this.contentData)
                });
            }.bind(this));
        }

        /*-------------------------------------------------------------------*/

        //构建列表

    }, {
        key: "renderList",
        value: function renderList(content) {
            var result = this.renderListBody(content);

            var listHead = $.extend(true, this.listHead, this.props.listHead);

            return React.createElement("div", {}, React.createElement("div", {}, React.createElement("table", { className: "swin-table swin-table-thead", style: { "table-layout": "fixed" } }, React.createElement(JColgroup, { thcols: listHead }), this.renderListHead(listHead))), React.createElement("div", { style: { height: 250, "overflow-y": "auto" } }, React.createElement("form", { id: "cp-form" }, React.createElement("table", { className: "swin-table swin-table-tbody", style: { "table-layout": "fixed" } }, React.createElement(JColgroup, { thcols: listHead }), result.content))), React.createElement("div", { className: "costprice-total" }, "单价合计: ", React.createElement("span", { className: "costprice-total-value" }, result.total)));
        }

        //列表头

    }, {
        key: "renderListHead",
        value: function renderListHead(listHead) {
            //var listHead = this.props.listHead || this.listHead;

            listHead.push({
                dataField: "", width: 17,
                className: "scroll-cell"
            });

            return React.createElement(JThead, { thcols: this.listHead });
        }

        //列表体

    }, {
        key: "renderListBody",
        value: function renderListBody(data) {
            var rows = [],
                total = 0;

            var children = React.createElement(JTr, { keys: this.listHead });
            for (var i = 0; i < data.length; i++) {
                rows = this.renderTr(rows, children, data[i]);
                /*rows.push(React.createElement(ComponentCPWRow,{
                    tr:rows,
                    child:children,
                    data:data[i]
                }))*/
                total += Number(data[i].price);
            }
            return {
                content: React.createElement(JTbody, { children: rows }),
                total: total.toFixed(2)
            };
        }
    }, {
        key: "renderTr",
        value: function renderTr(tr, child, data, length) {
            tr.push(React.createElement(JTr, {
                data: data,
                keys: child.props.keys,
                width: child.props.width,
                colspan: child.props.colspan,
                rowspan: child.props.rowSpan,
                index: tr.length,
                className: child.props.className,
                siblingsLength: length
            }));
            return tr;
        }

        /*	//表尾
            renderListFoot(){
                return React.createElement("tfoot", {},
                    React.createElement("tr",{},
                        React.createElement("td",{},"--"),
                        React.createElement("td",{},this.state.total),
                        React.createElement("td",{
                            colSpan:this.listHead.length-2
                        },"--")
                    )
                );
            }*/

    }, {
        key: "render",
        value: function render() {
            return React.createElement(SelectWindow, {
                ref: 'modal',
                className: "swin-modal costprice",
                title: "杂费单价",
                message: this.state.content,
                style: {
                    width: 810
                },
                confirm: '确定',
                cancel: '取消',
                onConfirm: this.callback_confirm,
                onCancel: this.callback_cancel,
                onShowAfter: this.onShowAfter
            });
        }
    }]);

    return ComponentCostPriceWin;
}(React.Component);

var ComponentCPWInputPrice = function (_React$Component2) {
    _inherits(ComponentCPWInputPrice, _React$Component2);

    function ComponentCPWInputPrice(props) {
        _classCallCheck(this, ComponentCPWInputPrice);

        var _this2 = _possibleConstructorReturn(this, (ComponentCPWInputPrice.__proto__ || Object.getPrototypeOf(ComponentCPWInputPrice)).call(this, props));

        _this2.state = {
            inputName: _this2.props.name, //form-name
            inputIndex: _this2.props.row.expenseTypeId, //编号
            inputValue: _this2.props.cell == null ? "" : _this2.props.cell //输入框值
        };

        _this2.onInputChange = _this2.onInputChange.bind(_this2);
        return _this2;
    }

    //重新计算


    _createClass(ComponentCPWInputPrice, [{
        key: "reCount",
        value: function reCount(currentIndex, currentValue) {
            //单价
            var price = Number(currentValue);
            //税率值
            var seTaxRate = Number($("input[name='cp-" + currentIndex + "-seTaxRate']").val());
            if (seTaxRate > 1) {
                seTaxRate = seTaxRate / 100;
            }
            //单价不含税
            var taxPrice = $("input[name='cp-" + currentIndex + "-taxPrice']").val();

            //
            var res = price - seTaxRate;
            $("input[name='cp-" + currentIndex + "-taxPrice']").val(res);
        }
    }, {
        key: "onInputChange",
        value: function onInputChange(e) {
            if (!isNumber(Number(e.currentTarget.value))) {
                return false;
            }
            //回传当前值用于计算使用
            if (this.props.onInputChange) {
                this.props.onInputChange(this.state.inputIndex, this.state.inputName, e.currentTarget.value);
            }

            //重新计算
            //this.reCount(this.state.inputIndex,e.currentTarget.value);

            //重新赋值
            this.setState({
                inputValue: e.currentTarget.value
            });
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement("input", {
                type: "text",
                value: this.state.inputValue,
                placeholder: "0",
                name: "cp-" + this.state.inputIndex + "-" + this.state.inputName,
                className: "input-default form-control " + this.state.inputName + "-input",
                style: { width: 80 },
                onChange: this.onInputChange
            });
        }
    }]);

    return ComponentCPWInputPrice;
}(React.Component);

var ComponentCPWCheckbox = function (_React$Component3) {
    _inherits(ComponentCPWCheckbox, _React$Component3);

    function ComponentCPWCheckbox(props) {
        _classCallCheck(this, ComponentCPWCheckbox);

        var _this3 = _possibleConstructorReturn(this, (ComponentCPWCheckbox.__proto__ || Object.getPrototypeOf(ComponentCPWCheckbox)).call(this, props));

        _this3.state = {
            inputName: _this3.props.name, //form-name
            inputIndex: _this3.props.row.expenseTypeId, //编号
            checked: _this3.props.cell == null ? true : _this3.props.cell, //是否选中
            inputValue: "1"
        };

        _this3.onCheckboxChange = _this3.onCheckboxChange.bind(_this3);
        return _this3;
    }

    _createClass(ComponentCPWCheckbox, [{
        key: "onCheckboxChange",
        value: function onCheckboxChange(e) {

            //回传当前值用于计算使用
            if (this.props.onCheckboxChange) {
                this.props.onCheckboxChange(this.state.inputIndex, this.state.inputName, e.currentTarget.checked);
            }

            //重新赋值
            this.setState({
                inputValue: e.currentTarget.checked ? 1 : 0,
                checked: e.currentTarget.checked
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("input", {
                type: "checkbox",
                value: this.state.inputValue,
                checked: this.state.checked,
                name: "cp-" + this.state.inputIndex + "-" + this.state.inputName,
                className: "ui-checkbox checkbox-blue",
                onClick: this.onCheckboxChange
            });
        }
    }]);

    return ComponentCPWCheckbox;
}(React.Component);

var ComponentCPWInput = function (_React$Component4) {
    _inherits(ComponentCPWInput, _React$Component4);

    function ComponentCPWInput(props) {
        _classCallCheck(this, ComponentCPWInput);

        var _this4 = _possibleConstructorReturn(this, (ComponentCPWInput.__proto__ || Object.getPrototypeOf(ComponentCPWInput)).call(this, props));

        _this4.state = {
            inputName: _this4.props.name, //form-name
            inputIndex: _this4.props.row.expenseTypeId, //编号
            inputValue: _this4.props.cell == null ? "" : _this4.props.cell //输入框值
        };

        _this4.onInputChange = _this4.onInputChange.bind(_this4);
        return _this4;
    }

    _createClass(ComponentCPWInput, [{
        key: "onInputChange",
        value: function onInputChange(e) {
            this.setState({
                inputValue: e.currentTarget.value
            });
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement("input", {
                type: "text",
                value: this.state.inputValue,
                placeholder: "0",
                name: "cp-" + this.state.inputIndex + "-" + this.state.inputName,
                className: "input-default form-control " + this.state.inputName + "-input",
                style: { width: 80 },
                onChange: this.onInputChange
            });
        }
    }]);

    return ComponentCPWInput;
}(React.Component);