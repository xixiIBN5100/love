import { h } from "vue";
import {createRouter , createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Add from "../pages/Add.vue";
import Show from "../pages/Show.vue";
import Administrator from "../pages/Administrator.vue";
import Community from"../pages/community.vue";
import { ElNotification } from "element-plus";

const routes = [
	{
		path: "/" ,
		redirect: "/Login"
	},
	{
		path: "/Login" ,
		name: "Login" ,
		component: Login
	},
	{
		path: "/Sign" ,
		name: "Sign" ,
		component: Sign
	},
	{
		path: "/Add" ,
		name: "Add" ,
		component: Add
	},
	{
		path: "/Show" ,
		name: "Show" ,
		component: Show
	},
	{
		path: "/administrator",
		name: "administrator",
		component: Administrator
	},
	{
		path:"/community",
		name:"community",
		component:Community
	}
];

const router = createRouter (
	{
		history: createWebHistory() ,
		routes: routes
	}
);

 /*router.beforeEach((to, _, next) => {
 	if (localStorage.getItem("login") === "false") {
 		if (to.path === "/Login") {
 			next();
 		}else if (to.path === "/Sign"){
 			next();
 		}
 		else {
 			ElNotification({
 				title: "失败",
 				message: h("i", { style: "color: teal" }, "请您先登录！"),
 			});
 			next("/Login");
 		}
	}else{
		next();
	}
 });*/


export default router;