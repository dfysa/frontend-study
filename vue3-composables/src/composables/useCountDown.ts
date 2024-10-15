import { ref, onUnmounted } from "vue";

export function useCountdown(initialTime = 60) {
  const timeLeft = ref<number>(initialTime);
  let timer: number | undefined;

  const start = () => {
    if (timer) return; // 防止重复启动
    timer = window.setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        clearInterval(timer);
        timer = undefined;
      }
    }, 1000);
  };

  const pause = () => {
    if (timer) {
      clearInterval(timer);
      timer = undefined; // 清除定时器并停止
    }
  };

  const reset = (newTime = initialTime) => {
    timeLeft.value = newTime;
    clearInterval(timer);
    timer = undefined;
  };

  onUnmounted(() => {
    clearInterval(timer);
  });

  return { timeLeft, start, pause, reset };
}
