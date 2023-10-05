<template>
  <div class="footer">
    看什么看,快去表白
    <button @click="toggleSound" class="btn">{{ isPlaying ? '暂停音乐' : '播放音乐' }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const audio = new Audio("../public/bgm.mp3");
const isPlaying = ref(false);

function toggleSound () {
  if (isPlaying.value) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying.value = !isPlaying.value;
}
</script>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;
  font-family: "华文行楷", STXingkai, cursive;
  font-size: 20px;
  z-index: 6;
}

.btn {
  font-size: 16px;
  padding: 5px 10px;
  margin-left: 300px;
}
</style>