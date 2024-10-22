<template>
  <el-container class="login-page">
    <el-form :model="form" @submit.prevent="login">
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" />
      </el-form-item>
      <el-button type="primary" native-type="submit">登录</el-button>
    </el-form>
  </el-container>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

// 初始化表单数据
const form = reactive({ username: "", password: "" });
const router = useRouter();

// 登录逻辑

const login = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/user/login', {
      username: form.username, // 注意这里的字段要与后端一致
      password: form.password
    });
    
    if (response.data.code === 200) {
      const token = response.data.data.token; // 获取 Token
      localStorage.setItem('token', token); // 将 Token 存储到 localStorage
      router.push('/'); // 登录成功后跳转
    } else {
      console.error(response.data.msg); // 处理错误信息
    }
  } catch (error) {
    console.error("登录失败", error);
  }
};

</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
