const axios = require('axios');

class userservice {
    createRelCurPer(param, del) {
        //console.log(param);
        // TODO : Change host to variable
        axios.post(`http://localhost:3000/api/crypto/currencies/${param.currencyId}/person/${param.personId}`, {},
            { headers: { 'Content-Type': 'application/json' } })
            .then(del)          
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = userservice;