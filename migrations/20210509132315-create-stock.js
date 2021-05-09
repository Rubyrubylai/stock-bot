'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stocks', {
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
      transactionAmount: {
        type: Sequelize.STRING
      },
      openPrice: {
        type: Sequelize.INTEGER
      },
      highestPrice: {
        type: Sequelize.INTEGER
      },
      lowestPrice: {
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
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Stocks');
  }
};