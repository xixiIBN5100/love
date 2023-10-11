import request from"./request";
export default class CommunityService{
    static async refer(
        id: string,
    ){
        return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"/api/student/wall-artical",
			method: "get",
            params:{
                id_:id,
            }
		});
    }

    static async push(
        name:string,
        content:string,
    ){
        return request({
            "headers":{
                "Content-Type":"application/json",
            },
            url:"/api/student/wall-comment",
            method:"post",
            params:{
                name_ : name,
                content_:content,
            }
        });
    }
}