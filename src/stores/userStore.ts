import {defineStore} from "pinia";
import {reactive} from "vue";
import {userInfo} from "../types/personalInfo.ts";

const userStore = defineStore(
	"user",
	() => {
		const userSession = reactive({
			name: "未登录",
			account: "未登录",
			sex: "未登录",
			major: "未登录",
			user_id: "未登录"
		});

		const setUserInfo = (info: userInfo) : void => {
			userSession.name = info.name;
			userSession.account = info.account;
			userSession.sex = info.sex;
			userSession.major = info.major;
			userSession.user_id = info.user_id;
		};

		return {
			userSession,
			setUserInfo,
		};
	},
	{
		persist: true
	}
);

export default userStore;