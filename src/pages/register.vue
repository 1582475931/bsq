<template>
   <div class="login">
  <div class="login_bd">
    <h3>注册</h3>
    <div class="top">
      <span>用户：</span><el-input v-model="user.username" placeholder="请输入用户名" class="input"></el-input>
    </div>
     <div class="top">
      <span>密码：</span><el-input v-model="user.password" placeholder="请输入密码" class="input" show-password></el-input>
    </div>
     <van-button type="info " class="btn" @click="find">注册</van-button>
     <router-link to="/login" class="footer">已有账号?请登录</router-link>
  </div>
  </div>
</template>
<script>
import API from "../components/API/API";
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    find() {
      this.axios({
        method: "post",
        url: API.addUser,
        data: this.user
      }).then(res => {
          if(res.data.isok){
              Toast.success(res.data.info);
              this.$router.push('/login')
          }else{
              Toast.fail(res.data.info);
          }
        // console.log(res);
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
      color #1989fa;
      margin-top .2rem /* 20/100 */;
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