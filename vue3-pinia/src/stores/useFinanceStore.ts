import { defineStore } from "pinia";
import { ref, computed } from "vue";

// 定义每条记录的类型
interface Transaction {
  id: number;
  type: "income" | "expense"; // 收入或支出
  amount: number; // 金额
  description: string; // 描述
}

export const useFinanceStore = defineStore(
  "finance",
  () => {
    const transactions = ref<Transaction[]>([]);

    // 添加记录
    const addTransaction = (
      type: "income" | "expense",
      amount: number,
      description: string
    ) => {
      const newTransaction: Transaction = {
        id: Date.now(),
        type,
        amount,
        description,
      };
      transactions.value.push(newTransaction);
    };

    // 删除记录
    const removeTransaction = (index: number) => {
      transactions.value.splice(index, 1);
    };

    // 计算总收入
    const totalIncome = computed(() =>
      transactions.value
        .filter((transaction) => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    );

    // 计算总支出
    const totalExpense = computed(() =>
      transactions.value
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    );

    // 计算余额，设置初始值为 1000
    const initialBalance = 1000;
    const balance = computed(
      () => initialBalance + totalIncome.value - totalExpense.value
    );

    return {
      transactions,
      addTransaction,
      removeTransaction,
      totalIncome,
      totalExpense,
      balance,
    };
  },
  {
    persist: {
      key: "my-list-store",
      storage: localStorage,
    },
  }
);
