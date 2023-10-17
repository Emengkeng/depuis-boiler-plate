'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Wallets', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      wallet_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      wallet_pin: {
        type: Sequelize.STRING,
      },
      balance: {
        type: Sequelize.DECIMAL,
        defaultValue: '0',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Wallets');
  }
};