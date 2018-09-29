"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/9/12.
 */
/*
import React from 'react';
import ReactDOM from 'react-dom';
import Protypes from 'prop-types';
import classNames from 'classnames';

import "./SelectBox.scss";*/

var idInc = 0;

var SelectBox = function (_React$Component) {
	_inherits(SelectBox, _React$Component);

	function SelectBox(props) {
		_classCallCheck(this, SelectBox);

		var _this = _possibleConstructorReturn(this, (SelectBox.__proto__ || Object.getPrototypeOf(SelectBox)).call(this, props));

		_this.state = {
			id: "react-selectbox-" + ++idInc, //组件id
			open: false, //下拉菜单打开状态
			pendingValue: [], //填充值
			changeOnClose: false, //是否通过选择后关闭的，以此判断是取选择值还是默认值
			floatItem: props.floatItem ? props.floatItem : false //排放方式，纵向单个 / 横向多个
			, searchValue: "" //搜索值
		};

		_this.blurTimeout = null;
		_this.onToggleOptionsMenu = _this.onToggleOptionsMenu.bind(_this); //显示隐藏下拉菜单
		_this.handleBlur = _this.handleBlur.bind(_this); //
		_this.handleFocus = _this.handleFocus.bind(_this); //
		//this.onChangeValue = this.onChangeValue.bind(this);
		_this.handleClearValue = _this.handleClearValue.bind(_this); //清除当前值
		_this.handleSearch = _this.handleSearch.bind(_this); //搜索值变化
		_this.handleSearchBlur = _this.handleSearchBlur.bind(_this); //搜索输入框失去焦点
		return _this;
	}

	//拦截事件


	_createClass(SelectBox, [{
		key: "interceptEvent",
		value: function interceptEvent(event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
		}
	}, {
		key: "handleNativeChange",
		value: function handleNativeChange(event) {
			var val = event.target.value;
			var children = [].slice.call(event.target.childNodes, 0);
		}

		//改变值

	}, {
		key: "onChangeValue",
		value: function onChangeValue(value, e) {
			return function (event) {
				this.interceptEvent(event);

				//多选
				if (this.isMultiple()) {
					var selected = [];
					//是否通过选择后关闭的，以此判断是取选择值还是默认值
					var val = this.state.changeOnClose ? this.state.pendingValue : this.props.value;
					//如果不是清除动作
					if (value != null) {
						selected = val.slice(0);
						var index = selected.indexOf(value);
						//如果点击的下拉项同默认值，则去除选中
						if (index != -1) {
							selected.splice(index, 1);
						} else {
							//否则添加到最终选中组内
							selected.push(value);
						}
					}
					this.updatePendingValue(selected); //设置state值
					if (this.props.onChange) {
						//自定义回调
						var cbarr = [];
						for (var i = 0; i < selected.length; i++) {
							cbarr.push(this.matchOptionSelected(selected[i])[0]);
						}
						this.props.onChange(cbarr);
					}
				} else {
					this.updatePendingValue(value); //设置state值
					if (this.props.onChange) {
						//自定义回调
						this.props.onChange(this.matchOptionSelected(value)[0]);
					}
					this.handleClose(); //关闭下拉菜单
					this.refs.button.focus();
					setTimeout(function () {
						this.refs.button.blur();
					}.bind(this), 200);
				}
			}.bind(this);
		}

		//更新填充值

	}, {
		key: "updatePendingValue",
		value: function updatePendingValue(value) {
			this.setState({
				pendingValue: value,
				changeOnClose: true //当前选中值后关闭了
			});
		}

		//匹配选项

	}, {
		key: "matchOptionSelected",
		value: function matchOptionSelected(value) {
			var selected = [];
			if (value != null) {
				//对默认的下拉项进行过滤
				var opts = this.options();
				for (var i = 0; i < opts.length; i++) {
					//多选
					if (this.isMultiple()) {
						//默认值于下拉项做匹配
						if (value.indexOf(opts[i].value) != -1) {
							selected.push(opts[i]);
						}
					} else {
						//单选
						if (value == opts[i].value) {
							selected = [opts[i]];
						}
					}
				}
			}
			return selected;
		}

		//显示选中项的label值

	}, {
		key: "label",
		value: function label() {
			//选中的值
			var selected = [];

			//是否通过选择后关闭的，以此判断是取选择值还是默认值
			var value = this.state.changeOnClose ? this.state.pendingValue : this.props.value;
			//匹配选项
			this.matchOptionSelected(value).forEach(function (opt, index) {
				selected.push(React.createElement('span', { key: index, className: 'react-selectbox-label-tag' }, opt.label));
			});
			return selected.length > 0 ? selected : this.props.label;
		}

		//点击打开关闭下拉菜单

	}, {
		key: "onToggleOptionsMenu",
		value: function onToggleOptionsMenu() {
			this.setState({ open: !this.state.open });
		}

		//关闭

	}, {
		key: "handleClose",
		value: function handleClose(event) {
			this.interceptEvent(event);
			this.setState({
				open: false,
				searchValue: ""
			});
			if (this.refs.searchInput) {
				this.refs.searchInput.value = "";
			}
		}

		//失交后关闭

	}, {
		key: "handleFocus",
		value: function handleFocus() {
			clearTimeout(this.blurTimeout);
		}

		//失交后关闭

	}, {
		key: "handleBlur",
		value: function handleBlur() {
			this.blurTimeout = setTimeout(function () {
				this.handleClose();
			}.bind(this), 0);
		}

		//构建清除按钮

	}, {
		key: "handleClearValue",
		value: function handleClearValue(event) {
			this.interceptEvent(event);
			this.onChangeValue(null, function () {})(event);
		}

		//是否多选

	}, {
		key: "isMultiple",
		value: function isMultiple() {
			return String(this.props.multiple) === 'true';
		}

		//搜索事件

	}, {
		key: "handleSearch",
		value: function handleSearch(event) {
			var searchTerm = event.target.value.toString().toLowerCase();
			this.setState({ searchValue: searchTerm }); //设置搜索值
			/*
    var label = option.label,
    value = option.value,
    labelSlug = label.toString().toLowerCase();
    //var opt = this.matchOptionSelected(value);
    //console.log(opt,searchTerm && labelSlug.indexOf(searchTerm),option)
    if(searchTerm && labelSlug.indexOf(searchTerm) == -1){return;}
    */
		}

		//搜索框失去焦点

	}, {
		key: "handleSearchBlur",
		value: function handleSearchBlur() {
			if (this.state.searchValue != "") {
				this.refs.searchInput.className = "react-selectbox-search-input hasSearchValue";
			} else {
				this.refs.searchInput.className = "react-selectbox-search-input";
			}
		}

		//构建组件

	}, {
		key: "render",
		value: function render() {
			//是否通过选择后关闭的，以此判断是取选择值还是默认值
			var value = this.state.changeOnClose ? this.state.pendingValue : this.props.value;
			var classes = classNames("react-selectbox", {
				"react-selectbox-multi": this.isMultiple(),
				"hasValue": value && value.length > 0 //是否有值
			});
			return React.createElement('div', { className: classes }, React.createElement('button', { className: 'react-selectbox-button', type: 'button', ref: 'button', onClick: this.onToggleOptionsMenu, onBlur: this.handleBlur }, React.createElement('div', { className: 'react-selectbox-btn-label' }, this.label()), this.props.filter ? this.renderSearch() : null), this.renderOptionMenu(), this.renderClearBtn(), this.renderNativeSelect());
		}

		//构建搜索

	}, {
		key: "renderSearch",
		value: function renderSearch() {
			var classes = classNames("react-selectbox-search");
			return React.createElement('div', { className: classes }, React.createElement('input', {
				ref: 'searchInput',
				type: 'text',
				className: 'react-selectbox-search-input',
				onChange: this.handleSearch,
				onBlur: this.handleSearchBlur
			}));
		}

		//解析options

	}, {
		key: "options",
		value: function options() {
			var options = [];

			if (this.props.data) {
				this.props.data.forEach(function (option) {
					options.push({
						value: option.value,
						label: option.text,
						key: option.key || ""
					});
				});
			} else {
				React.Children.forEach(this.props.children, function (option) {
					options.push({
						value: option.props.value,
						label: option.props.children,
						key: option.key || ""
					});
				});
			}

			return options;
		}

		//构建下拉菜单

	}, {
		key: "renderOptionMenu",
		value: function renderOptionMenu() {
			var _this2 = this;

			var classes = classNames("react-selectbox-options", {
				"react-selectbox-hidden": !this.state.open,
				"react-selectbox-floatItem": this.state.floatItem,
				"react-selectbox-moreOpt": this.options().length > 6 ? true : false //如果选项超过6个，固定高度并带滚动条
			});

			return React.createElement('div', { className: classes, ref: 'menu' }, React.createElement('div', { className: 'react-selectbox-box-off-screen' }, this.options().map(function (option, index) {
				return _this2.renderOption(option, index);
			})));
		}

		//构建下拉菜单内的选项

	}, {
		key: "renderOption",
		value: function renderOption(option, index) {

			var selected = false,
			    hidden = false;

			//是否通过选择后关闭的，以此判断是取选择值还是默认值
			var value = this.state.changeOnClose ? this.state.pendingValue : this.props.value;

			//匹配选项
			this.matchOptionSelected(value).forEach(function (opt, index) {
				if (opt.value == option.value) {
					selected = true;
				}
			});

			//var labelSlug = option.label.toString().toLowerCase();
			var titleSlug = option.key.toString().toLowerCase();
			if (this.state.searchValue && titleSlug.indexOf(this.state.searchValue) == -1) {
				hidden = true;
			}

			var optionClasses = classNames('react-selectbox-option', {
				'react-selectbox-option-selected': selected,
				'hidden': hidden
			});

			return React.createElement('a', { key: index, href: 'javascript:void(0)',
				className: optionClasses,
				id: this.state.id + "-" + index,
				onClick: this.onChangeValue(option.value),
				onBlur: this.handleBlur,
				onFocus: this.handleFocus
			}, option.label);
		}

		//构建原始下拉框

	}, {
		key: "renderNativeSelect",
		value: function renderNativeSelect() {
			var id = this.props.id ? this.props.id : this.state.id + "-native-select";
			var multiple = this.isMultiple(); //是否多选

			//是否通过选择后关闭的，以此判断是取选择值还是默认值
			var value = this.state.changeOnClose ? this.state.pendingValue : this.props.value;

			//选项
			var option = React.createElement.bind(null, 'option');
			var empty = option({ key: '', value: '' }, '');
			var options = [empty].concat(this.props.children);
			if (this.props.children == undefined && this.props.data.length > 0) {
				for (var i = 0; i < this.props.data.length; i++) {
					var selectedOpt = false;
					//和当前值匹配，如果相同就选中option
					if (value == this.props.data[i].value) {
						selectedOpt = "selected";
					}
					options.push(React.createElement('option', { value: this.props.data[i].value, selected: selectedOpt }, this.props.data[i].text));
				}
			}

			return React.createElement('div', { className: 'react-selectbox-native' }, React.createElement('label', { htmlFor: id }, this.props.label), React.createElement('select', {
				ref: 'select',
				id: id,
				name: this.props.name,
				multiple: multiple,
				value: value || (multiple ? [] : ''),
				"data-validetta": this.props.validetta,
				onChange: this.handleNativeChange
			}, options));
		}

		//构建清楚按钮

	}, {
		key: "renderClearBtn",
		value: function renderClearBtn() {
			//是否通过选择后关闭的，以此判断是取选择值还是默认值
			var val = this.state.changeOnClose ? this.state.pendingValue : this.props.value;
			if (val && val.length > 0) {
				return React.createElement('div', { className: 'react-selectbox-clearbtn', onClick: this.handleClearValue });
			}
		}
	}]);

	return SelectBox;
}(React.Component);

/*
SelectBox.propTypes = {
	className: Protypes.string,
	filter: Protypes.bool, //可模糊搜索
	onChange: Protypes.func //	自定义回调
};*/