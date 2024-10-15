import { ref } from "vue";

export function useSmsSender() {
  const isSending = ref(false);
  const message = ref<string>("");

  const sendSms = async (phoneNumber: string) => {
    if (isSending.value) return;
    isSending.value = true;
    message.value = "正在发送短信...";

    // 模拟发送短信请求
    setTimeout(() => {
      message.value = `短信已成功发送至${phoneNumber}`;
      isSending.value = false;
    }, 2000);
  };

  return { isSending, message, sendSms };
}
