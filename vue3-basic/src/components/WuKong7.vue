<template>
  <div class="scroll-demo">
    <button @click="scrollToSkills">滚动到技能展示</button>
      <div class="content">
        <div ref="skillsSection" class="skills">
          <h2>技能展示</h2>
          <p>技能详细内容...</p>
        </div>
      </div>

       
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义一个 ref 来引用技能展示区域的 DOM 元素
const skillsSection = ref<HTMLElement | null>(null);

// 滚动到技能展示区域的方法
const scrollToSkills = () => {
  
    skillsSection.value?.scrollIntoView({ behavior: 'smooth' });
 
};
</script>

<style scoped>
.scroll-demo{
  text-align: center;
  margin-top: 20px;
}


.skills {
  margin-top: 1000px;
  background-color: #f1f1f1;
  padding: 20px;
  border-radius:8px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover{
   background-color: #388e3c;
}
</style>
