/**
 * Created by wzj on 2018/1/19.
 */
$.extend($.validator.messages, {
	required: "必填字段",
	remote: "请修正该字段",
	email: "请输入正确格式的电子邮件",
	url: "请输入合法的网址",
	date: "请输入合法的日期",
	dateISO: "请输入合法的日期 (ISO).",
	number: "请输入合法的数字",
	digits: "只能输入整数",
	creditcard: "请输入合法的信用卡号",
	equalTo: "请再次输入相同的值",
	accept: "请输入拥有合法后缀名的字符串",
    maxlength: $.validator.format("最多可以输入 {0} 个字符"),
    minlength: $.validator.format("最少要输入 {0} 个字符"),
    rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
    range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
    max: $.validator.format("请输入不大于 {0} 的数值"),
    min: $.validator.format("请输入不小于 {0} 的数值")
});

jQuery.validator.addMethod("nochinese", function(value, element, param) {
    var validate = /^[a-zA-Z0-9]/;
    return this.optional(element) || ( validate.test(value));
}, $.validator.format("只能输入英文及数字"));

jQuery.validator.addMethod("positiveInteger", function(value, element, param) {
    var aint = parseInt(value);
    return this.optional(element) || ( aint>0&& (aint+"")==value);
}, $.validator.format("只能输入正整数"));

jQuery.validator.addMethod("min", function( value, element, param ) {
	if(value.indexOf(",")>0){
        value = value.replaceAll(",","");
	}
    return this.optional(element) || value >= param;
},$.validator.format("请输入不小于 {0} 的数值"));
