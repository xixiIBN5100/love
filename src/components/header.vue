<script setup lang="ts">
import { ref } from "vue";
import router from "../routers";
import userStore from "../stores/userStore";
import loginStore from "../stores/loginStore";
import {storeToRefs} from "pinia";

const newUserStore = userStore();
const newLoginStore = loginStore();
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
  loginSession.value = false;
  userSession.value = {
    name: "未登录",
    username: "未登录",
    sex: "未登录",
    major: "未登录",
  };
  router.push("/Login");
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
      <template #title>个人中心</template>
      <el-menu-item index="2-1" @click="pushToAdd">我要表白</el-menu-item>
      <el-menu-item index="2-2" @click="pushToShow">查看表白</el-menu-item>
      <el-menu-item index="2-3" @click="pushToCommunity">社区</el-menu-item>
    </el-sub-menu>
  <el-breadcrumb separator="/" class="left">
    <el-breadcrumb-item :to="{ path: '/Login' }" style="font-size: 25px;">登录</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: 'Sign' }" style="font-size: 25px;">注册</el-breadcrumb-item>
    <el-breadcrumb-item :to="{path:'Community'}" style="font-size: 25px;">社区</el-breadcrumb-item
    >
    <el-breadcrumb-item style="font-size: 25px;"></el-breadcrumb-item>
  </el-breadcrumb>
      <div v-show="loginSession" :key="2">
        <div style="display: flex ; flex-direction:row">
          <p>亲爱的{{isName}},欢迎回来&ensp;&ensp;</p>
          <el-button class="ml-2 button" @click="pushToOut" >退出</el-button>
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