var merge = require("webpack-merge");
var stagingEnv = require("./staging.env");

let envVal = merge(stagingEnv, {
  API_ROOT: '"http://api.mw006.net/"',
  CABLE_ROOT: '"http://ws.mw006.net/"'
  // HOME_ROOT: '"http://www.oneph.top/"',
  // API_ROOT: '"http://api.oneph.top/"',
  // HOME_ROOT: '"http://www.oneph.top/"'
  // Payment_ROOT: '"http://13.124.248.111"'
  // PAYMENT_ROOT: '"http://22771884.ngrok.io"'
  // API_ROOT: '"https://api.manwin5.com/"',
  // CABLE_ROOT: '"wss://api.manwin5.com"'
  // API_ROOT: '"http://api.mw006.org/"', // staging.mw006.org
  // CABLE_ROOT: '"wss://api.manwin5.com"'
});
module.exports = envVal;
