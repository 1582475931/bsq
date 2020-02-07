<template>
  <div class="box">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <header class="head">
        <span class="left iconfont icon-fanhui" @click="$router.go('-1')"></span>
        <span class="center">详情</span>
      </header>
      <p class="a"></p>

      <img :src="data.img?tltle+data.img:''" alt class="pic" />

      <div class="nav">
        <p class="p">
          ￥
          <span>{{Number(data.price).toFixed(2)}}</span>
        </p>
        <h4>{{data.name}}</h4>
        <p class="p1">
          <span
            class="iconfont icon-meiyouzanguokongxin span1"
            @click="dian"
            v-if="d1.length==0"
          >{{num}}人赞过</span>
          <span class="iconfont icon-dianzan span3" @click="dian1" v-else>{{num}}人赞过</span>
          <span class="iconfont icon-yonghu1 span2">帮我选</span>
        </p>
      </div>
      <div class="nav_bg">
        <van-rate v-model="value" readonly />

        <p class="p">
          <span>发货</span>
          <span class="iconfont icon--location">{{data.address}}</span>
          <i>|</i>
          <span>快递</span>
          <span>免费</span>
        </p>
        <p class="p1" @click="show1 = true">
          <span>服务</span>
          <span>七天无理由 运费险</span>
          <i class="iconfont icon-fanhui-copy"></i>
        </p>
      </div>
      <div class="ping">
        <h3>宝贝评论</h3>
        <div class="pinglun" v-for="item in data1" :key="item.id">
          <img :src="item.ava?tltle+item.ava:''" alt />
          <div class="pinglun_right">
            <h3>{{item.name}}</h3>
            <span>{{item.time|time()}}</span>
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <!-- 服务 -->
    <van-action-sheet v-model="show1" title="基础服务">
      <div class="show">
        <img src="../assets/img/tu.png" alt />
        <p class="p">
          <span>七天无理由</span>
          <b>满足7天无理由退换货申请的前提下，包邮商品需要买家承担退货邮费，非包邮商品需要买家承担发货和退货邮费。</b>
        </p>
      </div>
      <div class="show">
        <img src="../assets/img/tu.png" alt />
        <p class="p">
          <span>运费险</span>
          <b>卖家为您购买的商品投保退货运费险（保单生效以确认订单页展示的运费险为准）</b>
        </p>
      </div>
      <h4>其他</h4>
      <div class="show">
        <img src="../assets/img/tu.png" alt />
        <p class="p">信用卡支付</p>
      </div>
      <div class="show">
        <img src="../assets/img/tu.png" alt />
        <p class="p">蚂蚁花呗</p>
      </div>
      <div class="show">
        <img src="../assets/img/tu.png" alt />
        <p class="p">集分宝</p>
      </div>
      <button @click="show1=false">完成</button>
    </van-action-sheet>
    <van-goods-action>
      <van-goods-action-icon icon="star-o" text="收藏" @click="onSou" v-if="d.length==0" />
      <van-goods-action-icon icon="star" text="已收藏" v-else @click="onQu(d[0].id)" class="yan" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/index/cart')" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
      <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
    </van-goods-action>
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
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
      value: 1,
      d: [],
      d1: [],
      show: false,
      show1: false,
      isLoading: false,
      username: "",
      num: "0",
      id: "",
      data: [],
      data1: [],
      tltle: "http://localhost:3000/",
      goods: {
        // 默认商品 sku 缩略图
        picture: ""
      },
      sku: {
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [
              {
                id: "1215",
                name: "",
                imgUrl: "",
                previewImgUrl: ""
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100 * 100, // 价格（单位分）
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1193", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            name: "",
            stock_num: 100 // 当前 sku 组合对应的库存
          }
        ],
        price: "", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261 // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
      }
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.username = sessionStorage.getItem("username");
    this.find({
      username: this.username,
      waresId: this.id
    });
    this.init();
    this.init1();
    this.axios({
      method: "get",
      url: API.findComment,
      params: {
        waresId: this.id
      }
    }).then(res => {
      if (res.data.isok) {
        this.data1 = res.data.data;
      }
      // console.log(res);
    });
    this.axios({
      method: "get",
      url: API.findWares,
      params: {
        id: this.id
      }
    }).then(res => {
      if (res.data.isok) {
        this.data = res.data.data[0];
        this.value = parseInt(res.data.data[0].score);
        this.goods.picture = this.tltle + res.data.data[0].img;
        this.sku.list[0].price = res.data.data[0].price * 100;
        this.sku.list[0].stock_num = parseInt(res.data.data[0].num);
        this.sku.list[0].id = parseInt(res.data.data[0].id);
        this.sku.list[0].name = res.data.data[0].color;
        this.sku.tree[0].v[0].name = res.data.data[0].color;
        // this.sku.v[0].imgUrl=this.tltle+res.data.data[0].img
        // this.sku.v[0].previewImgUrl=this.tltle+res.data.data[0].img
      }
    });
  },
  methods: {
    onQu(id) {
      this.axios({
        method: "get",
        url: API.delCollection,
        params: {
          id
        }
      }).then(res => {
        if (res.data.isok) {
          Toast.success(res.data.info);
          this.find({
            username: this.username,
            waresId: this.id
          });
        }
      });
    },
    // 收藏查询
    find(data) {
      this.axios({
        method: "get",
        url: API.findCollection,
        params: data
      }).then(res => {
        if (res.data.isok) {
          this.d = res.data.data;
        }
      });
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    // 点赞查询
    init() {
      this.axios({
        method: "get",
        url: API.findpoint,
        params: {
          waresId: this.id
        }
      }).then(res => {
        if (res.data.isok) {
          var sum = 0;
          for (var i = 0; i < res.data.data.length; i++) {
            sum += Number(res.data.data[i].num);
          }
          this.num = sum;
        }
        // console.log(res);
      });
    },
    //判断是否点赞
    init1() {
      this.axios({
        method: "get",
        url: API.findpoint,
        params: {
          username: this.username,
          waresId: this.id
        }
      }).then(res => {
        if (res.data.isok) {
          //  console.log(res);
          this.d1 = res.data.data;
        }
        // console.log(res);
      });
    },

    //点赞
    dian() {
      var data = {
        num: 1,
        username: this.username,
        waresId: this.id
      };
      this.axios({
        method: "post",
        url: API.addPoint,
        data
      }).then(res => {
        // if (res.data.isok) {
        //   this.init()
        // }
        if (res.data.isok) {
          this.init();
          this.init1();
          Toast.success(res.data.info);
        } else {
          Toast.fail(res.data.info);
        }
      });
    },
    dian1() {
      Toast.fail("该商品已点赞过");
    },

    // 加入收藏
    onSou() {
      this.axios({
        method: "post",
        url: API.addCollection,
        data: {
          username: this.username,
          waresId: this.id
        }
      }).then(res => {
        // console.log(res);
        if (res.data.isok) {
          Toast.success(res.data.info);
          this.find({
            name: this.username,
            waresId: this.id
          });
        } else {
          Toast.fail(res.data.info);
        }
      });
    },
    //立即购买
    onBuyClicked(skuData) {
      console.log(skuData);
      if (!this.username) {
        this.$router.push("/login");
        return;
      }
      this.$router.push(
        "/order/?id=" +
          skuData.selectedSkuComb.id +
          "&num=" +
          skuData.selectedNum
      );
    },
    //加入购物车
    onAddCartClicked(skuData) {
      if (!this.username) {
        this.$router.push("/login");
        return;
      }
      var data = {
        num: skuData.selectedNum,
        waresId: skuData.selectedSkuComb.id,
        username: this.username
      };
      this.axios({
        method: "post",
        url: API.addCart,
        data
      }).then(res => {
        if (res.data.isok) {
          this.show = false;
          Toast.success(res.data.info);
        } else {
          Toast.fail(res.data.info);
        }
      });
    },
    onClickIcon() {
      this.show = true;
    },
    onClickButton() {
      this.show = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.box {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
}

.pic {
  width: 100%;
  height: 4rem;
}

.nav {
  width: 100%;
  height: 1.7rem;
  background: #fff;
  margin-bottom: 0.25rem;

  .p {
    color: #ff884c;
    padding: 0.1rem 0.2rem;

    span {
      font-size: 0.3rem;
      font-style: italic;
    }
  }

  h4 {
    margin: 0.1rem 0.2rem;
    font-size: 0.35rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .p1 {
    padding: 0.1rem 0;
    width: 100%;
    display: flex;
    text-align: center;
    color: #999999;

    span {
      flex: 1;
    }

    .span3 {
      color: #ff5000;
    }
  }
}

.nav_bg {
  background: #fff;

  .van-rate {
    margin: 0 0.2rem;
  }

  >>>.van-rate__icon {
    font-size: 0.3rem;
  }

  .p {
    margin: 0 0.2rem;
    height: 0.4rem;
    line-height: 0.4rem;
  }

  .p1 {
    margin: 0 0.2rem;
    height: 0.4rem;
    line-height: 0.4rem;

    i {
      float: right;
    }
  }
}

.van-action-sheet {
  height: 4.5rem;

  button {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 0.5rem;
    border: none;
    background-image: linear-gradient(to right, #FF9000 0%, #FF5000 100%);
    font-size: 0.3rem;
    color: #fff;
  }

  h4 {
    text-align: center;
    font-size: 0.3rem;
  }

  .show {
    display: flex;
    margin: 0.1rem 0.2rem;

    img {
      width: 0.3rem;
      height: 0.3rem;
    }

    .p {
      margin-left: 0.2rem;

      span {
        display: block;
        line-height: 0.3rem;
      }
    }
  }
}

.ping {
  width: 100%;
  margin: 0.2rem 0 1rem 0;
  background: #fff;
}

.ping>h3 {
  display: inline-block;
  font-size: 0.24rem;
  line-height: 0.5rem;
  margin-left: 0.1rem;
}

.pinglun {
  border-top: 0.01rem solid #ccc;
  height: 1.5rem;
  display: flex;
}

.pinglun>img {
  width: 0.76rem;
  height: 0.76rem;
  border-radius: 50%;
  margin: 0.3rem;
  border: 0.01rem solid #ccc;
}

.pinglun_right {
  flex: 1;
}

.pinglun_right>h3 {
  display: inline-block;
  font-size: 0.26rem;
  font-weight: bold;
  line-height: 0.4rem;
  margin-top: 0.3rem;
}

.pinglun_right>span {
  float: right;
  margin: 0.3rem 0.3rem 0 0;
}

.pinglun_right>p {
  font-size: 0.16rem;
  line-height: 0.24rem;
  color: #666666;
}

.head {
  width: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  height: 0.7rem;
  background: #fff;
  line-height: 0.7rem;
  position: fixed;

  .left {
    margin-left: 0.2rem;
  }

  .center {
    display: inline-block;
    margin-left: 2.4rem;
  }
}

.a {
  height: 0.7rem;
}

>>>.van-icon-star {
  color: #ff5000;
}

.van-goods-action {
  max-width: 6.4rem;
  margin: auto;
}
</style>