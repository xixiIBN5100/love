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

	static async show ( user_id: number ){
		return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"/api/student/wall-artical/my",
			method: "post",
			data:{
				user_id
			}
		});
	}
	static async delete_ (
		user_id: number,
		artical_id: number,
	) {
		return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"/api/student/wall-artical",
			method: "delete",
			data:{
				user_id,
				artical_id,
			}
		});
	}
	static async update_ (
		user_id: number,
		artical_id: number,
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
				artical,
				user_id,
			}
		});
	}
}