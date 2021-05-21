'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Technical extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Technical.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    transactionNumber: DataTypes.STRING,
    openPrice: DataTypes.INTEGER,
    highPrice: DataTypes.INTEGER,
    lowPrice: DataTypes.INTEGER,
    closePrice: DataTypes.INTEGER,
    difference: DataTypes.INTEGER,
    PER: DataTypes.DECIMAL,
    dividendYield: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Technical',
  });
  return Technical;
};