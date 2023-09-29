<template>
  <el-scrollbar height="400px">
    <p v-for="(item, index) in items" :key="index" class="scrollbar-demo-item">
      <div v-if="!item.isEditing">{{ item.content }}</div>
      <el-input v-else v-model="item.content"></el-input>
      <el-button class="buttom_" type="primary" @click="delete_(index)">删除</el-button>
      <el-button @click="toggleEditing(item)">修改</el-button>
     </p>
  </el-scrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 800px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  margin-left: 300px;
}

.scrollbar-demo-item div{
  display:flex;
  justify-content:center;
  align-items:center;
  height:100%;
  width:100%;
}

</style>



<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import {ref , onMounted, h} from "vue";
import contextService from "../apis/contextService.ts";
import userStore from "../stores/userStore.ts";
const newUserStore = userStore();
const delete_ = (index: number) => {
  items.value.splice(index, 1);
  ElNotification({
      title: "删除成功",
      message: h("i", { style: "color: teal" }, "小子,封心锁爱"),
    });
};
const toggleEditing = (item: { isEditing: boolean; }) => {
  item.isEditing = !item.isEditing;
  ElNotification({
    title: "修改",
    message: h("i", { style: "color: teal" }, "小子,汗流浃背了吧"),
  });
};

const items = ref([
  { content: "我喜欢ximo", isEditing: false },
  { content: "我喜欢蔡部", isEditing: false },
  { content: "我喜欢木木酱", isEditing: false },
]);
onMounted(async () => {
  const owner_name= newUserStore.userSession.name;
  console.log(owner_name);
  const res = await contextService.show(owner_name);

  if (res.data.code === 200 && res.data.msg === "OK") {
    tableData.value = res.data.data.contact_list;
  }
  else if (res.data.code === 200501 && res.data.msg === "参数错误") {
    ElNotification({
      title: "失败",
      message: h("i", { style: "color: teal" }, "参数错误！"),
    });
  }
  else if (res.data.code === 200506 && res.data.msg === "联系人列表为空") {
    ElNotification({
      title: "提示",
      message: h("i", { style: "color: teal" }, "联系人为空！"),
    });
  }
  else {
    ElNotification({
      title: "失败",
      message: h("i", { style: "color: teal" }, "网络错误！"),
    });
  }
});

const tableData = ref([]);

const handleRowDelete = (index:number) => {
  tableData.value.splice(index, 1);
};

</script>
<style scoped>
</style>
../apis/contextService.ts