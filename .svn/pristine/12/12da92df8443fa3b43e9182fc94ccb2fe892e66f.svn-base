var config = require('./config');
Seq = config.sequelize;
seq = config.Sequelize;
var user = Seq.define('user',{
	staff_code:seq.STRING(20),
	first_name: seq.STRING(100),
	last_name: seq.STRING(100),
	dob: seq.DATE,
	gender: seq.INTEGER,
	married_status: seq.INTEGER,
	address: seq.STRING(1000),
	country_code: seq.STRING(2),
	nationality_code: seq.STRING(2),
	ext: seq.TEXT,
	mobile: seq.STRING(30),
	personal_email: seq.STRING(100),
	personal_quote: seq.STRING(1000),
	hobby: seq.STRING(1000),
	personal_statement: seq.STRING(1000),
	avatar: seq.STRING(1000),
	nickname: seq.STRING(50),
	username: seq.STRING(50),
	hash_password: seq.STRING(256),
	company_email: seq.STRING(100),
	company_join_date: seq.DATE,	
	sub_level: seq.TEXT,
	line_manager_id: seq.INTEGER,
},
	{
		timestamps: false,
  freezeTableName: true}
);
module.exports = user;