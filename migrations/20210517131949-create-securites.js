'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Securites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marginYesterdayNumber: {
        type: Sequelize.INTEGER
      },
      marginTodayNumber: {
        type: Sequelize.INTEGER
      },
      shortSaleYesterdayNumber: {
        type: Sequelize.INTEGER
      },
      shortSaleTodayNumber: {
        type: Sequelize.INTEGER
      },
      loanYesterdayNumber: {
        type: Sequelize.INTEGER
      },
      loanTodayNumber: {
        type: Sequelize.INTEGER
      },
      offsetNumber: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Securites');
  }
};