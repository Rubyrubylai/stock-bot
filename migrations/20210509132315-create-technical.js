'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Technical', {
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
      foreignBuyNumber: {
        type: Sequelize.STRING
      },
      foreignSellNumber: {
        type: Sequelize.STRING
      },
      foreignDifferenceNumber: {
        type: Sequelize.STRING
      },
      investmentBuyNumber: {
        type: Sequelize.STRING
      },
      investmentSellNumber: {
        type: Sequelize.STRING
      },
      investmentDifferenceNumber: {
        type: Sequelize.STRING
      },
      dealerBuyNumber: {
        type: Sequelize.STRING
      },
      dealerSellNumber: {
        type: Sequelize.STRING
      },
      dealerDifferenceNumber: {
        type: Sequelize.STRING
      },
      marginYesterdayNumber: {
        type: Sequelize.STRING
      },
      marginTodayNumber: {
        type: Sequelize.STRING
      },
      shortSaleYesterdayNumber: {
        type: Sequelize.STRING
      },
      shortSaleTodayNumber: {
        type: Sequelize.STRING
      },
      loanYesterdayNumber: {
        type: Sequelize.STRING
      },
      loanTodayNumber: {
        type: Sequelize.STRING
      },
      offsetNumber: {
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