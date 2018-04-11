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
        </div>
        <div class="columns">
          <div class="column" v-if="privkey">
            Private Key (Remember to keep): {{ privkey }}
          </div>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="panel-block" v-if="msg">
        <div class="container">
          <message v-bind:message="msg" v-bind:error="error" v-on:update:msg="val => msg = val"></message>
        </div>
      </div>
      <div>
        <div class="field">
          <label class="label">Address</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" placeholder="Address" v-model="toaddress">
          </div>
          <p class="help is-success">This username is available</p>
        </div>

        <div class="field has-addons">
          <p class="control has-icons-left">
            <input class="input" type="number" v-on:change.prevent.self="validatAmount" v-bind:class="{'is-danger': (inValidatAmount)}" v-model="amount" placeholder="Amount of money">
          </p>
          <p class="control">
            <a class="button">
              {{ balance }}
            </a>
          </p>
        </div>
        <p class="help" v-if="inValidatAmount" v-bind:class="{'is-danger': (inValidatAmount)}" >Amount invalidat</p>


        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" v-bind:class="{'is-loading': isLoading }" v-on:click="sendTransaction">Submit</button>
          </div>
          <div class="control">
            <button class="button is-text" v-on:click="reset">Reset</button>
          </div>
        </div>

      </div>
    </section>

  </section>


</template>

<script>
import Message from '@/components/Message'

export default {
  name: 'wallet',
  components: {
    Message
  },
  data () {
    return {
      msg: '',
      error: false,
      empty: true,
      address: '',
      privkey: '',
      balance: 0.00,
      amount: 0.00,
      toaddress: "",
      isLoading: false,
      inValidatAmount: false
    }
  },
  computed: {
    isEmpty(){
      return this.empty
    },

  },
  methods: {
    generate(){
      this.isLoading = true
      this.error = false
      this.msg = 'Wallet create successfully!'
      this.empty = false
      this.privkey = "2937f6419928952216a77efe5da87893711a6b6a9bd6353f0fd430d4fbb8c292"//this.$generatePrivateKey()
      this.address = this.$getPublicFromWallet(this.privkey)
      this.$getBalance(this.address).then(function(response) {
        if(response.body.err === 0){
          this.balance = response.body.data.balance
        }
        this.isLoading = false
      }).catch(function(err){
        console.log(err)
        this.isLoading = false
      })
      this.isLoading = false
    },
    reset(){
      this.toaddress = ""
      this.amount = 0.00
    },
    sendTransaction(){
      const $this = this
      this.$unspentTransactionOutputs(this.address).then(function(response){
        if(response.body.err === 0){
          const unspentTxOuts = response.body.data || []
          $this.$getTransactionPool($this.address).then(function(response){
            if(response.body.err === 0){
              const txPool = response.body.data || []
              $this.$createTransaction("02252899a4bcdbb3d60015372502e56d2b9573624b967535c29c6480cbed68b7d0", $this.privkey, 1, unspentTxOuts, txPool).then(function(response){
                console.log(response)
              })
            }
          })
        }
      })
    },
    validatAmount(){
      if(this.amount > this.balance){
        this.inValidatAmount = true
      }else{
        this.inValidatAmount = false
      }
    }
  }
}
</script>
