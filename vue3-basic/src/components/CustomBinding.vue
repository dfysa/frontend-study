<template>
 <div>
 <CustomButton :custom-attr="customValue">⾃定义按钮</CustomButton>
 </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CustomButton from './CustomButton.vue'
// ⾃定义属性值
const customValue = ref<string>('我是⾃定义属性')
</script>