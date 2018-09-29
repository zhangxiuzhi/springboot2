'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PageButton = require('./PageButton');

var _PageButton2 = _interopRequireDefault(_PageButton);

var _SizePerPageDropDown = require('./SizePerPageDropDown');

var _SizePerPageDropDown2 = _interopRequireDefault(_SizePerPageDropDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var PaginationList = function (_React$Component) {
    _inherits(PaginationList, _React$Component);

    function PaginationList(props) {
        _classCallCheck(this, PaginationList);

        var _this = _possibleConstructorReturn(this, (PaginationList.__proto__ || Object.getPrototypeOf(PaginationList)).call(this, props));

        _this.state = {
            open: _this.props.open
        };
        return _this;
    }

    _createClass(PaginationList, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this.setState({ open: false });
        }
    }, {
        key: 'changePage',
        value: function changePage(page) {
            var _props = this.props,
                pageStartIndex = _props.pageStartIndex,
                prePage = _props.prePage,
                currPage = _props.currPage,
                nextPage = _props.nextPage,
                lastPage = _props.lastPage,
                firstPage = _props.firstPage,
                sizePerPage = _props.sizePerPage;


            if (page === prePage) {
                page = currPage - 1 < pageStartIndex ? pageStartIndex : currPage - 1;
            } else if (page === nextPage) {
                page = currPage + 1 > this.lastPage ? this.lastPage : currPage + 1;
            } else if (page === lastPage) {
                page = this.lastPage;
            } else if (page === firstPage) {
                page = pageStartIndex;
            } else {
                page = parseInt(page, 10);
            }

            if (page !== currPage) {
                this.props.changePage(page, sizePerPage);
            }
        }
    }, {
        key: 'changeSizePerPage',
        value: function changeSizePerPage(pageNum) {
            var selectSize = typeof pageNum === 'string' ? parseInt(pageNum, 10) : pageNum;
            var currPage = this.props.currPage;

            if (selectSize !== this.props.sizePerPage) {
                this.totalPages = Math.ceil(this.props.dataSize / selectSize);
                this.lastPage = this.props.pageStartIndex + this.totalPages - 1;
                if (currPage > this.lastPage) currPage = this.lastPage;
                this.props.changePage(currPage, selectSize);
                if (this.props.onSizePerPageList) {
                    this.props.onSizePerPageList(selectSize);
                }
            } else {
                this.setState({ open: false });
            }
        }
    }, {
        key: 'toggleDropDown',
        value: function toggleDropDown() {
            this.setState({
                open: !this.state.open
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                currPage = _props2.currPage,
                dataSize = _props2.dataSize,
                sizePerPage = _props2.sizePerPage,
                sizePerPageList = _props2.sizePerPageList,
                paginationShowsTotal = _props2.paginationShowsTotal,
                pageStartIndex = _props2.pageStartIndex,
                paginationPanel = _props2.paginationPanel;

            this.totalPages = Math.ceil(dataSize / sizePerPage);
            this.lastPage = this.props.pageStartIndex + this.totalPages - 1;
            var pageBtns = this.makePage(typeof paginationPanel === 'function');
            var dropdown = this.makeDropDown();

            var offset = Math.abs(CONST_VAR.PAGE_START_INDEX - pageStartIndex);
            var start = (currPage - pageStartIndex) * sizePerPage;
            start = dataSize === 0 ? 0 : start + 1;
            var to = Math.min(sizePerPage * (currPage + offset) - 1, dataSize);
            if (to >= dataSize) to--;
            var total = paginationShowsTotal ? _react2.default.createElement('span', null, 'Showing rows ', start, ' to\xA0', to + 1, ' of\xA0', dataSize) : null;

            if (typeof paginationShowsTotal === 'function') {
                total = paginationShowsTotal(start, to + 1, dataSize);
            }

            var content = paginationPanel && paginationPanel({
                currPage: currPage,
                sizePerPage: sizePerPage,
                sizePerPageList: sizePerPageList,
                pageStartIndex: pageStartIndex,
                changePage: this.changePage,
                toggleDropDown: this.toggleDropDown,
                changeSizePerPage: this.changeSizePerPage,
                components: {
                    totalText: total,
                    sizePerPageDropdown: dropdown,
                    pageList: pageBtns
                }
            });

            return _react2.default.createElement('div', { className: 'row orderTable-pagination' }, content || _react2.default.createElement('div', null, _react2.default.createElement('div', { className: 'col-md-6 col-xs-6 col-sm-6 col-lg-6' }, total, sizePerPageList.length > 1 ? dropdown : null), _react2.default.createElement('div', { className: 'col-md-6 col-xs-6 col-sm-6 col-lg-6' }, pageBtns)));
        }
    }, {
        key: 'makeDropDown',
        value: function makeDropDown() {
            var _this2 = this;

            var dropdown = void 0;
            var dropdownProps = void 0;
            var sizePerPageText = '';
            var _props3 = this.props,
                sizePerPageDropDown = _props3.sizePerPageDropDown,
                hideSizePerPage = _props3.hideSizePerPage,
                sizePerPage = _props3.sizePerPage,
                sizePerPageList = _props3.sizePerPageList;

            if (sizePerPageDropDown) {
                dropdown = sizePerPageDropDown({
                    open: this.state.open,
                    hideSizePerPage: hideSizePerPage,
                    currSizePerPage: sizePerPage,
                    sizePerPageList: sizePerPageList,
                    toggleDropDown: this.toggleDropDown,
                    changeSizePerPage: this.changeSizePerPage
                });
                if (dropdown.type.name === _SizePerPageDropDown2.default.name) {
                    dropdownProps = dropdown.props;
                } else {
                    return dropdown;
                }
            }

            if (dropdownProps || !dropdown) {
                var sizePerPageOptions = sizePerPageList.map(function (_sizePerPage) {
                    var pageText = _sizePerPage.text || _sizePerPage;
                    var pageNum = _sizePerPage.value || _sizePerPage;
                    if (sizePerPage === pageNum) sizePerPageText = pageText;
                    return _react2.default.createElement('li', { key: pageText, role: 'presentation' }, _react2.default.createElement('a', { role: 'menuitem',
                        tabIndex: '-1', href: '#',
                        'data-page': pageNum,
                        onClick: function onClick(e) {
                            e.preventDefault();
                            _this2.changeSizePerPage(pageNum);
                        } }, pageText));
                });
                dropdown = _react2.default.createElement(_SizePerPageDropDown2.default, _extends({
                    open: this.state.open,
                    hidden: hideSizePerPage,
                    currSizePerPage: String(sizePerPageText),
                    options: sizePerPageOptions,
                    onClick: this.toggleDropDown
                }, dropdownProps));
            }
            return dropdown;
        }
    }, {
        key: 'makePage',
        value: function makePage() {
            var _this3 = this;

            var isCustomPagingPanel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var pages = this.getPages();
            var isStart = function isStart(page, _ref) {
                var currPage = _ref.currPage,
                    pageStartIndex = _ref.pageStartIndex,
                    firstPage = _ref.firstPage,
                    prePage = _ref.prePage;
                return currPage === pageStartIndex && (page === firstPage || page === prePage);
            };
            var isEnd = function isEnd(page, _ref2) {
                var currPage = _ref2.currPage,
                    nextPage = _ref2.nextPage,
                    lastPage = _ref2.lastPage;
                return currPage === _this3.lastPage && (page === nextPage || page === lastPage);
            };
            var pageBtns = pages.filter(function (page) {
                if (this.props.alwaysShowAllBtns) {
                    return true;
                }
                return isStart(page, this.props) || isEnd(page, this.props) ? false : true;
            }, this).map(function (page) {
                var isActive = page === this.props.currPage;
                var isDisabled = isStart(page, this.props) || isEnd(page, this.props) ? true : false;
                return _react2.default.createElement(_PageButton2.default, { key: page,
                    changePage: this.changePage,
                    active: isActive,
                    disable: isDisabled }, page);
            }, this);
            //const classname = classSet(
            //  isCustomPagingPanel ? null : 'react-bootstrap-table-page-btns-ul',
            //  'pagination'
            //);
            var classname = "react-bootstrap-table-page-btns-ul pagination";
            return _react2.default.createElement('ul', { className: classname }, pageBtns);
        }
    }, {
        key: 'getLastPage',
        value: function getLastPage() {
            return this.lastPage;
        }
    }, {
        key: 'getPages',
        value: function getPages() {
            var pages = void 0;
            var endPage = this.totalPages;
            if (endPage <= 0) return [];
            var startPage = Math.max(this.props.currPage - Math.floor(this.props.paginationSize / 2), this.props.pageStartIndex);
            endPage = startPage + this.props.paginationSize - 1;

            if (endPage > this.lastPage) {
                endPage = this.lastPage;
                startPage = endPage - this.props.paginationSize + 1;
            }

            if (startPage !== this.props.pageStartIndex && this.totalPages > this.props.paginationSize && this.props.withFirstAndLast) {
                pages = [this.props.firstPage, this.props.prePage];
            } else if (this.totalPages > 1 || this.props.alwaysShowAllBtns) {
                pages = [this.props.prePage];
            } else {
                pages = [];
            }

            for (var i = startPage; i <= endPage; i++) {
                if (i >= this.props.pageStartIndex) pages.push(i);
            }

            if (endPage <= this.lastPage) {
                pages.push(this.props.nextPage);
            }
            if (endPage !== this.totalPages && this.props.withFirstAndLast) {
                pages.push(this.props.lastPage);
            }

            return pages;
        }
    }]);

    return PaginationList;
}(_react2.default.Component);

exports.default = PaginationList;