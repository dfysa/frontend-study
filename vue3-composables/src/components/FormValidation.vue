<template>
  <div>
    <div>
      <input v-model="formData.username" placeholder="用户名" />
      <span v-if="errors.username" class="error">{{ errors.username }}</span>
    </div>

    <div>
      <input v-model="formData.password" type="password" placeholder="密码" />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>

    <button @click="submitForm">提交</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFormValidation } from '../composables/useFormValidation';

const formData = ref({
  username: '',
  password: ''
});

const { errors, rules, validateForm } = useFormValidation();

// 定义验证规则和提示信息
rules.value = {
  username: [
    { validate: value => !!value, message: '用户名不能为空' },
    { validate: value => value.length >= 3, message: '用户名至少需要3个字符' },
  ],
  password: [
    { validate: value => !!value, message: '密码不能为空' },
    { validate: value => value.length >= 6, message: '密码至少需要6个字符' },
  ]
};

// 点击提交时验证表单
const submitForm = () => {
  validateForm(formData.value);
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 12px;
}
</style>
