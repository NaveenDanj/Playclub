import Vue from 'vue'
import App from './App.vue'
import { initSocket } from './socketConfig';

Vue.config.productionTip = false

initSocket();

new Vue({
  render: h => h(App),
}).$mount('#app')
