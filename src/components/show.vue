<template>
  <div class="but">
  </div>
  <el-table :data="filterTableData" style="width: 100%" class="table">
    <el-table-column label="表白状态" prop="state" />
    <el-table-column label="表白内容" prop="context" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search context" />
      </template>
      <!-- #default 是作用域插槽的名称，它表示默认的插槽，即没有特定名称的插槽。"scope" 是作用域插槽的参数，它表示在父组件中传递给子组件的数据。
      在这段代码中，作用域插槽的参数 scope 包含了父组件传递给子组件的数据。在模板中，你可以通过 scope 对象来访问这些数据。
      例如，scope.$index 表示当前循环项的索引，scope.row 表示当前循环项的数据。
      因此，在这个例子中，<el-button> 组件通过作用域插槽获取到了父组件中传递过来的索引和数据，
      并且在点击按钮时将它们传递给对应的事件处理函数 handleEdit 和 handleDelete。这样就实现了根据点击的行进行编辑或删除操作的功能。 -->
      <template #default="scope">
        <el-button size="small" type="primary" text @click="handleEdit(scope.$index, scope.row)">
          修改
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="修改" width="30%" draggable>
    <el-input v-model="editedRow.context" placeholder="请输入修改的内容" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEditedData">
          确认修改
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible_" title="删除" width="30%" draggable>
    <span style="color: red;">确认要删除吗</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible_ = false">取消</el-button>
        <el-button type="danger" @click="handleDelete_comfrim()">
          确认删除
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref ,onMounted} from "vue";
import contextService from "../apis/contextService";
import { ElMessage } from "element-plus";
import userStore from "../stores/userStore";
const newUserStore = userStore();
const dialogVisible_ = ref(false);
const responselist = reactive<User[]>([]);
onMounted(async () => {
  const response = await contextService.show(newUserStore.userSession.user_id);
  // 将从服务端获取的数据列表 response.data.list 赋值给 tableData
  responselist.splice(0, responselist.length, ...response.data.data.list);
  console.log(responselist);
  console.log(response.data.data.list);
});
console.log(responselist);
let lastDeletedData: User | null = null;
interface User {
  state: string
  context: string
  articl_id: number
}

const search = ref("");
 const filterTableData = computed(() =>
 responselist.filter(
     (data) =>
       !search.value ||
       data.context.toLowerCase().includes(search.value.toLowerCase())
   )
 );

const dialogVisible = ref(false);
const editedRow = ref<User>({state: "", context: "",articl_id: -1});
const editedRowIndex = ref(-1);
const handleEdit = (index: number, row: User) => {
  dialogVisible.value = true;
  editedRowIndex.value = index;
  editedRow.value = { ...row };//展开运算符拷贝数据
};

const saveEditedData = async() => {
  Object.assign(responselist[editedRowIndex.value], editedRow.value);//更新修改后的数据
  dialogVisible.value = false;
   await contextService.update_(newUserStore.userSession.user_id,editedRow.value.articl_id,editedRow.value.context);
  ElMessage.success("保存成功！");
};
const deleteindex = ref(-1);
const handleDelete = (index: number) => {
  deleteindex.value = index;
  dialogVisible_.value = true;
};
  const handleDelete_comfrim = async() => {
  dialogVisible_.value = false;
  lastDeletedData = responselist[deleteindex.value];
  responselist.splice(deleteindex.value, 1);
  await contextService.delete_(newUserStore.userSession.user_id, lastDeletedData.articl_id);
};
</script>
<style>
.table{
  margin-left: 50px;
  margin-bottom: 300px;
}

.but{
  margin-left: 1340px;
}

.a{
  margin-bottom: -145px;
}
</style>

