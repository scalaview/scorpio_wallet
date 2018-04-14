
var EC = require('elliptic').ec;
import lodash from 'lodash';
import * as CryptoJS from 'crypto-js';

export default {
  install: function(Vue, options) {
    Vue.prototype.$l = lodash
    Vue.prototype.$ec = new EC('secp256k1');
    Vue.prototype.$CryptoJS = CryptoJS;

    Vue.prototype.$generatePrivateKey = function(){
      const keyPair = this.$ec.genKeyPair();
      const privateKey = keyPair.getPrivate();
      return privateKey.toString(16);
    };
    Vue.prototype.$getPublicFromWallet = function(privateKey) {
      const key = this.$ec.keyFromPrivate(privateKey, 'hex');
      return key.getPublic(true, 'hex')
    }
    Vue.prototype.$getBalance = function(address){
      return this.$http.get("balance/"+address)
    }
    Vue.prototype.$getTransactionPool = function(address) {
      return this.$http.get("transaction_pool")
    }
    Vue.prototype.$unspentTransactionOutputs = function(address) {
      return this.$http.get("address/"+address)
    }
    Vue.prototype.$createTransaction = function(privateKey, receiverAddress, amount){
      return this.$http.post("send_transaction", { address: receiverAddress, amount: amount, privkey: privateKey});
    }
    Vue.prototype.$blocks = function(){
      return this.$http.get("blocks");
    }
  }
}

