<template>
  <div class="panel" v-if="isEmpty">
    <a class="button is-large" v-on:click.prevent.self="generate">Create Wallet App</a>
    <br>
    OR
    <div class="field has-addons">
      <div class="control">
        <input class="input" v-model='importprivkey' type="text" placeholder="Private key">
      </div>
      <div class="control">
        <a class="button is-info" v-on:click.prevent.self="importkey">
          Import
        </a>
      </div>
    </div>
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
            <input class="input" type="text" placeholder="Address" v-model="receiverAddress">
          </div>
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
    var importprivkey = this.$cookie.get('importprivkey'),
        address = this.$cookie.get('address'),
        empty = true;
    if (importprivkey && address){
      empty = false
    }
    return {
      msg: '',
      error: false,
      empty: empty,
      address: address,
      privkey: null,
      balance: 0.00,
      amount: 0.00,
      receiverAddress: null,
      isLoading: false,
      inValidatAmount: false,
      importprivkey: importprivkey
    }
  },
  computed: {
    isEmpty(){
      return this.empty
    }
  },
  methods: {
    generate(){
      this.isLoading = true
      this.error = false
      this.msg = 'Wallet create successfully!'
      this.empty = false
      this.privkey = this.$generatePrivateKey()
      this.address = this.$getPublicFromWallet(this.privkey)
      this.$cookie.set('importprivkey', this.privkey, { expires: '6M' });
      this.$cookie.set('address', this.address, { expires: '6M' });
      this.$getBalance(this.address).then(function(response) {
        if(response.body.err === 0){
          this.balance = response.body.data.balance
        }else{
          this.error = true
          this.msg = response.body.message
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
      var $this = this
      this.isLoading = true
      this.$createTransaction(this.importprivkey || this.privkey, this.receiverAddress, parseFloat(this.amount)).then(function(response){
        if(response.body.err === 0){
          $this.msg = "transaction create successfully! tx id: " + response.body.data.id
        }else{
          this.error = true
          $this.msg = response.body.message
        }
        this.isLoading = false
      }).catch(function(err){
        this.isLoading = false
      })
    },
    validatAmount(){
      if(this.amount > this.balance){
        this.inValidatAmount = true
      }else{
        this.inValidatAmount = false
      }
    },
    importkey(){
      this.isLoading = true
      this.address = this.$getPublicFromWallet(this.importprivkey)
      this.$cookie.set('importprivkey', this.importprivkey, { expires: '6M' });
      this.$cookie.set('address', this.address, { expires: '6M' });
      this.$getBalance(this.address).then(function(response) {
        if(response.body.err === 0){
          this.balance = response.body.data.balance
        }else{
          this.error = true
          this.msg = response.body.message
        }
        this.isLoading = false
      }).catch(function(err){
        console.log(err)
        this.isLoading = false
      })
      this.empty = false
      this.isLoading = false
    }
  },
  beforeMount(){
    if(this.address){
      this.$getBalance(this.address).then(function(response) {
        if(response.body.err === 0){
          this.balance = response.body.data.balance
        }else{
          this.error = true
          this.msg = response.body.message
        }
      }).catch(function(err){
        console.log(err)
      })
    }
  }
}
</script>
