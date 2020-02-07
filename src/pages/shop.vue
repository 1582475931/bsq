<template>
  <div class="mongadd">
    <header class="head">
      <span class="left iconfont icon-fanhui" @click="$router.go('-1')"></span>
      <span class="center">店铺申请</span>
    </header>
    <p class="a"></p>
    <div>
      <p class="p">用户名</p>
      <el-input placeholder="请输入用户名" clearable class="input" v-model="user.username"></el-input>
    </div>
    <div>
      <p class="p">密码</p>
      <el-input placeholder="请输入密码" clearable class="input" v-model="user.password" show-password></el-input>
    </div>
    <div>
      <p class="p">姓名</p>
      <el-input placeholder="请输入姓名" clearable class="input" v-model="user.name"></el-input>
    </div>
    <div>
      <p class="p">店铺名称</p>
      <el-input placeholder="请输入店铺名称" clearable class="input" v-model="user.shop"></el-input>
    </div>
    <div v-if="user.id">
      <p class="p">是否同意</p>
      <el-radio v-model="user.isA" label="未同意">未同意</el-radio>
      <el-radio v-model="user.isA" label="同意">同意</el-radio>
    </div>
    <div>
      <p class="p">描述</p>
      <el-input placeholder="请输入描述" clearable class="input" v-model="user.des"></el-input>
    </div>
    <div>
      <p class="p">时间</p>
      <el-date-picker type="date" placeholder="选择日期" class="input" v-model="user.time"></el-date-picker>
    </div>
    <div class="file">
      <p class="p">图片</p>
      <img :src="user.ava?user.ava:''" alt class="pic" />

      <input type="file" @change="change($event)" />
      <i class="el-icon-plus"></i>
    </div>
    <button @click="addT">提交</button>
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
        name: "",
        shop: "",
        ava: "",
        des: "",
        time: ""
      },
      tite: "http://localhost:3000",
      file: ""
    };
  },
  methods: {
    //数据的清空
    empey() {
      this.user = {
        username: "",
        password: "",
        name: "",
        shop: "",
        ava: "",
        des: "",
        time: ""
      };
    },

    //店铺的申请
    addT() {
      if (this.user.time != "") {
        this.user.time = new Date(this.user.time).getTime();
      }

      var params = new FormData();
      params.append("file", this.file);
      params.append("username", this.user.username);
      params.append("password", this.user.password);
      params.append("name", this.user.name);
      params.append("shop", this.user.shop);
      params.append("time", this.user.time);

      params.append("des", this.user.des);
      this.axios({
        method: "post",
        url: API.addUseradmin,
        data: params
      }).then(res => {
        // console.log(res);
        if (res.data.isok) {
          Toast.success(res.data.info);
          this.$router.push('/index/my')
        } else {
          Toast.fail(res.data.info);
        }
      });
    },
    change(e) {
      this.file = e.target.files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = e => {
        this.user.ava = e.target.result;
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
.mongadd {
  width: 100vw;
  height: 100vh;

  div {
    margin: 0 0.5rem;
  }

  button {
    border: none;
    width: 5.5rem;
    height: 0.7rem;
    border-radius: 0.2rem;
    background: #ff8247;
    color: #fff;
    font-size: 0.3rem;
    margin: 0 0.5rem;
  }

  .pic {
    position: absolute;
    width: 100px;
    height: 100px;
    display: inline-block;
    border: 1px dashed #8c939d;
    border-radius: 10px;
  }

  .file:hover>.pic {
    border: 1px dashed #1E90FF;
  }

  .file {
    position: relative;
    margin-bottom: 50px;
  }

  .file>p {
    margin-top: 50px;
  }

  .file>i {
    margin: 0 24px;
    font-size: 50px;
    color: #1E90FF;
  }

  .file>input {
    position: absolute;
    width: 100px;
    height: 100px;
    opacity: 0;
  }

  .p {
    display: inline-block;
    width: 1.3rem;
    font-size: 16px;
  }

  .input {
    width: 4rem;
    height: 40px;
    margin: 0.1rem 0;
  }
}

.head {
  width: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  height: 0.7rem;
  background: #1fb4ad;
  line-height: 0.7rem;
  position: fixed;
  z-index: 10;
  color: #fff;

  .left {
    margin-left: 0.2rem;
  }

  .center {
    display: inline-block;
    margin-left: 2rem;
  }
}

.a {
  height: 0.7rem;
}
</style>
