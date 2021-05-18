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
      code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      foreignBuyNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      foreignSellNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      investmentBuyNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      investmentSellNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      dealerBuyNumber: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      dealerSellNumber: {
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
    await queryInterface.dropTable('Investors');
  }
};