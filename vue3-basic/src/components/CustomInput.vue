<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"/>
</template>

<script setup lang="ts">
// 接收 modelValue 作为输入框的值
defineProps({
  modelValue: String
});
</script>
