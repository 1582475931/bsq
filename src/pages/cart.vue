<template>
  <div class="cart">
    <header class="head">
      <h3>购物车({{list.length}})</h3>
      <span>管理</span>
    </header>
<div v-if="list.length==0" class="box">
  <img src="//gw.alicdn.com/tfs/TB1U0RydwoQMeJjy1XaXXcSsFXa-220-220.png_230x230q90_.webp" alt="" class="pic"> 
  <p class="p1">购物车竟然是空的</p>
  <p class="p2">在忙，也要买点什么犒赏自己~~~</p>
  <button class="btn" @click="$router.push('/index/home')">去逛逛</button>
</div>
      <ul class="list" v-else>
        <li v-for="(item,index) in list" :key="item.id">
          <span @click="shan(item.id)">x</span>
          <input type="checkbox" v-model="item.isAll" />
          <img :src="title+item.img" alt />
          <h3>{{item.name}}</h3>
          <div class="foot">
            <span>￥{{Number(item.price).toFixed(2)}}</span>
            <p>
              <button @click="jian(index)">-</button>
              <span>{{item.sum}}</span>
              <button @click="jia(index)">+</button>
            </p>
          </div>
        </li>
      </ul>
  

    <van-submit-bar :price="sunAll*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox @change="selectAll" v-model="change">全选</van-checkbox>
    </van-submit-bar>
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
      change: false,
      sum: 0,
      list: [],
      username:'',
      title: "http://localhost:3000/"
    };
  },
  mounted() {
    this.username = sessionStorage.getItem("username");
    this.init(this.username)
  },
  methods: {
    init(username) {
      this.axios({
        method: "get",
        url: API.findCart,
        params: {
          username
        }
      }).then(res => {
        if (res.data.isok) {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].isAll = false;
          }
          // console.log(res);

          this.list = res.data.data;
        }
      });
      
    },
    //删除加入购物车
    shan(id) {
      console.log(id);
      this.axios({
        method: "get",
        url: API.delCart,
        params: {
          id
        }
      }).then(res => {
        console.log(res);
        
        if (res.data.isok) {
          this.init(this.username)
        }
        // console.log(res);
      });
    },

    //生成订单
    onSubmit() {
      //返回新数组
      var arr = this.list.filter(item => {
        //判断是否选中
        if (item.isAll) {
          return item;
        }
      });
      if (arr.length == 0) {
        return;
      }
      this.axios({
        method:'post',
        url: API.addBuy,
        data:{
          arr,
          username:this.username
        } 
      }).then(res=>{
        if(res.data.isok){
          this.$router.push('/buy/harvest')
          Toast.success(res.data.info);
        }
        // console.log(res);
        
      })
    },
    
    selectAll() {
      if (this.change) {
        this.list.forEach(item => {
          item.isAll = true;
        });
      } else {
        this.list.forEach(item => {
          item.isAll = false;
        });
      }
    },
    jian(index) {
      this.list[index].sum--;
      if (this.list[index].sum <= 1) {
        this.list[index].sum = 1;
      }
    },
    jia(index) {
      this.list[index].sum++;
    }
  },
  //监听list的变化
  watch: {
    list: {
      handler() {
        this.change = this.list.every(item => item.isAll);
      },
      deep: true
    }
  },
  //计算属性
  computed: {
    sunAll() {
      var sum = 0;

      this.list.forEach(item => {
        if (item.isAll) {
          sum += Number(item.sum) * Number(item.price);
        }
      });
      return sum;
    }
  }
};
</script>
<style lang="stylus" scoped>
.cart {
  background: #f2f2f2;
  width: 100%;
  height: 100vh;
}

.head {
  background: #ff7400;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;

  h3 {
    display: inline-block;
  }

  h3, span {
    color: #fff;
    font-size: 0.4rem;
  }

  span {
    float: right;
    margin: 0 0.2rem;
  }
}

.list {
  margin-bottom: 1.5rem;

  li {
    width: 95%;
    height: 2rem;
    background: #fff;
    margin: 0 auto;
    border-radius: 0.2rem;
    margin: 0.15rem;
    position: relative;

    >span {
      position: absolute;
      top: 0;
      font-size: 0.4rem; /* 30/100 */
      right: 0.2rem; /* 30/100 */
    }

    input {
      width: 0.3rem;
      height: 0.3rem;
      background-color: #ffffff;
      border: solid 1px #dddddd;
      -webkit-border-radius: 50%;
      border-radius: 50%;
      font-size: 0.8rem;
      margin: 0 0.1rem;
      position: relative;
      display: inline-block;
      vertical-align: middle;
      cursor: default;
      -webkit-appearance: none;
      -webkit-user-select: none;
      user-select: none;
      -webkit-transition: background-color ease 0.1s;
      transition: background-color ease 0.1s;
    }

    input:checked {
      background: #1673ff;
    }

    input:checked::after {
      content: '';
      top: 5px;
      left: 5px;
      position: absolute;
      background: transparent;
      border: #fff solid 2px;
      border-top: none;
      border-right: none;
      height: 6px;
      width: 10px;
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }

    img {
      margin-top: 0.35rem;
      width: 1.3rem;
      height: 1.3rem;
      vertical-align: middle;
    }

    h3 {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 4rem;
      position: absolute;
      top: 0.3rem;
      left: 2.1rem;
    }

    .foot {
      display: inline-block;
      position: absolute;
      top: 0.8rem;
      left: 2.1rem;

      p {
        margin-top: 0.15rem;
        height: 0.45rem;

        // border: 0.01rem solid #ccc;
        button {
          display: inline-block;
          border: none;
        }
      }

      span {
        color: #ff9800;
      }
    }
  }
}

>>>.van-submit-bar {
  position: fixed;
  bottom: 0.7rem;
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
.box{
  

  .pic {
    position absolute;
    left 0;
    top 0;
    right 0;
    margin auto;
   
  }
  .p1{
    position absolute;
    left 2.2rem /* 320/100 */;
    top 5rem /* 500/100 */;

  }
   .p2{
    position absolute;
    left 1.5rem /* 320/100 */;
    top 5.6rem /* 500/100 */;
  
  }
   .btn{
    position absolute;
    left 2.2rem /* 320/100 */;
    top 6.3rem /* 500/100 */;
    width 2.3rem /* 30/100 */;
    border none;
    height .6rem /* 50/100 */
  
  }
  img{
    width 1.1*2rem /* 110/100 */;
    bottom 3.5rem /* 350/100 */;
    height 1.1*2rem /* 110/100 */;
  }
}
</style>