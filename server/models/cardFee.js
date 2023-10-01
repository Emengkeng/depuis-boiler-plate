module.exports = (sequelize, DataTypes) => {
    const CardFee = sequelize.define('CardFee', {
        monthlyFee: {
            type: DataTypes.DECIMAL,
            defaultValue: '2'
        },
    });
    CardFee.associate = (models) => {
        CardFee.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false,
            },
        });
        CardFee.belongsTo(models.CardType, {
            foreignKey: {
                allowNull: false,
            },
        });
    };
    return CardFee;
};
