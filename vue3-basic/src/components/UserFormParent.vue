<template>
  <div>
    <UserForm @submit-form="handleSubmit"></UserForm>
    <p v-if="submitData">提交的表单数据是：{{ submitData }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserForm from "./UserForm.vue";
import axios from "axios";

//定义一个表单提交的数据对象
const submitData = ref(null);

// 处理子组件传递的数据
const handleSubmit = (data: any) => {
  submitData.value = data;
  axios.post("http://localhost:8080/mail", submitData.value).then((res) => {
    console.log("邮件已发送");
  });
};
</script>

<style scoped></style>
