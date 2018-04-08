import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '@/views/Wallet'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'wallet',
      component: Wallet
    }
  ]
})
