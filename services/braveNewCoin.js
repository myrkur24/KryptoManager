const axios = require('axios');
const configExt = require('../config/configExt');
const config = {
    url: 'https://bravenewcoin-v1.p.rapidapi.com',
    headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "bravenewcoin-v1.p.rapidapi.com",
        "x-rapidapi-key": configExt['rapidapi-key']
    }
}

class bncservice {
    getCurrency(show, coin, del) {
        axios({
                "method": "GET",
                "url": `${config.url}/ticker`,
                "headers": config.headers,
                "params": { show: show, coin: coin }
            })
            .then(del)
            .catch((error) => {
                console.log(error)
            })
    }

    getCrytos(del) {
        axios({
                "method": "GET",
                "url": `${config.url}/digital-currency-symbols`,
                "headers": config.headers
            })
            .then(del)
            .catch((error) => {
                console.log('Error in External service', error)
            })
    }

    // Call function bulk
    getCryptosBulk(cryptos, currency, del) {
        // Building the dynamic array of fetch calls for number of days  
        const fetch = (show, coin) => axios({
            "method": "GET",
            "url": `${config.url}/ticker`,
            "headers": config.headers,
            "params": { show: show, coin: coin }
        });
        let fetchCalls = cryptos.map((coin) => fetch(currency, coin));
        axios.all(fetchCalls).then(axios.spread((...res) => del(res)))
            .catch(err => {
                console.error(err);
            });
    }
}

module.exports = bncservice;