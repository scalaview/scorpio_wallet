import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '@/views/Wallet'
import Transactions from '@/views/Transactions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
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
