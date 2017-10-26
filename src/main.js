import Vue from 'vue'
import App from './App'
import router from './router'
import utils from './assets/js/utils.js'
window.Vue=Vue;
Vue.use(utils);

Vue.config.debug = true;

require("./assets/css/base.css");
require('./assets/js/layer/layer.js');
require("./assets/js/layer/need/layer.css");


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
