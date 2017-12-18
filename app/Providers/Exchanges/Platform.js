
class Platform {

  constructor() {
    this.client = this.initClient()
  }

  initClient() {
    throw new Error('Method must be defined')
  }

  getBalances() {
    throw new Error('Method must be defined')
  }

}

module.exports = Platform