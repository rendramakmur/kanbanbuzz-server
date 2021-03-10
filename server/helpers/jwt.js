const jwt = require('jsonwebtoken');

const signToken = (id, full_name, email) => {
    return jwt.sign({id, full_name, email}, process.env.JWT_SECRET);
}

const verifyToken = (access_token) => {
    return jwt.verify(access_token, process.env.JWT_SECRET);
}

module.exports = { signToken, verifyToken };