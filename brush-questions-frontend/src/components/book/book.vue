<template>
  <div class="main">
    <div class="book" v-for="book in books.data" :key="book.id">
      <img class="cover" :src="book.cover">
      <div class="name" v-text="book.book"></div>
      <el-button type="primary" round @click="goPassage(book.book)">在线练习</el-button>
      <el-button type="success" round @click="goWrongQuestion(book.book)">错题练习</el-button>
    </div>
  </div>
</template>

<script>
import { get_books } from "@/network/book/book";
import { ElMessage } from "element-plus";

export default {
  name: "bookPage",
  data() {
    return {
      books: []
    };
  },
  methods: {
    async get_book() {
      const { data: res } = await get_books();
      if (res.status !== 0) {
        return ElMessage({
          message: res.message + '请尝试重新登录！',
          grouping: true,
          type: 'error'
        });
      }
      this.books = res;
    },
    async goPassage(book) {
      this.$router.push(`/passages?book=${book}`);
    },
    async goWrongQuestion(book) {
      this.$router.push(`/wrongQuestion?book=${book}`);
    }
  },
  created() {
    this.get_book();
  }
};
</script>

<style lang="scss" scoped>
.el-button {
  margin-left: 0;
  margin-top: 0.5vh;
}

.main {
  display: flex;
  margin-top: 75px;
  width: 100vw;
  flex-wrap: wrap;
  justify-content: center;

  .book {
    padding: 3vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .cover {
      height: 20vh;
    }

  }
}
</style>
