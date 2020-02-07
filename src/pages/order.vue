<template>
  <div class="order">
    <header class="head">
      <span class="left iconfont icon-fanhui" @click="$router.go(-1)"></span>
      <span class="center">确认订单</span>
    </header>
    <div class="main">
      <div class="main_head" @click="$router.push('/myaddress')">
        <img
          src="https://gw.alicdn.com/tfs/TB17gX2wYvpK1RjSZPiXXbmwXXa-128-128.png_70x70q90_.webp"
          alt
        />
        <div class="right">
          <p class="p1">
            {{data.name}}
            <span>{{data.tel}}</span>
          </p>
          <p class="p2">{{data.address}}</p>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="head_bg">
        <van-card
          :num="Number(num)"
          :price="Number(data1.price).toFixed(2)"
          :desc="data1.color"
          :title="data1.name"
          :thumb="data1.img?telte+data1.img:''"
        />
      </div>
      <div class="footer_bg active">
        <h3>购买数量</h3>
        <p>
          <button @click="jian">-</button>
          <span>{{num}}</span>
          <button @click="jia">+</button>
        </p>
      </div>
      <div class="footer_bg">
        <h3>配送方式</h3>
        <p>快递免费</p>
      </div>
      <div class="footer_bg">
        <h3>？运费险</h3>
        <p>卖家赠送</p>
      </div>
    </div>
    <van-submit-bar :price="sunAll*100" button-text="提交订单" @submit="onSubmit"></van-submit-bar>
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
      data: [],
      num: "",
      data1: [],
      telte: "http://localhost:3000/",
      username: ""
    };
  },
  mounted() {
    this.username = sessionStorage.getItem("username");
    this.axios({
      method: "get",
      url: API.findAddress,
      params: {
        username: this.username
      }
    }).then(res => {
      if (res.data.isok) {
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].isDefault == "1") {
            this.data = res.data.data[i];
          }
        }
      }
    });
    var id = this.$route.query.id;
    this.num = this.$route.query.num;
    this.axios({
      method: "get",
      url: API.findWares,
      params: {
        id
      }
    }).then(res => {
      if (res.data.isok) {
        this.data1 = res.data.data[0];
      }
      // console.log(res);
    });
  },
  methods: {
    onSubmit() {
      console.log(this.data);

      if (this.data.length==0) {
        Toast.success("请填写收货地址");
        this.$router.push("/myaddress");
        return;
      }
      // return;
      this.axios({
        method: "post",
        url: API.addBuy1,
        data: {
          username: this.username,
          waresId: this.data1.id,
          sum: this.num
        }
      }).then(res => {
        // console.log(res);
        if (res.data.isok) {
          this.$router.push("/buy/harvest");
          Toast.success(res.data.info);
        }
      });
    },
    jian() {
      this.num--;
      if (this.num <= 1) {
        this.num = 1;
      }
    },
    jia(index) {
      this.num++;
    }
  },
  computed: {
    sunAll() {
      var sum = 0;
      sum = this.num * this.data1.price;
      return sum;
    }
  }
};
</script>
<style lang='stylus' scoped>
.order {
  background: #f2f2f2;
  width: 100vw;
  height: 100vh;
}

>>>.van-submit-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: auto;
  max-width: 6.4rem;
  background: #fff;
  line-height: 0.7rem;
  left: unset;

  .van-icon {
    margin-left: 0.3rem;
  }

  button {
    display: inline-block;
    height: 0.5rem;
    width: 1.7rem;
    line-height: 0.5rem;
    margin-right: 0.1rem;
    border: none;
    background: #FF9000;
    border-radius: 0.3rem;
    color: #fff;
  }
}

.footer {
  width: 90%;
  height: 5rem; /* 500/100 */
  background: #fff;
  margin: 0.2rem auto;
  border-radius: 0.2rem; /* 20/100 */

  .head_bg {
    padding-top: 0.4rem; /* 40/100 */
    height: 1rem; /* 100/100 */
    display: flex;
    width: 90%;
    margin: auto;

    .van-card {
      width: 100%;
      height: 1.9rem; /* 150/100 */
    }
  }

  .active {
    border-top: 0.01rem solid #ccc;
    margin-top: 1.3rem; /* 40/100 */
  }

  .footer_bg {
    border-bottom: 0.01rem solid #ccc;
    height: 0.5rem; /* 80/100 */
    line-height: 0.4rem; /* 50/100 */

    h3 {
      display: inline-block;
      margin-left: 1.3rem; /* 30/100 */
    }

    p {
      display: inline-block;
      margin-left: 1.5rem; /* 50/100 */
    }
  }
}

.main {
  padding-top: 0.9rem; /* 100/100 */

  .main_head {
    width: 90%;
    height: 2rem; /* 200/100 */
    margin: auto;
    border-radius: 0.2rem; /* 20/100 */
    background: #fff;
    display: flex;

    img {
      width: 1rem; /* 100/100 */
      height: 1rem; /* 100/100 */
      margin-top: 0.35rem; /* 50/100 */
      margin-left: 0.2rem; /* 20/100 */
    }

    .right {
      margin-left: 0.3rem; /* 30/100 */
    }

    .p1 {
      margin-top: 0.3rem; /* 30/100 */
      font-size: 0.35rem; /* 30/100 */

      span {
        font-size: 0.2rem; /* 20/100 */
        color: #999;
      }
    }

    .p2 {
      line-height: 0.7rem; /* 50/100 */
    }
  }
}

.head {
  width: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  height: 0.7rem;
  background: #d91217;
  line-height: 0.7rem;
  position: fixed;
  color: #fff;

  .left {
    margin-left: 0.2rem;
  }

  .center {
    display: inline-block;
    margin-left: 2rem;
  }
}
</style>