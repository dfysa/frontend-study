<template> 
  <div>
    <h2>待办清单</h2>
    <input type="text" v-model="newTodoText" placeholder="请输入新的待办事项">
    <button @click="myAddTodo">添加</button>

    <ul>
      <li v-for="(todo, index) in myTodos" :key="todo.id" @click="myToggleTodo(index)" :class="{ completed: todo.completed }">
        {{ todo.text }}
        <!-- 新增切换状态按钮 -->
        <button class="status-btn" @click.stop="myToggleTodo(index)">
          {{ todo.completed ? '已完成' : '未完成' }}
        </button>
        <button @click.stop="myRemoveTodo(index)">删除</button>
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../stores/useTodo';

const todoStore = useTodoStore();

const newTodoText = ref('');

const myAddTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value);
    newTodoText.value = ''; // 清空输入框
  }
};

const myRemoveTodo = (index: number) => {
  todoStore.removeTodo(index);
};

const myToggleTodo = (index: number) => {
  todoStore.toggleTodo(index);
};

const myTodos = todoStore.todos;
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}

.status-btn {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.status-btn:hover {
  background-color: #e0e0e0;
  border-color: #999;
}

button {
  margin-left: 10px;
}
</style>
