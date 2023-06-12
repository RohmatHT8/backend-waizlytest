const jwt = require("jsonwebtoken")

const key_jwt = process.env.SECRET_KEY

const createToken = (payload) => jwt.sign(payload, key_jwt);

const verifyToken = (token) => jwt.verify(token, key_jwt)

module.exports = {
    createToken,
    verifyToken
}