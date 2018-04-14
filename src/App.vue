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
                <router-link to="/">Explore</router-link>
              </li>
              <li>
                <router-link to="/wallet">Wallet</router-link>
              </li>
              <li>
                <router-link to="/transactions">Transactions</router-link>
              </li>
              <li>
                <a v-on:click.prevent.self="logout">Logout</a>
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
    }
  },
  methods: {
    logout () {
      this.$cookie.delete('importprivkey');
      this.$cookie.set('address');
      window.location.reload()
    }
  }
}
</script>
