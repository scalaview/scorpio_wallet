// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
import VueResource from 'vue-resource'

var VueCookie = require('vue-cookie');

Vue.use(VueResource)
Vue.use(api)
Vue.use(VueCookie);

Vue.config.productionTip = false
Vue.url.options.root = process.env.API_ROOT;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
