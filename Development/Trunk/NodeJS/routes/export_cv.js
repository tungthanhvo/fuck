var pdf = require('../help/pdf_helper')
var fs = require('fs')
var express = require('express')
var export_router = express.Router()
var models = require('../models/index')
var path = require('path')
var async = require('async')
var common_data_service = require('../services/commonService')
var education_service = require('../services/education')
var course_service = require('../services/course')
var jwtDecode = require('jwt-decode')
var accountService = require('../services/accountService')
var exportCVService = require('../services/cv_export_service')

var Docxtemplater = require('docxtemplater')
var ImageModule = require('docxtemplater-image-module')
var moment = require('moment')
var mime = require('mime')

var skillParent = require('../services/employee_update')

var exportCV_service = new exportCVService()
var info = {}; // Store employees's data
// Render HTML of CV

var getUserInfo = function (id, cb) {
  exportCV_service.getUserInfo(id, function (data) {
    data.dataValues.dob = moment(data.dataValues.dob).format('MMMM Do YYYY')
    get_skill_parent = new skillParent()
    get_skill_parent.loadSkillParents().then(function (resparent) {
      exportCV_service.retrieveRecentAssignmentAllByUser_Id(data.dataValues.id).then(function (result) {
        exportCV_service.getProjectHistory(data.dataValues.id).then(function (resultHistory) {
          info.user = data
          info.user.dataValues.parrent = []
          info.user.dataValues.recentAssignment = result
          info.user.dataValues.project_histories = resultHistory
          for (var i = 0; i < resparent.length; i++) {
            for (var j = 0; j < info.user.dataValues.skill_metrics.length; j++) {
              if (resparent[i].dataValues.id === info.user.dataValues.skill_metrics[j].skill.dataValues.parent_id) {
                resparent[i].dataValues.mark = true
              }
            }
          }
          for (i = 0; i < info.user.dataValues.parrent.length; i++) {
            info.user.dataValues.parrent[i].child = []
            for (j = 0; j < info.user.dataValues.skill_metrics.length; j++) {
              if (info.user.dataValues.parrent[i].id === info.user.dataValues.skill_metrics[j].dataValues.skill.dataValues.parent_id && info.user.dataValues.parrent[i].id !== info.user.dataValues.skill_metrics[j].dataValues.skill.dataValues.id) {
                var child = {}
                child.id = info.user.dataValues.skill_metrics[j].dataValues.skill.dataValues.id
                child.name = info.user.dataValues.skill_metrics[j].dataValues.skill.dataValues.name
                child.expertiseLevel = info.user.dataValues.skill_metrics[j].dataValues.expertise.dataValues.level
                child.experience_description = info.user.dataValues.skill_metrics[j].dataValues.experience.dataValues.description
                child.experience_level = info.user.dataValues.skill_metrics[j].dataValues.experience.dataValues.level
                child.last_year_used = info.user.dataValues.skill_metrics[j].dataValues.last_year_used
                info.user.dataValues.parrent[i].child.push(child)
              }
            }
          }
          info = JSON.parse(JSON.stringify(info))
          cb()
        })
      })
    })
  })
}
// res.render('cv', info)

export_router.get('/export/:id', function (req, res, next) {
  // var type = req.params.type | 'pdf'
  // TODO: Authorization
  // 3 parts: header, payload (important), decodeMethod
  // var token = req.headers.authorization.split(' ')[1]
  // parse payload to get account
  // var account = jwtDecode(token)

  // Retrieve URL of template with data
  //   exportCV_service.getUserInfo(req.params.id, function (data) {
  //     data.dataValues.dob = moment(data.dataValues.dob).format('MMMM Do YYYY')
  //     get_skill_parent = new skillParent()
  //     get_skill_parent.loadSkillParents().then(function (resparent) {
  //       exportCV_service.retrieveRecentAssignmentAllByUser_Id(data.dataValues.id).then(function (result) {
  //         info.user = data
  //         info.user.dataValues.parrent = []
  //         info.user.dataValues.recentAssignment = result
  //         for (var i = 0; i < resparent.length; i++) {
  //           for (var j = 0; j < info.user.dataValues.skill_metrics.length; j++) {
  //             if (resparent[i].dataValues.id === info.user.dataValues.skill_metrics[j].skill.dataValues.parent_id) {
  //               resparent[i].dataValues.mark = true
  //             }
  //           }
  //         }
  //         for (i = 0; i < resparent.length; i++) {
  //           if (resparent[i].dataValues.mark) {
  //             info.user.dataValues.parrent.push(resparent[i].dataValues)
  //           }
  //         }
  //         for (i = 0; i < info.user.dataValues.parrent.length; i++) {
  //           info.user.dataValues.parrent[i].child = []
  //           for (j = 0; j < info.user.dataValues.skill_metrics.length; j++) {
  //             if (info.user.dataValues.parrent[i].id === info.user.dataValues.skill_metrics[j].dataValues.skill.dataValues.parent_id && info.user.dataValues.parrent[i].id !== info.user.dataValues.skill_metrics[j].dataValues.skill.dataValues.id) {
  //               var child = {}
  //               child.id = info.user.dataValues.skill_metrics[j].dataValues.skill.dataValues.id
  //               child.name = info.user.dataValues.skill_metrics[j].dataValues.skill.dataValues.name
  //               child.expertiseLevel = info.user.dataValues.skill_metrics[j].dataValues.expertise.dataValues.level
  //               info.user.dataValues.parrent[i].child.push(child)
  //             }
  //           }
  //         }
  //         res.render('cv', info)
  //       })
  //     })
  getUserInfo(req.params.id, function () {})

  // res.render('cv', info)

})

export_router.get('/export/:id/pdf', function (req, res, next) {
  var cookie = req.cookie
  var source = req.headers.host + '/cv/export/' + req.params.id
  var destination = path.join(__dirname + '/../tmp/', new Date().getTime() + '.pdf'); /* Declare temporarily save folder. */
  var options = {
    source: source,
    destination: destination,
    cookie: cookie
  }

  var connected = true; // keep track of user connection.
  req.on('close', function () { /* Fire when user disconnect (normally or force). */
    connected = false
  })
  var account_service_instance = new accountService()
  account_service_instance.getUserByID(req.params.id, function (data) {
    var temp = {}
    temp.data = data
    pdf.savePDFfromHTML('http://' + source, destination, options, function (code, file) {
      if (code == 0) { /* Convert HTML 2 PDF and save to disk successfully. */
        if (connected) { /* If user still connected. */
          // res.header('content-type', 'application/pdf'); /* Set header so browser can display it as pdf.*/
          res.setHeader('Content-disposition', 'attachment; filename=' + data.first_name + ' ' + data.last_name + '.pdf')
          var stream = fs.createReadStream(file); // Create stream for user to download.
          stream.on('error', function () { /*Something wrong when streaming.*/
          })
          stream.on('close', function () { /* User success to download. */
          })
          stream.pipe(res)
        } else { /* If user disconnected when the file is being converted. */ }
      } else { // Something wrong with HTML 2 PDF convert process.
        res.render('error', {
          Title: 'Maintenance',
          Code: '500',
          Content: 'Sorry the download feature is under maintenance<br/ > please try again later. '
        }); // Return maintenance page.
      }
    })
  }, function (err) {})
})
export_router.getGender = function (genderCode) {
  if (genderCode === 1) {
    return 'Male'
  } else {
    return 'Female'
  }
}
export_router.get('/export/:id/word', function (req, res, next) {
  getUserInfo(req.params.id, function () {
    // Info
    var profile = info.user
    var gender = export_router.getGender(profile.gender)
    // Congfig word file
    var content = fs
      .readFileSync(path.join(__dirname, '..', 'templates', 'input.docx'), 'binary')
    var opts = {}
    opts.centered = false
    opts.getImage = function (tagValue, tagName) {
      return fs.readFileSync(tagValue, 'binary')
    }
    opts.getSize = function (img, tagValue, tagName) {
      return [150, 150]
    }
    // Config image moudle
    var imageModule = new ImageModule(opts)
    // Getting and filtering technical_skills data from Profile Obj
    var technical_skills = []
    for (var i = 0; i < profile.user_technical_skills.length; i++) {
      var skillObj = {
        'skill_name': profile.user_technical_skills[i].technical_skill.name,
        'skill_summary': profile.user_technical_skills[i].description
      }
      technical_skills.push(skillObj)
    }
    // Getting and filtering working_history data from Profile Obj
    var working_history = []
    for (var i = 0; i < profile.project_histories.length; i++) {
      var historyObj = {
        'project_name': profile.project_histories[i].name,
        'project_start_date': moment(profile.project_histories[i].start_date).format('MMMM Do YYYY') || '',
        'project_end_date': moment(profile.project_histories[i].end_date).format('MMMM Do YYYY') || '',
        'project_size': profile.project_histories[i].size || '',
        'role_title': profile.project_histories[i].role_title || '',
        'project_description': profile.project_histories[i].description || '',
        'my_responsibility': profile.project_histories[i].my_responsibility || '',
        'technology': profile.project_histories[i].technology || '',
      }
      if (historyObj.project_start_date == 'Invalid date') {
        historyObj.project_start_date = ''
      }
      if (historyObj.project_end_date == 'Invalid date') {
        historyObj.project_end_date = ''
      }
      working_history.push(historyObj)
    }
    // Getting and filtering recent_assignments data from Profile Obj    
    var recent_assignments = []
    for (var i = 0; i < profile.recentAssignment.length; i++) {
      var assignObj = {
        'project_name': profile.recentAssignment[i].project.name,
        'project_start_date': moment(profile.recentAssignment[i].project.start_date).format('MMMM Do YYYY') || '',
        'project_end_date': moment(profile.recentAssignment[i].project.end_date).format('MMMM Do YYYY') || '',
        'project_size': profile.recentAssignment[i].project.size || '',
        'role_title': profile.recentAssignment[i].project_role.name || '',
        'project_short_description': profile.recentAssignment[i].project.short_description || '',
        'project_long_description': profile.recentAssignment[i].project.long_description || '',
        'my_responsibility': profile.recentAssignment[i].my_responsibility || '',
        'technology': profile.recentAssignment[i].project.technology || '',
      }
      if (assignObj.project_start_date == 'Invalid date') {
        assignObj.project_start_date = ''
      }
      if (assignObj.project_end_date == 'Invalid date') {
        assignObj.project_end_date = ''
      }

      recent_assignments.push(assignObj)
    }
    // Getting and filtering parent_skills_list data from Profile Obj -> Skill Metrics    
    var parent_skills_list = []
    for (var j = 0; j < profile.parrent.length; j++) {
      var parentObj = {
        'parent_name': profile.parrent[j].name,
        'parent_id': profile.parrent[j].id,
      }
      parent_skills_list.push(parentObj)
    }
    parent_skills_list.sort(function (first_item, second_item) {
      if (first_item.parent_name.toUpperCase() > second_item.parent_name.toUpperCase()) {
        return 1
      }
      if (first_item.parent_name.toUpperCase() < second_item.parent_name.toUpperCase()) {
        return -1
      }
      return 0
    })
    // Getting and filtering skill_metrics data from Profile Obj -> Skill Metrics
    var skill_metrics = []
    for (var i = 0; i < profile.skill_metrics.length; i++) {
      var metricObj = {
        'skill_metric_name': profile.skill_metrics[i].skill.name,
        'last_year_used': profile.skill_metrics[i].last_year_used,
        'metric_expertise': profile.skill_metrics[i].expertise.level,
        'metric_experience': profile.skill_metrics[i].experience.level,
        'parent_id': profile.skill_metrics[i].skill.parent_id,
      }
      skill_metrics.push(metricObj)
    }
    // Merging and makind final_skill_metrics for skill metric section in word file
    var final_skill_metrics = []
    for (var i = 0; i < parent_skills_list.length; i++) {
      var childrens = []
      for (var j = 0; j < skill_metrics.length; j++) {
        if (parent_skills_list[i].parent_id == skill_metrics[j].parent_id) {
          childrens.push(skill_metrics[j])
        }
      }
      var lastObj = {
        'parent_name': parent_skills_list[i].parent_name,
        'child_metrics': childrens,
      }
      final_skill_metrics.push(lastObj)
    }
    // Getting default picture if user does not upload any image for profile picture
    var avatar_link = path.join(__dirname, '..', 'images', 'resized-profile.png')
    if (profile.avatar !== null && profile.avatar !== '') {
      avatar_link = path.join(__dirname, '..', 'images', 'resized-' + profile.avatar)
    }
    // Config docx file
    var docx = new Docxtemplater()
      .attachModule(imageModule)
      .load(content)
      .setData({
        'name': profile.first_name + ' ' + profile.last_name,
        'job_title': profile.competence_job_title.job_title.name,
        'dob': profile.dob,
        'gender': gender,
        'nationality': profile.nationality_code,
        'country': profile.country_code,
        'personal_statement': profile.personal_statement || '',
        'technical_skills': technical_skills,
        'courses': profile.courses,
        'education': profile.education,
        'employment': profile.employee_histories,
        'recent_assignments': recent_assignments,
        'working_history': working_history,
        'skill_metrics': final_skill_metrics,
        image: avatar_link,
      })
    docx.render()

    var buffer = docx
      .getZip()
      .generate({
        type: 'nodebuffer'
      })
    // Sending file to client  
    var name = profile.first_name + ' ' + profile.last_name
    var file = path.join(__dirname, '..', 'templates', new Date().getTime() + name + '.docx')
    fs.writeFile(file, buffer, function (err, data) {
      if (err) {
      }
      var mimetype = mime.lookup(file)
      res.setHeader('Content-disposition', 'attachment; filename=' + name + '.docx')
      res.setHeader('Content-type', mimetype)
      var filestream = fs.createReadStream(file)
      filestream.pipe(res)
    })
  })
})

module.exports = export_router
