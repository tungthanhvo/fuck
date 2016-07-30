var models = require('../models/index');
var async = require('async');

function ProjectExportService() {
    var self = this;
    self.getProjectInfo = function (id, success, error) {
        models.project.find({
            include: [{
                model: models.client_industry,
                attributes: ['name'],
                required: false
            }, {
                    model: models.location,
                    attributes: ['name'],
                    required: false
                }, {
                    model: models.type,
                    attributes: ['name'],
                    required: false
                }, {
                    model: models.status,
                    attributes: ['name'],
                    required: false
                },{
                    model: models.project_user,
                    attributes:['description'],
                    required: false,
                    //where: {approval_status: 1},
                    include: [{
                        model: models.user,
                        required: false,
                        attributes : ['first_name', 'last_name']
                    },{
                        model: models.project_role,
                        required: false,
                        attributes: ['name']
                    }
                    ]
                }
            ],
            where: {id: id}
        }).then(success).catch(error);


    }
}

module.exports = ProjectExportService;