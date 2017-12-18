'use strict'

const Schema = use('Schema')

class BalancesSchema extends Schema {
  up () {
    this.create('balances', (table) => {
      table.increments()
      table.json('wallets')
      table.decimal('total')
      table.timestamps()
    })
  }

  down () {
    this.drop('balances')
  }
}

module.exports = BalancesSchema
