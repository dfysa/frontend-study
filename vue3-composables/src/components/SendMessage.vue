<template>
  <div>
    <input v-model="phoneNumber" placeholder="输入手机号" />
    <button @click="sendSms(phoneNumber)" :disabled="isSending">发送短信</button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSmsSender } from '../composables/useSendmessage';

const phoneNumber = ref('');
const { isSending, message, sendSms } = useSmsSender();
</script>
