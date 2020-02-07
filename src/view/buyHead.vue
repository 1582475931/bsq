<template>
  <div >
    <header class="head">
      <div class="left">
        <span class="iconfont icon-fanhui" @click="$router.go('-1')"></span>
      </div>
      <div class="center">
        <i class="iconfont icon-sousuo" ></i>
        <input type="text" placeholder="搜索" />
      </div>
      <div class="right">
        <span class="iconfont icon-gengduosangedian"></span>
      </div>
    </header>
    <div class="main">
      <router-link to="/buy/all" active-class="active">全部</router-link>
      <router-link to="/buy/harvest" active-class="active">待收货</router-link>
      <router-link to="/buy/fahuo" active-class="active">待发货</router-link>
      <router-link to="/buy/comment" active-class="active">评价</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {}
};
</script>
<style lang="stylus" scoped>
.head {
  width: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  height: 1rem;
  background: #d31215;
  position: fixed;
  line-height: 0.1rem;
  display: flex;
  z-index: 1000;

  .left, .right {
    display: inline-block;
    width: 1rem;
    margin: 0.2rem 0.1rem;
    text-align: center;

    span {
      color: #fff;
      font-size: 0.4rem;
      line-height: 0.6rem;
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
    display: flex;

    input {
      flex: 1;
      margin-top: 0.25rem;
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

.main {
  padding-top: 1rem; /* 100/100 */
  position: fixed;
  display: flex;
  width: 100%;
  text-align: center;
  background #fff;

  a {
    flex: 1;
    height .5rem /* 50/100 */;
    line-height .5rem /* 50/100 */;
  }
   .active {
    color: #fff;
    background: #1fb4ad;
  }
}
</style>