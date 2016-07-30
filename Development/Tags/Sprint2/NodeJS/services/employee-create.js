var models = require('../models/index');
var bcrypt = require('bcrypt-nodejs');

function employeeCreate() {
    var self = this;
    self.getEmployeesByRole = function(role_id, success, error) {
        models.user.findAll({
            where: {
                role_id: role_id
            },
            attributes: ["id", "first_name", "last_name"]
        }).then(success).catch(error);
    }

    self.getAllDepartments = function(success, error) {
        models.department.findAll({
            attributes: ["id", "name", "code"]
        }).then(success).catch(error);
    }

    self.countEmployees = function(success, error) {
        models.sequelize.query('SELECT MAX(id) as totalEmp from user', {
            type: models.Sequelize.QueryTypes.SELECT
        }).then(success).catch(error);
    }

    self.checkListUsername = function(username, success, error) {
        models.user.find({
            where: {
                username: username
            },
        }).then(success).catch(error);
    }

    self.checkEmailExist = function(email, success, error) {
        // console.log(email);
        // models.sequelize.query("SELECT email from ((select SUBSTRING_INDEX(company_email, '@', 1) as email FROM tms_db.user) as email_table) where email = ?", {
        //     replacements: [email],
        //     type: models.Sequelize.QueryTypes.SELECT
        // }).then(success).catch(error);
        models.user.find({
            where: {
                company_email: email
            },
        }).then(success).catch(error);
    }


    self.createEmployee = function(user, success, error) {
        var hashedPassword = '';
        bcrypt.hash(user.password, null, null, function(err, hash) {
            hashedPassword = hash;
            models.user.create({
                staff_code: user.staffcode,
                first_name: user.firstname,
                last_name: user.lastname,
                dob: user.dt,
                gender: user.gender,
                married_status: user.status,
                address: user.address,
                country_code: user.country,
                nationality_code: user.nationality,
                username: user.username,
                hash_password: hashedPassword,
                company_join_date: user.joindate,
                company_email: user.companyemail,
                level: user.level,
                line_manager_id: user.linemanager,
                competence_job_title_id: user.jobtitle,
                role_id: user.assign,
                hobby: user.hobby,
                avatar: user.avatar,
                ext: user.ext,
                mobile: user.mobile,
                personal_email: user.personalemail,
                personal_quote: user.personalquote,
                nickname: user.nickname,
                personal_statement: user.personalstatement,
                is_activated: user.is_activated

            }).then(success).catch(error);
        });
    }

    self.getAllCompetencesByDeptId = function(dept_id, success, error) {
        models.competence.findAll({
            where: {
                department_id: dept_id
            },
            attributes: ["name", "id"]
        }).then(success).catch(error);
    }

    self.getAllJobTitlesByCompetenceId = function(comp_id, success, error) {
        models.sequelize.query("SELECT job_title.id, job_title.name FROM (competence_job_title inner join job_title on job_title_id = job_title.id) where competence_id = ?", {
            replacements: [comp_id],
            type: models.Sequelize.QueryTypes.SELECT
        }).then(success).catch(error);
    }
}

module.exports = employeeCreate;