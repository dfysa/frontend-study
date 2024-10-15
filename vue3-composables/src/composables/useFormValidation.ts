import { ref } from "vue";

interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
}

export function useFormValidation() {
  const errors = ref<{ [key: string]: string }>({});
  const rules = ref<{ [key: string]: ValidationRule[] }>({});

  // 验证单个字段
  const validateField = (field: string, value: any) => {
    errors.value[field] = ""; // 清空之前的错误信息

    if (rules.value[field]) {
      for (const rule of rules.value[field]) {
        if (!rule.validate(value)) {
          errors.value[field] = rule.message; // 设置具体的错误消息
          break; // 只显示第一个不符合的规则提示
        }
      }
    }
  };

  // 验证整个表单
  const validateForm = (formData: { [key: string]: any }) => {
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });
  };

  return { errors, rules, validateField, validateForm };
}
