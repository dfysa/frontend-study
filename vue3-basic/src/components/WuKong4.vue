<template>
  <div class="attack-calculator">
    <div class="input-group">
基础攻击力：
      <input id="baseAttack" type="number" v-model="baseAttack" />
    </div>
    <div class="input-group">
装备加成：
      <input id="gearBonus" type="number" v-model="gearBonus" />
    </div>
    <p class="total-attack">总攻击力：<span>{{ totalAttack }}</span></p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const baseAttack = ref<number>(50);
const gearBonus = ref<number>(20);

const totalAttack = computed(() => {
  return baseAttack.value + gearBonus.value;
});
</script>

<style scoped>
.attack-calculator {
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
 
}

.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.input-group label {
  font-weight: bold;
  margin-right: 10px;
  font-size: 1.1em;
}

.input-group input {
  width: 100px;
  padding: 5px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.total-attack {
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

 
</style>
