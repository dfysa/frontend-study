import { defineStore } from "pinia";
import { ref } from "vue"; // 用于响应式状态
import axios from "axios";

interface AuthStore {
  sendCode: (phone: string) => Promise<void>;
  login: (phone: string, code: string) => Promise<void>;
  countdown: number; // 倒计时的秒数
  isSending: boolean; // 是否正在发送验证码
  startCountdown: (duration: number) => void; // 开始倒计时
}

// 定义返回类型为 AuthStore 的 Pinia store
export const useAuthStore = defineStore("auth", (): AuthStore => {
  const countdown = ref<number>(0); // 倒计时的秒数
  const isSending = ref<boolean>(false); // 是否正在发送验证码

  // 开始倒计时的函数
  const startCountdown = (duration: number) => {
    if (countdown.value > 0) return; // 如果倒计时没有结束，则不再启动

    countdown.value = duration;
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer); // 倒计时结束时清除定时器
      }
    }, 1000);
  };

  // 发送验证码函数
  const sendCode = async (phone: string): Promise<void> => {
    if (countdown.value > 0) return; // 如果倒计时还在继续，阻止再次发送

    isSending.value = true; // 禁用按钮以防止重复点击
    try {
      // 请求后端 API 接口，传递 phone 参数
      await axios.post(`http://localhost:8080/sms/send?phone=${phone}`);
      // 开始 60 秒倒计时
      startCountdown(60);
    } catch (error) {
      console.error("发送验证码失败:", error);
    } finally {
      isSending.value = false; // 无论成功或失败，都恢复按钮状态
    }
  };

  // 登录函数
  const login = async (phone: string, code: string): Promise<void> => {
    try {
      const res = await axios.post(
        `http://localhost:8080/user/login?phone=${phone}&code=${code}`
      );
      // 登录成功的逻辑
      console.log("登录成功");
      localStorage.setItem("token", res.data.data.accessToken);
      // 在这里可以添加逻辑，比如保存 token，导航到个人中心等
    } catch (error) {
      console.error("登录失败", error);
    }
  };

  return {
    sendCode,
    login,
    countdown, // 返回响应式的 countdown
    isSending, // 返回响应式的 isSending
    startCountdown, // 开始倒计时的函数
  };
});
