const models = require('../db/models');
const express = require('express');
const router = express.Router();
const bncService = require('../services/braveNewCoin');
const securityMiddleware = require('../middlewares/token');

// listing currencies Public 
router.get('/currencies/', function(req, res, next) {
    models.Currency.findAll().then(function(curencies) {
            const showme = curencies.map(val => {
                const { code, id } = val;
                return { code, id };
            });
            res.send(showme);
        })
        .catch((err) => {
            console.log('***There was an error in crypto')
            console.log(err)
            return res.status(400).send(err)
        });
});

// create relationship Person - Currency
router.post('/currencies/:currencyId/person/:personId', (req, res, next) => {
    const { currencyId, personId } = req.params;
    //console.log({ currencyId, personId })
    models.UserCurrency.create({ currencyId, personId })
        .then((percur) => res.send(percur))
        .catch((err) => {
            console.log('***There was an error creating de Crypto', JSON.stringify(err))
            return res.status(400).send(err)
        })
});

// listing 
router.get('/currencies/:currencyId/person/:personId', (req, res, next) => {
    const { currencyId, personId } = req.params;
    models.UserCurrency.create({ currencyId, personId })
        .then((percur) => res.send(percur))
        .catch((err) => {
            console.log('***There was an error creating de Crypto', JSON.stringify(err))
            return res.status(400).send(err)
        })
});

// listing person-currency relationship
router.get('/currencies/person/:personId', function(req, res, next) {
    const personId = req.params.personId;
    models.UserCurrency.findAll({
            where: {
                personId: personId
            }
        }).then(function(percur) {
            res.send(percur);
        })
        .catch((err) => {
            console.log('***There was an error in Crypto', err);
            return res.status(400).send(err)
        });
});

// listing Person Cryptos
router.get('/person/:personId', securityMiddleware.checkToken, async(req, res, next) => {
    const personId = req.params.personId;
    let currency = await models.UserCurrency.findOne({
        where: { personId: personId }
    }).catch(err => {
        console.log(err);
        return res.status(400).send(err);
    });
    const percry = await models.UserCrypto.findAll({
        where: { personId: personId }
    }).catch((err) => {
        console.log('***There was an error in Crypto', err);
        return res.status(400).send(err)
    });
    const cryptos = percry.map(val => {
        return val.cryptoId;
    });
    let currencyCode = await models.Currency.findOne({
        where: { Id: currency.currencyId }
    });
    let code = currencyCode.get('code');
    new bncService().getCryptosBulk(cryptos, code, (response) => {
        let list = response.map((ext) => {
            //console.log(ext.data);
            const { source, coin_name, success, last_price, coin_id } = ext.data;
            return { source, coin_name, success, last_price, coin_id };
        });
        res.send({
            'currency': code,
            'personId': personId,
            'cryptos': list
        })
    });
});

// create relationship Person - Crypto
router.post('/:cryptoId/person/:personId', securityMiddleware.checkToken, (req, res, next) => {
    const { cryptoId, personId } = req.params;
    //console.log({ cryptoId, personId })
    models.UserCrypto.create({ cryptoId, personId })
        .then((percry) => res.send(percry))
        .catch((err) => {
            console.log('***There was an error creating de Crypto', JSON.stringify(err))
            return res.status(400).send(err)
        })
});

// listing Cryptos
router.get('/', (req, res, next) => {
    new bncService().getCrytos(
        response => { res.send(response.data.digital_currencies) }
    );
});

// listing Cryptos
router.get('/:crypto/currency/:currency', (req, res, next) => {
    const { currency, crypto } = req.params;
    new bncService().getCurrency(currency, crypto,
        response => {
            //console.log(response);
            if (response.data.success) {
                const { source, coin_name, success, last_price } = response.data;
                res.send({ source, coin_name, success, last_price });
            } else {
                res.send({ success: false });
            }
        }
    );
});

// listing Cryptos arrenged by value (top 3)
router.get('/currency/:currency/filter/:filter', (req, res, next) => {
    const cryptos = req.query.crypto;
    const { filter, currency } = req.params;
    console.log(currency);
    //res.send(currency);
    new bncService().getCryptosBulk(cryptos, currency,
        response => {
            let list = response.map((ext) => {
                const { source, coin_name, success, last_price } = ext.data;
                return { source, coin_name, success, last_price };
            });
            // Now we sort using filter
            switch (filter) {
                case 'des':
                    list.sort(function(a, b) { // descending
                        if (a.last_price > b.last_price) return -1;
                        if (b.last_price > a.last_price) return 1;
                        return 0;
                    });
                    break;
                case 'asc':
                    list.sort(function(a, b) { // ascending
                        if (a.last_price > b.last_price) return 1;
                        if (b.last_price > a.last_price) return -1;
                        return 0;
                    });
                    break;
                default:
                    break;
            }
            // truncate
            res.send(list.slice(0, 3));
        }
    );
});

module.exports = router;