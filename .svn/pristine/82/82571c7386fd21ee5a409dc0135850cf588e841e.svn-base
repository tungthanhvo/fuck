var db = require('../models/index');
var project_model = db.project;
var user_model = db.user;
var project_user_model = db.project_user;
var project_role_model = db.project_role;
var project = require('../services/projects');

function ProjectMemberService() {
    var self = this;

    self.getAllMemberInProject = function (project_id, success, error) {
        project_user_model.findAll({
            attributes: ['id', 'join_date', 'release_date', 'approver'],
            include: [{
                model: db.user,
                required: false,
                attributes: ['first_name', 'last_name', 'username','company_join_date'],
            }, {
                    model: db.project_role,
                    required: true,
                    attributes: ['id', 'name'],
                    where: { is_selected: 0 }
                }, {
                    model: db.approval_status,
                    required: false,
                    attributes: ['name']
                }],
            where: { project_id: project_id, $not: {user_id: null}  }
        }).then(function (data) {        
            var temp_approver_id  = [];
            for (var i = 0; i < data.length; i++) {
                if (temp_approver_id.indexOf(data[i].dataValues.approver) === -1) {
                    temp_approver_id.push(data[i].dataValues.approver);
                }
            }
            user_model.findAll({
                where: { id: temp_approver_id },
                attributes: ['id', 'first_name', 'last_name']
            }).then(function (approvers) {
                data.push(approvers);
                success(data);
            }).catch(error);

        }).catch(error);
    }
    //Should include project_id, user_id, project_role_id, join_date in data
    self.addMemberToProject = function (data, success, error) {
        var a = new project();

        a.loadRole(data.project_id).then(function (result) {
            var b;
            for(var i = 0; i<result.rows.length; i++){
                if (result.rows[i].id === parseInt(data.roletitle)) {
                    b = result.rows[i].project_users[0].description;
                    break;
                }
            }           
            (data.releasedate == null || data.releasedate == '') ? data.releasedate = null : data.releasedate = data.releasedate;
            project_user_model.findOne({ where: { project_role_id: 13, project_id: data.project_id } }).then(function (pm) {
                project_user_model.create({
                    approval_status_id: 1, //New
                    join_date: data.dt,
                    release_date: data.releasedate,
                    project_role_id: data.roletitle,
                    project_id: data.project_id,
                    is_included: 0,
                    approver: pm.user_id,
                    user_id: data.name,
                    description: b
                }).then(success).catch(error);
            }).catch(error);
        });


    }

    //Should include project_user_id
    self.updateMemberOfProject = function (data, success, error) {
        project_user_model.update({
            join_date: data.dt,
            release_date: data.releasedate,
        }, {
                where: { id: data.project_user_id }
            }).then(success).catch(error);
    }

    //Should include an array of ids to be deleted
    self.deleteMemberOfProject = function (data, success, error) {
        project_user_model.destroy({
            where: { id: data.id }
        }).then(success).catch(error);
    }

    self.getAvailableMembers = function (project_id, success, error) {
        user_model.findAll({
            attributes: ['id', 'first_name', 'last_name', 'username', 'company_join_date'],
            include: [{
                model: db.project_user,
                required: true,
                attributes: [],
                where: { project_id: { $not: project_id } }
            }]
        }).then(success).catch(error);
    }

    self.getAllMember = function () {
        return user_model.findAndCountAll({            
        });
    }
    self.getMembersInProject = function () {
        return db.user.findAndCountAll({
            include: [{
                model: db.project_user,
                include: [{
                    model: db.project,
                    include: [{
                        model: db.status,
                        where: {
                            name: 'Running'
                        }
                    }]
                }]
            }]
        })
    }

    self.getMemberOfProject = function (project_id) {
        return db.user.findAndCountAll({
            attributes: ['id', 'first_name', 'last_name', 'username'],
            include: [{                
                model: db.project_user,
                where: [{
                    project_id: project_id
                }],
                required: true
            }]
        });
    };

    
    self.loadPm = function() {
        return db.user.findAndCountAll({
            attributes: ['id', 'first_name', 'last_name', 'username'],
            include: [{
                model: db.role,
                where: {
                    name: 'PM'
                }
            }]
        });
    };

    self.loadSm = function() {
        return db.user.findAndCountAll({
            attributes: ['id', 'first_name', 'last_name', 'username'],
            include: [{
                model: db.role,
                where: {
                    name: 'SM'
                }
            }]
        });
    };


    self.getAvailableRoles = function (project_id, success, error) {
        project_role_model.findAll({
            attributes: ['id', 'name'],
            where: { is_selected: 0 },
            include: [{
                model: db.project_user,
                required: false,
                attributes: ['project_id'],
                where: { project_id: project_id }
            }]
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].dataValues.project_users.length !== 0) {
                    //data[i] = null;
                    data.splice(i, 1);
                }
                delete (data[i].dataValues.project_users);
            }
            success(data);
        }).catch(error);
    }
}

module.exports = ProjectMemberService;