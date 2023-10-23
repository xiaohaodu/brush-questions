<template>
  <div class="bac">
    <directory></directory>
    <passage-error></passage-error>
  </div>
</template>

<script>
import Directory from "@/components/directory/directory";
import PassageError from "@/components/passageError/passageError";

export default {
  name: "wrongQuestion",
  components: { PassageError, Directory },
};
</script>

<style lang="scss" scoped>
@import "src/style/theme/theme";

.bac {
  position: fixed;
  margin-top: 8dvh;
  height: 92dvh;
  width: 100vw;
  overflow: hidden;
  @include theme-color;
  display: flex;
}

.el-menu {
  border: none;
}
</style>