<template>
  <div class="my">
    <header class="head">
      <div class="pic">
        <img :src="img?img:''" alt />
        <input type="file" @change="change($event)" />
        <h3>{{username}}</h3>
        <p class="iconfont icon-yonghu right"></p>
        <p class="iconfont icon-shezhi right1" @click="$router.push('/set')"></p>
      </div>
      <div class="nav">
        <p @click="$router.push('/collection')">
          <i>{{num}}</i>
          <span>收藏</span>
        </p>
        <p>
          <i>0</i>
          <span>关注店铺</span>
        </p>
        <p>
          <i>0</i>
          <span>足迹</span>
        </p>
        <p>
          <i>0</i>
          <span>红包卡卷</span>
        </p>
      </div>
    </header>

    <div class="tpl-wrapper">
      <h3>我的订单</h3>
      <ul class="list">
        <li @click="$router.push('/buy/all')">
          <img src="../assets/img/1.png" alt />
          <span>待付款</span>
        </li>
        <li @click="$router.push('/buy/fahuo')">
          <img src="../assets/img/2.png" alt />
          <span>待发货</span>
        </li>
        <li @click="$router.push('/buy/harvest')">
          <img src="../assets/img/3.png" alt />
          <span>待收货</span>
        </li>
        <li @click="$router.push('/buy/comment')">
          <img src="../assets/img/4.png" alt />
          <span>评价</span>
        </li>
        <li>
          <img src="../assets/img/5.png" alt />
          <span>退款/售后</span>
        </li>
      </ul>
    </div>

    <div class="tpl-wrapper1">
      <h3>必备工具</h3>
      <ul class="list1">
        <li>
          <img src="../assets/img/fan.png" alt />
          <span>每日返现</span>
        </li>
        <li>
          <img src="../assets/img/ling.png" alt />
          <span>领劵中心</span>
        </li>
        <li>
          <img src="../assets/img/xian.png" alt />
          <span>闲钱置换</span>
        </li>
        <li>
          <img src="../assets/img/ke.png" alt />
          <span>客服小蜜</span>
        </li>
        <li>
          <img src="../assets/img/hua.png" alt />
          <span>花呗</span>
        </li>
        <li>
          <img src="../assets/img/kuai.png" alt />
          <span>我的快递</span>
        </li>
        <li>
          <img src="../assets/img/tian.png" alt />
          <span>天猫农场</span>
        </li>
        <li>
          <img src="../assets/img/zhu.png" alt />
          <span>主题皮肤</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import API from "../components/API/API";
export default {
  data() {
    return {
      file: "",
      img: "",
      tite: "http://localhost:3000",
      username: "",
      num:''
    };
  },
  mounted() {
    this.username = sessionStorage.getItem("username");
      if (!this.username) {
      this.$router.push("/login");
      return;
    }
      this.axios({
            method:'get',
            url: API.findCollection,
            params: {
                username:this.username
            }
        }).then(res=>{
          if(res.data.isok){
            this.num=res.data.data.length;
          }
            
        })
  
    this.init({
      username: this.username
    });
  },
  methods: {
    //按条件查询用户信息
    init(username) {
      this.axios({
        method: "get",
        url: API.findUser,
        params: username
      }).then(res => {
        if (res.data.isok) {
          this.img = this.tite + res.data.data[0].img;
        }
      });
    },
    //更新用户头像
    change(e) {
      this.file = e.target.files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = e => {
        this.img = e.target.result;
      };
      var params = new FormData();
      params.append("file", this.file);
      params.append("username", this.username);
      this.axios({
        method: "post",
        url: API.updatedUser,
        data: params
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.my {
  background: #f2f2f2;
  // width: 100vw;
  max-width 6.4rem /* 640/100 */;
  width 100%;
  height: 100vh;
}

.head {
  background: #ff5302;
  height: 2.3rem;
  width: 100%;

  .pic {
    position: relative;
    width: 0.7rem;
    height: 0.7rem;
    padding: 0.2rem 0.2rem 0 0.2rem;

    h3 {
      position: absolute;
      left: 1.1rem;
      top: 0.5rem;
      color: #fff;
    }

    img {
      position: absolute;
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
      border: 0.01rem solid #ccc;
    }

    input {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
      position: absolute;
      opacity: 0;
    }

    .right {
      left: 5rem;
    }

    .right, .right1 {
      position: absolute;
      top: 0.3rem;
      color: #fff;
      font-size: 0.4rem;
    }

    .right1 {
      left: 5.8rem;
    }
  }

  .nav {
    width: 100%;
    margin-top: 0.2rem;
    display: flex;
    height: 1.1rem;

    p {
      text-align: center;
      flex: 1;
      color: #fff;

      i {
        display: block;
        line-height: 0.5rem;
      }
    }
  }
}

.tpl-wrapper {
  width: 90%;
  margin: 0.2rem auto;
  height: 2rem;
  background: #fff;
  border-radius: 0.2rem;

  .list {
    display: flex;

    li {
      flex: 1;
      text-align: center;

      img {
        width: 0.8rem;
        height: 0.8rem;
      }

      span {
        display: block;
        font-size: 0.2rem;
      }
    }
  }

  h3 {
    display: inline-block;
    margin: 0.2rem;
  }
}

.tpl-wrapper1 {
  width: 90%;
  margin: 0.2rem auto;
  height: 3.5rem;
  background: #fff;
  border-radius: 0.2rem;
  margin-bottom: 1rem;

  h3 {
    display: inline-block;
    margin: 0.2rem;
  }

  .list1 {
    border-top: 0.01rem solid #ccc;

    li {
      display: inline-block;
      width: 23%;
      height: 1.2rem;
      text-align: center;
      margin: 0.1rem 0;

      img {
        width: 0.8rem;
        height: 0.8rem;
      }

      span {
        display: block;
        font-size: 0.2rem;
      }
    }
  }
}
</style>