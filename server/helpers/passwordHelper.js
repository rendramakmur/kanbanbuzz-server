const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

const checkPassword = (password, hashedPassword) => {
    console.log('HELO');
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { hashPassword, checkPassword };