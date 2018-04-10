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
      this.privkey = this.$generatePrivateKey()
      this.address = this.$getPublicFromWallet(this.privkey)
      this.isLoading = false
    },
    reset(){
      this.toaddress = ""
      this.amount = 0.00
    },
    sendTransaction(){
      this.isLoading = true
      this.$api.getBalance.call(this, [this.address]).then(function(response){
        if(response.body.err === 0){
          this.balance = response.body.data.balance
        }
        this.isLoading = false
      }, function(err){
        console.log(err)
        this.isLoading = false
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