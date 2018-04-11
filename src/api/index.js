
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
      return this.$http.get("http://127.0.0.1:5000/balance/"+address)
    }
    Vue.prototype.$getTransactionPool = function(address) {
      return this.$http.get("http://127.0.0.1:5000/transaction_pool")
    }
    Vue.prototype.$unspentTransactionOutputs = function(address) {
      return this.$http.get("http://127.0.0.1:5000/address/"+address)
    }
    Vue.prototype.$createTransaction = function(privateKey, receiverAddress, amount){
      return this.$http.post("http://127.0.0.1:5000/send_transaction", { address: receiverAddress, amount: amount, privkey: privateKey});
    }
  }
}

// pri 2937f6419928952216a77efe5da87893711a6b6a9bd6353f0fd430d4fbb8c292
// pub 02252899a4bcdbb3d60015372502e56d2b9573624b967535c29c6480cbed68b7d0

