<template>
  <div class="box">
    <header class="head">
      <span class="left iconfont icon-fanhui" @click="$router.go('-1')"></span>
      <span class="center">设置</span>
    </header>
    <nav class="nav">
      <p @click="$router.push('/myaddress')">
        收货地址
        <i class="iconfont icon-fanhui-copy"></i>
      </p>
      <p @click="$router.push('/xiugai')">
        修改密码
        <i class="iconfont icon-fanhui-copy"></i>
      </p>
      <p @click="$router.push('/shop')">
        店铺申请
        <i class="iconfont icon-fanhui-copy"></i>
      </p>
    </nav>
    <footer class="footer" @click="tui">退出登录</footer>
  </div>
</template>
<script>
import API from "../components/API/API";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  mounted() {
    this.username = sessionStorage.getItem("username");
    if (!this.username) {
      this.$router.push("/login");
      return;
    }
  },
  methods: {
    tui() {
      this.axios({
        method: "get",
        url: API.exit
      }).then(res => {
        if (res.data.isok) {
          Toast.success(res.data.info);
          sessionStorage.removeItem("username");
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.box {
  width: 100%;
  height: 100vh;
  background: #eeeeee;
}

.head {
  width: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  height: 0.7rem;
  background: #f9f9f9;
  line-height: 0.7rem;
  position: fixed;

  .left {
    margin-left: 0.2rem;
  }

  .center {
    display: inline-block;
    margin-left: 2.4rem;
  }
}

.nav {
  padding-top: 0.8rem;

  p {
    background: #fff;
    height: 0.7rem;
    line-height: 0.7rem;
    padding-left: 0.3rem;
    font-size: 0.35rem;
    border-bottom: 0.02rem solid #dddddd;

    i {
      float: right;
      margin-right: 0.3rem;
      color: #cccccc;
    }
  }
}

.footer {
  position: fixed;
  max-width: 6.4rem;
  bottom: 0;
  background: #ff6108;
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>