<template>
  <div class="box">
    <header class="head">
      <span class="left iconfont icon-fanhui" @click="$router.go(-1)"></span>
      <span class="center">详情</span>
    </header>
    <p class="a"></p>
    <div class="nav">
      <van-dropdown-menu active-color="#ee0a24">
        <van-dropdown-item v-model="value1" :options="option1" @change="sai" />
        <p>销量</p>
        <p :class=" isA?'iconfont icon-heng zi':'iconfont icon-liebiao2-copy zi' " @click="huan"></p>
        <p @click="dian">
          筛选
          <i class="iconfont icon-shaixuan"></i>
        </p>
      </van-dropdown-menu>
    </div>
    <p class="b"></p>
    <transition enter-active-class="animated bounceInLeft">
      <ul class="cont" v-if="isA">
        <li v-for="item in data" :key="item.id" @click="xiang(item.id)">
          <img :src="title+item.img" alt />
          <div class="right">
            <!-- <h3>店铺名称</h3> -->
            <h3>{{item.name}}</h3>
            <p class="center">
              <span class="span1">
                ￥
                <i>{{Number(item.price).toFixed(2)}}</i>
              </span>
              <!-- <span class="span2">1232人付款</span> -->
              <span class="span2">{{item.address}}</span>
            </p>
            <van-rate :value='parseInt(item.score)' readonly />
            <p class="foot">进店 ></p>
          </div>
        </li>
        <!-- <li>
          <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt />
          <div class="right">
            <h3>店铺名称</h3>
            <h3>名称</h3>
            <p class="center">
              <span class="span1">
                ￥
                <i>1232</i>
              </span>
              <span class="span2">1232人付款</span>
              <span class="span2">位置</span>
            </p>
            <van-rate v-model="value" readonly />
            <p class="foot">进店 ></p>
          </div>
        </li> -->
      </ul>
      <ul class="list" v-else>
        <li v-for="item in data" :key="item.id"  @click="xiang(item.id)">
          <img :src="title+item.img" alt />
          <div class="foot">
            <h3>{{item.name}}</h3>
            <p class="wei">{{item.address}}</p>
            <p class="center">
              <span class="span1">
                ￥
              <i>{{Number(item.price).toFixed(2)}}</i>
              </span>
              <!-- <span class="span2">1232人付款</span> -->
            </p>
          </div>
        </li>
        <!-- <li>
          <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt />
          <div class="foot">
            <h3>名称</h3>
            <p class="wei">位置</p>
            <p class="center">
              <span class="span1">
                ￥
                <i>1232</i>
              </span>
              <span class="span2">1232人付款</span>
            </p>
          </div>
        </li> -->
      </ul>
    </transition>
    <transition enter-active-class="animated bounceInLeft">
      <div class="mark" @touchmove.prevent v-show="show" @click.self="add1">
        <div class="ce">
          <h3>价格区间(元)</h3>
          <input type="text" v-model="min" placeholder="最低价">---
           <input type="text" v-model="max" placeholder="最高价">
           <button @click="shou">确认</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import API from '../components/API/API'
export default {
  data() {
    return {
      isA: true,
      show: false,
      type:'',
      value: 4,
      value1: 0,
      value2: "a",
      min:'',
      max:'',
      data:[],
      title:'http://localhost:3000/',
      option1: [
        { text: "全部商品", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 }
      ],

    };
  },
  mounted() {
    this.type=this.$route.params.name;
    this.axios({
      method:'get',
      url: API.findWares,
      params: {
        type:this.type
      }
    }).then(res=>{
      console.log(res)
      if(res.data.isok){
        this.data=res.data.data;
      }
    })
  },
  methods: {
    sai(){
      console.log(this.value1);
      
    },
    shou(){
      var data={
        min:this.min,
        max:this.max,
        type:this.type
      }
      this.axios({
        method:'get',
        url: API.findWares,
        params:data
      }).then(res=>{
        if(res.data.isok){
          this.data=res.data.data;
           this.show = !this.show;

        }     
      })
 
    },
    dian() {
      this.show = !this.show;
    },
    xiang(id){
      // console.log(id)
      this.$router.push('/details/'+id)
    },
    add1() {
      this.show = !this.show;
    },
    huan() {
      this.isA = !this.isA;
    }
  }
};
</script>
<style lang="stylus" scoped>
.box {
  background: #f2f2f2;
  height: 100%;
}

.head {
  width: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  height: 0.7rem;
  background: #007af4;
  line-height: 0.7rem;
  position: fixed;
  color: #fff;

  .left {
    margin-left: 0.2rem;
  }

  .center {
    display: inline-block;
    margin-left: 2.5rem;
  }
}

.nav {
  position: fixed;
  width: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;

  p {
    width: 25%;
    text-align: center;
  }
}

.cont {
  li {
    width: 90%;
    margin: 0.1rem auto;
    height: 2.5rem;
    display: flex;
    background: #fff;
    border-radius: 0.2rem;

    img {
      width: 2.5rem;
      width: 2.5rem;
      border-radius: 0.2rem;
    }

    .right {
      flex: 1;
      margin-left: 0.2rem;

      >>>.van-rate__icon {
        font-size: 0.3rem;
      }

      h3, h4 {
        font-size: 0.28rem;
        line-height: 0.5rem;
      }

      .center {
        line-height: 0.5rem;

        .span1 {
          color: #ff5000;

          i {
            font-size: 0.3rem;
          }
        }

        .span2 {
          font-size: 0.2rem;
          color: #a2a2a2;
        }
      }

      .foot {
        line-height: 0.5rem;
        font-size: 0.2rem;
      }
    }
  }
}

.list {
  width: 90%;
  margin: 0 auto;

  li {
    width: 45%;
    height: 3.5rem;
    background: #fff;
    display: inline-block;
    margin: 0.1rem;
    border-radius: 0.2rem;

    img {
      width: 2.55rem;
      height: 2rem;
      border-radius: 0.2rem;
    }

    .foot {
      h3 {
        line-height: 0.5rem;
        margin: 0 0.1rem;
        font-size: 0.3rem;
      }

      .wei {
        text-align: right;
        margin-right: 0.2rem;
        color: #a2a2a2;
      }

      .center {
        line-height: 0.5rem;

        .span1 {
          color: #ff5000;

          i {
            font-size: 0.3rem;
          }
        }

        .span2 {
          font-size: 0.2rem;
          color: #a2a2a2;
        }
      }
    }
  }
}

.a {
  height: 0.7rem;
}

.b {
  height: 50px;
}

.mark {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 6.4rem;
  height: 100vh;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  z-index: 10001;

  .ce {
    width: 5.5rem;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10002;
    background: #fff;
    h3{
      font-size .3rem;
      margin .3rem;
    }
    input{
      width 2rem;
      text-align center;
      height .5rem;
      background #ccc;
      border-radius .2rem;
      margin .2rem;
    }
    button {
      position absolute;
      bottom .3rem;
      width 2rem
      height .5rem;
      right .5rem
      border none ;
      background #ff740b;
      border-radius .3rem;
      color #fff;
    }
  }
}
.zi{
  font-size .3rem;
}
</style>