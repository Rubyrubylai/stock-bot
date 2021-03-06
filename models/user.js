'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Technical, {
        foreignKey: 'code',
        targetKey: 'code'
      })
    }
  };
  User.init({
    openPrice: DataTypes.FLOAT,
    dividendYield: DataTypes.DECIMAL,
    code: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};