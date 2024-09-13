<template>
 <div>
 <p>当前⽤户：{{ userName }}</p>
 <p>2 + 2 的结果是：{{ 2 + 2 }}</p>
 <p>⽤户全名：{{ firstName + ' ' + lastName }}</p>
 </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// 定义⼀个响应式状态
const userName = ref<string>('张三')
const firstName = ref<string>('张')
const lastName = ref<string>('三')
</script>
