var db = require('../models/index');

var employee_history_model = db.employee_history;

function employee_historyService() {
    var self = this;
    //var employee_history_model = db.employee_history_model;
    self.retrieveAllByUser_Id = function(user_id, callback_suc, callback_err) {
        employee_history_model.findAll({
                where: {
                    user_id: user_id
                }
            })
            .then(callback_suc).catch(callback_err);
    }

    self.create = function(params, callback_suc, callback_err) {
        employee_history_model.create(
            params
        ).then(callback_suc).catch(callback_err);
    };

    self.update = function(params, callback_suc, callback_err) {
        employee_history_model.update(
                params, {
                    where: {
                        id: params.id
                    }
                })
            .then(callback_suc).catch(callback_err);
    }

    self.delete = function(id, callback_suc, callback_err) {
        employee_history_model.destroy({
            where: {
                id: id //this will be your id that you want to delete
            }
        }).then(callback_suc).catch(callback_err);
    }
}

module.exports = employee_historyService;