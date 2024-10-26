import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

interface User {
  id: number;
  phone: string;
  avatar: string;
  nickname: string;
  bonus: number;
}

interface UserStore {
  user: User | null;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = defineStore("user", (): UserStore => {
  const user = ref<User | null>(null); // 使用 ref 定义 user 状态

  // 从本地存储中加载用户信息
  const loadUserFromLocalStorage = (): void => {
    const userData = localStorage.getItem("user");
    if (userData) {
      user.value = JSON.parse(userData);
    }
  };

  const fetchUser = async (): Promise<void> => {
    try {
      const response = await axios.get("http://localhost:8080/user/info", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data.data);
      user.value = response.data.data;
      localStorage.setItem("user", JSON.stringify(user.value));
    } catch (error) {
      console.error("获取用户信息失败：", error);
    }
  };

  const clearUser = (): void => {
    user.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  loadUserFromLocalStorage();

  return {
    user, // 直接返回 ref 对象
    fetchUser,
    clearUser,
  };
});
