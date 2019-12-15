const rootPrefix = "..",
  mysqlConfig = require(rootPrefix + '/config/config'),
  coreConstants = require(rootPrefix + '/coreConstants');

const Sequelize = require('sequelize');

let dbUser = mysqlConfig[coreConstants.environment].username,
  dbPassword = mysqlConfig[coreConstants.environment].password,
  dialect = mysqlConfig[coreConstants.environment].dialect,
  dbName = mysqlConfig[coreConstants.environment].database;


const sequelize = new Sequelize("", dbUser, dbPassword, {
  dialect: dialect
});

let query = `CREATE DATABASE ${dbName};`;
return sequelize.query(query).then(data => {
  // code to run after successful creation.
  console.log('Database created successfully !!');
  process.exit(0);
});
