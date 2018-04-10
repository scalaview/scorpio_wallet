
import ec from 'elliptic'
import lodash from 'lodash'

export default {
  install: function(Vue, name = '$api') {
    Object.defineProperty(Vue.prototype, name, { value: axios });
  },
  generatePrivateKey(){
    debugger
    const keyPair = this.$ec.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
  },
  getPublicFromWallet(privateKey) {
    const key = this.$ec.keyFromPrivate(privateKey, 'hex');
    return key.getPublic().encode('hex');
  },
  getBalance(address){
    return this.$http.get("http://127.0.0.1:5000/balance/"+address)
  }
}
