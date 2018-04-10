
var EC = require('elliptic').ec;
var ba = require('binascii');
import lodash from 'lodash';

export default {
  install: function(Vue, options) {
    Vue.prototype.$l = lodash
    Vue.prototype.$ec = new EC('secp256k1');

    Vue.prototype.$generatePrivateKey = function(){
      const keyPair = this.$ec.genKeyPair();
      const privateKey = keyPair.getPrivate();
      return privateKey.toString(16);
    };
    Vue.prototype.$getPublicFromWallet = function(privateKey) {
      const key = this.$ec.keyFromPrivate(privateKey, 'hex');
      // debugger
      // ba.hexlify(key.getPublic()).decode('ascii')
      return key.getPublic().encode('hex')
    }
    Vue.prototype.$getBalance = function(address){
      return this.$http.get("http://127.0.0.1:5000/balance/"+address)
    }
  }
}

// pri 2937f6419928952216a77efe5da87893711a6b6a9bd6353f0fd430d4fbb8c292
// pub 02e525a9b78192e0a589a0ef74fc053ec97f5aabffe74263f968a57d08424a1e06
