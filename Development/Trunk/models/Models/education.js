module.exports = function(sequelize, DataTypes){
var education = sequelize.define('education',{
    from_date: {
        type: DataTypes.INTEGER,
        allowNull: false,      
    },
    to_date: {
        type: DataTypes.INTEGER,
        allowNull: false,       
        },
    university_college_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    major: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
  freezeTableName: true,
   classMethods: {
            associate: function(models) {
                education	                
	                .belongsTo(models.user, {
	                    foreignKey: {
	                        name: 'user_id',
	                        allowNull: false
	                    }
	                });
            }            
        }
});
return education;
};
