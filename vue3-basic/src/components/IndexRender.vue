<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      {{ index + 1 }}. {{ item }}
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref } from "vue";
// 定义⼀个字符串数组状态
const items = ref<string[]>(["HTML", "CSS", "JavaScript"]);
</script>
