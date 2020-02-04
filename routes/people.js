const models = require('../db/models');
const express = require('express');
const router = express.Router();
const userService = require('../services/userClient');
const cryptoService = require('../services/cryptoClient');
const securityMiddleware = require('../middlewares/token')

// create person
router.post('/', (req, res, next) => {
    const { firstName, lastName } = req.body;
    const { userName, password } = req.body;
    const { currencyId } = req.body;
    console.log('Got user:', { userName, password } );
    console.log('Got currency:', { currencyId });
    //res.sendStatus(200);
    models.Person.create({ firstName, lastName })
        .then((person) => {
            // Asign this call to event stream
            new userService().createUser({
                userName: userName,
                password: password,
                personId: person.id
            });
            // Asign this call to event stream
            new cryptoService().createRelCurPer({
                currencyId: currencyId, personId: person.id
            });
            res.send(person);
        })
        .catch((err) => {
            //console.log('***There was an error creating de Person')//, JSON.stringify(err))
            console.log(err);
            return res.status(400).send(err)
        })
});

module.exports = router;