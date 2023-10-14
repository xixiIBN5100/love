<template>
  <div class="contain">
    <div style="margin-bottom: 15px">fill: <el-switch v-model="fill" /></div>
    <el-button @click="getdata">刷新</el-button>
    <el-space :fill="fill" wrap>
      <el-card v-for="(article) in articles" :key="article.id" class="box-card">
        <div style="font-size: medium;">
          <span>{{ article.Name }}</span>
        </div>
        <el-scrollbar style="height: 100px;">
          <span>{{ article.artical }}</span>
          <div v-show="showCommentInput &&  article.Name===nowAuthor">
             <el-input style="margin-top: 43px;" v-model="commentInputValue" placeholder="说点什么吧" clearable />
        </div>
        </el-scrollbar>
        <el-divider />
        <el-button @click="showCommentInput_(article.id)" style="margin-top: 25px;">
          评论</el-button>
        <el-button v-if="showCommentButton" @click="addComment(article.id)" style="margin-top: 25px;">上传</el-button>
        <el-scrollbar max-height="400px">
          <div v-for="(comment, commentIndex) in article.comments" :key="commentIndex"
           type="textarea">
            <div v-for="(line, lineIndex) in comment.artical" :key="lineIndex" 
            v-show="comment.name === nowAuthor">
              {{ line }}
            </div>
          </div>
        </el-scrollbar>
      </el-card>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import CommunityService from "../apis/communityService";
import axios from "axios";
interface Article {
  id: number;
  Name: string;
  artical: string;
  comments: Comment[];
}

interface Comment {
  name: string;
  artical: string[];
}

const articles = ref<Article[]>([
  {
    id: 1,
    Name: "tom",
    artical: "i love you",
    comments: [
      { name: "tom", artical: ["you are so brave", "hello"]},
      { name: "jack", artical: [] },
    ],
  },
  {
    id: 2,
    Name: "jack",
    artical: "i miss you",
    comments: [
      { name: "tom", artical: [] },
      { name: "jack", artical: ["well done"] },
    ],
  },
]);
const getdata = async (id: number) => {
  // 检查id是否有效
  if (id <= 0 || id > articles.value.length) {
    console.error(`Invalid id: ${id}`);
    return;
  }

  const index = id - 1;
  const article = articles.value[index];

  // 检查article对象是否有效
  if (!article) {
    console.error(`Article not found: ${id}`);
    return;
  }

  const res = await CommunityService.refer(articles.value[index].artical);
  const articalList = res.data.artical_list;
  const articalData = articalList[index];

  // 检查articalData是否存在，并为article对象添加artical属性
  if (articalData) {
    article.artical = articalData.artical;
    article.Name = articalData.name;
    console.log(article.Name);
    console.log(article.artical);
  }
  else {
    console.error(`Artical not found: ${id}`);
  }
};

const showCommentInput = ref(false);
const commentInputValue = ref("");
const fill = ref(true);
const nowAuthor = ref("tom");
const showCommentInput_ = async (num: number) => {
  const index = num - 1;
  const article = articles.value[index];
  nowAuthor.value = article.Name;
  showCommentInput.value = !showCommentInput.value;
};
async function addComment(articleId: number) {
  if (commentInputValue.value.trim() !== "") {
    const newComment = {
      name: articles.value[articleId - 1].Name,
      artical: commentInputValue.value.trim(),
    };
    articles.value[articleId - 1].comments.push({
      name: newComment.name,
      artical: [newComment.artical],
    });
    nowAuthor.value = newComment.name;
    commentInputValue.value = "";
    try {
      await axios.post("/api/student/wall-comment", newComment);
      // 将评论发送到后端数据库
      showCommentInput.value = false;
      // 从后端数据库获取评论并展示
      const response = await axios.get("/api/student/wall-comment/artical-comment");
      const comments = response.data;
      console.log(comments.value);
      // 处理从后端返回的评论数据，例如更新视图等操作
    } catch (error) {
      // 错误处理
      console.error("提交评论失败", error);
    }
  }
}

const showCommentButton = computed(() => {
  return commentInputValue.value.trim() !== "";
});
</script>
<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
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