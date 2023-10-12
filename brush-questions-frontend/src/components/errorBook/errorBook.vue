<template>
  <div class="main">
    <div class="book" v-for="book in books.data" :key="book.id" @click="goPassage(book.book)">
      <img class="cover" :src="book.cover">
      <div class="name" v-text="book.book"></div>
    </div>
  </div>
</template>

<script>
import { get_books } from "@/network/book/book";
import { ElMessage } from "element-plus";

export default {
  name: "errorBook",
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
          message: res,
          grouping: true,
          type: 'error'
        });
      }
      this.books = res;
    },
    async goPassage(book) {
      this.$store.state.book = book;
      this.$router.push('/passages');
    }
  },
  created() {
    this.get_book();
  }
};
</script>

<style lang="scss" scoped>
@import "src/style/theme/theme";

.main {
  display: flex;
  margin-top: 25vh;
  width: 80vw;
  margin-left: 10vw;

  .book {
    padding: 3vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .cover {
      height: 20vh;
    }

    .name {
      font-size: 2.3vh;
    }
  }
}
</style>