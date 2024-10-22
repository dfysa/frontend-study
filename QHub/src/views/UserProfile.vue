<template>
  <el-container class="user-profile">
    <h2>用户信息</h2>
    <p>用户名：{{ user.username }}</p>
    <p>邮箱：{{ user.email }}</p>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const user = ref({ username: "", email: "" });

const fetchUserInfo = async () => {
  try {
    const response = await axios.get("/api/v1/user");
    user.value = response.data;
  } catch (error) {
    console.error("加载用户信息失败", error);
  }
};

onMounted(fetchUserInfo);
</script>

<style scoped>
.user-profile {
  padding: 20px;
}
</style>
