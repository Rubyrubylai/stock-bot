'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Securities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      marginYesterdayNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      marginTodayNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      shortSaleYesterdayNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      shortSaleTodayNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      loanYesterdayNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      loanTodayNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      offsetNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Securities');
  }
};