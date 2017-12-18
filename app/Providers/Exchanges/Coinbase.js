const Platform = require('./Platform')
const coinbase = require('coinbase')
const { BtcEur } = use('App/Helpers/rates')
const _ = require('lodash');
const Env = use('Env')


class Coinbase extends Platform {
  initClient() {
    return new coinbase.Client({ apiKey: Env.get('COINBASE_KEY'), apiSecret: Env.get('COINBASE_SECRET') });
  }

  getBalances() {
    return new Promise((resolve, reject) => {
      const balances = {}
      this.client.getAccounts({}, (err, accounts) => {
        accounts.filter(acct => acct.native_balance.amount > 0).forEach(acct => {
          balances[acct.currency] = parseFloat(acct.native_balance.amount)
        })
        resolve(balances);
      });
    })
  }
}

module.exports = Coinbase