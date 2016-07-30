var express = require('express');
var accounts_router = express.Router();
var jwt = require('jsonwebtoken'); //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var mailer = require('express-mailer');
var nodemailer = require('nodemailer');
var randomstring = require("randomstring");
var model = require('../models/index');
var account_service = require('../services/accountService');
var bcrypt = require('bcrypt-nodejs');

var secret = 'this is the secret secret secret 12356';

var get_account_service = new account_service();
accounts_router.post('/login', function(req, res) {
    get_account_service.retrieveAccount(req.body, function(data) {
        if (bcrypt.compareSync(req.body.password, data.dataValues.hash_password)) {
            var user_info = {
                username: data.dataValues.username,
                last_name: data.dataValues.last_name,
                first_name: data.dataValues.first_name,
                name_role: data.dataValues.role.dataValues.name,
                gender: data.dataValues.gender,
                id: data.dataValues.id,
                avatar: data.dataValues.avatar
            }
            var mins = 6000;
            if (req.body.remember == true) {
                mins = 60;
            }
            var expires = get_account_service.expiresInMinutes(mins);
            // We are sending the profile inside the token
            var token = jwt.sign(user_info, secret, {
                expiresIn: 7200000
            });

            res.json({
                token: token,
                user: user_info,
                expires: expires
            });

        } else {
            res.status(401).send('Wrong user or password');
            return;
        }
    }, function(err) {
        res.status(401).send('Wrong user or password');
        return;
    });
});

accounts_router.post('/resetpassword', function(req, res, next) {
    var resetString = randomstring.generate(8);
    console.log(resetString);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'harveynashtms@gmail.com',
            pass: 'TrinhDepTrai'
        }
    });

    model.user.findOne({
            where: {
                username: req.body.username,
                company_email: req.body.email
            }
        }).then(function(result) {
            // if (result.dataValues == undefined || result.dataValues == null) {
            //     res.status(401).send('Wrong username or email');
            //     return;
            // } else {

            //     model.user.update({
            //         hash_password: bcrypt.hashSync(resetString)
            //     }, {
            //         where: {
            //             username: req.body.username,
            //             company_email: req.body.email
            //         }
            //     })
            //     return result;
            // }
            if (result != undefined && result != null) {
                model.user.update({
                    hash_password: bcrypt.hashSync(resetString)
                }, {
                    where: {
                        username: req.body.username,
                        company_email: req.body.email
                    }
                })
                return result;
            } else {
                res.status(401).send('Wrong username or email');
                return;
            }
        })
        .then(function(result2) {
            if (result2 == undefined || result2 == null) {
                res.status(401).send('Wrong username or email');
                return;
            }
            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: '"Harvey Nash TMS 👥" <harveynashtms@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: 'Your Password has been reset ✔', // Subject line
                text: 'THIS IS PLAINTEXT🐴', // plaintext body
                html: '<div> Dear ' + result2.dataValues.first_name + ', <br><br>Your access password to the TMS system has been reset. <br>Your new password is: <h2>' + resetString + '</h2><br>You now can access to the TMS system using the new password <br><br> Best Regards </div> ' // html body
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                } else {
                    console.log('Message sent: ' + info.response);
                }

            }, function(rejectedPromiseError) {
                res.status(401).send('Wrong username or email');
                return;
            });
        })
});


module.exports = accounts_router;