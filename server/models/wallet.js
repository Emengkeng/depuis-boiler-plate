module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
        wallet_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wallet_pin: {
            type: DataTypes.STRING,
        },
        balance: {
            type: DataTypes.DECIMAL,
            defaultValue: '0',
        }
    });
    
        Wallet.associate = (models) => {
        Wallet.belongsTo(models.Users, {
            foreignKey: {
            allowNull: false,
            },
        });
        /* Wallet.belongsTo(models.Accounts, {
            foreignKey: {
            allowNull: false,
            },
        }); */
        };
        return Wallet;
};
  