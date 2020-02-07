<template>
  <div>
    <header class="head">
      <span class="left iconfont icon-fanhui" @click="$router.go(-1)"></span>
      <span class="center">商品评价</span>
      <span class="right" @click="pingjia">发布</span>
    </header>
    <p class="p1"></p>
    <div class="box">
      <img :src="d.img?title+d.img:''" alt />
      <div class="right">
        <h3>{{d.name}}</h3>
      </div>
    </div>
    <div class="box1">
      <h3>描述相符</h3>
      <van-rate  readonly :value="parseInt(d.score)"/>
      <span class="s">{{fen1}}</span>
    </div>
    <textarea name id cols="30" rows="10" v-model="data.content"></textarea>
    <div class="scpre">
      <p>评分</p>
      <van-rate v-model="data.score" @change="onChange" />
      <span class="span">{{fen}}</span>
    </div>
    <!-- <button class="btn" @click="pingjia">评论</button> -->
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
      data: {
        content: "",
        score: 0,
        username: "",
        waresId: "",
        time: ""
      },
      d: [],
      fen:'',
      fen1:'',
      title: "http://localhost:3000/"
    };
  },
  mounted() {
    this.data.username = sessionStorage.getItem("username");
    //   console.log(this.$route.query.id);
    this.data.waresId = this.$route.query.id;
    this.axios({
      method: "get",
      url: API.findWares,
      params: {
        id: this.data.waresId
      }
    }).then(res => {
      console.log(res);

      if (res.data.isok) {
        this.d = res.data.data[0];
         if(Number(res.data.data[0].score)==1){
        this.fen1='非常差'
      }
       if(Number(res.data.data[0].score)==2){
        this.fen1='差'
      }
       if(Number(res.data.data[0].score)==3){
        this.fen1='一般'
      }
       if(Number(res.data.data[0].score)==4){
        this.fen1='好'
      }
       if(Number(res.data.data[0].score)==5){
        this.fen1='非常好'
      }
      }
    });
  },
  methods: {
     onChange(value) {
      // Toast('当前值：'+ value);
      if(value==1){
        this.fen='非常差'
      }
       if(value==2){
        this.fen='差'
      }
       if(value==3){
        this.fen='一般'
      }
       if(value==4){
        this.fen='好'
      }
       if(value==5){
        this.fen='非常好'
      }
    },
    // 商品评价
    pingjia() {
      this.data.time = new Date().getTime();
      this.axios({
        method: "post",
        url: API.addComment,
        data: this.data
      }).then(res => {
        if (res.data.isok) {
          this.$router.push("/index/home");
          Toast.success(res.data.info);
        } else {
          Toast.fail(res.data.info);
        }
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.btn {
  border: none;
  width: 3rem; /* 300/100 */
  height: 0.5rem; /* 50/100 */
  margin-left: 1.5rem; /* 200/100 */
  background: red;
}
.box1{
  h3{
    display inline-block;
    font-size .4rem /* 40/100 */;
    margin .2rem /* 20/100 */ ;
  }
  .s{
    margin-left .3rem /* 30/100 */;
  }
}
.box {
  width: 90%;
  margin: 0.1rem auto;
  height: 1rem; /* 100/100 */
  display: flex;

  img {
    width: 1rem; /* 100/100 */
    height: 1rem; /* 100/100 */
  }

  .right {
    flex: 1;
    margin: 0.2rem; /* 20/100 */
  }
}

.head {
  width: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  height: 0.7rem;
  // background: #d31215;
  line-height: 0.7rem;
  position: fixed;
  // color: #fff;
  font-size: 0.36rem; /* 40/100 */

  .left {
    margin-left: 0.2rem;
  }

  .center {
    display: inline-block;
    margin-left: 1.7rem;
  }

  .right {
    margin-left: 1.6rem; /* 200/100 */
    color: #fb5104;
  }
}

.scpre {
  margin: 0.2rem /* 20/100 */ 0.2rem; /* 10/100 */
  .span{
    margin-left .4rem /* 40/100 */;
  }

  p {
    display: inline-block;
    font-size: 0.3rem; /* 30/100 */
  }
}

.p1 {
  height: 0.8rem; /* 70/100 */
}

textarea {
  display: block;
  border: 0.01rem solid #ccc;
  width: 90%;
  margin: auto;
}
</style>