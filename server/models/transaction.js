'use strict';

const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
const Transaction = sequelize.define('Transactions', {
  id: {
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    type: DataTypes.UUID,
},
  transaction_code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  transaction_reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_inflow: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});

Transaction.associate = (models) => {
  Transaction.belongsTo(models.Users, {
    foreignKey: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
};

/* Transaction.beforeCreate((transaction, _ ) => {
  return transaction.id = uuid.v4();
}) */
return Transaction;
};