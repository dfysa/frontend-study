<template>
  <button>{{ customAttr }}</button>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
// 使⽤ defineProps 声明⾃定义属性
defineProps<{
  customAttr: string;
}>();
</script>
