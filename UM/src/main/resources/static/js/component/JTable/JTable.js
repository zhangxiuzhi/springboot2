"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/5/4.
 */

var JColgroup = function (_React$Component) {
    _inherits(JColgroup, _React$Component);

    function JColgroup() {
        _classCallCheck(this, JColgroup);

        return _possibleConstructorReturn(this, (JColgroup.__proto__ || Object.getPrototypeOf(JColgroup)).apply(this, arguments));
    }

    _createClass(JColgroup, [{
        key: "render",
        value: function render() {
            var ths = this.props.thcols;

            var col = [];
            for (var i = 0; i < ths.length; i++) {
                if (ths[i].hidden != true) {
                    var _colspan = 0;
                    if (this.props.hasChildTable) {
                        if (i == 0) {
                            _colspan = 2;
                        }
                    }
                    col.push(React.createElement("col", {
                        width: ths[i].width ? ths[i].width : 120,
                        colSpan: _colspan,
                        className: ths[i].className,
                        style: {
                            minWidth: ths[i].width,
                            display: ths[i].hidden ? "none" : ""
                            //width:ths[i].width ? ths[i].width : 120
                        }
                    }));
                }
            }
            return React.createElement("colgroup", { ref: this.props._ref }, col);
        }
    }]);

    return JColgroup;
}(React.Component);
/*--------------------------------------------------------------------------------------------*/
//表格头单元格组件Th


var JTh = function (_React$Component2) {
    _inherits(JTh, _React$Component2);

    function JTh(props) {
        _classCallCheck(this, JTh);

        var _this2 = _possibleConstructorReturn(this, (JTh.__proto__ || Object.getPrototypeOf(JTh)).call(this, props));

        _this2.sort = "";
        _this2.onThClick = _this2.onThClick.bind(_this2);
        return _this2;
    }

    //单元格点击


    _createClass(JTh, [{
        key: "onThClick",
        value: function onThClick(e) {
            if (this.props.sortable) {
                if ($(this.refs.thCell).hasClass("ascending")) {
                    $(this.refs.thCell).removeClass("ascending");
                    $(this.refs.thCell).addClass("descending");
                    this.sort = "DESC";
                } else if ($(this.refs.thCell).hasClass("descending")) {
                    $(this.refs.thCell).removeClass("descending");
                    this.sort = "";
                } else {
                    $(this.refs.thCell).addClass("ascending");
                    this.sort = "ASC";
                }
                if (this.props.onThClick) {
                    this.props.onThClick({
                        sort: this.props.field,
                        order: this.sort
                    });
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            //var text = React.createElement("div", { dangerouslySetInnerHTML: { __html: this.props.text } });
            var property = this.props;
            var _className = classNames(property.className, {
                "fixed-hidden": !property.fixed,
                "is-sortable": property.sortable
            });

            var pp = {
                //width: this.props.width,
                ref: "thCell",
                className: _className,
                onClick: this.onThClick,
                style: {
                    textAlign: this.props.align,
                    display: this.props.hidden ? "none" : ""
                    //dangerouslySetInnerHTML:{ __html: this.props.text }
                } };

            if (_className.indexOf("is-sortable") > 0) {
                return React.createElement("th", pp, this.props.text, property.sortable ? React.createElement(JThCaret, { th: this.props }) : null);
            } else {
                pp["dangerouslySetInnerHTML"] = { __html: this.props.text };
                return React.createElement("th", pp);
            }
        }
    }]);

    return JTh;
}(React.Component);
/*--------------------------------------------------------------------------------------------*/
//表格头单元格排序


var JThCaret = function (_React$Component3) {
    _inherits(JThCaret, _React$Component3);

    function JThCaret() {
        _classCallCheck(this, JThCaret);

        return _possibleConstructorReturn(this, (JThCaret.__proto__ || Object.getPrototypeOf(JThCaret)).apply(this, arguments));
    }

    _createClass(JThCaret, [{
        key: "render",
        value: function render() {
            return React.createElement("span", { className: "caret-box" }, React.createElement("i", { ref: "", className: "sort-caret ascending" }), React.createElement("i", { ref: "", className: "sort-caret descending" }));
        }
    }]);

    return JThCaret;
}(React.Component);

/*--------------------------------------------------------------------------------------------*/
//表格体单元格组件Td


var JTd = function (_React$Component4) {
    _inherits(JTd, _React$Component4);

    function JTd(props) {
        _classCallCheck(this, JTd);

        var _this4 = _possibleConstructorReturn(this, (JTd.__proto__ || Object.getPrototypeOf(JTd)).call(this, props));

        _this4.onExpandChildRow = _this4.onExpandChildRow.bind(_this4);
        return _this4;
    }

    //展开按钮的点击事件


    _createClass(JTd, [{
        key: "onExpandChildRow",
        value: function onExpandChildRow() {
            //切换展开图标
            $(this.refs.expandIcon).toggleClass("fa-angle-right").toggleClass("fa-angle-down");

            var $parentTBody = $(this.refs.expandCell).closest(".parent-tbody"); //当前数据tbody
            var $childRow = $parentTBody.find("tr.sep-row"); //tbody下的存放子表的tr
            if (this.props.onExpandChildRow) {
                this.props.onExpandChildRow(this.props.data, $childRow);
            }
        }
    }, {
        key: "render",
        value: function render() {

            var text = this.props.children; //this.props.text
            var property = this.props;
            var _className = classNames(property.className, {
                //fixed_className:property.fixed
            });

            //属性
            var pp = {
                ref: "jtd",
                colSpan: this.props.colSpan,
                rowSpan: this.props.rowSpan,
                className: _className,
                style: {
                    textAlign: this.props.align,
                    display: this.props.hidden ? "none" : ""
                    //width: this.props.width
                }

                //如果是含有子表的，并且单元格为展开格
            };if (_className == "expand-cell") {
                return React.createElement("td", {}, React.createElement("a", { ref: "expandCell", onClick: this.onExpandChildRow, title: "展开子项", className: 'ui-link-icon padding-left-5 paddng-right-5', href: 'javascript:void(0)' }, React.createElement("i", { ref: "expandIcon", className: 'far fa-angle-right' })));
            }
            //普通格子
            if (this.props.dataFormat) {
                //渲染HTML
                text = this.props.dataFormat(text, this.props.data, this);
                if (React.isValidElement(text)) {
                    return React.createElement("td", pp, text);
                } else {
                    //text = React.createElement("div", { dangerouslySetInnerHTML: { __html: text } });
                    pp["dangerouslySetInnerHTML"] = { __html: text };
                    return React.createElement("td", pp);
                }
            } else {
                if (React.isValidElement(text)) {
                    return React.createElement("td", pp, text);
                } else {
                    pp["dangerouslySetInnerHTML"] = { __html: text };
                    return React.createElement("td", pp);
                }
            }
        }
    }]);

    return JTd;
}(React.Component);

/*--------------------------------------------------------------------------------------------*/
//表格行组件Tr


var JTr = function (_React$Component5) {
    _inherits(JTr, _React$Component5);

    function JTr(props) {
        _classCallCheck(this, JTr);

        var _this5 = _possibleConstructorReturn(this, (JTr.__proto__ || Object.getPrototypeOf(JTr)).call(this, props));

        _this5.setProperty = _this5.setProperty.bind(_this5);
        return _this5;
    }

    _createClass(JTr, [{
        key: "setProperty",
        value: function setProperty(keys) {

            if (this.props.children) {
                return {
                    colSpan: this.props.children.props.colspan,
                    dataFormat: keys.dataFormat,
                    className: keys.className,
                    align: keys.align,
                    width: keys.width,
                    hidden: keys.hidden
                };
            } else {
                return {
                    colSpan: this.props.colspan,
                    dataFormat: keys.dataFormat,
                    data: this.props.data,
                    className: keys.className,
                    align: keys.align,
                    width: keys.width,
                    hidden: keys.hidden,
                    property: keys,
                    onExpandChildRow: this.props.onExpandChildRow
                };
            }
            /*,*/
        }
    }, {
        key: "render",
        value: function render() {
            //console.log("jtr",this.props,this.props.data)

            var data = this.props.data;
            var index = this.props.index; //一单多货的第几行数据

            var td = [];
            var keys = this.props.keys;

            if (keys.length > 0) {
                for (var i = 0; i < keys.length; i++) {
                    td.push(React.createElement(JTd, this.setProperty(keys[i]), data[keys[i].dataField]));
                }
            } else {
                td.push(React.createElement(JTd, this.setProperty(keys), keys.text));
            }

            return React.createElement("tr", { className: this.props.className, ref: "jtr" }, td);
        }
    }]);

    return JTr;
}(React.Component);

/*--------------------------------------------------------------------------------------------*/
//表格头组件Thead


var JThead = function (_React$Component6) {
    _inherits(JThead, _React$Component6);

    function JThead() {
        _classCallCheck(this, JThead);

        return _possibleConstructorReturn(this, (JThead.__proto__ || Object.getPrototypeOf(JThead)).apply(this, arguments));
    }

    _createClass(JThead, [{
        key: "render",
        value: function render() {
            var _this7 = this;

            var ths = this.props.thcols;
            //console.log("表头",ths)
            var html_ths = ths.map(function (th) {
                return React.createElement(JTh, {
                    width: th.width,
                    text: th.dataName,
                    field: th.dataField,
                    className: th.className,
                    align: th.align,
                    hidden: th.hidden,
                    fixed: th.fixed,
                    sortable: th.sortable,
                    onThClick: _this7.props.onTheadThClick
                });
            });
            return React.createElement("thead", { ref: "jthead" }, React.createElement("tr", null, html_ths));
        }
    }]);

    return JThead;
}(React.Component);

/*--------------------------------------------------------------------------------------------*/
//表格体组件Tbody


var JTbody = function (_React$Component7) {
    _inherits(JTbody, _React$Component7);

    function JTbody() {
        _classCallCheck(this, JTbody);

        return _possibleConstructorReturn(this, (JTbody.__proto__ || Object.getPrototypeOf(JTbody)).apply(this, arguments));
    }

    _createClass(JTbody, [{
        key: "render",
        value: function render() {
            return React.createElement("tbody", { className: this.props.className, ref: "jtbody" }, this.props.children);
        }
    }]);

    return JTbody;
}(React.Component);

/*--------------------------------------------------------------------------------------------*/
//表格脚组件Tfoot


var JTfoot = function (_React$Component8) {
    _inherits(JTfoot, _React$Component8);

    function JTfoot() {
        _classCallCheck(this, JTfoot);

        return _possibleConstructorReturn(this, (JTfoot.__proto__ || Object.getPrototypeOf(JTfoot)).apply(this, arguments));
    }

    _createClass(JTfoot, [{
        key: "render",
        value: function render() {
            var fth = {
                width: this.props.width,
                className: this.props.className,
                field: this.props.field,
                align: this.props.align,
                data: this.props.data,
                thcols: this.props.thcols,
                hasChildTable: this.props.hasChildTable
            };
            return React.createElement("tfoot", { ref: "jtfoot" }, React.createElement(JTFTr_PageSummary, fth), JSON.stringify(this.props.all) == "{}" ? null : React.createElement(JTFTr_Summary, $.extend({ all: this.props.all }, fth)));
        }
    }]);

    return JTfoot;
}(React.Component);
/*--------------------------------------------------------------------------------------------*/
//当前页统计,前台计算


var JTFTr_PageSummary = function (_React$Component9) {
    _inherits(JTFTr_PageSummary, _React$Component9);

    function JTFTr_PageSummary() {
        _classCallCheck(this, JTFTr_PageSummary);

        return _possibleConstructorReturn(this, (JTFTr_PageSummary.__proto__ || Object.getPrototypeOf(JTFTr_PageSummary)).apply(this, arguments));
    }

    _createClass(JTFTr_PageSummary, [{
        key: "render",
        value: function render() {
            var _this11 = this;

            var ths = this.props.thcols;
            var html_ths = null;

            var index = 0;
            html_ths = ths.map(function (th) {
                return React.createElement(JTFth, {
                    index: index++,
                    summaryText: "当页汇总",
                    width: th.width,
                    text: th.dataName,
                    field: th.dataField,
                    className: th.pageSummary ? "summary" : "",
                    align: th.align,
                    pageSummary: th.pageSummary,
                    data: _this11.props.data,
                    hasChildTable: _this11.props.hasChildTable,
                    summaryType: th.summaryType //number,money
                });
            });

            return React.createElement("tr", {}, html_ths);
        }
    }]);

    return JTFTr_PageSummary;
}(React.Component);
//全部统计,后台数据传递


var JTFTr_Summary = function (_React$Component10) {
    _inherits(JTFTr_Summary, _React$Component10);

    function JTFTr_Summary() {
        _classCallCheck(this, JTFTr_Summary);

        return _possibleConstructorReturn(this, (JTFTr_Summary.__proto__ || Object.getPrototypeOf(JTFTr_Summary)).apply(this, arguments));
    }

    _createClass(JTFTr_Summary, [{
        key: "render",
        value: function render() {
            var _this13 = this;

            var ths = this.props.thcols;
            var html_ths = null;
            var index = 0;
            html_ths = ths.map(function (th) {
                return React.createElement(JTFth, {
                    index: index++,
                    summaryText: "全部汇总",
                    width: th.width,
                    text: th.summary ? _this13.props.all[th.dataField] ? _this13.props.all[th.dataField] : 0 : "",
                    field: th.dataField,
                    className: th.summary ? "summary" : "",
                    align: th.align,
                    summary: th.summary,
                    data: _this13.props.data,
                    hasChildTable: _this13.props.hasChildTable,
                    summaryType: th.summaryType //number,money
                });
            });

            return React.createElement("tr", {}, html_ths);
        }
    }]);

    return JTFTr_Summary;
}(React.Component);
//


var JTFth = function (_React$Component11) {
    _inherits(JTFth, _React$Component11);

    function JTFth() {
        _classCallCheck(this, JTFth);

        return _possibleConstructorReturn(this, (JTFth.__proto__ || Object.getPrototypeOf(JTFth)).apply(this, arguments));
    }

    _createClass(JTFth, [{
        key: "render",
        value: function render() {
            //当前页统计,前台计算
            var text = "";
            var colspan = 0.000;
            if (this.props.pageSummary) {
                text = 0;
                for (var i = 0; i < this.props.data.length; i++) {
                    var data = this.props.data[i];
                    text = Number(text) + Number(data[this.props.field] == null ? 0 : data[this.props.field]);
                }
                //text = text.toFixed(2);
            }
            //所有统计，后台传递
            if (this.props.summary) {
                text = this.props.text;
            }

            var _className = classNames(this.props.className, {
                "fixed-hidden": this.props.index == 0 ? false : true
            });

            //统计表格内的第一列为统计描述
            if (this.props.hasChildTable) {
                if (this.props.index == 0) {
                    _className += " summary-cell";
                    colspan = 2;
                    text = this.props.summaryText;
                }
            } else {
                if (this.props.index == 0) {
                    text = this.props.summaryText;
                    _className += " summary-cell";
                }
            }

            if (this.props.summaryType == "number") {
                text = jbsframe.formatTableNumber(text);
            }
            if (this.props.summaryType == "money") {
                text = jbsframe.formatTableMoney(text);
            }

            return React.createElement("th", {
                colSpan: colspan,
                className: _className
            }, text);
        }
    }]);

    return JTFth;
}(React.Component);

/*--------------------------------------------------------------------------------------------*/
//表格组件Table


var JTable = function (_React$Component12) {
    _inherits(JTable, _React$Component12);

    function JTable(props) {
        _classCallCheck(this, JTable);

        /*
         options = {
         url:this.props.url,
         thcols:this.thcols,
         status:this.props.status,
         searchData:{
         key:"",
         value:""
         },
         page:1,
         sizePerPage:5,
         nodata:{
         text:"data not available",
         dataFormat:customFormatterOrderTime,
         }
         }
         */
        var _this15 = _possibleConstructorReturn(this, (JTable.__proto__ || Object.getPrototypeOf(JTable)).call(this, props));

        _this15.options = _this15.props.options; //表格设置
        _this15.thcols = _this15.props.thcols; //所有表头字段
        _this15.tdcols = _this15.props.tdcols; //所有表体字段
        _this15.height = _this15.props.options.height;
        _this15.fixed_table = _this15.options.fixed_table; //所有锁定的表头表体字段{fixedTh,fixedTd}
        _this15.nodata = {
            text: _this15.options.nodata ? _this15.options.nodata.text : "data not available",
            dataFormat: _this15.options.nodata ? _this15.options.nodata.dataFormat : null
        };
        _this15.loading = {
            text: _this15.options.loadingText ? _this15.options.loadingText.text : "读取数据中。。。",
            dataFormat: _this15.options.loadingText ? _this15.options.loadingText.dataFormat : null
        };
        _this15.sortData = _this15.options.sortData; //排序
        _this15.state = {
            finish: false, //没有加载完成
            all: {}, // 数据中的统计集合
            datas: _this15.props.datas.length == 0 ? [] : _this15.props.datas,
            status: _this15.options.status,
            searchData: _this15.options.searchData,
            page: _this15.options.page,
            sizePerPage: _this15.options.sizePerPage,
            totalSize: _this15.options.totalSize || 0,
            pageStartIndex: 1,
            paginationSize: 5
        };

        //this.topPagination = true;
        //this.bottomPagination = true;
        _this15.topPagination = _this15.options.topPagination == undefined ? true : _this15.options.topPagination ? true : false;
        _this15.bottomPagination = _this15.options.bottomPagination == undefined ? true : _this15.options.bottomPagination ? true : false;

        _this15.ajaxRequestData = _this15.ajaxRequestData.bind(_this15);
        _this15.handlePageChange = _this15.handlePageChange.bind(_this15);
        _this15.handleSizePerPageChange = _this15.handleSizePerPageChange.bind(_this15);
        _this15.onTheadThClick = _this15.onTheadThClick.bind(_this15);
        return _this15;
    }

    /*******************************************************************/
    //DOM加载完成


    _createClass(JTable, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.options.customRenderFinishCallBack) {
                this.options.customRenderFinishCallBack(this, this.state.datas, this.state.searchData, this.state.page, this.state.sizePerPage, this.state.totalSize, this.state.totalSize);
            }
            if (this.options.url != "") {
                //ajax加载数据
                this.ajaxRequestData();
            }
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate() {}
        //console.log("will")
        //this.ajaxRequestData();

        //完成渲染新的props或者state后调用

    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            //开始加载
            if (this.state.finish == false) {
                if (this.options.url != "") {
                    //ajax加载数据
                    this.ajaxRequestData();
                }
            }
            if (this.options.customRenderFinishCallBack) {
                this.options.customRenderFinishCallBack(this, this.state.datas, this.state.searchData, this.state.page, this.state.sizePerPage, this.state.totalSize, this.state.totalSize);
            }
        }

        /*******************************************************************/
        //表头单元格点击事件，排序用

    }, {
        key: "onTheadThClick",
        value: function onTheadThClick(sortObj) {

            /*var sd_sort = this.sortData.sort;
            var sd_order = this.sortData.order;
            sd_sort.map(function(sds,index){
                if(sds == sortObj.sort){
                    sd_order[index] = sortObj.order;
                }
            });*/
            //console.log(this.sortData.sort.indexOf(sortObj.sort))

            //根据排序的字段和值，动态添加到排序集合
            var idx = this.sortData.sort.indexOf(sortObj.sort);
            if (sortObj.order != "") {
                if (idx < 0) {
                    this.sortData.sort.push(sortObj.sort);
                    this.sortData.order.push(sortObj.order);
                } else {
                    this.sortData.order[idx] = sortObj.order;
                }
            } else {
                this.sortData.sort.splice(idx, 1);
                this.sortData.order.splice(idx, 1);
            }
            this.setState({
                finish: false
            });
        }
        /*******************************************************************/
        //ajax加载数据

    }, {
        key: "ajaxRequestData",
        value: function ajaxRequestData() {
            var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.status;
            var searchData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.searchData;
            var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.state.page;
            var sizePerPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.state.sizePerPage;


            var _d = {
                status: status,
                //searchData :searchData,
                page: page - 1,
                sizePerPage: sizePerPage
                //排序条件
            };searchData["sort"] = this.sortData.sort.toString();
            searchData["order"] = this.sortData.order.toString();
            //过滤条件
            for (var search in searchData) {
                _d[search] = searchData[search];
            }

            var header = $("meta[name='_csrf_header']").attr("content");
            var token = $("meta[name='_csrf']").attr("content");
            //ajax
            $.ajax({
                url: this.options.url,
                data: _d,
                method: "POST",
                dataType: "JSON",
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader(header, token);
                    if (searchData != null) {
                        this.data = this.data + "&" + searchData;
                    }
                },
                success: function (str, msg, response) {
                    if (response.statusText == "OK" || response.statusText == "success") {
                        var result = JSON.parse(response.responseText);
                        if (result.success != undefined && !result.success) {
                            console.log(result.msg);

                            notification(result.msg);
                            alert(result.msg);
                        }
                        this.setState({
                            finish: true, //加载完毕
                            searchData: searchData, //过滤条件
                            all: result.all ? result.all : {}, //统计集合
                            datas: result.content ? result.content : result, //result.data ||
                            page: result.number + 1,
                            sizePerPage: result.size,
                            totalSize: result.totalElements
                        });
                    }
                }.bind(this),
                error: function (str, msg, response) {}.bind(this)
            });
        }
        /*******************************************************************/
        //分页数量选项事件

    }, {
        key: "handleSizePerPageChange",
        value: function handleSizePerPageChange(sizePerPage) {
            this.ajaxRequestData(this.state.status, this.state.searchData, 1, sizePerPage);
        }

        //分页事件

    }, {
        key: "handlePageChange",
        value: function handlePageChange(page, sizePerPage) {
            this.ajaxRequestData(this.state.status, this.state.searchData, page, sizePerPage);
        }
        /*******************************************************************/

        /*******************************************************************/

        /*******************************************************************/
        //

    }, {
        key: "render",
        value: function render() {
            //每页显示条数列表
            var sizePerPageList = [{ text: '10', value: 10 }, { text: '20', value: 20 }, { text: '30', value: 30 }, { text: '所有', value: this.state.totalSize }];
            //分页对象-顶部
            var top_pagination = null;
            //分页对象-底部
            var bottom_pagination = null;
            //
            var datas = this.state.datas;
            var children = this.props.children;
            var tbodyCls = ""; //className
            var tbody = [];
            var fixed_tbody = [];
            var tr = [];

            var fixedTbody = [];
            var fixedTr = [];

            //表格样式
            var tableClassName = " "; //orderTable
            if (this.options.class) {
                tableClassName = tableClassName + " " + this.options.class;
                if (this.options.class == "table2") {
                    tableClassName = "table table2";
                }
            } else {
                tableClassName = "table";
            }

            //加载提示
            if (this.state.finish == false && this.options.url != "") {
                tbody = [], tr = [];
                var loading = this.loading;
                tr = React.createElement(JTr, { className: "loading-row", keys: loading }, React.createElement(JTd, {
                    colspan: this.thcols.length
                }, loading.text));
                tbody.push(React.createElement(JTbody, {}, tr));
            } else {

                //没有数据
                if (datas == undefined || datas.length == 0) {
                    tbody = [], tr = [];
                    var noDataRow = this.nodata;

                    tr = React.createElement(JTr, { className: "nodata-row", keys: noDataRow }, React.createElement(JTd, { colspan: this.tdcols.length }, noDataRow.text));
                    tbody.push(React.createElement(JTbody, null, tr));
                } else {

                    //分页对象-头部
                    top_pagination = this.topPagination ? React.createElement(PaginationList, {
                        currPage: this.state.page,
                        sizePerPage: this.state.sizePerPage,
                        dataSize: this.state.totalSize,
                        pageStartIndex: this.state.pageStartIndex,
                        paginationSize: this.state.paginationSize,
                        hideSizePerPage: "true",
                        sizePerPageList: null,
                        prePage: '<i class="far fa-angle-left"></i>',
                        nextPage: '<i class="far fa-angle-right"></i>',
                        pageNumberBtn: false,
                        paginationShowsTotal: function paginationShowsTotal(start, end, dataSize) {
                            return "共 " + dataSize + " 条记录,当前显示 " + start + " - " + end + "";
                        },
                        //firstPage: "\u9996\u9875",
                        //lastPage: "\u5C3E\u9875",
                        changePage: this.handlePageChange //分页事件
                        //onSizePerPageList={this.handleSizePerPageChange} //分页下拉事件
                    }) : React.createElement("div", {
                        className: "row table-pagination"
                    }, React.createElement("div", {
                        className: "col-md-6 col-xs-6 col-sm-6 col-lg-6 pagination-info"
                    }, "共 " + datas.length + " 条记录"));

                    //分页对象-底部
                    bottom_pagination = this.bottomPagination ? React.createElement(PaginationList, {
                        currPage: this.state.page,
                        sizePerPage: this.state.sizePerPage,
                        dataSize: this.state.totalSize,
                        pageStartIndex: this.state.pageStartIndex,
                        paginationSize: this.state.paginationSize,
                        sizePerPageList: sizePerPageList,
                        prePage: '<i class="far fa-angle-left"></i>',
                        nextPage: '<i class="far fa-angle-right"></i>',
                        firstPage: "\u9996\u9875",
                        lastPage: "\u5C3E\u9875",
                        changePage: this.handlePageChange //分页事件
                        , onSizePerPageList: this.handleSizePerPageChange //分页下拉事件
                    }) : React.createElement("div", {
                        className: "row table-pagination"
                    }, React.createElement("div", {
                        className: "col-md-6 col-xs-6 col-sm-6 col-lg-6 pagination-info"
                    }, "共 " + datas.length + " 条记录"));

                    //不含有分页信息
                    if (isNaN(this.state.page)) {
                        top_pagination = null;
                        bottom_pagination = null;
                    }

                    //一单一货
                    if (children == undefined) {
                        tbody = [];
                        //渲染主体表格
                        tr = []; //this.renderTr(tr, this.tdcols, datas);
                        for (var i = 0; i < datas.length; i++) {
                            tr.push(React.createElement(JTr, {
                                data: datas[i],
                                keys: this.tdcols,
                                index: i
                            }));
                        }
                        tbody = React.createElement(JTbody, { className: tbodyCls }, tr);
                    } else {
                        tbody = [];
                        for (var i = 0; i < datas.length; i++) {
                            var tr = [];
                            for (var j = 0; j < children.length; j++) {
                                //特殊情况下，含有子表或者其他内容
                                if (children[j].props.className == "sep-row") {
                                    tr.push(React.createElement(JTr, { className: "sep-row", keys: [] }, React.createElement(JTd, {
                                        colspan: this.tdcols.length,
                                        keys: this.tdcols
                                    })));
                                } else {
                                    //主体数据
                                    tr.push(React.createElement(JTr, {
                                        keys: this.tdcols,
                                        data: datas[i],
                                        onExpandChildRow: this.options.onExpandChildRow
                                    }));
                                }
                            }
                            tbody.push(React.createElement(JTbody, { className: "parent-tbody" }, tr));
                        }
                    }
                }
            }

            return React.createElement("div", { className: "table-box", ref: "root" }, top_pagination, React.createElement("div", { ref: "tableConent", className: "table-content" },
            //滚动区域
            React.createElement("div", { ref: "ts", className: "table-scroll", style: { position: "relative" } }, React.createElement("div", { ref: "ts_thead", className: this.options.height == "auto" ? "table-scroll-thead noscroll" : "table-scroll-thead" }, React.createElement("table", { ref: "tsth_table", className: tableClassName }, React.createElement(JColgroup, { _ref: "tstt_colgroup", thcols: datas == undefined || datas.length == 0 ? this.tdcols : this.thcols }), React.createElement(JThead, { ref: "tst_thead", onTheadThClick: this.onTheadThClick, thcols: datas == undefined || datas.length == 0 ? this.tdcols : this.thcols }))), React.createElement("div", { ref: "ts_tbody", className: "table-scroll-tbody", style: { height: datas.length == 0 ? "auto " : this.props.options.height } }, React.createElement("table", { ref: "tstb_table", className: tableClassName }, React.createElement(JColgroup, { _ref: "tstb_colgroup", thcols: this.tdcols }), tbody)), datas == undefined || datas.length == 0 ? null : React.createElement("div", { ref: "ts_tfoot", className: this.options.height == "auto" ? "table-scroll-tfoot noscroll" : "table-scroll-tfoot" }, React.createElement("table", { ref: "tstf_table", className: tableClassName }, React.createElement(JColgroup, { _ref: "tstf_colgroup", thcols: this.thcols }), React.createElement(JTfoot, { ref: "tstf_tfoot", thcols: this.tdcols, data: datas, all: this.state.all, hasChildTable: this.options.hasChildTable }))))
            //
            //锁定区域
            , React.createElement("div", { ref: "tf", className: "table-fixed" },
            /*React.createElement("div",{ref:"tf_thead",className:"table-fixed-thead"},
                React.createElement("table", { ref:"tfth_table", className: tableClassName },
                    React.createElement(JColgroup,{_ref:"tstt_colgroup", thcols: this.thcols }),
                    React.createElement(JThead, {  ref:"tst_thead", thcols: this.thcols })
                )
            ),
            React.createElement("div",{ref:"tf_tbody", className:"table-fixed-tbody" , style:{height: datas.length == 0 ? "auto " : this.props.options.height}},
                React.createElement("table", {ref:"tftb_table", className: tableClassName },
                    React.createElement(JColgroup,{_ref:"tftb_colgroup", thcols: this.tdcols }),
                  )
            )*/
            datas == undefined || datas.length == 0 ? null : React.createElement("div", { ref: "tf_tfoot", className: "table-fixed-tfoot" }, React.createElement("table", { ref: "tftf_table", className: tableClassName }, React.createElement(JColgroup, { _ref: "tftf_colgroup", thcols: this.thcols, hasChildTable: this.options.hasChildTable }), React.createElement(JTfoot, { ref: "tftf_tfoot", thcols: this.tdcols, data: datas, all: this.state.all, hasChildTable: this.options.hasChildTable }))))), bottom_pagination);
        }
    }]);

    return JTable;
}(React.Component);