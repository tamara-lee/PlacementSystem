var jwtsecretkey = process.env.JWT_SECRET_KEY; 
//var jwtsecretkey = ${process.env.JWT_SECRET_KEY};
const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
    //jwt secret key to be changed placed in .env file
    const accessToken = sign({ 
        username: user.username, id: user.id }, 
        //"tempjwtsecretkey", 
        //jwtsecretkey,
        process.env.JWT_SECRET_KEY,
        {expiresIn: '12h'});


        return accessToken;
};

//middleware: func that runs before a request
const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token-cookie"];

    if (!accessToken) {
        return res.status(400).json( {error: "User is not authenticated!\\nPlease log in."} );
    }

    try {
        //const validToken = verify(accessToken, "tempjwtsecretkey")
        const validToken = verify(accessToken, process.env.JWT_SECRET_KEY)
        if (validToken) {
            //create authenticate variable, and set it to true
            req.authenticated = true;
            //next() to move forward with the request
            return next();
        }
    } catch(err) {
        return res.status(400).json( {error: err} );
    }
};

module.exports = { createTokens , validateToken };