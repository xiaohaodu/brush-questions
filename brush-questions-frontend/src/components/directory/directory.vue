<template>
  <transition name="el-zoom-in-top">
    <el-menu v-if="show" @select="goPassage" mode='vertical' :default-active="this.$store.state.chapter"
      class="el-menu-vertical-demo">
      <el-menu-item-group>
        <template #title>
          <span v-text="directory.book" style="display: inline-block; padding-right: 7px;"></span>
        </template>
        <el-menu-item :index="chapter.chapter" v-for="chapter in directory.chapters" :key="chapter.id">
          <span v-text="chapter.chapter"></span>
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </transition>
  <transition name="el-fade-in">
    <el-icon id="switch" @click="show = !show">
      <Expand v-show="!show" />
      <Fold v-show="show" />
    </el-icon>
  </transition>
</template>

<script>
import { directory } from "@/network/directory/directory";
import { ElMessage } from "element-plus";
import { get_user_info } from "@/network/user/user";
import Bus from "@/common/eventBus";
export default {
  name: 'directoryComponent',
  data() {
    return {
      directory: [],
      user: {},
      user_id: localStorage.user_id,
      book: '',
      show: true
    };
  },
  methods: {
    async get_directory() {
      this.book = this.$route.query.book;
      this.$store.state.book = this.book;
      localStorage.setItem('book', this.book);
      const { data: res } = await directory(this.book);
      if (res.status === 0) {
        this.directory = res.data;
        // console.log(this.directory)
      } else {
        if (res.message === '身份认证失败！') {
          localStorage.removeItem('Authorization');
          this.$router.push('/login');
        }
        ElMessage({
          message: res.message,
          grouping: true,
          type: 'error'
        });
      }
    },
    async get_user_info() {
      const { data: res } = await get_user_info(this.user_id);
      // console.log(res)
      if (res.status === 0) {
        this.user = res.data;
      } else {
        if (res.message === '身份认证失败！') {
          this.$router.push('/login');
        }
        ElMessage({
          message: res.message,
          grouping: true,
          type: 'error'
        });
      }
    },
    async goPassage(chapter) {
      this.$store.state.chapter = chapter;
      localStorage.setItem('chapter', chapter);
    },
    initChapter() {
      const chapter = localStorage.getItem('chapter');
      for (const iterator of this.directory.chapters) {
        if (iterator.chapter === chapter) {
          if (this.$store.state.chapter === chapter) {
            Bus.emit('init');
            return;
          }
          this.$store.state.chapter = chapter;
          return;
        }
      }
      this.$store.state.chapter = this.directory.chapters[0].chapter;
      localStorage.setItem('chapter', this.directory.chapters[0].chapter);
    },
    async init() {
      await this.get_directory();
      await this.get_user_info();
      this.initChapter();
    }
  },
  created() {
    this.init();
  }
}

</script>

<style lang="scss" scoped>
@import "src/style/theme/theme";

#switch {
  transform: scale(1.5);
  padding: 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 92vh;
  @include theme-color;

  .el-icon {
    color: #41a3ff;
  }

  :deep(.el-sub-menu__title) {
    @include theme-color;
  }

  :deep(.el-sub-menu__title):hover {
    @include theme-hover;
  }
}

.el-menu-item {
  @include theme-color;
}

.el-menu-item:hover {
  @include theme-hover;
}

.is-active {
  @include theme-active;
}
</style>
