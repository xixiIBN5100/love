//store中存的个人信息
export interface userInfo {
	name: string,
	account: string,
	sex: string,
	major: string,
	user_id: number,
}

//新建表白内容
export interface addInfo {
	artical: string,
	name_state: boolean,
	user_id:number,
}

export interface signInfo {
	name: string;
	confirm_password: string;
	major: string;
	password: string;
	sex: string;
	username: string;
}