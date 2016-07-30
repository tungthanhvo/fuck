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
            var mins = 30;
            if (req.body.remember == true) {
                mins = 60;
            }
            var expires = get_account_service.expiresInMinutes(mins);
            var user_info = {
                username: data.dataValues.username,
                last_name: data.dataValues.last_name,
                first_name: data.dataValues.first_name,
                name_role: data.dataValues.role.dataValues.name,
                gender: data.dataValues.gender,
                id: data.dataValues.id,
                avatar: data.dataValues.avatar,
                expires: expires,
                remember: req.body.remember
            }

            // We are sending the user inside the token
            var token = jwt.sign(user_info, secret, {
                expiresIn: expires,
            });

            res.json({
                token: token,
                user: user_info,
                expires: expires
            });

        } else {
            res.status(401).send('The Username or Password you entered is incorrect.');
            return;
        }
    }, function(err) {
        res.status(401).send('The Username or Password you entered is incorrect.');
        return;
    });
});

accounts_router.post('/resetpassword', function(req, res, next) {
    get_account_service.sendMailResetPassword(req.body, res);
});


module.exports = accounts_router;