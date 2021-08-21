// 根模块区
import Layout from "../layout/index.vue"
import Login from "../views/login.vue"
import Home from "../views/home.vue"

// 子模块区
import Upgoods from "./upgoods.js";
import Account from "./account.js";
import Recharge from "./recharge.js";
import Drawrecord from "./drawrecord.js";

const routes = [

	{
		path: "/",
		component: Layout,
		name: "",
		meta: {ttl: "首页", icon: "el-icon-s-home"},
		//	redirect: '/basic',
		children: [
			{
				path: "",
				component: Home
			}
		]
	}, {
		path: "/upgoods",
		component: Layout,
		meta: {ttl: "提货报价", icon: "el-icon-s-cooperation"},
		children: Upgoods
	},
	{
		path: "/account",
		component: Layout,
		meta: {ttl: "账户余额", icon: "el-icon-s-check"},
		children: Account
	},

	{
		path: "/recharge",
		component: Layout,
		meta: {ttl: "充值记录", icon: "el-icon-goods"},
		children: Recharge
	},

	{
		path: "/drawrecord",
		component: Layout,
		meta: {ttl: "提现记录", icon: "el-icon-document-copy"},
		children: Drawrecord

	},
	{
		path: "/login",
		ttl: "登录",
		component: Login,
		hidden: true,
	},

];

import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter);

const createRouter = () => new VueRouter({
	mode: 'history', // require service support
	scrollBehavior: () => ({y: 0}),
	routes
})

const router = createRouter()
export function resetRouter ()
{
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
