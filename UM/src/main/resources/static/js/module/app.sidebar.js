"use strict";

/**
 * Created by wzj on 2017/12/28. sidebar 侧栏
 */

function JBSFrame_sidebar() {
	JBSFrame.call(this);

	// 侧栏数据
	this.sidebarData = [
	//{name:"home", text:"首页",icon:"home", url:"/home/"},tps_consume_record
	{ name: "point", text: "点卡明细", icon: "shopping-cart", children:
		[{ name: "userConsumeDetail", text: "用户油气消费记录", url: "/userPoint/" },
		{ name: "goodsConsumeRecord", text: "用户商品消费记录", url: "/goodsConsume/redirect/" },
		{ name: "merchantOilDetail", text: "商户油气明细", url: "/merchantPoint/oil/" },
        { name: "merchantGoodsDetail", text: "商户商品明细", url: "/merchantPoint/goods/" },
		{ name: "pointRechargeDetail", text: "点卡发放", url: "/recharge/search/" },
        { name: "transfer", text: "点卡转让", url: "/userPoint/transfer/list" }]
	},
	{ name: "merchantManager", text: "商户管理", icon: "shopping-cart", children:
		[{ name: "merchant", text: "商户列表", url: "/merchant/" },
		{ name: "merchantUser", text: "商户管理员", url: "/merchantUser/" },
		{ name: "merchantBankCard", text: "商户银行卡", url: "/merchant/card/bank/" },
		{ name: "User", text: "用户管理", url: "/user/redirect" }]
	},
	{ name: "product", text: "商品管理", icon: "shopping-cart", children:
		[{ name: "productType", text: "油气列表", url: "/productType/redirect/" },
		{ name: "merchantProductType", text: "商户油气明细", url: "/merchantProductType/redirect/" },
		{ name: "merchantGoodsType", text: "商户商品种类", url: "/goods/merchant/redirect/" },
		{ name: "goodsDetail", text: "商品列表", url: "/goods/detail/" },
        { name: "goodsType", text: "商品种类", url: "/goods/redirect/" }]
	},
	{ name: "pointTrade", text: "点卡交易", icon: "shopping-cart", children:
		[{ name: "pointSale", text: "交易列表", url: "/pointSale/list/" }]
	}
	]; //sidebarData;

	//this.sidebarData = sidebarData1;

	this.initUI = function () {

		$("#sidebar-toggle").click(function () {
			$("body").toggleClass("hide-sidebar");
			//设置所有panel，table的大小
			this.resetPanelTableSize();
		}.bind(this));
		this.initSidebar();
	};

	//节点点击
	this.onNodeClick = function (node, _link) {
		//console.log(node,_link)
		jbsframe.save_localStorage("sidebarFocusNode", node);
		window.location.href = node.url;

		/*erp_tabContent.addTabStore({
  name:node.name,
  title:node.text,
  url:node.url,
  type:"list"
  },_link);*/
	};

	//初始化
	this.initSidebar = function () {
		if (document.getElementById("component-sidebar") != null) {
			this.sidebar = ReactDOM.render(React.createElement(ComponentSidebar, {
				data: this.sidebarData,
				userName: _userName,
				//data:[],
				//url:"/menu/",
				focusNode: this.sidebarData[0], //{name:"contract",text:"采购合约"},
				onNodeClick: this.onNodeClick
			}), document.getElementById("component-sidebar"));
		}

		// 设置当前保存的选中菜单
		erp_sidebar.setFocus(jbsframe.get_localStorage("sidebarFocusNode"));
		//复制topbar上的用户信息
		var sidebar_profile = $("#user-profile .profile-menu").clone();
		$("#sidebar-userProfile").after(sidebar_profile);

		//
	};

	this.setFocus = function (node) {
		this.sidebar.setFocus(node);
	};

	//设置所有panel，table的大小
	this.resetPanelTableSize = function () {
		if ($("body").hasClass("hide-sidebar")) {
			$(".table-box").css("width", "auto");
		} else {
			$(".table-box").each(function (index, tableBox) {
				$(tableBox).css("width", $(tableBox).data("width"));
			});
		}
	};
}
/*
 * //body load
 * --------------------------------------------------------------------
 */
var erp_sidebar;
$(document).ready(function (e) {
	erp_sidebar = new JBSFrame_sidebar();
	// 初始化UI
	erp_sidebar.initUI();
});