import Vue from 'vue'
import App from './App.vue'
import { initSocket } from './socketConfig';
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store';

Vue.config.productionTip = false

initSocket();

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
