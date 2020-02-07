<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <v-head></v-head>
      <p class="a"></p>
      <van-tabs v-model="active" scrollspy sticky @click="onClick">
        <van-tab v-for="item in type" :title="item.name" :key="item.id"></van-tab>
      </van-tabs>
      <van-swipe :autoplay="3000" class="banner">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img :src="title+item.img" alt />
        </van-swipe-item>
      </van-swipe>
      <ul class="nav">
        <li v-for="item in type" :key="item.id" @click="$router.push('/list/'+item.name)">
          <img :src="title+item.img" alt />
          <h4>{{item.name}}</h4>
        </li>
      </ul>
      <p class="pic">
        <img src="../assets/img/xi.png" alt />
      </p>
      <ul class="list">
        <li v-for="item in data" :key="item.id" @click="$router.push('/details/'+item.id)">
          <img :src="title+item.img" alt />
          <h3>{{item.name}}</h3>
          <p>
            <span class="qian">￥{{Number(item.price).toFixed(2)}}</span>
            <span class="mai">{{item.address}}</span>
          </p>
        </li>
      </ul>
    </van-pull-refresh>
  </div>
</template>
<script>
import vHead from "../view/head";
import API from "../components/API/API";
export default {
  data() {
    return {
      isLoading: false,
      title: "http://127.0.0.1:3000",
      images: [],
      type: [],
      data: [],
      active: "裤子"
    };
  },

  mounted() {
    this.axios({
      method: "get",
      url: API.findWares,
      params: {
        score: "3"
      }
    }).then(res => {
      // console.log(res);
      if (res.data.isok) {
        this.data = res.data.data;
      }
    });
    this.axios({
      method: "get",
      url: API.findBanner
    }).then(res => {
      if (res.data.isok) {
        this.images = res.data.data;
      }
    });

    this.axios({
      method: "get",
      url: API.findNav
    }).then(res => {
      if (res.data.isok) {
        this.type = res.data.data;
        // console.log(this.type)
      }
    });
  },

  methods: {
    onClick(name, title) {
      this.$router.push("/list/" + title);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    }
  },
  components: {
    vHead
  }
};
</script>
<style lang="stylus" scoped>
.home {
  width: 100%;
  height: 100%;
  margin-bottom: 0.8rem;
}

.banner {
  // padding-top: 1rem;
  width: 100%;

  img {
    width: 100%;
    height: 3rem;
  }
}

.nav {
  background: #fff;
}

.nav >li {
  display: inline-block;
  width: 25%;
  text-align: center;

  img {
    margin-top: 0.2rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }

  h4 {
    line-height: 0.4rem;
    font-size: 0.2rem;
  }
}

.pic {
  text-align: center;
  height: 0.42rem;
  line-height: 0.35rem;

  img {
    width: 1.62rem;
    height: 0.25rem;
  }
}

.list {
  width: 95%;
  margin: 0.1rem auto;

  li {
    display: inline-block;
    width: 47%;
    height: 4.2rem;
    background: #fff;
    margin: 0 0.1rem 0.2rem 0;
    border-radius: 0.2rem;

    img {
      border-radius: 0.2rem;
      width: 100%;
      height: 2.76rem;
    }

    h3 {
      padding: 0 0.15rem;
      margin-top: 0.13rem;
      height: 0.6rem;
      line-height: 0.6rem;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 0.4rem;
      color: #333333;
    }

    p {
      padding: 0 0.15rem;
    }

    .qian {
      font-size: 0.3rem;
      line-height: 0.25rem;
      color: #ff5500;
    }

    .mai {
      font-size: 0.2rem; /* 20/100 */
      // color: #999999;
      margin-left: 0.1rem; /* 10/100 */
      margin-top: 0.03rem;
    }
  }
}

.a {
  height: 0.9rem; /* 70/100 */
}
</style>