const rootPrefix = "..",
  sequelizeProvider = require(rootPrefix + "/lib/providers/sequelize");

const Sequelize = require('sequelize');

class ProductModel{
  definition(){
    let sequelize = sequelizeProvider.get();
    return sequelize.define('product', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        category: {
          type: Sequelize.STRING,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        price: {
          type: Sequelize.DECIMAL,
          allowNull: true
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
        },
        average_rating: {
          type: Sequelize.DECIMAL,
          allowNull: true
        },
        review_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        is_available: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        }
      },
      {
        underscored: true,
        timestamps: true
      })
  }
}

module.exports = new ProductModel().definition();
