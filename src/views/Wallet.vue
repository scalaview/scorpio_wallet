<template>
  <div class="panel" v-if="isEmpty">
    <a class="button is-large" v-on:click.prevent.self="generate">Create Wallet App</a>
  </div>

  <section class="hero is-primary" v-else-if="!isEmpty">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <h2 class="title">
            Balance {{ balance }}
          </h2>
        </div>
        <div class="columns">
          <div class="column">
            Address: {{ address }}
          </div>
          <div class="column" v-if="privkey">
            Private Key (Remember to keep): {{ privkey }}
          </div>
        </div>
      </div>
    </div>

    <section class="hero is-primary">
      <a class="button is-large">Send Transaction</a>
    </section>

  </section>


</template>

<script>

export default {
  name: 'wallet',
  components: {
  },
  data () {
    return {
      empty: true,
      address: '',
      privkey: '',
      balance: 0.00
    }
  },
  computed: {
    isEmpty(){
      return this.empty
    }
  },
  methods: {
    generate(){
      console.log("click")
      this.empty = false
      this.address = "dwfwagtgabfhijrjtgbfhawjjvfujhvxjhearbjgaohwfncbsehio"
      this.privkey = 'dwefwagvavurijkjghuiarjhbjfrugihkjwergsdbfhbejfwnersvfbhiu'
    }
  }
}
</script>