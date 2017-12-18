const Model = use('Model')

const _ = require('lodash')

class Balance extends Model {

  getWallets (walletsJson) {
    return JSON.parse(walletsJson)
  }

}

module.exports = Balance
