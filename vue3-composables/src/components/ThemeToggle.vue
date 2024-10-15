<template>
  <div :class="['theme-toggle', { dark: isDark }]">
    <div 
      class="toggle-switch"
      :class="{ dark: isDark }" 
      @click="toggleTheme()"
    >
      <div class="toggle-thumb"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDark, useToggle } from "@vueuse/core";

// 使用 VueUse 的 useDark 和 useToggle 控制暗黑模式
const isDark = ref(useDark());              // 包装为 ref，确保其响应式
const toggleTheme = useToggle(isDark);      // 切换主题的函数
</script>

<style scoped>
/* 基础样式 */
.theme-toggle {
  display: flex;
  height: 100vh;
  background-color: #fff;
  transition: background-color 0.5s ease; /* 背景色切换的渐变动画 */
  justify-content: center;
  align-items: center;
}

/* 暗黑模式背景色 */
.theme-toggle.dark {
  background-color: #222;
}

/* 开关样式 */
.toggle-switch {
  width: 60px;
  height: 30px;
  background-color: #ccc;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 开关背景色渐变 */
}

.toggle-switch .toggle-thumb {
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2.5px;
  left: 2.5px;
  transition: left 0.3s ease; /* 滑块位置的渐变动画 */
}

/* 暗黑模式下的开关颜色和滑块位置 */
.toggle-switch.dark {
  background-color: #333; /* 切换到暗黑模式的背景色渐变 */
}

.toggle-switch.dark .toggle-thumb {
  left: calc(100% - 27.5px); /* 滑块移动到右边的渐变动画 */
}
</style>
