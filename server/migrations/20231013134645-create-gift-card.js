'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('GiftCards', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      recipient: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: '0',
    },
      accepted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
      },
      expiresIn:{
          type: Sequelize.DATE,
          allowNull: false,
      },
      expired: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
      },
      cardType: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      acceptLink: {
          type: Sequelize.STRING,
          allowNull: true,
      },
      status: {
          type: Sequelize.ENUM({
              values: ['PENDING', 'COMPLETED', 'REJECTED', 'CANCELLED']
          }),
          defaultValue: 'PENDING',
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
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('GiftCards');
  }
};