<style scope>
.navbar-start > .navbar-item.active {
  background-color: #eee
}
.section .panel {
  overflow: hidden;
}
</style>

<template>
<div id="app">
  <section class="hero">
  </section>
  <div class="container">
<!--     <nav class="navbar">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">wallet</router-link>

        <div class="navbar-burger burger" v-on:click.prevent="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu" v-bind:class="{'is-active': isMenuActive}">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/wallet-seed">Seed Wallet</router-link>
          <router-link class="navbar-item" to="/import-keystore">Import Wallet</router-link>
          <router-link class="navbar-item" to="/value-transaction">Value Transaction</router-link>
        </div>
      </div>
    </nav> -->
    <!-- Main container -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <aside class="menu">
            <p class="menu-label">
              Wallet
            </p>
            <ul class="menu-list">
              <li>
                <router-link to="/wallet-seed">Seed Wallet</router-link>
              </li>
              <li>
                <router-link to="/import-keystore">Import Wallet</router-link>
              </li>
              <li>
                <router-link to="/wallet-seed">Seed Wallet</router-link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
      <div class="level-item">
        <section class="section">
          <div>
            <transition appear>
              <router-view></router-view>
            </transition>
          </div>
        </section>
      </div>
    </nav>
  </div>
  <footer class="footer">
    <div class="container">
    </div>
  </footer>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isMenuActive: false
    }
  },
  methods: {
    toggleMenu () {
      if (this.isMenuActive) {
        this.isMenuActive = false
      } else {
        this.isMenuActive = true
      }
    }
  }
}
</script>
