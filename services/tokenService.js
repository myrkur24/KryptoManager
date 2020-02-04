const axios = require('axios');

class tokenservice {
    generateToken(param, del) {
        // TODO : Change host to variable
        axios.post('http://localhost:3000/api/tokens/generate', param,
            { headers: { 'Content-Type': 'application/json' } })
            .then(del)
            .catch(err => {
                console.log(err);
            })
    }

    verifyToken(param, del) {
        // TODO : Change host to variable
        axios.post('http://localhost:3000/api/tokens/validate', param,
            { headers: { 'Content-Type': 'application/json' } })
            .then(del)
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = tokenservice;