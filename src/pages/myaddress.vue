<template>
  <div class="box">
    <header class="head">
      <span class="left iconfont icon-fanhui" @click="$router.go('-1')"></span>
      <span class="center">我的收货地址</span>
      <span class="right" @click="$router.push('/address/'+0)">添加收货地址</span>
    </header>
    <p class="a"></p>
    <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" />
  </div>
</template>
<script>
import API from "../components/API/API.js";
export default {
  data() {
    return {
      chosenAddressId: "",
      list: []
    };
  },
  mounted() {
    let username = sessionStorage.getItem("username");
    this.find({
      username
    });
  },
  methods: {
    //按条件查询
    find(username) {
      this.axios({
        method: "get",
        url: API.findAddress,
        params: username
      }).then(res => {
        if (res.data.isok) {
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].isDefault == 1) {
              this.chosenAddressId = res.data.data[i].id;
            }
          }
          this.list = res.data.data;
        }
      });
    },
    //点击新增地址
    onAdd() {
      this.$router.push("/address/" + 0);
    },
    //点击编辑
    onEdit(item, index) {
      this.$router.push("/address/" + item.id);
    }
  }
};
</script>
<style lang="stylus" scoped>
.box{
  .van-address-list__add{
    width 100%;
    max-width 6.4rem;
  }
}
.head {
  width: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  height: 0.7rem;
  background: #f9f9f9;
  line-height: 0.7rem;
  position: fixed;

  .left {
    margin-left: 0.2rem;
  }

  .center {
    display: inline-block;
    margin-left: 1.2rem;
  }

  .right {
    float: right;
    margin-right: 0.2rem;
    font-size: 0.24rem;
  }
}

.a {
  height: 0.7rem;
}
</style>