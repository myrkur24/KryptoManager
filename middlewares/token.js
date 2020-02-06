const tokenService = require('../services/tokenService');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    /*if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }*/
    console.log('tenemos token de header :', token);
    if (token) {
        new tokenService().verifyToken({ token: token }, (response) => {
            //console.log(response.data);
            if (response && response.data && response.data.status == 'valid') {
                const { userName } = response.data.decoded;
                req.decoded = { userName }
                next();
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken: checkToken
}