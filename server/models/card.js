'use strict';
const uuid = require("uuid");

module.exports = (sequelize, DataTypes) => {
const Card = sequelize.define('Cards', {
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID,
    },
    cardIds: {                       // To avoid name clash i added an s
        type: DataTypes.STRING, // Holds the id from the flutterwave card
        allowNull: false,
    },
});
Card.associate = (models) => {
    Card.belongsTo(models.Users, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
    Card.belongsTo(models.CardTypes, {
        foreignKey: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    });
};

/* Card.beforeCreate((card, _ ) => {
    return card.id = uuid.v4();
})  */
return Card;
};