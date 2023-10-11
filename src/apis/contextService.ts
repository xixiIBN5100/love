import request from "./request.ts";
import {addInfo} from "../types/personalInfo.ts";

export default class contextService {
	static async add (data_: addInfo) {
		return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"/api/student/wall-artical",
			method: "post",
			data: data_
		});
	}

	static async show (
		owner_name: string
	) {
		return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"/api/student/wall-artical/search",
			method: "get",
			params: {
				name: owner_name
			}
		});
	}
	static async delete_ (
		owner_name: string,
		index: number,
	) {
		return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"/api/student/wall-artical/delete",
			method: "delete",
			params: {
				name: owner_name,
				id: index
			}
		});
	}
	static async update_ (
		owner_name: string,
		index: number,
		updateconext: string,
	) {
		return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"/api/student/wall-artical/updata",
			method: "put",
			params: {
				name: owner_name,
				id: index,
			},
			data: updateconext
		});
	}

	static async return_ (
		owner_name: string,
		state: string,
		context: string,
	) {
		return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"/api/student/wall-artical/updata",//不存在的接口
			method: "post",
			data:{
				owner_name,
		        state,
				context
			}
		});
	}
}