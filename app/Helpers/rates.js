const axios = require('axios')

const BtcEur = () => {
  return axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=EUR')
    .then(response => response.data[0])
    .then(ticker => ticker.price_eur);
}

const EthEur = () => {
  return axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR')
    .then(response => response.data[0])
    .then(ticker => ticker.price_eur);
}

module.exports = { BtcEur, EthEur }