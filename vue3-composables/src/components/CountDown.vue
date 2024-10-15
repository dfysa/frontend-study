<template>
  <div>
    <p>倒计时：{{ timeLeft }}秒</p>
    <button @click="start">开始</button>
    <button @click="pause">暂停</button>
    <button @click="reset()">重置</button>
  </div>
</template>

<script setup lang="ts">
import { useCountdown } from '../composables/useCountDown';

const { timeLeft, start, pause, reset } = useCountdown(60);
</script>
