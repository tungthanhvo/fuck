/**
 * Created by tungvot on 6/28/2016.
 */
var express = require('express');
var userRouter = express.Router();
var userService = require('../services/userService');
var models = require('../models');
var service = new userService();

/**
 * update or add technical skills for specific user by userID
 */
userRouter.post('/technical-skills/:user_id', function (req, res) {
    service.updateTechnicalSkillsForUser(req, res);
});

userRouter.post('/personal-information/:user_id', function (req, res) {
    service.updatePersonalInforationForUser(req, res);
});


userRouter.post('/company-information/:user_id', function (req, res) {
    service.updateCompanyInformationForUser(req, res);
});

module.exports = userRouter;