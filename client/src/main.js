import Vue from 'vue'
import App from './App.vue'
import { initSocket } from './socketConfig';
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

initSocket();

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
