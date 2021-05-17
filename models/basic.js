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
    industry: DataTypes.STRING,
    listedCpmany: DataTypes.STRING,
    capitial: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Basic',
  });
  return Basic;
};