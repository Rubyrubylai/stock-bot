'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Investor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Investor.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    foreignBuyNumber: DataTypes.INTEGER,
    foreignSellNumber: DataTypes.INTEGER,
    investmentBuyNumber: DataTypes.INTEGER,
    investmentSellNumber: DataTypes.INTEGER,
    dealerBuyNumber: DataTypes.INTEGER,
    dealerSellNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Investor',
  });
  return Investor;
};