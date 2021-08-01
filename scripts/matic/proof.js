require('dotenv').config();

const XHR = require('xhr2-cookies').XMLHttpRequest

XHR.prototype._onHttpRequestError = function (request, error) {
  if (this._request !== request) {
      return;
  }
  // A new line
  console.log(error, 'request')
  this._setError();
  request.abort();
  this._setReadyState(XHR.DONE);
  this._dispatchProgress('error');
  this._dispatchProgress('loadend');
};

let alchemyKey = process.env.ALCHEMY_KEY || "";

const maticPOSClient = new require("@maticnetwork/maticjs").MaticPOSClient({
  maticProvider: `https://polygon-mumbai.g.alchemy.com/v2/${alchemyKey}`, // replace if using mainnet
  parentProvider: `https://eth-goerli.alchemyapi.io/v2/${alchemyKey}`, // replace if using mainnet
});

maticPOSClient.posRootChainManager.customPayload(
    "0xfbeccb86469bdff98952e6f9911259094ba1663cb273ee2e01f5709a614d2d1c", // replace with txn hash of sendMessageToRoot
    "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036" // SEND_MESSAGE_EVENT_SIG, do not change
).then(console.log)
 .catch(err => {
      console.error(err)
    })