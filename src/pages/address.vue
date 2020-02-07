<template>
  <div>
    <header class="head">
      <span class="left iconfont icon-fanhui" @click="$router.go('-1')"></span>
      <span class="center">添加收货地址</span>
    </header>
    <p class="a"></p>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      :address-info="addressInfo"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import areaList from "../assets/js/shu";
import API from "../components/API/API";
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);

export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {},
      username: "",
      id: ""
    };
  },
  mounted() {
    //获取路由传值id
    this.id = this.$route.params.id;
    this.username = sessionStorage.getItem("username");
    if (this.id == 0) {
      return;
    }
    this.find({
      id: this.id
    });
  },
  methods: {
    //查询
    find(id) {
      this.axios({
        method: "get",
        url: API.findAddress,
        params: id
      }).then(res => {
        if (res.data.isok) {
          if (res.data.data[0].isDefault == 1) {
            res.data.data[0].isDefault = true;
          }
          this.addressInfo = res.data.data[0];
        }
      });
    },
    //添加
    onSave(content) {
      //当id=0执行
      if (this.id == 0) {
        content["username"] = this.username;
        this.axios({
          method: "post",
          url: API.address,
          data: content
        }).then(res => {
          if (res.data.isok) {
            Toast.success(res.data.info);
            this.$router.push("/myaddress");
          } else {
            Toast.fail(res.data.info);
          }
        });
      } else {
        delete content.areaCode;
        delete content.country;
        delete content.postalCode;
        this.axios({
          method: "post",
          url: API.updateAddress,
          data: content
        }).then(res => {
          if (res.data.isok) {
            Toast.success(res.data.info);
            this.$router.push("/myaddress");
          } else {
            Toast.fail(res.data.info);
          }
        });
      }
    },
    //删除
    onDelete() {
      if (this.id == 0) {
        return;
      }
      this.axios({
        method: "get",
        url: API.delAddress,
        params: {
          id: this.id
        }
      }).then(res => {
        if (res.data.isok) {
          Toast.success(res.data.info);
          this.$router.push("/myaddress");
        } else {
          Toast.fail(res.data.info);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
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
    margin-left: 2rem;
  }
}

.a {
  height: 0.7rem;
}
</style>