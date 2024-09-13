<template>
  <div class="container">
    <h2>当前形态：{{ currentForm }}</h2>
    <button @click="toggleForm" class="button">切换形态</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentForm = ref<string>("齐天大圣");

const toggleForm = () => {
  currentForm.value = currentForm.value === "齐天大圣" ? "孙悟空" : "齐天大圣";
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  max-width: 300px;
  margin: 50px auto;
}

h2 {
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
}

.button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
