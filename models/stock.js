'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Stock.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    transactionNumber: DataTypes.STRING,
    transactionAmount: DataTypes.STRING,
    openPrice: DataTypes.INTEGER,
    highestPrice: DataTypes.INTEGER,
    lowestPrice: DataTypes.INTEGER,
    closePrice: DataTypes.INTEGER,
    trend: DataTypes.STRING,
    difference: DataTypes.INTEGER,
    PER: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};