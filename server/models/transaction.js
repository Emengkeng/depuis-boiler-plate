module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transactions', {
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
        allowNull: false,
      },
    });
  };
  return Transaction;
};
