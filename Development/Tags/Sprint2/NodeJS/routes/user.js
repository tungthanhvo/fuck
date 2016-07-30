/**
 * Created by tungvot on 6/28/2016.
 */
var express = require('express');
var userRouter = express.Router();
var userService = require('../services/userService');
var models = require('../models');
var service = new userService();
var multer = require('multer');
var path = require('path');

/**
 * update or add technical skills for specific user by userID
 */
userRouter.post('/update-technical-skills/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    service.updateTechnicalSkillsForUser(user_id, req, res);
});

userRouter.post('/update-personal-information/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    service.updatePersonalInforationForUser(user_id, req, res);
});


userRouter.post('/update-company-information/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    service.updateCompanyInformationForUser(user_id, req, res);
});

userRouter.post('/update-profile-picture/:user_id', multer({dest: './images/'}).single('file'), function (req, res) {
    var user_id = req.params.user_id;
    service.updateProfilePictureForUser(user_id, req, res);
});

module.exports = userRouter;