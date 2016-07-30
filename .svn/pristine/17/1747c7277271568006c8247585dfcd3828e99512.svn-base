var express = require('express');
var router = express.Router();
var models = require('../models/index');
var employee_service = require('../services/employee-create');
var bcrypt = require('bcrypt-nodejs');
var path = require('path');

var multer = require('multer');
var imagePath = '../NodeJS/images/';
var imageName = '';


// Save image
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, imagePath);
    },
    filename: function(req, file, cb) {
        imageName = file.originalname;
        cb(null, imageName);
    }
});

// Check upload image
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function(req, file, cb) {
        if (path.extname(file.originalname) !== '.jpeg' && path.extname(file.originalname) !== '.jpg' && path.extname(file.originalname) !== '.bmp' && path.extname(file.originalname) !== '.png') {
            return cb(new Error('Only support jpeg, jpg, bmp, png'));
        }
        cb(null, true);
    }
});

// Get list line managers
router.get('/employees/linemanagers', function(req, res, next) {
    var employee_create_service = new employee_service();
    employee_create_service.getEmployeesByRole(5, function(data) {
        res.json({
            code: 200,
            data: data
        });
    }, function(err) {
        res.json({
            code: 404,
            message: "There was a server error while processing your request."
        })
    });

});

// Get list project managers
router.get('/employees/pm', function(req, res, next) {
    var employee_create_service = new employee_service();
    employee_create_service.getEmployeesByRole(4, function(data) {
        res.json({
            code: 200,
            data: data
        });
    }, function(err) {
        res.json({
            code: 404,
            message: "There was a server error while processing your request."
        })
    });

});

//Get list senior managers
router.get('/employees/sm', function(req, res, next) {
    var employee_create_service = new employee_service();
    employee_create_service.getEmployeesByRole(3, function(data) {
        res.json({
            code: 200,
            data: data
        });
    }, function(err) {
        res.json({
            code: 404,
            message: "There was a server error while processing your request."
        })
    });

});


// Get 
router.get('/employees/departments', function(req, res, next) {
    var employee_create_service = new employee_service();
    employee_create_service.getAllDepartments(function(data) {
        res.json({
            code: 200,
            data: data
        });
    }, function(err) {
        res.json({
            code: 404,
            message: "There was a server error while processing your request."
        })
    });

});

router.get('/departments/:dept_id/employees/count', function(req, res, next) {
    var employee_create_service = new employee_service();
    employee_create_service.countEmployeesInDepartment(req.params.dept_id, function(data) {
        res.json({
            code: 200,
            data: data
        });
    }, function(err) {
        res.json({
            code: 404,
            message: "There was a server error while processing your request."
        })
    });

});

router.get('/employees/count', function(req, res, next) {
    var employee_create_service = new employee_service();
    employee_create_service.countEmployees(function(data) {
        res.json({
            code: 200,
            data: data
        });
    }, function(err) {
        res.json({
            code: 404,
            message: "There was a server error while processing your request."
        })
    });
});

router.post('/employees/create', upload.single('file'), function(req, res, next) {
    var employee_create_service = new employee_service();

    var user = JSON.parse(req.body.user);

    //var employee_create_service = new employee_service();
    employee_create_service.createEmployee(user, function(data) {
        res.status(200).json({
            code: 200,
            message: "Add Employee successfully."
        })
    }, function(err) {
        res.status(400).json({
            code: 400,
            message: err
        })
    });
});

router.get('/competence/:comp_id/job_title', function(req, res, next) {
    var employee_create_service = new employee_service();
    employee_create_service.getAllJobTitlesByCompetenceId(req.params.comp_id, function(data) {
        res.json({
            code: 200,
            data: data
        });
    }, function(err) {
        res.json({
            code: 404,
            message: err
        });
    });
});

router.get('/departments/:dept_id/competence', function(req, res, next) {
    var employee_create_service = new employee_service();
    employee_create_service.getAllCompetencesByDeptId(req.params.dept_id, function(data) {
        res.json({
            code: 200,
            data: data
        });
    }, function(err) {
        res.json({
            code: 404,
            message: err
        });
    });
});

router.get('/employees/check/:username', function(req, res, next) {
    var employee_create_service = new employee_service();
    employee_create_service.checkListUsername(req.params.username, function(data) {
        if (data) {
            res.json({
                code: 200,
                data: true
            });
        } else {
            res.json({
                code: 200,
                data: false
            });
        }

    }, function(err) {
        res.json({
            code: 404,
            message: err
        });
    });
});


router.get('/employees/checkEmail/:email', function(req, res, next) {
    var employee_create_service = new employee_service();
    employee_create_service.checkEmailExist(req.params.email, function(data) {
        if (data.length === 0) {
            res.json({
                code: 200,
                data: false
            });
        } else {
            res.json({
                code: 200,
                data: true
            });
        }

    }, function(err) {
        res.json({
            code: 404,
            message: err
        });
    });
});

module.exports = router;