const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'r4wkv4apxn9btls2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;
