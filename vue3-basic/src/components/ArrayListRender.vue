<template>
 <ul>
 <li v-for="(item, index) in items" :key="index">{{ item }}</li>
 </ul>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义⼀个数组状态
const items = ref<string[]>(['苹果', '⾹蕉', '橘⼦'])
</script>
