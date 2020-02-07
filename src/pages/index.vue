<template>
  <div class="app">
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>
<script>
import vFooter from "../view/footer";
export default {
  components: {
    vFooter
  }
};
</script>
<style lang="stylus" scoped>
.app {
  background: #f2f2f2;
  width: 100%;
  height 100%;
}
</style>