<template>
  <div>
    <el-container style="height: 100vh">
      <el-header>
        <h1>待办事项</h1>
      </el-header>
      <el-main>
        <el-input
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="输⼊待办事项"
          style="margin-bottom: 20px"
        />
        <div>
          <el-card
            v-for="todo in todos"
            :key="todo.id"
            class="todo-item"
            style="margin-bottom: 10px"
          >
            <div style="display: flex; align-items: center">
              <el-checkbox v-model="todo.completed" />
              <span style="margin-left: 10px">{{ todo.text }}</span>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {
 ElContainer,
 ElHeader,
 ElMain,
 ElInput,
 ElCard,
 ElCheckbox,
} from 'element-plus'
// 定义待办事项的类型
interface Todo {
 id: number
 text: string
 completed: boolean
}
// 定义状态变量
const newTodo = ref<string>('')
const todos = ref<Todo[]>([])
// 添加新的待办事项
const addTodo = () => {
 if (newTodo.value.trim()) {
 todos.value.push({ id: Date.now(), text: newTodo.value, completed: false })
 newTodo.value = ''
 }
}
</script>
<style>
.todo-item {
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style>
