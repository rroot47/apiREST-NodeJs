var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'bsbhdh4780dddd48755ffnjrjmxwsekjgjjgksjhgfey'
    // exported function
module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
                userId: userData.id,
                isAdmin: userData.isAdmin
            },
            JWT_SIGN_SECRET, {
                expiresIn: '1h'
            })
    }
}