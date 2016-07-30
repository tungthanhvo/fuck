define(['./module', 'config'], function (module, config) {
    module.factory('metadataService', ['$http', function (http) {
        var job_titles = [];
        var skills = [];
        var projects = [];
        var locations = [];
        var project_types = [];
        var project_statuses = [];
        var client_industries = [];
        var skillChildren = [];
        var experience = [];
        var expertise = [];
        var skillParents = [];

        http({
            url: config.api_server + '/metadata/',
            method: 'GET'
        }).then(function (response) {
            response.data.job.forEach(function (item) {
                job_titles.push(item);
            });
            response.data.skill.forEach(function (item) {
                skills.push(item);
            });
            response.data.project.forEach(function (item) {
                projects.push(item)
            });
            response.data.location.forEach(function (item) {
                locations.push(item);
            });
            response.data.type.forEach(function (item) {
                project_types.push(item);
            });
            response.data.status.forEach(function (item) {
                project_statuses.push(item);
            });
            response.data.client_industry.forEach(function (item) {
                client_industries.push(item);
            });

            response.data.skillChildren.forEach(function (item) {
                skillChildren.push(item);
            });
            response.data.experience.forEach(function (item) {
                experience.push(item);
            });
            response.data.expertise.forEach(function (item) {
                expertise.push(item);
            });
            response.data.skillParents.forEach(function (item) {
                skillParents.push(item);
            });
        });

        return {
            Search: {
                job_titles: job_titles,
                skills: skills,
                projects: projects,
                locations: locations,
                project_types: project_types,
                project_statuses: project_statuses,
                client_industries: client_industries
            },
            createProject: {
                locations: locations
            },
            skillMetric: {
                skillChildren: skillChildren,
                experience: experience,
                expertise: expertise,
                skillParents: skillParents
            },
            editProject: {
                locations: locations,
                project_types: project_types,
                project_statuses: project_statuses,
                client_industries: client_industries
            }
        }
    }]);
});