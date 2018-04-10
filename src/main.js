// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
import VueResource from 'vue-resource'
import ec from 'elliptic'
import lodash from 'lodash'

Vue.use(VueResource)
Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$api', { value: api });
Object.defineProperty(Vue.prototype, '$_', { value: lodash });
// Object.defineProperty(Vue.prototype, '$ec', { value: (new ec('secp256k1')) });

/* eslint-disable no-new */
window.wallet = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  ec: ec
})
