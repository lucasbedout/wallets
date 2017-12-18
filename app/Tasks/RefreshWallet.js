const _ = require('lodash');

const Coinbase = use('App/Providers/Exchanges/Coinbase');
const Binance = use('App/Providers/Exchanges/Binance');

const Balance = use('App/Models/Balance')

const Env = use('Env');

// Platforms to get wallet from
const PLATFORMS = [Coinbase, Binance];

class RefreshWallet {

  // This is required. This is the schedule for which the task will run.
  // More docs here: https://github.com/node-schedule/node-schedule#cron-style-scheduling
  static get schedule () {
    // once every minute
    return '*/1 * * * *'
  }

  // This is the function that is called at the defined schedule
  async handle() {
    const balances = Promise.all(
      _.map(PLATFORMS, platform => {
        const client = new platform()
        return client.getBalances()
      })
    )

    balances.then(wallets => {
      const mergedWallets = _.reduce(wallets, (m, w) => _.merge(m, w))
      const total = _.sum(_.values(mergedWallets))

      return Balance.create({
        wallets: JSON.stringify(mergedWallets),
        total,
        profit: total - Env.get('INVESTMENT')
      })
    })
  }

}

module.exports = RefreshWallet
