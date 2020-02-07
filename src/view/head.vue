<template>
  <header class="head">
    <div class="left">
      <span class="iconfont icon-saoyisao"></span>
      <h3>扫一扫</h3>
    </div>
    <div class="center">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="搜索" />
    </div>
    <div class="right">
      <span class="iconfont icon-huiyuanmax"></span>
      <h3>会员码</h3>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>
<style lang="stylus" scoped>
.head {
  width: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  height: 1rem;
  background: #ff8800;
  position: fixed;
  line-height: 0.1rem;
  display: flex;
  z-index: 1000;

  .left,.right {
    display: inline-block;
    width: 1rem;
    margin: 0.2rem 0.1rem;
    text-align: center;

    span {
      color: #fff;
      font-size: 0.3rem;
      line-height: 0.5rem;
    }

    h3 {
      color: #fff;
      font-size: 0.18rem;
    }
  }

  .center {
    position: relative;
    height: 100%;
    flex: 1;
    line-height: 1rem;
    display flex;

    input {
       flex: 1;
       margin-top .25rem;
      height: 0.5rem;
      padding-left: 0.5rem;
      padding-right: 0.3rem;
      border-radius: 0.3rem;
    }

    i {
      position: absolute;
      font-size: 0.3rem;
      left: 0.15rem;
    }
  }
}
</style>