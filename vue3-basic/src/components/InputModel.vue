<template>
  <div>
    <input v-model="name" placeholder="请输⼊姓名" />
    <p>您输⼊的姓名是：{{ name }}</p>

    <input type="checkbox" v-model="isChecked" /> 勾选此项
    <p>复选框状态：{{ isChecked ? "已勾选" : "未勾选" }}</p>

    <input type="radio" v-model="selectedOption" value="A" /> 选项 A
    <input type="radio" v-model="selectedOption" value="B" /> 选项 B
    <p>您选择的选项是：{{ selectedOption }}</p>

    <select v-model="selectedItem">
      <option disabled value="">请选择⼀个选项</option>
      <option value="苹果">苹果</option>
      <option value="⾹蕉">⾹蕉</option>
      <option value="橘⼦">橘⼦</option>
    </select>
    <p>您选择的⽔果是：{{ selectedItem }}</p>

    <label
      ><input type="checkbox" v-model="selectedFruits" value="苹果" />
      苹果</label
    >
    <label
      ><input type="checkbox" v-model="selectedFruits" value="⾹蕉" />
      ⾹蕉</label
    >
    <label
      ><input type="checkbox" v-model="selectedFruits" value="橘⼦" />
      橘⼦</label
    >
    <p>您选择的⽔果：{{ selectedFruits.join(", ") }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
// 定义双向绑定的状态
const name = ref<string>(""); // 初始值为空字符串

// 定义复选框的绑定状态
const isChecked = ref<boolean>(false); // 初始状态为未勾选

// 定义单选框的选项状态
const selectedOption = ref<string>("A"); // 初始值为选项 A

// 定义下拉菜单的选项状态
const selectedItem = ref<string>(""); // 初始值为空字符串

// 选中的⽔果会以数组的形式存储
const selectedFruits = ref<string[]>([]); // 初始值为空数组
</script>
