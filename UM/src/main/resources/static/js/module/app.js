'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 *
 * 框架类
 * Created by wzj on 2017/4/10.
 */
var jbsframe;
$(document).ready(function () {
	setTimeout(function () {
		app_loader_page_loader.close();
	}, 500);

	jbsframe = new JBSFrame();
	jbsframe.tooltip();
	jbsframe.navbarToggle(); //打开移动端的菜单
	jbsframe.renderDatetimepicker();
	//初始化路由
	//jbsframe.initRouter();
	//jbsframe.hoverNotificationMsgScroll();//鼠标移动到消息栏时出现滚动条，滚动消息

	//绑定所有表格的过滤搜索和重置
	jbsframe.bindTableFilterSearch();
	//绑定所有表单的重置,设置一些特殊情况
	jbsframe.bindFormReset();
	//为所有checkbox，radio添加样式
	jbsframe.updateCheckboxRadioStyle();

	//更新所有老图标
	jbsframe.updateNewFontAwesome();
	//为每个panel添加工具图标按钮
	jbsframe.insertPanelHeaderToolIcon();

	//默认选中checkbox，当value=1时
	/*$("input[type=checkbox].ui-checkbox").each(function(index,elem){
 	if($(elem).val() == "1" || $(elem).val() == 1){
 		$(elem).prop("checked",true);
 	}
 });*/
	$('#router-linkNode a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var tabId = e.target.hash.split("#")[1];
		//console.log(tabId)
	});

	//当前tab切换时，刷新表格
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var $tabPanel = $(this.hash);
		var $table = $tabPanel.find(".table-scroll-tbody>.table");
		var jtable = $table.data("jtable");
		if (jtable != null) {
			jtable.setTableSize();
		}
	});

	//所有单位data-fwin参数的button或链接，都可以通过点击弹出附带的链接iframe
	$("[data-modal='fwin']").click(function () {
		jbsframe.iframeWindow({
			url: $(this).data("href")
		});
	});

	//设置所有tab链接
	jbsframe.initTabpanelSetIframeUrl();
	//解决表单内特殊组件的屏蔽问题
	jbsframe.blockElementInForm();
	//所有输入框带有图标删除功能
	jbsframe.renderInputGroupClearIcon();
	//
	//配合日历控件使用，快捷选择方式
	jbsframe.renderSwitchDatetimepicker();
	//日历
	jbsframe.renderDatetimepicker();
	//数字
	jbsframe.renderNumberMask();
	//金额
	jbsframe.renderMoneyMask();
	//数字编号
	jbsframe.renderNumberCode();
	//生成输入框下拉组件
	jbsframe.renderInputDropdown();
	//渲染所有单位类型的输入框，自动匹配中文并显示
	jbsframe.renderAllCorpValue2Text();
	//渲染主页面自定义滚动条
	jbsframe.renderAdminPageScroll();
	//渲染多文件上传组件
	jbsframe.renderMultiFileUpload();

	//控制右侧栏
	jbsframe.renderSidebarRight();
	//控制模块tab区域的宽度
	jbsframe.renderTabContentSize();
});

//设置键盘回车事件
jQuery.fn.onEnterDown = function (callback) {
	$(this).keydown(function (e) {
		if (e.keyCode == 13) {
			callback.call(this);
		}
	});
};

function reviewInfoWindow(module, id) {
	jbsframe.reviewInfoWindow(module, id);
}
function alert(message) {
	jbsframe.alert(message);
}
function alertError(message) {
	jbsframe.alertError(message);
}
function notification(message, callback) {
	jbsframe.notification(message, callback);
}
function notificationMsg(title, message, callback, callback_cancel) {
	jbsframe.notificationMsg(title, message, callback, callback_cancel);
}
//function confirm(title,message,confirmBtn,cancelBtn,callback_confirm,callback_cancel){
function confirm(title, message, callback_confirm, callback_cancel) {
	jbsframe.confirm(title, message, callback_confirm, callback_cancel);
}

Growl.prototype.content = function () {
	return "<div class='" + this.settings.namespace + "-close'>" + this.settings.close + "</div>\n<div class='" + this.settings.namespace + "-message'><span class='fa fa-info-circle'></span>" + this.settings.message + "</div>";
};

var datetimepicker_icon = {
	time: 'fa fa-clock',
	date: 'fal fa-calendar-alt',
	up: 'fa fa-chevron-up',
	down: 'fa fa-chevron-down',
	previous: 'fa fa-chevron-left',
	next: 'fa fa-chevron-right',
	today: 'glyphicon glyphicon-screenshot',
	clear: 'far fa-trash-alt',
	close: 'fa fa-remove'
};
var datetimepicker_tooltips = {
	today: '今天',
	clear: '清除选择',
	close: '关闭',
	selectMonth: '选择月份',
	prevMonth: '上个月',
	nextMonth: '下个月',
	selectYear: '选择年份',
	prevYear: '上一年',
	nextYear: '下一年',
	selectDecade: 'Select Decade',
	prevDecade: 'Previous Decade',
	nextDecade: 'Next Decade',
	prevCentury: 'Previous Century',
	nextCentury: 'Next Century',
	pickHour: '选择小时',
	incrementHour: '增加一小时',
	decrementHour: '减少一小时',
	pickMinute: '选择分钟',
	incrementMinute: '增加一分钟',
	decrementMinute: '减少一分钟',
	pickSecond: '选择秒',
	incrementSecond: '增加一秒',
	decrementSecond: '减少一秒',
	togglePeriod: 'Toggle Period',
	selectTime: '选择时间'
};
function JBSFrame() {
	var self = this;

	//移动端菜单展示
	this.navbarToggle = function () {
		$(".navbar-toggle").on("click", function () {
			this.openNavbar4mobile();
		}.bind(this));
		this.navbarOverlay(); //移动端菜单展示的遮照控制
	};

	//移动端菜单展示的遮照控制
	this.navbarOverlay = function () {
		$(".navbar-overlay").on("click", function () {
			this.openNavbar4mobile();
		}.bind(this));
	};

	//打开移动端的菜单
	this.openNavbar4mobile = function () {
		if ($("body").hasClass("navbar-left-cover")) {
			$("body").removeClass("navbar-left-cover");
		} else {
			$("body").addClass("navbar-left-cover");
		}
	};

	/**
  * 更新新图标
  */
	this.updateNewFontAwesome = function () {}
	/*$(".fa.fa-search").addClass("far").removeClass("fa");
 if($(".far.fa-search").parent("a").length>0){
 	$(".far.fa-search").parent("a").not(".ui-btn").addClass("ui-link-icon")
 }
 $(".fa.fa-calendar").removeClass("fa-calendar").addClass("far").removeClass("fa").addClass("fa-calendar-alt");
 $(".fa.fa-eye").removeClass("fa").addClass("far");
 $(".fa.fa-pencil-square-o").removeClass("fa-pencil-square-o").addClass("fal").removeClass("fa").addClass("fa-pencil-alt");
 $(".fa.fa-trash").removeClass("fa-trash").addClass("far").removeClass("fa").addClass("fa-trash-alt");
 $(".fa.fa-plus").addClass("far").removeClass("fa");
 $(".fa.fa-plus").addClass("far").removeClass("fa");*/


	/**
  * 为每个panel添加工具图标按钮
  */
	;this.insertPanelHeaderToolIcon = function () {
		$(".panel-header").each(function () {
			var $panel = $(this).parent(".panel");
			if ($panel.data("toolbar") != false) {
				if ($(this).children(".title").length > 0) {
					$(this).children(".title").after("<div class='panel-header-tool'></div>");
					$panel.data("panelhtool", ReactDOM.render(React.createElement(PanelHeaderTool, {}), $(this).children(".title").siblings("div.panel-header-tool")[0]));
				} else {
					$(this).append("<div class='panel-header-tool'></div>");
					$panel.data("panelhtoll", ReactDOM.render(React.createElement(PanelHeaderTool, {}), $(this).find("div.panel-header-tool")[0]));
				}
			}
		});
		$(".panel.panel-minus").each(function (index, element) {
			console.log($(element), $(element).data("panelhtool"));
			$(element).data("panelhtool").minusPanel();
		});
	};

	/**
  * 所有title属性转换为tooltip展示
  */
	this.tooltip = function () {
		//$(".jTooltip").data("toggle","tooltip");
		//$(".jTooltip").attr("title","Some tooltip text!");
		$("[title]").data("toggle", "tooltip");
		$("[title]").data("placement", "bottom");
		$('[title]').tooltip({
			trigger: "hover",
			container: 'body'
		});
	};

	//格式化时间
	this.formatDateTime = function (timestamp) {
		return timestamp == "" || timestamp == null || timestamp == "null" ? "" : new Date(Number(timestamp)).pattern("yyyy-MM-dd HH:mm:ss");
	};
	this.formatDate = function (timestamp) {
		return timestamp == "" || timestamp == null || timestamp == "null" ? "" : new Date(Number(timestamp)).pattern("yyyy-MM-dd");
	};

	//剩余时间
	this.remainingTime = function (end) {
		var newTime = new Date(end) - new Date().getTime();
		//计算天数
		var days = Math.floor(newTime / (24 * 3600 * 1000));
		//计算天数后剩余的毫秒数
		var leave1 = newTime % (24 * 3600 * 1000);
		var hours = Math.floor(leave1 / (3600 * 1000));
		//计算小时数后剩余的毫秒数
		var leave2 = leave1 % (3600 * 1000);
		var minutes = Math.floor(leave2 / (60 * 1000));
		//计算分钟数后剩余的毫秒数
		var leave3 = leave2 % (60 * 1000);
		var seconds = Math.round(leave3 / 1000);

		if (days == 0) {
			return "还剩" + hours + "小时" + minutes + "分钟";
		} else {
			return "还剩" + days + "天" + hours + "小时" + minutes + "分钟";
		}
	};

	/**
 *
 * 配合日历控件使用，快捷选择方式
 *
  */
	this.renderSwitchDatetimepicker = function () {
		var switchOpts = [{ text: "全部", value: "all" }, { text: "当天", value: "today" }, { text: "本周", value: "thisWeek" }, { text: "本月", value: "thisMonth" }, { text: "本年", value: "thisYear" }, { text: "昨天", value: "yesterday" }, { text: "上周", value: "lastWeek" }, { text: "上月", value: "lastMonth" }, { text: "去年", value: "lastYear" }];
		$(".switch-datetimepicker").each(function (index, select) {
			var $select = $(select); //下拉框
			var $startInput = $("input[name=" + $select.data("input").split(",")[0] + "]"); //开始
			$startInput.addClass("switch-datetimepicker-start");
			var $endInput = $("input[name=" + $select.data("input").split(",")[1] + "]"); //结束
			$endInput.addClass("switch-datetimepicker-end");
			var defaultValue = $select.data("default");
			if (defaultValue != undefined) {
				defaultValue = "all";
			}

			for (var i = 0; i < switchOpts.length; i++) {
				var $opt = $("<option></option>");
				$opt.text(switchOpts[i].text);
				$opt.val(switchOpts[i].value);
				if (defaultValue && defaultValue == switchOpts[i].value) {
					$opt.attr("selected", true);
				} else {
					$opt.attr("selected", switchOpts[i].selected);
				}
				$select.append($opt);
			}
			$(select).change();
			$(select).change(function (e) {
				var $opt = $(e.currentTarget).find("option:selected");
				$startInput.val(jbsframe.setDatetimepickerValue($opt.val())[0]);
				$endInput.val(jbsframe.setDatetimepickerValue($opt.val())[1]);
			});
			//默认值
			var $opt = $select.find("option:selected");
			$startInput.val(jbsframe.setDatetimepickerValue($opt.val())[0]);
			$endInput.val(jbsframe.setDatetimepickerValue($opt.val())[1]);
		});
	};

	/**
 * 设置指定日历框内容
  * @param input
  * @param value
  */
	this.setDatetimepickerValue = function (value) {
		var now = new Date(); //当前日期
		var nowDayOfWeek = now.getDay(); //今天本周的第几天
		var nowDay = now.getDate(); //当前日
		var nowMonth = now.getMonth(); //当前月
		var nowYear = now.getFullYear(); //当前年
		nowYear += nowYear < 2000 ? 1900 : 0; //

		var lastMonthDate = new Date(); //上月日期
		lastMonthDate.setDate(1);
		lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
		var lastYear = lastMonthDate.getFullYear() - 1; //上年
		var lastMonth = lastMonthDate.getMonth();

		switch (value) {
			case "today":
				return [now.pattern("yyyy-MM-dd"), now.pattern("yyyy-MM-dd")];
				break;

			case "thisWeek":
				var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
				var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
				return [weekStartDate.pattern("yyyy-MM-dd"), weekEndDate.pattern("yyyy-MM-dd")];
				break;

			case "thisMonth":
				var monthStartDate = new Date(nowYear, nowMonth, 1);
				var monthEndDate = new Date(nowYear, nowMonth, jbsframe.getMonthDays(nowYear, nowMonth));
				return [monthStartDate.pattern("yyyy-MM-dd"), monthEndDate.pattern("yyyy-MM-dd")];
				break;

			case "thisYear":
				var yearStartDate = new Date(nowYear, 0);
				var yearEndDate = new Date(nowYear, 11, jbsframe.getMonthDays(nowYear, 11));
				return [yearStartDate.pattern("yyyy-MM-dd"), yearEndDate.pattern("yyyy-MM-dd")];
				break;

			case "yesterday":
				var yesterdayStartDate = GetDateStr(-1);
				var yesterdayEndDate = GetDateStr(-1);
				return [yesterdayStartDate, yesterdayEndDate];
				break;

			case "lastWeek":
				var lastWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1 - 7);
				var lastWeekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek - 7));
				return [lastWeekStartDate.pattern("yyyy-MM-dd"), lastWeekEndDate.pattern("yyyy-MM-dd")];
				break;

			case "lastMonth":
				var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
				var lastMonthEndDate = new Date(nowYear, lastMonth, jbsframe.getMonthDays(nowYear, lastMonth));
				return [lastMonthStartDate.pattern("yyyy-MM-dd"), lastMonthEndDate.pattern("yyyy-MM-dd")];
				break;

			case "lastYear":
				var lastYearStartDate = new Date(lastYear, 0);
				var lastYearEndDate = new Date(lastYear, 11);
				return [lastYearStartDate.pattern("yyyy-MM-dd"), lastYearEndDate.pattern("yyyy-MM-dd")];
				break;

			case "all":
				return ["", ""];
				break;
		}
	};

	/**
  * 获得该月的天数
  * @param year年份
  * @param month月份
  * */
	this.getMonthDays = function (nowYear, myMonth) {
		var monthStartDate = new Date(nowYear, myMonth, 1);
		var monthEndDate = new Date(nowYear, myMonth + 1, 1);
		var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
		return days;
	};

	/**
 * 所有含有datetimepicker元素生成时间控件
 *
  */
	this.renderDatetimepicker = function () {
		$(".datetime-text").each(function (index, element) {
			var $element = $(element);
			var _format = 'YYYY-MM-DD HH:mm:ss';
			if ($element.hasClass("notime")) {
				_format = 'YYYY-MM-DD';
				$element.text(jbsframe.formatDate(new Date($element.text()).getTime()));
			} else if ($element.hasClass("nodate")) {
				_format = 'YYYY-MM';
				$element.text(jbsframe.formatDate(new Date($element.text()).getTime()));
			} else {
				$element.text(jbsframe.formatDateTime(new Date($element.text()).getTime()));
			}
		});

		$(".datetimepicker").each(function (index, element) {

			var $element = $(element);
			var $orgElement = $element;
			//$element.attr("readonly",false);
			//默认值
			var _defaultDate = false;
			//范围控制
			var _form = $element.data("datetimeRangeForm");
			var _to = $element.data("datetimeRangeTo");

			var _format = 'YYYY-MM-DD HH:mm:ss';
			if ($element.hasClass("notime")) {
				_format = 'YYYY-MM-DD';
			}
			if ($element.hasClass("nodate")) {
				_format = 'YYYY-MM';
			}
			if ($element.hasClass("onlytime")) {
				_format = 'HH:mm:ss';
			}

			if ($element.closest(".filter-box").length > 0) {
				$element.css("width", 120);
			}

			//如果有日历按钮
			if ($element.siblings(".input-group-addon").length > 0) {
				$element = $element.parent(".input-group");
				if ($element.find(".far.fa-calendar-alt").parent("a.ui-link-icon").length == 0) {
					$element.find(".far.fa-calendar-alt").wrap("<a href='javascript:void(0)' class='ui-link-icon'></a>");
				}
			}

			/* $(element).daterangepicker({
        locale: 'zh-cn',
        format: _format,//日期的格式
    }, function(start, end, label) {
      });*/

			$element.datetimepicker({
				locale: 'zh-cn',
				format: _format, //日期的格式
				showClose: false,
				defaultDate: _defaultDate,
				widgetParent: "body",
				icons: {
					time: 'fa fa-clock',
					date: 'fal fa-calendar-alt',
					up: 'fa fa-chevron-up',
					down: 'fa fa-chevron-down',
					previous: 'fa fa-chevron-left',
					next: 'fa fa-chevron-right',
					today: 'glyphicon glyphicon-screenshot',
					clear: 'far fa-trash-alt',
					close: 'fa fa-remove'
				},
				tooltips: {
					today: '今天',
					clear: '清除选择',
					close: '关闭',
					selectMonth: '选择月份',
					prevMonth: '上个月',
					nextMonth: '下个月',
					selectYear: '选择年份',
					prevYear: '上一年',
					nextYear: '下一年',
					selectDecade: 'Select Decade',
					prevDecade: 'Previous Decade',
					nextDecade: 'Next Decade',
					prevCentury: 'Previous Century',
					nextCentury: 'Next Century',
					pickHour: '选择小时',
					incrementHour: '增加一小时',
					decrementHour: '减少一小时',
					pickMinute: '选择分钟',
					incrementMinute: '增加一分钟',
					decrementMinute: '减少一分钟',
					pickSecond: '选择秒',
					incrementSecond: '增加一秒',
					decrementSecond: '减少一秒',
					togglePeriod: 'Toggle Period',
					selectTime: '选择时间'
				}
			});

			if ($orgElement.hasClass("today") && $orgElement.val() == "") {
				$orgElement.val(new Date().pattern("yyyy-MM-dd"));
			}
			// $orgElement.attr("readonly",true);


			var dpmindate = $orgElement.data("dpmindate");
			if (dpmindate != NaN && dpmindate != undefined) {
				$element.on("dp.show", function (e) {
					//默认值
					$element.datetimepicker("minDate", GetDateStr(Number(dpmindate)));
				});
			}
			$orgElement.on("dp.change", function (e) {
				//范围控制
				var toElement = $orgElement.data("dprangeto");
				var fromElement = $orgElement.data("dprangefrom");

				if (fromElement != undefined) {
					var $fromElement = $(fromElement);
					//$fromElement.datetimepicker("minDate",$element.val());
					$element.datetimepicker("minDate", $fromElement.val());
				}
			});

			$element.on("dp.show", function (e) {
				var $input = $($(this).find(".datetimepicker"));
				var $toElement, $fromElement;
				if ($input.data("dprangeto")) {
					if ($input.data("dprangeto").indexOf("#") < 0) {
						$toElement = $("[name='" + $input.data("dprangeto") + "']");
					} else {
						$toElement = $($input.data("dprangeto"));
					}
					var $toElementGroup = $toElement.parent(".input-group");
					if ($toElement.val() != "") {
						$(this).datetimepicker("maxDate", $toElement.val());
					}
				}
				if ($input.data("dprangefrom")) {
					if ($input.data("dprangefrom").indexOf("#") < 0) {
						$fromElement = $("[name='" + $input.data("dprangefrom") + "']");
					} else {
						$fromElement = $($input.data("dprangefrom"));
					}
					var $fromElementGroup = $fromElement.parent(".input-group");
					if ($fromElement.val() != "") {
						$(this).datetimepicker("minDate", $fromElement.val());
					}
				}
			});
		});
	};

	//钱币控制
	// 保留小数点后两位，小数点前每三位数字之前增加逗号分隔
	this.renderMoneyMask = function () {
		$(".mask-money").each(function (index, element) {
			jbsframe.formatMoney(element);
		});
		//$(element).val($(element).val().replace(/[\-\d]|[\-\d\.\d]/g,''));
	};
	this.formatMoney = function (element) {
		//$(element).mask('000,000,000.00', {reverse: false});
		/*$(element).inputmask({
   alias: "currency"
   });*/

		var d = $(element).attr("decimal");
		if (d != undefined) {
			if ($(element).val() == "") {
				var ph = "0.";
				for (var i = 0; i < d; i++) {
					ph += "0";
				}
				$(element).attr("placeholder", ph);
			}
		}
		$(element).inputmask({
			'alias': 'numeric',
			'groupSeparator': ',',
			'autoGroup': true,
			'digits': d == undefined ? 2 : d,
			'digitsOptional': false,
			'prefix': '',
			'placeholder': '0'
		});
		//if($(element).hasClass("mask-money-special")){
		$(element).change(function (e) {
			var value = this.value;
			value = value.replace("-", "");
			var v1 = value.split(".")[0];
			var v2 = value.split(".")[1];
			value = v1.split(",");
			var nvalue = 0;
			for (var i = 0; i < value.length; i++) {
				nvalue = nvalue + value[i];
			}
			if (nvalue.length > 4) {
				//nvalue = nvalue.substr(-4)
			}
			this.value = nvalue + "." + v2;
		});
		//}
	};

	//数字控制
	this.renderNumberMask = function () {
		//$(".mask-number").inputmask("decimal", {groupSeparator:"",autoGroup: true});
		$(".mask-number").each(function (index, element) {
			jbsframe.formatNumber(element);
		});
	};
	this.formatNumber = function (element) {
		var d = $(element).attr("decimal");
		var s = $(element).attr("sign");
		var front = $(element).attr("front") || "";
		if (s == "true") {
			front = "-";
		}
		$(element).inputmask({
			'alias': 'numeric',
			'groupSeparator': '',
			'autoGroup': true,
			'digits': d == undefined ? 0 : d,
			'digitsOptional': false,
			'prefix': '',
			'placeholder': '0',
			//integerDigits:"+",
			negationSymbol: {
				front: front,
				back: ""
			}
		});
	};
	/**
  *小数点保留2位
  * @param value
  * @param num   保留的位数
  * @returns {*}
  */
	this.formatDigits = function (value, num) {
		if (value == null) {
			return "";
		}
		if (value == "") {
			return "";
		}
		if (value == "null") {
			return "";
		}
		var re = /\d{1,3}(?=(\d{3})+$)/g;
		if (num == 0 || num == undefined) {
			value = Number(value).toFixed(0);
		} else {
			value = Number(value).toFixed(Math.abs(num));
		}

		//value = String(value).replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
		return value;
	};

	/**
  * 格式化金额,千分位，2位小数
  * @param value
  */
	this.formatTableMoney = function (value, num) {

		if (num == undefined) {
			num = 2;
		}
		var val = Number(value).toFixed(num);
		var re = /\d{1,3}(?=(\d{3})+$)/g;

		var source = String(val).split(".");
		source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
		/*val=String(val).replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){ return s1.replace(re,"$&,")+s2;}});*/
		return source.join(".");
	};

	/**
  * 格式化金额,千分位，3位小数
  * @param value
  */
	this.formatTableNumber = function (value) {
		var val = value.toFixed(3);
		return val;
	};

	//数字类型的编号
	this.renderNumberCode = function () {
		$(".mask-numberCode").each(function (index, element) {
			$(element).inputmask({
				'alias': 'numeric',
				'groupSeparator': '',
				'autoGroup': false,
				'digits': false,
				'digitsOptional': false,
				'prefix': '',
				'placeholder': '',
				decimalProtect: false,
				negationSymbol: {
					front: " "
				}
			});
			$(element).change(function (e) {
				var value = this.value;
				this.value = value.replace("-", "");
			});
		});
	};

	//系统提示框
	this.alert = function (msg, callback_confirm) {
		$("#growls .growl-default").remove();
		$.growl({ message: msg, location: "br", size: "large", style: "default",
			delayOnHover: true, fixed: false });

		//确定事件
		function onConfirm() {
			if (callback_confirm) {
				callback_confirm();
			}
		}
	};
	this.alertError = function (msg) {
		$("#growls .growl-error").remove();
		$.growl({ message: msg, location: "br", size: "large", style: "error",
			delayOnHover: true, fixed: false });
	};

	//右下角消息提示
	/*this.notificationMsg = function(title,msg,callback,callback_cancel){
 	var notification = $.notify({
 		title: title,
 		message:msg,
 		//icon:"<img src='"+systemPath+"images/point.png'/>",
 		icon:"<i class='fa fa-envelope-o'></i>",
 		//yes: "<i class='fa fa-check-circle'></i> 确定",
 		yes: "<i class='fa fa-angle-right'></i> 前往查看"
 		//,no:"<i class='fa fa-minus-circle rotate45'></i> 取消"
 	}, {
 		style: 'notification2',//callback_cancel==null? 'notification2' : 'notification',
 		autoHide: true,
 		autoHideDelay: 10000,
 		clickToHide: false,
 		gap:20
 	});
 
 	//右下角通知关闭
 	$(".notifyjs-notification-base, .notifyjs-notification2-base").each(function(index,elem){
 		$(elem).find(".no").on("click",function(){
 			$(this).trigger('notify-hide');
 			setTimeout(function(){
 				if(callback_cancel){callback_cancel(notification);}
 			},800)
 		});
 	});
 	//右下角通知关闭
 	$(window).keydown(function(e){
 		if(e.keyCode == 27){	//键盘ESC
 			$(".notifyjs-notification-base .close").trigger('notify-hide');
 			$(".notifyjs-notification2-base .close").trigger('notify-hide');
 		}
 	});
 	$(".notifyjs-notification-base, .notifyjs-notification2-base").each(function(index,elem) {
 		$(elem).find(".close").on("click", function () {
 			$(this).trigger('notify-hide');
 		});
 	});
 	//右下角通知确定
 	$(".notifyjs-notification-base, .notifyjs-notification2-base").each(function(index,elem) {
 		$(elem).find(".yes").on("click", function () {
 			$(this).trigger('notify-hide');
 			setTimeout(function() {
 				if (callback) {callback(notification);}
 			},800);
 		});
 	});
 }*/

	//系统确认框
	this.confirm = function (title, message, callback_confirm) {
		$("#container-modal").next(".modal-backdrop").remove();
		$("#container-modal").remove();
		$("body").append('<div id="container-modal"></div>');

		//ReactDOM.render(<Modal title={title} confirm="确定" cancel="取消" onConfirm={onConfirm}>{message}</Modal>,document.getElementById("container-modal"));

		ReactDOM.render(React.createElement(Modal, {
			title: title,
			message: message,
			confirm: "确定",
			cancel: "取消",
			onConfirm: callback_confirm
		}), document.getElementById("container-modal"));
	};
	//系统确认框
	this.confirm3 = function (message, confirmBtn1, confirmBtn2, cancelBtn, callback1, callback2, callback_cancel) {
		$("#container-modal").remove();
		$("body").append('<div id="container-modal"></div>');

		//ReactDOM.render(<Modal multipleBtn={true} title={null} confirm1={confirmBtn1} confirm2={confirmBtn2} cancel={cancelBtn} onConfirm1={onConfirm1} onConfirm2={onConfirm2}>{message}</Modal>,document.getElementById("container-modal"));

		ReactDOM.render(React.createElement(Modal, { multipleBtn: true, title: null, confirm1: confirmBtn1, confirm2: confirmBtn2, cancel: cancelBtn, onConfirm1: onConfirm1, onConfirm2: onConfirm2 }, message), document.getElementById("container-modal"));

		//确定事件
		function onConfirm1() {
			if (callback1) {
				callback1();
			}
		}
		function onConfirm2() {
			if (callback2) {
				callback2();
			}
		}
	};

	//系统自定义内容确认框
	this.confirmMessage = function (title, message, confirmBtn, cancelBtn, callback_confirm, callback_cancel) {
		$("#container-modal").remove();
		$("body").append('<div id="container-modal"></div>');

		var html = null;
		html = $(message);

		//ReactDOM.render(<Modal title={title} confirm={confirmBtn} cancel={cancelBtn} onConfirm={onConfirm} onCancel={onCancel}>{message}</Modal>,document.getElementById("container-modal"));

		ReactDOM.render(React.createElement(Modal, { title: title, confirm: confirmBtn, cancel: cancelBtn, onConfirm: onConfirm, onCancel: onCancel }, html), document.getElementById("container-modal"));

		//确定事件
		function onConfirm() {
			if (callback_confirm) {
				callback_confirm();
			}
		}
		function onCancel() {
			if (callback_cancel) {
				callback_cancel();
			}
		}
	};

	//通知窗，带确定按钮，可回调
	this.notification = function (message, callback) {
		$("#container-modal").next(".modal-backdrop").remove();
		$("#container-modal").remove();

		$("body").append('<div id="container-modal"></div>');

		ReactDOM.render(React.createElement(Modal, {
			title: null,
			message: message,
			confirm: "确定",
			onConfirm: callback
		}), document.getElementById("container-modal"));
	};

	/**
 * 选择带有树型窗体
  * @param config
  * @param callback
  */
	this.selectTreeWindow = function (config, callback) {
		$("#container-modal-selectTreeWindow").next(".modal-backdrop").remove();
		$("#container-modal-selectTreeWindow").remove();

		$("body").append('<div id="container-modal-selectTreeWindow"></div>');

		ReactDOM.render(React.createElement(ComponentTreeWin, {
			title: config.title,
			url: config.url,
			data: config.data,
			onConfirm: callback
		}), document.getElementById("container-modal-selectTreeWindow"));
	};

	/**
  * 选择窗体
  * @param config	配置参数
  * @param callback	回调
  */
	this.selectWindow = function (config, callback) {
		$("#container-modal-selectWindow").next(".modal-backdrop").remove();
		$("#container-modal-selectWindow").remove();

		$("body").append('<div id="container-modal-selectWindow"></div>');

		ReactDOM.render(React.createElement(ComponentSelectWin, {
			title: config.title,
			url: config.url,
			data: config.data,
			listHead: config.listHead, //列表表头
			filterFieldName: config.filterFieldName, //过滤查找需要的字段名
			getDataFieldName: config.getDataFieldName, //设置确定或双击后的名字
			onConfirm: callback
		}), document.getElementById("container-modal-selectWindow"));
	};

	/**
  * 带有iframe的窗体
  * @param config
  * @param callback
  */
	this.iframeWindow = function (config, callback) {
		$("#iframe-modal").next(".modal-backdrop").remove();
		$("#iframe-modal").remove();

		$("body").append('<div id="iframe-modal"></div>');

		return ReactDOM.render(React.createElement(ComponentIframeWin, {
			title: config.title,
			style: config.style || "fullscrean",
			multipleBtn: config.multipleBtn,
			url: config.url,
			cancel: config.cancel,
			onClose: callback
		}), document.getElementById("iframe-modal"));
	};

	this.reviewInfoWindow = function (modelKey, id) {
		this.iframeWindow({
			url: "/review/reviewInfo/" + modelKey + "/" + id,
			title: "复核情况",
			style: { width: 1000, height: 500 }
		});
	};

	/**
  * 杂费单价弹出窗
  * @param config
  * @param callback
  */
	this.showCostPriceWindow = function (config, callback) {
		$("#container-modal-costPriceWindow").next(".modal-backdrop").remove();
		$("#container-modal-costPriceWindow").remove();

		$("body").append('<div id="container-modal-costPriceWindow"></div>');

		return ReactDOM.render(React.createElement(ComponentCostPriceWin, {
			url: config.url,
			data: config.data,
			listHead: config.listHead, //列表表头
			loadFinish: config.loadFinish,
			onConfirm: callback
		}), document.getElementById("container-modal-costPriceWindow"));
	};

	/**
 * 填充杂费单价的数据
  * @param data
  */
	this.setCostPriceData = function (data) {
		var total = 0;
		var objectStr = JSON.parse(data);

		for (var i in objectStr) {
			var _name = i;
			var _value = objectStr[i];
			var $elem = $("#container-modal-costPriceWindow #cp-form input[name='" + _name + "']");
			$elem.removeClass("notnull");
			$elem.val(_value);

			if ($elem.hasClass("ui-checkbox")) {
				$elem.prop("checked", _value);
			}

			//获取单价合计
			if (_name.split("-")[2] && _name.split("-")[2] == "price") {
				total = total + Number(_value);
			}
		}
		$("#container-modal-costPriceWindow .costprice-total-value").html(total);
	};

	/**
  * ajax请求
  * @param config
  * @param callback
  * @param errCallback
  */
	this.ajaxRequest = function (config, callback, errCallback) {
		var csrf_header = $("meta[name='_csrf_header']").attr("content");
		var csrf = $("meta[name='_csrf']").attr("content");
		var cfg = $.extend({
			url: config.url,
			method: config.method == undefined ? 'post' : config.method,
			param: config.data,
			dataType: config.dataType == undefined ? 'json' : config.dataType,
			async: config.async == undefined ? true : config.async,
			contentType: config.contentType == undefined ? 'application/x-www-form-urlencoded; charset=UTF-8' : config.contentType

		}, config);

		$.ajax({
			url: cfg.url,
			type: cfg.method,
			data: cfg.param,
			global: false, //不触发全局ajax事件
			dataType: cfg.dataType,
			async: cfg.async,
			contentType: cfg.contentType,
			beforeSend: function beforeSend(xhr) {
				if (csrf_header != undefined) {
					xhr.setRequestHeader(csrf_header, csrf);
				}
			},
			success: function success(msg, str, response) {

				//增加对返回消息的处理
				if (response.statusText == "OK" || response.statusText == "success") {

					var result;
					if (cfg.dataType.toLowerCase() == "html") {
						callback(msg);
						return false;
					}
					var result = eval("(" + response.responseText + ")");
					if (str == "success") {

						if (result.success == undefined) {
							callback(result);
							return;
						}

						if (result.success == true || result.success == "true") {
							if (callback) {
								callback(result.data, result.msg);
							}
						} else {
							if (errCallback) {
								errCallback(result.data, result.msg);
							} else {
								if ((typeof esteel_main === 'undefined' ? 'undefined' : _typeof(esteel_main)) == "object") {
									//alertError(result.msg);
								}
								alertError(result.msg);
							}
						}
					} else {
						if (errCallback) {
							errCallback(result.data, result.msg);
						} else {
							if ((typeof esteel_main === 'undefined' ? 'undefined' : _typeof(esteel_main)) == "object") {
								//alertError(result.msg);
							}
						}
					}
				} else {
					if ((typeof esteel_main === 'undefined' ? 'undefined' : _typeof(esteel_main)) == "object") {
						//alertError(result.msg);
					}
				}
			},
			error: function error(XMLHttpRequest, textStatus, errorThrown) {
				//console.log(XMLHttpRequest, textStatus, errorThrown)
				alertError(textStatus);
			}
		});
	};

	//元素block
	/**
 *
  * @param elementId
  * @param opts		{message,bgColor,opacity,cursor}
  * @param onOverlayClick
  */
	this.blockElement = function (elementId, opt, onOverlayClick) {
		var $elem;
		if (elementId == "body") {
			$elem = $("body");
		} else if (elementId == window) {
			$elem = $(window);
		} else {
			$elem = $(elementId);
		}
		var opt = opt || {};
		$elem.block({
			onOverlayClick: true,
			message: '' + (opt.message == undefined ? "" : opt.message) + '',
			css: {
				border: 'none',
				backgroundColor: 'transparent',
				color: '#4B4C4D'
			},
			overlayCSS: {
				backgroundColor: opt.bgColor == null ? "#fff" : opt.bgColor,
				opacity: opt.opacity ? opt.opacity : 1,
				cursor: opt.cursor ? opt.cursor : "not-allowed",
				zIndex: 999
			}
		});
	};
	this.unblockElement = function (elementId) {
		$(elementId).unblock();
	};

	/**
  * 字符截断
  * @param str	字符串
  * @param len	截取长度
  * @param omission 截取后显示的内容
  * @returns {*}
  */
	this.stringCutOff = function (str, len, omission) {
		if (len > 0) {
			str = str == null ? "" : str;
			var sub_length = len;
			var temp1 = str.replace(/[^\x00-\xff]/g, "**"); //精髓
			var temp2 = temp1.substring(0, sub_length);
			//找出有多少个*
			var x_length = temp2.split("\*").length - 1;
			//var hanzi_num = x_length /2 ;
			//sub_length = sub_length - hanzi_num ;//实际需要sub的长度是总长度-汉字长度
			var res = str.substring(0, sub_length);
			var end = "";
			if (sub_length < str.length) {
				if (omission != undefined && omission == true) {
					end = res + "……";
				} else {
					end = res;
				}
			} else {
				end = res;
			}
			return "<span title='" + str + "'>" + end + "</span>";
		} else {
			return str;
		}
	};

	/**
  * 表单验证
  * @param formId
  * @param callback
  * @param callbackBefore	//提交前
  */
	//this.formValidate = function( formId,callback,callbackBefore) {
	this.formValidate = function (formId, callback) {
		var _rules = {}; //验证规则
		var $form = $(formId);
		$form.find("[data-validetta]").each(function (index, element) {
			var name = $(element).attr("name"); //表单项name
			_rules[name] = {}; //
			var validetta = $(element).data("validetta").split(","); //获取所有验证内容
			if (validetta.length > 0) {
				for (var valid in validetta) {
					if (validetta[valid].indexOf(":") > 0) {
						var key = validetta[valid].split(":")[0];
						var val = validetta[valid].split(":")[1];
						_rules[name][key] = val;
						if (key == "maxlength") {
							//设置元素最大字符提示
							jbsframe.setMaxlengthTip(element, val);
						}
						if (key == "max" || key == "min") {
							_rules[name][key] = Number(val);
						}
					} else {
						_rules[name][validetta[valid]] = true;
						if (valid == "maxlength") {
							//设置元素最大字符提示
							jbsframe.setMaxlengthTip(element, val);
						}
						if (key == "max" || key == "min") {
							_rules[name][key] = Number(val);
						}
					}
				}
			} else {
				_rules[name] = validetta[valid];
			}
		});

		$form.validate({
			ignore: "",
			debug: true,
			rules: _rules, //验证规则
			submitHandler: function submitHandler(form) {
				//表单提交句柄,为一回调函数，带一个参数：form
				var submitBefore = false;

				if ((typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) == "object") {

					//提交前
					if (callback.submitBefore) {
						submitBefore = callback.submitBefore($(form).serialize());
					}
					//提交前回调执行为true
					if (submitBefore) {
						if (callback.submit) {
							jbsframe.confirm(null, "是否提交当前表单?", function () {
								callback.submit($(form).serialize()); //提交表单
							});
						}
					}
				} else {
					jbsframe.confirm(null, "是否提交当前表单?", function () {
						callback($(form).serialize()); //提交表单
					});
				}
			},
			errorPlacement: function errorPlacement(error, element) {
				//console.log(error, element)
				/*if (element.is(":radio")){
    	error.appendTo(element.parent().next().next());
    }
    else */if (element.is(":checkbox")) {
					error.appendTo(element.next());
				} else if ($(element).parent(".input-group").length > 0) {
					$(element).parent(".input-group").after(error);
				} else if ($(element).parents(".form-inline").length > 0) {
					$(element).parent(".form-group").find("label.error").remove();
					$(element).parent(".form-group").append("<label class='error'>" + error[0].innerHTML + "</label>");
				} else {
					error.appendTo(element.parent());
				}
			},
			// 验证成功后调用的方法
			success: function success(label) {
				$(label).remove();
			}
		});
	};

	/**
  * 设置验证错误提示
 * 	jbsframe.setValidateError("#adsfa","adfaa")
 * 	jbsframe.removeValidateError("#asdfasdf")
  */
	this.setValidateError = function (elementId, msg) {
		var element = $(elementId);
		this.removeValidateError(element);
		element.addClass("error");
		var error = $("<label class='error'>" + msg + "</label>");
		if (element.is(":radio")) {
			error.appendTo(element.parent().next().next());
		} else if (element.is(":checkbox")) {
			error.appendTo(element.next());
		} else if ($(element).parent(".input-group").length > 0) {
			$(element).parent(".input-group").after(error);
		} else if ($(element).parents(".form-inline").length > 0) {
			$(element).parent(".form-group").find("label.error").remove();
			$(element).parent(".form-group").append("<label class='error'>" + error[0].innerHTML + "</label>");
		} else {
			error.appendTo(element.parent());
		}
	};
	this.removeValidateError = function (elementId) {
		var element = $(elementId);
		element.removeClass("error");
		if (element.is(":radio")) {
			element.parent().next().next()("error.label").remove();
		} else if (element.is(":checkbox")) {
			element.next("error.label").remove();
		} else if ($(element).parent(".input-group").length > 0) {
			$(element).parent(".input-group").siblings("error.label").remove();
		} else if ($(element).parents(".form-inline").length > 0) {
			$(element).parent(".form-group").find("label.error").remove();
		} else {
			element.siblings("label.error").remove();
		}
	};

	/**
  * 禁用表单内所有表单项
  * @param formId
  */
	this.setFormView = function (formId) {
		var $form = $(formId);
		if ($form.hasClass("form-horizontal")) {
			$form.addClass("form-view");
		} else if ($form.parent().hasClass("form-horizontal")) {
			$form.parent().addClass("form-view");
		} else {
			$form.find(".form-horizontal").addClass("form-view");
		}
		$form.find("input,select,textarea").attr("disabled", true);
		$form.find("input").each(function (index, input) {
			if ($(input).attr("type") == "checkbox" || $(input).attr("type") == "radio") {
				$(input).attr("onclick", "return false;");
			}
		});
		$form.find("button,a.ui-btn").attr("disabled", true);
		$form.find("button").each(function (index, elem) {
			if ($(elem).data("modal") == "fwin") {
				$(elem).removeAttr("disabled");
			}
		});
	};

	/**
  * 动态添加下拉框的选项
  * @param selectId
  * @param property = { text,value}
  * @param opts
  */
	this.addSelectOptions = function (selectId, property, opts) {
		var $elem = $("#" + selectId);
		var $input = $elem.find("input.form-control");
		if ($elem.hasClass("input-group")) {
			//可输入的select
			var $dropmenu = $elem.find(".dropdown-menu");
			$dropmenu.find("li").remove();
			if (property == null) {
				for (var i = 0; i < opts.length; i++) {
					var $opt = $("<li><a></a></li>");
					$opt.find("a").html(opts[i]);
					$opt.find("a").attr("value", opts[i]);
					$dropmenu.append($opt);
				}
			} else {
				for (var i = 0; i < opts.length; i++) {
					var $opt = $("<li><a></a></li>");
					$opt.find("a").html(opts[i][property.text]);
					$opt.find("a").attr("value", opts[i][property.value]);
					$dropmenu.append($opt);
				}
			}
			$dropmenu.find("li>a").click(function () {
				$input.val($(this).attr("value"));
				$input.trigger("change");
			});
		} else {
			if (property == null) {
				//普通select
				$("#" + selectId).children("option").remove();
				$("#" + selectId).append("<option></option>");
				for (var i = 0; i < opts.length; i++) {
					var $opt = $("<option></option>").text(opts[i]);
					$opt.attr("value", opts[i]);
					$("#" + selectId).append($opt);
				}
			} else {
				//普通select
				$("#" + selectId).children("option").remove();
				$("#" + selectId).append("<option></option>");
				for (var i = 0; i < opts.length; i++) {
					var $opt = $("<option></option>").text(opts[i][property.text]);
					$opt.attr("value", opts[i][property.value]);
					$("#" + selectId).append($opt);
				}
			}
		}
	};

	/**
  * 设置步骤容器
  * @param stepPanleId
  * @param callback
  */
	this.setStepPanel = function (stepPanleId, opts) {
		var $panel = $(stepPanleId);
		//步骤容器
		$panel.bootstrapWizard({
			onTabClick: function onTabClick(tab, navigation, index) {
				return false;
			},
			onPrevious: function onPrevious(tab, navigation, index) {
				if ($(tab).hasClass("done")) {
					$(tab).removeClass("done");
				}
				if (opts.onPrev) {
					return opts.onPrev(tab, navigation, index);
				}
			},
			onNext: function onNext(tab, navigation, index) {
				if (opts.onNext) {
					return opts.onNext(tab, navigation, index);
				}
			},
			onTabShow: function onTabShow(tab, navigation, index) {
				if (index > 0) {
					$(tab).prev().addClass("done");
				} else {
					$(tab).removeClass("done");
				}
				if (opts.onStepShow) {
					return opts.onStepShow(tab, navigation, index);
				}
			}
		});
		$panel.children(".pager.wizard").find(".finish").click(function () {
			if (opts.finish) {
				opts.finish();
			}
		});
	};

	/**
  * 绑定所有表格的过滤搜索和重置
  */
	this.bindTableFilterSearch = function () {
		$(".filter-box button[type=reset]").prepend("<i class='far fa-undo'></i> ");
		$(".filter-box button[type=reset]").click(function () {
			$(this).parents(".filter-box").find("input,select").each(function (index, elem) {
				if (!$(elem).hasClass("switch-datetimepicker") && !$(elem).hasClass("switch-datetimepicker-start") && !$(elem).hasClass("switch-datetimepicker-end")) {
					$(elem).val("");
				} else {
					if ($(elem).hasClass("switch-datetimepicker")) {
						var defaultDate = $(elem).data("default");
						$(elem).find("option[value='" + defaultDate + "']").attr("selected", true);
						$(elem).val(defaultDate);
						$(elem).change();
					}
				}
			});

			$(this).siblings(".btn-filter").click();
		});
		$(".filter-box button.btn-filter").click(function () {
			if (typeof search_table != "undefined") {
				search_table();
			}
		});
		$(".filter-box .input-default").keydown(function (e) {
			if (e.keyCode == 13) {
				$(this).closest(".filter-box").find(".btn-filter").click();
			}
		});
	};

	/**
 *绑定所有表单的重置,设置一些特殊情况
  */
	this.bindFormReset = function () {
		$("form").find("input[type=hidden]").each(function (idx, hiddenInput) {
			console.log();
			hiddenInput.type = "text";
			hiddenInput.style.display = "none";
			hiddenInput.className = "hidden";
		});

		//清空所有输入框组内隐藏项的值
		// $form.find("input[type=hidden]").val("");
		//$form.find("input[type=hidden]").attr("type","text").hide();
		//var $hiddenInput = $form.find("input[type=hidden]");
		/* var $siblingsInput = $("#"+$hiddenInput.attr("id").split("-id")[0]+"-text");
   if($siblingsInput[0].value == ""){
       $hiddenInput.val("");
  }*/

		$(".filter-box").find("button[type=reset]").click(function () {
			$(".switch-datetimepicker").each(function (index, select) {
				var $select = $(select); //下拉框
				var defaultValue = $select.data("default");
				if (defaultValue) {
					$select.find("option[value='" + defaultValue + "']").attr("selected", true);
				} else {
					$select.find("option:first-child").attr("selected", true);
					$select.val("all");
				}
			});
		});
	};

	/**
  * 为所有checkbox，radio添加样式
  */
	this.updateCheckboxRadioStyle = function () {
		if ($.browser.mozilla) {
			//$("input[type=checkbox]").addClass("ui-checkbox").addClass("checkbox-blue");
			// $("input[type=radio]").addClass("ui-radio").addClass("radio-blue");
			$("input[type=radio]").each(function (index, rad) {
				if ($(rad).parent(".hack-ui-radio").length == 0) {
					$(rad).parent(".hack-ui-radio").remove();
					$(rad).wrap("<label class='hack-ui-radio'></label>");
					$(rad).next(".hack-effect").remove();
					$(rad).after("<span class='hack-effect'></span>");
				}
			});
			$("input[type=checkbox]").each(function (index, ckb) {
				if ($(ckb).parent(".hack-ui-checkbox").length == 0) {
					if ($(ckb).attr("checked") == true || $(ckb).attr("checked") == "checked") {
						$(ckb).prop("checked", true);
					}
					$(ckb).attr("autocomplate", "off");
					$(ckb).parent(".hack-ui-checkbox").remove();
					$(ckb).wrap("<label class='hack-ui-checkbox'></label>");
					$(ckb).next(".hack-effect").remove();
					$(ckb).after("<span class='hack-effect'></span>");
				}
			});
		} else {
			$("input[type=checkbox]").each(function (index, ckb) {
				if ($(ckb).attr("checked") == true || $(ckb).attr("checked") == "checked") {
					$(ckb).prop("checked", true); //click();
				}
			});
			$("input[type=checkbox]").addClass("ui-checkbox").addClass("checkbox-blue");
			$("input[type=radio]").addClass("ui-radio").addClass("radio-blue");
		}
	};

	/**
 * 设置全屏展示
  */
	this.toggleFullScreen = function () {
		var a = $(window).height() - 10;

		if (!document.fullscreenElement && // alternative standard method
		!document.mozFullScreenElement && !document.webkitFullscreenElement) {
			// current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	};

	/**
  * 设置元素最大字符提示
  * @param element
  */
	this.setMaxlengthTip = function (element, val) {
		$(element).attr("maxlength", val);
		$(element).maxlength({
			alwaysShow: false
		});
	};

	/**
 * 保存本地数据
  * @param key
  * @param val
  */
	this.save_localStorage = function (key, val) {
		window.localStorage.setItem(key, JSON.stringify(val));
	};

	/**
 * 取本地数据
  * @param key
  * @returns {any}
  */
	this.get_localStorage = function (key) {
		return JSON.parse(window.localStorage.getItem(key));
	};

	/**
 * 删除地数据
  * @param key
  */
	this.remove_localStorage = function (key) {
		window.localStorage.removeItem(key);
	};

	//解决表单内特殊组件的屏蔽问题
	this.blockElementInForm = function () {
		$("select.ui-dropdown[readonly]").each(function (index, select) {
			var $box = $(select).parent("div");
			//{message,bgColor,opacity,cursor}
			jbsframe.blockElement($box, { message: null, bgColor: "transparent" });
		});
	};

	/**
 *	所有输入框带有图标删除功能
  */
	this.renderInputGroupClearIcon = function () {

		$(".input-default").each(function (index, element) {
			var $input = $(element);
			if ($input.parent(".input-group").length > 0) {
				var $siblings = null;
				var $addon = $input.siblings(".input-group-addon");
				if ($addon.find(".fa-search").length > 0 || $addon.find(".fa-calendar-alt").length > 0) {

					if ($input.attr("id") != undefined) {
						$siblings = $("#" + $input.attr("id").split("-text")[0] + "-id");
					}
					var clearId = "clear-" + ($(this).attr("id") ? $(this).attr("id") : $(this).attr("name"));
					var $clear = $("<a id='" + clearId + "' class='input-group-clear far fa-times' href='javascript:void(0)'></a>");

					$clear.css({
						position: "absolute",
						top: "50%",
						marginTop: "-6px",
						right: $input.siblings(".input-group-addon").innerWidth() < 40 ? 40 + 6 : $input.siblings(".input-group-addon").innerWidth() + 12,
						zIndex: 99
					}).hide();
					//$(element).before($clear);

					$input.parent(".input-group").append($clear);

					$clear.click(function () {
						$input.val("");
						if ($siblings != null) {
							$siblings.val("");
						}
						$clear.hide();
					});
					$input.hover(function (e) {
						if ($(this).parents(".form-view").length == 0) {
							if ($(this).val() != "") {
								var pos = $(this).offset();
								//$clear.css("left", $(element).val().length * 14 + 6);
								$clear.show();
							}
						}
						e.stopPropagation();
					}, function (e) {
						if (e.relatedTarget && e.relatedTarget.id == clearId) {
							return false;
						}
						e.stopPropagation();
						$clear.hide();
					});
				}
			}
		});
	};

	/**
 * 生成输入框下拉组件
  */
	this.renderInputDropdown = function () {
		/*$(".input-dropdown").each(function(index,element){
  	var $element = $(element), _ajax={url:"",dataType:"json"};
  	if($element.data("ajax") && $element.data("ajax") !=""){
                _ajax.url = $element.data("ajax");
  	}
            /!*$element.select2({
  		language:"zh",
                _ajax,
  		width:120
            });*!/
  });*/
		$(".dropdown-toggle").each(function () {
			if ($(this).parent().hasClass("input-group-addon")) {
				var $ig_addon = $(this).parent(".input-group-addon");
				var $input = $ig_addon.prev();
				/*  $ig_addon.css("padding",0)
      $input.css({
          borderRight:0
      })*/
			}
		});
	};

	/**
 * 隐藏菜单和页头
  */
	this.hideSidebarTophead = function () {
		$("body").addClass("hide-sidebar");
		$("body").addClass("hide-topheader");
	};

	//渲染所有单位类型的输入框，自动匹配中文并显示
	this.renderAllCorpValue2Text = function () {
		$("input.corpValue2Text").each(function (index, element) {});
	};

	//渲染主页面自定义滚动条
	this.renderAdminPageScroll = function () {
		/*if($(".admin-page > .main").hasClass("index")){
  	return false;
  }*/
		setMainPageHeight();
		function setMainPageHeight() {

			var minHeight = window.innerHeight - $(".topheader").outerHeight() - $(".breadcrumb").outerHeight(); //- $(".footer").outerHeight();
			$("#adminPage-main-tabs .content.tab-pane").css("height", minHeight);
		}
		$(window).resize(function () {
			setMainPageHeight();
			jbsframe.updateAdminPageScroll();
			//$("#adminPage-main-tabs").find(".content.tab-pane").css("height",minHeight);
		});
		/*new SimpleBar($("body")[0],{
  	autoHide: true,
  });*/
		/*jbsframe.scrollbar = $(".admin-page >.main").perfectScrollbar({
  	wheelSpeed: 0.5
  });*/
		if ($("body").hasClass("inner-body")) {
			var minHeight = $("body").height();
			$("body.inner-body >.admin-page").css("height", minHeight);
			jbsframe.scrollbar = $("body.inner-body >.admin-page").perfectScrollbar({
				wheelSpeed: 0.5
			});
		}
	};
	//摧毁主页面自定义滚动条
	this.destroyAdminPageScroll = function () {
		$("body.inner-body >.admin-page").perfectScrollbar("destroy");
	};
	//更新主页面自定义滚动条
	this.updateAdminPageScroll = function () {
		var minHeight = $("body").height();
		$("body.inner-body >.admin-page").css("height", minHeight);
		$("body.inner-body >.admin-page").perfectScrollbar("update");
	};

	/*
 * 控制右侧栏
 * */
	this.renderSidebarRight = function () {
		$(".btn-sidebarRight").click(function () {
			////{message,bgColor,opacity,cursor}
			jbsframe.blockElement($(".admin-page"), { message: null, bgColor: "#000", opacity: 0.7 }, function () {
				jbsframe.unblockElement($(".admin-page"));
				$(".advanceSearchBar-panel").removeClass("show");
			});
			$(".advanceSearchBar-panel").addClass("show");
			$(".advanceSearchBar-panel").siblings(".blockOverlay").click(function () {
				jbsframe.unblockElement($(".admin-page"));
				$(".advanceSearchBar-panel").removeClass("show");
			});
		});
		$(".advanceSearchBar-panel .advanceSearchBar>.form-horizontal").wrap("<form></form>");
		$(".advanceSearchBar-panel").find("button.btn-filter").bind("click", function () {
			jbsframe.unblockElement($(".admin-page"));
			$(".advanceSearchBar-panel").removeClass("show");
		});
		$(".advanceSearchBar-panel").find("button.closeSidebarRight").bind("click", function () {
			jbsframe.unblockElement($(".admin-page"));
			$(".advanceSearchBar-panel").removeClass("show");
		});
	};

	/**
 * 控制模块tab区域的宽度
  */
	this.renderTabContentSize = function () {
		$("#bc-box .bc-tabs-box").css("width", $("#bc-box").width() - $("#bc-box >.bc-tabs-btn").outerWidth());
	};

	/**
 * 打开tab链接
  * @param opt {
  * 		name:"id",
  * 	    title:"标题",
  * 	    type:"类型",
  * 	    url:""
  * 	}
  */
	this.openTab = function (opt, open) {
		if (parent) {
			parent.erp_tabContent.openNewTab(opt, open);
		} else {
			erp_tabContent.openNewTab(opt, open);
		}
	};
	/**
 * 关闭当前选中的tab
  */
	this.closeActiveTab = function () {
		if (parent) {
			parent.erp_tabContent.closeActiveTab();
		} else {
			erp_tabContent.closeActiveTab();
		}
	};

	this.closeTab = function () {};
	/**
 * 刷新tab
  */
	this.refreshTab = function () {};

	//渲染多文件上传组件
	this.renderMultiFileUpload = function () {}
	/*
 var $mfupload = $("#component-multiFileUpload");
    var _url = $mfupload.data("url");
    $mfupload.plupload({
        // 设置
        runtimes : 'html5,html4',
        url : _url,
          // 一次最多添加20个文件
        max_file_count: 20,
          chunk_size: '1mb',
          // Resize images on clientside if we can
        resize : {
            width : 200,
            height : 200,
            quality : 90,
            crop: true // crop to exact dimensions
        },
          filters : {
            // 文件大小限制
            max_file_size : '1000mb',
            // 指定文件类型
            mime_types: [
                {title : "Image files", extensions : "jpg,gif,png"},
                {title : "Zip files", extensions : "zip"}
            ]
        },
          //不允许重命名
        rename: false,
          // 排序
        sortable: false,
          // 允许拖动
        dragdrop: false,
          // 显示模式
        views: {
            list: true,
            thumbs: false, // Show thumbs
            active: 'list'
        },
    });
    */


	/**
 * 多文件上传窗体
  * @param config
  * @param callback
  */
	;this.multiFileUpload = function (config, callback) {
		$("#container-modal-multifileUploadWindow").next(".modal-backdrop").remove();
		$("#container-modal-multifileUploadWindow").remove();

		$("body").append('<div id="container-modal-multifileUploadWindow"></div>');

		ReactDOM.render(React.createElement(ComponentUploadWin, {
			title: "文件上传",
			url: config.url ? config.url : "/base/file/save",
			callback: callback
		}), document.getElementById("container-modal-multifileUploadWindow"));
	};

	/**
 * 构建上传文件后的下载列表
  * @param containerId
  * @param data
  */
	this.renderDownLoadList = function (containerId, data) {
		if ($(containerId).find("ul").length == 0) {
			$(containerId).append("<ul class='list-group'></ul>");
		}
		for (var i in data) {
			var downUrl = "/base/file/" + data[i].id;
			var $hidden = $('<input name="files" type="hidden" value="' + data[i].id + '"/>');
			var $link = $('<a id="' + data[i].id + '" target="_blank" href="' + downUrl + '">' + data[i].name + '</a>');
			var $remove = $('<a onclick="delFile(this)" class="ui-link-icon margin-left-5	text-danger" href="javascript:void(0)" value="' + data[i].id + '" title="删除"><i class="fal fa-times"></i></a>');
			var $list = $("<li class='list-group-item'></li>");
			$list.append($hidden);
			$list.append($link);
			$list.append($remove);
			$(containerId).find("ul").append($list);
		}
	};

	/*---------------------------------------------------------------------------------------------------------------------------*/
	this.getPaddingNumber = function (elem) {
		var paddingTop = 0,
		    paddingRight = 0,
		    paddingDown = 0,
		    paddingLeft = 0;

		paddingTop = Number($(elem).css("paddingTop").replace("px", ""));
		if ($(elem).css("paddingRight") == undefined) {
			paddingRight = paddingTop;
		} else {
			paddingRight = Number($(elem).css("paddingRight").replace("px", ""));
		}
		if ($(elem).css("paddingDown") == undefined) {
			paddingDown = paddingTop;
		} else {
			paddingDown = Number($(elem).css("paddingDown").replace("px", ""));
		}
		if ($(elem).css("paddingLeft") == undefined) {
			paddingLeft = paddingRight;
		} else {
			paddingLeft = Number($(elem).css("paddingLeft").replace("px", ""));
		}
		return [paddingTop, paddingRight, paddingDown, paddingLeft];
	};

	this.getMarginNumber = function (elem) {
		var marginTop = 0,
		    marginRight = 0,
		    marginDown = 0,
		    marginLeft = 0;

		marginTop = Number($(elem).css("marginTop").replace("px", ""));
		if ($(elem).css("paddingRight") == undefined) {
			marginRight = marginTop;
		} else {
			marginRight = Number($(elem).css("marginRight").replace("px", ""));
		}
		if ($(elem).css("paddingDown") == undefined) {
			marginDown = marginTop;
		} else {
			marginDown = Number($(elem).css("marginDown").replace("px", ""));
		}
		if ($(elem).css("paddingLeft") == undefined) {
			marginLeft = marginRight;
		} else {
			marginLeft = Number($(elem).css("marginLeft").replace("px", ""));
		}
		return [marginTop, marginRight, marginDown, marginLeft];
	};

	/*---------------------------------------------------------------------------------------------------------------------------*/

	/**
 * 获取当前浏览器地址中的参数
  */
	this.getUrlPathParameter = function () {
		var url = window.location.href;
		return url.split("/")[url.indexOf("/") + 1];
	};

	/*---------------------------------------------------------------------------------------------------------------------------*/
	/**
 * 设置所有tab链接
  */
	this.initTabpanelSetIframeUrl = function () {
		$('#router-linkNode li>a[data-toggle="tab"]').on('show.bs.tab', function (e) {
			var $tab = $(e.target); //tab标签

			//如果对象为iframe则加载url
			if ($tab.attr("target") == "iframe") {
				var url = $tab.data("url"); //标签上的url
				var $tpanel = $(".tab-pane" + $tab.attr("href")); //tab容器
				var $tpanel_ifrm = null;
				//第一显示tab容器时动态添加iframe
				if ($tpanel.children("iframe").length == 0) {
					$tpanel_ifrm = $("<iframe id='abc' frameborder='0' class='tab-iframe' src='" + url + "'></iframe>").appendTo($tpanel);
				} else {
					$tpanel_ifrm = $tpanel.children("iframe");
				}

				if ($tpanel_ifrm[0].attachEvent) {
					$tpanel_ifrm[0].attachEvent("onload", function () {
						// IE
						$tpanel_ifrm.css("height", $tpanel_ifrm.contents().find("body .admin-page").height());
						$tpanel_ifrm.contents().find("body").addClass("tab-iframe-body");
						//remove block
						jbsframe.unblockElement($tpanel_ifrm.parent());
					});
				} else {
					$tpanel_ifrm[0].onload = function () {
						// 非IE
						$tpanel_ifrm.css("height", $tpanel_ifrm.contents().find("body .admin-page").height());
						$tpanel_ifrm.contents().find("body").addClass("tab-iframe-body");
						//remove block
						jbsframe.unblockElement($tpanel_ifrm.parent());
					};
				}
				//add block
				jbsframe.blockElement($tpanel_ifrm.parent());
				//load
				$tpanel_ifrm.attr("src", url);
			}
		});
	};

	/*---------------------------------------------------------------------------------------------------------------------------*/

	//初始化路由
	this.initRouter = function (callback) {
		/*
  //页面路由，在页面设置
  var offerRoutes = {}
  $("#router-linkNode >a").each(function(idx,elem){
  	var rr = elem.getAttribute("linkNode")
  	offerRoutes[rr] = self.loadRouter
  })
  var router = Router(offerRoutes);
  router.configure({
  	on: self.selectTypeTab    //切换路由后设置高亮标签
  });
  router.init('/'+$("#router-linkNode >a.selected").attr("linkNode"));//初始化页面*/

		if ($("#router-linkNode").length == 0) {
			return false;
		}
		$('#router-linkNode li>a[data-toggle="tab"]').on('show.bs.tab', function (e) {
			var tabId = $(e.target).attr("href");
			var path = $(e.target).attr("linkNode");
			$(tabId).load(path + "", function () {
				if (callback) {
					callback(tabId);
				}
			});
		});
		$('#router-linkNode li>a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			//console.log(e)
		});
	};

	/*this.loadRouter = function(){
 	var path = window.location.hash.slice(2);
 	$("#router-pageCotainer").load('/view/'+path+"", function(){
 		//self.renderFormElement();//渲染表单元素
 	});    //加载静态文件
 }
 
 //切换路由后设置高亮标签
 this.selectTypeTab = function(){
 	var path = window.location.hash.slice(2);
 	$("#router-linkNode >a").removeClass("selected");
 	$("#router-linkNode >a[linkNode='"+path+"']").addClass("selected");
 }*/
}

$.notify.addStyle('notification', {
	html: "<div>" + "<div class='clearfix'>" + "<div class='icon' data-notify-html='icon'><i class='fa fa-hand-o-up'></i></div>" + "<div class='content'>" + "<div class='title' data-notify-html='title'></div>" + "<div class='message' data-notify-html='message'></div>" + "</div>" + "<div class='close'><i class='fa fa-remove'></i></div>" + "</div>" + "<div class='clearfix'>" + "<div class='buttons'>" + "<button class='btn btn-default no' data-notify-html='no'>取消</button>" + "<button class='btn btn-primary yes' data-notify-html='yes'>确定</button>" + "</div>" + "</div>" + "</div>"
});
$.notify.addStyle('notification2', {
	html: "<div>" + "<div class='clearfix'>" + "<div class='icon hidden' data-notify-html='icon'><i class='fa fa-hand-o-up'></i></div>" + "<div class='content'>" + "<div class='title hidden' data-notify-html='title'></div>" + "<div class='message' data-notify-html='message'></div>" + "</div>" + "<div class='close'><i class='fa fa-remove'></i></div>" + "</div>" + "<div class='clearfix'>" + "<div class='buttons'>" +
	//"<button class='btn btn-primary yes' data-notify-html='yes'>确定</button>" +
	"<button class='btn btn-info btn-block yes' data-notify-html='yes'>确定</button>" + "</div>" + "</div>" + "</div>"
});

//打开新窗口页面的处理
function winOpen(url, params) {
	var postForm = $("#hiddenPostForm");
	postForm.empty();
	for (var x in params) {
		postForm.append($("<input>", { type: "hidden", value: params[x], name: x, id: "hiddenPostForm_id_" + x }));
	}
	var _parameter = $("meta[name='_csrf_parameter']").attr("content");
	var _token = $("meta[name='_csrf']").attr("content");

	postForm.append($("<input>", { type: "hidden", value: _token, name: _parameter, id: "hiddenPostForm_id_" + _token }));
	postForm.attr("method", "post");
	postForm.attr("action", url);
	postForm.attr("target", "_blank");
	postForm.submit();
	return;
}

//列表加载动画
function listLoadingIconFormat() {
	return "<img src='" + systemPath + "images/731.gif'/><br/>读取数据中";
}

//千分位显示
function comdify(n) {
	if (n == null) return "";
	n = n.toString();
	var re = /\d{1,3}(?=(\d{3})+$)/g;
	var n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
		return s1.replace(re, "$&,") + s2;
	});
	return n1;
}

//判断是否数字
function isNumber(obj) {
	return obj === +obj;
}

//加载层
var app_loader_page_loader = {
	open: function open() {

		this.close();

		var loading_layer = $('<div class="page-loader-wrapper"><div class="loader"></div></div>');

		var $animate = $('<div class="animate wave">');
		$(".loader", loading_layer).append($animate);
		$animate.append('<div class="w1"></div>');
		$animate.append('<div class="w2"></div>');

		var text = '<p>Esteel后台管理</p>';
		$(".loader", loading_layer).append(text);

		$("body").append(loading_layer);
	},

	close: function close() {
		if ($(".page-preloader").length > 0) {
			$(".page-preloader").animate({ opacity: 0 }, 300, "linear", function () {
				$(this).remove();
			});
		}
	}

	/**
  * floatObj 包含加减乘除四个方法，能确保浮点数运算不丢失精度
  *
  * 我们知道计算机编程语言里浮点数计算会存在精度丢失问题（或称舍入误差），其根本原因是二进制和实现位数限制有些数无法有限表示
  * 以下是十进制小数对应的二进制表示
  *      0.1 >> 0.0001 1001 1001 1001…（1001无限循环）
  *      0.2 >> 0.0011 0011 0011 0011…（0011无限循环）
  * 计算机里每种数据类型的存储是一个有限宽度，比如 JavaScript 使用 64 位存储数字类型，因此超出的会舍去。舍去的部分就是精度丢失的部分。
  *
  * ** method **
  *  add / subtract / multiply /divide
  *
  * ** explame **
  *  0.1 + 0.2 == 0.30000000000000004 （多了 0.00000000000004）
  *  0.2 + 0.4 == 0.6000000000000001  （多了 0.0000000000001）
  *  19.9 * 100 == 1989.9999999999998 （少了 0.0000000000002）
  *
  * floatObj.add(0.1, 0.2) >> 0.3
  * floatObj.multiply(19.9, 100) >> 1990
  *
  */
};var floatObj = function () {

	/*
  * 判断obj是否为一个整数
  */
	function isInteger(obj) {
		return Math.floor(obj) === obj;
	}

	/*
  * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
  * @param floatNum {number} 小数
  * @return {object}
  *   {times:100, num: 314}
  */
	function toInteger(floatNum) {
		var ret = { times: 1, num: 0 };
		var isNegative = floatNum < 0;
		if (isInteger(floatNum)) {
			ret.num = floatNum;
			return ret;
		}
		var strfi = floatNum + '';
		var dotPos = strfi.indexOf('.');
		var len = strfi.substr(dotPos + 1).length;
		var times = Math.pow(10, len);
		var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10);
		ret.times = times;
		if (isNegative) {
			intNum = -intNum;
		}
		ret.num = intNum;
		return ret;
	}

	/*
  * 核心方法，实现加减乘除运算，确保不丢失精度
  * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
  *
  * @param a {number} 运算数1
  * @param b {number} 运算数2
  * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
  * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
  *
  */
	function operation(a, b, digits, op) {
		var o1 = toInteger(a);
		var o2 = toInteger(b);
		var n1 = o1.num;
		var n2 = o2.num;
		var t1 = o1.times;
		var t2 = o2.times;
		var max = t1 > t2 ? t1 : t2;
		var result = null;
		switch (op) {
			case 'add':
				if (t1 === t2) {
					// 两个小数位数相同
					result = n1 + n2;
				} else if (t1 > t2) {
					// o1 小数位 大于 o2
					result = n1 + n2 * (t1 / t2);
				} else {
					// o1 小数位 小于 o2
					result = n1 * (t2 / t1) + n2;
				}
				return result / max;
			case 'subtract':
				if (t1 === t2) {
					result = n1 - n2;
				} else if (t1 > t2) {
					result = n1 - n2 * (t1 / t2);
				} else {
					result = n1 * (t2 / t1) - n2;
				}
				return result / max;
			case 'multiply':
				result = n1 * n2 / (t1 * t2);
				return result;
			case 'divide':
				result = n1 / n2 * (t2 / t1);
				return result;
		}
	}

	// 加减乘除的四个接口
	function add(a, b, digits) {
		return operation(a, b, digits, 'add');
	}
	function subtract(a, b, digits) {
		return operation(a, b, digits, 'subtract');
	}
	function multiply(a, b, digits) {
		return operation(a, b, digits, 'multiply');
	}
	function divide(a, b, digits) {
		return operation(a, b, digits, 'divide');
	}

	// exports
	return {
		add: add,
		subtract: subtract,
		multiply: multiply,
		divide: divide
	};
}();

String.prototype.replaceAll = function (s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
};