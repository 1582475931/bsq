<template>
  <div class="box">
    <header class="head">
      <span class="left iconfont icon-fanhui" @click="$router.go('-1')"></span>
      <span class="center">修改密码</span>
    </header>
    <div class="xiu">
      <div>
        <p class="p">用户名</p>
        <el-input
          v-model="user.username"
          placeholder="请输入用户名"
          class="input"
          :disabled="user.username.length!=0"
        ></el-input>
      </div>
      <div>
        <p class="p">原始密码</p>
        <el-input placeholder="请输入原始密码" v-model="user.oldpass" show-password class="input"></el-input>
      </div>
      <div>
        <p class="p">新密码</p>
        <el-input placeholder="请输入新密码" v-model="user.newpass" show-password class="input"></el-input>
      </div>
      <el-button type="primary" @click="update">修改密码</el-button>
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
        oldpass: "",
        newpass: ""
      }
    };
  },
  mounted() {
    this.user.username = sessionStorage.getItem("username");
  },
  methods: {
    //修改密码
    update() {
      this.axios({
        method: "post",
        url: API.changePassUser,
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          Toast.success(res.data.info);
          this.$router.go(-1);
        } else {
          Toast.fail(res.data.info);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.box {
  width: 100vw;
  height: 100vh;
}

.xiu {
  position: absolute;
  width: 5.5rem;
  // background #fff;
  height: 4rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.el-button--primary {
  margin: 0.2rem 0;
  width: 5.3rem;
}

.p {
  display: inline-block;
  width: 1.2rem;
}

.input {
  width: 4rem;
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
    margin-left: 2rem;
  }
}
</style>