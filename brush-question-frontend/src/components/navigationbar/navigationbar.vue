<template>
  <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="true">
    <el-menu-item index="0">
      <img src="../../assets/logo.svg" class="logo" alt="logo" @click="() => {
        if (this.isLogin) { this.$router.push('/books'); }
      }">
    </el-menu-item>
    <el-menu-item id="title" disabled>{{ title }}</el-menu-item>
    <div class="flex-grow"></div>
    <template v-if="!isLogin">
      <el-menu-item index="1">
        <el-icon>
          <User />
        </el-icon>登录
      </el-menu-item>
    </template>
    <template v-if="isLogin">
      <el-sub-menu index="1">
        <template #title>
          <img :src="user.user_pic" class="user_pic" :title="user.username">
        </template>
        <el-menu-item index="1.1">
          <template #title>
            <span>用户名：</span>
            <span v-text="user.username" style="color: #141414"></span>
          </template>
        </el-menu-item>
        <!-- <el-menu-item index="1.2">
          <template #title>
            <span @click="goWrong">
              我的错题集
            </span>
          </template>
        </el-menu-item>
        <el-menu-item index="1.3">
          <template #title>
            <span>
              我的订阅
            </span>
          </template>
        </el-menu-item> -->
        <el-menu-item index="1.4">
          <template #title>
            <span @click="signOut">
              退出登录
            </span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </template>
    <!-- <el-menu-item index="2">
      <el-icon>
        <ShoppingCart />
      </el-icon>
      <template #title>订阅</template>
    </el-menu-item> -->
    <el-menu-item index="3">
      <mySwitch></mySwitch>
    </el-menu-item>
  </el-menu>
</template>

<script>
import mySwitch from "@/components/switch/switch";
import { get_user_info } from "@/network/user/user";
import { ElMessage } from "element-plus";
export default {
  name: 'navigationBar',
  components: { mySwitch },
  data() {
    return {
      isLogin: false,
      user: {},
      title: '',
      pageTitleDom: document.getElementsByTagName('title')
    };
  },
  watch: {
    $route(to) {
      const toPath = to.path;
      if (toPath !== '/login' && toPath !== '/register') {
        this.refresh();
      }
      if (toPath == '/login') {
        this.title = '欢迎登录您的账号进入在线题库练习';
      } else if (toPath == '/register') {
        this.title = '欢迎注册您的账号进入在线题库练习';
      } else if (toPath == '/books') {
        this.title = '在线题库练习';
      } else if (toPath == '/passages') {
        this.title = `在线题库练习-${to.query.book}`;
      }
      this.pageTitleDom[0].innerText = `${this.title}-Marxism`;
    },
  },
  methods: {
    isLogins() {
      this.isLogin = (localStorage.Authorization !== null && localStorage.Authorization !== undefined);
    },
    goWrongQuestion() {
      this.$router.push('/wrongQuestion');
    },
    async getUser() {
      const { data: res } = await get_user_info(localStorage.user_id);
      if (res.status === 1) {
        return ElMessage({
          message: res.message,
          grouping: true,
          type: 'error',
        });
      }
      this.user = res.data;
      // console.log(this.user)
    },
    signOut() {
      localStorage.clear();
      this.isLogin = false;
      this.$router.push('/login');
    },
    init() {
      if (localStorage.Authorization === null || localStorage.Authorization === undefined) {
        this.$router.push('/login');
      }
      this.isLogins();
      if (this.isLogin !== false) {
        this.getUser();
      }
    },
    refresh() {
      if (localStorage.Authorization === null || localStorage.Authorization === undefined) {
        this.$router.push('/login');
      }
      this.isLogins();
      if (this.isLogin !== false) {
        this.getUser();
      }
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/theme/theme";

.el-menu-demo {
  position: fixed;
  width: 100vw;
  height: 8vh;
  top: 0;
  user-select: none;
  @include theme-color;

  .flex-grow {
    flex-grow: 0.9;
  }

  .logo {
    height: 6vh;
  }
}

.user_pic {
  height: 5vh;
  border-radius: 2.5vh;
}

.el-menu--horizontal>.el-menu-item {
  @include theme-color;
}
</style>
