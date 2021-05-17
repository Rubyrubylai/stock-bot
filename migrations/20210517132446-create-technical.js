'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Technicals', {
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
      transactionNumber: {
        type: Sequelize.STRING
      },
      openPrice: {
        type: Sequelize.INTEGER
      },
      highPrice: {
        type: Sequelize.INTEGER
      },
      lowPrice: {
        type: Sequelize.INTEGER
      },
      closePrice: {
        type: Sequelize.INTEGER
      },
      trend: {
        type: Sequelize.STRING
      },
      difference: {
        type: Sequelize.INTEGER
      },
      PER: {
        type: Sequelize.INTEGER
      },
      dividendYield: {
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
    await queryInterface.dropTable('Technicals');
  }
};