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

	static async show (){
		return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"/api/student/wall-artical",
			method: "get",
		});
	}
	static async delete_ (
		artical_id: string,
	) {
		return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"/api/student/wall-artical",
			method: "delete",
			params: {
				artical_id
			}
		});
	}
	static async update_ (
		artical_id: string,
		artical: string,
	) {
		return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"/api/student/wall-artical",
			method: "put",
			data: {
				artical_id,
				artical
			}
		});
	}
}