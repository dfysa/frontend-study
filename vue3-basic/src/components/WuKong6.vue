<template>
  <div>
    <h1>装备管理系统</h1>

    <!-- 将 input 和 button 包裹在一个 div 中 -->
    <div class="container">
      <!-- 装备名称输入框，使用 v-model 双向绑定 -->
      <input
        v-model="newEquipment"
        placeholder="请输入装备名称"
      />

      <!-- 按钮：点击后将装备添加到列表 -->
      <button @click="addEquipment">添加装备</button>
    </div>

    <!-- 装备列表渲染，使用 v-for 渲染装备列表 -->
    <ul>
      <li v-for="(item, index) in equipmentList" :key="index">
        {{ item }}
        <!-- 删除按钮，点击后删除该装备 -->
        <button class="delete-btn" @click="removeEquipment(index)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 使用 ref 定义响应式的变量
const newEquipment = ref(''); // 装备名称输入框绑定的变量
const equipmentList = ref<string[]>([]); // 装备列表

// 添加装备到列表的函数
const addEquipment = () => {
  if (newEquipment.value) {
    equipmentList.value.push(newEquipment.value); // 将输入框的装备名称添加到列表中
    newEquipment.value = ''; // 清空输入框
  }
};

// 删除指定索引的装备
const removeEquipment = (index: number) => {
  equipmentList.value.splice(index, 1); // 根据索引从列表中移除装备
};
</script>

<style scoped>
/* 样式 */
h1 {
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

input {
  padding: 5px;
  margin-right: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}

ul {
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
  max-width: 300px;
  margin: 0 auto;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
</style>
