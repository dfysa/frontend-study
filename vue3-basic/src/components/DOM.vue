<template>
  <div>
    <input ref="inputElement" type="text" placeholder="聚焦在此" />
    <button @click="focusInput">点击聚焦输⼊框</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
// 获取 DOM 元素的引⽤
const inputElement = ref<HTMLInputElement | null>(null);
// 操作 DOM 元素
const focusInput = () => {
  if (inputElement.value) {
    inputElement.value.focus(); // 让输⼊框获得焦点
  }
};
</script>
