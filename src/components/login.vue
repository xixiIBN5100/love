<template>
  <div>
  <div class="login-box">
    <h2 class="msg">{{ msg }}</h2>
    <el-form>
      <el-form-item label="账号">
        <el-input v-model="input" placeholder="请输入您的账号" class="input" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="password"
          type="password"
          placeholder="请输入您的密码"
          show-password
          class="input"
        />
      </el-form-item>
      <el-form-item label="密钥"  >
        <el-input v-model="key" placeholder="选填"/>
      </el-form-item>
      <el-row justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="login" class="button">登录</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="clear" class="button">清空</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref , h , toRefs} from "vue";
import userService from "../apis/userService.ts";
import loginStore from "../stores/loginStore.ts";
import userStore from "../stores/userStore.ts";
import { ElNotification } from "element-plus";
import router from "../routers";
import AdministratorStore from "../stores/administratorStore";
import { keysOf } from "element-plus/es/utils/objects.js";

const input = ref("");
const password = ref("");
const key = ref("");
const newLoginStore = loginStore();
const newUserStore = userStore();
const newadministratorStore = AdministratorStore();
const props = defineProps<{msg: string}>();
const { msg = "default" } = toRefs(props);

const emit = defineEmits(["clear"]);
const login= async () => {
  if (input.value === "" || password.value === "") {
    ElNotification({
      title: "登陆失败！",
      message: h("i", { style: "color: teal" }, "您的账号或密码为空"),
    });
    return;
  }

  const loginInfo = ref({
    account: input.value,
    password: password.value,
    key: key.value,
  });
  const res = await userService.login(loginInfo.value);
if (res.data.msg === "OK" && res.data.code === 200) {
  const responseData = res.data.data.list;
  const message = "亲爱的" + responseData.name + ",欢迎回来！";
  ElNotification({
    title: "登陆成功！",
    message: h("i", { style: "color: teal" }, message),
  });
  if(responseData.manager_state===false)//是普通用户
  {
  newLoginStore.setLogin(true);
  newUserStore.setUserInfo({
    name: responseData.name,
    account: responseData.account,
    sex: responseData.sex,
    major: responseData.major,
    user_id: responseData.user_id
  });
  router.push("/add");//推向用户页面
}else{//是管理员
  //session鉴权
  newadministratorStore.setLogin(true);
  newadministratorStore.SessionID = responseData.sessionID;//更新session id
  router.push("/administrator");//推向管理员页面
  }
}
else if (res.data.msg === "参数错误" && res.data.code === 200501) {
  ElNotification({
    title: "登陆失败！",
    message: h("i", { style: "color: teal" }, "参数错误"),
  });
  return;
}
else if (res.data.msg === "用户不存在" && res.data.code === 200502) {
  ElNotification({
    title: "登陆失败！",
    message: h("i", { style: "color: teal" }, "用户不存在"),
  });
  return;
}else{
  ElNotification({
    title: "登陆失败！",
    message: h("i", { style: "color: teal" }, "网络问题"),
  });
  return;
}

};
const clear = () => {
  input.value = "";
  password.value = "";
  emit("clear","清空啦");
};
console.log(newUserStore);
</script>

<style scoped>

.login-box {
  width: 350px;
  padding: 20px;
  border: 15px solid #ccc;
  border-radius: 9px;
  background-color: #f8f8f8;
  margin-left: 450px;

}

.msg {
  text-align: center;
  margin-bottom: 40px;
}
</style>