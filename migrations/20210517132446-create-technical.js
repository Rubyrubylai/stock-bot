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
        type: Sequelize.INTEGER.UNSIGNED
      },
      openPrice: {
        type: Sequelize.FLOAT
      },
      highPrice: {
        type: Sequelize.FLOAT
      },
      lowPrice: {
        type: Sequelize.FLOAT
      },
      closePrice: {
        type: Sequelize.FLOAT
      },
      trend: {
        type: Sequelize.STRING
      },
      difference: {
        type: Sequelize.FLOAT
      },
      PER: {
        type: Sequelize.FLOAT
      },
      dividendYield: {
        type: Sequelize.FLOAT
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