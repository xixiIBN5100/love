import {defineStore} from "pinia";
import {ref} from "vue";

const loginStore = defineStore(
	"login",
	() => {
		const loginSession = ref(false);
		const loginrefer =ref(false);
		const setLogin = (loginNewSession: boolean) => {
			loginSession.value = loginNewSession;
		};
		const loginRefer = (loginNew:boolean)=>{
			loginrefer.value = loginNew;
		}

		return {
			loginSession,
			loginrefer,
			setLogin,
			loginRefer,
		};
	},
	{
		persist: true,
	}
);
export default loginStore;