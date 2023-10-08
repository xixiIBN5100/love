<script setup lang="ts">
import { reactive , h, ref, watch, computed } from "vue";
import contextService from "../apis/contextService";
import userStore from "../stores/userStore";
import { ElNotification } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";

const newUserStore = userStore();

const form = reactive({
  name: newUserStore.userSession.name,
  context:"",
  name_state: true,//ture为实名表白,false为匿名表白
});

const onSubmit = async () => {
  if (form.context !== "") {
    const res = await contextService.add(form);
    if (res.data.code === 200 && res.data.msg === "OK") {
      ElMessageBox.confirm(
    "请确认表白内容无误且为实名表白",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      ElMessage({
        type: "success",
        message: "表白成功",
      });
      console.log(form);
      ElNotification({
        title: "成功",
        message: h("i", { style: "color: teal" }, "实名表白成功！"),
      });
      clear();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消成功",
      });
    });
    }else  if (res.data.code === 201 && res.data.msg === "OK") {
      ElMessageBox.confirm(
    "请确认表白内容无误且为匿名表白",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      ElMessage({
        type: "success",
        message: "表白成功",
      });
      console.log(form);
      ElNotification({
        title: "成功",
        message: h("i", { style: "color: teal" }, "匿名表白成功！"),
      });
      clear();
      condition.value="我要匿名";
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消成功",
      });
    });
    }
    else {
      ElNotification({
        title: "失败",
        message: h("i", { style: "color: teal" }, "表白失败，请检查网络！"),
      });
    }
  }
  else {
    ElNotification({
      title: "失败",
      message: h("i", { style: "color: teal" }, "表白失败,请输入表白内容！"),
    });
  }
};
const state = ref("实名状态");
const condition = ref("我要匿名");
watch(condition, (newValue) => {
  if (newValue === "我要匿名") {
    state.value = "实名状态";
  }else{
    state.value = "匿名状态";
  }
});
const stateColor = computed(() => {
  return state.value === "实名状态" ? "green" : "red";
});
const anonymous = () => {
     form.name_state = !form.name_state;
    if(!form.name_state){
    ElNotification({
      title: "主打一个暗恋",
      message: h("i", { style: "color: teal" }, "匿名成功"),
    });
    condition.value="取消匿名";
  }
    else{
      ElNotification({
      title: "取消匿名成功",
      message: h("i", { style: "color: teal" }, "取消匿名成功"),
    });
    condition.value ="我要匿名";
    }
  };

const clear = () => {
  form.context = "";
  form.name_state = true;
  form.name = "";
};

const clear_ = () => {
  form.context = "";
  form.name_state = true;
  form.name = "";
  ElNotification({
        title: "冷静成功",
        message: h("i", { style: "color: teal" }, "小子,冷静一下"),
      });
};

</script>

<template>
  <div class="love_box">
    <div style="text-align: center; margin-left: 90px;">
      <h2>开始一场激动人心的表白吧</h2>
      <span>现在的表白状态: </span>
    <span :style="{ color: stateColor }">{{ state }}</span>
    </div>
    <el-form :model="form" label-width="90px">
      <el-form-item label="你想对TA说" >
        <el-input v-model="form.context"  type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="button">表白!</el-button>
        <el-button class="button" @click="clear_">冷静一下</el-button>
        <el-button class="button" @click="anonymous">
          <i :class="{'el-icon-user-solid': form.name_state, 'el-icon-user': !form.name_state}"></i>
          {{ condition }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.love_box {
  width: 400px;
  height: 200px;
  margin-left: 420px;
  margin-bottom: 130px;
}

.button {
  margin: 10px;
  width: 72px;
}

</style>