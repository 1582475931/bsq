<template>
<div>
    <v-head></v-head>
    <router-view></router-view>
</div>
</template>
<script>
import vHead from '../view/buyHead'
import API from '../components/API/API'
export default {
    components:{
        vHead
    },
};
</script>
<style lang='stylus' scoped>
</style>