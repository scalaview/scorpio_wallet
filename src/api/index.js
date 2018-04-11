
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
    Vue.prototype.$createTransaction = function(receiverAddress, privateKey, amount, unspentTxOuts, txPool){
      const $this = this
      console.log('txPool: %s', JSON.stringify(txPool));

      const myAddress = this.$getPublicFromWallet(privateKey)
      const myUnspentTxOutsA = unspentTxOuts.filter((uTxO) => uTxO.address === myAddress);
      const myUnspentTxOuts = this.$filterTxPoolTxs(myUnspentTxOutsA, txPool);

      const { includedUnspentTxOuts, leftOverAmount } = this.$findTxOutsForAmount(amount, myUnspentTxOuts);
      const toUnsignedTxIn = (unspentTxOut) => {
          return {
            tx_out_id: unspentTxOut.tx_out_id,
            tx_out_index: unspentTxOut.tx_out_index
          }
      };

      const findUnspentTxOut = (transactionId, index, aUnspentTxOuts) => {
          return aUnspentTxOuts.find((uTxO) => uTxO.tx_out_id === transactionId && uTxO.tx_out_index === index);
      };

      const toHexString = (byteArray) => {
          return Array.from(byteArray, (byte) => {
              return ('0' + (byte & 0xFF).toString(16)).slice(-2);
          }).join('');
      };

      const signTxIn = (transaction, txInIndex,
                  privateKey, aUnspentTxOuts) => {
          const txIn = transaction.tx_ins[txInIndex];

          const dataToSign = transaction.id;
          const referencedUnspentTxOut = findUnspentTxOut(txIn.tx_out_id, txIn.tx_out_index, aUnspentTxOuts);
          if (referencedUnspentTxOut == null) {
              console.log('could not find referenced txOut');
              throw Error();
          }
          const referencedAddress = referencedUnspentTxOut.address;

          if ($this.$getPublicFromWallet(privateKey) !== referencedAddress) {
              console.log('trying to sign an input with private' +
                  ' key that does not match the address that is referenced in txIn');
              throw Error();
          }
          const key = $this.$ec.keyFromPrivate(privateKey, 'hex');
          const signature = toHexString(key.sign(dataToSign).toDER());

          return signature;
      };
      const unsignedTxIns = includedUnspentTxOuts.map(toUnsignedTxIn);
      const tx = {};
      tx.tx_ins = unsignedTxIns;
      tx.tx_outs = this.$createTxOuts(receiverAddress, myAddress, amount, leftOverAmount);
      tx.id = this.$getTransactionId(tx);
      tx.tx_ins = tx.tx_ins.map((txIn, index) => {
          txIn.signature = signTxIn(tx, index, privateKey, unspentTxOuts);
          return txIn;
      });
      console.log(tx)
      return this.$http.post("http://127.0.0.1:5000/transactions", {transactions: [tx]});
    }

    Vue.prototype.$filterTxPoolTxs = function(unspentTxOuts, transactionPool){
        const txIns = this.$l(transactionPool)
            .map((tx) => tx.tx_ins)
            .flatten()
            .value();
        const removable = [];
        for (const unspentTxOut of unspentTxOuts) {
            const txIn = this.$l.find(txIns, (aTxIn) => {
                return aTxIn.tx_out_index === unspentTxOut.tx_out_index && aTxIn.tx_out_id === unspentTxOut.tx_out_id;
            });

            if (txIn === undefined) {
            } else {
                removable.push(unspentTxOut);
            }
        }

        return this.$l.without(unspentTxOuts, ...removable);
    }

    Vue.prototype.$findTxOutsForAmount = function(amount, myUnspentTxOuts){
      let currentAmount = 0;
      const includedUnspentTxOuts = [];
      for (const myUnspentTxOut of myUnspentTxOuts) {
          includedUnspentTxOuts.push(myUnspentTxOut);
          currentAmount = currentAmount + myUnspentTxOut.amount;
          if (currentAmount >= amount) {
              const leftOverAmount = currentAmount - amount;
              return {includedUnspentTxOuts, leftOverAmount};
          }
      }

      const eMsg = 'Cannot create transaction from the available unspent transaction outputs.' +
          ' Required amount:' + amount + '. Available unspentTxOuts:' + JSON.stringify(myUnspentTxOuts);
      throw Error(eMsg);
    }
    Vue.prototype.$createTxOuts = function(receiverAddress, myAddress, amount, leftOverAmount){
        if (leftOverAmount === 0) {
            return [{
              address: receiverAddress,
              amount: amount
            }];
        } else {
            return [{
              address: receiverAddress,
              amount: amount
            }, {
              address: myAddress,
              amount: leftOverAmount
            }];
        }
    }
    Vue.prototype.$getTransactionId = function(transaction){
        const txInContent = transaction.tx_ins
            .map((txIn) => txIn.tx_out_id + txIn.tx_out_index)
            .reduce((a, b) => a + b, '');

        const txOutContent = transaction.tx_outs
            .map((txOut) => txOut.address + Number.parseFloat(txOut.amount).toFixed(6))
            .reduce((a, b) => a + b, '');

        return this.$CryptoJS.SHA256(txInContent + txOutContent).toString();
    };
  }
}

// pri 2937f6419928952216a77efe5da87893711a6b6a9bd6353f0fd430d4fbb8c292
// pub 02252899a4bcdbb3d60015372502e56d2b9573624b967535c29c6480cbed68b7d0

