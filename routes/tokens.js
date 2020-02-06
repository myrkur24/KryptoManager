const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const config = require('../config/configExt');

// validate token
router.post('/generate/', function(req, res, next) {
    const { userName } = req.body;
    const token = jwt.sign({ userName }, config.publicKey, {
        expiresIn: 1800
    });
    res.send(token);
});

router.post('/validate/', function(req, res, next) {
    const { token } = req.body;
    jwt.verify(token, config.publicKey, (err, decoded) => {
        if (err) {
            return res.send({ status: "invalid", mensaje: 'Invalid Token' });
        } else {
            res.send({ status: "valid", decoded: decoded });
        }
    });
})

module.exports = router;