<template>
  <el-form :model="user" class="login" label-position="left">
    <div class="head">
      <div class="login_text">登录</div>
      <router-link :to="{ path: '/register' }" class="to_register">注册</router-link>
    </div>
    <el-form-item label="账号">
      <el-input v-model="user.username" type="text" placeholder="Please input your username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="user.password" type="password" :show-password=true placeholder="Please input your password" />
    </el-form-item>
    <el-button @click.prevent native-type="submit" @click="login">登录</el-button>
    <div style="margin-top: 5px;">初始化提供测试账号</div>
  </el-form>
</template>

<script>
import { login } from "@/network/login/login";
import { ElMessage } from "element-plus";
export default {
  name: 'loginPage',
  data() {
    return {
      user: {
        username: 'test',
        password: '187139',
      },
    };
  },
  methods: {
    async login() {
      const that = this;
      const { data: res } = await login(that.user);
      ElMessage({
        message: res.message,
        grouping: true,
        type: res.status === 0 ? 'success' : 'error',
      });
      console.log(res.status === 0);
      if (res.status === 0) {
        localStorage.Authorization = res.token;
        localStorage.user_id = res.id;
        that.$router.push('/books');
      }
    },
    init() {
      if (localStorage.Authorization !== null && localStorage.Authorization !== undefined) {
        this.$router.push('/books');
      }
    }
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/theme/theme";

.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url("../../assets/login_bac.png");
  background-size: 100vw 110vh;
  @include theme-color();

  .el-form-item {
    padding-right: 2.5vw;
  }

  .el-form-item__content:nth-child(2) {
    height: 5vh;
    width: 20vw;
    margin-bottom: 1.5vh;
  }

  .el-form-item__content:nth-child(3) {
    height: 5vh;
    width: 20vw;
    margin-top: 1.5vh;
  }

  :deep(.el-form-item__label) {
    color: aliceblue;
    @include theme-color;
  }

  .el-button {}

  .head {
    display: flex;
    width: 19.25vw;
    line-height: 100%;
    font-family: "Agency FB", serif;
    padding-bottom: 1.5vh;

    .login_text {
      color: white;
      @include theme-color;
    }

    .to_register {
      padding-left: 3vw;
      color: beige;
      @include theme-color;
    }
  }
}
</style>