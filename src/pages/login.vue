<template>
  <div class="login">
  <div class="login_bd">
    <h3>登录</h3>
    <div class="top">
      <span>用户：</span><el-input v-model="user.username" placeholder="请输入用户名" class="input"></el-input>
    </div>
     <div class="top">
      <span>密码：</span><el-input v-model="user.password" placeholder="请输入密码" class="input" show-password></el-input>
    </div>
     <van-button type="info " class="btn" @click="find">登录</van-button>
     <router-link to="/register" class="footer">未有账号?请注册</router-link>
  </div>
  </div>
</template>
<script>
import API from "../components/API/API";
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        type: "3"
      }
    };
  },
  methods: {
    find() {
      this.axios({
        method: "post",
        url: API.login,
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          Toast.success(res.data.info);
          sessionStorage.setItem("username", this.user.username);
          this.$router.push("/index");
        } else {
          Toast.fail(res.data.info);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.login{
  width 100vw;
  height 100vh;
  background #ccc;
  background url('../assets/img//login.jpg')
  max-width 6.4rem /* 640/100 */;
  .login_bd{
    width 90%;
    height 3.7rem /* 300/100 */;
    background #fff;
    border-radius .2rem /* 20/100 */;
    position absolute;
    left 0;
    right 0;
    top 0;
    bottom 0;
    margin auto;
    text-align center;
   
    h3{
      font-size .4rem /* 40/100 */;
      margin-top .2rem /* 20/100 */;
      color #1989fa;
      // font-style oblique;
    }
    .top{
      margin-top .1rem /* 20/100 */;
    }
    .input{
      width 4rem /* 300/100 */;
    }
  }
}
.btn {
  margin-top: 0.2rem;

  width: 5rem;
  border-radius: 0.3rem;
}
.footer{
  display block;
  text-align right ;
  margin .2rem .4rem 0 0;
}
</style>