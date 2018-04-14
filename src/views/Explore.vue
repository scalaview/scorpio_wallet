<template>
  <div>
    <table class="table is-striped" v-if="blocks">
      <thead>
        <tr>
          <th>Height</th>
          <th>Reward</th>
          <th>Difficulty</th>
          <th>Time</th>
          <th>Hash</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in blocks">
          <th>{{ item.index }}</th>
          <th>{{ item.transactions[0].tx_outs[0].amount }}</th>
          <th>{{ item.difficulty }}</th>
          <th>{{ item.timestamp | formatDate }}</th>
          <th>{{ item.hash }}</th>
        </tr>
      </tbody>
    </table>
    <section class="section" v-if="pending_tx">
      <div class="container">
        <h2 class="subtitle">
          Unconfirmed Txs Count: {{ pending_tx }}
        </h2>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'explore',
  components: {
  },
  data () {
    return {
      blocks: null,
      pending_tx: null
    }
  },
  mounted() {
    var $this = this
    this.$blocks().then(function(response){
      if(response.body.err === 0){
        $this.blocks = response.body.data.reverse().slice(0, 10)
      }
    })
    this.$getTransactionPool().then(function(response){
      if(response.body.err === 0 && response.body.data){
        $this.pending_tx = response.body.data.length
      }else{
        $this.pending_tx = null
      }
    })
  },
  computed: {
  },
  methods: {
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(value*1000).fromNow()
      }
    }
  }
}


</script>