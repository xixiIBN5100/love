<template>
  <div id="main">
 <el-tabs :tab-position="tabPosition"  class="demo-tabs">
    <el-tab-pane label="已发表">
      <div class="demo-collapse">
    <el-collapse v-model="items" @change="handleChange">
      <el-collapse-item v-for="(item, index) in items" :key="index" :title="item.date" :name="index"
  style="width: 1000px;height: auto;">
  <p class="scrollbar-demo-item">
    <div v-if="!item.isEditing && item.content">{{ item.content }}</div>
    <div v-else-if="!item.isEditing"></div>
    <el-input v-else v-model="item.content"></el-input>
    <el-button class="buttom_" type="primary" @click="_delete(index)">删除</el-button>
  </p>
</el-collapse-item>
    </el-collapse>
  </div></el-tab-pane>
    <el-tab-pane label="草稿箱">
  <div class="demo-collapse">
    <el-collapse v-model="items" @change="handleChange">
      <el-collapse-item v-for="(item, index) in itemes" :key="index" :title="item.date" :name="index"
  style="width: 1000px;height: auto;margin-left: 15px;">
  <p class="scrollbar-demo-item">
    <div v-if="!item.isEditing && item.content">{{ item.content }}</div>
    <div v-else-if="!item.isEditing"></div>
    <el-input v-else v-model="item.content"></el-input>
    <el-button class="buttom_" type="primary" @click="__delete(index)">删除</el-button>
    <el-button @click="toggleEditing(item,index)">修改</el-button>
  </p>
</el-collapse-item>
    </el-collapse>
  </div>
  </el-tab-pane>
  </el-tabs>
</div>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 900px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
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
import userService from "../apis/userService";
const newUserStore = userStore();
const responseData = ref("");
onMounted(async () => {
        // 发送 GET 请求
        const response = await contextService.show(userStore.name);
        responseData.value = response.data;
        items.value.push({ date:"",content: responseData.value, isEditing: false });
    });

    const items = ref([
  {date:"九月", content: "我喜欢ximo", isEditing: false },
  {date:"十月", content: "我喜欢蔡部", isEditing: false },
  { date:"十一月",content: "我喜欢木木酱", isEditing: false },
]);
const itemes = ref([
  {date:"九月", content: "我喜欢ximo", isEditing: false },
  {date:"十月", content: "我喜欢蔡部", isEditing: false },
  { date:"十一月",content: "我喜欢木木酱", isEditing: false },
]);


const _delete = async (index: number) => {
  items.value.splice(index, 1);
  ElNotification({
      title: "删除成功",
      message: h("i", { style: "color: teal" }, "小子,封心锁爱"),
    });
    await contextService.delete_(newUserStore.userSession.name, index);
};
const __delete = async(index:number)=>{
  itemes.value.splice(index,1);
  ElNotification({
      title: "删除成功",
      message: h("i", { style: "color: teal" }, "小子,封心锁爱"),
    });
}


const toggleEditing = async (item: { isEditing: boolean; content: string},index: number) => {
  item.isEditing = !item.isEditing;
  ElNotification({
    title: "修改",
    message: h("i", { style: "color: teal" }, "小子,汗流浃背了吧"),
  });
  await contextService.update_(newUserStore.userSession.name,index,item.content);

};
const handleChange = (val: string[]) => {
  console.log(val)
}

</script>
<style scoped>
main{
  position: fixed;
  height: 1000px;
  margin-top: 2px;
  top: 2px;
  left: 3px;
}
.scrollbar-demo-item{
  background-color: rgb(245, 241, 241);
  font-family:"华文行楷", STXingkai, cursive;
  font-size: 28px;
  color: rgb(96, 87, 91);
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: rgb(96, 87, 91);
  font-family:"华文行楷", STXingkai, cursive;
  font-size: 32px;
  font-weight: 600;
  height: 1000px;
  top: 3px;
}
</style>