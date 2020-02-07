<template>
  <div class="sort">
    <div class="left">
      <van-sidebar v-model="activeKey" >
        <van-sidebar-item v-for="item in type" :title="item.name" :key="item.id" @click="onClick(item.name)"/>
       
      </van-sidebar>
    </div>
    <div class="right">
      <ul class="list">
          <li v-for="item in data" :key="item.id" @click="$router.push('/details/'+item.id)">
            <img :src="item.img?title+item.img:''" alt class="pic" />
            <h3>{{item.name}}</h3>
          </li>
        </ul>
    </div>
    <!-- <van-tabs v-model="active" scrollspy sticky @click="onClick">
      <van-tab v-for="item in type" :title="item.name" :key="item.id">
        <ul class="list">
          <li v-for="item in data" :key="item.id" @click="$router.push('/details/'+item.id)">
            <img :src="item.img?title+item.img:''" alt class="pic" />
            <h3>{{item.name}}</h3>
          </li>
        </ul>
      </van-tab>
    </van-tabs>-->
  </div>
</template>
<script>
import API from "../components/API/API";
export default {
  data() {
    return {
      type: [],
      active: "裤子",
      data: [],
      activeKey: "0",
      title: "http://localhost:3000/"
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: API.findNav
    }).then(res => {
      if (res.data.isok) {
        this.type = res.data.data;
        // console.log(this.type)
      }
    });
    this.init(this.active);
  },
  methods: {
    init(title) {
      this.axios({
        method: "get",
        url: API.findWares,
        params: {
          type: title
        }
      }).then(res => {
        // console.log(res);
        if (res.data.isok) {
          this.data = res.data.data;
        }
      });
    },
    onClick(title) {
      // console.log(title);
      this.init(title);
    }
  }
};
</script>
<style lang="stylus" scoped>
.sort {
  width: 100vw;
  height: 100vh;
  display flex;
  .left{
    width 1.3rem /* 100/100 */;
    height .6rem /* 60/100 */;
  }
  .right{
    flex 1;
  }
  .list {
    li {
      display: inline-block;
      width: 29%;
      height: 2rem; /* 200/100 */
      background: #ccc;
      margin: 0.1rem; /* 10/100 */
      text-align: center;

      .pic {
        width: 1rem; /* 100/100 */
        height: 1rem; /* 100/100 */
        border-radius: 50%;
        margin: 0.3rem /* 30/100 */ 0;
      }
    }
  }
}
</style>
