<template>
  <div>
    <p>原价：{{ price }}</p>
    <p>折扣：{{ discount }}</p>
    <p>折后价：{{ discountedPrice }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
// 定义商品原价
const price = ref<number>(100);
// 定义折扣
const discount = ref<number>(0.8);
// 定义⼀个计算属性来计算折后价格
const discountedPrice = computed(() => {
  return price.value * discount.value;
});
</script>
