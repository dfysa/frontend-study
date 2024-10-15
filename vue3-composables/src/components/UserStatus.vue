<template>
  <div class="user-status">
    <h2>用户状态</h2>
    <p>电池电量: {{ (batteryLevel * 100).toFixed(0) }}%</p>
    <p v-if="batteryCharging">电池状态: 正在充电</p>
    <p v-else>电池状态: 不在充电</p>
    <p v-if="isOnline">网络状态: 在线</p>
    <p v-else>网络状态: 离线</p>
    <p>用户状态: {{ idle ? '空闲' : '活动' }}</p>
  </div>
</template>

<script setup lang="ts">
import { useUserStatus } from '../composables/useUserStatus'; // 导入封装的组合式函数

// 使用封装的组合式函数
const { batteryLevel, batteryCharging, isOnline, idle } = useUserStatus();
</script>

<style scoped>
.user-status {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 300px;
  margin: 20px auto;
  background-color: #f9f9f9;
}
</style>
