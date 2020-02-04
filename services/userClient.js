const axios = require('axios');

class userservice {
    createUser(param, del) {
        // TODO : Change host to variable
        axios.post('http://localhost:3000/api/users', param,
            { headers: { 'Content-Type': 'application/json' } })
            .then(del)
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = userservice;