<script setup lang="ts">
import { ref ,computed } from "vue";
import router from "../routers";
import userStore from "../stores/userStore";
import loginStore from "../stores/loginStore";
import {storeToRefs} from "pinia";
import AdministratorStore from "../stores/administratorStore";

const newUserStore = userStore();
const newLoginStore = loginStore();
const newadministratorStore = AdministratorStore();
const { loginSession } = storeToRefs(newLoginStore);
const { userSession } = storeToRefs(newUserStore);
const isName = localStorage.getItem("name");
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const pushToOut = () => {
  localStorage.clear();
  sessionStorage.clear();
  newadministratorStore.administrator_loginSession = false;
  loginSession.value = false;
  userSession.value = {
    name: "未登录",
    username: "未登录",
    sex: "未登录",
    major: "未登录",
  };
  router.push("/Login");
};
const state = computed(() => {
  if (newLoginStore.loginSession) {
    return "用户中心";
  } else if(newadministratorStore.administrator_loginSession){
    return "管理中心";
  }else{
    return "未登录";
  }
});
const pushToadministrator_ =()=>{
  router.push("/administrator_");
};
const pushToadministrator =()=>{
  router.push("/administrator");
};
const pushInto =()=>{
  router.push("/Login");
};
const PushInto=()=>{
  router.push("/Sign");
};

const pushToAdd = () => {
  router.push("/Add");
};

const pushToShow = () => {
  router.push("/Show");
};
const pushToCommunity = ()=>{
  router.push("/community");
};
</script>

<template>
  <div class="main">
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo menu"
      mode="horizontal"
      :ellipsis="false"
       @select="handleSelect"
  >
  <el-sub-menu index="2">
      <template #title>{{ state }}</template>
      <el-menu-item index="2-1" @click="pushToAdd" v-show="newLoginStore.loginSession">我要表白</el-menu-item>
      <el-menu-item index="2-2" @click="pushToShow"  v-show="newLoginStore.loginSession">查看表白</el-menu-item>
      <el-menu-item index="2-3" @click="pushToCommunity"  v-show="newLoginStore.loginSession">社区</el-menu-item>
      <el-menu-item index="2-1" @click="pushToadministrator" v-show="newadministratorStore.administrator_loginSession">管理表白</el-menu-item>
      <el-menu-item index="2-2" @click="pushToadministrator_"  v-show="newadministratorStore.administrator_loginSession">管理用户</el-menu-item>
    </el-sub-menu>
  <el-breadcrumb separator="/" class="left">
    <el-breadcrumb-item :to="{ path: '/Login' }" v-show="!newLoginStore.loginSession && !newadministratorStore.administrator_loginSession" style="font-size: 25px;" @click="pushInto">
      登录</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/Sign' }" v-show="!newLoginStore.loginSession && !newadministratorStore.administrator_loginSession" style="font-size: 25px;" @click="PushInto">
      注册</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/Login' }" v-show="newLoginStore.loginSession || newadministratorStore.administrator_loginSession" style="font-size: 24px;" @click="pushToOut">
      退出登录</el-breadcrumb-item>
    <el-breadcrumb-item style="font-size: 25px;"></el-breadcrumb-item>
  </el-breadcrumb>
      <div v-show="newLoginStore.loginSession" :key="2">
        <div style="display: flex ; flex-direction:row">
          <p>亲爱的{{isName}},欢迎回来&ensp;&ensp;</p>
        </div>
      </div>
  </el-menu>
</div>
</template>

<style scoped>
main{
  position:absolute;
  z-index: 3;}
.left{
  position: absolute;
    right:  0;
    top: 25px;
    font-family: "华文行楷", STXingkai, cursive;
    z-index:3 ;
}

.menu {
  position: fixed;
  left: 2%;
  right: 2%;
  top: 2%;
  z-index: 3;
}

.button_div {
  position: relative;
  z-index: 3;
}

.button {
  margin-top: 12px;
  z-index: 3;
}
.el-menu-demo.menu {
    background-color: rgb(245, 241, 241);
    z-index: 3;
  }

</style>