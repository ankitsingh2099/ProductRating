const rootPrefix = "..",
  sequelizeProvider = require(rootPrefix + "/lib/providers/sequelize");

const Sequelize = require('sequelize');

class UserModel{
  definition(){
    let sequelize = sequelizeProvider.get();
    return sequelize.define('user', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email_id: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        mobile_number: {
          type: Sequelize.STRING,
          allowNull: true
        },
        encryption_salt: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      {underscored: true})
  }
}

module.exports = new UserModel().definition();
