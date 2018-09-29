"use strict";

/**
 *
 * 顶部链接
 * Created by wzj on 2018/1/5.
 */

function JBSFrame_appBar() {
	JBSFrame.call(this);

	//
	this.initUI = function () {
		//控制登陆用户面板
		this.controlLoginUserPanel();

		//获取当前地址并修改登录，登出链接
		this.setupCurrentLocation();

		//绑定全屏开关
		this.bindFullScreen();

		//启动页面向导
		this.startIntro();
	};

	//控制登陆用户面板
	this.controlLoginUserPanel = function () {
		$('#user-profile .dropdown-toggle').dropdown();
		$("#user-profile .dropdown-toggle").click(function (evt) {
			//显示用户信息
			// $(this).focus();
			//$(this).next(".profile-menu").toggleClass("show");
		});
	};

	//获取当前地址并修改登录，登出链接
	this.setupCurrentLocation = function () {
		var signIn = $("#topbar-sign-link").attr("href");
		var signOut = $("#topbar-signout-link").attr("href");
		$("#topbar-sign-link").attr("href", signIn + window.location.pathname);
		$("#topbar-signout-link").attr("href", signOut + window.location.pathname);
	};

	//绑定全屏开关
	this.bindFullScreen = function () {
		$("#sidebar-fullscreen").click(function () {
			this.toggleFullScreen();
		}.bind(this));
	};

	//启动页面向导
	this.startIntro = function () {
		if ($("body").hasClass("inner-body")) {
			return false;
		}
		//是否不再提示
		if (jbsframe.get_localStorage("notTooltips")) {
			return false;
		}
		/*var pageIntro = introJs();
  pageIntro.setOptions({
      steps: [
          {
              intro: "欢迎使用BRC ERP系统！现在为您做个简单的功能介绍。"
          },
          {element:"#component-sidebar",intro:"这是系统导航菜单，功能模块的入口"},
          {element:"#topheader",intro:"这是工具条，包含导航菜单的隐藏按钮，系统全屏展示按钮，以及用户信息"},
          //{element:document.querySelectorAll('#sidebar-toggle')[0],intro:"开关"},
          {element:"#tab-index",intro:"这是功能展示区", position: 'bottom'},
  ],
      nextLabel:"下一步 &rarr;",
      prevLabel:"&larr; 上一步",
      skipLabel:"跳过",
      doneLabel:"结束",
      exitOnOverlayClick:false,
      showStepNumbers:false
  });
  pageIntro.start();*/
	};

	//设置面包屑
	this.setBreadCrumbs = function (nodes) {
		$("#topheader-breadcrumbs .page-title").html(nodes[nodes.length - 1]);
		for (var i = 0; i < nodes.length; i++) {
			var $n = $("<li><a>" + nodes[i] + "</a></li>");
			$("#topheader-breadcrumbs .breadcrumb").append($n);
		}
	};
}

/*
 //body load
 --------------------------------------------------------------------*/
var esteel_appBar;
$(document).ready(function () {
	esteel_appBar = new JBSFrame_appBar();
	esteel_appBar.initUI();
});