<template>
  <div>
    <input v-model="searchQuery" placeholder="搜索关键词" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
// 定义搜索关键词的状态
const searchQuery = ref<string>("");
// 监听搜索关键词的变化
watch(searchQuery, () => {
  console.log("搜索关键词", searchQuery.value);
});
</script>
