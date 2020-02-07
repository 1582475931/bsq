<template>
  <div class="box">
    <header class="head">
      <span class="left iconfont icon-fanhui" @click="$router.go(-1)"></span>
      <span class="center">收藏宝贝</span>
    </header>
    <ul class="list">
      <li v-for="item in data" :key="item.id" @click="$router.push('/details/'+item.waresId)">
        <img :src="tltie+item.img" alt />
        <div class="list_right">
          <h3>{{item.name}}</h3>
          <p>
            <span>￥</span>
            {{item.price}}
          </p>
        </div>
        <p class="p1" @click.stop="quxiao(item.id)">x</p>
      </li>
    </ul>
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
      tltie: "http://localhost:3000/",
      data: [],
      username: ""
    };
  },
  mounted() {
    this.username = sessionStorage.getItem("username");
    this.find(this.username)
  },
  methods: {
    find(username) {
      this.axios({
        method: "get",
        url: API.findCollection,
        params: {
          username
        }
      }).then(res => {
        if (res.data.isok) {
          this.data = res.data.data;
        }
        console.log(res);
      });
    },
    quxiao(id) {
      this.axios({
        method: "get",
        url: API.delCollection,
        params: {
          id
        }
      }).then(res => {
          if(res.data.isok){
              this.find(this.username)
              Toast.success(res.data.info);
          }
        console.log(res);
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: #f2f2f2;
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
    margin-left: 2.3rem;
  }
}

.list {
  padding-top: 0.8rem; /* 10/100 */
}

.list>li {
  width: 90%;
  height: 2rem; /* 100/100 */
  margin: 0.1rem /* 10/100 */ auto;
  background: #fff;
  display: flex;
  border-radius: 0.2rem; /* 20/100 */

  img {
    width: 2rem; /* 200/100 */
    height: 2rem; /* 200/100 */
    border-radius: 0.2rem; /* 20/100 */
  }

  .list_right {
    flex: 1;
    margin-left: 0.2rem; /* 20/100 */
    position: relative;

    h3 {
      margin-top: 0.2rem; /* 10/100 */
    }

    p {
      position: absolute;
      bottom: 0.2rem; /* 20/100 */
      color: #ff5100;
      font-size: 0.3rem; /* 20/100 */

      span {
        font-size: 0.2rem; /* 20/100 */
      }
    }
  }

  .p1 {
    position: absolute;
    right: 0.6rem; /* 40/100 */
    font-size: 0.4rem; /* 30/100 */
  }
}
</style>