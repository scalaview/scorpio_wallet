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
                <router-link to="/">Wallet</router-link>
              </li>
              <li>
                <router-link to="/transactions">Transactions</router-link>
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
