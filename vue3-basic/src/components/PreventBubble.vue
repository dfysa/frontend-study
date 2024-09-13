<template>
  <div @click="handleOuterClick">
    <button @click.stop="handleButtonClick">点击按钮</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
// 处理外层 div 的点击事件
const handleOuterClick = (): void => {
  alert("点击了外层 div");
};
// 处理按钮的点击事件
const handleButtonClick = (): void => {
  alert("点击了按钮");
};
</script>
