<template>
  <div class="container">
    <h2>姓名: {{ name }}</h2>
    <p>称号: {{ title }}</p>
    <p>简介: {{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 定义响应式变量
const name = ref<string>("孙悟空");
const title = ref<string>("齐天大圣");
const description = ref<string>("孙悟空，亦称美猴王，是中国古典小说《西游记》中的主要角色，拥有强大的法力和不屈的精神。当年,他被押去斩妖台,刀砍斧别,枪刺剑刳,毫发无伤。如今,他却用自己换了你来。");

console.log(name.value, title.value, description.value);
</script>

<style scoped>
/* 设置容器的样式，使其内容居中并添加背景色 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 标题样式 */
h2 {
  color: #ff6347;
  font-weight: bold;
  margin-bottom: 10px;
}

/* 文本样式 */
p {
  color: #333;
  font-size: 16px;
  margin: 5px 0;
}
</style>
