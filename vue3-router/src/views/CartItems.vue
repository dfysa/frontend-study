<template>
  <div>
    <h3>购物车物品</h3>
    <ul>
      <li v-for="(item, index) in cartItems" :key="index">
        {{ item.title }}
        <button @click="removeFromCart(index)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const cartItems = ref<{ id: number; title: string }[]>([]);

onMounted(() => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cartItems.value = cart;
});

const removeFromCart = (index: number) => {
  cartItems.value.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
};
</script>

<style scoped></style>
