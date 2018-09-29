"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by wzj on 2017/11/24.
 */

var MultiSelect = function (_React$Component) {
	_inherits(MultiSelect, _React$Component);

	function MultiSelect(props) {
		_classCallCheck(this, MultiSelect);

		var _this = _possibleConstructorReturn(this, (MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call(this, props));

		_this.state = {
			data: {
				orgList: _this.props.data.orgList,
				curList: _this.props.data.curList
			}
		};

		_this.onOptionClick = _this.onOptionClick.bind(_this);
		_this.moveInAll = _this.moveInAll.bind(_this);
		_this.moveIn = _this.moveIn.bind(_this);
		_this.moveOutAll = _this.moveOutAll.bind(_this);
		_this.moveOut = _this.moveOut.bind(_this);
		_this.filterOptions = _this.filterOptions.bind(_this);
		_this.setMSData = _this.setMSData.bind(_this);
		return _this;
	}

	_createClass(MultiSelect, [{
		key: "setMSData",
		value: function setMSData(data) {

			/*this.setState({
   	data:data
   })*/
			var curData = data.curList;
			$(this.refs.MSR).find("option").remove();
			if (curData.length > 0) {
				for (var j = 0; j < curData.length; j++) {
					var $opt = $("<option></option>");
					$opt.text(curData[j].text);
					$opt.val(curData[j].value);
					$(this.refs.MSR).append($opt);
				}
			}

			var orgData = data.orgList;
			$(this.refs.MSL).find("option").remove();
			if (orgData.length > 0) {
				for (var j = 0; j < orgData.length; j++) {
					var $opt = $("<option></option>");
					$opt.text(orgData[j].text);
					$opt.val(orgData[j].value);
					$(this.refs.MSL).append($opt);
				}
			}
		}
	}, {
		key: "onOptionClick",
		value: function onOptionClick() {
			//console.log(this.refs.MSL, this.refs.MSL.value);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			$(this.refs.ms).parent().css("height", this.props.height);
			$(this.refs.MSL).bind('dblclick', function (event) {
				//绑定双击事件
				//获取全部的选项,删除并追加给对方
				$(event.target).remove();
				var option = new Option(event.target.text, event.target.value);
				//option.selected = true;
				$(this.refs.MSR).append(option); //添加到到第二个select里面
				$(this.refs.MSR).children("option").prop("selected", false);

				if (this.props.onChange) {
					this.props.onChange(this.getMSRValue());
				}
			}.bind(this));

			$(this.refs.MSR).bind('dblclick', function (event) {
				//绑定双击事件
				//获取全部的选项,删除并追加给对方
				$(event.target).remove();
				var option = new Option(event.target.text, event.target.value);
				//option.selected = true;
				$(this.refs.MSL).append(option); //添加到到第二个select里面
				$(this.refs.MSL).children("option").prop("selected", false);

				if (this.props.onChange) {
					this.props.onChange(this.getMSRValue());
				}
			}.bind(this));

			/*-------------------------------------*/

			$(this.refs.box).hover(function () {
				$(this).addClass("hover");
			}, function () {
				$(this).removeClass("hover");
			});
			$(this.refs.clickText).click(function () {
				$(this.refs.root).addClass("showMS");
			}.bind(this));
		}

		/*刷新props或state*/

	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			//console.log("???",this.state.data)
		}
	}, {
		key: "moveInAll",
		value: function moveInAll() {
			$(this.refs.MSL).children("option").appendTo($(this.refs.MSR));
			$(this.refs.MSR).children("option").prop("selected", false);
			$(this.refs.hiddenValue).val(this.getMSRValue());
			//$(this.refs.currentValue).html("已选成员");
			if (this.props.onChange) {
				this.props.onChange(this.getMSRValue());
			}
		}
	}, {
		key: "moveIn",
		value: function moveIn() {
			$(this.refs.MSL).children("option:selected").appendTo($(this.refs.MSR));
			$(this.refs.MSR).children("option").prop("selected", false);
			$(this.refs.hiddenValue).val(this.getMSRValue());
			//$(this.refs.currentValue).html("已选成员");
			if (this.props.onChange) {
				this.props.onChange(this.getMSRValue());
			}
		}
	}, {
		key: "moveOutAll",
		value: function moveOutAll() {
			$(this.refs.MSR).children("option").appendTo($(this.refs.MSL));
			$(this.refs.MSL).children("option").prop("selected", false);
			$(this.refs.hiddenValue).val(this.getMSRValue());
			//$(this.refs.currentValue).html("全体成员");
			if (this.props.onChange) {
				this.props.onChange(this.getMSRValue());
			}
		}
	}, {
		key: "moveOut",
		value: function moveOut() {
			$(this.refs.MSR).children("option:selected").appendTo($(this.refs.MSL));
			$(this.refs.MSL).children("option").prop("selected", false);
			$(this.refs.MSR).children("option").prop("selected", false);
			$(this.refs.hiddenValue).val(this.getMSRValue());
			//$(this.refs.currentValue).html("全体成员");
			if (this.props.onChange) {
				this.props.onChange(this.getMSRValue());
			}
		}
	}, {
		key: "getMSRValue",
		value: function getMSRValue() {
			var opts = $(this.refs.MSR).children("option");
			var vals = [];
			for (var i = 0; i < opts.length; i++) {
				vals.push(opts[i].value);
			}
			return vals;
		}
	}, {
		key: "filterOptions",
		value: function filterOptions() {
			var filterValue = this.refs.input.value;
			var $mslOpts = $(this.refs.MSL).children("option");
			for (var i = 0; i < $mslOpts.length; i++) {
				if ($mslOpts[i].text.indexOf(filterValue) == -1) {
					$mslOpts[i].style.display = "none";
				} else {
					$mslOpts[i].style.display = "";
				}
			}
		}
	}, {
		key: "render",
		value: function render() {
			var orgData = this.state.data.orgList;
			var curData = this.state.data.curList;
			var mslData = [];
			var msrData = [];

			if (orgData.length > 0) {
				for (var i = 0; i < orgData.length; i++) {
					mslData.push(React.createElement('option', { value: orgData[i].value }, orgData[i].text));
				}
			}

			if (curData.length > 0) {
				for (var j = 0; j < curData.length; j++) {
					msrData.push(React.createElement('option', { value: curData[j].value }, curData[j].text));
				}
			}

			//console.log(curData,this.refs.MSR,$(this.refs.MSR).children("option"),$(this.refs.MSR).find("option"))
			//$(this.refs.MSR).children("option").remove();

			return React.createElement('div', {
				className: 'react-multiSelect', ref: 'ms',
				style: {
					height: "calc(100% - 40px)"
				}
			}, React.createElement('div', { className: 'react-ms-right' }, React.createElement('div', { className: 'react-ms-top-text input-default allMember', ref: 'currentValue' }, this.props.currentLabel), React.createElement('select', {
				multiple: true,
				ref: 'MSR',
				className: 'react-msr',
				id: 'msr'
				//name:this.props.name,
			}, msrData)), React.createElement('div', { className: 'react-ms-btns' }, React.createElement('button', { type: 'button', className: 'ui-btn btn-linear', onClick: this.moveInAll }, React.createElement('span', { className: 'fa fa-angle-double-left' })), React.createElement('button', { type: 'button', className: 'ui-btn btn-linear', onClick: this.moveIn }, React.createElement('span', { className: 'fa fa-angle-left' })), React.createElement('button', { type: 'button', className: 'ui-btn btn-linear', onClick: this.moveOutAll }, React.createElement('span', { className: 'fa fa-angle-double-right' })), React.createElement('button', { type: 'button', className: 'ui-btn btn-linear', onClick: this.moveOut }, React.createElement('span', { className: 'fa fa-angle-right' }))), React.createElement('div', { className: 'react-ms-left' }, React.createElement('input', { className: 'react-ms-top-input input-default', type: 'text', ref: 'input', onKeyUp: this.filterOptions, placeholder: '请输入关键字查找' }), React.createElement('select', { multiple: true, ref: 'MSL', className: 'react-msl', id: 'msl'

			}, mslData)), React.createElement('input', { type: 'hidden', name: this.props.name, ref: 'hiddenValue' }));
		}
	}]);

	return MultiSelect;
}(React.Component);