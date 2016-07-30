var express = require('express');
var metadata_router = express.Router();
var metadataService = require('../services/meta_data_service');

metadata_router.get('/', function(req, res) {
    var metadata_service = new metadataService();
    // metadata_service.loadJobTitle().then(function(result){
    // 	console.log('----------');
    // 	console.log(result);
    // 	res.json(result);	
    // });
    var a = {};
    console.log('----------');
    metadata_service.loadMetaData().then(function(result){
    	a.job = result;
    	metadata_service.loadSkill().then(function(ress){
    		a.skill = ress;
    		metadata_service.loadCompetenceJob().then(function(resss){
    			a.competenceJob = resss;
   				metadata_service.loadExperience().then(function(ressss){
   					a.experience = ressss;
   					metadata_service.loadExpertise().then(function(resssss){
   						a.expertise = resssss;
   						metadata_service.loadRole().then(function(res1){
   							a.role = res1;
   							metadata_service.loadTechnicalSkill().then(function(res2){
   								a.technicalSkill = res2;
   								res.json(a);
   							})
   						})
   					})
   				}) 			
    		})
    	});
    })
    console.log('a la: ');
        
})

module.exports = metadata_router;