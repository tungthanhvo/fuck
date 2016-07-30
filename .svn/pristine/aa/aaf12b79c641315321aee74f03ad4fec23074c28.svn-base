var db = require('../models/index');

var addition_information_model = db.user;

function additionInformationService() {
    var self = this;
    self.retrieveAdditionInformationByUser_Id = function(user_id, callback_suc, callback_err) {
        addition_information_model.findOne({
                attributes: ["id", "personal_email", "personal_quote", "hobby", "personal_statement"],
                where: {
                    id: user_id
                }
            })
            .then(callback_suc).catch(callback_err);
    }

    self.update = function(params, callback_suc, callback_err) {
        addition_information_model.update(
                params, {
                    where: {
                        id: params.id
                    }
                })
            .then(callback_suc).catch(callback_err);
    }
}

module.exports = additionInformationService;