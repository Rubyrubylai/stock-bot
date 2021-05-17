'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Securites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Securites.init({
    marginYesterdayNumber: DataTypes.INTEGER,
    marginTodayNumber: DataTypes.INTEGER,
    shortSaleYesterdayNumber: DataTypes.INTEGER,
    shortSaleTodayNumber: DataTypes.INTEGER,
    loanYesterdayNumber: DataTypes.INTEGER,
    loanTodayNumber: DataTypes.INTEGER,
    offsetNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Securites',
  });
  return Securites;
};