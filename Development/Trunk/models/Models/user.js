module.exports = function(sequelize, DataTypes){  
	var user = sequelize.define('user',{
		staff_code: { 
			type: DataTypes.STRING(20),
			allowNull: false
		},
		first_name: { 
			type: DataTypes.STRING(100),
			allowNull: false
		},
		last_name: { 
			type: DataTypes.STRING(100),
			allowNull: false
		},
		dob: { 
			type: DataTypes.DATE,
			allowNull: false
		},
		gender: { 
			type: DataTypes.INTEGER,
			allowNull: false
		},
		married_status: { 
			type: DataTypes.INTEGER,
			allowNull: false
		},
		address: { 
			type: DataTypes.STRING(1000),
			allowNull: false
		},
		country_code: { 
			type: DataTypes.STRING(2),
			allowNull: false
		},
		nationality_code: { 
			type: DataTypes.STRING(2),
			allowNull: false
		},
		ext: { 
			type: DataTypes.TEXT
		},
		mobile: { 
			type: DataTypes.STRING(30)
		},
		personal_email: { 
			type: DataTypes.STRING(100)
		},
		personal_quote: { 
			type: DataTypes.STRING(1000)
		},
		hobby: { 
			type: DataTypes.STRING(1000),
			allowNull: false
		},
		personal_statement: { 
			type: DataTypes.STRING(1000)
		},
		avatar: { 
			type: DataTypes.STRING(1000)
		},
		nickname: { 
			type: DataTypes.STRING(50)
		},
		username: { 
			type: DataTypes.STRING(50),
			allowNull: false
		},
		hash_password: { 
			type: DataTypes.STRING(256),
			allowNull: false
		},
		company_email: { 
			type: DataTypes.STRING(100),
			allowNull: false
		},
		company_join_date: { 
			type: DataTypes.DATE,
			allowNull: false
		},	
		sub_level: { 
			type: DataTypes.TEXT,
			allowNull: false
		},
		line_manager_id: { 
			type: DataTypes.INTEGER
		}
	}, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {                
                user.hasMany(models.course, {
	                    foreignKey: {
	                        name: 'user_id',
	                        allowNull: false
	                    }
	                });
	                user.hasMany(models.skill_metric, {
	                    foreignKey: {
	                        name: 'user_id',
	                        allowNull: false
	                    }
	                });
	                user.hasMany(models.employee_history, {
	                    foreignKey: {
	                        name: 'user_id',
	                        allowNull: false
	                    }
	                });
	                user.hasMany(models.education, {
	                    foreignKey: {
	                        name: 'user_id',
	                        allowNull: false
	                    }
	                });
	                user.belongsTo(models.role, {
	                    foreignKey: {
	                        name: 'user_id',
	                        allowNull: false
	                    }
	                });
	                user.belongsTo(models.competence_job_title, {
	                    foreignKey: {
	                        name: 'user_id',
	                        allowNull: false
	                    }
	                });
            }
        }
    });    
    return user;	
};
