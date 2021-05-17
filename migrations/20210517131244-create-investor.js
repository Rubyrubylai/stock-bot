'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Investors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foreignBuyNumber: {
        type: Sequelize.INTEGER
      },
      foreignSellNumber: {
        type: Sequelize.INTEGER
      },
      foreignDifferenceNumber: {
        type: Sequelize.INTEGER
      },
      investmentBuyNumber: {
        type: Sequelize.INTEGER
      },
      investmentSellNumber: {
        type: Sequelize.INTEGER
      },
      investmentDifferenceNumber: {
        type: Sequelize.INTEGER
      },
      dealerBuyNumber: {
        type: Sequelize.INTEGER
      },
      dealerSellNumber: {
        type: Sequelize.INTEGER
      },
      dealerDifferenceNumber: {
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
    await queryInterface.dropTable('Investors');
  }
};