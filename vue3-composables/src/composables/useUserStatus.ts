import { ref, onUnmounted } from "vue";
import { useBattery, useIdle } from "@vueuse/core";

export function useUserStatus() {
  const battery = useBattery();
  const isOnline = ref(navigator.onLine);
  const { idle } = useIdle(1 * 1 * 1000);

  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine;
  };

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  onUnmounted(() => {
    window.removeEventListener("online", updateOnlineStatus);
    window.removeEventListener("offline", updateOnlineStatus);
  });

  return {
    batteryLevel: battery.level,
    batteryCharging: battery.charging,
    isOnline,
    idle,
  };
}
