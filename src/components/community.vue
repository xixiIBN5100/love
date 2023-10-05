<template>
  <div class="contain">
    <div style="margin-bottom: 15px">fill: <el-switch v-model="fill" /></div>
    <el-space :fill="fill" wrap>
      <el-card v-for="i in 3" :key="i" class="box-card">
          <div style="font-size: medium;">
            <span>name</span>
          </div>
        <el-scrollbar style="size: medium;">
          <span v-for="item in datafilter" :key="item.id">{{ item.content }}</span>
        </el-scrollbar>
        <el-divider />
        <el-scrollbar max-height="400px">
          <div v-if="showinput">
            <el-input v-model="inputvalue" clearable />
          </div>
                <div v-for="item in Datafiter" :key="item.id" type="textarea" placeholder="说点什么吧">
                  <el-button @click="Showinput" style="margin-top: 25px;">评论</el-button>
                  <el-button v-if="showButton" @click="add" style="margin-top: 25px;">上传</el-button>
                  <span v-for="(comment, index) in item.comments" :key="index" class="scrollbar-demo-item">
                    {{ comment }}
                  </span>
                  <br />
                </div>
        </el-scrollbar>
      </el-card>
    </el-space>
  </div>
</template>
<script setup lang="ts">
import { ref ,computed} from "vue";
import loginStore from "../stores/loginStore";
import router from "../routers";
import communityService from "../apis/communityService";
const newloginStore = loginStore();
const data = ref([
  {
    content:"i love you",
  }
]);
const datafilter = computed(()=>{
  return data.value.filter(item=>{
    return (
      item.content
    );
  });
});
const Data =ref([
  {
    comments:[
      "you are so brave",
      "well done",
    ]
  }
]);
const Datafiter = computed(()=>{
  return Data.value.filter(item=>{
    return(
      item.comments
    );
  });
});
let showinput=ref(false);
const Showinput = async()=>{
  if(newloginStore.loginSession){
    router.push ("/Login");
  }
  else{
    showinput.value=true;
  }
  const commentConent = ref({
    name:"李华",
    content:inputvalue.value
  });
  const { name, content } = commentConent.value;
  const res = await communityService.push(name, content);
};
const inputvalue=ref(" ");
const fill = ref(true);
function add() {
  if (inputvalue.value.trim() !== "") {
    const newcomment = {
      id: Data.value[0].comments.length + 1,
      content: inputvalue.value,
    };
    Data.value[0].comments.push(newcomment.content);
    inputvalue.value = " ";
    showinput.value = false;
  }
}
const showButton = computed(() => {
  return inputvalue.value.trim() !== " ";
});
</script>
<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 20px;
  text-align: center;
  padding: 18px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  z-index: 1;
}
.contain {
  overflow: hidden;
  width: 1300px;
  position: relative;
  z-index: 1;
}
</style>