<template>
  <div class="bac">
    <directory></directory>
    <passage-page></passage-page>
  </div>
</template>

<script>
import Directory from "@/components/directory/directory";
import PassagePage from "@/components/passagePage/passagePage";

export default {
  name: "passagePage",
  components: { PassagePage, Directory },
};
</script>

<style lang="scss" scoped>
@import "src/style/theme/theme";

.bac {
  position: fixed;
  width: 100vw;
  margin-top: 8dvh;
  height: 92dvh;
  overflow: hidden;
  @include theme-color;
  display: flex;
}

.el-menu {
  border: none;
}
</style>