<template>
  <el-container class="auth-page">
    <div class="form-container">
      <h2>{{ isLogin ? '登录' : '注册' }}</h2>
      <el-form :model="form" @submit.prevent="handleSubmit">
        <el-form-item v-if="!isLogin" label="邮箱" :rules="[{ required: true, message: '请输入邮箱', trigger: 'blur' }]">
          <el-input  class="myinput"  v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item v-if="!isLogin" label="验证码" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
          <el-input  class="code input-anothor" v-model="form.code" placeholder="请输入验证码" />
          <el-button @click="sendCode" type="primary">发送验证码</el-button>
        </el-form-item>
        <el-form-item label="用户名" :rules="[{ required: true, message: '请输入账户', trigger: 'blur' }]">
          <el-input  class="myinput" v-model="form.username" placeholder="请输入账户" />
        </el-form-item>
        <el-form-item label="昵称" v-if="!isLogin" :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' }]">
          <el-input  class="myinput" v-model="form.accountname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="密码" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input  class="myinput" type="password" v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-button class="login" type="primary" native-type="submit">{{ isLogin ? '登录' : '注册' }}</el-button>
        <div class="toggle-link">
          <span @click="toggleForm">{{ isLogin ? '还没有账号？点击注册' : '已经有账号？点击登录' }}</span>
        </div>
      </el-form>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";

// 初始化表单数据
const form = reactive({ username: "", password: "", email: "", code: "", accountname: "" });
const router = useRouter();
const isLogin = ref(true); // 是否为登录状态

// 发送验证码
const sendCode = async () => {
  try {
    await axios.post('http://localhost:8080/api/v1/email/sendCode', {
      to: form.email
    });
    alert("验证码已发送");
  } catch (error) {
    console.error("发送验证码失败", error);
  }
};

// 登录逻辑
const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/user/login', {
      username: form.username,
      password: form.password
    });

    if (response.data.code === 200) {
      const { user, token } = response.data.data;
      localStorage.setItem('token', token); // 存储 token
      ElMessage.success('登录成功');
      // 跳转到首页或其他页面
      router.push('/'); // 根据你的路由结构修改
    } else {
      ElMessage.error(response.data.msg);
    }
  } catch (error) {
    console.error("登录失败", error.response ? error.response.data : error.message);
  }
};

// 注册逻辑
const handleRegister = async () => {
  try {
    const { email, code, username, password, accountname } = form;

    const   response = await axios.post(`http://localhost:8080/api/v1/user/register?email=${email}&code=${code}`, {
        username: username,
        password: password,
        email: email,
        code: code,
        avatar: "https://my-bucket-621.oss-cn-beijing.aliyuncs.com/a56c35f3-d126-4a13-b44f-2b0f47ad480e_ac16b0ca66cfc2d1ea41880a0ab40724.png",
        accountname: accountname, // 动态获取账号名
        createTime: formatDate, // 格式化创建时间
        updateTime: formatDate, // 格式化更新时间
        deleteFlag: null
      });



      
    if (response.data === "注册成功") {
      ElMessage.success('注册成功');
      location.reload(); // 刷新页面
    } else {
      console.error("错误信息:", response.data);
    }
  } catch (error) {
    console.error("注册失败", error.response ? error.response.data : error.message);
  }
};

// 登录或注册逻辑
const handleSubmit = async () => {
  if (isLogin.value) {
    await handleLogin();
  } else {
    await handleRegister();
  }
};

// 切换登录和注册状态
const toggleForm = () => {
  isLogin.value = !isLogin.value;
};

// 格式化日期为 "yyyy-MM-dd HH:mm:ss"
const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  return new Intl.DateTimeFormat('zh-CN', options).format(date).replace(/\//g, '-').replace(',', '');
};
</script>

 

<!-- <script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessage } from "element-plus";

// 初始化表单数据
const form = reactive({ username: "", password: "", email: "", code: "", accountname: "" });
const router = useRouter();
const isLogin = ref(true); // 是否为登录状态

// 发送验证码
const sendCode = async () => {
  try {
    await axios.post('http://localhost:8080/api/v1/email/sendCode', {
      to: form.email
    });
    alert("验证码已发送");
  } catch (error) {
    console.error("发送验证码失败", error);
  }
};





// 登录或注册逻辑
const handleSubmit = async () => {
  try {
    let response;
    if (isLogin.value) {
      // 登录逻辑
      response = await axios.post('http://localhost:8080/api/v1/user/login', {
        username: form.username,
        password: form.password
      });
    } else {
      // 注册逻辑，email 和 code 在查询参数中
      const { email, code, username, password, accountname } = form;

      console.log("请求体:", {
  username: form.username,
  password: form.password,
  email: form.email,
  code: form.code,
  avatar: "https://example.com/avatar.png",
  accountname: form.accountname,
});


      response = await axios.post(`http://localhost:8080/api/v1/user/register?email=${email}&code=${code}`, {
        username: username,
        password: password,
        email: email,
        code: code,
        avatar: "https://my-bucket-621.oss-cn-beijing.aliyuncs.com/a56c35f3-d126-4a13-b44f-2b0f47ad480e_ac16b0ca66cfc2d1ea41880a0ab40724.png",
        accountname: accountname, // 动态获取账号名
        createTime: formatDate(new Date()), // 格式化创建时间
        updateTime: formatDate(new Date()), // 格式化更新时间
        deleteFlag: null
      });
    }

   
    console.log("响应数据:", response.data); // 直接打印返回的数据

    if (response.data === "注册成功") {
      if (isLogin.value) {
        const token = response.data.token; // 根据你的需求获取 token
        localStorage.setItem('token', token); // 这部分如果不返回 token，可以忽略
      }

      ElMessage.success('注册成功');
       location.reload();
      //  router.go(0)
    } else {
      console.error("错误信息:", response.data); // 处理错误信息
    }
  } catch (error) {
    console.error("操作失败", error.response ? error.response.data : error.message);
  }
};

// 切换登录和注册状态
const toggleForm = () => {
  isLogin.value = !isLogin.value;
};

// 格式化日期为 "yyyy-MM-dd HH:mm:ss"
const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  return new Intl.DateTimeFormat('zh-CN', options).format(date).replace(/\//g, '-').replace(',', '');
};
</script> -->

<style scoped>
.el-form-item {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: flex-end; /* 使内容靠右 */
}

.el-form-item label {
  width: 100px; /* 设置统一标签宽度 */
  text-align: right; /* 标签右对齐 */
  margin-right: 10px; /* 标签和输入框之间的间距 */
}

.myinput {
  width: 300px; /* 设置输入框的固定宽度 */
  margin-left: auto;
}

.input-anothor{
   width: 100px; /* 设置输入框的固定宽度 */
  margin-left: auto;

}

.login {
  margin-left: 40%;
}

.el-form-item {
  text-align: center; /* 让表单项内容居中 */
}

.code {
  width: 59%;
}

 

.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 占满整个视口高度 */
  background-color: #f7f7f7; /* 背景色 */
}

.form-container {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.toggle-link {
  text-align: center;
  margin-top: 15px;
  cursor: pointer;
  color: #409EFF;
  font-size: 14px;
}

.toggle-link span:hover {
  text-decoration: underline;
}
</style>
