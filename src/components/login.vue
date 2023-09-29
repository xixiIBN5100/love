<template>
  <div>
  <div class="login-box">
    <h2 class="msg">{{ msg }}</h2>
    <el-form>
      <el-form-item label="*账号">
        <el-input v-model="input" placeholder="请输入您的账号" class="input" />
      </el-form-item>
      <el-form-item label="*密码">
        <el-input
          v-model="password"
          type="password"
          placeholder="请输入您的密码"
          show-password
          class="input"
        />
      </el-form-item>
      <el-form-item label="密钥">
        <el-input v-model="inputkey" placeholder="请输入您的密钥" class="input" />
      </el-form-item>
      <el-row justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="login_" class="button">登录</el-button>
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

const input = ref("");
const password = ref("");
const inputkey = ref("");
const newLoginStore = loginStore();
const newUserStore = userStore();

const props = defineProps<{msg: string}>();
const { msg = "default" } = toRefs(props);

const emit = defineEmits(["clear"]);
// const input_=toRefs(input);
// const password_ = toRefs(password);
// const login = async () =>{
//   const loginInfo = ref({
//     phone: input.value,
//     password: password.value
//   });

//   const res = await loginSevice.login(input.value)
// }
const login_= () => {
  if (input.value==="144514"&&password.value=="144514"){

const message = "亲爱的" + "144514" + ",欢迎回来！";
ElNotification({
  title: "登陆成功！",
  message: h("i", { style: "color: teal" }, message),
});

newLoginStore.setLogin(true);
console.log("登录状态"+newLoginStore.loginSession);
localStorage.setItem("login", String(true));
localStorage.setItem("name", String(144514));
newUserStore.setUserInfo({
  name: "144514",
  username: "144514",
  sex: "homo",
  major: "演员"
});
router.push("/add");
}
};

const login= async () => {
  if (input.value === "" || password.value === "") {
    ElNotification({
      title: "登陆失败！",
      message: h("i", { style: "color: teal" }, "您的账号或密码为空"),
    });
    return;
  }

  const loginInfo = ref({
    username: input.value,
    password: password.value,
    key: inputkey.value
  });

  const res = await userService.login(loginInfo.value);
if (res.data.msg === "OK" && res.data.code === 200) {
  const responseData = res.data.data;
  const message = "亲爱的" + responseData.username + ",欢迎回来！";
  ElNotification({
    title: "登陆成功！",
    message: h("i", { style: "color: teal" }, message),
  });

  newLoginStore.setLogin(true);
  console.log("登录状态"+newLoginStore.loginSession);
  localStorage.setItem("login", String(true));
  localStorage.setItem("name", String(responseData.name));
  newUserStore.setUserInfo({
    name: responseData.name,
    username: responseData.username,
    sex: responseData.sex,
    major: responseData.major
  });
  if(res.data.flag===1)//是管理员
  {
  //session鉴权
  localStorage.setItem("session_id", responseData.sessionId);
  router.push("/administrator");
  }else{
    router.push("/add");
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
}

};
const clear = () => {
  input.value = "";
  password.value = "";

  emit("clear","清空啦");
};
</script>

<style scoped>

.login-box {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  margin-left: 450px;

}

.msg {
  text-align: center;
  margin-bottom: 40px;
}
</style>