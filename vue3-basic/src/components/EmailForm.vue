<template>
  <div class="email-form">
    <h3>发送邮件表单</h3>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">收件人邮箱</label>
        <input
          id="email"
          type="email"
          v-model="form.email"
          placeholder="请输入收件人邮箱"
          required
        />
      </div>

      <div class="form-group">
        <label for="title">邮件标题</label>
        <input
          id="title"
          type="text"
          v-model="form.title"
          placeholder="请输入邮件标题"
          required
        />
      </div>

      <div class="form-group">
        <label for="content">邮件内容</label>
        <textarea
          id="content"
          v-model="form.content"
          placeholder="请输入邮件内容"
          required
        ></textarea>
      </div>

      <button type="submit" class="submit-button">发送邮件</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

// 使用 reactive 初始化表单数据
const form = reactive({
  email: "",
  title: "",
  content: "",
});

// 定义 emit 事件
const emit = defineEmits<{
  "submit-form": [any];
}>();

// 表单提交事件
const submitForm = () => {
  emit("submit-form", form); // 将表单数据传递给父组件
};
</script>
<style scoped>
.email-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #4caf50;
}

textarea {
  resize: vertical;
  height: 100px;
}

.submit-button {
  width: 100%;
  padding: 10px 0;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
