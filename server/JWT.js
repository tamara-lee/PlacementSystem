const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
    //jwt secret key to be changed placed in .env file
    const accessToken = sign({ 
        username: user.username, id: user.id }, 
        "tempjwtsecretkey", 
        {expiresIn: '12h'});


        return accessToken;
};

module.exports = { createTokens };