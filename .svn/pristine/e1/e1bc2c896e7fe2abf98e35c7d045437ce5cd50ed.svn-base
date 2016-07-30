var db = require('../models/index');
var bcrypt = require('bcrypt-nodejs');

var account_model = db.user;

function accountService() {
    var self = this;
    self.retrieveAccount = function(account, callback_suc, callback_err) {
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

    self.retrieveByUsernameEmail = function(account, callback_suc, callback_err) {
        account_model.findOne({
            where: {
                username: account.username,
                company_email: account.email
            }   
        }).then(callback_suc).catch(callback_err);
    }
    self.expiresInDay = function(numdays) {
        var dataObj = new Date();
        return dataObj.setDate(dataObj.getDate() + numdays);
    }

    self.expiresInMinutes = function(numminutes) {
        var dataObj = new Date();
        return dataObj.setDate(dataObj.getMinutes() + numminutes);
    }
}
module.exports = accountService;