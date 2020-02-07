<template>
<div>
<ul class="list">
    <li>
        <img src="https://img03.sogoucdn.com/net/a/04/link?url=http%3A%2F%2Fimg01.sogoucdn.com%2Fapp%2Fa%2F100520024%2F3c058db218a32597aff89de103064709&appid=122" alt="">
        <h3>名称</h3>
    </li>
    
</ul>
</div>
</template>
<script>
import API from '../components/API/API'
export default {
    data() {
        return {
            data:[]
        }
    },
    mounted() {
    
    var type=this.$route.query.name
     this.axios({
      method:'get',
      url: API.findWares,
      params: {
        type
      }
    }).then(res=>{
      console.log(res)
      if(res.data.isok){
        this.data=res.data.data;
      }
    })
    },
};
</script>
<style lang='stylus' scoped>
.list{
    width 100%;
    height 100%;
    li{
        margin-top .2rem /* 20/100 */;
        width 1.5rem /* 200/100 */;
        height 2rem /* 100/100 */;
        text-align center;
        background red;
        display inline-block;
        margin-left .05rem /* 10/100 */;
        img{
            width 1rem /* 50/100 */;
            height 1rem /* 50/100 */;
            border-radius 50%;
            margin-top .2rem /* 30/100 */;
        }
        h3{
            font-size .3rem /* 30/100 */;
            line-height .6rem /* 60/100 */;
        }
    }
}
</style>
