<template>
  <div class="box">
    <ul class="cont">
      <li v-for="(item,index) in data" :key="item.id">
        <div class="box1">
          <img :src="title+item.img" alt />
          <div class="center">
            <h3>{{item.name}}</h3>
            <p class="p3">{{item.color}}</p>
          </div>
          <div class="right">
            <p class="p1">
              ￥{{Number(item.price)*Number(item.quantity)}}
              <span>.00</span>
            </p>
            <p class="p2">
              X
              <span>{{item.quantity}}</span>
            </p>
          </div>
        </div>
        <div class="footer">
          <p class="p3" @click="shanchu(item.id,index)">删除订单</p>
          <p class="p1" v-if="item.isA==0" @click="$router.push('/pingjia?id='+item.waresId)">评价</p>
          <!-- <router-link to="/pingjia" class="p1">评价</router-link> -->
          <p class="p2" @click="$router.push('/order/?id='+item.waresId+'&num='+item.quantity)">再次购买</p>
        </div>
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
      data: [],
      title: "http://localhost:3000/",
      username: ""
    };
  },
  mounted() {
    this.username = sessionStorage.getItem("username");
    this.init(this.username);
  },
  methods: {
    init(username) {
      this.axios({
        method: "get",
        url: API.findBuy,
        params: {
          username
        }
      }).then(res => {
        if (res.data.isok) {
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].isA == 0) {
              this.data.push(res.data.data[i]);
            }
          }
        }
      });
    },
    
    // 删除订单
    shanchu(id, index) {
      this.axios({
        method: "get",
        url: API.delBuy,
        params: {
          id
        }
      }).then(res => {
        if (res.data.isok) {
          Toast.success(res.data.info);
          this.data.splice(index, 1);
        }
        // console.log(res);
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.box {
  padding-top: 1.5rem; /* 100/100 */

  .cont {
    width: 100vw;
    height: 100vh;
    background: #ccc;
    padding-top: 0.1rem; /* 10/100 */

    li {
      width: 90%;
      height: 2.6rem; /* 300/100 */
      background: #fff;
      margin: 0.1rem /* 10/100 */ auto;
      border-radius: 0.2rem; /* 20/100 */

      .footer {
        margin-top: 0.4rem; /* 40/100 */

        .p1, .p2, .p3 {
          border: 0.01rem solid #868686;
          width: 1.5rem; /* 50/100 */
          text-align: center;
          height: 0.5rem; /* 50/100 */
          border-radius: 0.3rem; /* 30/100 */
          line-height: 0.5rem; /* 50/100 */
          display: inline-block;
          color: #868686;
        }

        .p3 {
          margin-left: 0.6rem; /* 300/100 */
        }

        .p1 {
          margin-left: 0.1rem; /* 10/100 */
        }

        .p2 {
          margin-left: 0.1rem; /* 20/100 */
        }
      }

      .box1 {
        width: 100%;
        height: 1.5rem; /* 150/100 */
        display: flex;

        img {
          margin: 0.2rem 0 0 0.2rem; /* 20/100 */
          width: 1.5rem; /* 150/100 */
          height: 1.5rem; /* 150/100 */
        }

        .center {
          margin: 0.2rem /* 20/100 */ 0.1rem 0; /* 10/100 */
          flex: 1;

          h3 {
            font-size: 0.25rem; /* 35/100 */
            line-height: 0.4rem; /* 40/100 */
          }

          .p3 {
            font-size: 0.2rem; /* 20/100 */
            margin-top: 0.2rem; /* 20/100 */
          }
        }

        .right {
          width: 1rem; /* 50/100 */
          margin-right: 0.5rem; /* 30/100 */
          height: 100%;

          .p1 {
            margin-top: 0.3rem; /* 30/100 */
            font-size: 0.3rem; /* 25/100 */

            span {
              font-size: 0.2rem; /* 20/100 */
            }
          }

          .p2 {
            font-size: 0.2rem; /* 20/100 */
            line-height: 0.4rem; /* 40/100 */
            margin-left: 0.2rem; /* 20/100 */

            span {
              font-size: 0.3rem; /* 30/100 */
            }
          }
        }
      }
    }
  }
}
</style>