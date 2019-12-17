const rootPrefix = "..",
  sequelizeProvider = require(rootPrefix + "/lib/providers/sequelize");

const Sequelize = require('sequelize');

class UserProductRatingModel{
  definition(){
    let sequelize = sequelizeProvider.get();
    return sequelize.define('user_product_rating', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      }
    },{
      underscored: true
    });
  }
}

module.exports = new UserProductRatingModel().definition();
