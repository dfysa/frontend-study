<template>
    <div>
<h3>用户信息设置</h3>
          <button @click="handleLogout">登出</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  // 清除登录状态
  localStorage.removeItem('isLoggedIn');
  router.push('/login'); // 跳转到登录页
};
</script>

<style scoped>

</style>