<template>
  <div class="container">
    <h2>天命人技能列表</h2>
    <ul>
      <li v-for="skill in skills" :key="skill.name" class="skill-item">
        {{ skill.name }}
        <span class="status" :class="{ locked: skill.isLocked, unlocked: !skill.isLocked }">
          {{ skill.isLocked ? "已解锁" : "未解锁" }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Skill {
  name: string;
  isLocked: boolean;
}

const skills = ref<Skill[]>([
  { name: "定身术", isLocked: true },
  { name: "聚形散气", isLocked: true },
  { name: "铜头铁臂", isLocked: false },
    { name: "身外身", isLocked: false },
      { name: "安身法", isLocked: false }
]);
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

.skill-item {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  font-weight: bold;
}

.locked {
  color: green;
}

.unlocked {
  color: red;
}
</style>
