const { verifyToken } = require('../helpers/jwt');
const { User, Task } = require('../models');

function authentication (req, res, next) {
    try {
        let decode = verifyToken(req.headers.access_token);

        User.findByPk(decode.id)
        .then(data => {
            if (!data) {
                next({code: 404, message: 'User not found'});
            } else {
                req.currentUser = {id: data.id, full_name: data.full_name, email: data.email};
                next();
            }
        })
    } catch (err) {
        next({code: 403, message: "Authentication error, please login"});
    }
}

function authorization (req, res, next) {
    let id = +req.params.id

    Task.findByPk(id)
    .then(data => {
        if (!data) {
            next({code: 404, message: 'Task not found'})
        } else if (data.UserId === req.currentUser.id) {
            next();
        } else {
            next({code: 403, message: "You don't have an access"});
        }
    })
    .catch(err => {
        next({code: 403, message: "You don't have an access"});
    })
}

module.exports = { authentication, authorization };