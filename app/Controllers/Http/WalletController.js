const Balance = use('App/Models/Balance')
const _ = require('lodash')

class WalletController {
  async current () {
    return await Balance.pickInverse(60)
  }

  async evolution () {
    return await Balance.query().select('total', 'profit', 'created_at').fetch();
  }
}

module.exports = WalletController
