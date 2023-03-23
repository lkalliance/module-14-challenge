const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host via JawsDB for Heroku
    host: 'mysql://p2caqq4b3jiivaiw:fi65e2tz4hx22449@r4wkv4apxn9btls2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/chzr4ss9vajiwphj',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
