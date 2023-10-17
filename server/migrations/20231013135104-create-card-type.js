'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('CardTypes', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      loadable: {
        type: Sequelize.INTEGER,
        defaultValue: '0',
      },
      uLoadable: {      
          type: Sequelize.BOOLEAN,
          defaultValue: false,
      },
      isFreezable: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
      },
      isfroozen: {                  
          type: Sequelize.BOOLEAN,
          defaultValue: false,
      },
      isWithdrawable:{
          type: Sequelize.BOOLEAN,  
          defaultValue: false,
      },
      creationFee: {
          type: Sequelize.DECIMAL,
          defaultValue: '8',
      },
      monthlyFee: {
          type: Sequelize.DECIMAL,
          defaultValue: '2'
      },
      isGift: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
      },
      giftedBy: {
          type: Sequelize.STRING,
          allowNull: true,
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
    return queryInterface.dropTable('CardTypes');
  }
};