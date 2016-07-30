/**require service*/
var education_service = require('../services/education');
var course_service = require('../services/course');
var employee_history_service = require('../services/employee_history');
var addition_information_service = require('../services/addition_information');
var employee_create_service = require('../services/employee-create');
var skill_metric_service = require('../services/skill_metric');
var express = require('express');
var employees_router = express.Router();
var path = require('path');
var Jimp = require('jimp');
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



/**
 * get employee by id
 * who: admin, employee
 */
employees_router.get('/linemanagers', function(req, res, next) {
    res.status(200).json({
        error: 'message',
        data: 'get/employees/linemanagers'
    });
    res.end();
    //res.json([{id: 1, first_name: "Manager 1", last_name: "Line"}, {id: 2, first_name: "Manager 1", last_name: "Engineer"}]);
});

employees_router.get('/:employee_id', function(req, res) {
    res.status(200).json({
        error: 'message',
        data: 'employee/create'
    });
    res.end();
});


/**
 * create an employee
 * who: admin
 */
employees_router.post('/', upload.single('file'), function(req, res) {

    var employee_create_service_instance = new employee_create_service();

    var user = JSON.parse(req.body.user);

    //var employee_create_service = new employee_service();
    employee_create_service_instance.createEmployee(user, function(data) {
        Jimp.read(imagePath + "/" + user.avatar, function(err, image) {
            if (err) throw err;
            image.resize(256, Jimp.AUTO) // resize 
                .quality(60) // set JPEG quality 
                .write(imagePath + "/" + "resized-" + user.avatar); // save 
        });
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

/**
 * update the employee which owns id == employee_id
 * who: admin
 */
employees_router.put('/:employee_id', function(req, res) {
    res.end();
});

/**
 * delete the employee which owns id == employee_id
 * who: admin
 */
employees_router.delete('/:employee_id', function(req, res) {
    res.end();
});


/**-----------------PERSONAL INFORMATION */
/**
 * get the personal_information of employee which owns id = employee_id
 * who: admin, employee
 */
employees_router.get('/:employee_id/personal_information', function(req, res) {
    res.status(200).json({
        error: 'message',
        data: '/employees/:employee_id/personal_information'
    });
    res.end();
});

/**
 * update the personal_information of employee which owns id = employee_id
 * who: admin, employee
 */
employees_router.put('/:employee_id/personal_information/:id', function(req, res) {
    res.status(200).json({
        error: 'message',
        data: '/employees/:employee_id/personal_information/:id'
    });
    res.end();
});


/**-------------EDUCATION SECTION */
/**
 * get all educations
 * who: admin, employee
 */
employees_router.get('/:employee_id/educations', function(req, res) {
    var get_education_service = new education_service();
    get_education_service.retrieveAllByUser_Id(req.params.employee_id,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Get All Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Failed Get All',
                data: err
            }).end();
        });

});

/**
 * create an education
 * who: admin, employee
 */
employees_router.post('/:employee_id/educations', function(req, res) {
    var create_education_service = new education_service();
    req.body.user_id = req.params.employee_id;
    create_education_service.create(req.body,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Create Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Create Failed',
                data: err
            }).end();
        });
});

/**
 * update education with id = id_education
 * who: admin, employee
 */
employees_router.put('/:employee_id/educations/:id_education', function(req, res) {
    var update_education_service = new education_service();
    req.body.user_id = req.params.employee_id;
    req.body.id = req.params.id_education;

    update_education_service.update(req.body,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Update Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Update Failed',
                data: err
            }).end();
        });
});

/**
 * delete education with id = id_education
 * who: admin, employee
 */
employees_router.delete('/:employee_id/educations/:id_education', function(req, res) {
    var delete_education_service = new education_service();
    delete_education_service.delete(req.params.id_education,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Delete Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Delete Failed',
                data: err
            }).end();
        });
});

/**-------------COURSE SECTION */
/**
 * get all courses
 * who: admin, employee
 */
employees_router.get('/:employee_id/courses', function(req, res) {
    var get_course_service = new course_service();
    get_course_service.retrieveAllByUser_Id(req.params.employee_id,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Get All Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Failed Get All',
                data: err
            }).end();
        });

});

/**
 * create an course
 * who: admin, employee
 */
employees_router.post('/:employee_id/courses', function(req, res) {
    var create_course_service = new course_service();
    req.body.user_id = req.params.employee_id;
    create_course_service.create(req.body,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Create Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Create Failed',
                data: err
            }).end();
        });
});

/**
 * update course with id = id_course
 * who: admin, employee
 */
employees_router.put('/:employee_id/courses/:id_course', function(req, res) {
    var update_course_service = new course_service();
    req.body.user_id = req.params.employee_id;
    req.body.id = req.params.id_course;
    update_course_service.update(req.body,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Update Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Update Failed',
                data: err
            }).end();
        });
});

/**
 * delete course with id = id_course
 * who: admin, employee
 */
employees_router.delete('/:employee_id/courses/:id_course', function(req, res) {
    var delete_course_service = new course_service();
    delete_course_service.delete(req.params.id_course,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Delete Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Delete Failed',
                data: err
            }).end();
        });
});

/**-------------EMPLOYEE HISTORY SECTION */
/**
 * get all employeehistories
 * who: admin, employee
 */
employees_router.get('/:employee_id/employeehistories', function(req, res) {
    var get_employee_history_service = new employee_history_service();
    get_employee_history_service.retrieveAllByUser_Id(req.params.employee_id,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Get All Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Failed Get All',
                data: err
            }).end();
        });

});

/**
 * create an employee_history
 * who: admin, employee
 */
employees_router.post('/:employee_id/employeehistories', function(req, res) {
    var create_employee_history_service = new employee_history_service();
    req.body.user_id = req.params.employee_id;
    create_employee_history_service.create(req.body,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Create Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Create Failed',
                data: err
            }).end();
        });
});

/**
 * update employee_history with id = id_employeehistory
 * who: admin, employee
 */
employees_router.put('/:employee_id/employeehistories/:id_employeehistory', function(req, res) {
    var update_employee_history_service = new employee_history_service();
    req.body.user_id = req.params.employee_id;
    req.body.id = req.params.id_employeehistory;
    update_employee_history_service.update(req.body,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Update Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Update Failed',
                data: err
            }).end();
        });
});

/**
 * delete employee_history with id = id_employeehistory
 * who: admin, employee
 */
employees_router.delete('/:employee_id/employeehistories/:id_employeehistory', function(req, res) {
    var delete_employee_history_service = new employee_history_service();
    delete_employee_history_service.delete(req.params.id_employeehistory,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Delete Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Delete Failed',
                data: err
            }).end();
        });
});


/**-------------ADDITION INFORMATION SECTION */
/**
 * get additioninformation
 * who: admin, employee
 */
employees_router.get('/:employee_id/additioninformation', function(req, res) {
    var get_addition_information_service = new addition_information_service();
    get_addition_information_service.retrieveAdditionInformationByUser_Id(req.params.employee_id,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Get All Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Failed Get All',
                data: err
            }).end();
        });

});


/**
 * update employee_history with id = id_employeehistory
 * who: admin, employee
 */
employees_router.put('/:employee_id/additioninformation', function(req, res) {
    var update_addition_information_service = new addition_information_service();
    req.body.user_id = req.params.employee_id;
    update_addition_information_service.update(req.body,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Update Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Update Failed',
                data: err
            }).end();
        });
});

/**-------------SKILL METRIC */
/**
 * get all skill metric
 * who: admin, employee
 */
employees_router.get('/:employee_id/skillmetrics', function(req, res) {
    var get_skill_metric_service = new skill_metric_service();
    get_skill_metric_service.retrieveAllByUser_Id(req.params.employee_id,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Get All Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Failed Get All',
                data: err
            }).end();
        });

});

/**
 * create an education
 * who: admin, employee
 */
employees_router.post('/:employee_id/skillmetrics', function(req, res) {
    var createandupdate_skill_metric_service = new skill_metric_service();
    createandupdate_skill_metric_service.createandupdate({
            user_id: req.params.employee_id,
            skillmetrics: req.body
        },
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Update All Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Failed Update All',
                data: err
            }).end();
        });
});
/**
 * delete education with id = id_education
 * who: admin, employee
 */
employees_router.delete('/:employee_id/skillmetrics/:id_skill_metric', function(req, res) {
    var delete_skill_metric_service = new skill_metric_service();
    delete_skill_metric_service.delete(req.params.id_skill_metric,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Delete Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Delete Failed',
                data: err
            }).end();
        });
});
employees_router.get('/:employee_id/getdob', function(req, res) {
    console.log(req.params.employee_id);
    var get_dob = new skill_metric_service();
    get_dob.getDOB(req.params.employee_id,
        function(data) {
            res.status(200).json({
                code: 200,
                message: 'Get DOB Successfully',
                data: data
            }).end();
        },
        function(err) {
            res.status(200).json({
                code: 404,
                message: 'Get DOB Failed',
                data: err
            }).end();
        });
})


module.exports = employees_router;