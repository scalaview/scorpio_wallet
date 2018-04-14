import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '@/views/Wallet'
import Explore from '@/views/Explore'
import Transactions from '@/views/Transactions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'explore',
      component: Explore
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    }
  ]
})
