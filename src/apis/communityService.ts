import request from"./request";
export default class CommunityService{
    static async refer(
        id: string,
    ){
        return request({
			"headers": {
				"Content-Type": "application/json",
			},
			url:"https://mock.apifox.cn/m1/3329798-0-default/api/student/wall-artical",
			method: "GET",
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
            method:"POST",
            params:{
                name_ : name,
                content_:content,
            }
        });
    }
}