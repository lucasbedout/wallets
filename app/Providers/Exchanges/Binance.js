const Platform = require('./Platform')
const binance = require('node-binance-api')
const { EthEur } = use('App/Helpers/rates')
const _ = require('lodash');
const Env = use('Env')


class Binance extends Platform {
  initClient() {
    binance.options({
      'APIKEY': Env.get('BINANCE_KEY'),
      'APISECRET':  Env.get('BINANCE_SECRET'),
    })

    return binance
  }

  getBalances() {
    return new Promise((resolve, reject) => {
      const balances = {}
      this.client.balance(binanceBalances => {
        // Get balances with money
        const available = _.pickBy(binanceBalances, b => b.available > 1)
        // Get the price per balance
        binance.prices(async ticker => {
          // 1 btc to eur
          const etheur = await EthEur()
          for (let symbol in available) {
            // Translate amount from currency to eur using ETH
            const balanceInEur =  parseFloat(ticker[`${symbol}ETH`]) * available[symbol].available * parseFloat(etheur)
            balances[symbol] = balanceInEur
          }
          resolve(balances)
        })
      })
    })
  }
}

module.exports = Binance