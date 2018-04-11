<template>
<div>
  <div class="card" v-for="(item, index) in transactions">
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
      transactions: []
    }
  },
  mounted() {
    var $this = this
    this.$getTransactionPool("02252899a4bcdbb3d60015372502e56d2b9573624b967535c29c6480cbed68b7d0").then(function(response){
      if(response.body.err === 0){
          $this.transactions = response.body.data
        }
    })
  },
  computed: {

  },
  methods: {
  }
}


</script>