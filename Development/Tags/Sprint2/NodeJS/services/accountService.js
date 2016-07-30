var db = require('../models/index');
var bcrypt = require('bcrypt-nodejs');
var randomPass = require('../help/random_pass');
var bcrypt = require('bcrypt-nodejs');
var account_model = db.user;
var nodemailer = require('nodemailer');


function accountService() {
    var _this = this;

    _this.shuffle = function(stringPass) {
            var parts = stringPass.split('');
            for (var i = parts.length; i > 0;) {
                var random = parseInt(Math.random() * i);
                var temp = parts[--i];
                parts[i] = parts[random];
                parts[random] = temp;
            }
            return parts.join('');
        }
        // Generate random password
    _this.generatePass = function() {
        var specialChar = '!@#$%^&';
        var numChar = '1234567890';
        var capChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&';
        var randomString = '';
        for (var i = 0; i < 5; i++) {
            var c = Math.floor(Math.random() * charSet.length);
            randomString += charSet.charAt(c);
        }
        randomString += specialChar.charAt(Math.random() * specialChar.length);
        randomString += numChar.charAt(Math.random() * numChar.length);
        randomString += capChar.charAt(Math.random() * capChar.length);
        return _this.shuffle(randomString);
    }

    _this.getUserByID = function(user_id, success, err) {
        account_model.findOne({
            where: {
                id: user_id
            }
        }).then(success).catch(err);
    }

    _this.retrieveAccount = function(account, callback_suc, callback_err) {
        account_model.findOne({
            attributes: ['username', 'first_name', 'last_name', 'gender', 'id', 'avatar', 'hash_password'],
            where: {
                username: account.username,
            },
            include: [{
                model: db.role,
                attributes: ['name']
            }]
        }).then(callback_suc).catch(callback_err);

    }

    _this.retrieveByUsernameEmail = function(account, res) {
        account_model.findOne({
            where: {
                username: account.username,
                company_email: account.email
            }
        }).then(callback_suc).catch(callback_err);
    }

    _this.sendMailResetPassword = function(account, res) {
        var resetString = _this.generatePass();
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'harveynashtms@gmail.com',
                pass: 'TrinhDepTrai',
                // user: 'tmsharveynashvn@gmail.com',
                // pass: 'Team1VoDoi'
            }
        });
        account_model.findOne({
                where: {
                    username: account.username,
                    company_email: account.email
                }
            }).then(function(result) {
                if (result != undefined && result != null) {
                    account_model.update({
                        hash_password: bcrypt.hashSync(resetString)
                    }, {
                        where: {
                            username: account.username,
                            company_email: account.email
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
                    to: account.email, // list of receivers
                    subject: 'Your Password has been reset ✔', // Subject line
                    text: 'THIS IS PLAINTEXT 🐴', // plaintext body
                    html: '<div> Dear ' + result2.dataValues.first_name + ', <br><br>Your access password to the TMS system has been reset. <br>Your new password is: ' + resetString + '<br>You now can access to the TMS system using the new password.<br><br> Best Regards </div> ' // html body
                };
                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        return console.log(error);
                    } else {
                        console.log('Message sent: ' + info.response);
                        res.sendStatus(200);
                    }

                }, function(rejectedPromiseError) {
                    res.status(401).send('Wrong username or email');
                    return;
                });
            })

    }
    _this.expiresInDay = function(numdays) {
        var dataObj = new Date();
        return dataObj.setDate(dataObj.getDate() + numdays);
    }

    _this.expiresInMinutes = function(numminutes) {
        var dataObj = new Date();

        return dataObj.getTime() + numminutes * 60000;
        //    return dataObj.setDate(dataObj.getMinutes() + numminutes);
    }
}
module.exports = accountService;