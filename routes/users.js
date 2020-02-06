var models = require('../db/models');
var express = require('express');
var router = express.Router();
const tokenService = require('../services/tokenService');

// listing users TEST 
/*router.get('/', securityMiddleware.checkToken, function (req, res, next) {
  models.User.findAll().then(function (users) {
    res.send(users);
  });
});*/

// create user 
router.post('/', (req, res, next) => {
    const { userName, password, personId } = req.body
    models.User.create({ userName, password, personId })
        .then((user) => res.send(user))
        .catch((err) => {
            console.log('***There was an error creating de User', JSON.stringify(err))
            return res.status(400).send(err)
        })
});

// validate user 
router.post('/login', (req, res, next) => {
    const { userName, password } = req.body;
    console.log({ userName, password });
    models.User.findOne({ where: { userName, password } })
        .then((user) => {
            if (user) {
                let { userName, personId } = user;
                new tokenService().generateToken({ userName, personId }, response => {
                    res.send({
                        status: 'succesful',
                        token: response.data,
                        personId: personId,
                        userName: userName
                    });
                });
            } else {
                res.json({
                    status: 'fail',
                    message: 'not found'
                });
            }
        })
        .catch((err) => {
            console.log('***There was an error creating de User', err)
            return res.status(400).send(err)
        })
});

module.exports = router;