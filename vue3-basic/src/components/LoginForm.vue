<template>
  <el-card class="login-card">
    <h2>登录表单</h2>
    <el-form label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input
          v-model="password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>

      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form>
  </el-card>
</template>

<style scoped>
.login-card {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.el-form-item {
  margin-bottom: 15px;
}

.el-button {
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  width: 40%;
}
</style>
<script setup lang="ts">
import { ref } from "vue";

// 定义表单的响应式数据
const username = ref("");
const password = ref("");

// 模拟表单提交处理函数
const submitForm = () => {
  console.log("提交的数据", {
    username: username.value,
    password: password.value,
  });
};
</script>
