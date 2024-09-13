<template>
  <div>
    <p>当前血量：{{ currentHp }} / {{ maxHp }}</p>
    <div class="progress" :style="progressBarStyle"></div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 定义响应式变量
const currentHp = ref(70)
const maxHp = ref(100)

// 计算属性：血量百分比
const hpPercentage = computed(() => {
  return (currentHp.value / maxHp.value) * 100
})

// 计算属性：动态调整进度条的颜色和宽度
const progressBarStyle = computed(() => {
  let bgColor = 'green'

  if (hpPercentage.value <= 50) {
    bgColor = 'orange'
  }
  if (hpPercentage.value <= 20) {
    bgColor = 'red'
  }

  return {
    width: hpPercentage.value + '%',
    backgroundColor: bgColor,
  }
})


</script>

<style scoped>
.progress {
  border-radius: 15px;
  transition: width 0.3s ease-in-out, background-color 0.3s ease-in-out;
  height: 25px;
}
</style>
