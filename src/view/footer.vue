<template>
  <footer class="footer">
    <router-link to="/index/home" active-class="active">
      <i class="iconfont icon-shouye"></i>
      首页
    </router-link>
    <router-link to="/index/sort" active-class="active">
      <i class="iconfont icon-leimupinleifenleileibie"></i>
      分类
    </router-link>
    <router-link to="/index/cart" active-class="active">
      <i class="iconfont icon-gouwuche2-copy"></i>
      购物车
    </router-link>
    <router-link to="/index/my" active-class="active">
      <i class="iconfont icon-wode1"></i>
      我的
    </router-link>
  </footer>
</template>
<script>
export default {};
</script>
<style lang="stylus" scoped>
.footer {
  max-width: 6.4rem;
  margin: 0 auto;
  position: fixed;
  width: 100%;
  height: 0.8rem;
  bottom: 0;
  display: flex;
  text-align: center;
  background: #fff;
  // line-height .7rem;
  font-size: 0.2rem;

  a {
    display: inline-block;
    flex: 1;

    i {
      display: block;
      margin-top .1rem;
      font-size: 0.4rem;
    }
  }

  .active {
    color: #fff;
    background: #1fb4ad;
  }
}
</style>