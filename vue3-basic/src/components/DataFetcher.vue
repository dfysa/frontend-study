<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

//定义状态
const data = ref<string | null>(null);
const loading = ref(true);

//模拟异步请求
const fetchData = async () => {
  loading.value = true;
  //模拟2秒延迟
  await new Promise((resolve) => setTimeout(resolve, 2000));
  data.value = "加载完成";
  loading.value = false;
};

//组件挂载的生命周期，加载数据
onMounted(() => {
  console.log("组件挂载，开始请求数据。。。");
  fetchData();
});

//组件卸载的生命周期，执行清理操作
onUnmounted(() => {
  console.log("组件卸载，清理资源");
});
</script>

<style scoped></style>
