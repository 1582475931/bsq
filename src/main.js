// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//vant-ui库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

//ElementUI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import axios from 'axios'
Vue.prototype.axios=axios;

import "animate.css/animate.css"
//重置样式
import './assets/css/reset.css'
//rem移动端
import './assets/js/remScale2'

//全局过滤器
import filter from './filter/index'
for (var i in filter) {
  Vue.filter(i, filter[i])
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
