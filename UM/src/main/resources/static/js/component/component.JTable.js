"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/11/20.
 */

var ComponentJTable = function (_React$Component) {
    _inherits(ComponentJTable, _React$Component);

    function ComponentJTable(props) {
        _classCallCheck(this, ComponentJTable);

        var _this = _possibleConstructorReturn(this, (ComponentJTable.__proto__ || Object.getPrototypeOf(ComponentJTable)).call(this, props));

        _this.options = props.options;
        _this.height = "auto";
        _this.thcols = [];
        _this.tdcols = [];
        _this.fixedTh = []; //锁定表头列
        _this.fixedTd = []; //锁定表体列

        _this.tableScroll = null;
        _this.state = {
            data: props.datas,
            searchData: _this.options.searchData || [],
            page: 1,
            sizePerPage: 10
        };

        _this.customRenderFinishCallBack = _this.customRenderFinishCallBack.bind(_this);
        _this.renderTableTbodyHover = _this.renderTableTbodyHover.bind(_this);
        _this.renderTableScroll = _this.renderTableScroll.bind(_this);
        _this.checkedInThead = _this.checkedInThead.bind(_this);
        _this.setTableSize = _this.setTableSize.bind(_this);
        _this.onExpandChildRow = _this.onExpandChildRow.bind(_this);
        return _this;
    }

    //DOM加载完成


    _createClass(ComponentJTable, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
        // console.log("componentDidMount",this.refs.jtable.refs.table)
        // console.log($(this.refs.jtable.refs.table).parents(".panel").height())


        //完成渲染新的props或者state后调用

    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            //console.log("componentDidUpdate")
            //this.refs.jtable.ajaxRequestData();
            //console.log(this.props.data)
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate() {
            //console.log("componentWillUpdate")
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate() {}
        //console.log("shouldComponentUpdate")


        //重新渲染后

    }, {
        key: "customRenderFinishCallBack",
        value: function customRenderFinishCallBack(jtable, _datas, _searchData, _page, _sizePerPage, _totalSize) {

            if (this.options.border == 0) {
                if (this.refs.jtable) {
                    $(this.refs.jtable.refs.root).find(".table-scroll").css("border", 0);
                }
            }

            if (this.options.customRenderFinishCallBack) {
                this.options.customRenderFinishCallBack(jtable, _datas, _searchData, _page, _sizePerPage, _totalSize);
            }

            //当前表格
            var $table = $(jtable.refs.tstb_table);
            //console.log("component",$table)
            $table.data("jtable", this);

            //表格的盒子
            var $table_box = $table.closest(".table-box");
            $table_box.data("jtable", this);
            //表格的盒子容器
            var $panel = $table.closest(".panel");
            var $panel_body = $table.closest(".panel-body");
            //水平滚动条
            var $table_scroll_tbody = $(jtable.refs.ts_tbody);

            //表格头滚动区
            var $table_scroll_thead = $(jtable.refs.ts_thead);

            //表格脚滚动区
            var $table_scroll_tfoot = $(jtable.refs.ts_tfoot);
            if ($table_scroll_tfoot.find("th.summary").length == 0) {
                //没有统计信息时隐藏统计区域
                $table_scroll_tfoot.hide();
            }

            //设置大小
            this.setTableSize();
            //当在加载时


            //渲染滚动条
            this.renderTableScroll($table, $table_scroll_tbody, $table_scroll_thead, $table_scroll_tfoot);

            //渲染表格交互
            //默认在切换页后清空所有checkbox
            var $thead = $(jtable.refs.tsth_table);
            $thead.find("thead").find("input[type=checkbox]").prop("checked", false);
            this.renderTableTbodyHover($table);

            //tooltip
            jbsframe.tooltip();
            //new icon
            //修改新图标
            jbsframe.updateNewFontAwesome();
            //替换所有checkbox，radio样式
            jbsframe.updateCheckboxRadioStyle();
            //金额
            jbsframe.renderMoneyMask();
            //数字
            jbsframe.renderNumberMask();
            //
            jbsframe.updateAdminPageScroll();

            //列表中展开子项的按钮点击后，重新定义表格大小
            $table.find("a.ui-link-icon.fa-angle-down,a.ui-link-icon.fa-angle-up").click(function () {
                $table.data("jtable").setTableSize();
            });
            /*$table.find("td.expand-cell>a.ui-link-icon").click(function(e){
                $(e.currentTarget).find("i").toggleClass("fa-angle-right").toggleClass("fa-angle-down");
                if(this.options.expandChildRow){
                    this.options.expandChildRow();
                }
            }.bind(this));*/

            //格式化所有tab-link的链接，设置成以tab形式打开
            erp_tabContent.formatTabLink();

            //保存最新記錄
            this.setState({
                data: _datas,
                searchData: _searchData,
                page: _page,
                sizePerPage: _sizePerPage
            });
        }

        /**
         *渲染滚动条
         * @param $table
         * @param $table_scroll_tbody
         * @param $table_scroll_thead
         * @param $table_scroll_tfoot
         */

    }, {
        key: "renderTableScroll",
        value: function renderTableScroll($table, $table_scroll_tbody, $table_scroll_thead, $table_scroll_tfoot) {

            $table_scroll_tbody.perfectScrollbar({
                wheelSpeed: 0.5
            });

            $table_scroll_tbody.scroll(function (e) {
                //水平滚动条的滚动位置
                var scrollLeft = e.currentTarget.scrollLeft;
                var $children_table_box = $table.find(".sep-row.table-row").find(".table-box");
                var $children_table_btnGroup = $table.find(".sep-row.table-row").find(".table-row-btnGroup");
                //将子表的位置同滚动条拖动的位置一致
                if ($table.width() - $children_table_box.width() > scrollLeft) {
                    $children_table_btnGroup.css("left", scrollLeft);
                    $children_table_box.css("left", scrollLeft);
                }

                //锁定的表头位置同滚动条拖动的位置一致
                $table_scroll_thead.scrollLeft(scrollLeft);

                //锁定的表头位置同滚动条拖动的位置一致
                $table_scroll_tfoot.scrollLeft(scrollLeft);
            });
        }

        /**
         *渲染表格交互
         * @param $table
         */

    }, {
        key: "renderTableTbodyHover",
        value: function renderTableTbodyHover($table) {
            var component = this;

            //表头checkbox的选中状态
            /* if($table.find("thead").find("input[type=checkbox]:checked").length>0){
                 $table.find("tbody").find("input[type=checkbox]").prop("checked",true);
             }else{
                 $table.find("tbody").find("input[type=checkbox]").prop("checked",false);
             }*/
            //默认在切换页后清空所有checkbox
            $table.find("tbody").find("input[type=checkbox]").prop("checked", false);

            $table.find("input[type=radio]").unbind('click').click(function (e) {
                if ($(e.currentTarget).parent("tbody").attr("class") != "parent-tbody") {
                    $table.find("tr").removeClass("selected");
                    $(e.currentTarget).addClass("selected");
                } else {
                    $table.find("tbody").removeClass("selected");
                    $(e.currentTarget).parent("tbody").addClass("selected");
                }
                e.stopPropagation();
                if (component.props.options.onRowClick) {
                    //  component.props.options.onRowClick(e.currentTarget)
                }
            });
            $table.find("input[type=checkbox]").unbind('click').click(function (e) {
                //选中表头内的checkbox
                component.checkedInThead($table);
                if ($(e.currentTarget).parent("tbody").attr("class") != "parent-tbody") {
                    $table.find("tr").removeClass("selected");
                    $(e.currentTarget).addClass("selected");
                } else {
                    $table.find("tbody").removeClass("selected");
                    $(e.currentTarget).parent("tbody").addClass("selected");
                }
                e.stopPropagation();
                if (component.props.options.onRowClick) {
                    // component.props.options.onRowClick(e.currentTarget)
                }
            });
            $table.find("tbody").find("tr").unbind('click').click(function (e) {
                if ($(e.currentTarget).find("input[type=checkbox],input[type=radio]").length > 0 && e.target.tagName == "TD") {
                    $(e.currentTarget).find("input[type=checkbox],input[type=radio]").each(function (index, elem) {
                        if ($(elem).attr("disabled") != "disabled") {
                            $(elem).prop("checked", !elem.checked);
                        }
                    });
                    //选中表头内的checkbox
                    component.checkedInThead($table);
                } else {}
                if ($(e.currentTarget).parent("tbody").attr("class") != "parent-tbody") {
                    $table.find("tr").removeClass("selected");
                    $(this).addClass("selected");
                } else {
                    $table.find("tbody").removeClass("selected");
                    $(e.currentTarget).parent("tbody").addClass("selected");
                }
                //获取当前点击行数据
                if (component.props.options.onRowClick) {
                    component.props.options.onRowClick(e.currentTarget);
                }
                //
            });

            $table.find("tbody").find("tr").on("dblclick", function (e) {
                //获取当前点击行数据
                if (component.props.options.onRowDbClick) {
                    component.props.options.onRowDbClick(e.currentTarget);
                }
            });
        }

        /**
         * 根据colgroup内的col宽度来设置表格宽度
         * @param table
         */

    }, {
        key: "setTableWidthFromColgroup",
        value: function setTableWidthFromColgroup(table) {
            var $colgroup = $(table).children("colgroup");
            var colgroup_width = 0;
            $colgroup.find("col").each(function (index, col) {
                if ($(col).css("display") != "none") {
                    colgroup_width = colgroup_width + Number($(col).attr("width"));
                }
            });
            $(table).css("width", colgroup_width);
        }

        /**
         * 根据col内的锁定fixed属性来设置表格宽度
         * @param table
         */

    }, {
        key: "setTableWidthFromFixedCol",
        value: function setTableWidthFromFixedCol(refs) {
            var fixbox = refs.tf;

            //
            /* var tfth_table =refs.tfth_table;
             var fixedBoxWidth = 0;
             var cols = $(tfth_table).find("colgroup>col");
             var ths = $(tfth_table).find("thead th");
             for(var i=0;i<ths.length;i++){
                 if(!$(ths[i]).hasClass("fixed-hidden")){
                     fixedBoxWidth = fixedBoxWidth + Number(cols[i].width);
                 }
             }*/

            //设置锁定区域大小
            /*  var tfth_table  = refs.tfth_table;
              var tftb_table  = refs.tftb_table;
              var fixedBoxHeight = 0;
              $(fixbox).css({
                  "width":fixedBoxWidth,
                  "height": $(tfth_table).outerHeight() + $(tftb_table).outerHeight()
              });
                //设置锁定表体top
              var tf_thead = refs.tf_thead;
              var tf_tbody = refs.tf_tbody;
              $(tf_tbody).css("top",$(tf_thead).outerHeight());*/

            //
            var ts_thead = refs.ts_thead;
            var ts_tbody = refs.ts_tbody;

            //foot
            var tftf_table = refs.tftf_table;
            var fixedTfootBoxWidth = 0;
            var cols = $(tftf_table).find("colgroup>col");
            var ths = $(tftf_table).find(">tfoot>tr:first-child>th");
            for (var i = 0; i < ths.length; i++) {
                if (!$(ths[i]).hasClass("fixed-hidden")) {
                    fixedTfootBoxWidth = fixedTfootBoxWidth + Number(ths[i] ? $(ths[i]).width() : 0);
                }
            }

            //将统计列固定
            var tf_tfoot = refs.tf_tfoot;
            $(refs.tf).css({
                width: fixedTfootBoxWidth - 17 + 2,
                height: $(refs.tstf_table).outerHeight()
            });
        }

        /**
         * 展开子表操作
         */

    }, {
        key: "onExpandChildRow",
        value: function onExpandChildRow(rowData, $childRow) {
            //重置大小
            var $table = $(this.refs.jtable.refs.tstb_table);
            $table.data("jtable").setTableSize();
            //回调
            if (this.options.onExpandChildRow) {
                this.options.onExpandChildRow(rowData, $childRow);
            }
        }

        /**
         *设置表格大小
         * @param size {width,height}
         */

    }, {
        key: "setTableSize",
        value: function setTableSize(size) {

            if (this.refs.jtable) {
                //表格的盒子
                var $t_box = $(this.refs.jtable.refs.root);
                var $ts_thead = $(this.refs.jtable.refs.ts_thead);
                var $ts_tbody = $(this.refs.jtable.refs.ts_tbody);
                var $ts_tfoot = $(this.refs.jtable.refs.ts_tfoot);

                //显示的滚动区
                //根据表格内的col数量设置对应的表格宽度
                this.setTableWidthFromColgroup(this.refs.jtable.refs.tsth_table);
                this.setTableWidthFromColgroup(this.refs.jtable.refs.tstb_table);
                this.setTableWidthFromColgroup(this.refs.jtable.refs.tstf_table);

                //显示的锁定区
                this.setTableWidthFromColgroup(this.refs.jtable.refs.tfth_table);
                this.setTableWidthFromColgroup(this.refs.jtable.refs.tftb_table);
                this.setTableWidthFromColgroup(this.refs.jtable.refs.tftf_table);

                //设置锁定区域高度宽度
                this.setTableWidthFromFixedCol(this.refs.jtable.refs);

                $ts_tbody.perfectScrollbar("update");

                /*---------------------------------------------------*/

                //表格的盒子容器
                var $panel = $t_box.closest(".panel") || $($t_box.parents(".panel")[0]);
                var $panel_header = $panel.find(".panel-header");
                var $panel_body = $panel.find(".panel-body");
                if ($panel_body.length > 1) {
                    $panel_body = $panel.find(".panel-body.active");
                } else if ($panel_body.length == 1) {
                    $panel_body = $panel_body;
                } else {
                    $panel_body = $panel;
                }
                //console.log("初始化panel-body",$panel_body,$panel_body.outerHeight())
                //如果表格高度 < 表格容器scroll_tbody高度，隐藏表格内的滚动条单元格
                //console.log("$ts_tbody",$ts_tbody.outerHeight())

                //当前表格
                var $table = $(this.refs.jtable.refs.tstb_table);
                //分页
                var $table_pagination = $t_box.find(".table-pagination");

                /*---------------------------------------------------*/

                //当父容器panel放大缩小时
                if ($panel.hasClass("fullscrean")) {
                    var tstb_outerHeight = "auto";
                    //得到放大缩小的panel高度后
                    if (size && size.height) {
                        tstb_outerHeight = 0;
                        var pagination_margin = jbsframe.getMarginNumber($table_pagination);
                        if ($table_pagination.length == 1) {
                            tstb_outerHeight = size.height - $ts_thead.outerHeight() - $ts_tfoot.outerHeight() - $table_pagination.outerHeight() - pagination_margin[0] - pagination_margin[2];
                        } else if ($table_pagination.length == 2) {
                            tstb_outerHeight = size.height - $ts_thead.outerHeight() - $ts_tfoot.outerHeight() - $table_pagination.outerHeight() * 2 - pagination_margin[0] * 2 - pagination_margin[2] * 2;
                        } else {
                            tstb_outerHeight = size.height - $ts_thead.outerHeight() - $ts_tfoot.outerHeight();
                        }
                    }
                    //切换分页数量时
                    if ($ts_tbody.width() < $table.width() || $ts_tbody.height() < $table.height()) {
                        tstb_outerHeight = tstb_outerHeight - 17;
                    }
                    $ts_tbody.css("height", tstb_outerHeight);
                } else {
                    $ts_tbody.css("height", "auto");
                }

                /*---------------------------------------------------*/

                //如果表格无数据，隐藏表头上的滚动条单元格
                if ($table.children("tbody").children(".nodata-row").length > 0) {
                    //console.log("如果无数据时表格宽度同表头")
                    $table.css("width", $ts_thead.find(".table").outerWidth());
                    // $ts_thead.find(".scroll-cell").hide();
                }

                //表格容器panel宽度
                var panel_body_width = $panel_body.outerWidth();
                if (panel_body_width == 0) {
                    panel_body_width = "auto";
                }
                //表格容器panel宽度 > 表格宽度
                if (panel_body_width > $table.outerWidth()) {
                    $(this.refs.jtable.refs.tstb_table).css("width", "100%");
                    $(this.refs.jtable.refs.tsth_table).find(".scroll-cell").css({ width: 0, display: "none" });
                    $(this.refs.jtable.refs.tstf_table).find(".scroll-cell").css({ width: 0, display: "none" });
                    $(this.refs.jtable.refs.tsth_table).css("width", "100%");
                    $(this.refs.jtable.refs.tstf_table).css("width", "100%");
                }

                //如果当前表格是子表
                if ($t_box.closest(".sep-row.table-row").length > 0) {
                    var $td = $t_box.closest(".sep-row.table-row").children("td"); //父级td
                    var td_padding = jbsframe.getPaddingNumber($td); //父级td -padding
                    var $parent_table = $t_box.closest(".sep-row.table-row").closest(".table"); //父级table
                    if ($parent_table.data("jtable")) {
                        var $parent_table_ts_tbody = $($parent_table.data("jtable").refs.jtable.refs.ts_tbody);
                        var parentWidth = $parent_table.innerWidth() - td_padding[0] - td_padding[2];
                        //设置表格的盒子宽度同当前的父级 panel 宽度 - td内的左右padding
                        $t_box.css("width", $parent_table_ts_tbody.outerWidth() - td_padding[0] - td_padding[2] - 17);
                    }
                }

                //如果当前表内含有子表的
                /*if($t_box.find(".sep-row").length > 0){
                    if( this.options.height == "auto"){
                        if($table_pagination.length == 1){
                            pb_outerHeight = $panel_body.outerHeight() - $ts_thead.outerHeight() - $ts_tfoot.outerHeight() - $table_pagination.outerHeight();
                        } else if($table_pagination.length ==2){
                            pb_outerHeight = $panel_body.outerHeight()- $ts_thead.outerHeight() - $ts_tfoot.outerHeight() - $table_pagination.outerHeight() * 2;
                        }else{
                            pb_outerHeight = $panel_body.outerHeight() - $ts_thead.outerHeight() - $ts_tfoot.outerHeight();
                        }
                        $ts_tbody.css("height",pb_outerHeight);
                    }else{
                        $ts_tbody.css("height",this.options.height);
                    }
                }*/
                $t_box.find(".sep-row.table-row").find(".table-scroll-tbody").each(function (index, child_ts_tbody) {
                    var $child_ts_tbody = $(child_ts_tbody);
                    var $td = $child_ts_tbody.closest(".sep-row.table-row").children("td"); //父级td
                    var td_padding = jbsframe.getPaddingNumber($td); //父级td -padding
                    var parentWidth = $ts_tbody.outerWidth() - td_padding[0] - td_padding[2];
                });
            }

            /*
            
                   */
        }

        //选中表头内的checkbox

    }, {
        key: "checkedInThead",
        value: function checkedInThead($table) {
            var all = $table.find("tbody").find("input[type=checkbox]").length;
            var checked = $table.find("tbody").find("input[type=checkbox]:checked").length;
            if (all == checked) {
                $table.find("thead").find("input[type=checkbox]").prop("checked", true);
            } else {
                $table.find("thead").find("input[type=checkbox]").prop("checked", false);
            }
        }

        //重新加载

    }, {
        key: "reloadTable",
        value: function reloadTable(_searchData, page) {
            this.refs.jtable.setState({
                finish: false,
                page: page ? page : this.state.page,
                sizePerPage: this.options.pageSize || this.state.sizePerPage || 10,
                searchData: _searchData || this.state.searchData
            });
            //this.refs.jtable.ajaxRequestData(null,_searchData)
        }

        //获取表格数据

    }, {
        key: "getTableData",
        value: function getTableData() {
            return this.refs.jtable.state.datas;
        }

        //填充表格数据

    }, {
        key: "setTableData",
        value: function setTableData(data) {
            this.refs.jtable.setState({
                datas: data,
                totalSize: data.length,
                sizePerPage: data.length
            });
        }
    }, {
        key: "render",
        value: function render() {
            //数据
            var datas = this.state.data;
            var thead = this.options.thead;
            for (var i = 0; i < thead.length; i++) {
                this.thcols.push({
                    dataField: thead[i].dataField,
                    dataName: thead[i].dataName,
                    width: thead[i].width,
                    dataFormat: thead[i].dataFormat || null,
                    className: thead[i].className,
                    align: thead[i].align,
                    hidden: thead[i].hidden,
                    fixed: thead[i].fixed,
                    sortable: thead[i].sortable,
                    pageSummary: thead[i].pageSummary,
                    summary: thead[i].summary,
                    summaryType: thead[i].summaryType
                });
                this.tdcols.push({
                    dataField: thead[i].dataField,
                    dataName: thead[i].dataName,
                    width: thead[i].width,
                    dataFormat: thead[i].dataFormat || null,
                    className: thead[i].className,
                    align: thead[i].align,
                    hidden: thead[i].hidden,
                    fixed: thead[i].fixed,
                    pageSummary: thead[i].pageSummary,
                    summary: thead[i].summary,
                    summaryType: thead[i].summaryType
                });
                if (thead[i].fixed) {
                    this.fixedTh.push(thead[i]);
                    this.fixedTd.push(thead[i]);
                }
            }

            //给表头添加控制滚动条占位的单元格
            this.thcols.push({
                width: 17,
                className: "scroll-cell"
            });
            //是否含有子表
            if (this.options.hasChildTable) {
                this.thcols.unshift({
                    width: 32,
                    className: "expand-cell"
                });
                this.tdcols.unshift({
                    width: 32,
                    className: "expand-cell"
                });
            }

            var options = {
                height: this.options.height || this.height,
                class: this.options.className,
                url: this.options.url,
                thcols: this.thcols,
                fixed_table: {
                    fixedTh: this.fixedTh,
                    fixedTd: this.fixedTd
                },
                status: this.props.status,
                searchData: this.state.searchData,
                sortData: {
                    sort: [],
                    order: []
                },
                page: 1,
                sizePerPage: this.options.pageSize || 10,
                totalSize: this.options.totalSize || 0,
                nodata: {
                    text: "<i class='far fa-info-circle'></i> " + this.options.nodata.text,
                    dataFormat: this.options.nodata.dataFormat //{ text: "没有交易报盘" }
                }, customRenderFinishCallBack: this.customRenderFinishCallBack
                //,loadingText:{dataFormat:listLoadingIconFormat}    //自定义列表加载动画
                , hasChildTable: this.options.hasChildTable ? true : false,
                onExpandChildRow: this.onExpandChildRow
            };
            //含有子表
            if (options.hasChildTable) {
                return React.createElement(JTable, {
                    ref: "jtable",
                    options: options,
                    datas: datas,
                    thcols: this.thcols,
                    tdcols: this.tdcols
                }, React.createElement(JTr), React.createElement(JTr, { className: "sep-row" }));
            } else {
                return React.createElement(JTable, {
                    ref: "jtable",
                    options: options,
                    datas: datas,
                    thcols: this.thcols,
                    tdcols: this.tdcols
                });
            }
        }
    }]);

    return ComponentJTable;
}(React.Component);