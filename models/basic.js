'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Basic.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    industry: DataTypes.STRING,
    listedCompany: DataTypes.STRING,
    capital: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Basic',
  });
  return Basic;
};