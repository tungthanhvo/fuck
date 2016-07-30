var models = require('../models/index')
var bcrypt = require('bcrypt-nodejs')
var nodemailer = require('nodemailer')

function employeeCreate () {
  var self = this
  self.getEmployeesByRole = function (role_id, success, error) {
    models.user.findAll({
      where: {
        role_id: role_id
      },
      attributes: ['id', 'first_name', 'last_name', 'username']
    }).then(success).catch(error)
  }

  self.getAllDepartments = function (success, error) {
    models.department.findAll({
      attributes: ['id', 'name', 'code']
    }).then(success).catch(error)
  }

  self.countEmployees = function (success, error) {
    models.sequelize.query('SELECT MAX(id) as totalEmp from user', {
      type: models.Sequelize.QueryTypes.SELECT
    }).then(success).catch(error)
  }

  self.checkListUsername = function (username, success, error) {
    models.user.find({
      where: {
        username: username
      },
    }).then(success).catch(error)
  }

  self.checkEmailExist = function (email, success, error) {
    models.user.find({
      where: {
        company_email: email
      },
    }).then(success).catch(error)
  }
  self.sendMailEmployee = function (user) {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'harveynashtms@gmail.com',
        pass: 'TrinhDepTrai',
      // user: 'tmsharveynashvn@gmail.com',
      // pass: 'Team1VoDoi'
      }
    })
    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: '"Harvey Nash TMS 👥" <harveynashtms@gmail.com>', // sender address
      to: user.companyemail, // list of receivers
      subject: 'Your Password for Your TMS Account✔', // Subject line
      text: 'THIS IS PLAINTEXT 🐴', // plaintext body
      html: '<div> Dear ' + user.firstname + ', <br><br>Your password for your account now is: ' + user.password + '<br>You now can access to the TMS system using that password.<br>Hope you have great experience with our TMS.<br><br> Best Regards </div> ' // html body
    }
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return error
      } else {
      }
    }, function (rejectedPromiseError) {
      return
    })
  }

  self.createEmployee = function (user, success, error) {
    var hashedPassword = ''
    bcrypt.hash(user.password, null, null, function (err, hash) {
      hashedPassword = hash
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

      }).then(function (data) {
        console.log(data)
        self.sendMailEmployee(user)
        success(data)
      }).catch(error)
    })
  }

  self.getAllCompetencesByDeptId = function (dept_id, success, error) {
    models.competence.findAll({
      where: {
        department_id: dept_id
      },
      attributes: ['name', 'id']
    }).then(success).catch(error)
  }

  self.getAllJobTitlesByCompetenceId = function (comp_id, success, error) {
    models.sequelize.query('SELECT job_title.id, job_title.name FROM (competence_job_title inner join job_title on job_title_id = job_title.id) where competence_id = ?', {
      replacements: [comp_id],
      type: models.Sequelize.QueryTypes.SELECT
    }).then(success).catch(error)
  }
}

module.exports = employeeCreate
