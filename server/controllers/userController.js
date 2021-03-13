const { signToken } = require('../helpers/jwt');
const { checkPassword } = require('../helpers/passwordHelper');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static login (req, res, next) {
        let email = req.body.email;
        let password = req.body.password;

        User.findOne({
            where: {
                email
            }
        })
        .then(data => {
            if (!data) {
                next({code: 400, message: 'Invalid email/password'})
            } else {
                let checkedPassword = checkPassword(password, data.password);

                if (checkedPassword) {
                    let access_token = signToken(data.id, data.full_name, data.email);
                    
                    res.status(200).json({
                        access_token,
                        name: data.full_name,
                        email: data.email
                    });
                } else {
                    next({code: 400, message: 'Invalid email/password'})
                }
            }
        })
        .catch(err => {

        })
    }

    static register (req, res, next) {
        let newUser = {
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
        .then(data => {
            res.status(201).json({
                id: data.id,
                full_name: data.full_name,
                email: data.email
            });
        })
        .catch(err => {
            next(err);
        })
    }

    static googleLogin (req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.google_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            const googleUserPayload = ticket.getPayload();
            
            User.findOrCreate({
                where: {
                    email: googleUserPayload.email
                },
                defaults: {
                    full_name: googleUserPayload.name,
                    email: googleUserPayload.email,
                    password: new Date().toLocaleString('se-SV', {dateStyle: 'short'})
                }
            })
            .then(data => {
                let access_token = signToken(data[0].id, data[0].full_name, data[0].email)
                console.log(access_token);
                res.status(200).json({
                    access_token,
                    name: data[0].full_name,
                    email: data[0].email
                });
            })
            .catch(err => {
                console.log(err);
                next(err);
            })
        }

        verify().catch(console.error)
    }
}

module.exports = UserController;