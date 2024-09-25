<template>
  <div>
    <EmailForm @submit-form="handleSubmit"></EmailForm>
    <p v-if="submitData">提交的表单数据是：{{ submitData }}</p>
    <p v-if="errorMessage" style="color: red">错误：{{ errorMessage }}</p>
    <p v-if="successMessage" style="color: green">{{ successMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EmailForm from "./EmailForm.vue";
import axios, { AxiosError } from "axios";

// 定义表单提交的数据对象
const submitData = ref(null);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleSubmit = async (data: {
  email: string;
  title: string;
  content: string;
}) => {
  if (!isValidEmail(data.email)) {
    errorMessage.value = "无效的邮箱地址";
    return;
  }

  const emailData = {
    to: data.email,
    subject: data.title,
    body: data.content,
  };

  try {
    await axios.post("http://localhost:8080/mail", emailData);
    successMessage.value = "邮件已发送";
    // 清理表单数据
    data.email = "";
    data.title = "";
    data.content = "";
  } catch (error) {
    const axiosError = error as AxiosError;
    // errorMessage.value = "发送邮件失败: " + (axiosError.response?.data?.message || axiosError.message || "未知错误");
  }
};
</script>

<style scoped>
/* 可以根据需要添加样式 */
</style>
