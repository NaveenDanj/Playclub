import Vue from 'vue'
import App from './App.vue'
import { initSocket } from './socketConfig';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

initSocket();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
