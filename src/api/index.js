import ec from 'elliptic';
var _ = require('lodash');
// var request = require('request');
var vue = require('vue');


export default {
  generatePrivateKey(){
    const EC = new ec('secp256k1');
    const keyPair = EC.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
  },
  getPublicFromWallet(privateKey) {
    const key = EC.keyFromPrivate(privateKey, 'hex');
    return key.getPublic().encode('hex');
  },
  getBalance(address){
    return this.$http.get("http://127.0.0.1:5000/balance/"+address)
  }
}
