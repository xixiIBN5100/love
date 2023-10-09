//store中存的个人信息
export interface userInfo {
	name: string,
	username: string,
	sex: string,
	major: string
}

//新建表白内容
export interface addInfo {
	name: string,
	context: string,
}

export interface signInfo {
	name: string;
	confirm_password: string;
	major: string;
	password: string;
	sex: string;
	username: string;
}