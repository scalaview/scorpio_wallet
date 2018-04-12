<template>
<div>
  <div v-if="transactions" class="card" v-for="(item, index) in transactions">
    <header class="card-header">
      <p class="card-header-title">
        Component
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        {{ item.id }}
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">detail</a>
    </footer>
  </div>
</div>
</template>

<script>
export default {
  name: 'transaction',
  components: {
  },
  data () {
    return {
      transactions: null,
      address: null
    }
  },
  mounted() {
    this.address = this.$cookie.get('address')
    if(this.address){
      var $this = this
      this.$getTransactionPool(this.address).then(function(response){
        if(response.body.err === 0){
            $this.transactions = response.body.data
          }
      })
    }
  },
  computed: {

  },
  methods: {
  }
}


</script>