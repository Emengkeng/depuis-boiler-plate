module.exports = (sequelize, DataTypes) => {
    const GiftCard = sequelize.define('GiftCard', {
        recipient: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        expiresIn:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        expired: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        cardType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        acceptLink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    GiftCard.associate = (models) => {
        GiftCard.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false,
            },
        });
        /* GiftCard.belongsTo(models.CardType, {
            foreignKey: {
                allowNull: false,
            },
        }); */
    };
    return GiftCard;
};
