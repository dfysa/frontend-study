<template>
  <div class="cart">
    <h2>购物车</h2>
    <ul>
      <li v-for="(item, index) in cartItems" :key="index">
        <img :src="getURL(item.cover)" alt="封面图片" class="cover" />
        <div class="item-info">
          <span class="title">{{ item.title }}</span>

          <div class="price-quantity">
            <span class="price">{{ item.price }} 元</span>

            <div class="quantity-controls">
              <button @click="decreaseQuantity(index)">-</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)">+</button>
            </div>
          </div>
        </div>

        <button class="delete" @click="removeFromCart(index)">删除</button>
      </li>
    </ul>

    <div class="total">
      <strong>总价：</strong> {{ totalPrice }} 元
    </div>

    <router-link to="/cart/orders" @click="handleCheckout" class="checkout-button">
      去结算 &gt;&gt;
    </router-link>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const getURL = (url: string) => new URL(`${url}`, import.meta.url).href;

const cartItems = ref([]);

onMounted(() => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cartItems.value = cart;
});

const clearCart = () => {
  cartItems.value = [];
  updateLocalStorage();
};

const handleCheckout = () => clearCart();

const increaseQuantity = (index: number) => {
  cartItems.value[index].quantity += 1;
  updateLocalStorage();
};

const decreaseQuantity = (index: number) => {
  const item = cartItems.value[index];
  if (item.quantity > 1) item.quantity -= 1;
  else cartItems.value.splice(index, 1);
  updateLocalStorage();
};

const removeFromCart = (index: number) => {
  cartItems.value.splice(index, 1);
  updateLocalStorage();
};

const updateLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
};

const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
);
</script>

<style scoped>
.cart {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cart h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.cart ul {
  list-style-type: none;
  padding: 0;
}

.cart li {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.cover {
  width: 60px;
  height: 90px;
  margin-right: 15px;
  object-fit: cover;
  border-radius: 5px;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.price-quantity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #ff4d4f;
  margin-right: 20px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top:-35px ;
}


.quantity-controls button {
  padding: 5px 10px;
  background-color: #3baee0;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-controls button:hover {
  background-color: #359ac0;
}

.quantity {
  margin: 0 10px;
  font-weight: bold;
}

button.delete {
  margin-top:px;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.delete:hover {
  background-color: #ff7875;
}

.total {
  margin-top: 20px;
  font-weight: bold;
  text-align: right;
}

.checkout-button {
  display: block;
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #3baee0;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.checkout-button:hover {
  background-color: #359ac0;
}
</style>
