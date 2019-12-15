const rootPrefix = "../..",
  mysqlConfig = require(rootPrefix + '/config/config'),
  coreConstants = require(rootPrefix + '/coreConstants');

const Sequelize = require('sequelize');

const dbUser = mysqlConfig[coreConstants.environment].username,
  dbPassword = mysqlConfig[coreConstants.environment].password,
  dialect = mysqlConfig[coreConstants.environment].dialect,
  dbName = mysqlConfig[coreConstants.environment].database,
  host = mysqlConfig[coreConstants.environment].host;

let sequelize = null;
class SequelizeProvider{
  get(){
    if(!sequelize){
      sequelize = new Sequelize(dbName, dbUser, dbPassword, {
        host: host,
        dialect: dialect
      });
    }
    
    return sequelize;
  }
}

module.exports = new SequelizeProvider();
