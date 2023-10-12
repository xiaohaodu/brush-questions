<template>
  <navigationbar></navigationbar>
  <router-view></router-view>
</template>

<script>

import Navigationbar from "@/components/navigationbar/navigationbar";
export default {
  name: 'App',
  components: {
    Navigationbar
  }
};
</script>

<style lang="scss">
@import "src/style/theme/theme";

body {
  @include theme-color;
}
</style>
