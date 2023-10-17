'use strict';
module.exports = (sequelize, DataTypes) => {
const Wallet = sequelize.define('Wallets', {
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
    },
    wallet_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wallet_pin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    balance: {
        type: DataTypes.DECIMAL,
        defaultValue: '0',
    },

});

Wallet.associate = (models) => {
    Wallet.belongsTo(models.Users, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
    /* Wallet.belongsTo(models.Accounts, {
        foreignKey: {
        allowNull: false,
        },
    }); */
    };

    /* Wallet.beforeCreate((wallet, _ ) => {
        return wallet.id = uuid.v4();
    }) */
    return Wallet;
};