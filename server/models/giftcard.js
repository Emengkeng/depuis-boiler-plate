'use strict';

module.exports = (sequelize, DataTypes) => {
const GiftCard = sequelize.define('GiftCards', {
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
    },
    recipient: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: '0',
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
    status: {
        type: DataTypes.ENUM({
            values: ['PENDING', 'COMPLETED', 'REJECTED', 'CANCELLED']
        }),
        defaultValue: 'PENDING',
    },
});
GiftCard.associate = (models) => {
    GiftCard.belongsTo(models.Users, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
    /* GiftCard.belongsTo(models.CardType, {
        foreignKey: {
            allowNull: false,
        },
    }); */
};

/* GiftCard.beforeCreate((giftcard, _ ) => {
    return giftcard.id = uuid.v4();
})  */

return GiftCard;
};