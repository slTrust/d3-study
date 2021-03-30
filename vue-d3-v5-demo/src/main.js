import Vue from 'vue'
import App from './App.vue'
let d3 = require('./assets/d3.v5.js');
window.d3 = d3;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
