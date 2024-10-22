<template>
  <div>
    <h1>记账应用</h1>

    <!-- 添加记录 -->
    <div class="add-transaction">
      <input type="number" v-model.number="newTransactionAmount" placeholder="金额" />
      <input type="text" v-model="newTransactionDescription" placeholder="描述" />
      <select v-model="newTransactionType">
        <option value="income">收入</option>
        <option value="expense">支出</option>
      </select>
      <button @click="addNewTransaction">添加记录</button>
    </div>

    <!-- 显示记录 -->
    <ul>
      <h2>交易记录</h2>
      <li v-for="(transaction, index) in financeStore.transactions" :key="transaction.id">
        <span>{{ transaction.description }} - {{ transaction.amount }} 元 ({{ transaction.type === 'income' ? '收入' : '支出' }})</span>
        <button @click="financeStore.removeTransaction(index)">删除</button>
      </li>
    </ul>

    <!-- 显示总收入、总支出和余额 -->
    <div class="summary">
      <h2>统计信息</h2>
      <p>总收入: {{ financeStore.totalIncome }} 元</p>
      <p>总支出: {{ financeStore.totalExpense }} 元</p>
      <p>当前余额: {{ financeStore.balance }} 元</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFinanceStore } from '../stores/useFinanceStore';

const financeStore = useFinanceStore();

const newTransactionType = ref<"income" | "expense">("income");
const newTransactionAmount = ref(0);
const newTransactionDescription = ref("");

const addNewTransaction = () => {
  if (newTransactionAmount.value > 0 && newTransactionDescription.value.trim()) {
    financeStore.addTransaction(newTransactionType.value, newTransactionAmount.value, newTransactionDescription.value);
    newTransactionAmount.value = 0;
    newTransactionDescription.value = "";
  }
};
</script>

<style scoped>
.add-transaction {
  margin-bottom: 20px;
}

.add-transaction input,
.add-transaction select {
  margin-right: 10px;
}

.summary {
  margin-top: 20px;
}

button {
  margin-left: 10px;
}
</style>
