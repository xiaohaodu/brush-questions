<template>
  <el-form :model="user" class="register" label-position="left" label-width="5vw">
    <div class="head">
      <div class="register_text">注册</div>
      <router-link to="/login" class="to_login">登录</router-link>
    </div>
    <el-form-item label="账号">
      <el-input v-model="user.username" type="text" placeholder="Please input your username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="user.password" type="password" :show-password=true placeholder="Please input your password" />
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="user.password_again" type="password" :show-password=true
        placeholder="Please input your password again" />
    </el-form-item>
    <el-button @click.prevent native-type="submit" @click="register">注册</el-button>
  </el-form>
</template>

<script>
import { register } from "@/network/register/register";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: "register",
  data() {
    return {
      user: {
        username: '',
        password: '',
        password_again: ''
      }
    };
  },
  methods: {
    async register() {
      const that = this;
      if (that.user.password === that.user.password_again) {
        const { data: res } = await register(that.user);
        if (res.message) {
          ElMessage({
            message: res.message,
            grouping: true,
            type: 'error',
          });
        } else {
          ElMessage({
            message: res,
            grouping: true,
            type: 'success',
          });
          that.$router.push('/login');
        }
      } else {
        ElMessage({
          message: '两次输入密码不一致',
          grouping: true,
          type: 'error',
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/theme/theme";

.register {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url("../../assets/register_bac.png");
  background-size: 100vw 110vh;
  @include theme-color;

  :deep(.el-form-item__label) {
    color: aliceblue;
    @include theme-color;
  }

  .el-form-item {
    padding-right: 4.25vw;
  }

  .el-message {
    float: top;
  }

  .head {
    display: flex;
    width: 23vw;
    line-height: 100%;
    padding-bottom: 1.5vh;
    font-family: "Agency FB", serif;

    .register_text {
      color: white;
      @include theme-color;
    }

    .to_login {
      padding-left: 3vw;
      color: beige;
      @include theme-color;
    }
  }
}
</style>